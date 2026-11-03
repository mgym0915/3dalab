/* Production dynamic geometry kernel: closed topology -> real wall centerlines -> net bottom -> volume/mass. */
(function(g){'use strict';const baseCache=new Map();
function hull(points){
 const p=points.map(v=>({x:v.x,y:v.y})).sort((a,b)=>a.x-b.x||a.y-b.y),cross=(o,a,b)=>(a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x);
 const lower=[],upper=[];
 for(const v of p){while(lower.length>=2&&cross(lower.at(-2),lower.at(-1),v)<=0)lower.pop();lower.push(v);}
 for(const v of p.slice().reverse()){while(upper.length>=2&&cross(upper.at(-2),upper.at(-1),v)<=0)upper.pop();upper.push(v);}
 return lower.slice(0,-1).concat(upper.slice(0,-1));
}
const positive=poly=>ClipperLib.Clipper.Area(poly.map(p=>({X:p.x,Y:p.y})))>0;
function singleContour(poly){
 return PrintGeometry.analyzeShapes([{commands:PrintGeometry.parse(poly.map((p,i)=>(i?'L':'M')+p.x+' '+p.y).join('')+'Z'),fillRule:'nonzero'}]);
}
  function context(input){
    if(!input||(!input.geometry&&typeof input.svg!=='string')||!input.config||!Array.isArray(input.segments)||!input.segments.length)throw Error('需要SVG路径、工艺配置和截面分段。');
    for(const key of ['xyScale','zScale','depth'])if(!(Number.isFinite(input[key])&&input[key]>0))throw Error('尺寸缩放和模型高度须为有限正数。');
    for(const key of ['layer_height','initial_layer_print_height','outer_wall_line_width','filament_flow_ratio','filament_diameter','filament_density','wall_loops']){
      const value=Number(String(input.config[key]).split(',')[0]);if(!(Number.isFinite(value)&&value>0))throw Error('工艺参数无效：'+key);
    }
    for(const key of ['extra_wall_loops','extra_loops_height','bottom_shell_layers','brim_width','skirt_distance','skirt_loops']){
      const value=Number(input.config[key]);if(!(Number.isFinite(value)&&value>=0))throw Error('工艺参数无效：'+key);
    }
    for(const key of ['wall_loops','extra_wall_loops','bottom_shell_layers','skirt_loops'])if(!Number.isSafeInteger(Number(input.config[key])))throw Error('道数、圈数和层数须为整数：'+key);
    if(Number(input.config.outer_wall_line_width)<Number(input.config.layer_height))throw Error('本候选模型要求线宽不小于层高。');
    for(const segment of input.segments)if(segment.length!==4||!segment.every(Number.isFinite)||segment[3]<0||![0,1].includes(segment[0]))throw Error('截面分段无效。');
    if(!input.geometry&&![...input.svg.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].length)throw Error('候选模型需要已转换为path的填充SVG轮廓。');
 const {id,svg,xyScale,zScale,config:c}=input;
 let base=input.geometry||baseCache.get(svg);
 if(!base){
  const paths=[...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map(m=>({commands:PrintGeometry.parse(m[1]),fillRule:'evenodd'}));
  base=PrintGeometry.analyzeShapes(paths);baseCache.set(svg,base);if(baseCache.size>12)baseCache.delete(baseCache.keys().next().value);
 }
 if(!base||!Array.isArray(base.polygons)||!(base.width>0&&base.height>0&&base.area>0))throw Error('无有效填充几何。');
 const width=input.width??base.sourceBounds.width*xyScale,scale=width/base.width,height=input.depth*zScale;
 if(!Number.isFinite(width)||width<=0)throw Error('图形宽度须为有限正数。');
 const beta=Number(c.layer_height),firstHeight=Number(c.initial_layer_print_height),w=Number(c.outer_wall_line_width);
 const F=Number(String(c.filament_flow_ratio).split(',')[0]),diameter=Number(String(c.filament_diameter).split(',')[0]),density=Number(String(c.filament_density).split(',')[0]);
 const filamentArea=Math.PI*diameter**2/4,delta=filamentArea*density/1000;
 const beadArea=beta*(w-beta)+Math.PI*beta**2/4,epsilon=F*beadArea/filamentArea,spacing=w-beta*(1-Math.PI/4);
 const N=Math.max(1,1+Math.round((height-firstHeight)/beta)),walls=Number(c.wall_loops),extra=Number(c.extra_wall_loops),extraHeight=Number(c.extra_loops_height),grooveHeight=Number(c.v_groove_1_thickness||0),bottomLayers=Number(c.bottom_shell_layers);
 if(!Number.isSafeInteger(N)||N>5000)throw Error('打印层数最多支持5000层，请调整模型高度或层高。');
 const geomCache=new Map(),expandedPaths=new Map(),pathCache=new Map();
 const precision=50000,originX=base.width/2,originY=base.height/2,basePaths=base.polygons.map(poly=>poly.map(p=>({X:Math.round((p.x-originX)*precision),Y:Math.round((p.y-originY)*precision)})));
 function rawOffset(paths,distance){
  if(!paths.length)return [];
  if(distance===0)return paths;
  const offsetter=new ClipperLib.ClipperOffset(4,.002*precision),solution=[],delta=distance/scale*precision;
  offsetter.AddPaths(paths,ClipperLib.JoinType.jtMiter,ClipperLib.EndType.etClosedPolygon);
  // Pinned Clipper6.4.2 offset generation; union once with StrictlySimple.
  // The previous implementation unioned the same offset output twice.
  offsetter.FixOrientations();offsetter.DoOffset(delta);
  if(!offsetter.m_destPolys.length)return [];
  const merger=new ClipperLib.Clipper();merger.StrictlySimple=true;
  merger.AddPaths(offsetter.m_destPolys,ClipperLib.PolyType.ptSubject,true);
  if(delta>0){
   if(!merger.Execute(ClipperLib.ClipType.ctUnion,solution,ClipperLib.PolyFillType.pftPositive,ClipperLib.PolyFillType.pftPositive))throw Error('图形合并失败。');
  }else{
   const r=ClipperLib.Clipper.GetBounds(offsetter.m_destPolys);
   merger.AddPath([{X:r.left-10,Y:r.bottom+10},{X:r.right+10,Y:r.bottom+10},{X:r.right+10,Y:r.top-10},{X:r.left-10,Y:r.top-10}],ClipperLib.PolyType.ptSubject,true);
   merger.ReverseSolution=true;
   if(!merger.Execute(ClipperLib.ClipType.ctUnion,solution,ClipperLib.PolyFillType.pftNegative,ClipperLib.PolyFillType.pftNegative))throw Error('图形合并失败。');
   if(solution.length)solution.splice(0,1);
  }
  return solution;
 }
 function swellAt(z){
  let total=0,start=0;
  for(const [kind,amount,unused,depth]of input.segments){const span=depth*zScale;
   if(z>=start+span){if(kind===1)total+=amount*xyScale;start+=span;continue;}
   if(kind===1)total+=amount*xyScale*Math.max(0,z-start)/span;break;
  }return total;
 }
 function expandedAt(swell){
  const key=swell.toFixed(7);if(geomCache.has(key))return geomCache.get(key);
  const g=PrintGeometry.offsetGeometry(base,swell,width,'miter');geomCache.set(key,g);return g;
 }
 function section(swell,inset){
  const swellKey=swell.toFixed(7),key=swellKey+'|'+inset.toFixed(7);
  if(pathCache.has(key))return pathCache.get(key);
  let expanded=expandedPaths.get(swellKey);
  if(!expanded){expanded=rawOffset(basePaths,swell);expandedPaths.set(swellKey,expanded);}
  const paths=rawOffset(expanded,-inset);
  let area=0,perimeter=0;
  for(const poly of paths){area+=ClipperLib.Clipper.Area(poly);for(let i=0,j=poly.length-1;i<poly.length;j=i++)perimeter+=Math.hypot(poly[i].X-poly[j].X,poly[i].Y-poly[j].Y);}
  const unit=scale/precision,result={C:perimeter*unit,S:Math.abs(area)*unit*unit,contours:paths.length};
  pathCache.set(key,result);return result;
 }
 return {input,id,base,width,scale,height,beta,firstHeight,w,F,filamentArea,delta,beadArea,epsilon,spacing,N,walls,extra,extraHeight,grooveHeight,bottomLayers,swellAt,expandedAt,section};
  }
  function adhesion(ctx,paths=false){
 const {input,width,scale,w,firstHeight,spacing,swellAt,expandedAt}=ctx,c=input.config;
 const firstSection=expandedAt(swellAt(firstHeight/2)),outerContours=firstSection.polygons.filter(positive);
 const brimWidth=Number(c.brim_width),skirtDistance=Number(c.skirt_distance),skirtLoops=Number(c.skirt_loops);
 let brimXY=0;const brimLoops=Math.max(0,Math.ceil(brimWidth/spacing)),brimPaths=[],skirtPaths=[];
 function drawing(base,ring){return {path:ring.path,dx:base.sourceBounds.x+ring.sourceBounds.x,dy:base.sourceBounds.y+ring.sourceBounds.y,factor:1/base.normaliseScale};}
 for(const contour of outerContours){
  const g=singleContour(contour),contourWidth=g.sourceBounds.width*scale;
  for(let j=0;j<brimLoops;j++){
   const distance=w/2+j*spacing;if(distance>brimWidth+w/2)continue;
   const ring=PrintGeometry.offsetGeometry(g,distance,contourWidth,'round');
   brimXY+=ring.perimeter*contourWidth/g.width;if(paths)brimPaths.push(drawing(g,ring));
  }
 }
 const hullGeometry=singleContour(hull(firstSection.polygons.flat())),hullWidth=hullGeometry.sourceBounds.width*scale;
 let skirtXY=0;
 for(let j=0;j<skirtLoops;j++){
  const distance=brimWidth+skirtDistance+w/2+j*spacing;
  const ring=PrintGeometry.offsetGeometry(hullGeometry,distance,hullWidth,'round');
  skirtXY+=ring.perimeter*hullWidth/hullGeometry.width;if(paths)skirtPaths.push(drawing(hullGeometry,ring));
 }
 return {brimXY,skirtXY,brimLoops,skirtLoops,brimPaths,skirtPaths,padding:(brimWidth+skirtDistance+w/2+Math.max(0,skirtLoops-1)*spacing)/scale};
  }
  function predict(input,onProgress){
 const c=input.config;
 const ctx=context(input),{id,base,width,scale,height,beta,firstHeight,w,F,filamentArea,delta,beadArea,epsilon,spacing,N,walls,extra,extraHeight,grooveHeight,bottomLayers,swellAt,expandedAt,section}=ctx;
 onProgress?.({stage:'walls',fraction:.15});
 let wallXY=0,wallVolume=0,bottomVolume=0;
 const sampled=new Map();
 function sample(layer){
  if(sampled.has(layer))return sampled.get(layer);
  const layerHeight=layer===0?firstHeight:beta,top=firstHeight+layer*beta,z=top-layerHeight/2,swell=swellAt(z),passes=walls+(top<=extraHeight+grooveHeight+1e-7?extra:0);
  let length=0,topology='';for(let j=0;j<passes;j++){const s=section(swell,w/2+j*spacing);length+=s.C;topology+=s.contours+',';}
  const result={length,topology,passes,swell};sampled.set(layer,result);return result;
 }
 // For fixed polygon topology, parallel miter boundaries have affine
 // perimeter. Verify endpoints and interior samples before summing a run.
 // A topology/linearity change recursively falls back to exact layers.
 function sum(a,b){
  if(b-a<=3||input.exactWalls){let total=0;for(let i=a;i<=b;i++)total+=sample(i).length;return total;}
  const left=sample(a),right=sample(b),indices=[Math.floor(a+(b-a)/4),Math.floor((a+b)/2),Math.floor(a+3*(b-a)/4)];
  let affine=left.passes===right.passes&&left.topology===right.topology;
  for(const i of indices){const v=sample(i),t=(i-a)/(b-a),expected=left.length+(right.length-left.length)*t,expectedSwell=left.swell+(right.swell-left.swell)*t;
   if(v.passes!==left.passes||v.topology!==left.topology||Math.abs(v.swell-expectedSwell)>1e-8||Math.abs(v.length-expected)>Math.max(.0001,Math.abs(v.length)*1e-5))affine=false;
  }
  if(affine)return (b-a+1)*(left.length+right.length)/2;
  const middle=Math.floor((a+b)/2);return sum(a,middle)+sum(middle+1,b);
 }
 const firstLength=sample(0).length;
 wallXY=firstLength;wallVolume=firstLength*(firstHeight*(w-firstHeight)+Math.PI*firstHeight**2/4);
 for(let a=1;a<N;a+=17){const end=Math.min(N-1,a+16),length=sum(a,end);wallXY+=length;wallVolume+=length*beadArea;onProgress?.({stage:'walls',fraction:.15+.62*(end+1)/N});}
 onProgress?.({stage:'bottom',fraction:.8});
 const productBottomVolumes=input.productOptions?{smooth:0,diamond:0}:null;
 for(let layer=0;layer<Math.min(input.productOptions?Math.max(bottomLayers,7):bottomLayers,N);layer++){
  const layerHeight=layer===0?firstHeight:beta,top=firstHeight+layer*beta,z=top-layerHeight/2,swell=swellAt(z),passes=walls+(top<=extraHeight+grooveHeight+1e-7?extra:0);
  const volume=section(swell,passes*spacing).S*layerHeight;
  if(layer<bottomLayers)bottomVolume+=volume;
  if(productBottomVolumes){if(layer<4)productBottomVolumes.smooth+=volume;if(layer<7)productBottomVolumes.diamond+=volume;}
 }
 // Adhesion estimates follow slicer settings. Each positive connected material
 // contour gets an exterior brim, including material islands inside holes.
 // Do not fill a containing outline before extracting islands.
 onProgress?.({stage:'adhesion',fraction:.86});
 const {brimXY,skirtXY,brimLoops,skirtLoops}=adhesion(ctx);
 onProgress?.({stage:'summary',fraction:.97});
 const firstBeadArea=firstHeight*(w-firstHeight)+Math.PI*firstHeight**2/4;
 const core={id,width,heightXY:base.height*scale,maxEdge:Math.max(width,base.height*scale),height,beta,firstHeight,N,walls,extraHeight,grooveHeight,bottomLayers,actualBottomLayers:Math.min(bottomLayers,N),w,spacing,wallXY,wallVolume,bottomVolume,brimXY,skirtXY,brimVolume:brimXY*firstBeadArea,skirtVolume:skirtXY*firstBeadArea,brimLoops,skirtLoops,swellMaximum:swellAt(height)};
 if(productBottomVolumes)core.productBottomVolumes=productBottomVolumes;
 return reweight(core,c);
  }
  function reweight(core,c){
    const F=Number(String(c.filament_flow_ratio).split(',')[0]),diameter=Number(String(c.filament_diameter).split(',')[0]),density=Number(String(c.filament_density).split(',')[0]);
    if(![F,diameter,density].every(v=>Number.isFinite(v)&&v>0))throw Error('流量、原丝直径和密度须为正数。');
    const filamentArea=Math.PI*diameter**2/4,delta=filamentArea*density/1000;
    const area=h=>h*(core.w-h)+Math.PI*h*h/4;
    const wallMass=core.wallVolume*F*density/1000,bottomMass=core.bottomVolume*F*density/1000,brimMass=core.brimVolume*F*density/1000,skirtMass=core.skirtVolume*F*density/1000;
    const volume=core.wallVolume+core.bottomVolume+core.brimVolume+core.skirtVolume;
    const filamentLength=volume*F/filamentArea;
    const weights=core.productBottomVolumes?Object.fromEntries(Object.entries(core.productBottomVolumes).map(([key,value])=>[key,wallMass+brimMass+skirtMass+value*F*density/1000])):undefined;
    return {...core,F,density,diameter,filamentArea,delta,epsilon:F*area(core.beta)/filamentArea,firstEpsilon:F*area(core.firstHeight)/filamentArea,gamma:F*core.beta/filamentArea,wallMass,bottomMass,brimMass,skirtMass,predicted:wallMass+bottomMass+brimMass+skirtMass,...(weights?{weights}:{}),filamentLength,wallFilament:core.wallVolume*F/filamentArea,bottomFilament:core.bottomVolume*F/filamentArea,brimFilament:core.brimVolume*F/filamentArea,skirtFilament:core.skirtVolume*F/filamentArea};
  }
  g.MechanisticEstimator={predict,reweight};
})(globalThis);

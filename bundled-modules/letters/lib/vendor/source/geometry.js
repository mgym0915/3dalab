/* Geometry kernel. All lengths stay unrounded until presentation.
 * Curves: adaptive flattening, max deviation 0.002 on a 1000-unit normalised span.
 * Polygon topology: Clipper 6.4.2, integer precision 1e-5 normalised units.
 */
(function (g) {
  'use strict';
  const PRECISION = 100000, TOLERANCE = 0.002, MAX_POINTS = 250000;
  const apply = (m, p) => ({x:m[0]*p.x+m[2]*p.y+m[4],y:m[1]*p.x+m[3]*p.y+m[5]});
  const dist = (a,b) => Math.hypot(a.x-b.x,a.y-b.y);
  const midpoint = (a,b) => ({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
  function lineDistance(p,a,b) {
    const dx=b.x-a.x,dy=b.y-a.y,d=dx*dx+dy*dy;
    if (!d) return dist(p,a);
    const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/d));
    return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);
  }
  function parse(d) { return SVGPathParser.makeAbsolute(SVGPathParser.parseSVG(d)); }
  function arcParameters(c) {
    let rx=Math.abs(c.rx),ry=Math.abs(c.ry);
    if (!rx || !ry || (c.x===c.x0 && c.y===c.y0)) return null;
    const phi=c.xAxisRotation*Math.PI/180,cos=Math.cos(phi),sin=Math.sin(phi);
    const dx=(c.x0-c.x)/2,dy=(c.y0-c.y)/2;
    const xp=cos*dx+sin*dy,yp=-sin*dx+cos*dy;
    const lambda=xp*xp/(rx*rx)+yp*yp/(ry*ry);
    if (lambda>1) { const f=Math.sqrt(lambda);rx*=f;ry*=f; }
    const denominator=rx*rx*yp*yp+ry*ry*xp*xp;
    const sign=c.largeArc===c.sweep?-1:1;
    const k=sign*Math.sqrt(Math.max(0,(rx*rx*ry*ry-denominator)/denominator));
    const cxp=k*rx*yp/ry,cyp=-k*ry*xp/rx;
    const cx=cos*cxp-sin*cyp+(c.x0+c.x)/2,cy=sin*cxp+cos*cyp+(c.y0+c.y)/2;
    const ux=(xp-cxp)/rx,uy=(yp-cyp)/ry,vx=(-xp-cxp)/rx,vy=(-yp-cyp)/ry;
    const start=Math.atan2(uy,ux);
    let sweep=Math.atan2(ux*vy-uy*vx,ux*vx+uy*vy);
    if (!c.sweep && sweep>0) sweep-=2*Math.PI;
    if (c.sweep && sweep<0) sweep+=2*Math.PI;
    return {rx,ry,cos,sin,cx,cy,start,sweep};
  }
  function bounds(shapes) {
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    function add(m,p) {p=apply(m,p);minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);}
    for (const s of shapes) {
      const m=s.matrix||[1,0,0,1,0,0];
      const b=s.bounds;
      if (b) {
        const pad=s.stroke?s.stroke.width*Math.max(1,s.stroke.miterLimit||4):0;
        for(const x of [b.x-pad,b.x+b.width+pad]) for(const y of [b.y-pad,b.y+b.height+pad]) add(m,{x,y});
      } else {
        for (const c of s.commands) {
          add(m,{x:c.x,y:c.y});
          if ('x1' in c) add(m,{x:c.x1,y:c.y1});
          if ('x2' in c) add(m,{x:c.x2,y:c.y2});
          if(c.code==='A') {const a=arcParameters(c);if(a) for(const x of [a.cx-a.rx-a.ry,a.cx+a.rx+a.ry]) for(const y of [a.cy-a.rx-a.ry,a.cy+a.rx+a.ry]) add(m,{x,y});}
        }
      }
    }
    if(![minX,minY,maxX,maxY].every(Number.isFinite)) throw Error('图形坐标无效。');
    return {minX,minY,maxX,maxY,width:maxX-minX,height:maxY-minY};
  }
  function flatten(commands,m,tolerance=TOLERANCE) {
    const paths=[];let points=[],closed=false,previous='',control=null,count=0;
    const push=p=>{if(!points.length||dist(points[points.length-1],p)>1e-10){points.push(p);if(++count>MAX_POINTS)throw Error('图形过于复杂，请简化路径后重试。');}};
    const flush=()=>{if(points.length>1) paths.push({points,closed});points=[];closed=false;};
    function cubic(a,b,c,d,depth=0) {
      if(depth>=24 || Math.max(lineDistance(b,a,d),lineDistance(c,a,d))<=tolerance){push(d);return;}
      const ab=midpoint(a,b),bc=midpoint(b,c),cd=midpoint(c,d),abc=midpoint(ab,bc),bcd=midpoint(bc,cd),mid=midpoint(abc,bcd);
      cubic(a,ab,abc,mid,depth+1);cubic(mid,bcd,cd,d,depth+1);
    }
    for(const c of commands) {
      const p=apply(m,{x:c.x,y:c.y}),start=apply(m,{x:c.x0,y:c.y0});
      if(c.code==='M'){flush();push(p);control=null;}
      else if(c.code==='Z'){closed=true;push(p);flush();control=null;}
      else {
        if(!points.length) push(start);
        if(c.code==='C'||c.code==='S') {
          const cp1=c.code==='C'?{x:c.x1,y:c.y1}:previous==='C'||previous==='S'?{x:2*c.x0-control.x,y:2*c.y0-control.y}:{x:c.x0,y:c.y0};
          const cp2={x:c.x2,y:c.y2};cubic(start,apply(m,cp1),apply(m,cp2),p);control=cp2;
        } else if(c.code==='Q'||c.code==='T') {
          const cp=c.code==='Q'?{x:c.x1,y:c.y1}:previous==='Q'||previous==='T'?{x:2*c.x0-control.x,y:2*c.y0-control.y}:{x:c.x0,y:c.y0};
          cubic(start,apply(m,{x:c.x0+(cp.x-c.x0)*2/3,y:c.y0+(cp.y-c.y0)*2/3}),apply(m,{x:c.x+(cp.x-c.x)*2/3,y:c.y+(cp.y-c.y)*2/3}),p);control=cp;
        } else if(c.code==='A') {
          const a=arcParameters(c);
          if(a) {
            const sx=Math.hypot(m[0],m[1]),sy=Math.hypot(m[2],m[3]);
            const r=Math.max(a.rx,a.ry)*Math.hypot(sx,sy);
            const step=Math.min(Math.PI/8,2*Math.acos(Math.max(-1,1-tolerance/Math.max(tolerance,r))));
            const n=Math.max(1,Math.ceil(Math.abs(a.sweep)/Math.max(step,1e-6)));
            if(n>MAX_POINTS)throw Error('圆弧过于复杂，请简化后重试。');
            for(let i=1;i<n;i++){const t=a.start+a.sweep*i/n,x=a.rx*Math.cos(t),y=a.ry*Math.sin(t);push(apply(m,{x:a.cx+a.cos*x-a.sin*y,y:a.cy+a.sin*x+a.cos*y}));}
          }
          push(p);control=null;
        } else {push(p);control=null;}
      }
      previous=c.code;
    }
    flush();return paths;
  }
  function toInt(points) {
    const out=[];
    for(const p of points){const q={X:Math.round(p.x*PRECISION),Y:Math.round(p.y*PRECISION)};if(!out.length||out[out.length-1].X!==q.X||out[out.length-1].Y!==q.Y)out.push(q);}
    if(out.length>1&&out[0].X===out[out.length-1].X&&out[0].Y===out[out.length-1].Y)out.pop();
    return out;
  }
  function union(paths,rule='nonzero') {
    if(!paths.length)return [];
    const c=new ClipperLib.Clipper();c.StrictlySimple=true;
    c.AddPaths(paths.filter(p=>p.length>=3),ClipperLib.PolyType.ptSubject,true);
    const solution=[];const fill=rule==='evenodd'?ClipperLib.PolyFillType.pftEvenOdd:ClipperLib.PolyFillType.pftNonZero;
    if(!c.Execute(ClipperLib.ClipType.ctUnion,solution,fill,fill))throw Error('图形布尔计算失败，请检查 SVG 路径。');
    return solution;
  }
  // A stroke is the union of segment rectangles, join wedges, and end caps.
  // Construct locally, then transform, so non-uniform transforms remain correct.
  function strokeParts(path,stroke,m,normaliseScale) {
    let pts=path.points.slice();
    if(pts.length>1&&dist(pts[0],pts[pts.length-1])<1e-9)pts.pop();
    if(pts.length<2)return [];
    const r=stroke.width/2,parts=[];
    function add(p) {const ip=toInt(p.map(p=>apply(m,p)));if(ip.length>=3){if(!ClipperLib.Clipper.Orientation(ip))ip.reverse();parts.push(ip);}}
    const scale=Math.max(Math.hypot(m[0],m[1]),Math.hypot(m[2],m[3]));
    const nCircle=Math.min(4096,Math.max(16,Math.ceil(Math.PI/Math.acos(Math.max(-1,1-TOLERANCE/Math.max(TOLERANCE,r*scale))))));
    function disk(p){add(Array.from({length:nCircle},(_,i)=>({x:p.x+r*Math.cos(i*2*Math.PI/nCircle),y:p.y+r*Math.sin(i*2*Math.PI/nCircle)})));}
    const n=pts.length,segments=[];
    for(let i=0;i<(path.closed?n:n-1);i++) {
      const a=pts[i],b=pts[(i+1)%n],len=dist(a,b);if(len<1e-12)continue;
      const u={x:(b.x-a.x)/len,y:(b.y-a.y)/len},v={x:-u.y*r,y:u.x*r};segments.push({a,b,u,v,index:i});
      const start=stroke.cap==='square'&&!path.closed&&i===0?-r:0,end=stroke.cap==='square'&&!path.closed&&i===n-2?r:0;
      add([{x:a.x+u.x*start+v.x,y:a.y+u.y*start+v.y},{x:b.x+u.x*end+v.x,y:b.y+u.y*end+v.y},{x:b.x+u.x*end-v.x,y:b.y+u.y*end-v.y},{x:a.x+u.x*start-v.x,y:a.y+u.y*start-v.y}]);
    }
    for(let i=path.closed?0:1;i<(path.closed?n:n-1);i++) {
      const prev=segments.find(s=>s.index===(i-1+n)%n),next=segments.find(s=>s.index===i);if(!prev||!next)continue;
      const p=pts[i],cross=prev.u.x*next.u.y-prev.u.y*next.u.x;
      if(Math.abs(cross)<1e-10) {if(stroke.join==='round')disk(p);continue;}
      if(stroke.join==='round'){disk(p);continue;}
      const sign=cross>0?-1:1,a={x:p.x+sign*prev.v.x,y:p.y+sign*prev.v.y},b={x:p.x+sign*next.v.x,y:p.y+sign*next.v.y};
      const dx=b.x-a.x,dy=b.y-a.y,t=(dx*next.u.y-dy*next.u.x)/cross;
      const corner={x:a.x+t*prev.u.x,y:a.y+t*prev.u.y};
      if(stroke.join==='miter'&&dist(p,corner)<=r*(stroke.miterLimit||4)+1e-9)add([p,a,corner,b]);else add([p,a,b]);
    }
    if(!path.closed&&stroke.cap==='round'){disk(pts[0]);disk(pts[n-1]);}
    return parts;
  }
  function analyzeShapes(shapes) {
    if(!shapes.length)throw Error('没有可计算的填充图形。文字请先转为路径，位图请先矢量化。');
    const b=bounds(shapes),span=Math.max(b.width,b.height);
    if(!(span>0)||span>1e12)throw Error('图形尺寸无效或超出支持范围。');
    const f=1000/span,all=[];let pointCount=0,hasStroke=false;
    const precise={minX:Infinity,minY:Infinity,maxX:-Infinity,maxY:-Infinity};
    for(const s of shapes) {
      const a=s.matrix||[1,0,0,1,0,0],m=[a[0]*f,a[1]*f,a[2]*f,a[3]*f,(a[4]-b.minX)*f,(a[5]-b.minY)*f];
      const paths=flatten(s.commands,m);
      if(s.fill!==false){
        all.push(...union(paths.map(p=>toInt(p.points)),s.fillRule||'nonzero'));
        for(const path of paths)for(const p of path.points){precise.minX=Math.min(precise.minX,p.x);precise.minY=Math.min(precise.minY,p.y);precise.maxX=Math.max(precise.maxX,p.x);precise.maxY=Math.max(precise.maxY,p.y);}
      }
      if(s.stroke&&s.stroke.width>0) {
        hasStroke=true;
        const localScale=Math.max(Math.hypot(m[0],m[1]),Math.hypot(m[2],m[3]),1e-12);
        const local=flatten(s.commands,[1,0,0,1,0,0],TOLERANCE/localScale);
        let parts=[];for(const p of local)parts.push(...strokeParts(p,s.stroke,m,f));
        all.push(...union(parts));
      }
      pointCount+=paths.reduce((sum,p)=>sum+p.points.length,0);
      if(pointCount>MAX_POINTS)throw Error('图形节点过多，请简化 SVG。');
    }
    return measurePolygons(union(all),{normaliseScale:f,tolerance:TOLERANCE,pointCount},b,hasStroke?null:precise);
  }
  function measurePolygons(merged,meta,b={minX:0,minY:0},precise=null) {
    const f=meta.normaliseScale||1;
    let signedArea=0,perimeter=0,minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity,holes=0,outer=0;
    for(const poly of merged) {
      const area=ClipperLib.Clipper.Area(poly)/(PRECISION*PRECISION);signedArea+=area;
      if(area<0)holes++;else outer++;
      for(let i=0;i<poly.length;i++){
        const p=poly[i],q=poly[(i+1)%poly.length];perimeter+=Math.hypot(q.X-p.X,q.Y-p.Y)/PRECISION;
        minX=Math.min(minX,p.X/PRECISION);minY=Math.min(minY,p.Y/PRECISION);maxX=Math.max(maxX,p.X/PRECISION);maxY=Math.max(maxY,p.Y/PRECISION);
      }
    }
    const area=Math.abs(signedArea);
    if(!(area>1e-10)||!Number.isFinite(perimeter))throw Error('图形没有有效填充面积，请检查透明度、描边或路径。');
    // Retain the pre-integer physical bounds when union preserved all extrema.
    // A rounding error of one polygon grid unit must not turn a true 600 mm
    // imported outline into the next height band or reject a 780 mm outline.
    let physicalMinX=minX,physicalMinY=minY,physicalMaxX=maxX,physicalMaxY=maxY;
    if(precise&&['minX','minY','maxX','maxY'].every(k=>Number.isFinite(precise[k]))&&
      Math.abs(precise.minX-minX)<=0.6/PRECISION&&Math.abs(precise.minY-minY)<=0.6/PRECISION&&Math.abs(precise.maxX-maxX)<=0.6/PRECISION&&Math.abs(precise.maxY-maxY)<=0.6/PRECISION){
      physicalMinX=precise.minX;physicalMinY=precise.minY;physicalMaxX=precise.maxX;physicalMaxY=precise.maxY;
    }
    const polygons=merged.map(poly=>poly.map(p=>({x:p.X/PRECISION-minX,y:p.Y/PRECISION-minY})));
    const path=polygons.map(poly=>poly.map((p,i)=>(i?'L':'M')+p.x.toFixed(5)+' '+p.y.toFixed(5)).join('')+'Z').join('');
    return {area,perimeter,width:physicalMaxX-physicalMinX,height:physicalMaxY-physicalMinY,holes,outer,path,polygons,...meta,sourceBounds:{x:physicalMinX/f+b.minX,y:physicalMinY/f+b.minY,width:(physicalMaxX-physicalMinX)/f,height:(physicalMaxY-physicalMinY)/f}};
  }
  function resizeGeometry(base,widthMm,heightMm) {
    if(![widthMm,heightMm].every(v=>Number.isFinite(v)&&v>0&&v<=100000))throw Error('宽度和高度须大于0且不超过100000mm。');
    if(!base?.polygons||!(base.width>0&&base.height>0))throw Error('缺少有效图形轮廓。');
    const sourceAspect=base.height/base.width,targetAspect=heightMm/widthMm;
    // Preserve the previous geometry and precision for proportional sizes.
    if(Math.abs(targetAspect-sourceAspect)<=Math.max(targetAspect,sourceAspect)*1e-12)return base;
    const f=1000/Math.max(widthMm,heightMm),targetWidth=widthMm*f,targetHeight=heightMm*f;
    const paths=base.polygons.map(poly=>poly.map(p=>({X:Math.round(p.x/base.width*targetWidth*PRECISION),Y:Math.round(p.y/base.height*targetHeight*PRECISION)})));
    return measurePolygons(paths,{normaliseScale:f,tolerance:TOLERANCE,pointCount:paths.reduce((sum,p)=>sum+p.length,0)},{minX:0,minY:0},{minX:0,minY:0,maxX:targetWidth,maxY:targetHeight});
  }
  function offsetGeometry(base,offsetMm,baseWidth,join='round',toleranceMm=null) {
    if(!Number.isFinite(offsetMm)||Math.abs(offsetMm)>10000)throw Error('轮廓偏移须为 -10000 至 10000 mm 内的有效数值。');
    if(!Number.isFinite(baseWidth)||baseWidth<=0)throw Error('请先输入有效的原始尺寸。');
    if(offsetMm===0)return base;
    const delta=offsetMm*base.width/baseWidth*PRECISION;
    if(Math.abs(delta)>1e13)throw Error('偏移量相对图形过大，请减小偏移量。');
    // User outline previews need no sub-micron round-corner tessellation.
    // Bound arc deviation in physical mm; internal model calls keep defaults.
    const arcTolerance=toleranceMm===null?TOLERANCE:Math.min(.01,toleranceMm*base.width/baseWidth);
    if(!(Number.isFinite(arcTolerance)&&arcTolerance>0))throw Error('轮廓精度无效。');
    const offsetter=new ClipperLib.ClipperOffset(4,arcTolerance*PRECISION);
    const joinType=join==='miter'?ClipperLib.JoinType.jtMiter:join==='bevel'?ClipperLib.JoinType.jtSquare:ClipperLib.JoinType.jtRound;
    offsetter.AddPaths(base.polygons.map(toInt),joinType,ClipperLib.EndType.etClosedPolygon);
    const solution=[];offsetter.Execute(solution,delta);
    if(!solution.length)throw Error('向内偏移后图形已完全消失，请减小收缩量。');
    const merged=union(solution);
    try{return measurePolygons(merged,{normaliseScale:base.normaliseScale,tolerance:base.tolerance,pointCount:merged.reduce((n,p)=>n+p.length,0),offsetMm});}
    catch(e){throw Error('向内偏移后没有有效填充区域，请减小收缩量。');}
  }
  const PROCESS_DEFAULTS=Object.freeze({beta:0.3,alpha:4,gamma:0.12484,delta:0.0029823,epsilon:0.1246});
  const adhesionCache=new WeakMap();
  function calculateAdhesion(geometry,width){
    if(!Number.isFinite(width)||width<=0)throw Error('附加路径需要有效的图形实际尺寸。');
    let cached=adhesionCache.get(geometry);
    if(cached&&cached.has(width))return cached.get(width);
    const scale=width/geometry.width,height=geometry.height*scale;
    let maxEdge=Math.max(width,height);
    if(Math.abs(maxEdge-200)<=Number.EPSILON*200*16)maxEdge=200;
    const brimLoops=maxEdge>=200?10:5;
    // Fill model holes before generating exterior-only adhesion paths. Positive
    // islands enclosed by another exterior disappear in this union as well.
    const source=union(geometry.polygons.map(toInt).filter(poly=>ClipperLib.Clipper.Area(poly)>0));
    const external=paths=>paths.filter(poly=>ClipperLib.Clipper.Area(poly)>0);
    const outer=external(source);
    if(!outer.length)throw Error('找不到用于 Brim / Skirt 的外侧轮廓。');
    const exteriorLength=paths=>external(paths).reduce((sum,poly)=>sum+poly.reduce((n,p,i)=>{const q=poly[(i+1)%poly.length];return n+Math.hypot(q.X-p.X,q.Y-p.Y)/PRECISION*scale;},0),0);
    function expand(paths,distanceMm){
      const offsetter=new ClipperLib.ClipperOffset(4,TOLERANCE*PRECISION),solution=[];
      offsetter.AddPaths(paths,ClipperLib.JoinType.jtRound,ClipperLib.EndType.etClosedPolygon);
      offsetter.Execute(solution,distanceMm/scale*PRECISION);
      return external(union(solution));
    }
    const brimOffsets=[],brimPerimeters=[];let outermost=null;
    for(let i=1;i<=brimLoops;i++){
      const paths=expand(outer,i);brimOffsets.push(i);brimPerimeters.push(exteriorLength(paths));
      if(i===brimLoops)outermost=paths;
    }
    // Skirt is offset from the final Brim boundary, not from the model.
    const skirtGaps=[5,6],skirtPerimeters=skirtGaps.map(gap=>exteriorLength(expand(outermost,gap)));
    const BR=brimPerimeters.reduce((sum,n)=>sum+n,0),SK=skirtPerimeters.reduce((sum,n)=>sum+n,0);
    if(![BR,SK].every(n=>Number.isFinite(n)&&n>0))throw Error('Brim / Skirt 路径计算失败。');
    const result={BR,SK,brimLoops,brimOffsets,brimPerimeters,skirtGaps,skirtOffsets:skirtGaps.map(gap=>brimLoops+gap),skirtPerimeters,outerPerimeter:exteriorLength(outer),width,height};
    if(!cached){cached=new Map();adhesionCache.set(geometry,cached);}cached.set(width,result);
    if(cached.size>12)cached.delete(cached.keys().next().value);
    return result;
  }
  function processRules(width,height){
    if(![width,height].every(Number.isFinite)||width<=0||height<=0)throw Error('请输入有效的图形尺寸。');
    let maxEdge=Math.max(width,height);
    // Only absorb floating-point arithmetic noise at exact band boundaries.
    for(const edge of [200,400,600,780])if(Math.abs(maxEdge-edge)<=Number.EPSILON*edge*16)maxEdge=edge;
    return {maxEdge,h:maxEdge<=200?30:maxEdge<=400?40:maxEdge<=600?50:60,walls:maxEdge<=400?2:3};
  }
  const calibrationShapeCache=new WeakMap();
  function calibrationSignature(geometry){
    let bits='';
    for(let row=0;row<16;row++)for(let col=0;col<16;col++){
      const x=(col+.5)*geometry.width/16,y=(row+.5)*geometry.height/16;let winding=0;
      for(const polygon of geometry.polygons)for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
        const a=polygon[j],b=polygon[i],cross=(b.x-a.x)*(y-a.y)-(x-a.x)*(b.y-a.y);
        if(a.y<=y&&b.y>y&&cross>0)winding++;
        else if(a.y>y&&b.y<=y&&cross<0)winding--;
      }
      bits+=winding!==0?'1':'0';
    }
    return bits.match(/.{4}/g).map(v=>parseInt(v,2).toString(16)).join('');
  }
  function matchesCalibration(geometry,profile){
    const saved=calibrationShapeCache.get(geometry);
    if(saved&&saved.profile===profile)return saved.matches;
    const ref=profile.referenceGeometry,near=(a,b)=>Math.abs(a-b)<=Math.max(Math.abs(b),1e-12)*3e-5;
    const matches=geometry.holes===ref.holes&&geometry.outer===ref.outer&&
      near(geometry.width/geometry.height,ref.aspect)&&near(geometry.area/geometry.height**2,ref.area)&&
      near(geometry.perimeter/geometry.height,ref.perimeter)&&calibrationSignature(geometry)===ref.signature;
    calibrationShapeCache.set(geometry,{profile,matches});return matches;
  }
  function calibrationAdjustment(geometry,width,params,uncompensatedLength){
    const inactive=(reason,status)=>({applied:false,reason,status,correctionFilament:0});
    if((params.calibration||'off')==='off')return inactive('已关闭标定补偿','off');
    if(params.calibration!=='auto')throw Error('无效的克重补偿模式。');
    const profile=g.PRINT_CALIBRATION_PROFILE;
    if(!profile)return inactive('无可用标定数据','missing-profile');
    if(params.modelOffset||geometry.offsetMm)return inactive('轮廓已偏移，暂用通用估算','offset');
    if(!matchesCalibration(geometry,profile))return inactive('当前轮廓无匹配标定，使用通用估算','shape');
    let size=geometry.height*width/geometry.width;
    const nearest=profile.points.find(p=>Math.abs(p.size-size)<1e-7);
    if(nearest)size=nearest.size;
    if(size<profile.minSize||size>profile.maxSize)return inactive('标定范围为字形高度60–750 mm，当前使用通用估算','range');
    const baseline=profile.baseline;
    for(const key of ['beta','alpha','gamma','epsilon']){
      const value=key==='epsilon'?(params.epsilon??PROCESS_DEFAULTS.epsilon):params[key];
      if(Math.abs(value-baseline[key])>Math.max(1,Math.abs(baseline[key]))*1e-12)return inactive('工艺系数已修改，暂用通用估算','parameters');
    }
    const rule=processRules(width,size);
    if(Math.abs(params.h-rule.h)>1e-9||params.walls!==rule.walls)return inactive('高度或围边道数与标定工艺不同，暂用通用估算','process');
    const points=profile.points.filter(p=>p.h===rule.h&&p.walls===rule.walls);
    let lower=points[0],upper=points.at(-1),method='interpolated';
    if(size<=lower.size){upper=lower;method=size===lower.size?'anchor':'tier-endpoint';}
    else if(size>=upper.size){lower=upper;method=size===upper.size?'anchor':'tier-endpoint';}
    else for(let i=1;i<points.length;i++)if(size<=points[i].size){lower=points[i-1];upper=points[i];break;}
    if(size===upper.size){lower=upper;method='anchor';}
    const t=lower.size===upper.size?0:(size-lower.size)/(upper.size-lower.size);
    const correctionFilament=lower.correctionFilament+(upper.correctionFilament-lower.correctionFilament)*t;
    // Do not silently truncate an impossible result into a plausible weight.
    if(!Number.isFinite(correctionFilament)||uncompensatedLength-correctionFilament<=0)return inactive('补偿超出当前用量，暂用通用估算','invalid-correction');
    const reason=method==='anchor'?`国字标定 · ${size} mm参考点`:method==='tier-endpoint'?`国字标定 · 沿用同档${lower.size} mm端点补偿`:`国字标定 · ${lower.size}–${upper.size} mm同档插值`;
    return {applied:true,reason,status:'applied',profile:profile.id,size,lowerSize:lower.size,upperSize:upper.size,method,correctionFilament};
  }
  function calculate(geometry,width,params,adhesion) {
    const {h,beta,alpha,gamma,delta,epsilon=PROCESS_DEFAULTS.epsilon,walls=1}=params;
    const entries={width,h,beta,alpha,gamma,delta,epsilon,walls};
    if(!Object.values(entries).every(Number.isFinite))throw Error('请输入有限的有效数字。');
    if(width<=0||width>100000)throw Error('图形尺寸须大于 0 且不超过 100000 mm。');
    if(h<=0||beta<=0)throw Error('模型高度和打印层高必须大于 0。');
    if(alpha<0||!Number.isInteger(alpha))throw Error('底面层数必须为非负整数。');
    if(walls<1||!Number.isSafeInteger(walls))throw Error('围边道数必须为正整数。');
    if(gamma<=0||delta<=0)throw Error('线面系数和线重系数必须大于 0。');
    if(epsilon<=0)throw Error('走线转原丝系数 ε 必须大于 0。');
    const scale=width/geometry.width,C=geometry.perimeter*scale,S=geometry.area*scale*scale;
    // Prevent floating representation from turning an exact integer into N+1.
    const ratio=h/beta,nearest=Math.round(ratio),N=Math.abs(ratio-nearest)<=Number.EPSILON*Math.max(1,Math.abs(ratio))*8?nearest:Math.ceil(ratio);
    if(!Number.isSafeInteger(N)||N<1)throw Error('打印层数超出可计算范围。');
    const added=adhesion||calculateAdhesion(geometry,width),{BR,SK,brimLoops}=added;
    // Lw/BR/SK are nozzle travel; gamma already converts filled bottom area
    // into raw filament feed. Convert each travel component exactly once.
    const Lw=C*N*walls,Ld=S*alpha*gamma;
    const LwFilament=Lw*epsilon,BRFilament=BR*epsilon,SKFilament=SK*epsilon;
    const L0=LwFilament+Ld+BRFilament+SKFilament,W0=L0*delta;
    const calibration=calibrationAdjustment(geometry,width,params,L0),correctionFilament=calibration.correctionFilament;
    const L=L0-correctionFilament,W=L*delta,correctionWeight=correctionFilament*delta;
    if(![C,S,Lw,Ld,BR,SK,LwFilament,BRFilament,SKFilament,L0,W0,correctionFilament,correctionWeight,L,W].every(Number.isFinite))throw Error('计算超出数值范围，请减小参数。');
    return {C,S,N,walls,epsilon,Lw,Ld,BR,SK,LwFilament,BRFilament,SKFilament,brimLoops,L0,W0,correctionFilament,correctionWeight,calibration,L,W,width,height:geometry.height*scale,curveTolerance:geometry.tolerance*scale};
  }
  g.PrintGeometry={parse,flatten,analyzeShapes,resizeGeometry,offsetGeometry,calculateAdhesion,calculate,calibrationAdjustment,matchesCalibration,arcParameters,apply,processRules,PROCESS_DEFAULTS};
})(globalThis);

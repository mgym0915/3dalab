import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import crypto from 'node:crypto';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url),dom=require('./vendor/svgdom.cjs'),source=path.join(path.dirname(fileURLToPath(import.meta.url)),'vendor/source');
const camel=s=>s.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
class Matrix extends dom.SVGMatrix{constructor(a){super();if(a)[this.a,this.b,this.c,this.d,this.e,this.f]=a;}}
const defaults={fill:'black',fillRule:'nonzero',fillOpacity:'1',stroke:'none',strokeOpacity:'1',strokeWidth:'1',strokeLinejoin:'miter',strokeLinecap:'butt',strokeMiterlimit:'4',opacity:'1',display:'inline',visibility:'visible',clipPath:'none',maskImage:'none',filter:'none',strokeDasharray:'none',vectorEffect:'none',markerStart:'none',markerMid:'none',markerEnd:'none'};
const inherited=new Set(['fill','fillRule','fillOpacity','stroke','strokeOpacity','strokeWidth','strokeLinejoin','strokeLinecap','strokeMiterlimit','visibility','strokeDasharray','markerStart','markerMid','markerEnd']);
function style(node){const result={...defaults};if(node.parentNode?.nodeType===1){const parent=style(node.parentNode);for(const key of inherited)result[key]=parent[key];}for(const attr of node.attributes||[])if(camel(attr.name)in defaults)result[camel(attr.name)]=attr.value;
 const styles=node.ownerDocument.querySelectorAll('style');const rules=[];for(const sheet of styles)for(const m of sheet.textContent.matchAll(/([^{}]+)\{([^{}]*)\}/g))for(const selector of m[1].split(',')){try{if(node.matches(selector.trim()))rules.push({selector:selector.trim(),body:m[2],specificity:(selector.match(/#/g)||[]).length*100+(selector.match(/\./g)||[]).length*10+(selector.match(/\b[a-z]+\b/gi)||[]).length});}catch{throw Error('SVG样式选择器不受支持');}}
 function apply(raw){for(const item of raw.split(';')){const i=item.indexOf(':');if(i>=0)result[camel(item.slice(0,i).trim())]=item.slice(i+1).trim().replace(/\s*!important$/,'');}}rules.sort((a,b)=>a.specificity-b.specificity).forEach(r=>apply(r.body));apply(node.getAttribute('style')||'');return result;}
function unit(raw){const m=String(raw||0).match(/^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)\s*(mm|cm|in|pt|pc|px)?$/i);if(!m)throw Error('SVG长度无效');return +m[1]*({mm:96/25.4,cm:96/2.54,in:96,pt:96/72,pc:16,px:1}[(m[2]||'px').toLowerCase()]);}
function viewport(el){const vb=(el.getAttribute('viewBox')||'').trim().split(/[\s,]+/).map(Number);if(vb.length!==4||vb[2]<=0||vb[3]<=0)return new Matrix();const width=unit(el.getAttribute('width')||vb[2]),height=unit(el.getAttribute('height')||vb[3]);let sx=width/vb[2],sy=height/vb[3],ox=0,oy=0;const preserve=el.getAttribute('preserveAspectRatio')||'xMidYMid meet';if(!/\bnone\b/.test(preserve)){const q=/\bslice\b/.test(preserve)?Math.max(sx,sy):Math.min(sx,sy);sx=sy=q;ox=(width-vb[2]*q)*(/xMax/.test(preserve)?1:/xMin/.test(preserve)?0:.5);oy=(height-vb[3]*q)*(/YMax/.test(preserve)?1:/YMin/.test(preserve)?0:.5);}return new Matrix([sx,0,0,sy,ox-vb[0]*sx,oy-vb[1]*sy]);}
function decorate(doc){for(const el of doc.querySelectorAll('*')){
 for(const key of ['x','y','x1','y1','x2','y2','width','height','cx','cy','r','rx','ry'])if(el[key]===undefined)Object.defineProperty(el,key,{get:()=>({baseVal:{value:unit(el.getAttribute(key)||0)}}),configurable:true});
 if(el instanceof dom.SVGGraphicsElement){Object.defineProperty(el,'transform',{get:()=>({baseVal:{consolidate:()=>el.hasAttribute('transform')?{matrix:el.matrixify()}:null}}),configurable:true});el.getCTM=()=>{const chain=[];for(let n=el;n?.nodeType===1;n=n.parentNode)chain.unshift(n);let matrix=new Matrix();for(const n of chain){if(n.matrixify)matrix=matrix.multiply(n.matrixify());if(n.localName==='svg')matrix=matrix.multiply(viewport(n));}return matrix;};}
 if(['polygon','polyline'].includes(el.localName)&&!el.points)Object.defineProperty(el,'points',{get:()=>{const p=(el.getAttribute('points')||'').trim().split(/[\s,]+/).map(Number);return Array.from({length:Math.floor(p.length/2)},(_,i)=>({x:p[i*2],y:p[i*2+1]}));}});
 }return doc;}
class Parser{parseFromString(text){if(/<!ENTITY/i.test(text))throw Error('不支持XML实体声明');const doc=dom.createSVGDocument();doc.removeChild(doc.documentElement);dom.HTMLParser(text,doc);return decorate(doc);}}
export function createKernel({native=false}={}){
 // Native globals are used only inside the dedicated production worker.
 const globals={console,atob:s=>Buffer.from(s,'base64').toString('binary'),btoa:s=>Buffer.from(s,'binary').toString('base64'),setTimeout,clearTimeout,setImmediate,clearImmediate,TextDecoder,TextEncoder,Uint8Array,ArrayBuffer,Buffer,DOMParser:Parser,DOMMatrix:Matrix,getComputedStyle:style};
 const context=native?Object.assign(globalThis,globals):vm.createContext({...globals,navigator:{userAgent:'Node.js'}});
 context.window=context;context.self=context;
 const load=(name,transform=s=>s)=>native?vm.runInThisContext(transform(fs.readFileSync(path.join(source,name),'utf8')),{filename:name}):vm.runInContext(transform(fs.readFileSync(path.join(source,name),'utf8')),context,{filename:name});
 for(const name of ['clipper.js','svg-path-parser.js','geometry.js','opentype.min.js','jszip.min.js','dynamic-model.js','price-data.js','price-model.js'])load(name);
 load('svg-import.js',s=>s.replace("const host=document.createElement('div');host.style.cssText='position:fixed;left:-100000px;top:0;width:1024px;height:768px;opacity:0;pointer-events:none;contain:layout style;';","const host={remove(){}};").replace("const shadow=host.attachShadow({mode:'closed'}),root=document.importNode(doc.documentElement,true);","const root=doc.documentElement;").replace('shadow.append(root);document.body.append(host);',''));
 load('three-mf-import.js');const P=context.PrintGeometry,M=context.MechanisticEstimator,sources=new Map(),fonts=new Map(),textCache=new Map();
 function font(key){if(!fonts.has(key)){load('fonts/'+key+'.js');const b=Buffer.from(context.FONT_DATA[key],'base64');fonts.set(key,context.opentype.parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)));delete context.FONT_DATA[key];}return fonts.get(key);}
 function textGeometry(text){
  if(typeof text!=='string'||Array.from(text).length>100||!text.trim())throw Error('请输入1至100个字符。');
  if(textCache.has(text))return textCache.get(text);
  let x=0,y=1000,previous=null,previousFont=null,commands=[];
  for(const char of text.replace(/\r/g,'')){
   if(char==='\n'){x=0;y+=1250;previous=null;continue;}if(char==='\t'){x+=2000;previous=null;continue;}
   const selected=font(/[\x00-\x7f]/.test(char)?'ariblk':'simhei'),glyph=selected.charToGlyph(char);
   if(!glyph.index&&!/\s/.test(char))throw Error('固定字体不包含字符「'+char+'」。');
   if(previous&&previousFont===selected)x+=selected.getKerningValue(previous,glyph)*1000/selected.unitsPerEm;
   commands.push(...glyph.getPath(x,y,1000).commands);x+=(glyph.advanceWidth||selected.unitsPerEm)*1000/selected.unitsPerEm;previous=glyph;previousFont=selected;
  }
  const p=new context.opentype.Path();p.commands=commands;
  const g=P.analyzeShapes([{commands:P.parse(p.toPathData(6)),fillRule:'nonzero'}]);textCache.set(text,g);if(textCache.size>12)textCache.delete(textCache.keys().next().value);return g;
 }
 async function parseSource(owner,s){
  if(!s||typeof s!=='object')throw Error('请提供文字或图形文件。');
  let g,width=100,profile=null;
  if(s.kind==='text')g=textGeometry(s.text);
  else if(s.kind==='svg'){
   if(typeof s.svg!=='string'||Buffer.byteLength(s.svg)>8*1024*1024)throw Error('SVG文件过大。');
   if(!['auto','contours','appearance'].includes(s.mode||'auto'))throw Error('导入方式无效。');
   const p=await context.SVGImport.parseSVG(s.svg,{mode:s.mode||'auto'});g=p.geometry;width=p.suggestedWidth||100;
  }else if(s.kind==='3mf'){
   if(typeof s.bytes!=='string'||s.bytes.length>Math.ceil(32*1024*1024/3)*4||!/^[A-Za-z0-9+/]*={0,2}$/.test(s.bytes))throw Error('3MF文件无效或过大。');
   const bytes=Buffer.from(s.bytes,'base64');if(bytes.length>32*1024*1024)throw Error('3MF文件过大。');
   profile=await context.ThreeMFImport.parse(new Uint8Array(bytes),String(s.name||'模型.3mf'));g=profile.geometry;width=profile.width;
  }else throw Error('图形来源无效。');
  const id=crypto.randomUUID(),record={owner,g,width,profile,results:new Map(),created:Date.now()};
  sources.set(id,record);const own=[...sources].filter(([,v])=>v.owner===owner);if(own.length>12)sources.delete(own[0][0]);if(sources.size>128)sources.delete(sources.keys().next().value);
  return {id,record};
 }
 return{context,async execute(owner,input,onProgress){
  if(input.action!=='calculate')throw Error('计算类型无效。');const d=input.data||{};
  let id=d.sourceId,record;
  if(id){record=sources.get(id);if(!record||record.owner!==owner)throw Error('SOURCE_EXPIRED');}
  else {onProgress?.({stage:d.source?.kind==='text'?'text':d.source?.kind==='3mf'?'model':'svg',fraction:.03});({id,record}=await parseSource(owner,d.source));}
  const g=record.g,sourceAspect=g.height/g.width,adjustment=d.adjustmentMm===undefined?0:Number(d.adjustmentMm),join=d.join||'round';
  if(d.lockAspect!==undefined&&typeof d.lockAspect!=='boolean')throw Error('无效的等比锁定状态。');
  if(d.lastEdited!==undefined&&!['width','height'].includes(d.lastEdited))throw Error('无效的尺寸方向。');
  let width=d.widthMm===undefined?record.width:Number(d.widthMm),originalHeight=d.heightMm===undefined?width*sourceAspect:Number(d.heightMm);
  if(d.lockAspect!==false){if(d.lastEdited==='height'&&d.heightMm!==undefined)width=originalHeight/sourceAspect;else originalHeight=width*sourceAspect;}
  if(![width,originalHeight].every(v=>Number.isFinite(v)&&v>0&&v<=100000))throw Error('宽度和高度须大于0且不超过100000mm。');
  if(!Number.isFinite(adjustment)||adjustment!==0||d.offsetMm!==undefined&&Number(d.offsetMm)!==0)throw Error('不支持修改轮廓偏移。');
  const key=JSON.stringify([width,originalHeight,adjustment,join]);if(record.results.has(key)){onProgress?.({stage:'cached',fraction:.99});return record.results.get(key);}
  const baseOffset=0,offset=0;
  onProgress?.({stage:'geometry',fraction:.09});
  const sized=P.resizeGeometry(g,width,originalHeight),final=sized,finalWidth=width*final.width/sized.width,finalHeight=width*final.height/sized.width,rule=P.processRules(finalWidth,finalHeight),h=rule.h;
  const model=record.profile?{geometry:final,width:finalWidth,xyScale:1,zScale:1,depth:record.profile.depth,segments:record.profile.segments.map(s=>s.slice()),config:{...record.profile.config}}:
   {geometry:final,width:finalWidth,xyScale:1,zScale:1,depth:h,segments:[[1,5,0,h/2],[0,0,0,h/2]],config:{layer_height:.3,initial_layer_print_height:.3,outer_wall_line_width:1,filament_flow_ratio:1,filament_diameter:1.75,filament_density:1.24,wall_loops:rule.maxEdge>400?2:1,extra_wall_loops:1,extra_loops_height:h-5,v_groove_1_thickness:2,bottom_shell_layers:rule.maxEdge>600?5:4,brim_width:10,skirt_distance:3,skirt_loops:2}};
  model.productOptions=true;model.config.bottom_shell_layers=4;
  onProgress?.({stage:'prepare',fraction:.12});
  const calculated=M.predict(model,onProgress);
  onProgress?.({stage:'pricing',fraction:.98});
  const scale=finalWidth/final.width,base={metrics:{width:finalWidth,height:finalHeight,areaMm2:final.area*scale*scale,perimeterMm:final.perimeter*scale},mass:{wall:calculated.wallMass,bottom:Object.fromEntries(Object.entries(calculated.productBottomVolumes).map(([key,v])=>[key,v*calculated.F*calculated.density/1000])),brim:calculated.brimMass,skirt:calculated.skirtMass,printHeight:calculated.height}};
  const quotes={};for(const product of ['smooth','diamond'])for(const color of ['single','multi'])for(const lighting of ['steady','rgb'])quotes[[product,color,lighting].join('|')]=context.PriceModel.quote(base,{product,color,lighting,installation:'wall'});
  const result={sourceId:id,sourceAspect,originalSize:{width,height:originalHeight},finalSize:{width:finalWidth,height:finalHeight},offset:{base:0,adjustment:0,total:0},quotes,preview:{path:final.path,width:final.width,height:final.height,outer:final.outer,holes:final.holes}};
  record.results.set(key,result);if(record.results.size>12)record.results.delete(record.results.keys().next().value);return result;
 }};
}


(function(g){
  'use strict';
  const MAX_FILE=32*1024*1024;
  function xml(text,label){
    if(/<!DOCTYPE|<!ENTITY/i.test(text))throw Error(label+'含不支持的文档声明。');
    const doc=new DOMParser().parseFromString(text,'application/xml');
    if(doc.getElementsByTagName('parsererror').length)throw Error(label+' XML无法解析。');
    return doc;
  }
  const elements=(node,name)=>Array.from(node.getElementsByTagNameNS('*',name));
  function matrix(value){
    const m=value?value.trim().split(/\s+/).map(Number):[1,0,0,0,1,0,0,0,1,0,0,0];
    if(m.length!==12||!m.every(Number.isFinite))throw Error('3MF含无效变换矩阵。');
    if([1,2,3,5,6,7].some(i=>Math.abs(m[i])>1e-8)||m[8]<=0)throw Error('请先将3MF旋转或倾斜应用到SVG。当前支持单模型等比XY缩放和镜像。');
    return m;
  }
  function safePath(path){
    const p=path.replace(/^\//,'');
    if(!p||p.includes('..')||p.includes('\\')||/^[a-z]+:/i.test(p))throw Error('3MF中的文件路径无效。');
    return p;
  }
  async function parse(buffer,name='model.3mf'){
    if(Object.prototype.toString.call(buffer)!=='[object ArrayBuffer]'&&!ArrayBuffer.isView(buffer))throw Error('3MF文件数据无效。');
    if(buffer.byteLength>MAX_FILE)throw Error('3MF最大支持32MB。');
    const bytes=ArrayBuffer.isView(buffer)?new Uint8Array(buffer.buffer,buffer.byteOffset,buffer.byteLength):new Uint8Array(buffer);
    const zip=await JSZip.loadAsync(bytes,{createFolders:false});
    if(Object.keys(zip.files).length>1500)throw Error('3MF内容过多，请只导出一个SVG模型。');
    async function read(path,max){
      const entry=zip.file(safePath(path));if(!entry)throw Error('3MF缺少 '+path+'。');
      if(entry._data&&entry._data.uncompressedSize>max)throw Error('3MF中的 '+path+' 过大。');
      const bytes=await entry.async('uint8array');if(bytes.length>max)throw Error('3MF内容超出读取限制。');
      return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
    }
    const model=xml(await read('3D/3dmodel.model',5*1024*1024),'3MF模型');
    const unit=model.documentElement.getAttribute('unit')||'millimeter';if(unit!=='millimeter')throw Error('3MF模型单位须为毫米。');
    const items=elements(model,'item').filter(e=>e.getAttribute('printable')!=='0');
    if(items.length!==1)throw Error('请使用只含一个SVG生成模型的3MF文件。');
    const object=elements(model,'object').find(e=>e.getAttribute('id')===items[0].getAttribute('objectid'));
    if(!object)throw Error('3MF模型引用无效。');
    const components=elements(object,'component');if(components.length!==1)throw Error('当前3MF导入支持一个SVG生成的模型组件。');
    const im=matrix(items[0].getAttribute('transform')),cm=matrix(components[0].getAttribute('transform'));
    const sx=Math.abs(im[0]*cm[0]),sy=Math.abs(im[4]*cm[4]),sz=im[8]*cm[8];
    if(!(sx>0&&sy>0&&sz>0)||Math.abs(sx-sy)>Math.max(sx,sy)*1e-7)throw Error('3MF须等比缩放XY，不能使用非等比拉伸。');
    const settings=xml(await read('Metadata/model_settings.config',1024*1024),'3MF模型设置');
    const shapes=elements(settings,'BambuStudioShape');if(shapes.length!==1)throw Error('此3MF未包含唯一的SVG截面信息，请导入原SVG并设置工艺。');
    const shape=shapes[0],svgPath=shape.getAttribute('filepath3mf');if(!svgPath)throw Error('3MF没有嵌入SVG轮廓。');
    const depth=Number(shape.getAttribute('depth'))*sz;
    if(!(depth>0&&Number.isFinite(depth)))throw Error('3MF模型高度无效。');
    const segments=String(shape.getAttribute('svg_shell_segments')||'').split(';').filter(Boolean).map(s=>s.split(',').map(Number));
    if(!segments.length||segments.some(s=>s.length!==4||!s.every(Number.isFinite)||![0,1].includes(s[0])||s[3]<0))throw Error('3MF截面偏移设置不受支持。');
    const physicalSegments=segments.map(([kind,amount,unused,h])=>[kind,amount*sx,unused,h*sz]);
    let project;try{project=JSON.parse(await read('Metadata/project_settings.config',2*1024*1024));}catch(e){throw Error('3MF工艺设置无法读取：'+e.message);}
    const modelObject=elements(settings,'object').find(e=>e.getAttribute('id')===items[0].getAttribute('objectid'));
    if(modelObject)for(const e of Array.from(modelObject.children))if(e.localName==='metadata'&&e.hasAttribute('key')&&e.hasAttribute('value')){
      const key=e.getAttribute('key');if(Object.prototype.hasOwnProperty.call(project,key))project[key]=e.getAttribute('value');
    }
    function setting(key,fallback){
      let value=project[key];if(Array.isArray(value))value=value[0];if(value==null||value==='')value=fallback;
      if(typeof value==='string')value=value.split(',')[0];
      const n=Number(value);if(!Number.isFinite(n))throw Error('3MF工艺参数无效：'+key);return n;
    }
    const config={layer_height:setting('layer_height',.3),initial_layer_print_height:setting('initial_layer_print_height',.3),outer_wall_line_width:setting('outer_wall_line_width',setting('line_width',1)),filament_flow_ratio:setting('filament_flow_ratio',1),filament_diameter:setting('filament_diameter',1.75),filament_density:setting('filament_density',1.24),wall_loops:setting('wall_loops',1),extra_wall_loops:setting('extra_wall_loops',1),extra_loops_height:setting('extra_loops_height',depth-5),v_groove_1_thickness:setting('v_groove_1_thickness',2),bottom_shell_layers:setting('bottom_shell_layers',4),brim_width:setting('brim_width',0),skirt_distance:setting('skirt_distance',3),skirt_loops:setting('skirt_loops',2)};
    if(![config.layer_height,config.initial_layer_print_height,config.outer_wall_line_width,config.filament_flow_ratio,config.filament_diameter,config.filament_density,config.wall_loops].every(n=>n>0))throw Error('3MF含非正数打印参数。');
    const svg=await read(svgPath,8*1024*1024),parsed=await SVGImport.parseSVG(svg,{mode:'contours'});
    const sourceWidth=parsed.suggestedWidth;if(!(sourceWidth>0))throw Error('3MF的SVG缺少可确认的物理尺寸。');
    const mirrorX=im[0]*cm[0]<0,mirrorY=im[4]*cm[4]<0;
    let geometry=parsed.geometry;
    if(mirrorX||mirrorY)geometry=PrintGeometry.analyzeShapes([{commands:PrintGeometry.parse(geometry.path),fillRule:'nonzero',matrix:[mirrorX?-1:1,0,0,mirrorY?-1:1,0,0]}]);
    return {name,svg,geometry,width:sourceWidth*sx,height:geometry.height/geometry.width*sourceWidth*sx,depth,segments:physicalSegments,config,xyScale:sx,zScale:sz,svgPath,mirrorX,mirrorY};
  }
  g.ThreeMFImport={parse};
})(globalThis);

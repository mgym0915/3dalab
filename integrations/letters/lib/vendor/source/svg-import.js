(function(g){
  'use strict';
  const NS='http://www.w3.org/2000/svg';
  const unsupported='不支持此 SVG 的';
  const finite=(v)=>{if(!Number.isFinite(v))throw Error('SVG 含有无效坐标。');return v;};
  function length(el,name,fallback=0){return el[name]&&el[name].baseVal?finite(el[name].baseVal.value):fallback;}
  function pathData(el){
    const tag=el.localName;
    if(tag==='path')return el.getAttribute('d')||'';
    if(tag==='rect'){
      const x=length(el,'x'),y=length(el,'y'),w=length(el,'width'),h=length(el,'height');
      if(w<=0||h<=0)return '';
      let rx=length(el,'rx'),ry=length(el,'ry');
      if(!el.hasAttribute('rx'))rx=ry;if(!el.hasAttribute('ry'))ry=rx;
      rx=Math.min(w/2,Math.max(0,rx));ry=Math.min(h/2,Math.max(0,ry));
      if(!rx||!ry)return `M${x} ${y}h${w}v${h}h${-w}Z`;
      return `M${x+rx} ${y}H${x+w-rx}A${rx} ${ry} 0 0 1 ${x+w} ${y+ry}V${y+h-ry}A${rx} ${ry} 0 0 1 ${x+w-rx} ${y+h}H${x+rx}A${rx} ${ry} 0 0 1 ${x} ${y+h-ry}V${y+ry}A${rx} ${ry} 0 0 1 ${x+rx} ${y}Z`;
    }
    if(tag==='circle'||tag==='ellipse'){
      const x=length(el,'cx'),y=length(el,'cy'),rx=length(el,tag==='circle'?'r':'rx'),ry=length(el,tag==='circle'?'r':'ry');
      return rx>0&&ry>0?`M${x-rx} ${y}A${rx} ${ry} 0 1 0 ${x+rx} ${y}A${rx} ${ry} 0 1 0 ${x-rx} ${y}Z`:'';
    }
    if(tag==='line')return `M${length(el,'x1')} ${length(el,'y1')}L${length(el,'x2')} ${length(el,'y2')}`;
    if(tag==='polygon'||tag==='polyline'){
      const pts=Array.from(el.points||[]);return pts.map((p,i)=>(i?'L':'M')+p.x+' '+p.y).join('')+(tag==='polygon'?'Z':'');
    }
    throw Error(unsupported+`「${tag}」元素。请导出为普通填充路径。`);
  }
  function alpha(color){
    if(color==='none'||color==='transparent')return 0;
    const a=color.match(/rgba\([^)]*,\s*([\d.]+)\s*\)$/);return a?Number(a[1]):1;
  }
  function sanitizeDocumentDeclaration(text){
    if(/<!ENTITY/i.test(text))throw Error('SVG 含有不支持的实体声明。');
    const simple=/^<!DOCTYPE\s+svg\s*>$/i;
    const public11=/^<!DOCTYPE\s+svg\s+PUBLIC\s+["']-\/\/W3C\/\/DTD SVG 1\.1\/\/EN["']\s+["']https?:\/\/www\.w3\.org\/Graphics\/SVG\/1\.1\/DTD\/svg11\.dtd["']\s*>$/i;
    const system11=/^<!DOCTYPE\s+svg\s+SYSTEM\s+["']https?:\/\/www\.w3\.org\/Graphics\/SVG\/1\.1\/DTD\/svg11\.dtd["']\s*>$/i;
    const clean=text.replace(/<!DOCTYPE[\s\S]*?>/gi,declaration=>{
      if(declaration.includes('[')||!(simple.test(declaration)||public11.test(declaration)||system11.test(declaration)))throw Error('SVG 含有不支持的文档声明，请导出为标准 SVG。');
      return '';
    });
    if(/<!DOCTYPE/i.test(clean))throw Error('SVG 文档声明不完整。');
    return clean;
  }
  function closedCommands(commands){
    let open=false,seen=false;
    for(const c of commands){if(c.code==='M'){if(open)return false;open=true;seen=true;}else if(c.code==='Z')open=false;else if(!open)return false;}
    return seen&&!open;
  }
  async function parseSVG(text,options={}){
    if(text.length>8*1024*1024)throw Error('SVG 文件过大，最大支持 8 MB。');
    const corelHint=/<!--\s*Creator:\s*CorelDRAW\s*-->/i.test(text);
    text=sanitizeDocumentDeclaration(text);
    const doc=new DOMParser().parseFromString(text,'image/svg+xml');
    if(doc.querySelector('parsererror')||doc.documentElement.localName!=='svg')throw Error('SVG 文件格式无效，请检查文件是否完整。');
    if(doc.documentElement.namespaceURI!==NS)throw Error('SVG缺少正确的命名空间，请在根svg标签添加 xmlns="http://www.w3.org/2000/svg" 后重新导入。');
    const corel=corelHint||doc.documentElement.getAttribute('xmlns:xodm')==='http://www.corel.com/coreldraw/odm/2003'||Array.from(doc.querySelectorAll('metadata')).some(el=>(el.id||'').startsWith('CorelCorpID_'));
    const requested=options.mode||'auto';
    const contours=requested==='contours'||requested==='auto'&&corel;
    let convertedContours=0;
    for(const el of doc.querySelectorAll('*')){
      if(['script','foreignObject','iframe','audio','video','animate','animateTransform','set'].includes(el.localName))throw Error(unsupported+'脚本、动画或外部内容。');
      for(const attr of el.attributes){
        if(/^on/i.test(attr.name))throw Error('SVG 含有不支持的事件脚本。');
        if(/href$/i.test(attr.name)&&attr.value&&!attr.value.startsWith('#'))throw Error('离线计算不支持 SVG 外部链接或嵌入位图，请先转为路径。');
        if(/url\(\s*['"]?(?!#)/i.test(attr.value))throw Error('SVG 含有外部资源引用。');
      }
    }
    for(const s of doc.querySelectorAll('style'))if(/@|url\(|animation|transition/i.test(s.textContent))throw Error('SVG 样式含有不支持的外部资源或动态规则，请先展平样式。');
    let expanded=0;
    function expandUse(parent,chain=[]){
      for(const use of Array.from(parent.querySelectorAll('use'))){
        if(!parent.contains(use))continue;
        if(++expanded>2000)throw Error('SVG 引用过多或存在循环引用。');
        const href=use.getAttribute('href')||use.getAttributeNS('http://www.w3.org/1999/xlink','href')||'';
        const id=href.slice(1),target=doc.getElementById(id);
        if(!target||chain.includes(id))throw Error('SVG 包含失效或循环的 use 引用。');
        if(target.localName==='symbol'||target.localName==='svg')throw Error(unsupported+'symbol 实例，请先展开为路径。');
        const wrap=doc.createElementNS(NS,'g');
        for(const a of use.attributes)if(!['href','xlink:href','x','y','width','height','transform'].includes(a.name))wrap.setAttribute(a.name,a.value);
        const x=use.getAttribute('x')||0,y=use.getAttribute('y')||0;
        if(!Number.isFinite(Number(x))||!Number.isFinite(Number(y)))throw Error('use 的 x、y 请使用无单位坐标。');
        wrap.setAttribute('transform',(use.getAttribute('transform')||'')+` translate(${x} ${y})`);
        const clone=target.cloneNode(true);wrap.append(clone);expandUse(wrap,chain.concat(id));use.replaceWith(wrap);
      }
    }
    expandUse(doc.documentElement);
    const host=document.createElement('div');host.style.cssText='position:fixed;left:-100000px;top:0;width:1024px;height:768px;opacity:0;pointer-events:none;contain:layout style;';
    const shadow=host.attachShadow({mode:'closed'}),root=document.importNode(doc.documentElement,true);
    const vb=(root.getAttribute('viewBox')||'').trim().split(/[\s,]+/).map(Number);
    if(!root.hasAttribute('width'))root.setAttribute('width',vb.length===4&&vb[2]>0?vb[2]:300);
    if(!root.hasAttribute('height'))root.setAttribute('height',vb.length===4&&vb[3]>0?vb[3]:150);
    shadow.append(root);document.body.append(host);
    try{
      const shapes=[];
      // Browser CSS layout quantises viewport lengths to fractions of a pixel.
      // Rebuild the root viewBox mapping from declared units to avoid letting
      // that layout rounding change an imported 100 mm model's real size.
      function exactLength(name,fallback){
        const raw=(root.getAttribute(name)||'').trim(),match=raw.match(/^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)\s*(mm|cm|in|pt|pc|px)?$/i);
        if(!match)return fallback;
        const factors={mm:96/25.4,cm:96/2.54,in:96,pt:96/72,pc:16,px:1};
        return Number(match[1])*(factors[(match[2]||'px').toLowerCase()]);
      }
      const viewportWidth=exactLength('width',root.width.baseVal.value),viewportHeight=exactLength('height',root.height.baseVal.value);
      let exactViewport=new DOMMatrix();
      if(vb.length===4&&vb.every(Number.isFinite)&&vb[2]>0&&vb[3]>0){
        let sx=viewportWidth/vb[2],sy=viewportHeight/vb[3],ox=0,oy=0;
        const preserve=root.getAttribute('preserveAspectRatio')||'xMidYMid meet';
        if(!/\bnone\b/.test(preserve)){const scale=/\bslice\b/.test(preserve)?Math.max(sx,sy):Math.min(sx,sy);sx=sy=scale;ox=(viewportWidth-vb[2]*sx)*(/xMax/.test(preserve)?1:/xMin/.test(preserve)?0:.5);oy=(viewportHeight-vb[3]*sy)*(/YMax/.test(preserve)?1:/YMin/.test(preserve)?0:.5);}
        exactViewport=new DOMMatrix([sx,0,0,sy,ox-vb[0]*sx,oy-vb[1]*sy]);
      }
      const matrixFromSVG=m=>new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);
      const rootTransform=root.transform.baseVal.consolidate();
      if(rootTransform)exactViewport=matrixFromSVG(rootTransform.matrix).multiply(exactViewport);
      const rootCTM=root.getCTM();
      if(!rootCTM||Math.abs(rootCTM.a*rootCTM.d-rootCTM.b*rootCTM.c)<1e-20)throw Error('SVG 根坐标变换无效。');
      const correction=exactViewport.multiply(matrixFromSVG(rootCTM).inverse());
      const skip=new Set(['defs','metadata','title','desc','style','symbol','clipPath','mask','linearGradient','radialGradient','pattern','filter']);
      function walk(parent,groupOpacity=1){
        for(const el of parent.children){
          if(skip.has(el.localName)||el.namespaceURI!==NS)continue;
          const st=getComputedStyle(el),opacity=groupOpacity*Number(st.opacity||1);
          if(st.display==='none'||opacity<=0)continue;
          if(st.clipPath&&st.clipPath!=='none')throw Error(unsupported+'裁剪路径，请先应用裁剪并转为普通路径。');
          if(st.maskImage&&st.maskImage!=='none'||st.filter&&st.filter!=='none')throw Error(unsupported+'蒙版或滤镜，请先展平为填充路径。');
          if(el.localName==='g'||el.localName==='a'){walk(el,opacity);continue;}
          if(st.visibility==='hidden'||st.visibility==='collapse')continue;
          if(el.localName==='text'||el.localName==='tspan')throw Error('SVG 中仍有 text 文字，请在原软件中将文字转为轮廓后导入，或使用左侧文字功能。');
          if(el.localName==='svg')throw Error(unsupported+'嵌套视口，请先展平 SVG。');
          const fill=st.fill!=='none'&&alpha(st.fill)*Number(st.fillOpacity||1)>0;
          const strokeVisible=st.stroke!=='none'&&alpha(st.stroke)*Number(st.strokeOpacity||1)>0&&parseFloat(st.strokeWidth)>0;
          if(!fill&&!strokeVisible)continue;
          if(/url\(/.test(st.fill)||/url\(/.test(st.stroke))throw Error(unsupported+'渐变或图案填充，请先改为纯色轮廓。');
          if(st.strokeDasharray&&st.strokeDasharray!=='none'&&strokeVisible)throw Error(unsupported+'虚线描边，请先扩展描边为轮廓。');
          if(st.vectorEffect&&st.vectorEffect!=='none'&&strokeVisible)throw Error(unsupported+'非缩放描边，请先扩展描边为轮廓。');
          for(const p of ['markerStart','markerMid','markerEnd'])if(st[p]&&st[p]!=='none')throw Error(unsupported+'箭头标记，请先扩展为路径。');
          const d=pathData(el);if(!d)continue;
          const commands=PrintGeometry.parse(d);
          const useContour=contours&&closedCommands(commands);
          if(requested==='contours'&&!useContour)throw Error('闭合轮廓填充模式需要封闭路径，请闭合开放曲线，或选择原始填充/描边。');
          if(useContour&&!fill&&strokeVisible)convertedContours++;
          const rawMatrix=el.getCTM();if(!rawMatrix)throw Error('无法读取 SVG 坐标变换。');
          const m=correction.multiply(matrixFromSVG(rawMatrix));
          const box=el.getBBox();
          shapes.push({commands,matrix:[m.a,m.b,m.c,m.d,m.e,m.f].map(finite),bounds:{x:box.x,y:box.y,width:box.width,height:box.height},fill:useContour?true:fill,fillRule:st.fillRule,
            stroke:!useContour&&strokeVisible?{width:parseFloat(st.strokeWidth),join:st.strokeLinejoin||'miter',cap:st.strokeLinecap||'butt',miterLimit:parseFloat(st.strokeMiterlimit)||4}:null});
          if(shapes.length>2000)throw Error('SVG 图形元素超过 2000 个，请先合并或简化。');
        }
      }
      const rootStyle=getComputedStyle(root);
      if(rootStyle.clipPath!=='none'||rootStyle.filter!=='none'||rootStyle.maskImage&&rootStyle.maskImage!=='none')throw Error(unsupported+'根元素裁剪、滤镜或蒙版，请先展平。');
      if(rootStyle.display==='none')throw Error('SVG 图形处于隐藏状态。');
      walk(root,Number(rootStyle.opacity||1));
      const geometry=PrintGeometry.analyzeShapes(shapes);
      const physical=/[\d.]\s*(mm|cm|in|pt|pc)\s*$/i.test(doc.documentElement.getAttribute('width')||'');
      return {geometry,suggestedWidth:physical?geometry.sourceBounds.width*25.4/96:null,shapes:shapes.length,mode:contours?'contours':'appearance',corel,convertedContours};
    }finally{host.remove();}
  }
  g.SVGImport={parseSVG};
})(globalThis);

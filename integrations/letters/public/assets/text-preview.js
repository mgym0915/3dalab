(function(g){
 'use strict';const fonts=new Map(),cache=new Map();
 function font(key){if(!fonts.has(key)){const data=g.FONT_DATA?.[key];if(!data)throw Error('预览字体尚未准备完成。');fonts.set(key,g.opentype.parse(Uint8Array.from(atob(data),c=>c.charCodeAt(0)).buffer));}return fonts.get(key);}
 function glyph(text){
  if(cache.has(text))return cache.get(text);if(!String(text).trim())return null;
  let x=0,y=1000,previous=null,previousFont=null,commands=[];
  for(const char of text.replace(/\r/g,'')){
   if(char==='\n'){x=0;y+=1250;previous=null;continue;}if(char==='\t'){x+=2000;previous=null;continue;}
   const f=font(/[\x00-\x7f]/.test(char)?'ariblk':'simhei'),item=f.charToGlyph(char);if(!item.index&&!/\s/.test(char))throw Error('固定字体不包含字符「'+char+'」。');
   if(previous&&previousFont===f)x+=f.getKerningValue(previous,item)*1000/f.unitsPerEm;
   commands.push(...item.getPath(x,y,1000).commands);x+=(item.advanceWidth||f.unitsPerEm)*1000/f.unitsPerEm;previous=item;previousFont=f;
  }
  const path=new g.opentype.Path();path.commands=commands;const b=path.getBoundingBox(),width=b.x2-b.x1,height=b.y2-b.y1;
  if(!(width>0&&height>0))return null;const result={path:path.toPathData(6),width,height,x:b.x1,y:b.y1,sourceAspect:height/width};cache.set(text,result);if(cache.size>12)cache.delete(cache.keys().next().value);return result;
 }
 function create(){let shape=null;
  const $=id=>document.getElementById(id);
  function draw(width,height){if(!shape||!(width>0&&height>0))return;const sx=width/shape.width,sy=height/shape.height,pad=Math.max(width,height)*.23;
   $('shapePath').setAttribute('d',shape.path);$('previewGroup').setAttribute('transform',`matrix(${sx} 0 0 ${sy} ${-(shape.x||0)*sx} ${-(shape.y||0)*sy})`);$('previewSvg').setAttribute('viewBox',`${-pad} ${-pad*.85} ${width+2*pad} ${height+2*pad}`);$('previewEmpty').hidden=true;$('widthRuler').querySelector('span').textContent=width.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})+' mm';
  }
  return{setText(text){shape=glyph(text);if(!shape){$('shapePath').setAttribute('d','');$('previewEmpty').hidden=true;return null;}return shape;},setGeometry(geometry,width,height){shape={...geometry,x:0,y:0};draw(width,height);},draw};
 }
 g.TextPreview={create,glyph};
})(globalThis);

(function(g){
 'use strict';
 function valid(value){return Number.isFinite(value)&&value>0&&value<=100000;}
 function fromAnchor(size,aspect){
  const axis=size.lastEdited==='height'?'height':'width';
  if(!(Number.isFinite(aspect)&&aspect>0))throw Error('图形比例尚未就绪。');
  return axis==='height'?{width:size.height/aspect,height:size.height,lastEdited:axis}:{width:size.width,height:size.width*aspect,lastEdited:axis};
 }
 function edit(size,axis,value,locked,aspect){
  if(!['width','height'].includes(axis))throw Error('无效尺寸方向。');
  const next={width:size.width,height:size.height,lastEdited:axis};next[axis]=value;
  return locked?fromAnchor(next,aspect):next;
 }
 function isValid(size){return valid(size.width)&&valid(size.height);}
 g.DimensionSizing={fromAnchor,edit,isValid,valid};
})(globalThis);

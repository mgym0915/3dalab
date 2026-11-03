(function(g){
 'use strict';
 function weight(model,product,color){
  if(!['smooth','diamond'].includes(product)||!['single','multi'].includes(color))throw Error('核算模式无效。');
  const base=model?.weights?.[product],height=model?.printHeight;
  if(!Number.isFinite(base)||base<0||!Number.isFinite(height)||height<=0)throw Error('请等待模型核算完成。');
  return base+(color==='multi'?height/2:0);
 }
 function bind({getModel,onWeight}){
  const product=document.getElementById('productType'),color=document.getElementById('colorMode');
  function refresh(){const model=getModel();if(model)onWeight(weight(model,product.value,color.value));}
  product.addEventListener('change',refresh);color.addEventListener('change',refresh);return refresh;
 }
 g.ResultOptions={weight,bind};
})(globalThis);

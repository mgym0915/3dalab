export const ydTools=[
 {id:'letters',name:'标识字核算王'},
 {id:'lantern',name:'平面灯罩运算器'},
 {id:'depth',name:'深度图模型生成器'},
 {id:'knit',name:'针织效果切片器（测试中）'}
];
export const ydName=id=>ydTools.find(t=>t.id===id)?.name;
export function presentTool(id,name,bytes){
 if(!ydName(id)||! /\.(?:html|js|mjs)$/.test(name))return bytes;
 let text=bytes.toString('utf8');
 if(name.endsWith('.html'))text=text.replace(/<title[^>]*>[\s\S]*?<\/title>/i,'<title>'+ydName(id)+'</title>');
 if(id==='letters')text=text.replace(/迷你字克数核算王|迷你字核算王/g,'标识字核算王');
 if(id==='depth')text=text.replaceAll('浮光','深度图模型生成器');
 if(id==='lantern')text=text.replaceAll('吴山灯笼','平面灯罩运算器').replace('<h1>花间 ','<h1>平面灯罩运算器 ');
 if(id==='knit')text=text.replace('<span>织形 <small>KNITFORM</small></span>','<span>针织效果切片器（测试中）</span>').replace('aria-label="织形主页"','aria-label="针织效果切片器（测试中）主页"');
 return Buffer.from(text);
}

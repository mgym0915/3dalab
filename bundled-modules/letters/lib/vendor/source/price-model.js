(function(g){
 'use strict';
 const rules=g.PRICE_RULES,clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 function interpolate(values,D){
  const sizes=rules.sizes;if(D<=sizes[0])return values[0]*D/sizes[0];
  for(let i=1;i<sizes.length;i++)if(D<=sizes[i])return values[i-1]+(values[i]-values[i-1])*(D-sizes[i-1])/(sizes[i]-sizes[i-1]);
  const n=sizes.length-1;return values[n]+(values[n]-values[n-1])*(D-sizes[n])/(sizes[n]-sizes[n-1]);
 }
 function quote(base,options={}){
  const product=options.product||'smooth',color=options.color||'single',lighting=options.lighting||'steady',installation=options.installation||'wall';
  if(!['smooth','diamond'].includes(product)||!['single','multi'].includes(color)||!['steady','rgb'].includes(lighting)||installation!=='wall')throw Error('无效的核算选项。');
  const {width,height,areaMm2,perimeterMm}=base.metrics,D=Math.max(width,height),m=base.mass,r=rules.rates;
  if(![width,height,areaMm2,perimeterMm,m.printHeight,m.wall,m.brim,m.skirt,m.bottom[product]].every(Number.isFinite)||D<=0||areaMm2<=0)throw Error('缺少价格核算所需的几何数据。');
  const a=rules.calibration.A,b=rules.calibration.guo,complexity=perimeterMm/Math.sqrt(areaMm2),t=clamp((complexity-a.complexity)/(b.complexity-a.complexity),0,1);
  const referenceArea=((1-t)*a.areaPerEdgeSquared+t*b.areaPerEdgeSquared)*D*D;
  const lamp=((1-t)*interpolate(rules.lamps.A,D)+t*interpolate(rules.lamps.guo,D))*Math.sqrt(areaMm2/referenceArea);
  const glue=D<=200?2:D<=300?3:D<=450?4:D<=500?5:D<=600?6:D<=700?7:D<=750?8:D<=780?9:9+Math.ceil((D-780)/100);
  const hot=D<=300?.1:D<=500?.2:D<=700?.3:.4*Math.max(1,D/780);
  const labor=interpolate(rules.laborHours[lighting],Math.min(780,Math.max(60,D)))*Math.max(1,D/780);
  const bubble=D<=780?interpolate(rules.bubbleKg,Math.max(60,D)):.6*(D/780)**2;
  const share=(D<=550?.2:D<=650?.5:1)*Math.max(1,(D/780)**2),box=D<=250?{side:.26,depth:.28,code:'D01010000057'}:D<=550?{side:.6,depth:.2,code:'D01010000044'}:{side:.7,depth:.125,code:'D01010000046'};
  const tape=(box.side*8+box.depth*share*2+D/1000*4+m.printHeight/1000*2)/91.4;
  const rows=[];const add=(key,name,quantity,unit,rate)=>{const cents=Math.round((quantity*rate+Number.EPSILON)*100);rows.push({key,name,quantity,unit,rate,amount:cents/100,cents});};
  const tower=color==='multi'?m.printHeight/2:0;
  add('walls','打印围边',m.wall,'g',r.printing);add('bottom','打印底面',m.bottom[product],'g',r.printing);add('brim','Brim',m.brim,'g',r.printing);add('skirt','Skirt',m.skirt,'g',r.printing);add('tower','擦料塔',tower,'g',r.printing);
  add('led',lighting==='rgb'?'RGB灯带':'常亮灯带',lamp,'m',lighting==='rgb'?r.ledRgb:r.ledSteady);
  add('board',D<=300?'PVC背板':'铝塑背板',width*height/100,'cm²',r.board);
  add('plasticGlue','塑料专用胶',glue,'g',r.plasticGlue);add('glassGlue','玻璃胶',0,'ml',r.glassGlue);add('hotGlue','热熔胶棒',hot,'支',r.hotGlue);
  add('wire','电子线',(D<=250?.3:.5)*Math.max(1,D/780),'m',r.wire);add('labor',lighting==='rgb'?'RGB人工':'常亮人工',labor,'h',lighting==='rgb'?r.laborRgb:r.laborSteady);
  add('bubble','气垫膜',bubble,'kg',r.bubble);add('tape','透明胶带',tape,'卷',r.tape);add('manual','说明书',1,'张',r.manual);add('certificate','合格证',1,'张',r.certificate);add('label','标签',1,'张',r.label);add('carton','纸箱分摊',share,'只',r.carton);
  const totalCents=rows.reduce((sum,row)=>sum+row.cents,0),totalWeight=m.wall+m.bottom[product]+m.brim+m.skirt+tower;
  return {total:totalCents/100,currency:'CNY',product,color,lighting,installation,totalWeight,rows,printHeight:m.printHeight,bottomLayers:product==='diamond'?7:4,metrics:{width,height,areaMm2,perimeterMm},carton:box.code,estimated:D>780,ruleVersion:'2026-11-02-pricing'};
 }
 g.PriceModel={quote};
})(globalThis);

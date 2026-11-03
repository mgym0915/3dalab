import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {definitions} from './definitions.mjs';import {buildPackage} from './pack.mjs';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url))),args=process.argv.slice(2),out=args[args.indexOf('--out')+1];
if(!args.includes('--out')||!out)throw Error('用法: node modules/export-existing.mjs --out 交付目录');
const target=path.resolve(out);fs.mkdirSync(target,{recursive:true});
for(const d of definitions){if(['gandengyan','letters'].includes(d.id))continue;
 const source=path.join(target,'source',d.id);if(fs.existsSync(source))throw Error('输出源目录已存在: '+d.id);fs.mkdirSync(source,{recursive:true});
 const original=d.kind==='tool'?path.join(root,'public/tools',d.id):d.id==='cat-cards'?path.join(root,'public/games/cat-cards'):path.join(root,'integrations',d.id,'public');
 fs.cpSync(original,path.join(source,'public'),{recursive:true});
 let backend=null;
 if(d.kind==='game'){fs.cpSync(path.join(root,'integrations',d.id,'lib'),path.join(source,'lib'),{recursive:true});backend={kind:'node-handler-v1',entry:'lib/handler.cjs',factory:'createCatHandler',health:'api/health'};}
 if(d.provider){backend={kind:'host-tool-v1',provider:d.provider};
  const bridge=`(()=>{const original=window.fetch.bind(window),base=new URL('./',location.href),prefix='/api/tools/${d.provider}';window.fetch=(input,options)=>{const url=new URL(input instanceof Request?input.url:input,location.href);if(url.origin===location.origin&&url.pathname.startsWith(prefix+'/')){const routed=new URL('./api'+url.pathname.slice(prefix.length)+url.search,base);input=input instanceof Request?new Request(routed,input):routed;}return original(input,options);};})();\n`;
  fs.writeFileSync(path.join(source,'public/provider-bridge.js'),bridge);const file=path.join(source,'public/index.html');fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace(/<head([^>]*)>/i,'<head$1><script src="./provider-bridge.js"></script>'));
 }
 const manifest={schema:1,hostApi:1,id:d.id,name:d.name,space:d.space,kind:d.kind,version:d.kind==='game'?'1.1.0':'1.0.0',softwareVersion:d.softwareVersion,entry:'index.html',backend};
 fs.writeFileSync(path.join(source,'module.json'),JSON.stringify(manifest,null,2));const data=buildPackage(source);fs.writeFileSync(path.join(target,d.id+'-'+manifest.version+'.zip'),data);console.log(d.id,data.length);
}

import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
import {packZip,safeName} from './archive.mjs';
export function buildPackage(source){
 const root=path.resolve(source),manifest=JSON.parse(fs.readFileSync(path.join(root,'module.json'))),files=new Map();
 function scan(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,item.name),name=path.relative(root,full).replaceAll('\\','/');safeName(name);if(item.isSymbolicLink())throw Error('模块包不允许链接');if(item.isDirectory())scan(full);else if(name!=='module.json')files.set(name,fs.readFileSync(full));}}
 scan(root);manifest.files=Object.fromEntries([...files].map(([name,data])=>[name,crypto.createHash('sha256').update(data).digest('hex')]));files.set('module.json',Buffer.from(JSON.stringify(manifest,null,2)));return packZip(files);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2),source=args[args.indexOf('--source')+1],out=args[args.indexOf('--out')+1];
 if(!args.includes('--source')||!args.includes('--out')||!source||!out)throw Error('用法: node modules/pack.mjs --source 模块目录 --out 新版模块.zip');
 const bytes=buildPackage(source);fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});fs.writeFileSync(out,bytes);console.log('已生成模块包 '+path.resolve(out)+' ('+bytes.length+' B)');
}

import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=process.argv[2];
function parse(code,name,module=false){
 if(module)new vm.SourceTextModule(code,{identifier:name});
 else{try{new vm.Script(code,{filename:name});}catch(first){try{new vm.SourceTextModule(code,{identifier:name});}catch{throw first;}}}
}
function scan(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())scan(file);else if(/\.(?:js|mjs|cjs)$/.test(file))parse(fs.readFileSync(file,'utf8'),path.relative(root,file),file.endsWith('.mjs'));else if(file.endsWith('.html')){
 const html=fs.readFileSync(file,'utf8');let index=0;
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){
  const type=/\btype\s*=\s*["']([^"']+)/i.exec(m[1])?.[1];
  if(/\bsrc\s*=/i.test(m[1])||(type&&!['module','text/javascript','application/javascript'].includes(type)))continue;
  parse(m[2],path.relative(root,file)+':script'+(++index),type==='module');
 }
}}}
try{scan(root);console.log('MODULE_SOURCE_OK');}catch(error){console.error('MODULE_SOURCE_FAILED '+error.message);process.exitCode=1;}

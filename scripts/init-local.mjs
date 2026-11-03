import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const data=path.resolve(root,process.env.LAB_DATA_DIR||'data');
const statePath=path.join(data,'modules/active.json');
if(fs.existsSync(statePath))throw Error('本地模块状态已存在，初始化不会覆盖现有数据。');
const state=JSON.parse(fs.readFileSync(path.join(root,'config/bundled-modules.json'),'utf8'));
fs.mkdirSync(path.dirname(statePath),{recursive:true});
for(const[id,record]of Object.entries(state.active)){
 if(!/^[a-z0-9-]+$/.test(id)||!/^\d+\.\d+\.\d+$/.test(record.version)||!/^[a-f0-9]{64}$/.test(record.hash))throw Error('模块引用无效');
 fs.cpSync(path.join(root,'bundled-modules',id),path.join(data,'modules',id,record.version,record.hash),{recursive:true,errorOnExist:true,force:false});
}
fs.writeFileSync(statePath,JSON.stringify(state,null,2),{flag:'wx'});
console.log('本地模块已准备完成。运行 npm start 打开网页；管理员密码在本机首次设置。');

import zlib from 'node:zlib';
export const MAX_ZIP=160*1024*1024,MAX_FILE=128*1024*1024,MAX_TOTAL=512*1024*1024;
export function safeName(name){
 if(typeof name!=='string'||!name||name.length>220||/[\\:\x00-\x1f<>"|?*]/.test(name)||name.startsWith('/'))throw Error('模块文件路径无效');
 const parts=name.replace(/\/$/,'').split('/');
 if(parts.some(p=>!p||p==='.'||p==='..'||/[. ]$/.test(p)||/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p)))throw Error('模块文件路径越界或包含保留名称');
 return parts.join('/');
}
export function unpackZip(bytes){
 if(bytes.length>MAX_ZIP||bytes.length<22)throw Error('模块包大小无效');
 let end=-1;for(let p=bytes.length-22;p>=Math.max(0,bytes.length-65557);p--)if(bytes.readUInt32LE(p)===0x06054b50){end=p;break;}
 if(end<0||end+22+bytes.readUInt16LE(end+20)!==bytes.length)throw Error('不是有效ZIP32模块包');
 const count=bytes.readUInt16LE(end+10),size=bytes.readUInt32LE(end+12),offset=bytes.readUInt32LE(end+16);
 if(bytes.readUInt16LE(end+4)||bytes.readUInt16LE(end+6)||bytes.readUInt16LE(end+8)!==count||count>4096||offset+size!==end)throw Error('不支持分卷、ZIP64或超量模块文件');
 const entries=[],names=new Set();let p=offset,total=0;
 for(let i=0;i<count;i++){
  if(p+46>end||bytes.readUInt32LE(p)!==0x02014b50)throw Error('模块中央目录损坏');
  const flags=bytes.readUInt16LE(p+8),method=bytes.readUInt16LE(p+10),crc=bytes.readUInt32LE(p+16),packed=bytes.readUInt32LE(p+20),length=bytes.readUInt32LE(p+24),nameLength=bytes.readUInt16LE(p+28),extra=bytes.readUInt16LE(p+30),comment=bytes.readUInt16LE(p+32),attr=bytes.readUInt32LE(p+38),local=bytes.readUInt32LE(p+42);
  if(flags&~0x808||bytes.readUInt16LE(p+34)||![0,8].includes(method)||((attr>>>16)&0xf000)===0xa000||packed===0xffffffff||length===0xffffffff)throw Error('模块不支持加密、链接或ZIP64');
  if(p+46+nameLength+extra+comment>end)throw Error('模块中央目录长度错误');
  const rawName=bytes.subarray(p+46,p+46+nameLength).toString('utf8'),name=safeName(rawName),key=name.normalize('NFC').toLowerCase(),dir=rawName.endsWith('/');
  if(rawName.includes('\ufffd')||names.has(key))throw Error('模块包含重复或无效文件名');names.add(key);
  if(length>MAX_FILE||(total+=length)>MAX_TOTAL)throw Error('模块解压体积超限');
  entries.push({rawName,name,method,crc,packed,length,local,dir,flags});p+=46+nameLength+extra+comment;
 }
 if(p!==end)throw Error('模块目录未完整解析');
 const files=new Map(),ranges=[];
 for(const e of entries){
  if(e.local+30>offset||bytes.readUInt32LE(e.local)!==0x04034b50)throw Error('模块文件头损坏');
  const n=bytes.readUInt16LE(e.local+26),x=bytes.readUInt16LE(e.local+28),start=e.local+30+n+x;
  if(start+e.packed>offset||bytes.subarray(e.local+30,e.local+30+n).toString('utf8')!==e.rawName||bytes.readUInt16LE(e.local+8)!==e.method||bytes.readUInt16LE(e.local+6)!==e.flags)throw Error('模块文件与目录不一致');
  if(!(e.flags&8)&&(bytes.readUInt32LE(e.local+14)!==e.crc||bytes.readUInt32LE(e.local+18)!==e.packed||bytes.readUInt32LE(e.local+22)!==e.length))throw Error('模块本地文件校验不一致');
  if(ranges.some(([a,b])=>e.local<b&&start+e.packed>a))throw Error('模块文件区域重叠');ranges.push([e.local,start+e.packed]);
  if(e.dir){if(e.length)throw Error('目录不能含数据');continue;}
  let value;try{const packed=bytes.subarray(start,start+e.packed);value=e.method===8?zlib.inflateRawSync(packed,{maxOutputLength:MAX_FILE}):Buffer.from(packed);}catch{throw Error('模块解压失败');}
  if(value.length!==e.length||zlib.crc32(value)!==e.crc)throw Error('模块文件CRC校验失败');files.set(e.name,value);
 }
 return files;
}
export function packZip(files){
 const locals=[],centrals=[];let offset=0;
 for(const [name,value]of files){safeName(name);const n=Buffer.from(name),data=Buffer.from(value),packed=zlib.deflateRawSync(data,{level:6}),crc=zlib.crc32(data),local=Buffer.alloc(30),central=Buffer.alloc(46);
  local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(0x800,6);local.writeUInt16LE(8,8);local.writeUInt16LE(33,12);local.writeUInt32LE(crc,14);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(data.length,22);local.writeUInt16LE(n.length,26);
  central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(0x800,8);central.writeUInt16LE(8,10);central.writeUInt16LE(33,14);central.writeUInt32LE(crc,16);central.writeUInt32LE(packed.length,20);central.writeUInt32LE(data.length,24);central.writeUInt16LE(n.length,28);central.writeUInt32LE(offset,42);
  locals.push(local,n,packed);centrals.push(central,n);offset+=30+n.length+packed.length;
 }
 if(files.size>4096)throw Error('Too many module files');const directory=Buffer.concat(centrals),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(files.size,8);end.writeUInt16LE(files.size,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...locals,directory,end]);
}

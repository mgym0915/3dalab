const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
// Host callbacks receive only server-calculated integer deltas, with stable IDs.
class Settlements{
  constructor(options={}){this.callback=options.settleGame;this.dir=options.dataDir?path.join(options.dataDir,'cat-rewards'):null;this.rows=new Map();this.inflight=new Map();if(this.callback&&this.dir){fs.mkdirSync(this.dir,{recursive:true});for(const file of fs.readdirSync(this.dir))if(/^[a-f0-9]{64}\.json$/.test(file)){try{const row=JSON.parse(fs.readFileSync(path.join(this.dir,file),'utf8'));this.rows.set(row.result.matchId,row);}catch{}}}}
  save(row){if(!this.dir)return;const file=path.join(this.dir,crypto.createHash('sha256').update(row.result.matchId).digest('hex')+'.json'),temp=file+'.tmp';fs.writeFileSync(temp,JSON.stringify(row));fs.renameSync(temp,file);}
  enqueue(result){if(!this.callback)return null;let row=this.rows.get(result.matchId);if(!row){row={result,done:false,created:Date.now()};this.save(row);this.rows.set(result.matchId,row);}return row;}
  async deliver(row){
    if(!row||row.done)return row?.receipt;if(this.inflight.has(row.result.matchId))return this.inflight.get(row.result.matchId);
    const promise=(async()=>{const receipt=await this.callback(row.result);if(receipt?.pending)throw Error('3DAlab 积分服务尚未就绪');row.done=true;row.receipt=receipt;this.save(row);return receipt;})();this.inflight.set(row.result.matchId,promise);
    try{return await promise;}finally{this.inflight.delete(row.result.matchId);}
  }
  async retry(){for(const row of this.rows.values())if(!row.done)try{await this.deliver(row);}catch{}}
}
module.exports=Settlements;

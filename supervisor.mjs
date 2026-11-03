import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const runtime = path.join(root, 'runtime');
const logs = path.join(root, 'logs');
fs.mkdirSync(logs, { recursive: true });
const pidFile = path.join(runtime, 'running.json');
const stopFile = path.join(runtime, 'stop.flag');
function alive(pid) { try { process.kill(pid, 0); return true; } catch { return false; } }
if (fs.existsSync(pidFile)) {
  try { if (alive(JSON.parse(fs.readFileSync(pidFile)).supervisor)) process.exit(0); } catch {}
}
fs.rmSync(stopFile, { force: true });
const creds = JSON.parse(fs.readFileSync(path.join(runtime, 'tunnel-credentials.json'), 'utf8').replace(/^\uFEFF/, ''));
const configFile = path.join(runtime, 'tunnel.yml');
const credentialPath = path.join(runtime, 'tunnel-credentials.json').replaceAll('\\', '/');
fs.writeFileSync(configFile, `tunnel: ${creds.TunnelID}\ncredentials-file: '${credentialPath.replaceAll("'", "''")}'\nprotocol: http2\nedge-ip-version: '4'\nno-autoupdate: true\nmetrics: 127.0.0.1:18766\ningress:\n  - hostname: yongdian3d.asia\n    service: http://127.0.0.1:18765\n  - service: http_status:404\n`);
let stopping = false;
const children = new Map();
const timers = new Set();
function log(text) { fs.appendFileSync(path.join(logs, 'launcher.log'), `${new Date().toISOString()} ${text}\n`); }
function saveState() {
  fs.writeFileSync(pidFile, JSON.stringify({ supervisor: process.pid, website: children.get('website')?.pid || null, tunnel: children.get('tunnel')?.pid || null, root }, null, 2));
}
function run(name, exe, args) {
  if (stopping) return;
  const logPath = path.join(logs, `${name}.log`);
  if (fs.existsSync(logPath) && fs.statSync(logPath).size > 10 * 1024 * 1024) fs.renameSync(logPath, logPath + '.' + Date.now() + '.old');
  const fd = fs.openSync(logPath, 'a');
  const child = spawn(exe, args, { cwd: root, windowsHide: true, stdio: name === 'website' ? ['ignore', fd, fd, 'ipc'] : ['ignore', fd, fd], env: { ...process.env, NODE_NO_WARNINGS: '1' } });
  fs.closeSync(fd); children.set(name, child); saveState();
  child.on('error', error => log(`${name} error: ${error.message}`));
  child.on('exit', code => {
    children.delete(name); log(`${name} exited: ${code}`);
    if (!stopping) {
      saveState();
      const timer = setTimeout(() => { timers.delete(timer); run(name, exe, args); }, 5000); timers.add(timer);
    }
  });
}
async function stop() {
  if (stopping) return; stopping = true;
  clearInterval(monitor); for (const timer of timers) clearTimeout(timer);
  await Promise.allSettled([...children].map(([name,child]) => new Promise(resolve => {
    if(child.exitCode !== null || child.signalCode !== null)return resolve();
    const timer=setTimeout(()=>{log(name+' forced stop');try{child.kill();}catch{}},5500);
    child.once('exit',()=>{clearTimeout(timer);resolve();});
    if(name==='website'&&child.connected){try{child.send({type:'3dalab-shutdown'});}catch{child.kill();}}
    else{try{child.kill();}catch{clearTimeout(timer);resolve();}}
  })));
  fs.rmSync(pidFile, { force: true }); fs.rmSync(stopFile, { force: true });
  log('stopped'); setTimeout(() => process.exit(0), 1000);
}
saveState(); log('starting 3DAlab');
run('website', path.join(runtime, 'node.exe'), ['--no-warnings', path.join(root, 'server.mjs')]);
run('tunnel', path.join(runtime, 'cloudflared.exe'), ['tunnel', '--config', configFile, 'run']);
const monitor = setInterval(() => { if (fs.existsSync(stopFile)) stop(); }, 1000);
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, stop);

import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const url='http://127.0.0.1:4173/';
async function ready(){try{const response=await fetch(url,{signal:AbortSignal.timeout(1500)});return response.ok&&(await response.text()).includes('Harmonia');}catch{return false;}}
if(!await ready()){
  const child=spawn(process.execPath,[fileURLToPath(new URL('server.mjs',import.meta.url))],{detached:true,stdio:'ignore',windowsHide:true});
  child.on('error',error=>{console.error(error.message);process.exitCode=1;});
  child.unref();
  let started=false;
  for(let attempt=0;attempt<25;attempt++){await new Promise(resolve=>setTimeout(resolve,200));if(await ready()){started=true;break;}}
  if(!started){console.error('Harmonia kon niet starten. Gebruik npm start om de fout te bekijken.');process.exit(1);}
}
console.log('Harmonia staat klaar: '+url);
if(!process.argv.includes('--no-open')){
  const open=process.platform==='win32'?spawn('cmd.exe',['/c','start','',url],{stdio:'ignore',windowsHide:true}):spawn(process.platform==='darwin'?'open':'xdg-open',[url],{stdio:'ignore'});
  open.on('error',()=>console.log('Open de link zelf in je browser.'));
  open.unref();
}
setTimeout(()=>process.exit(0),100);

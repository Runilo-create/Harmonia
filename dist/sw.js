const BASE = new URL('./', self.location.href);
const PREFIX = 'harmonia-playground-' + encodeURIComponent(BASE.pathname) + '-';
const CACHE = PREFIX + 'v2.3';
const FILES = ['./', 'index.html', 'styles.css', 'mobile.css', 'src/app.js', 'src/data.js', 'src/domain.js', 'src/views.js', 'manifest.webmanifest', 'icon.svg'].map(path=>new URL(path, BASE).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!FILES.includes(url.href))return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}
    return response;
  }).catch(async()=> (await caches.match(event.request)) || (event.request.mode==='navigate'?await caches.match(new URL('index.html',BASE).href):new Response('Offlinebestand ontbreekt',{status:503}))));
});

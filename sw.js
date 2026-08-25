'use strict';
const CACHE='md-forge-404-v5.0.0';
const SHELL=['./','./index.html','./css/app.css','./js/app.js','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;const isNav=event.request.mode==='navigate';event.respondWith((async()=>{try{const fresh=await fetch(event.request);if(fresh&&fresh.ok){const cache=await caches.open(CACHE);cache.put(event.request,fresh.clone()).catch(()=>{})}return fresh}catch{if(isNav)return (await caches.match('./index.html'))||Response.error();return (await caches.match(event.request))||Response.error()}})())});

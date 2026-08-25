import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),js=read('js/app.js');
let errors=[];
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const dup=ids.filter((x,i,a)=>a.indexOf(x)!==i);
if(dup.length)errors.push('IDs duplicados: '+[...new Set(dup)].join(', '));
const refs=new Set([...js.matchAll(/\$\(['"]#([^'"]+)['"]\)/g)].map(m=>m[1]));
const dynamic=new Set(['historyDiffBtn']);
for(const id of refs)if(!ids.includes(id)&&!dynamic.has(id))errors.push('ID JS inexistente: '+id);
const buttonMatches=[...html.matchAll(/<button\b([^>]*)>/gis)];
for(const m of buttonMatches){const attrs=m[1],im=attrs.match(/\bid="([^"]+)"/);if(!im)continue;const id=im[1];const direct=js.includes(`$('#${id}')`)||js.includes(`$("#${id}")`);const generic=/data-(?:page|insert|view)=/.test(attrs)||/type="submit"/.test(attrs);if(!direct&&!generic)errors.push('Botón sin conexión detectable: '+id)}
for(const attr of ['data-page','data-insert','data-view']){if(html.includes(attr+'=')&&!js.includes('['+attr+']'))errors.push('Controles '+attr+' sin handler genérico')}
if(/javascript:void\(0\)/i.test(html)||/href="#"/i.test(html))errors.push('Control/enlace decorativo inseguro detectado');
const pages=new Set([...html.matchAll(/data-page="([^"]+)"/g)].map(m=>m[1]));
const sections=new Set([...html.matchAll(/id="page-([^"]+)"/g)].map(m=>m[1]));
for(const p of pages)if(!sections.has(p))errors.push('Página sin sección: '+p);
for(const s of sections)if(!pages.has(s))errors.push('Sección sin navegación: '+s);
for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){const ref=m[1];if(!ref||/^(?:https?:|#|mailto:)/.test(ref))continue;if(!fs.existsSync(path.join(root,ref)))errors.push('Asset inexistente: '+ref)}
for(const file of ['manifest.webmanifest','sw.js','README.md','CHANGELOG.md','LICENSE'])if(!fs.existsSync(path.join(root,file)))errors.push('Falta '+file);
JSON.parse(read('manifest.webmanifest'));
if(/type="module"/.test(html))errors.push('index.html no debe depender de ES modules para el arranque local');
if(!/md-forge-404-v5\.0\.0/.test(read('sw.js')))errors.push('Service Worker no usa caché v5.0.0');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Static audit OK · ${ids.length} IDs · ${pages.size} páginas · ${refs.size} referencias JS`);

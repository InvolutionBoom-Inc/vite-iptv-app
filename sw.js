if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let o={};const a=s=>i(s,r),u={module:{uri:r},exports:o,require:a};e[r]=Promise.all(n.map((s=>u[s]||a(s)))).then((s=>(l(...s),o)))}}define(["./workbox-b3e22772"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/index.015c1ee0.js",revision:null},{url:"assets/index.1ca60f1f.css",revision:null},{url:"assets/index.34eccfa2.js",revision:null},{url:"assets/index.4115ca9a.js",revision:null},{url:"assets/index.4b0b8d71.js",revision:null},{url:"assets/index.4f9d81ca.js",revision:null},{url:"assets/index.50e8aeb9.js",revision:null},{url:"assets/index.993737ea.css",revision:null},{url:"assets/index.a7882d28.css",revision:null},{url:"assets/index.a956f62a.css",revision:null},{url:"assets/index.c3e840c1.css",revision:null},{url:"assets/index.e4b9d850.css",revision:null},{url:"assets/TvPlay.61b7a3b7.js",revision:null},{url:"assets/TvPlay.a415eb3a.css",revision:null},{url:"index.html",revision:"f7504b9fda40d49d279a7a07353fb99b"},{url:"./icons/android-chrome-192x192.png",revision:"c3234dda849a7397a862b60b93a08d2d"},{url:"./icons/android-chrome-512x512.png",revision:"db1775253e78d7000ae506e6300c507c"},{url:"manifest.webmanifest",revision:"5970e7a7abd9ef1f08a8b100cf1835f1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));

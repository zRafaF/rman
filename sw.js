if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),u={module:{uri:t},exports:o,require:l};s[t]=Promise.all(r.map((e=>u[e]||l(e)))).then((e=>(n(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DVth-4pA.js",revision:null},{url:"assets/index-fxANGKRr.css",revision:null},{url:"assets/react-C6vDfoWu.js",revision:null},{url:"assets/react-dom-C_ShZe-J.js",revision:null},{url:"index.html",revision:"6a7d74da788968ed8a17dce48f000a39"},{url:"registerSW.js",revision:"016aca81e88d495340fc7820c2b9bd69"},{url:"manifest.webmanifest",revision:"50afa5dcaae7bfbeeda2714696fc248b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

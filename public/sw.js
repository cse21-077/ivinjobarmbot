if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-4d767a27"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"46fb8556ecb01ae124e2e781d76235ba"},{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/chunks/2e5b0c64-60ef7e238c5b22e5.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/365-76f480188b65a9c3.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/468.f71452cbc1dd94fa.js",revision:"f71452cbc1dd94fa"},{url:"/_next/static/chunks/4bd1b696-db20c0a17f6ae2f8.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/572-a2e187543eb0f059.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/587-034d4f293d8acbaa.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/761.afb058c0fde6e803.js",revision:"afb058c0fde6e803"},{url:"/_next/static/chunks/782-3c5bb646f4eb700c.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/911-3f60412f3b245b24.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/994-87e1d41caae78de9.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/_not-found/page-dd3e0844563b4160.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/admin-dashboard/page-9637d9c684ba33c1.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/api/mt5/connect/route-92fbbc5786cc4834.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/api/mt5/disconnect/route-70ad9248bf49ca8a.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/layout-659602a2e19a25be.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/login/page-32defdc23724f041.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/page-b1faec4457cad765.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/signup/layout-9a511b2a183385bf.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/signup/page-1483cf1dc4f31e5b.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/tradingarea/page-21dda4e50026d8e6.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/app/waiting-approval/page-bd7b9abce1cdf9dc.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/bc9e92e6-26ae5514542221c1.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/f58c171e-3b456a37b554225d.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/framework-859199dea06580b0.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/main-app-1718ed5b6454bba3.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/main-e380913eb63fafd8.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/pages/_app-3c23e1c119dc4ed7.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/pages/_error-97757e36cd1e24f9.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-77d63f75b90af8c8.js",revision:"vUI3_6LCDV8TpLVVz-RZA"},{url:"/_next/static/css/a82fc60d6aeaf06a.css",revision:"a82fc60d6aeaf06a"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/vUI3_6LCDV8TpLVVz-RZA/_buildManifest.js",revision:"9a08805a37ca4774a9403d57f6bfd155"},{url:"/_next/static/vUI3_6LCDV8TpLVVz-RZA/_ssgManifest.js",revision:"4a54fe0f1e124db9b9a7d027bc86e01d"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/icon-128x128.png",revision:"5d6099927684548f1cbe500cc9c70231"},{url:"/icons/icon-144x144.png",revision:"b6b2ecb84a87eb246be4a015878bb314"},{url:"/icons/icon-152x152.png",revision:"1dbd51a6aa18cf9d07b11d592b0f721e"},{url:"/icons/icon-192x192.png",revision:"bb4bc9c3c4c2e4015f629c667fbb73a3"},{url:"/icons/icon-256x256.png",revision:"230e5a8457aeb616da4ebc1028254444"},{url:"/icons/icon-384x384.png",revision:"5b38cd523042d8cd819730a97c3bde56"},{url:"/icons/icon-48x48.png",revision:"d4da15c97f1ed6d6cff51aea09efca29"},{url:"/icons/icon-512x512.png",revision:"76cf48e1cc32ab7c6bb7b43f38cd5d87"},{url:"/icons/icon-72x72.png",revision:"45cb1056cf8ef01708fcb1690e810c92"},{url:"/icons/icon-96x96.png",revision:"8c0ae002a7613e364809f9fad99cd7f4"},{url:"/manifest.json",revision:"492edaaa6e07f22783aa0a19b9fa5c0e"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);Math.pow(2,53);function n(e){return null!=e}let r,i,d,a,c,u;self.onmessage=e=>{if(n(e.data.init)){a=e.data.init.codec,r=e.data.init.width,i=e.data.init.height;const t={output:e=>{r===e.codedWidth&&i===e.codedHeight||(r=e.codedWidth,i=e.codedHeight,d.configure({codec:a,codedWidth:r,codedHeight:i})),createImageBitmap(e,{}).then(t=>{e.close();try{self.postMessage({bitmap:t,timestamp:u,pktSize:c,width:r,height:i},[t])}catch(e){console.error(e)}})},error:e=>{console.error(e)}};d=new VideoDecoder(t),d.configure({codec:a,codedWidth:r,codedHeight:i}),self.postMessage({init:!0})}else{const t=e.data.pktData,o=e.data.timeStamp;let n;c=e.data.pktSize,u=o;let r=!1;for(n=0;n<100;n++)if((101===t[n]||65===t[n])&&1===t[n-1]&&0===t[n-2]&&0===t[n-3]){101===t[n]&&(r=!0);break}let i=new EncodedVideoChunk({timestamp:o,type:r?"key":"delta",data:t});d.decode(i)}}}]);
!function(t){var e={};function a(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=e,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(s,r,function(e){return t[e]}.bind(null,r));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);const s="data",r="last-time",o="master-time",n="status",i="time-changed";Math.pow(2,53);function d(t){return null!=t}const c="replay",u="disconnected",l="fetch-start";var h=class{constructor(t,e=5){this.dataSourceMap={},this.tsRun=void 0,this.timerResolution=e,this.interval=null,this.datasources=[];for(let e of t)this.addDataSource(e)}removeDataSource(t){this.datasources=this.datasources.filter(e=>e.id!==t),delete this.dataSourceMap[t]}push(t,e){}getCurrentTimestamp(){return this.tsRun}processData(){let t,e=-1,a=performance.now();for(let a in this.dataSourceMap)t=this.dataSourceMap[a],t.dataBuffer.length>0&&(e=-1===e||t.dataBuffer[0].data.timestamp<e?t.dataBuffer[0].data.timestamp:e);this.interval=setInterval(()=>{for(;this.computeNextData(e,a););},this.timerResolution),console.warn("Started Replay Algorithm with tsRef="+new Date(e).toISOString())}computeNextData(t,e){throw Error("Should be overridden")}addDataSource(t){throw Error("Should be overridden")}checkVersion(t,e){throw Error("Should be overridden")}onData(t,e){}setStatus(t,e){throw Error("Should be overridden")}close(){d(this.interval)&&(clearInterval(this.interval),this.interval=void 0),console.log("Data synchronizer terminated successfully")}onStart(){}};var p=class extends h{constructor(t,e=1,a,s,r=5){super(t,e,r),this.replaySpeed=e,this.startTimestamp=a,this.endTimestamp=s}push(t,e){if(0===e.length)return;const a=this.dataSourceMap[t],s=e[e.length-1];this.checkVersion(a,s)?a.dataBuffer.push(...e):console.warn(`[DataSynchronizer] incompatible version ${a.version} ~ ${s.version}, skipping data`)}processData(){let t=performance.now();this.interval=setInterval(()=>{for(;this.computeNextData(this.startTimestamp,t););this.checkEnd()},this.timerResolution),console.warn("Started Replay Algorithm with tsRef="+new Date(this.startTimestamp).toISOString())}computeNextData(t,e){let a,s=null;const r=(performance.now()-e)*this.replaySpeed;this.tsRun=t+r;for(let e in this.dataSourceMap)if(a=this.dataSourceMap[e],a.dataBuffer.length>0){a.dataBuffer[0].data.timestamp-t<=r&&(s=null===s?a:s.dataBuffer[0].data.timestamp<a.dataBuffer[0].data.timestamp?s:a)}return null!==s&&(this.onData(s.id,s.dataBuffer.shift()),!0)}addDataSource(t){this.dataSourceMap[t.id]={dataBuffer:[],id:t.id,name:t.name||t.id,status:u,version:void 0},this.datasources.push(t)}checkVersion(t,e){return!d(t.version)||t.version===e.version&&void 0}setStatus(t,e){t in this.dataSourceMap&&(this.dataSourceMap[t].status=e,console.warn(e+" DataSource "+t+" from the synchronizer ")),this.checkStart()}checkStart(){if(!d(this.interval)){let t=0,e=Object.keys(this.dataSourceMap).length;for(let e in this.dataSourceMap)this.dataSourceMap[e].status===l&&t++;console.warn(`[Synchronizer] Fetched ${t}/${e} datasources`),t===e&&(console.warn("Starting Replay Algorithm..."),this.processData(),this.onStart())}}checkEnd(){this.getCurrentTimestamp()>=this.endTimestamp&&(this.onEnd(),this.reset())}reset(){this.tsRun=void 0,console.log("reset synchronizer algo"),this.close();for(let t in this.dataSourceMap)this.resetDataSource(t)}resetDataSource(t){const e=this.dataSourceMap[t];e.dataBuffer=[],e.status=u,e.version=void 0}onEnd(){}onStart(){}};var f=class extends h{push(t,e){if(0===e.length)return;const a=this.dataSourceMap[t],s=e[e.length-1];if(!this.checkVersion(a,s))return;let r=0;this.tsRun>0&&(r=this.tsRun-s.data.timestamp),a.latency=r>a.latency?r:(a.latency+r)/2,a.dataBuffer.push(...e),d(this.interval)||this.processData()}computeNextData(t,e){let a,s=null,r=0,o=0;for(let t in this.dataSourceMap)if(a=this.dataSourceMap[t],a.latency>0){let t=Math.min(a.latency,a.timeOut);r=t>r?t:r,o=a.latency<o?a.latency:o}const n=performance.now()-e;this.tsRun=t+n;for(let e in this.dataSourceMap)if(a=this.dataSourceMap[e],a.dataBuffer.length>0){a.dataBuffer[0].data.timestamp-t<=n-r&&(s=null===s?a:s.dataBuffer[0].data.timestamp<a.dataBuffer[0].data.timestamp?s:a)}if(null!==s){let t=s.dataBuffer.shift();return t["@latency"]=a.latency-o,this.onData(s.id,t),!0}return!1}addDataSource(t){this.dataSourceMap[t.id]={timeOut:t.timeOut||0,dataBuffer:[],id:t.id,timedOut:!1,name:t.name||t.id,latency:0,status:u,version:void 0},this.datasources.push(t)}checkVersion(t,e){return t.status!==u||(t.status!==u||t.version===e.version)&&void 0}setStatus(t,e){t in this.dataSourceMap&&(this.dataSourceMap[t].status=e,console.warn(e+" DataSource "+t+" from the synchronizer "))}reset(){this.tsRun=void 0,console.log("reset synchronizer algo"),this.close();for(let t in this.dataSourceMap)this.resetDataSource(t)}resetDataSource(t){const e=this.dataSourceMap[t];e.dataBuffer=[],e.startBufferingTime=-1,e.latency=0,e.status=u,e.version=void 0}};const m={};let S,v=!1,y=null,g=void 0;const M={};let w,D,B,R,T,b,I,k,O,x,z=null,E=void 0,j=-1,C=-1;function P(){clearInterval(E),E=void 0,C=-1,null!==S&&S.reset(),z.postMessage({type:i})}function _(t){for(let e of t)N(e)}function N(t){S.addDataSource(t),m[t.id]=new BroadcastChannel("datasource-data-"+t.id),t.id in M||(M[t.id]=t)}async function V(t){await S.removeDataSource(t),delete m[t.id],delete M[t.id]}function A(){d(E)||G(I)}async function $(){const t=S.getCurrentTimestamp();clearInterval(E),E=void 0,z.postMessage({timestamp:t,type:o})}async function F(){}async function q(t,e){-1===C&&d(g)&&e.version===g.dataBlock.version||(C=e.version,g={dataSourceId:t,dataBlock:e},m[t].postMessage({values:[e],dataSourceId:t,type:s}))}function G(t){d(E)||(E=setInterval(()=>{x=S.getCurrentTimestamp(),d(x)&&z.postMessage({timestamp:x,type:o}),d(g)&&C===g.dataBlock.version&&-1!==C&&(R=g.dataBlock.data.timestamp,T=g.dataSourceId,(-1!==R&&-1===j||-1!==j&&R!==j)&&z.postMessage({timestamp:R,dataSourceId:T,type:r}),j=R)},t))}self.onmessage=async t=>{d(b)&&await b,b=async function(t){return new Promise(async(e,a)=>{try{let a=!0,i=void 0;if("init"===t.data.message)B=t.data.replaySpeed,k=new Date(t.data.startTime).getTime(),O=new Date(t.data.endTime).getTime(),t.data.mode===c?(S=new p(t.data.dataSources,t.data.replaySpeed,k,O,t.data.timerResolution),S.onEnd=$,S.onStart=F):S=new f(t.data.dataSources,t.data.replaySpeed,t.data.timerResolution),S.onData=q,v=!0,_(t.data.dataSources),D=t.data.topics.data,w=t.data.topics.time,r=D,o=w,console.log("listen on topic ",r),y=new BroadcastChannel(r),y.onmessage=async t=>{if(A(),t.data.type===s)S.push(t.data.dataSourceId,t.data.values);else if(t.data.type===n){const e=t.data.dataSourceId;S.setStatus(e,t.data.status),console.log(M[e].name+": status="+t.data.status),m[e].postMessage(t.data)}},z=new BroadcastChannel(o),I=t.data.masterTimeRefreshRate;else if("add"===t.data.message&&t.data.dataSources)console.log("Add datasource to synchronizer.."),_(t.data.dataSources);else if("connect"===t.data.message)G(I),S.checkStart();else if("remove"===t.data.message&&t.data.dataSources)console.log("Remove datasource from synchronizer.."),await async function(t){for(let e of t)await V(e)}(t.data.dataSources);else if("current-time"===t.data.message)i={message:"current-time",data:S.getCurrentTimestamp()};else if("reset"===t.data.message)P();else if("replay-speed"===t.data.message)null!==S&&(P(),S.replaySpeed=t.data.replaySpeed);else if("update-properties"===t.data.message){P();let e=[];null!==S&&(e=S.datasources),k=new Date(t.data.startTime).getTime(),O=new Date(t.data.endTime).getTime(),t.data.mode===c?(S=new p(e,t.data.replaySpeed,k,O,S.timerResolution),S.onEnd=$,S.onStart=F):S=new f(e,S.timerResolution),S.onData=q}else"data"===t.data.message?(A(),null!==S&&S.push(t.data.dataSourceId,t.data.data)):a=!1;a&&self.postMessage({message:t.data.message,data:i,messageId:t.data.messageId}),e()}catch(t){a(t)}var r,o})}(t)},self.onclose=function(){S.close(),console.log("Data Synchronizer has been terminated successfully")}}]);
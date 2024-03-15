!function(t){var e={};function a(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=e,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(s,r,function(e){return t[e]}.bind(null,r));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);const s="data",r="last-time",n="master-time",o="status",i="time-changed",d="closed";Math.pow(2,53);function c(t){return null!=t}const u="disconnected",m="fetch-start";var l=class{constructor(t,e=5){this.dataSourceMap={},this.tsRun=void 0,this.timerResolution=e,this.interval=null,this.datasources=[];for(let e of t)this.addDataSource(e)}removeDataSource(t){this.datasources=this.datasources.filter(e=>e.id!==t),delete this.dataSourceMap[t]}push(t,e){}getCurrentTimestamp(){return this.tsRun}processData(){let t,e=-1,a=performance.now();for(let a in this.dataSourceMap)t=this.dataSourceMap[a],t.dataBuffer.length>0&&(e=-1===e||t.dataBuffer[0].data.timestamp<e?t.dataBuffer[0].data.timestamp:e);this.interval=setInterval(()=>{for(;this.computeNextData(e,a););},this.timerResolution),console.warn(`Started Algorithm ${this.constructor.name} with  tsRef=${new Date(e).toISOString()}`)}computeNextData(t,e){throw Error("Should be overridden")}addDataSource(t){throw Error("Should be overridden")}checkVersion(t,e){throw Error("Should be overridden")}onData(t,e){}checkStart(){}setStatus(t,e){throw Error("Should be overridden")}close(){c(this.interval)&&(clearInterval(this.interval),this.interval=void 0),console.log("Data synchronizer terminated successfully"),this.onClose()}onStart(){}onClose(){}};var p=class extends l{constructor(t,e=1,a,s,r=5,n){super(t,e,r),this.replaySpeed=e,this.startTimestamp=a,this.endTimestamp=s,this.version=n}push(t,e){if(0!==e.length&&t in this.dataSourceMap){const a=this.dataSourceMap[t],s=e[e.length-1];if(!this.checkVersion(s))return void console.warn(`[DataSynchronizer] incompatible version ${s.version} ~ ${this.version}, skipping data`);a.dataBuffer.push(...e)}}processData(){this.clockTimeRef=performance.now(),this.interval=setInterval(()=>{for(;this.computeNextData(this.startTimestamp,this.clockTimeRef);)this.checkEnd();this.checkEnd()},this.timerResolution),console.warn("Started Replay Algorithm with tsRef="+new Date(this.startTimestamp).toISOString())}computeNextData(t,e){try{let a,s=null;const r=(performance.now()-e)*this.replaySpeed;let n=t+r,o=!1;for(let e in this.dataSourceMap)if(a=this.dataSourceMap[e],a.skip&&n>a.minTimestamp&&n<a.maxTimestamp&&(a.skip=!1),!a.skip&&a.dataBuffer.length>0){a.dataBuffer[0].data.timestamp-t<=r&&(s=null===s?a:s.dataBuffer[0].data.timestamp<a.dataBuffer[0].data.timestamp?s:a)}return null!==s&&(s.id in this.dataSourceMap&&this.onData(s.id,s.dataBuffer.shift()),o=!0),this.tsRun=n,o}catch(t){return console.log(t),!1}}addDataSource(t){this.dataSourceMap[t.id]={dataBuffer:[],id:t.id,name:t.name||t.id,status:u,minTimestamp:t.minTimestamp,maxTimestamp:t.maxTimestamp,skip:!1},(t.maxTimestamp<this.getCurrentTimestamp()||t.minTimestamp>this.getCurrentTimestamp())&&(this.dataSourceMap[t.id].skip=!0,console.warn(`Skipping new added dataSource ${t.id} because timeRange of the dataSource is not intersecting the synchronizer one`)),this.datasources.push(t)}checkVersion(t){return t.version===this.version}setStatus(t,e){t in this.dataSourceMap&&(this.dataSourceMap[t].status=e,console.warn(e+" DataSource "+t+" from the synchronizer ")),this.checkStart()}checkStart(){if(!c(this.interval)){let t,e=0,a=0,s=Object.keys(this.dataSourceMap).length;if(0===s)return;for(let s in this.dataSourceMap)t=this.dataSourceMap[s],t.skip=this.startTimestamp<t.minTimestamp||this.startTimestamp>t.maxTimestamp,t.status===m?a++:t.skip&&e++;console.warn(`[Synchronizer] Fetched ${a}/${s} datasources`),console.warn(`[Synchronizer] Skipped ${e}/${s} datasources`),a+e===s&&(console.warn("Starting Replay Algorithm..."),this.processData(),this.onStart())}}checkEnd(){this.getCurrentTimestamp()>this.endTimestamp&&(this.onEnd(),this.reset())}reset(){console.log("reset synchronizer algo"),this.close();for(let t in this.dataSourceMap)this.resetDataSource(t);this.tsRun=void 0}resetDataSource(t){const e=this.dataSourceMap[t];e.dataBuffer=[],e.status=u,e.version=void 0,e.skip=!1}removeDataSource(t){super.removeDataSource(t);let e,a,s=this.getCurrentTimestamp();for(let t in this.dataSourceMap){if(a=this.dataSourceMap[t],s>=a.minTimestamp&&s<=a.maxTimestamp)return;e?a.minTimestamp<e&&(e=a.minTimestamp):e=a.minTimestamp}}setEndTimestamp(t){this.endTimestamp=t}setTimeRange(t,e,a){this.replaySpeed=a,this.startTimestamp=t,this.endTimestamp=e,this.clockTimeRef=performance.now(),this.reset(),this.checkStart()}onEnd(){}onStart(){}};const h={};let f,S=!1,g=null,v=void 0;const y={};let T,M,k,w,D,b,R,I,x,B,C=null,E=void 0,z=-1,O=-1;function _(){clearInterval(E),E=void 0,null!==f&&f.reset(),C.postMessage({type:i}),C.postMessage({type:d}),g.postMessage({type:o,status:"not_running"})}function $(t){for(let e of t)j(e)}function j(t){f.addDataSource(t),h[t.id]=new BroadcastChannel("datasource-data-"+t.id),t.id in y||(y[t.id]=t)}async function P(t){await f.removeDataSource(t),console.log("deleting BC for datasource "+t),delete h[t],delete y[t]}function A(){c(E)||G(b)}async function N(){const t=f.getCurrentTimestamp();clearInterval(E),E=void 0,C.postMessage({timestamp:t,type:n}),g.postMessage({type:o,status:"not_running"})}async function V(){A()}function F(){C.postMessage({type:d}),g.postMessage({type:o,status:"not_running"})}async function q(t,e){e.version===O?(v={dataSourceId:t,dataBlock:e},h[t].postMessage({values:[e],dataSourceId:t,type:s})):console.error("version are different:",e.version,O)}function G(t){c(E)||(E=setInterval(()=>{B=f.getCurrentTimestamp(),c(B)&&C.postMessage({timestamp:B,type:n}),c(v)&&(w=v.dataBlock.data.timestamp,D=v.dataSourceId,(-1!==w&&-1===z||-1!==z&&w!==z)&&C.postMessage({timestamp:w,dataSourceId:D,type:r}),z=w)},t),g.postMessage({type:o,status:"running"}))}self.onmessage=async t=>{!async function(t){let e={};t.data.ackId&&(e.ackId=t.data.ackId);let a=void 0;try{"init"===t.data.message?(k=t.data.replaySpeed,R=t.data.startTimestamp,I=t.data.endTimestamp,O=t.data.version,x=t.data.timerResolution,f=new p(t.data.dataSources,k,R,I,t.data.timerResolution,O),f.onClose=F,f.onData=q,S=!0,$(t.data.dataSources),M=t.data.topics.data,T=t.data.topics.time,m=M,l=T,console.log("listen on topic ",m),g=new BroadcastChannel(m),g.onmessage=async t=>{if(t.data.type===s)A(),f.push(t.data.dataSourceId,t.data.values);else if(t.data.type===o){const e=t.data.dataSourceId;f.setStatus(e,t.data.status),e in h&&(console.log(y[e].name+": status="+t.data.status),h[e].postMessage(t.data))}},C=new BroadcastChannel(l),b=t.data.masterTimeRefreshRate):"add"===t.data.message&&t.data.dataSources?(console.log("Add datasource to synchronizer.."),$(t.data.dataSources)):"connect"===t.data.message?(G(b),f.checkStart(),O=t.data.version):"is-connected"===t.data.message?a=c(E)&&c(f)&&c(f.interval):"remove"===t.data.message?(console.log("Remove datasource from synchronizer algorithm.."),await async function(t){for(let e of t)await P(e)}(t.data.dataSourceIds),f instanceof p&&(f.endTimestamp=t.data.endTimestamp)):"current-time"===t.data.message?a=f.getCurrentTimestamp():"reset"===t.data.message?_():"replay-speed"===t.data.message?null!==f&&(_(),f.replaySpeed=t.data.replaySpeed):"set-max-time"===t.data.message?f.setEndTimestamp(t.data.maxTimestamp):"time-range"===t.data.message?(r=t.data.startTimestamp,n=t.data.endTimestamp,t.data.mode,i=t.data.replaySpeed,d=t.data.version,u=t.data.dataSources,_(),O=d,f=new p(u,i,r,n,x,O),f.onEnd=N,f.onStart=V,f.onClose=F,f.onData=q):"data"===t.data.message&&(A(),null!==f&&f.push(t.data.dataSourceId,t.data.data))}catch(t){console.error(t),e.error=t}finally{e.data=a,self.postMessage(e)}var r,n,i,d,u;var m,l}(t)},self.onclose=function(){f.close(),console.log("Data Synchronizer has been terminated successfully"),g.postMessage({type:o,status:"not_running"})}}]);
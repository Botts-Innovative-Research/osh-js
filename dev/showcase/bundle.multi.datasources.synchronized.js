!function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(i,r,function(t){return e[t]}.bind(null,r));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=2)}([function(e,t,s){e.exports=function(){return new Worker(s.p+"WorkerName.45e771fcbcb3f6fece0d.js")}},function(e,t,s){e.exports=function(){return new Worker(s.p+"WorkerName.74db793c118777ce5dc3.js")}},function(e,t,s){"use strict";s.r(t);const i=document.getElementById("datasource-video0"),r=document.getElementById("datasource-video1"),n=document.getElementById("datasource-video2"),a=document.getElementById("error"),o=document.getElementById("last-video0"),c=document.getElementById("last-video1"),p=document.getElementById("last-video2"),u=document.getElementById("current-time");let d=0,h=0,m=0,l=0;const g="data",y="time";Math.pow(2,53);function S(e){return null!=e}function f(e,t="letiable"){if(!S(e))throw t+" must be defined";return e}function T(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}var w=class{constructor(e,t){this.id="DataSource-"+T(),this.name=e,this.properties=t,this.currentRunningProperties={},this.eventSubscriptionMap={},this.initialized=!1,this.init=void 0,this.messagesMap={}}getId(){return this.id}getName(){return this.name}getCurrentRunningProperties(){return this.currentRunningProperties}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}getTopicId(){return"datasource-data-"+this.id}getVersion(){return 0}subscribe(e,t){for(let s=0;s<t.length;s++)t[s]in this.eventSubscriptionMap||(this.eventSubscriptionMap[t[s]]=[]),this.eventSubscriptionMap[t[s]].push(e)}async createWorker(e){}async updateProperties(e){return this.currentRunningProperties={...this.properties,...e},new Promise(t=>{this.postMessage({message:"update-url",data:e},t)})}async connect(){await this.checkInit(),await this.doConnect()}async initDataSource(){return new Promise(async e=>{this.dataSourceWorker=await this.createWorker(this.properties),this.handleWorkerMessage(),this.postMessage({message:"init",id:this.id,properties:this.properties,topic:this.getTopicId()},async t=>{new BroadcastChannel(this.getTopicId()).onmessage=async e=>{this.handleMessage(e)},this.initialized=t,e()})})}async handleMessage(e){const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}async checkInit(){return new Promise(async(e,t)=>{S(this.init)||(this.init=this.initDataSource()),await this.init,e()})}async doConnect(){return new Promise(async e=>{this.postMessage({message:"connect"},e)})}async isConnected(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"is-connected"},e)})}async disconnect(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"disconnect"},e)})}postMessage(e,t){const s=T();this.dataSourceWorker.postMessage({...e,messageId:s}),S(t)&&(this.messagesMap[s]=t)}handleWorkerMessage(){this.dataSourceWorker.onmessage=e=>{const t=e.data.messageId;t in this.messagesMap&&(this.messagesMap[t](e.data.data),delete this.messagesMap[t])}}async onDisconnect(){}reset(){}};var b=class extends w{constructor(e,t){super(e,t),f(t,"Some properties must be defined"),f(t.startTime,"startTime must must be defined"),f(t.endTime,"startTime must must be defined"),this.timeSync=null}getTimeTopicId(){return"datasource-time-"+this.id}getStartTime(){return this.properties.startTime}getEndTime(){return this.properties.endTime}getMinTime(){return this.properties.minTime}getMaxTime(){return this.properties.maxTime}getReplaySpeed(){return S(this.currentRunningProperties)&&S(this.currentRunningProperties.replaySpeed)?this.currentRunningProperties.replaySpeed:S(this.properties.replaySpeed)?this.properties.replaySpeed:1}async setDataSynchronizer(e){return new Promise(async(t,s)=>{await this.checkInit();const i="data-synchronizer-"+e.id;this.timeSync=e,this.postMessage({message:"topic",topic:i,timeTopic:this.getTimeTopicId()},t)})}async initDataSource(e){return await super.initDataSource(e),new Promise(async e=>{this.postMessage({message:"topic",topic:this.getTopicId(),timeTopic:this.getTimeTopicId()},async()=>{new BroadcastChannel(this.getTimeTopicId()).onmessage=async e=>{this.handleTimeMessage(e)},e()})})}async handleTimeMessage(e){const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}async setTimeRange(e,t,s,i=!1){let r={};return S(s)&&(r={replaySpeed:s}),this.updateProperties({...this.currentRunningProperties,startTime:e,endTime:t,...r,reconnect:i})}async getCurrentTime(){return S(this.timeSync)?this.timeSync.getCurrentTime():new Promise(e=>{this.postMessage({message:"last-timestamp"},e)})}},v=s(0),M=s.n(v);var x=class extends b{constructor(e,t){super(e,{timeShift:0,reconnectTimeout:5e3,tls:!1,...t})}async createWorker(e){return new M.a}},I=s(1),P=s.n(I);var k=class{constructor(e){this.bufferingTime=1e3,this.currentTime=Date.now(),this.id=T(),this.dataSources=e.dataSources||[],this.replaySpeed=e.replaySpeed||1,this.timerResolution=e.timerResolution||5,this.initialized=!1,this.properties={},this.properties.replaySpeed=this.replaySpeed,this.eventSubscriptionMap={},this.messagesMap={}}getTopicId(){return"data-synchronizer-"+this.id}getTimeTopicId(){return"data-synchronizer-time-"+this.id}initEventSubscription(){new BroadcastChannel(this.getTopicId()).onmessage=e=>{const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)},new BroadcastChannel(this.getTimeTopicId()).onmessage=e=>{const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}}getStartTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return this.dataSources[0].currentRunningProperties.startTime}getEndTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return this.dataSources[0].currentRunningProperties.endTime}getMinTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return S(this.dataSources[0].properties.minTime)?this.dataSources[0].properties.minTime:this.dataSources[0].properties.startTime}getMaxTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return S(this.dataSources[0].properties.maxTime)?this.dataSources[0].properties.maxTime:this.dataSources[0].properties.endTime}getReplaySpeed(){return this.replaySpeed}terminate(){null!==this.synchronizerWorker&&(this.synchronizerWorker.terminate(),this.synchronizerWorker=null);for(let e of this.dataSources)e.terminate()}subscribe(e,t){for(let s=0;s<t.length;s++)t[s]in this.eventSubscriptionMap||(this.eventSubscriptionMap[t[s]]=[]),this.eventSubscriptionMap[t[s]].push(e)}async initDataSources(){return new Promise(async(e,t)=>{try{const t=[];for(let e of this.dataSources){const s=await this.createDataSourceForWorker(e);t.push(s)}this.synchronizerWorker=new P.a,this.handleWorkerMessage(),await this.postMessage({message:"init",dataSources:t,replaySpeed:this.replaySpeed,timerResolution:this.timerResolution,dataTopic:this.getTopicId(),timeTopic:this.getTimeTopicId()},function(){this.initEventSubscription(),this.initialized=!0,e()}.bind(this),!1)}catch(e){console.log(e),t(e)}})}async createDataSourceForWorker(e){const t={bufferingTime:e.properties.bufferingTime||0,timeOut:e.properties.timeOut||0,id:e.id,name:e.name};try{await e.setDataSynchronizer(this),e.properties.replaySpeed=this.replaySpeed}catch(e){throw console.error("Cannot set the synchronizer to this DataSource",e),e}return t}async addDataSource(e){return new Promise(async t=>{const s=await this.createDataSourceForWorker(e);this.dataSources.push(e),await this.postMessage({message:"add",dataSources:[s]},t)})}async push(e,t){return new Promise(async(s,i)=>{null!==this.synchronizerWorker&&await this.postMessage({type:"data",dataSourceId:e,data:t},s)})}async connect(){await this.checkInit(),await this.doConnect()}async checkInit(){const e=this;return new Promise(async(t,s)=>{S(e.init)||(e.init=e.initDataSources()),await e.init,t()})}async doConnect(){for(let e of this.dataSources)await e.connect()}async disconnect(){await this.reset();for(let e of this.dataSources)await e.disconnect()}async setReplaySpeed(e){return new Promise(async t=>{this.replaySpeed=e,this.properties.replaySpeed=e,await this.postMessage({message:"replay-speed",replaySpeed:e},t)})}async setTimeRange(e,t,s,i=!1){this.replaySpeed!==s&&await this.setReplaySpeed(s),await this.reset();for(let r of this.dataSources)r.setTimeRange(e,t,s,i)}async reset(){return new Promise(async e=>{await this.checkInit(),await this.postMessage({message:"reset"},e)})}async getCurrentTime(){return new Promise(async e=>{await this.postMessage({message:"current-time"},e)})}async isConnected(){for(let e of this.dataSources)if(!await e.isConnected())return!1;return!0}async postMessage(e,t,s=!0){s&&await this.checkInit();const i=T();this.synchronizerWorker.postMessage({...e,messageId:i}),S(t)&&(this.messagesMap[i]=t)}handleWorkerMessage(){this.synchronizerWorker.onmessage=e=>{const t=e.data.messageId;t in this.messagesMap&&(this.messagesMap[t](e.data.data),delete this.messagesMap[t])}}};const O="2015-12-19T21:04:29.231Z",D="2015-12-19T21:09:19.675Z",W=new x("drone-Video",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:video2",observedProperty:"http://sensorml.com/ont/swe/property/VideoFrame",startTime:O,endTime:D,replaySpeed:1.2,bufferingTime:500,timeOut:1e3}),R=new x("drone-Video",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:video2",observedProperty:"http://sensorml.com/ont/swe/property/VideoFrame",startTime:O,endTime:D,replaySpeed:1.2,bufferingTime:500,timeOut:1e3}),C=new x("drone-Video",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:video2",observedProperty:"http://sensorml.com/ont/swe/property/VideoFrame",startTime:O,endTime:D,replaySpeed:1.2,bufferingTime:500,timeOut:1e3}),z=new k({replaySpeed:1.2,timerResolution:5,dataSources:[W,R,C]});W.subscribe(e=>function(e){let t;for(let s=0;s<e.length;s++)t=e[s],t.data.videoFrame.data=e[s].data.videoFrame.data.slice(0,5),++d%10==0?i.value=JSON.stringify([t])+"\n":i.value+=JSON.stringify([t])+"\n";o.innerText=new Date(e[e.length-1].data.timestamp).toISOString()+" - Video 0",u.innerText=new Date(e[e.length-1].data.timestamp).toISOString()+" - Current",i.scrollTop=i.scrollHeight}(e.values),[g]),R.subscribe(e=>function(e){let t;for(let s=0;s<e.length;s++)t=e[s],t.data.videoFrame.data=e[s].data.videoFrame.data.slice(0,5),++h%10==0?r.value=JSON.stringify([t])+"\n":r.value+=JSON.stringify([t])+"\n";c.innerText=new Date(e[e.length-1].data.timestamp).toISOString()+" - Video 1",u.innerText=new Date(e[e.length-1].data.timestamp).toISOString()+" - Current",r.scrollTop=r.scrollHeight}(e.values),[g]),C.subscribe(e=>function(e){let t;for(let s=0;s<e.length;s++)t=e[s],t.data.videoFrame.data=e[s].data.videoFrame.data.slice(0,5),++m%10==0?n.value=JSON.stringify([t])+"\n":n.value+=JSON.stringify([t])+"\n";p.innerText=new Date(e[e.length-1].data.timestamp).toISOString()+" - Video 2",u.innerText=new Date(e[e.length-1].data.timestamp).toISOString()+" - Current",n.scrollTop=n.scrollHeight}(e.values),[g]),z.subscribe(e=>{return(t=e.timestamp)<l&&(a.value+=new Date(t).toISOString()+" < "+new Date(l).toISOString()+"\n"),void(l=t);var t},[y]),z.connect()}]);
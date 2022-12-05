(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{119:function(e,t,s){"use strict";s.d(t,"a",(function(){return i}));const i={CONNECTING:"connecting",CONNECTED:"connected",DISCONNECTED:"disconnected",FETCH_STARTED:"fetch-start",FETCH_ENDED:"fetch-end",CLOSED:"closed",CLOSED_ERROR:"closed-error"}},158:function(e,t,s){e.exports=function(){return new Worker(s.p+"d7e1cf89cf5d06b059f0.worker.js")}},159:function(e,t,s){e.exports=function(){return new Worker(s.p+"2474df9aedf71e65aa22.worker.js")}},164:function(e,t,s){"use strict";var i=s(7),r=s(95),o=s(158),n=s.n(o);const a="realTime";var l=class{constructor(e,t){this.id="DataSource-"+Object(i.j)(),this.name=e,this.properties=t,this.eventSubscriptionMap={},this.init=void 0,this.messagesMap={},this.mode=a,Object(i.h)(t.mode)&&(this.mode=t.mode)}getId(){return this.id}getName(){return this.name}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}getTopicId(){return r.a+this.id}getVersion(){return 0}subscribe(e,t){for(let s=0;s<t.length;s++)t[s]in this.eventSubscriptionMap||(this.eventSubscriptionMap[t[s]]=[]),this.eventSubscriptionMap[t[s]].push(e)}async createWorker(e){return new n.a}async updateProperties(e){return this.properties={...this.properties,...e},new Promise(t=>{this.postMessage({message:"update-properties",data:e},t)})}async connect(){await this.checkInit(),await this.doConnect()}async initDataSource(){return new Promise(async(e,t)=>{this.dataSourceWorker=await this.createWorker(this.properties),this.handleWorkerMessage(),this.postMessage({message:"init",id:this.id,properties:this.properties,topics:{data:this.getTopicId()}},async t=>{new BroadcastChannel(this.getTopicId()).onmessage=async e=>{await this.handleMessage(e)},e(t)})})}async handleMessage(e){const t=e.data.type;if(t in this.eventSubscriptionMap)for(let s=0;s<this.eventSubscriptionMap[t].length;s++)this.eventSubscriptionMap[t][s](e.data)}async checkInit(){return new Promise(async(e,t)=>{Object(i.h)(this.init)||(this.init=this.initDataSource()),await this.init,e()})}async doConnect(){return new Promise(async e=>{this.postMessage({message:"connect"},e)})}async isConnected(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"is-connected"},e)})}async disconnect(){return new Promise(async e=>{await this.checkInit(),this.postMessage({message:"disconnect"},e)})}postMessage(e,t){const s=Object(i.j)();this.dataSourceWorker.postMessage({...e,messageId:s}),Object(i.h)(t)&&(this.messagesMap[s]=t)}handleWorkerMessage(){this.dataSourceWorker.onmessage=e=>{const t=e.data.messageId;t in this.messagesMap&&(this.messagesMap[t](e.data.data),delete this.messagesMap[t])}}async onDisconnect(){}reset(){}},d=s(159),c=s.n(d);t.a=class extends l{constructor(e,t){super(e,{...t,protocol:"file",type:"File"})}async createWorker(e){return new c.a}}},165:function(e,t,s){"use strict";var i=s(7),r=(s(174),s(95)),o=s(119),n=s(87);var a=class{constructor(e){this.layers=[],this.lastRec={},this.dataSources=[],this.broadcastChannels=[],this.id="view-"+Object(i.j)(),this.css="",Object(i.h)(e)&&Object(i.h)(e.css)&&(this.css=e.css),Object(i.b)(e&&e.supportedLayers,"supportedLayers"),Object(i.a)(e.supportedLayers,"supportedLayers"),Object(i.d)(e.supportedLayers.length>0,"supportedLayers.length === 0"),this.supportedLayers=e.supportedLayers,this.init(e)}init(e){this.properties=e,this.elementDiv=document.createElement("div"),this.elementDiv.setAttribute("id",this.id),this.elementDiv.setAttribute("class",this.css+" osh-view"),this.divId=this.id;let t=Object(i.h)(e.container)?e.container:document.body,s=document.getElementById(t);if(Object(i.h)(s)&&null!==s?(s.appendChild(this.elementDiv),this.container=s):(document.body.appendChild(this.elementDiv),this.hide(),this.container=document.body),this.beforeAddingItems(e),Object(i.h)(e)){if(Object(i.h)(e.layers))for(let t=0;t<e.layers.length;t++)this.addLayer(e.layers[t]);Object(i.h)(e.visible)&&(document.getElementById(this.divId).style.display=e.visible?"block":"none")}const r=this;new MutationObserver(e=>{e.forEach((function(e){"style"===e.attributeName&&r.onResize()}))}).observe(this.elementDiv,{attributes:!0});new MutationObserver((function(e){Object(i.h)(document.getElementById(r.divId))||(this.disconnect(),r.destroy())})).observe(document.body,{childList:!0})}hide(){this.elementDiv.style.display="none"}onResize(){}attachTo(e){Object(i.h)(this.elementDiv.parentNode)&&this.elementDiv.parentNode.removeChild(this.elementDiv),document.getElementById(e).appendChild(this.elementDiv),"none"===this.elementDiv.style.display&&(this.elementDiv.style.display="block"),this.onResize()}beforeAddingItems(e){}getId(){return this.id}getDivId(){return this.divId}async setData(e,t){}show(e){}destroy(){for(let e of this.broadcastChannels)e.close();this.broadcastChannels=[]}addLayer(e){Object(i.d)(this.supportedLayers.includes(e.type),"this layer is not supported: "+e.type+", should be "+this.supportedLayers),this.layers.push(e);let t=e.getDataSourcesIds();for(let s=0;s<t.length;s++){const i=t[s];let a=this;const l=new BroadcastChannel(r.a+i);l.onmessage=async t=>{if(t.data.type===n.a.STATUS&&t.data.status===o.a.CLOSED_ERROR)a.reset();else if(t.data.type===n.a.DATA){const s=this;await e.setData(i,t.data.values),await s.setData(i,e.getProps()),a.lastRec[i]=t.data}};const d=new BroadcastChannel(r.b+i);d.onmessage=e=>{e.data.type===n.a.TIME_CHANGED&&a.reset()},this.broadcastChannels.push(l),this.broadcastChannels.push(d)}}removeAllFromLayer(e){if(this.layers.includes(e)){for(let t in e.dataSourcesToFn)delete this.lastRec[t];e.reset()}}removeAllFromLayers(){for(let e of this.layers)this.removeAllFromLayer(e)}getDataSourcesId(){let e=[];for(let t=0;t<this.layers.length;t++){let s=this.layers[t];e=e.concat(s.getDataSourcesIds())}return e}reset(){this.removeAllFromLayers()}};var l=class extends a{constructor(e){super(e),this.layerIdToMarkers={},this.layerIdToPolylines={},this.layerIdToEllipsoids={},this.layerIdToPolygon={},this.layerIdToFrustum={},this.layerIdToDrapedImage={}}async setData(e,t){const s=t.values;for(let e=0;e<s.length;e++){const i=s[e];"marker"===t.type?this.updateMarker(i):"polyline"===t.type?this.updatePolyline(i):"drapedImage"===t.type?this.updateDrapedImage(i):"ellipse"===t.type?this.updateEllipse(i):"polygon"===t.type?this.updatePolygon(i):"coplanarPolygon"===t.type?this.updateCoPlanarPolygon(i):"frustum"===t.type&&this.updateFrustum(i)}}async addPolygonToLayer(e,t){this.layerIdToPolygon[e.polygonId]=t}async addMarkerToLayer(e,t){this.layerIdToMarkers[e.markerId]=t}async addPolylineToLayer(e,t){this.layerIdToPolylines[e.polylineId]=t}async addEllipseToLayer(e,t){this.layerIdToEllipsoids[e.ellipseId]=t}async addDrapedImageToLayer(e,t){this.layerIdToDrapedImage[e.drapedImageId]=t}async addFrustumToLayer(e,t){this.layerIdToFrustum[e.frustumId]=t}getPolygons(){const e=[];for(let t in this.layerIdToPolygon)e.push(this.layerIdToPolygon[t]);return e}getPolygon(e){return e.polygonId in this.layerIdToPolygon?this.layerIdToPolygon[e.polygonId]:null}getMarker(e){return e.markerId in this.layerIdToMarkers?this.layerIdToMarkers[e.markerId]:null}getMarkers(){const e=[];for(let t in this.layerIdToMarkers)e.push(this.layerIdToMarkers[t]);return e}getPolylines(){const e=[];for(let t in this.layerIdToPolylines)e.push(this.layerIdToPolylines[t]);return e}getEllipsoids(){const e=[];for(let t in this.layerIdToEllipsoids)e.push(this.layerIdToEllipsoids[t]);return e}getPolyline(e){return e.polylineId in this.layerIdToEllipsoids?this.layerIdToPolylines[e.polylineId]:null}getEllipse(e){return e.ellipseId in this.layerIdToEllipsoids?this.layerIdToEllipsoids[e.ellipseId]:null}getPolyline(e){return e.polylineId in this.layerIdToPolylines?this.layerIdToPolylines[e.polylineId]:null}getDrapedImage(e){return e.drapedImageId in this.layerIdToDrapedImage?this.layerIdToDrapedImage[e.drapedImageId]:null}getFrustums(){const e=[];for(let t in this.layerIdToFrustum)e.push(this.layerIdToFrustum[t]);return e}getFrustum(e){return e.frustumId in this.layerIdToFrustum?this.layerIdToFrustum[e.frustumId]:null}getLayer(e){for(let t of this.layers)if(t.props.id===e)return t;return null}removeAllFromLayer(e){this.removeMarkers(e),this.removePolylines(e),this.removeEllipsoids(e),this.removePolygons(e),this.removeFrustums(e),super.removeAllFromLayer(e)}removePolygons(e){const t=e.getIds()||[];for(let e of t){const t=this.layerIdToPolygon[e];Object(i.h)(t)&&this.removePolygonFromLayer(t),delete this.layerIdToPolygon[e]}}removeMarkers(e){const t=e.getIds()||[];for(let e of t){const t=this.layerIdToMarkers[e];Object(i.h)(t)&&this.removeMarkerFromLayer(t),delete this.layerIdToMarkers[e]}}removeEllipsoids(e){const t=e.getIds()||[];for(let e of t){const t=this.layerIdToEllipsoids[e];Object(i.h)(t)&&this.removeEllipseFromLayer(t),delete this.layerIdToEllipsoids[e]}}removePolylines(e){const t=e.getIds()||[];for(let e of t){const t=this.layerIdToPolylines[e];Object(i.h)(t)&&this.removePolylineFromLayer(t),delete this.layerIdToPolylines[e]}}removeDrapedImages(e){const t=e.getIds()||[];for(let e of t){const t=this.layerIdToDrapedImage[e];Object(i.h)(t)&&this.removeDrapedImageFromLayer(t),delete this.layerIdToDrapedImage[e]}}removeFrustums(e){const t=e.getIds()||[];for(let e of t){const t=this.layerIdToFrustum[e];Object(i.h)(t)&&this.removeFrustumFromLayer(t),delete this.layerIdToFrustum[e]}}removeMarkerFromLayer(e){}removePolylineFromLayer(e){}removeDrapedImageFromLayer(e){}removePolygonFromLayer(e){}onMarkerLeftClick(e,t,s,r){Object(i.h)(s.onLeftClick)&&s.onLeftClick.call(s,e,t,r)}onMarkerRightClick(e,t,s,r){Object(i.h)(s.onRightClick)&&s.onRightClick.call(s,e,t,r)}onMarkerMove(e,t,s,r){Object(i.h)(s.onMove)&&s.onMove.call(s,e,t,r)}onMarkerHover(e,t,s,r){Object(i.h)(s.onHover)&&s.onHover.call(s,e,t,r)}getLayerId(e){const t=e.split("$");return Object(i.h)(t)&&2===t.length?t[0]:null}getMarkerId(e){if(!Object(i.h)(e))return null;const t=e.split("$");return Object(i.h)(t)&&2===t.length?t[1]:null}async updateMarker(){}async updatePolyline(){}async updatePolygon(){}async updateEllipse(){}async updateCoPlanarPolygon(){}async updateDrapedImage(){}},d=s(161),c=s(222),h=s(231),u=s(230),p=s(103),y=s(220),g=s(224),m=(s(176),s(229)),I=s(153),f=s(221);t.a=class extends l{constructor(e){super({supportedLayers:["marker","polyline","polygon"],...e}),Object(I.b)(f.a);let t=document.getElementById(this.divId).className;document.getElementById(this.divId).setAttribute("class",t+" "+this.css),this.autoZoomOnFirstMarker=!1,Object(i.h)(e)&&Object(i.h)(e.autoZoomOnFirstMarker)&&(this.autoZoomOnFirstMarker=e.autoZoomOnFirstMarker)}beforeAddingItems(e){this.initMap(e)}initMap(e){this.INITIAL_VIEW_STATE={longitude:0,latitude:0,zoom:2,bearing:0,pitch:0};const t=document.createElement("canvas");if(t.setAttribute("id",Object(i.j)()),t.setAttribute("style","width:100%;height:100%;position:relative;"),document.getElementById(this.divId).appendChild(t),this.deckLayers=[],Object(i.h)(e)&&Object(i.h)(e.deckProps)&&Object(i.h)(e.deckProps.layers))for(let t=0;t<e.deckProps.layers.length;t++){const s=e.deckProps.layers[t].id?e.deckProps.layers[t].id:"base_"+s;this.deckLayers.push(e.deckProps.layers[t])}else this.deckLayers.push(new g.a({id:"base",data:"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",minZoom:0,maxZoom:19,tileSize:256,renderSubLayers:e=>{const{bbox:{west:t,south:s,east:i,north:r}}=e.tile;return new u.a(e,{data:null,image:e.data,bounds:[t,s,i,r]})}}));let s={canvas:t.id,width:"100%",height:"100%",controller:!0,views:[new d.a],initialViewState:this.INITIAL_VIEW_STATE,onViewStateChange:({viewState:e})=>{},layers:this.deckLayers};Object(i.h)(e)&&Object(i.h)(s)&&(s={...s,...e.deckProps}),this.INITIAL_VIEW_STATE=s.initialViewState,this.deckgl=new c.a(s)}async updateMarker(e){const t=e.id+"$"+e.markerId,s=e.markerId;let r,o=e.iconColor;o=Object(i.h)(o)?Object(i.g)(e.iconColor):"#000000",r=e.icon.endsWith("glb")?new m.a({id:t,data:[{position:[e.location.x,e.location.y,e.location.z]}],pickable:!0,scenegraph:e.icon,getPosition:e=>e.position,getOrientation:t=>[0,e.orientation.yaw,90],_animations:{"*":{speed:5}},sizeScale:e.iconScale,_lighting:"pbr"}):new h.a({id:t,data:[{position:[e.location.x,e.location.y,1]}],pickable:!0,iconAtlas:e.icon,iconMapping:{marker:{x:0,y:0,anchorX:e.iconAnchor[0],anchorY:e.iconAnchor[1],width:e.iconSize[0],height:e.iconSize[1],mask:Object(i.h)(e.iconColor)&&"#000000"!==e.iconColor}},getIcon:e=>"marker",sizeScale:e.iconScale,getPosition:e=>e.position,getSize:t=>e.iconScale,getColor:e=>o,onHover:(t,i)=>this.onMarkerHover(s,t,e,i),onClick:(t,i)=>i.leftButton?this.onMarkerLeftClick(s,t,e,i):this.onMarkerRightClick(s,t,e,i),zIndex:e.zIndex}),this.addMarkerToLayer(e,r);const n={};this.autoZoomOnFirstMarker&&(this.autoZoomOnFirstMarker=!1,n.initialViewState={...this.INITIAL_VIEW_STATE,longitude:e.location.x,latitude:e.location.y,zoom:e.zoomLevel}),this.render(n)}async updatePolyline(e){const t=e.id+"$"+e.polylineId,s=e.locations.map(e=>[e.x,e.y,e.z||1]),i=[{weight:e.weight,name:e.id,color:this.rgbaToArray(e.color),path:s}],r=new p.a({id:t,data:i,widthUnits:"pixels",widthMinPixels:5,getPath:e=>e.path,getColor:e=>e.color,getWidth:e=>e.weight});this.addPolylineToLayer(e,r),this.render({})}async updatePolygon(e){const t=e.id+"$"+e.polygonId;let s=[];const r=e.vertices;if(Object(i.h)(r)&&r.length>0)for(let e=0;e<r.length-1;e+=2)s.push([r[e],r[e+1]]);let o=Object(i.k)(e.outlineColor).map((e,t,s)=>t>=3?parseInt(255*e):e),n=Object(i.k)(e.color).map((e,t,s)=>t>=3?parseInt(255*e):e);const a=[{outlineWidth:e.outlineWidth,outlineColor:o,name:e.label,color:n,contour:[s]}],l=new y.a({id:t,data:a,widthUnits:"pixels",lineWidthMinPixels:1,stroked:!0,filled:!0,getPolygon:e=>e.contour,getFillColor:e=>e.color,getLineWidth:e=>e.outlineWidth,getLineColor:e=>e.outlineColor});this.addPolygonToLayer(e,l),this.render({})}removeMarker(e){super.removeMarkers(e),this.render({})}removePolylines(e){super.removePolylines(e),this.render({})}removePolygons(e){super.removePolygons(e),this.render({})}render(e){const t=this.getMarkers(),s=this.getPolylines(),i=this.getPolygons();t.sort((e,t)=>e.props.zIndex>t.props.zIndex?1:t.props.zIndex>e.props.zIndex?-1:0);const r={layers:[...this.deckLayers,...i,...s,...t]};this.deckgl.setProps({...e,...r})}rgbaToArray(e){if(Array.isArray(e))return e;let t=e.indexOf("(")+1,s=e.indexOf(")");const i=e.substr(t,s-t).split(",").map(Number);return i[3]=parseInt(100*i[3]),i}}},167:function(e,t,s){"use strict";var i=s(7);var r=class{constructor(e){this.properties=e,this.init(e)}init(e=this.properties){if(this.data=[],this.propsById={},this.dataSourcesToFn=void 0,this.props={id:"layer-"+Object(i.j)(),filter:!0,name:"",description:"",visible:!0,timestamp:!0},this.dataSourceIds=void 0,Object(i.h)(e.name)&&(this.props.name=e.name),Object(i.h)(e.description)&&(this.props.description=e.description),Object(i.h)(e.dataSourceId)&&(this.dataSourceIds=[e.dataSourceId]),Object(i.h)(e.dataSourceIds)&&(this.dataSourceIds=e.dataSourceIds),this.dataSourceIds||(this.dataSourceIds=[]),Object(i.h)(e.visible)&&(this.props.visible=e.visible),Object(i.h)(e.timestamp)&&(this.props.timestamp=e.timestamp),Object(i.h)(e.onLeftClick)&&Object(i.c)(e.onLeftClick)&&(this.props.onLeftClick=e.onLeftClick),Object(i.h)(e.onRightClick)&&Object(i.c)(e.onRightClick)&&(this.props.onRightClick=e.onRightClick),Object(i.h)(e.onHover)&&Object(i.c)(e.onHover)&&(this.props.onHover=e.onHover),this.initEvents(),this.checkFn("filter")){let e=(e,t,s)=>{this.props.filter=this.getFunc("filter")(e,t,s)};this.addFn(this.getDataSourcesIdsByProperty("filter"),e)}else{this.properties.filter=function(e,t,s){return!0};let e=async(e,t,s)=>{this.props.filter=await this.getFunc("filter")(e,t,s)};this.addFn(this.getDataSourcesIdsByProperty("filter"),e)}if(this.checkFn("getVisible")){let e=async(e,t,s)=>{this.updateProperty("visible",await this.getFunc("getVisible")(e,t,s))};this.addFn(this.getDataSourcesIdsByProperty("getVisible"),e)}if(this.checkFn("getTimestamp")){let e=async(e,t,s)=>{this.updateProperty("timestamp",await this.getFunc("getTimestamp")(e,t,s))};this.addFn(this.getDataSourcesIdsByProperty("getTimestamp"),e)}if(this.checkFn("getName")){let e=async(e,t,s)=>{this.updateProperty("name",await this.getFunc("getName")(e,t,s))};this.addFn(this.getDataSourcesIdsByProperty("getName"),e)}if(this.checkFn("getDescription")){let e=async(e,t,s)=>{this.updateProperty("description",await this.getFunc("getDescription")(e,t,s))};this.addFn(this.getDataSourcesIdsByProperty("getDescription"),e)}}getFunc(e){return this.properties[e].handler||this.properties[e]}checkFn(e){let t=this.properties[e];if(Object(i.i)(t))return Object(i.b)(this.dataSourceIds,"dataSourceIds"),!0;{let s=Object(i.f)(t);return s&&(Object(i.a)(t.dataSourceIds,e+".dataSourceIds"),Object(i.c)(t.handler,e+".handler")),s}}initEvents(){}clear(){}getId(){return this.props.id}select(e){}addFn(e,t,s=!1){Object(i.h)(this.dataSourcesToFn)||(this.dataSourcesToFn={});for(let r=0;r<e.length;r++){let o=e[r];Object(i.h)(this.dataSourcesToFn[o])||(this.dataSourcesToFn[o]=[]),s?this.dataSourcesToFn[o].unshift(t):this.dataSourcesToFn[o].push(t)}}async setData(e,t,s={}){if(this.data=[],s.dataSourceId=e,Object(i.h)(this.dataSourcesToFn)&&e in this.dataSourcesToFn){let i=this.dataSourcesToFn[e];this.props.filter=!0;for(let e=0;e<t.length;e++){for(let r=0;r<i.length&&(await i[r](t[e].data,t[e].data.timestamp,s),this.props.filter);r++);this.props.filter&&this.data.push({...this.props,...this.propsById[this.getId()]})}}}getDataSourcesIds(){if(Object(i.h)(this.dataSourcesToFn)){let e=[];for(let t in this.dataSourcesToFn)e.push(t);return e}return Object(i.b)(this.dataSourceIds,"dataSourceId must be defined"),this.dataSourceIds}getDataSourcesIdsByProperty(e){return this.properties[e].dataSourceIds||this.dataSourceIds}getProps(){return{type:this.type,values:this.data}}reset(){this.init(this.properties)}updateProperty(e,t){this.propsById[this.getId()][e]=t}checkExistingProps(e){return e in this.propsById}setProps(e,t){this.propsById[e]=t}setId(e,t){this.props.id=e,this.checkExistingProps(e)||this.setProps(e,t())}definedId(e,t){if(this.checkFn("get"+Object(i.e)(e))){let s=async(s,r,o)=>{const n=await this.getFunc("get"+Object(i.e)(e))(s,r,o);this.setId(n,()=>({...t,[e]:n}))};this.addFn(this.getDataSourcesIdsByProperty("get"+Object(i.e)(e)),s,!0)}else this.setId(this.getId(),()=>({...t,[e]:this.getId()}))}getCurrentProps(){return this.propsById[this.getId()]}getIds(){return Object.keys(this.propsById)}};t.a=class extends r{constructor(e){super(e),this.type="data"}async setData(e,t,s){this.props.data=t}getProps(){return{type:this.type,values:this.props.data}}}},174:function(e,t,s){var i=s(175);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,s(50).default)("7b064102",i,!1,{})},175:function(e,t,s){(t=s(49)(!1)).push([e.i,".osh-view {\n    width:100%;\n    height: 100%;\n}\n",""]),e.exports=t},176:function(e,t,s){var i=s(177);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,s(50).default)("76e66efc",i,!1,{})},177:function(e,t,s){(t=s(49)(!1)).push([e.i,".osh-view > .deckgl-overlay {\n    position: relative !important;\n}\n",""]),e.exports=t},7:function(e,t,s){"use strict";s.d(t,"h",(function(){return i})),s.d(t,"f",(function(){return r})),s.d(t,"g",(function(){return o})),s.d(t,"i",(function(){return a})),s.d(t,"b",(function(){return l})),s.d(t,"d",(function(){return d})),s.d(t,"a",(function(){return h})),s.d(t,"c",(function(){return u})),s.d(t,"j",(function(){return p})),s.d(t,"e",(function(){return y})),s.d(t,"k",(function(){return g}));Math.pow(2,53);function i(e){return null!=e}function r(e){return i(e)&&null!==e}function o(e){const[t,s,i]=e.match(/\w\w/g).map(e=>parseInt(e,16));return[t,s,i]}function n(e,t){return r(e)&&typeof e===t}function a(e,t){return n(e,"function")}function l(e,t="letiable"){if(!i(e))throw t+" must be defined";return e}function d(e,t="letiable"){if(!i(e)||!e)throw t;return e}function c(e,t,s="letiable"){if(l(e,s),typeof e!==t)throw s+" must be of type "+t;return e}function h(e,t="letiable"){if(l(e,t),!Array.isArray(e))throw t+" must be an array";return e}function u(e,t){return c(e,"function",t)}function p(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}function y(e){return e.charAt(0).toUpperCase()+e.slice(1)}function g(e){let t=e.indexOf("(")+1,s=e.indexOf(")");return e.substr(t,s-t).split(",").map(Number)}},87:function(e,t,s){"use strict";s.d(t,"a",(function(){return i}));const i={DATA:"data",LAST_TIME:"last-time",MASTER_TIME:"master-time",STATUS:"status",TIME_CHANGED:"time-changed"}},95:function(e,t,s){"use strict";s.d(t,"a",(function(){return i})),s.d(t,"b",(function(){return r}));const i="datasource-data-",r="datasource-time-"}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{132:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return m}));var a=r(0),n=r.n(a);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var b=n.a.createContext({}),s=function(e){var t=n.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=s(e.components);return n.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),p=s(r),d=a,m=p["".concat(i,".").concat(d)]||p[d]||u[d]||o;return r?n.a.createElement(m,c(c({ref:t},b),{},{components:r})):n.a.createElement(m,c({ref:t},b))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var b=2;b<o;b++)i[b]=r[b];return n.a.createElement.apply(null,i)}return n.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},64:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return s}));var a=r(2),n=r(6),o=(r(0),r(132)),i={id:"video",title:"Video",sidebar_label:"Video"},c={unversionedId:"datasources/sos/video",id:"datasources/sos/video",isDocsHomePage:!1,title:"Video",description:"VideoDataSource is a specific DataSource to parse Video data.",source:"@site/docs/datasources/sos/video.md",slug:"/datasources/sos/video",permalink:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/video",version:"current",sidebar_label:"Video",sidebar:"someSidebar",previous:{title:"SweJson",permalink:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/swejson"},next:{title:"VideoWithRoll",permalink:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/videoroll"}},l=[{value:"Specific properties",id:"specific-properties",children:[]},{value:"Example",id:"example",children:[]},{value:"Parser",id:"parser",children:[]}],b={rightToc:l};function s(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},b,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"VideoDataSource is a specific DataSource to parse Video data."),Object(o.b)("p",null,"The class inherits directly from ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/index"}),"DataSource"),"."),Object(o.b)("p",null,"There are specific properties for this DataSource."),Object(o.b)("h2",{id:"specific-properties"},"Specific properties"),Object(o.b)("p",null,"These properties are members of ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/index#global-configuration"}),"customUrlParams"),"."),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Mandatory"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"video_bitrate"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Number"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"define a custom bitrate (in b/s)"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"video_scale"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Number"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"define a custom scale, 0.0 < value < 1.0"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"video_width"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Number"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"define a custom width (in pixel)"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"video_height"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Number"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"define a custom height (in pixel)"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"-")))),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"(1) Note that in case of the video stream, it is very important to define the ",Object(o.b)("strong",{parentName:"em"},"responseFormat")," to activate the support of these parameters.")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"(2) Note these parameters are available only from OSH server >= 1.4.0")),Object(o.b)("h2",{id:"example"},"Example"),Object(o.b)("p",null,"This example defines a custom bitrate, width and height:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'const dsProperties = {\n    protocol: "ws",\n    service: "SOS",\n    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",\n    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",\n    offeringID: "urn:mysos:solo:video2",\n    startTime: "2015-12-19T21:04:30Z",\n    endTime: "2015-12-19T21:09:19Z",\n    customUrlParams: {\n        video_bitrate: 3200,\n        width: 1280,\n        height: 720\n    },\n    responseFormat: "video/H264"\n};\n\nconst videoDataSource = new Video("drone-Video", dsProperties);\n')),Object(o.b)("p",null,"The result URL:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-http"}),"ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:mysos:solo:video2&observedProperty=http://sensorml.com/ont/swe/property/VideoFrame&temporalFilter=phenomenonTime,2015-12-19T21:04:30Z/2015-12-19T21:09:19Z&replaySpeed=1&responseFormat=video/H264&video_bitrate=3200&video_width=1280&video_height=720\n")),Object(o.b)("h2",{id:"parser"},"Parser"),Object(o.b)("p",null,"The underlaying stream is binary."),Object(o.b)("p",null,"The first 12 bytes is the timestamp in millis."),Object(o.b)("p",null,"The next bytes are corresponding to a full NAL unit."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"}," |--- 12 bytes timestamp ---|--- NAL UNIT ---| ")),Object(o.b)("ins",null,"From Server"),":",Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),"[..binary..data..]\n")),Object(o.b)("ins",null,"After parsing"),":",Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),"{\n    timeStamp: 1450559070000,\n    data: {\n      frameData: [..binary..NAL_UNIT...],\n      roll: 0    \n    } \n}  \n")))}s.isMDXComponent=!0}}]);
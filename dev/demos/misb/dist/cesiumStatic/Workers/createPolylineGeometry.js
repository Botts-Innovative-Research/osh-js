/*! For license information please see createPolylineGeometry.js.LICENSE.txt */
import{a as m}from"./chunk-L5VPW2SR.js";import{a as N}from"./chunk-L4VLY3HN.js";import{a as U}from"./chunk-U5Y6TUUH.js";import"./chunk-X5RGBNPH.js";import{a as k}from"./chunk-GNOHI6CF.js";import{a as le}from"./chunk-SXCE2VWF.js";import"./chunk-NLCQYVEX.js";import"./chunk-ZWKNWN2X.js";import"./chunk-JXYWMXB6.js";import{a as se}from"./chunk-PDIF2AUE.js";import{a as ce}from"./chunk-LIAARPDW.js";import{a as ne,b as re,c as ie,d as O}from"./chunk-PRRW7QSP.js";import{d as oe}from"./chunk-4NBDOIVA.js";import"./chunk-YIJHUUZY.js";import"./chunk-CSZ6CHXI.js";import{a as x}from"./chunk-XXK6IR5Y.js";import{a as p,d as u}from"./chunk-IGBMENRT.js";import{a as J}from"./chunk-SEE54P6A.js";import"./chunk-JNX2URIY.js";import"./chunk-4Z3GDVJK.js";import{a as A}from"./chunk-LU3FCBPP.js";import{a as V}from"./chunk-S2577PU4.js";import{e as h}from"./chunk-2TPVVSVW.js";var me=[];function Ae(e,t,r,o,n){let a=me;a.length=n;let i,s=r.red,l=r.green,p=r.blue,c=r.alpha,h=o.red,u=o.green,d=o.blue,f=o.alpha;if(m.equals(r,o)){for(i=0;i<n;i++)a[i]=m.clone(r);return a}let k=(h-s)/n,g=(u-l)/n,w=(d-p)/n,y=(f-c)/n;for(i=0;i<n;i++)a[i]=new m(s+i*k,l+i*g,p+i*w,c+i*y);return a}function q(e){let t=(e=A(e,A.EMPTY_OBJECT)).positions,r=e.colors,o=A(e.width,1),n=A(e.colorsPerVertex,!1);if(!h(t)||t.length<2)throw new V("At least two positions are required.");if("number"!=typeof o)throw new V("width must be a number");if(h(r)&&(n&&r.length<t.length||!n&&r.length<t.length-1))throw new V("colors has an invalid length.");this._positions=t,this._colors=r,this._width=o,this._colorsPerVertex=n,this._vertexFormat=k.clone(A(e.vertexFormat,k.DEFAULT)),this._arcType=A(e.arcType,N.GEODESIC),this._granularity=A(e.granularity,J.RADIANS_PER_DEGREE),this._ellipsoid=u.clone(A(e.ellipsoid,u.WGS84)),this._workerName="createPolylineGeometry";let a=1+t.length*p.packedLength;a+=h(r)?1+r.length*m.packedLength:1,this.packedLength=a+u.packedLength+k.packedLength+4}q.pack=function(e,t,r){if(!h(e))throw new V("value is required");if(!h(t))throw new V("array is required");r=A(r,0);let o,n=e._positions,a=n.length;for(t[r++]=a,o=0;o<a;++o,r+=p.packedLength)p.pack(n[o],t,r);let i=e._colors;for(a=h(i)?i.length:0,t[r++]=a,o=0;o<a;++o,r+=m.packedLength)m.pack(i[o],t,r);return u.pack(e._ellipsoid,t,r),r+=u.packedLength,k.pack(e._vertexFormat,t,r),r+=k.packedLength,t[r++]=e._width,t[r++]=e._colorsPerVertex?1:0,t[r++]=e._arcType,t[r]=e._granularity,t};var de=u.clone(u.UNIT_SPHERE),ue=new k,S={positions:void 0,colors:void 0,ellipsoid:de,vertexFormat:ue,width:void 0,colorsPerVertex:void 0,arcType:void 0,granularity:void 0};q.unpack=function(e,t,r){if(!h(e))throw new V("array is required");t=A(t,0);let o,n=e[t++],a=new Array(n);for(o=0;o<n;++o,t+=p.packedLength)a[o]=p.unpack(e,t);n=e[t++];let i=n>0?new Array(n):void 0;for(o=0;o<n;++o,t+=m.packedLength)i[o]=m.unpack(e,t);let s=u.unpack(e,t,de);t+=u.packedLength;let l=k.unpack(e,t,ue);t+=k.packedLength;let c=e[t++],d=1===e[t++],f=e[t++],g=e[t];return h(r)?(r._positions=a,r._colors=i,r._ellipsoid=u.clone(s,r._ellipsoid),r._vertexFormat=k.clone(l,r._vertexFormat),r._width=c,r._colorsPerVertex=d,r._arcType=f,r._granularity=g,r):(S.positions=a,S.colors=i,S.width=c,S.colorsPerVertex=d,S.arcType=f,S.granularity=g,new q(S))};var pe=new p,ae=new p,fe=new p,he=new p;q.createGeometry=function(e){let t,r,o,n=e._width,a=e._vertexFormat,i=e._colors,s=e._colorsPerVertex,l=e._arcType,c=e._granularity,u=e._ellipsoid,d=[],f=le(e._positions,p.equalsEpsilon,!1,d);if(h(i)&&d.length>0){let e=0,t=d[0];i=i.filter((function(r,o){let n=!1;return n=s?o===t||0===o&&1===t:o+1===t,!n||(e++,t=d[e],!1)}))}let k=f.length;if(k<2||n<=0)return;if(l===N.GEODESIC||l===N.RHUMB){let e,o;l===N.GEODESIC?(e=J.chordLength(c,u.maximumRadius),o=U.numberOfPoints):(e=c,o=U.numberOfPointsRhumbLine);let n=U.extractHeights(f,u);if(h(i)){let n=1;for(t=0;t<k-1;++t)n+=o(f[t],f[t+1],e);let a=new Array(n),l=0;for(t=0;t<k-1;++t){let p=f[t],c=f[t+1],h=i[t],u=o(p,c,e);if(s&&t<n){let e=Ae(p,c,h,i[t+1],u),o=e.length;for(r=0;r<o;++r)a[l++]=e[r]}else for(r=0;r<u;++r)a[l++]=m.clone(h)}a[l]=m.clone(i[i.length-1]),i=a,me.length=0}f=l===N.GEODESIC?U.generateCartesianArc({positions:f,minDistance:e,ellipsoid:u,height:n}):U.generateCartesianRhumbArc({positions:f,granularity:e,ellipsoid:u,height:n})}k=f.length;let g,w=4*k-4,y=new Float64Array(3*w),A=new Float64Array(3*w),_=new Float64Array(3*w),P=new Float32Array(2*w),v=a.st?new Float32Array(2*w):void 0,E=h(i)?new Uint8Array(4*w):void 0,L=0,S=0,T=0,j=0;for(r=0;r<k;++r){let e,t;0===r?(g=pe,p.subtract(f[0],f[1],g),p.add(f[0],g,g)):g=f[r-1],p.clone(g,fe),p.clone(f[r],ae),r===k-1?(g=pe,p.subtract(f[k-1],f[k-2],g),p.add(f[k-1],g,g)):g=f[r+1],p.clone(g,he),h(E)&&(e=0===r||s?i[r]:i[r-1],r!==k-1&&(t=i[r]));let l=r===k-1?2:4;for(o=0===r?2:0;o<l;++o){p.pack(ae,y,L),p.pack(fe,A,L),p.pack(he,_,L),L+=3;let i=o-2<0?-1:1;if(P[S++]=o%2*2-1,P[S++]=i*n,a.st&&(v[T++]=r/(k-1),v[T++]=Math.max(P[S-2],0)),h(E)){let r=o<2?e:t;E[j++]=m.floatToByte(r.red),E[j++]=m.floatToByte(r.green),E[j++]=m.floatToByte(r.blue),E[j++]=m.floatToByte(r.alpha)}}}let V=new ce;V.position=new O({componentDatatype:x.DOUBLE,componentsPerAttribute:3,values:y}),V.prevPosition=new O({componentDatatype:x.DOUBLE,componentsPerAttribute:3,values:A}),V.nextPosition=new O({componentDatatype:x.DOUBLE,componentsPerAttribute:3,values:_}),V.expandAndWidth=new O({componentDatatype:x.FLOAT,componentsPerAttribute:2,values:P}),a.st&&(V.st=new O({componentDatatype:x.FLOAT,componentsPerAttribute:2,values:v})),h(E)&&(V.color=new O({componentDatatype:x.UNSIGNED_BYTE,componentsPerAttribute:4,values:E,normalize:!0}));let D=se.createTypedArray(w,6*k-6),b=0,F=0,I=k-1;for(r=0;r<I;++r)D[F++]=b,D[F++]=b+2,D[F++]=b+1,D[F++]=b+1,D[F++]=b+2,D[F++]=b+3,b+=4;return new ie({attributes:V,indices:D,primitiveType:re.TRIANGLES,boundingSphere:oe.fromPoints(f),geometryType:ne.POLYLINES})};var Q=q;function ge(e,t){return h(t)&&(e=Q.unpack(e,t)),e._ellipsoid=u.clone(e._ellipsoid),Q.createGeometry(e)}var He=ge;export{He as default};
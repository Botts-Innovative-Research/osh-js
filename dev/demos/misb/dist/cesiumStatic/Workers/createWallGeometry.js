/*! For license information please see createWallGeometry.js.LICENSE.txt */
import{a as nt}from"./chunk-S4EGOK7B.js";import"./chunk-U5Y6TUUH.js";import"./chunk-X5RGBNPH.js";import{a as _}from"./chunk-GNOHI6CF.js";import"./chunk-SXCE2VWF.js";import"./chunk-NLCQYVEX.js";import"./chunk-ZWKNWN2X.js";import"./chunk-JXYWMXB6.js";import{a as ot}from"./chunk-PDIF2AUE.js";import{a as it}from"./chunk-LIAARPDW.js";import{b as tt,c as et,d as R}from"./chunk-PRRW7QSP.js";import{d as I}from"./chunk-4NBDOIVA.js";import"./chunk-YIJHUUZY.js";import"./chunk-CSZ6CHXI.js";import{a as S}from"./chunk-XXK6IR5Y.js";import{a as s,d as l}from"./chunk-IGBMENRT.js";import{a as J}from"./chunk-SEE54P6A.js";import"./chunk-JNX2URIY.js";import"./chunk-4Z3GDVJK.js";import{a as w}from"./chunk-LU3FCBPP.js";import{a as P}from"./chunk-S2577PU4.js";import{e as r}from"./chunk-2TPVVSVW.js";var Q=new s,Y=new s,lt=new s,st=new s,pt=new s,ut=new s,ft=new s;function k(t){let e=(t=w(t,w.EMPTY_OBJECT)).positions,i=t.maximumHeights,n=t.minimumHeights;if(!r(e))throw new P("options.positions is required.");if(r(i)&&i.length!==e.length)throw new P("options.positions and options.maximumHeights must have the same length.");if(r(n)&&n.length!==e.length)throw new P("options.positions and options.minimumHeights must have the same length.");let o=w(t.vertexFormat,_.DEFAULT),a=w(t.granularity,J.RADIANS_PER_DEGREE),m=w(t.ellipsoid,l.WGS84);this._positions=e,this._minimumHeights=n,this._maximumHeights=i,this._vertexFormat=_.clone(o),this._granularity=a,this._ellipsoid=l.clone(m),this._workerName="createWallGeometry";let p=1+e.length*s.packedLength+2;r(n)&&(p+=n.length),r(i)&&(p+=i.length),this.packedLength=p+l.packedLength+_.packedLength+1}k.pack=function(t,e,i){if(!r(t))throw new P("value is required");if(!r(e))throw new P("array is required");i=w(i,0);let n,o=t._positions,a=o.length;for(e[i++]=a,n=0;n<a;++n,i+=s.packedLength)s.pack(o[n],e,i);let m=t._minimumHeights;if(a=r(m)?m.length:0,e[i++]=a,r(m))for(n=0;n<a;++n)e[i++]=m[n];let p=t._maximumHeights;if(a=r(p)?p.length:0,e[i++]=a,r(p))for(n=0;n<a;++n)e[i++]=p[n];return l.pack(t._ellipsoid,e,i),i+=l.packedLength,_.pack(t._vertexFormat,e,i),e[i+=_.packedLength]=t._granularity,e};var mt=l.clone(l.UNIT_SPHERE),rt=new _,M={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:mt,vertexFormat:rt,granularity:void 0};k.unpack=function(t,e,i){if(!r(t))throw new P("array is required");e=w(e,0);let n,o,a,m=t[e++],p=new Array(m);for(n=0;n<m;++n,e+=s.packedLength)p[n]=s.unpack(t,e);if(m=t[e++],m>0)for(o=new Array(m),n=0;n<m;++n)o[n]=t[e++];if(m=t[e++],m>0)for(a=new Array(m),n=0;n<m;++n)a[n]=t[e++];let u=l.unpack(t,e,mt);e+=l.packedLength;let h=_.unpack(t,e,rt),c=t[e+=_.packedLength];return r(i)?(i._positions=p,i._minimumHeights=o,i._maximumHeights=a,i._ellipsoid=l.clone(u,i._ellipsoid),i._vertexFormat=_.clone(h,i._vertexFormat),i._granularity=c,i):(M.positions=p,M.minimumHeights=o,M.maximumHeights=a,M.granularity=c,new k(M))},k.fromConstantHeights=function(t){let e=(t=w(t,w.EMPTY_OBJECT)).positions;if(!r(e))throw new P("options.positions is required.");let i,n,o=t.minimumHeight,s=t.maximumHeight,a=r(o),m=r(s);if(a||m){let t=e.length;i=a?new Array(t):void 0,n=m?new Array(t):void 0;for(let e=0;e<t;++e)a&&(i[e]=o),m&&(n[e]=s)}return new k({positions:e,maximumHeights:n,minimumHeights:i,ellipsoid:t.ellipsoid,vertexFormat:t.vertexFormat})},k.createGeometry=function(t){let e=t._positions,i=t._minimumHeights,n=t._maximumHeights,o=t._vertexFormat,a=t._granularity,m=t._ellipsoid,l=nt.computePositions(m,e,n,i,a,!0);if(!r(l))return;let p=l.bottomPositions,u=l.topPositions,h=l.numCorners,c=u.length,g=2*c,f=o.position?new Float64Array(g):void 0,w=o.normal?new Float32Array(g):void 0,k=o.tangent?new Float32Array(g):void 0,d=o.bitangent?new Float32Array(g):void 0,_=o.st?new Float32Array(g/3*2):void 0,y=0,A=0,v=0,P=0,x=0,H=ft,E=ut,F=pt,j=!0;c/=3;let L,b=0,T=1/(c-h-1);for(L=0;L<c;++L){let t=3*L,e=s.fromArray(u,t,Q),i=s.fromArray(p,t,Y);if(o.position&&(f[y++]=i.x,f[y++]=i.y,f[y++]=i.z,f[y++]=e.x,f[y++]=e.y,f[y++]=e.z),o.st&&(_[x++]=b,_[x++]=0,_[x++]=b,_[x++]=1),o.normal||o.tangent||o.bitangent){let i=s.clone(s.ZERO,st),n=s.subtract(e,m.geodeticSurfaceNormal(e,Y),Y);if(L+1<c&&(i=s.fromArray(u,t+3,st)),j){let t=s.subtract(i,e,lt),r=s.subtract(n,e,Q);H=s.normalize(s.cross(r,t,H),H),j=!1}s.equalsEpsilon(e,i,J.EPSILON10)?j=!0:(b+=T,o.tangent&&(E=s.normalize(s.subtract(i,e,E),E)),o.bitangent&&(F=s.normalize(s.cross(H,E,F),F))),o.normal&&(w[A++]=H.x,w[A++]=H.y,w[A++]=H.z,w[A++]=H.x,w[A++]=H.y,w[A++]=H.z),o.tangent&&(k[P++]=E.x,k[P++]=E.y,k[P++]=E.z,k[P++]=E.x,k[P++]=E.y,k[P++]=E.z),o.bitangent&&(d[v++]=F.x,d[v++]=F.y,d[v++]=F.z,d[v++]=F.x,d[v++]=F.y,d[v++]=F.z)}}let N=new it;o.position&&(N.position=new R({componentDatatype:S.DOUBLE,componentsPerAttribute:3,values:f})),o.normal&&(N.normal=new R({componentDatatype:S.FLOAT,componentsPerAttribute:3,values:w})),o.tangent&&(N.tangent=new R({componentDatatype:S.FLOAT,componentsPerAttribute:3,values:k})),o.bitangent&&(N.bitangent=new R({componentDatatype:S.FLOAT,componentsPerAttribute:3,values:d})),o.st&&(N.st=new R({componentDatatype:S.FLOAT,componentsPerAttribute:2,values:_}));let O=g/3;g-=6*(h+1);let D=ot.createTypedArray(O,g),X=0;for(L=0;L<O-2;L+=2){let t=L,e=L+2,i=s.fromArray(f,3*t,Q),n=s.fromArray(f,3*e,Y);if(s.equalsEpsilon(i,n,J.EPSILON10))continue;let r=L+1,o=L+3;D[X++]=r,D[X++]=t,D[X++]=o,D[X++]=o,D[X++]=t,D[X++]=e}return new et({attributes:N,indices:D,primitiveType:tt.TRIANGLES,boundingSphere:new I.fromVertices(f)})};var X=k;function ht(t,e){return r(e)&&(t=X.unpack(t,e)),t._ellipsoid=l.clone(t._ellipsoid),X.createGeometry(t)}var Ot=ht;export{Ot as default};
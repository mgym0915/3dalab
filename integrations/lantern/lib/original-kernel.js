
/* Earcut 3.2.4 — ISC License

Copyright (c) 2026, Mapbox

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
 */
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).earcut={})}(this,function(t){"use strict";const n=new Set;let e=!1;function r(t,n,e,r,x){let o=null;if(x===C(t,n,e,r)>0)for(let x=n;x<e;x+=r)o=L(x/r|0,t[x],t[x+1],o);else for(let x=e-r;x>=n;x-=r)o=L(x/r|0,t[x],t[x+1],o);return o&&P(o,o.next)&&(q(o),o=o.next),o}function x(t,r=t){const x=r===t;let o,i=t;do{o=!1,i===i.next||0!==n.size&&n.has(i)||!P(i,i.next)&&0!==O(i.prev,i,i.next)?(x||i!==r)&&(i=i.next,o=!x):((x||i===r)&&(r=i.prev),e=!0,q(i),i=i.prev,o=!0)}while(o||i!==r);return r}function o(t,n,r,o,c){c&&function(t,n,e,r){let x=t,o=0;do{x.z=j(x.x,x.y,n,e,r),Z[o++]=x,x=x.next}while(x!==t);!function(t){if(t<=32){for(let n=1;n<t;n++){const t=Z[n],e=t.z;let r=n-1;for(;r>=0&&Z[r].z>e;)Z[r+1]=Z[r],r--;Z[r+1]=t}return}A.length<t&&(A=new Uint32Array(t),z=new Uint32Array(t),b=new Array(t));for(let n=0;n<t;n++)A[n]=Z[n].z;I(t,Z,A,b,z,0),I(t,b,z,Z,A,8),I(t,Z,A,b,z,16),I(t,b,z,Z,A,24)}(o);let i=null;for(let t=0;t<o;t++){const n=Z[t];n.prevZ=i,i&&(i.nextZ=n),i=n}i.nextZ=null,Z.fill(null,0,o),b.fill(null,0,o)}(t,r,o,c);let y=t,s=!1;for(;t.prev!==t.next;){const a=t.prev,h=t.next;if(O(a,t,h)<0&&(c?l(t,r,o,c):i(t)))n.push(a.i,t.i,h.i),q(t),t=h,y=h;else if((t=h)===y){if(e=!1,t=x(t),e){y=t;continue}if(!s){y=t=f(t,n),s=!0;continue}u(t,n,r,o,c);break}}}function i(t){const n=t.prev,e=t,r=t.next,x=n.x,o=e.x,i=r.x,l=n.y,f=e.y,u=r.y,c=Math.min(x,o,i),y=Math.min(l,f,u),s=Math.max(x,o,i),a=Math.max(l,f,u);let h=r.next;for(;h!==n;){if(h.x>=c&&h.x<=s&&h.y>=y&&h.y<=a&&(x!==h.x||l!==h.y)&&F(x,l,o,f,i,u,h.x,h.y)&&O(h.prev,h,h.next)>=0)return!1;h=h.next}return!0}function l(t,n,e,r){const x=t.prev,o=t,i=t.next,l=x.x,f=o.x,u=i.x,c=x.y,y=o.y,s=i.y,a=Math.min(l,f,u),h=Math.min(c,y,s),p=Math.max(l,f,u),v=Math.max(c,y,s),M=j(a,h,n,e,r),d=j(p,v,n,e,r);let g=t.prevZ;for(;g&&g.z>=M;){if(g.x>=a&&g.x<=p&&g.y>=h&&g.y<=v&&g!==i&&(l!==g.x||c!==g.y)&&F(l,c,f,y,u,s,g.x,g.y)&&O(g.prev,g,g.next)>=0)return!1;g=g.prevZ}let m=t.nextZ;for(;m&&m.z<=d;){if(m.x>=a&&m.x<=p&&m.y>=h&&m.y<=v&&m!==i&&(l!==m.x||c!==m.y)&&F(l,c,f,y,u,s,m.x,m.y)&&O(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function f(t,n){let e=t,r=!1;do{const x=e.prev,o=e.next.next;S(x,e,e.next,o,!1)&&_(x,o)&&_(o,x)&&(n.push(x.i,e.i,o.i),q(e),q(e.next),e=t=o,r=!0),e=e.next}while(e!==t);return r?x(e):e}function u(t,n,e,r,i){let l=t;do{let t=l.next.next;for(;t!==l.prev;){if(l.i!==t.i&&N(l,t)){let f=E(l,t);return l=x(l,l.next),f=x(f,f.next),o(l,n,e,r,i),void o(f,n,e,r,i)}t=t.next}l=l.next}while(l!==t)}let c=!1;function y(t,n){return t.x-n.x||t.y-n.y||(t.next.y-t.y)/(t.next.x-t.x)-(n.next.y-n.y)/(n.next.x-n.x)}function s(t,n){const e=function(t,n){let e=n;const r=t.x,x=t.y;let o,i=-1/0;if(P(t,e))return e;for(let n=0,l=0;n<p;n++,l+=4){if(x<h[l+1]||x>h[l+3]||h[l]>r||h[l+2]<=i)continue;const f=g(n);e=m(n);do{if(e.prev.next===e){if(P(t,e.next))return e.next;if(x<=e.y&&x>=e.next.y&&e.next.y!==e.y){const t=e.x+(x-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(t<=r&&t>i&&(i=t,o=e.x<e.next.x?e:e.next,t===r))return o}}e=e.next}while(e!==f)}if(!o)return null;const l=o.x,f=o.y,u=Math.min(x,f),c=Math.max(x,f);let y=1/0;for(let n=0,s=0;n<p;n++,s+=4){if(h[s+2]<l||h[s]>r||h[s+3]<u||h[s+1]>c)continue;const a=g(n);e=m(n);do{if(e.prev.next===e&&r>=e.x&&e.x>=l&&r!==e.x&&F(x<f?r:i,x,l,f,x<f?i:r,x,e.x,e.y)){const n=Math.abs(x-e.y)/(r-e.x);(_(e,t)||e.y===x&&e.next.y===x&&e.next.x>r)&&(n<y||n===y&&(e.x>o.x||e.x===o.x&&w(o,e)))&&(o=e,y=n)}e=e.next}while(e!==a)}return o}(t,n);if(!e)return n;const r=E(e,t);return d(e,r.next.next),x(r,r.next),x(e,e.next)}const a=16;let h=new Float64Array(0),p=0;const v=[],M=[];function d(t,n){let e=t;do{const t=p++;v[t]=e;let r=e.x,x=e.y,o=e.x,i=e.y,l=0;do{const n=e.next;e.z=t,n.x<r&&(r=n.x),n.x>o&&(o=n.x),n.y<x&&(x=n.y),n.y>i&&(i=n.y),e=n}while(++l<a&&e!==n);M[t]=e;const f=4*t;h[f]=r,h[f+1]=x,h[f+2]=o,h[f+3]=i}while(e!==n)}function g(t){let n=M[t];for(;n.prev.next!==n;)n=n.next;return M[t]=n,n}function m(t){let n=v[t];for(;n.prev.next!==n;)n=n.next;return v[t]=n,n}function w(t,n){return O(t.prev,t,n.prev)<0&&O(n.next,t,t.next)<0}const Z=[];let b=[],A=new Uint32Array(0),z=new Uint32Array(0);const U=new Uint32Array(256);function I(t,n,e,r,x,o){U.fill(0);for(let n=0;n<t;n++)U[e[n]>>>o&255]++;let i=0;for(let t=0;t<256;t++){const n=U[t];U[t]=i,i+=n}for(let i=0;i<t;i++){const t=e[i],l=U[t>>>o&255]++;r[l]=n[i],x[l]=t}}function j(t,n,e,r,x){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-e)*x|0)|t<<8))|t<<4))|t<<2))|t<<1))|(n=1431655765&((n=858993459&((n=252645135&((n=16711935&((n=(n-r)*x|0)|n<<8))|n<<4))|n<<2))|n<<1))<<1}function k(t){let n=t,e=t;do{(n.x<e.x||n.x===e.x&&n.y<e.y)&&(e=n),n=n.next}while(n!==t);return e}function F(t,n,e,r,x,o,i,l){return(x-i)*(n-l)>=(t-i)*(o-l)&&(t-i)*(r-l)>=(e-i)*(n-l)&&(e-i)*(o-l)>=(x-i)*(r-l)}function N(t,n){const e=P(t,n)&&O(t.prev,t,t.next)>0&&O(n.prev,n,n.next)>0;return t.next.i!==n.i&&(e||_(t,n)&&_(n,t)&&(0!==O(t.prev,t,n.prev)||0!==O(t,n.prev,n)))&&!function(t,n){const e=Math.min(t.x,n.x),r=Math.max(t.x,n.x),x=Math.min(t.y,n.y),o=Math.max(t.y,n.y);let i=t;do{const l=i.next;if(i.x>r&&l.x>r||i.x<e&&l.x<e||i.y>o&&l.y>o||i.y<x&&l.y<x)i=l;else{if(i.i!==t.i&&l.i!==t.i&&i.i!==n.i&&l.i!==n.i&&S(i,l,t,n))return!0;i=l}}while(i!==t);return!1}(t,n)&&(e||function(t,n){let e=t,r=!1;const x=(t.x+n.x)/2,o=(t.y+n.y)/2;do{const t=e.next;e.y>o!=t.y>o&&x<(t.x-e.x)*(o-e.y)/(t.y-e.y)+e.x&&(r=!r),e=t}while(e!==t);return r}(t,n))}function O(t,n,e){return(n.y-t.y)*(e.x-n.x)-(n.x-t.x)*(e.y-n.y)}function P(t,n){return t.x===n.x&&t.y===n.y}function S(t,n,e,r,x=!0){const o=O(t,n,e),i=O(t,n,r),l=O(e,r,t),f=O(e,r,n);return(o>0&&i<0||o<0&&i>0)&&(l>0&&f<0||l<0&&f>0)||!!x&&(!(0!==o||!T(t,e,n))||(!(0!==i||!T(t,r,n))||(!(0!==l||!T(e,t,r))||!(0!==f||!T(e,n,r)))))}function T(t,n,e){return n.x<=Math.max(t.x,e.x)&&n.x>=Math.min(t.x,e.x)&&n.y<=Math.max(t.y,e.y)&&n.y>=Math.min(t.y,e.y)}function _(t,n){return O(t.prev,t,t.next)<0?O(t,n,t.next)>=0&&O(t,t.prev,n)>=0:O(t,n,t.prev)<0||O(t,t.next,n)<0}function E(t,n){const e=B(t.i,t.x,t.y),r=B(n.i,n.x,n.y),x=t.next,o=n.prev;return t.next=n,n.prev=t,e.next=x,x.prev=e,r.next=e,e.prev=r,o.next=r,r.prev=o,r}function L(t,n,e,r){const x=B(t,n,e);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function q(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ),c&&function(t,n){const e=4*t.z;n.x<h[e]&&(h[e]=n.x),n.y<h[e+1]&&(h[e+1]=n.y),n.x>h[e+2]&&(h[e+2]=n.x),n.y>h[e+3]&&(h[e+3]=n.y)}(t.prev,t.next)}function B(t,n,e){return{i:t,x:n,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null}}function C(t,n,e,r){let x=0;for(let o=n,i=e-r;o<e;o+=r)x+=(t[i]-t[o])*(t[o+1]+t[i+1]),i=o;return x}let D,G,H,J,K,Q=0,R=0;function V(t,n,e,r,x,o){return(e-t)*(o-n)-(r-n)*(x-t)}function W(t,n,e,r,x,o,i,l){const f=t-i,u=n-l,c=e-i,y=r-l,s=x-i,a=o-l,h=f*f+u*u,p=c*c+y*y,v=s*s+a*a,M=h+p+v;return f*(y*v-p*a)-u*(c*v-p*s)+h*(c*a-y*s)<=1e-13*M*M}function X(t){return t-t%3+(t+1)%3}t.default=function(t,e,i=2){const l=e&&e.length,f=l?e[0]*i:t.length;n.size&&n.clear();let u=r(t,0,f,i,!0);const v=[];if(!u||u.next===u.prev)return v;let M=0,g=0,m=0;if(l&&(u=function(t,e,o,i){const l=[];for(let x=0,o=e.length;x<o;x++){const f=r(t,e[x]*i,x<o-1?e[x+1]*i:t.length,i,!1);f===f.next&&n.add(f),l.push(k(f))}l.sort(y),function(t,n){const e=Math.ceil((t+2*n)/a)+n+2;h.length<4*e&&(h=new Float64Array(4*e));p=0}(t.length/i,e.length),d(o,o),c=!0;for(let t=0;t<l.length;t++)o=s(l[t],o);return c=!1,x(o)}(t,e,u,i)),t.length>80*i){M=t[0],g=t[1];let n=M,e=g;for(let r=i;r<f;r+=i){const x=t[r],o=t[r+1];x<M&&(M=x),o<g&&(g=o),x>n&&(n=x),o>e&&(e=o)}m=Math.max(n-M,e-g),m=0!==m?32767/m:0}return o(u,v,M,g,m),v},t.deviation=function(t,n,e,r){const x=n&&n.length,o=x?n[0]*e:t.length;let i=Math.abs(C(t,0,o,e));if(x)for(let r=0,x=n.length;r<x;r++){const o=n[r]*e,l=r<x-1?n[r+1]*e:t.length;i-=Math.abs(C(t,o,l,e))}let l=0;for(let n=0;n<r.length;n+=3){const x=r[n]*e,o=r[n+1]*e,i=r[n+2]*e;l+=Math.abs((t[x]-t[i])*(t[o+1]-t[x+1])-(t[x]-t[o])*(t[i+1]-t[x+1]))}if(0===l){let n=0;for(let r=0;r<t.length;r+=e)n=Math.max(n,Math.abs(t[r]),Math.abs(t[r+1]));return Math.abs(i)<=t.length*n*n*Number.EPSILON?0:1}return Math.abs((l-i)/i)},t.flatten=function(t){const n=[],e=[],r=t[0][0].length;let x=0,o=0;for(const i of t){for(const t of i)for(let e=0;e<r;e++)n.push(t[e]);o&&(x+=o,e.push(x)),o=i.length}return{vertices:n,holes:e,dimensions:r}},t.refine=function(t,n,e=2){const r=t,x=r.length;if(x<6)return;!function(t){(!D||D.length<t)&&(D=new Int32Array(t));(!G||G.length<t)&&(G=new Int32Array(t));(!K||K.length<t)&&(K=new Uint8Array(t));let n=1;for(;n<4*t;)n<<=1;(!H||H.length<n)&&(H=new Int32Array(n),J=new Uint32Array(n));Q=n-1}(x),R++,G.fill(-1,0,x);let o=0;for(let t=0;t<x;t++){const n=r[t],e=r[X(t)],x=n<e?n:e,i=n<e?e:n;let l=(Math.imul(x,2654435761)^Math.imul(i,2246822507))&Q;for(;J[l]===R;){const n=H[l];if(-1!==n){const e=r[n],f=r[X(n)];if(e===x&&f===i||e===i&&f===x){G[t]=n,G[n]=t,H[l]=-1,K[n]=1,D[o++]=n;break}}l=l+1&Q}J[l]!==R&&(H[l]=t,J[l]=R)}for(;o>0;){const t=D[--o];K[t]=0;const x=G[t];if(-1===x)continue;const i=t-t%3,l=x-x%3,f=i+(t+2)%3,u=i+(t+1)%3,c=l+(x+2)%3,y=l+(x+1)%3,s=r[f],a=r[t],h=r[u],p=r[c],v=n[s*e],M=n[s*e+1],d=n[a*e],g=n[a*e+1],m=n[h*e],w=n[h*e+1],Z=n[p*e],b=n[p*e+1];if(!W(v,M,d,g,m,w,Z,b)&&V(v,M,d,g,Z,b)>0&&V(v,M,Z,b,m,w)>0){r[t]=p,r[x]=s;const n=G[c],e=G[f];G[t]=n,-1!==n&&(G[n]=t),G[x]=e,-1!==e&&(G[e]=x),G[f]=c,G[c]=f,-1!==n&&0===K[t]&&(K[t]=1,D[o++]=t),-1!==e&&0===K[x]&&(K[x]=1,D[o++]=x),-1!==G[u]&&0===K[u]&&(K[u]=1,D[o++]=u),-1!==G[y]&&0===K[y]&&(K[y]=1,D[o++]=y)}}},Object.defineProperty(t,"__esModule",{value:!0})});


/*******************************************************************************
 *                                                                              *
 * Author    :  Angus Johnson                                                   *
 * Version   :  6.4.2                                                           *
 * Date      :  27 February 2017                                                *
 * Website   :  http://www.angusj.com                                           *
 * Copyright :  Angus Johnson 2010-2017                                         *
 *                                                                              *
 * License:                                                                     *
 * Use, modification & distribution is subject to Boost Software License Ver 1. *
 * http://www.boost.org/LICENSE_1_0.txt                                         *
 *                                                                              *
 * Attributions:                                                                *
 * The code in this library is an extension of Bala Vatti's clipping algorithm: *
 * "A generic solution to polygon clipping"                                     *
 * Communications of the ACM, Vol 35, Issue 7 (July 1992) pp 56-63.             *
 * http://portal.acm.org/citation.cfm?id=129906                                 *
 *                                                                              *
 * Computer graphics and geometric modeling: implementation and algorithms      *
 * By Max K. Agoston                                                            *
 * Springer; 1 edition (January 4, 2005)                                        *
 * http://books.google.com/books?q=vatti+clipping+agoston                       *
 *                                                                              *
 * See also:                                                                    *
 * "Polygon Offsetting by Computing Winding Numbers"                            *
 * Paper no. DETC2005-85513 pp. 565-575                                         *
 * ASME 2005 International Design Engineering Technical Conferences             *
 * and Computers and Information in Engineering Conference (IDETC/CIE2005)      *
 * September 24-28, 2005 , Long Beach, California, USA                          *
 * http://www.me.berkeley.edu/~mcmains/pubs/DAC05OffsetPolygon.pdf              *
 *                                                                              *
 *******************************************************************************/
/*******************************************************************************
 *                                                                              *
 * Author    :  Timo                                                            *
 * Version   :  6.4.2.2                                                         *
 * Date      :  8 September 2017                                                 *
 *                                                                              *
 * This is a translation of the C# Clipper library to Javascript.               *
 * Int128 struct of C# is implemented using JSBN of Tom Wu.                     *
 * Because Javascript lacks support for 64-bit integers, the space              *
 * is a little more restricted than in C# version.                              *
 *                                                                              *
 * C# version has support for coordinate space:                                 *
 * +-4611686018427387903 ( sqrt(2^127 -1)/2 )                                   *
 * while Javascript version has support for space:                              *
 * +-4503599627370495 ( sqrt(2^106 -1)/2 )                                      *
 *                                                                              *
 * Tom Wu's JSBN proved to be the fastest big integer library:                  *
 * http://jsperf.com/big-integer-library-test                                   *
 *                                                                              *
 * This class can be made simpler when (if ever) 64-bit integer support comes   *
 * or floating point Clipper is released.                                       *
 *                                                                              *
 *******************************************************************************/
/*******************************************************************************
 *                                                                              *
 * Basic JavaScript BN library - subset useful for RSA encryption.              *
 * http://www-cs-students.stanford.edu/~tjw/jsbn/                               *
 * Copyright (c) 2005  Tom Wu                                                   *
 * All Rights Reserved.                                                         *
 * See "LICENSE" for details:                                                   *
 * http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE                        *
 *                                                                              *
 *******************************************************************************/
(function ()
{
	"use strict";
	var ClipperLib = {};
	ClipperLib.version = '6.4.2.2';

	//UseLines: Enables open path clipping. Adds a very minor cost to performance.
	ClipperLib.use_lines = true;

	//ClipperLib.use_xyz: adds a Z member to IntPoint. Adds a minor cost to performance.
	ClipperLib.use_xyz = false;

	var isNode = false;
	if (typeof module !== 'undefined' && module.exports)
	{
		module.exports = ClipperLib;
		isNode = true;
	}
	else
	{
		if (typeof define === 'function' && define.amd) {
			define(ClipperLib);
		}
		if (typeof (document) !== "undefined") window.ClipperLib = ClipperLib;
		else self['ClipperLib'] = ClipperLib;
	}
	var navigator_appName;
	if (!isNode)
	{
		var nav = navigator.userAgent.toString().toLowerCase();
		navigator_appName = navigator.appName;
	}
	else
	{
		var nav = "chrome"; // Node.js uses Chrome's V8 engine
		navigator_appName = "Netscape"; // Firefox, Chrome and Safari returns "Netscape", so Node.js should also
	}
	// Browser test to speedup performance critical functions
	var browser = {};

	if (nav.indexOf("chrome") != -1 && nav.indexOf("chromium") == -1) browser.chrome = 1;
	else browser.chrome = 0;
	if (nav.indexOf("chromium") != -1) browser.chromium = 1;
	else browser.chromium = 0;
	if (nav.indexOf("safari") != -1 && nav.indexOf("chrome") == -1 && nav.indexOf("chromium") == -1) browser.safari = 1;
	else browser.safari = 0;
	if (nav.indexOf("firefox") != -1) browser.firefox = 1;
	else browser.firefox = 0;
	if (nav.indexOf("firefox/17") != -1) browser.firefox17 = 1;
	else browser.firefox17 = 0;
	if (nav.indexOf("firefox/15") != -1) browser.firefox15 = 1;
	else browser.firefox15 = 0;
	if (nav.indexOf("firefox/3") != -1) browser.firefox3 = 1;
	else browser.firefox3 = 0;
	if (nav.indexOf("opera") != -1) browser.opera = 1;
	else browser.opera = 0;
	if (nav.indexOf("msie 10") != -1) browser.msie10 = 1;
	else browser.msie10 = 0;
	if (nav.indexOf("msie 9") != -1) browser.msie9 = 1;
	else browser.msie9 = 0;
	if (nav.indexOf("msie 8") != -1) browser.msie8 = 1;
	else browser.msie8 = 0;
	if (nav.indexOf("msie 7") != -1) browser.msie7 = 1;
	else browser.msie7 = 0;
	if (nav.indexOf("msie ") != -1) browser.msie = 1;
	else browser.msie = 0;
	ClipperLib.biginteger_used = null;

	// Copyright (c) 2005  Tom Wu
	// All Rights Reserved.
	// See "LICENSE" for details.
	// Basic JavaScript BN library - subset useful for RSA encryption.
	// Bits per digit
	var dbits;
	// JavaScript engine analysis
	var canary = 0xdeadbeefcafe;
	var j_lm = ((canary & 0xffffff) == 0xefcafe);
	// (public) Constructor
	/**
	* @constructor
	*/
	function BigInteger(a, b, c)
	{
		// This test variable can be removed,
		// but at least for performance tests it is useful piece of knowledge
		// This is the only ClipperLib related variable in BigInteger library
		ClipperLib.biginteger_used = 1;
		if (a != null)
			if ("number" == typeof a && "undefined" == typeof (b)) this.fromInt(a); // faster conversion
			else if ("number" == typeof a) this.fromNumber(a, b, c);
		else if (b == null && "string" != typeof a) this.fromString(a, 256);
		else this.fromString(a, b);
	}
	// return new, unset BigInteger
	function nbi()
	{
		return new BigInteger(null, undefined, undefined);
	}
	// am: Compute w_j += (x*this_i), propagate carries,
	// c is initial carry, returns final carry.
	// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
	// We need to select the fastest one that works in this environment.
	// am1: use a single mult and divide to get the high bits,
	// max digit bits should be 26 because
	// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
	function am1(i, x, w, j, c, n)
	{
		while (--n >= 0)
		{
			var v = x * this[i++] + w[j] + c;
			c = Math.floor(v / 0x4000000);
			w[j++] = v & 0x3ffffff;
		}
		return c;
	}
	// am2 avoids a big mult-and-extract completely.
	// Max digit bits should be <= 30 because we do bitwise ops
	// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
	function am2(i, x, w, j, c, n)
	{
		var xl = x & 0x7fff,
			xh = x >> 15;
		while (--n >= 0)
		{
			var l = this[i] & 0x7fff;
			var h = this[i++] >> 15;
			var m = xh * l + h * xl;
			l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
			c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
			w[j++] = l & 0x3fffffff;
		}
		return c;
	}
	// Alternately, set max digit bits to 28 since some
	// browsers slow down when dealing with 32-bit numbers.
	function am3(i, x, w, j, c, n)
	{
		var xl = x & 0x3fff,
			xh = x >> 14;
		while (--n >= 0)
		{
			var l = this[i] & 0x3fff;
			var h = this[i++] >> 14;
			var m = xh * l + h * xl;
			l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
			c = (l >> 28) + (m >> 14) + xh * h;
			w[j++] = l & 0xfffffff;
		}
		return c;
	}
	if (j_lm && (navigator_appName == "Microsoft Internet Explorer"))
	{
		BigInteger.prototype.am = am2;
		dbits = 30;
	}
	else if (j_lm && (navigator_appName != "Netscape"))
	{
		BigInteger.prototype.am = am1;
		dbits = 26;
	}
	else
	{ // Mozilla/Netscape seems to prefer am3
		BigInteger.prototype.am = am3;
		dbits = 28;
	}
	BigInteger.prototype.DB = dbits;
	BigInteger.prototype.DM = ((1 << dbits) - 1);
	BigInteger.prototype.DV = (1 << dbits);
	var BI_FP = 52;
	BigInteger.prototype.FV = Math.pow(2, BI_FP);
	BigInteger.prototype.F1 = BI_FP - dbits;
	BigInteger.prototype.F2 = 2 * dbits - BI_FP;
	// Digit conversions
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	var BI_RC = new Array();
	var rr, vv;
	rr = "0".charCodeAt(0);
	for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
	rr = "a".charCodeAt(0);
	for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	rr = "A".charCodeAt(0);
	for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

	function int2char(n)
	{
		return BI_RM.charAt(n);
	}

	function intAt(s, i)
	{
		var c = BI_RC[s.charCodeAt(i)];
		return (c == null) ? -1 : c;
	}
	// (protected) copy this to r
	function bnpCopyTo(r)
	{
		for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
		r.t = this.t;
		r.s = this.s;
	}
	// (protected) set from integer value x, -DV <= x < DV
	function bnpFromInt(x)
	{
		this.t = 1;
		this.s = (x < 0) ? -1 : 0;
		if (x > 0) this[0] = x;
		else if (x < -1) this[0] = x + this.DV;
		else this.t = 0;
	}
	// return bigint initialized to value
	function nbv(i)
	{
		var r = nbi();
		r.fromInt(i);
		return r;
	}
	// (protected) set from string and radix
	function bnpFromString(s, b)
	{
		var k;
		if (b == 16) k = 4;
		else if (b == 8) k = 3;
		else if (b == 256) k = 8; // byte array
		else if (b == 2) k = 1;
		else if (b == 32) k = 5;
		else if (b == 4) k = 2;
		else
		{
			this.fromRadix(s, b);
			return;
		}
		this.t = 0;
		this.s = 0;
		var i = s.length,
			mi = false,
			sh = 0;
		while (--i >= 0)
		{
			var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
			if (x < 0)
			{
				if (s.charAt(i) == "-") mi = true;
				continue;
			}
			mi = false;
			if (sh == 0)
				this[this.t++] = x;
			else if (sh + k > this.DB)
			{
				this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
				this[this.t++] = (x >> (this.DB - sh));
			}
			else
				this[this.t - 1] |= x << sh;
			sh += k;
			if (sh >= this.DB) sh -= this.DB;
		}
		if (k == 8 && (s[0] & 0x80) != 0)
		{
			this.s = -1;
			if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
		}
		this.clamp();
		if (mi) BigInteger.ZERO.subTo(this, this);
	}
	// (protected) clamp off excess high words
	function bnpClamp()
	{
		var c = this.s & this.DM;
		while (this.t > 0 && this[this.t - 1] == c) --this.t;
	}
	// (public) return string representation in given radix
	function bnToString(b)
	{
		if (this.s < 0) return "-" + this.negate().toString(b);
		var k;
		if (b == 16) k = 4;
		else if (b == 8) k = 3;
		else if (b == 2) k = 1;
		else if (b == 32) k = 5;
		else if (b == 4) k = 2;
		else return this.toRadix(b);
		var km = (1 << k) - 1,
			d, m = false,
			r = "",
			i = this.t;
		var p = this.DB - (i * this.DB) % k;
		if (i-- > 0)
		{
			if (p < this.DB && (d = this[i] >> p) > 0)
			{
				m = true;
				r = int2char(d);
			}
			while (i >= 0)
			{
				if (p < k)
				{
					d = (this[i] & ((1 << p) - 1)) << (k - p);
					d |= this[--i] >> (p += this.DB - k);
				}
				else
				{
					d = (this[i] >> (p -= k)) & km;
					if (p <= 0)
					{
						p += this.DB;
						--i;
					}
				}
				if (d > 0) m = true;
				if (m) r += int2char(d);
			}
		}
		return m ? r : "0";
	}
	// (public) -this
	function bnNegate()
	{
		var r = nbi();
		BigInteger.ZERO.subTo(this, r);
		return r;
	}
	// (public) |this|
	function bnAbs()
	{
		return (this.s < 0) ? this.negate() : this;
	}
	// (public) return + if this > a, - if this < a, 0 if equal
	function bnCompareTo(a)
	{
		var r = this.s - a.s;
		if (r != 0) return r;
		var i = this.t;
		r = i - a.t;
		if (r != 0) return (this.s < 0) ? -r : r;
		while (--i >= 0)
			if ((r = this[i] - a[i]) != 0) return r;
		return 0;
	}
	// returns bit length of the integer x
	function nbits(x)
	{
		var r = 1,
			t;
		if ((t = x >>> 16) != 0)
		{
			x = t;
			r += 16;
		}
		if ((t = x >> 8) != 0)
		{
			x = t;
			r += 8;
		}
		if ((t = x >> 4) != 0)
		{
			x = t;
			r += 4;
		}
		if ((t = x >> 2) != 0)
		{
			x = t;
			r += 2;
		}
		if ((t = x >> 1) != 0)
		{
			x = t;
			r += 1;
		}
		return r;
	}
	// (public) return the number of bits in "this"
	function bnBitLength()
	{
		if (this.t <= 0) return 0;
		return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
	}
	// (protected) r = this << n*DB
	function bnpDLShiftTo(n, r)
	{
		var i;
		for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
		for (i = n - 1; i >= 0; --i) r[i] = 0;
		r.t = this.t + n;
		r.s = this.s;
	}
	// (protected) r = this >> n*DB
	function bnpDRShiftTo(n, r)
	{
		for (var i = n; i < this.t; ++i) r[i - n] = this[i];
		r.t = Math.max(this.t - n, 0);
		r.s = this.s;
	}
	// (protected) r = this << n
	function bnpLShiftTo(n, r)
	{
		var bs = n % this.DB;
		var cbs = this.DB - bs;
		var bm = (1 << cbs) - 1;
		var ds = Math.floor(n / this.DB),
			c = (this.s << bs) & this.DM,
			i;
		for (i = this.t - 1; i >= 0; --i)
		{
			r[i + ds + 1] = (this[i] >> cbs) | c;
			c = (this[i] & bm) << bs;
		}
		for (i = ds - 1; i >= 0; --i) r[i] = 0;
		r[ds] = c;
		r.t = this.t + ds + 1;
		r.s = this.s;
		r.clamp();
	}
	// (protected) r = this >> n
	function bnpRShiftTo(n, r)
	{
		r.s = this.s;
		var ds = Math.floor(n / this.DB);
		if (ds >= this.t)
		{
			r.t = 0;
			return;
		}
		var bs = n % this.DB;
		var cbs = this.DB - bs;
		var bm = (1 << bs) - 1;
		r[0] = this[ds] >> bs;
		for (var i = ds + 1; i < this.t; ++i)
		{
			r[i - ds - 1] |= (this[i] & bm) << cbs;
			r[i - ds] = this[i] >> bs;
		}
		if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
		r.t = this.t - ds;
		r.clamp();
	}
	// (protected) r = this - a
	function bnpSubTo(a, r)
	{
		var i = 0,
			c = 0,
			m = Math.min(a.t, this.t);
		while (i < m)
		{
			c += this[i] - a[i];
			r[i++] = c & this.DM;
			c >>= this.DB;
		}
		if (a.t < this.t)
		{
			c -= a.s;
			while (i < this.t)
			{
				c += this[i];
				r[i++] = c & this.DM;
				c >>= this.DB;
			}
			c += this.s;
		}
		else
		{
			c += this.s;
			while (i < a.t)
			{
				c -= a[i];
				r[i++] = c & this.DM;
				c >>= this.DB;
			}
			c -= a.s;
		}
		r.s = (c < 0) ? -1 : 0;
		if (c < -1) r[i++] = this.DV + c;
		else if (c > 0) r[i++] = c;
		r.t = i;
		r.clamp();
	}
	// (protected) r = this * a, r != this,a (HAC 14.12)
	// "this" should be the larger one if appropriate.
	function bnpMultiplyTo(a, r)
	{
		var x = this.abs(),
			y = a.abs();
		var i = x.t;
		r.t = i + y.t;
		while (--i >= 0) r[i] = 0;
		for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
		r.s = 0;
		r.clamp();
		if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
	}
	// (protected) r = this^2, r != this (HAC 14.16)
	function bnpSquareTo(r)
	{
		var x = this.abs();
		var i = r.t = 2 * x.t;
		while (--i >= 0) r[i] = 0;
		for (i = 0; i < x.t - 1; ++i)
		{
			var c = x.am(i, x[i], r, 2 * i, 0, 1);
			if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV)
			{
				r[i + x.t] -= x.DV;
				r[i + x.t + 1] = 1;
			}
		}
		if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
		r.s = 0;
		r.clamp();
	}
	// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
	// r != q, this != m.  q or r may be null.
	function bnpDivRemTo(m, q, r)
	{
		var pm = m.abs();
		if (pm.t <= 0) return;
		var pt = this.abs();
		if (pt.t < pm.t)
		{
			if (q != null) q.fromInt(0);
			if (r != null) this.copyTo(r);
			return;
		}
		if (r == null) r = nbi();
		var y = nbi(),
			ts = this.s,
			ms = m.s;
		var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
		if (nsh > 0)
		{
			pm.lShiftTo(nsh, y);
			pt.lShiftTo(nsh, r);
		}
		else
		{
			pm.copyTo(y);
			pt.copyTo(r);
		}
		var ys = y.t;
		var y0 = y[ys - 1];
		if (y0 == 0) return;
		var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
		var d1 = this.FV / yt,
			d2 = (1 << this.F1) / yt,
			e = 1 << this.F2;
		var i = r.t,
			j = i - ys,
			t = (q == null) ? nbi() : q;
		y.dlShiftTo(j, t);
		if (r.compareTo(t) >= 0)
		{
			r[r.t++] = 1;
			r.subTo(t, r);
		}
		BigInteger.ONE.dlShiftTo(ys, t);
		t.subTo(y, y); // "negative" y so we can replace sub with am later
		while (y.t < ys) y[y.t++] = 0;
		while (--j >= 0)
		{
			// Estimate quotient digit
			var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
			if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd)
			{ // Try it out
				y.dlShiftTo(j, t);
				r.subTo(t, r);
				while (r[i] < --qd) r.subTo(t, r);
			}
		}
		if (q != null)
		{
			r.drShiftTo(ys, q);
			if (ts != ms) BigInteger.ZERO.subTo(q, q);
		}
		r.t = ys;
		r.clamp();
		if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
		if (ts < 0) BigInteger.ZERO.subTo(r, r);
	}
	// (public) this mod a
	function bnMod(a)
	{
		var r = nbi();
		this.abs().divRemTo(a, null, r);
		if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
		return r;
	}
	// Modular reduction using "classic" algorithm
	/**
	* @constructor
	*/
	function Classic(m)
	{
		this.m = m;
	}

	function cConvert(x)
	{
		if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
		else return x;
	}

	function cRevert(x)
	{
		return x;
	}

	function cReduce(x)
	{
		x.divRemTo(this.m, null, x);
	}

	function cMulTo(x, y, r)
	{
		x.multiplyTo(y, r);
		this.reduce(r);
	}

	function cSqrTo(x, r)
	{
		x.squareTo(r);
		this.reduce(r);
	}
	Classic.prototype.convert = cConvert;
	Classic.prototype.revert = cRevert;
	Classic.prototype.reduce = cReduce;
	Classic.prototype.mulTo = cMulTo;
	Classic.prototype.sqrTo = cSqrTo;
	// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
	// justification:
	//         xy == 1 (mod m)
	//         xy =  1+km
	//   xy(2-xy) = (1+km)(1-km)
	// x[y(2-xy)] = 1-k^2m^2
	// x[y(2-xy)] == 1 (mod m^2)
	// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
	// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
	// JS multiply "overflows" differently from C/C++, so care is needed here.
	function bnpInvDigit()
	{
		if (this.t < 1) return 0;
		var x = this[0];
		if ((x & 1) == 0) return 0;
		var y = x & 3; // y == 1/x mod 2^2
		y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
		y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
		y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
		// last step - calculate inverse mod DV directly;
		// assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
		y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
		// we really want the negative inverse, and -DV < y < DV
		return (y > 0) ? this.DV - y : -y;
	}
	// Montgomery reduction
	/**
	* @constructor
	*/
	function Montgomery(m)
	{
		this.m = m;
		this.mp = m.invDigit();
		this.mpl = this.mp & 0x7fff;
		this.mph = this.mp >> 15;
		this.um = (1 << (m.DB - 15)) - 1;
		this.mt2 = 2 * m.t;
	}
	// xR mod m
	function montConvert(x)
	{
		var r = nbi();
		x.abs().dlShiftTo(this.m.t, r);
		r.divRemTo(this.m, null, r);
		if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
		return r;
	}
	// x/R mod m
	function montRevert(x)
	{
		var r = nbi();
		x.copyTo(r);
		this.reduce(r);
		return r;
	}
	// x = x/R mod m (HAC 14.32)
	function montReduce(x)
	{
		while (x.t <= this.mt2) // pad x so am has enough room later
			x[x.t++] = 0;
		for (var i = 0; i < this.m.t; ++i)
		{
			// faster way of calculating u0 = x[i]*mp mod DV
			var j = x[i] & 0x7fff;
			var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
			// use am to combine the multiply-shift-add into one call
			j = i + this.m.t;
			x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
			// propagate carry
			while (x[j] >= x.DV)
			{
				x[j] -= x.DV;
				x[++j]++;
			}
		}
		x.clamp();
		x.drShiftTo(this.m.t, x);
		if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
	}
	// r = "x^2/R mod m"; x != r
	function montSqrTo(x, r)
	{
		x.squareTo(r);
		this.reduce(r);
	}
	// r = "xy/R mod m"; x,y != r
	function montMulTo(x, y, r)
	{
		x.multiplyTo(y, r);
		this.reduce(r);
	}
	Montgomery.prototype.convert = montConvert;
	Montgomery.prototype.revert = montRevert;
	Montgomery.prototype.reduce = montReduce;
	Montgomery.prototype.mulTo = montMulTo;
	Montgomery.prototype.sqrTo = montSqrTo;
	// (protected) true iff this is even
	function bnpIsEven()
	{
		return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
	}
	// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
	function bnpExp(e, z)
	{
		if (e > 0xffffffff || e < 1) return BigInteger.ONE;
		var r = nbi(),
			r2 = nbi(),
			g = z.convert(this),
			i = nbits(e) - 1;
		g.copyTo(r);
		while (--i >= 0)
		{
			z.sqrTo(r, r2);
			if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
			else
			{
				var t = r;
				r = r2;
				r2 = t;
			}
		}
		return z.revert(r);
	}
	// (public) this^e % m, 0 <= e < 2^32
	function bnModPowInt(e, m)
	{
		var z;
		if (e < 256 || m.isEven()) z = new Classic(m);
		else z = new Montgomery(m);
		return this.exp(e, z);
	}
	// protected
	BigInteger.prototype.copyTo = bnpCopyTo;
	BigInteger.prototype.fromInt = bnpFromInt;
	BigInteger.prototype.fromString = bnpFromString;
	BigInteger.prototype.clamp = bnpClamp;
	BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
	BigInteger.prototype.drShiftTo = bnpDRShiftTo;
	BigInteger.prototype.lShiftTo = bnpLShiftTo;
	BigInteger.prototype.rShiftTo = bnpRShiftTo;
	BigInteger.prototype.subTo = bnpSubTo;
	BigInteger.prototype.multiplyTo = bnpMultiplyTo;
	BigInteger.prototype.squareTo = bnpSquareTo;
	BigInteger.prototype.divRemTo = bnpDivRemTo;
	BigInteger.prototype.invDigit = bnpInvDigit;
	BigInteger.prototype.isEven = bnpIsEven;
	BigInteger.prototype.exp = bnpExp;
	// public
	BigInteger.prototype.toString = bnToString;
	BigInteger.prototype.negate = bnNegate;
	BigInteger.prototype.abs = bnAbs;
	BigInteger.prototype.compareTo = bnCompareTo;
	BigInteger.prototype.bitLength = bnBitLength;
	BigInteger.prototype.mod = bnMod;
	BigInteger.prototype.modPowInt = bnModPowInt;
	// "constants"
	BigInteger.ZERO = nbv(0);
	BigInteger.ONE = nbv(1);
	// Copyright (c) 2005-2009  Tom Wu
	// All Rights Reserved.
	// See "LICENSE" for details.
	// Extended JavaScript BN functions, required for RSA private ops.
	// Version 1.1: new BigInteger("0", 10) returns "proper" zero
	// Version 1.2: square() API, isProbablePrime fix
	// (public)
	function bnClone()
	{
		var r = nbi();
		this.copyTo(r);
		return r;
	}
	// (public) return value as integer
	function bnIntValue()
	{
		if (this.s < 0)
		{
			if (this.t == 1) return this[0] - this.DV;
			else if (this.t == 0) return -1;
		}
		else if (this.t == 1) return this[0];
		else if (this.t == 0) return 0;
		// assumes 16 < DB < 32
		return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
	}
	// (public) return value as byte
	function bnByteValue()
	{
		return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
	}
	// (public) return value as short (assumes DB>=16)
	function bnShortValue()
	{
		return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
	}
	// (protected) return x s.t. r^x < DV
	function bnpChunkSize(r)
	{
		return Math.floor(Math.LN2 * this.DB / Math.log(r));
	}
	// (public) 0 if this == 0, 1 if this > 0
	function bnSigNum()
	{
		if (this.s < 0) return -1;
		else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
		else return 1;
	}
	// (protected) convert to radix string
	function bnpToRadix(b)
	{
		if (b == null) b = 10;
		if (this.signum() == 0 || b < 2 || b > 36) return "0";
		var cs = this.chunkSize(b);
		var a = Math.pow(b, cs);
		var d = nbv(a),
			y = nbi(),
			z = nbi(),
			r = "";
		this.divRemTo(d, y, z);
		while (y.signum() > 0)
		{
			r = (a + z.intValue()).toString(b).substr(1) + r;
			y.divRemTo(d, y, z);
		}
		return z.intValue().toString(b) + r;
	}
	// (protected) convert from radix string
	function bnpFromRadix(s, b)
	{
		this.fromInt(0);
		if (b == null) b = 10;
		var cs = this.chunkSize(b);
		var d = Math.pow(b, cs),
			mi = false,
			j = 0,
			w = 0;
		for (var i = 0; i < s.length; ++i)
		{
			var x = intAt(s, i);
			if (x < 0)
			{
				if (s.charAt(i) == "-" && this.signum() == 0) mi = true;
				continue;
			}
			w = b * w + x;
			if (++j >= cs)
			{
				this.dMultiply(d);
				this.dAddOffset(w, 0);
				j = 0;
				w = 0;
			}
		}
		if (j > 0)
		{
			this.dMultiply(Math.pow(b, j));
			this.dAddOffset(w, 0);
		}
		if (mi) BigInteger.ZERO.subTo(this, this);
	}
	// (protected) alternate constructor
	function bnpFromNumber(a, b, c)
	{
		if ("number" == typeof b)
		{
			// new BigInteger(int,int,RNG)
			if (a < 2) this.fromInt(1);
			else
			{
				this.fromNumber(a, c);
				if (!this.testBit(a - 1)) // force MSB set
					this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
				if (this.isEven()) this.dAddOffset(1, 0); // force odd
				while (!this.isProbablePrime(b))
				{
					this.dAddOffset(2, 0);
					if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
				}
			}
		}
		else
		{
			// new BigInteger(int,RNG)
			var x = new Array(),
				t = a & 7;
			x.length = (a >> 3) + 1;
			b.nextBytes(x);
			if (t > 0) x[0] &= ((1 << t) - 1);
			else x[0] = 0;
			this.fromString(x, 256);
		}
	}
	// (public) convert to bigendian byte array
	function bnToByteArray()
	{
		var i = this.t,
			r = new Array();
		r[0] = this.s;
		var p = this.DB - (i * this.DB) % 8,
			d, k = 0;
		if (i-- > 0)
		{
			if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
				r[k++] = d | (this.s << (this.DB - p));
			while (i >= 0)
			{
				if (p < 8)
				{
					d = (this[i] & ((1 << p) - 1)) << (8 - p);
					d |= this[--i] >> (p += this.DB - 8);
				}
				else
				{
					d = (this[i] >> (p -= 8)) & 0xff;
					if (p <= 0)
					{
						p += this.DB;
						--i;
					}
				}
				if ((d & 0x80) != 0) d |= -256;
				if (k == 0 && (this.s & 0x80) != (d & 0x80)) ++k;
				if (k > 0 || d != this.s) r[k++] = d;
			}
		}
		return r;
	}

	function bnEquals(a)
	{
		return (this.compareTo(a) == 0);
	}

	function bnMin(a)
	{
		return (this.compareTo(a) < 0) ? this : a;
	}

	function bnMax(a)
	{
		return (this.compareTo(a) > 0) ? this : a;
	}
	// (protected) r = this op a (bitwise)
	function bnpBitwiseTo(a, op, r)
	{
		var i, f, m = Math.min(a.t, this.t);
		for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
		if (a.t < this.t)
		{
			f = a.s & this.DM;
			for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
			r.t = this.t;
		}
		else
		{
			f = this.s & this.DM;
			for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
			r.t = a.t;
		}
		r.s = op(this.s, a.s);
		r.clamp();
	}
	// (public) this & a
	function op_and(x, y)
	{
		return x & y;
	}

	function bnAnd(a)
	{
		var r = nbi();
		this.bitwiseTo(a, op_and, r);
		return r;
	}
	// (public) this | a
	function op_or(x, y)
	{
		return x | y;
	}

	function bnOr(a)
	{
		var r = nbi();
		this.bitwiseTo(a, op_or, r);
		return r;
	}
	// (public) this ^ a
	function op_xor(x, y)
	{
		return x ^ y;
	}

	function bnXor(a)
	{
		var r = nbi();
		this.bitwiseTo(a, op_xor, r);
		return r;
	}
	// (public) this & ~a
	function op_andnot(x, y)
	{
		return x & ~y;
	}

	function bnAndNot(a)
	{
		var r = nbi();
		this.bitwiseTo(a, op_andnot, r);
		return r;
	}
	// (public) ~this
	function bnNot()
	{
		var r = nbi();
		for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
		r.t = this.t;
		r.s = ~this.s;
		return r;
	}
	// (public) this << n
	function bnShiftLeft(n)
	{
		var r = nbi();
		if (n < 0) this.rShiftTo(-n, r);
		else this.lShiftTo(n, r);
		return r;
	}
	// (public) this >> n
	function bnShiftRight(n)
	{
		var r = nbi();
		if (n < 0) this.lShiftTo(-n, r);
		else this.rShiftTo(n, r);
		return r;
	}
	// return index of lowest 1-bit in x, x < 2^31
	function lbit(x)
	{
		if (x == 0) return -1;
		var r = 0;
		if ((x & 0xffff) == 0)
		{
			x >>= 16;
			r += 16;
		}
		if ((x & 0xff) == 0)
		{
			x >>= 8;
			r += 8;
		}
		if ((x & 0xf) == 0)
		{
			x >>= 4;
			r += 4;
		}
		if ((x & 3) == 0)
		{
			x >>= 2;
			r += 2;
		}
		if ((x & 1) == 0) ++r;
		return r;
	}
	// (public) returns index of lowest 1-bit (or -1 if none)
	function bnGetLowestSetBit()
	{
		for (var i = 0; i < this.t; ++i)
			if (this[i] != 0) return i * this.DB + lbit(this[i]);
		if (this.s < 0) return this.t * this.DB;
		return -1;
	}
	// return number of 1 bits in x
	function cbit(x)
	{
		var r = 0;
		while (x != 0)
		{
			x &= x - 1;
			++r;
		}
		return r;
	}
	// (public) return number of set bits
	function bnBitCount()
	{
		var r = 0,
			x = this.s & this.DM;
		for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
		return r;
	}
	// (public) true iff nth bit is set
	function bnTestBit(n)
	{
		var j = Math.floor(n / this.DB);
		if (j >= this.t) return (this.s != 0);
		return ((this[j] & (1 << (n % this.DB))) != 0);
	}
	// (protected) this op (1<<n)
	function bnpChangeBit(n, op)
	{
		var r = BigInteger.ONE.shiftLeft(n);
		this.bitwiseTo(r, op, r);
		return r;
	}
	// (public) this | (1<<n)
	function bnSetBit(n)
	{
		return this.changeBit(n, op_or);
	}
	// (public) this & ~(1<<n)
	function bnClearBit(n)
	{
		return this.changeBit(n, op_andnot);
	}
	// (public) this ^ (1<<n)
	function bnFlipBit(n)
	{
		return this.changeBit(n, op_xor);
	}
	// (protected) r = this + a
	function bnpAddTo(a, r)
	{
		var i = 0,
			c = 0,
			m = Math.min(a.t, this.t);
		while (i < m)
		{
			c += this[i] + a[i];
			r[i++] = c & this.DM;
			c >>= this.DB;
		}
		if (a.t < this.t)
		{
			c += a.s;
			while (i < this.t)
			{
				c += this[i];
				r[i++] = c & this.DM;
				c >>= this.DB;
			}
			c += this.s;
		}
		else
		{
			c += this.s;
			while (i < a.t)
			{
				c += a[i];
				r[i++] = c & this.DM;
				c >>= this.DB;
			}
			c += a.s;
		}
		r.s = (c < 0) ? -1 : 0;
		if (c > 0) r[i++] = c;
		else if (c < -1) r[i++] = this.DV + c;
		r.t = i;
		r.clamp();
	}
	// (public) this + a
	function bnAdd(a)
	{
		var r = nbi();
		this.addTo(a, r);
		return r;
	}
	// (public) this - a
	function bnSubtract(a)
	{
		var r = nbi();
		this.subTo(a, r);
		return r;
	}
	// (public) this * a
	function bnMultiply(a)
	{
		var r = nbi();
		this.multiplyTo(a, r);
		return r;
	}
	// (public) this^2
	function bnSquare()
	{
		var r = nbi();
		this.squareTo(r);
		return r;
	}
	// (public) this / a
	function bnDivide(a)
	{
		var r = nbi();
		this.divRemTo(a, r, null);
		return r;
	}
	// (public) this % a
	function bnRemainder(a)
	{
		var r = nbi();
		this.divRemTo(a, null, r);
		return r;
	}
	// (public) [this/a,this%a]
	function bnDivideAndRemainder(a)
	{
		var q = nbi(),
			r = nbi();
		this.divRemTo(a, q, r);
		return new Array(q, r);
	}
	// (protected) this *= n, this >= 0, 1 < n < DV
	function bnpDMultiply(n)
	{
		this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
		++this.t;
		this.clamp();
	}
	// (protected) this += n << w words, this >= 0
	function bnpDAddOffset(n, w)
	{
		if (n == 0) return;
		while (this.t <= w) this[this.t++] = 0;
		this[w] += n;
		while (this[w] >= this.DV)
		{
			this[w] -= this.DV;
			if (++w >= this.t) this[this.t++] = 0;
			++this[w];
		}
	}
	// A "null" reducer
	/**
	* @constructor
	*/
	function NullExp()
	{}

	function nNop(x)
	{
		return x;
	}

	function nMulTo(x, y, r)
	{
		x.multiplyTo(y, r);
	}

	function nSqrTo(x, r)
	{
		x.squareTo(r);
	}
	NullExp.prototype.convert = nNop;
	NullExp.prototype.revert = nNop;
	NullExp.prototype.mulTo = nMulTo;
	NullExp.prototype.sqrTo = nSqrTo;
	// (public) this^e
	function bnPow(e)
	{
		return this.exp(e, new NullExp());
	}
	// (protected) r = lower n words of "this * a", a.t <= n
	// "this" should be the larger one if appropriate.
	function bnpMultiplyLowerTo(a, n, r)
	{
		var i = Math.min(this.t + a.t, n);
		r.s = 0; // assumes a,this >= 0
		r.t = i;
		while (i > 0) r[--i] = 0;
		var j;
		for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
		for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
		r.clamp();
	}
	// (protected) r = "this * a" without lower n words, n > 0
	// "this" should be the larger one if appropriate.
	function bnpMultiplyUpperTo(a, n, r)
	{
		--n;
		var i = r.t = this.t + a.t - n;
		r.s = 0; // assumes a,this >= 0
		while (--i >= 0) r[i] = 0;
		for (i = Math.max(n - this.t, 0); i < a.t; ++i)
			r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
		r.clamp();
		r.drShiftTo(1, r);
	}
	// Barrett modular reduction
	/**
	* @constructor
	*/
	function Barrett(m)
	{
		// setup Barrett
		this.r2 = nbi();
		this.q3 = nbi();
		BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
		this.mu = this.r2.divide(m);
		this.m = m;
	}

	function barrettConvert(x)
	{
		if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
		else if (x.compareTo(this.m) < 0) return x;
		else
		{
			var r = nbi();
			x.copyTo(r);
			this.reduce(r);
			return r;
		}
	}

	function barrettRevert(x)
	{
		return x;
	}
	// x = x mod m (HAC 14.42)
	function barrettReduce(x)
	{
		x.drShiftTo(this.m.t - 1, this.r2);
		if (x.t > this.m.t + 1)
		{
			x.t = this.m.t + 1;
			x.clamp();
		}
		this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
		this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
		while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
		x.subTo(this.r2, x);
		while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
	}
	// r = x^2 mod m; x != r
	function barrettSqrTo(x, r)
	{
		x.squareTo(r);
		this.reduce(r);
	}
	// r = x*y mod m; x,y != r
	function barrettMulTo(x, y, r)
	{
		x.multiplyTo(y, r);
		this.reduce(r);
	}
	Barrett.prototype.convert = barrettConvert;
	Barrett.prototype.revert = barrettRevert;
	Barrett.prototype.reduce = barrettReduce;
	Barrett.prototype.mulTo = barrettMulTo;
	Barrett.prototype.sqrTo = barrettSqrTo;
	// (public) this^e % m (HAC 14.85)
	function bnModPow(e, m)
	{
		var i = e.bitLength(),
			k, r = nbv(1),
			z;
		if (i <= 0) return r;
		else if (i < 18) k = 1;
		else if (i < 48) k = 3;
		else if (i < 144) k = 4;
		else if (i < 768) k = 5;
		else k = 6;
		if (i < 8)
			z = new Classic(m);
		else if (m.isEven())
			z = new Barrett(m);
		else
			z = new Montgomery(m);
		// precomputation
		var g = new Array(),
			n = 3,
			k1 = k - 1,
			km = (1 << k) - 1;
		g[1] = z.convert(this);
		if (k > 1)
		{
			var g2 = nbi();
			z.sqrTo(g[1], g2);
			while (n <= km)
			{
				g[n] = nbi();
				z.mulTo(g2, g[n - 2], g[n]);
				n += 2;
			}
		}
		var j = e.t - 1,
			w, is1 = true,
			r2 = nbi(),
			t;
		i = nbits(e[j]) - 1;
		while (j >= 0)
		{
			if (i >= k1) w = (e[j] >> (i - k1)) & km;
			else
			{
				w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
				if (j > 0) w |= e[j - 1] >> (this.DB + i - k1);
			}
			n = k;
			while ((w & 1) == 0)
			{
				w >>= 1;
				--n;
			}
			if ((i -= n) < 0)
			{
				i += this.DB;
				--j;
			}
			if (is1)
			{ // ret == 1, don't bother squaring or multiplying it
				g[w].copyTo(r);
				is1 = false;
			}
			else
			{
				while (n > 1)
				{
					z.sqrTo(r, r2);
					z.sqrTo(r2, r);
					n -= 2;
				}
				if (n > 0) z.sqrTo(r, r2);
				else
				{
					t = r;
					r = r2;
					r2 = t;
				}
				z.mulTo(r2, g[w], r);
			}
			while (j >= 0 && (e[j] & (1 << i)) == 0)
			{
				z.sqrTo(r, r2);
				t = r;
				r = r2;
				r2 = t;
				if (--i < 0)
				{
					i = this.DB - 1;
					--j;
				}
			}
		}
		return z.revert(r);
	}
	// (public) gcd(this,a) (HAC 14.54)
	function bnGCD(a)
	{
		var x = (this.s < 0) ? this.negate() : this.clone();
		var y = (a.s < 0) ? a.negate() : a.clone();
		if (x.compareTo(y) < 0)
		{
			var t = x;
			x = y;
			y = t;
		}
		var i = x.getLowestSetBit(),
			g = y.getLowestSetBit();
		if (g < 0) return x;
		if (i < g) g = i;
		if (g > 0)
		{
			x.rShiftTo(g, x);
			y.rShiftTo(g, y);
		}
		while (x.signum() > 0)
		{
			if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
			if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
			if (x.compareTo(y) >= 0)
			{
				x.subTo(y, x);
				x.rShiftTo(1, x);
			}
			else
			{
				y.subTo(x, y);
				y.rShiftTo(1, y);
			}
		}
		if (g > 0) y.lShiftTo(g, y);
		return y;
	}
	// (protected) this % n, n < 2^26
	function bnpModInt(n)
	{
		if (n <= 0) return 0;
		var d = this.DV % n,
			r = (this.s < 0) ? n - 1 : 0;
		if (this.t > 0)
			if (d == 0) r = this[0] % n;
			else
				for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
		return r;
	}
	// (public) 1/this % m (HAC 14.61)
	function bnModInverse(m)
	{
		var ac = m.isEven();
		if ((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
		var u = m.clone(),
			v = this.clone();
		var a = nbv(1),
			b = nbv(0),
			c = nbv(0),
			d = nbv(1);
		while (u.signum() != 0)
		{
			while (u.isEven())
			{
				u.rShiftTo(1, u);
				if (ac)
				{
					if (!a.isEven() || !b.isEven())
					{
						a.addTo(this, a);
						b.subTo(m, b);
					}
					a.rShiftTo(1, a);
				}
				else if (!b.isEven()) b.subTo(m, b);
				b.rShiftTo(1, b);
			}
			while (v.isEven())
			{
				v.rShiftTo(1, v);
				if (ac)
				{
					if (!c.isEven() || !d.isEven())
					{
						c.addTo(this, c);
						d.subTo(m, d);
					}
					c.rShiftTo(1, c);
				}
				else if (!d.isEven()) d.subTo(m, d);
				d.rShiftTo(1, d);
			}
			if (u.compareTo(v) >= 0)
			{
				u.subTo(v, u);
				if (ac) a.subTo(c, a);
				b.subTo(d, b);
			}
			else
			{
				v.subTo(u, v);
				if (ac) c.subTo(a, c);
				d.subTo(b, d);
			}
		}
		if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
		if (d.compareTo(m) >= 0) return d.subtract(m);
		if (d.signum() < 0) d.addTo(m, d);
		else return d;
		if (d.signum() < 0) return d.add(m);
		else return d;
	}
	var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
	var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
	// (public) test primality with certainty >= 1-.5^t
	function bnIsProbablePrime(t)
	{
		var i, x = this.abs();
		if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1])
		{
			for (i = 0; i < lowprimes.length; ++i)
				if (x[0] == lowprimes[i]) return true;
			return false;
		}
		if (x.isEven()) return false;
		i = 1;
		while (i < lowprimes.length)
		{
			var m = lowprimes[i],
				j = i + 1;
			while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
			m = x.modInt(m);
			while (i < j)
				if (m % lowprimes[i++] == 0) return false;
		}
		return x.millerRabin(t);
	}
	// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
	function bnpMillerRabin(t)
	{
		var n1 = this.subtract(BigInteger.ONE);
		var k = n1.getLowestSetBit();
		if (k <= 0) return false;
		var r = n1.shiftRight(k);
		t = (t + 1) >> 1;
		if (t > lowprimes.length) t = lowprimes.length;
		var a = nbi();
		for (var i = 0; i < t; ++i)
		{
			//Pick bases at random, instead of starting at 2
			a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
			var y = a.modPow(r, this);
			if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0)
			{
				var j = 1;
				while (j++ < k && y.compareTo(n1) != 0)
				{
					y = y.modPowInt(2, this);
					if (y.compareTo(BigInteger.ONE) == 0) return false;
				}
				if (y.compareTo(n1) != 0) return false;
			}
		}
		return true;
	}
	// protected
	BigInteger.prototype.chunkSize = bnpChunkSize;
	BigInteger.prototype.toRadix = bnpToRadix;
	BigInteger.prototype.fromRadix = bnpFromRadix;
	BigInteger.prototype.fromNumber = bnpFromNumber;
	BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
	BigInteger.prototype.changeBit = bnpChangeBit;
	BigInteger.prototype.addTo = bnpAddTo;
	BigInteger.prototype.dMultiply = bnpDMultiply;
	BigInteger.prototype.dAddOffset = bnpDAddOffset;
	BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
	BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
	BigInteger.prototype.modInt = bnpModInt;
	BigInteger.prototype.millerRabin = bnpMillerRabin;
	// public
	BigInteger.prototype.clone = bnClone;
	BigInteger.prototype.intValue = bnIntValue;
	BigInteger.prototype.byteValue = bnByteValue;
	BigInteger.prototype.shortValue = bnShortValue;
	BigInteger.prototype.signum = bnSigNum;
	BigInteger.prototype.toByteArray = bnToByteArray;
	BigInteger.prototype.equals = bnEquals;
	BigInteger.prototype.min = bnMin;
	BigInteger.prototype.max = bnMax;
	BigInteger.prototype.and = bnAnd;
	BigInteger.prototype.or = bnOr;
	BigInteger.prototype.xor = bnXor;
	BigInteger.prototype.andNot = bnAndNot;
	BigInteger.prototype.not = bnNot;
	BigInteger.prototype.shiftLeft = bnShiftLeft;
	BigInteger.prototype.shiftRight = bnShiftRight;
	BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
	BigInteger.prototype.bitCount = bnBitCount;
	BigInteger.prototype.testBit = bnTestBit;
	BigInteger.prototype.setBit = bnSetBit;
	BigInteger.prototype.clearBit = bnClearBit;
	BigInteger.prototype.flipBit = bnFlipBit;
	BigInteger.prototype.add = bnAdd;
	BigInteger.prototype.subtract = bnSubtract;
	BigInteger.prototype.multiply = bnMultiply;
	BigInteger.prototype.divide = bnDivide;
	BigInteger.prototype.remainder = bnRemainder;
	BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
	BigInteger.prototype.modPow = bnModPow;
	BigInteger.prototype.modInverse = bnModInverse;
	BigInteger.prototype.pow = bnPow;
	BigInteger.prototype.gcd = bnGCD;
	BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
	// JSBN-specific extension
	BigInteger.prototype.square = bnSquare;
	var Int128 = BigInteger;
	// BigInteger interfaces not implemented in jsbn:
	// BigInteger(int signum, byte[] magnitude)
	// double doubleValue()
	// float floatValue()
	// int hashCode()
	// long longValue()
	// static BigInteger valueOf(long val)
	// Helper functions to make BigInteger functions callable with two parameters
	// as in original C# Clipper
	Int128.prototype.IsNegative = function ()
	{
		if (this.compareTo(Int128.ZERO) == -1) return true;
		else return false;
	};

	Int128.op_Equality = function (val1, val2)
	{
		if (val1.compareTo(val2) == 0) return true;
		else return false;
	};

	Int128.op_Inequality = function (val1, val2)
	{
		if (val1.compareTo(val2) != 0) return true;
		else return false;
	};

	Int128.op_GreaterThan = function (val1, val2)
	{
		if (val1.compareTo(val2) > 0) return true;
		else return false;
	};

	Int128.op_LessThan = function (val1, val2)
	{
		if (val1.compareTo(val2) < 0) return true;
		else return false;
	};

	Int128.op_Addition = function (lhs, rhs)
	{
		return new Int128(lhs, undefined, undefined).add(new Int128(rhs, undefined, undefined));
	};

	Int128.op_Subtraction = function (lhs, rhs)
	{
		return new Int128(lhs, undefined, undefined).subtract(new Int128(rhs, undefined, undefined));
	};

	Int128.Int128Mul = function (lhs, rhs)
	{
		return new Int128(lhs, undefined, undefined).multiply(new Int128(rhs, undefined, undefined));
	};

	Int128.op_Division = function (lhs, rhs)
	{
		return lhs.divide(rhs);
	};

	Int128.prototype.ToDouble = function ()
	{
		return parseFloat(this.toString()); // This could be something faster
	};

	// end of Int128 section
	/*
	// Uncomment the following two lines if you want to use Int128 outside ClipperLib
	if (typeof(document) !== "undefined") window.Int128 = Int128;
	else self.Int128 = Int128;
	*/

	// ---------------------------------------------

	// Here starts the actual Clipper library:
	// Helper function to support Inheritance in Javascript
	var Inherit = function (ce, ce2)
	{
		var p;
		if (typeof (Object.getOwnPropertyNames) === 'undefined')
		{
			for (p in ce2.prototype)
				if (typeof (ce.prototype[p]) === 'undefined' || ce.prototype[p] === Object.prototype[p]) ce.prototype[p] = ce2.prototype[p];
			for (p in ce2)
				if (typeof (ce[p]) === 'undefined') ce[p] = ce2[p];
			ce.$baseCtor = ce2;
		}
		else
		{
			var props = Object.getOwnPropertyNames(ce2.prototype);
			for (var i = 0; i < props.length; i++)
				if (typeof (Object.getOwnPropertyDescriptor(ce.prototype, props[i])) === 'undefined') Object.defineProperty(ce.prototype, props[i], Object.getOwnPropertyDescriptor(ce2.prototype, props[i]));
			for (p in ce2)
				if (typeof (ce[p]) === 'undefined') ce[p] = ce2[p];
			ce.$baseCtor = ce2;
		}
	};

	/**
	* @constructor
	*/
	ClipperLib.Path = function ()
	{
		return [];
	};

	ClipperLib.Path.prototype.push = Array.prototype.push;

	/**
	* @constructor
	*/
	ClipperLib.Paths = function ()
	{
		return []; // Was previously [[]], but caused problems when pushed
	};

	ClipperLib.Paths.prototype.push = Array.prototype.push;

	// Preserves the calling way of original C# Clipper
	// Is essential due to compatibility, because DoublePoint is public class in original C# version
	/**
	* @constructor
	*/
	ClipperLib.DoublePoint = function ()
	{
		var a = arguments;
		this.X = 0;
		this.Y = 0;
		// public DoublePoint(DoublePoint dp)
		// public DoublePoint(IntPoint ip)
		if (a.length === 1)
		{
			this.X = a[0].X;
			this.Y = a[0].Y;
		}
		else if (a.length === 2)
		{
			this.X = a[0];
			this.Y = a[1];
		}
	}; // This is internal faster function when called without arguments
	/**
	* @constructor
	*/
	ClipperLib.DoublePoint0 = function ()
	{
		this.X = 0;
		this.Y = 0;
	};

	ClipperLib.DoublePoint0.prototype = ClipperLib.DoublePoint.prototype;

	// This is internal faster function when called with 1 argument (dp or ip)
	/**
	* @constructor
	*/
	ClipperLib.DoublePoint1 = function (dp)
	{
		this.X = dp.X;
		this.Y = dp.Y;
	};

	ClipperLib.DoublePoint1.prototype = ClipperLib.DoublePoint.prototype;

	// This is internal faster function when called with 2 arguments (x and y)
	/**
	* @constructor
	*/
	ClipperLib.DoublePoint2 = function (x, y)
	{
		this.X = x;
		this.Y = y;
	};

	ClipperLib.DoublePoint2.prototype = ClipperLib.DoublePoint.prototype;

	// PolyTree & PolyNode start
	/**
	* @suppress {missingProperties}
	*/
	ClipperLib.PolyNode = function ()
	{
		this.m_Parent = null;
		this.m_polygon = new ClipperLib.Path();
		this.m_Index = 0;
		this.m_jointype = 0;
		this.m_endtype = 0;
		this.m_Childs = [];
		this.IsOpen = false;
	};

	ClipperLib.PolyNode.prototype.IsHoleNode = function ()
	{
		var result = true;
		var node = this.m_Parent;
		while (node !== null)
		{
			result = !result;
			node = node.m_Parent;
		}
		return result;
	};

	ClipperLib.PolyNode.prototype.ChildCount = function ()
	{
		return this.m_Childs.length;
	};

	ClipperLib.PolyNode.prototype.Contour = function ()
	{
		return this.m_polygon;
	};

	ClipperLib.PolyNode.prototype.AddChild = function (Child)
	{
		var cnt = this.m_Childs.length;
		this.m_Childs.push(Child);
		Child.m_Parent = this;
		Child.m_Index = cnt;
	};

	ClipperLib.PolyNode.prototype.GetNext = function ()
	{
		if (this.m_Childs.length > 0)
			return this.m_Childs[0];
		else
			return this.GetNextSiblingUp();
	};

	ClipperLib.PolyNode.prototype.GetNextSiblingUp = function ()
	{
		if (this.m_Parent === null)
			return null;
		else if (this.m_Index === this.m_Parent.m_Childs.length - 1)
			return this.m_Parent.GetNextSiblingUp();
		else
			return this.m_Parent.m_Childs[this.m_Index + 1];
	};

	ClipperLib.PolyNode.prototype.Childs = function ()
	{
		return this.m_Childs;
	};

	ClipperLib.PolyNode.prototype.Parent = function ()
	{
		return this.m_Parent;
	};

	ClipperLib.PolyNode.prototype.IsHole = function ()
	{
		return this.IsHoleNode();
	};

	// PolyTree : PolyNode
	/**
	 * @suppress {missingProperties}
	 * @constructor
	 */
	ClipperLib.PolyTree = function ()
	{
		this.m_AllPolys = [];
		ClipperLib.PolyNode.call(this);
	};

	ClipperLib.PolyTree.prototype.Clear = function ()
	{
		for (var i = 0, ilen = this.m_AllPolys.length; i < ilen; i++)
			this.m_AllPolys[i] = null;
		this.m_AllPolys.length = 0;
		this.m_Childs.length = 0;
	};

	ClipperLib.PolyTree.prototype.GetFirst = function ()
	{
		if (this.m_Childs.length > 0)
			return this.m_Childs[0];
		else
			return null;
	};

	ClipperLib.PolyTree.prototype.Total = function ()
	{
		var result = this.m_AllPolys.length;
		//with negative offsets, ignore the hidden outer polygon ...
		if (result > 0 && this.m_Childs[0] !== this.m_AllPolys[0]) result--;
		return result;
	};

	Inherit(ClipperLib.PolyTree, ClipperLib.PolyNode);

	// PolyTree & PolyNode end

	ClipperLib.Math_Abs_Int64 = ClipperLib.Math_Abs_Int32 = ClipperLib.Math_Abs_Double = function (a)
	{
		return Math.abs(a);
	};

	ClipperLib.Math_Max_Int32_Int32 = function (a, b)
	{
		return Math.max(a, b);
	};

	/*
	-----------------------------------
	cast_32 speedtest: http://jsperf.com/truncate-float-to-integer/2
	-----------------------------------
	*/
	if (browser.msie || browser.opera || browser.safari) ClipperLib.Cast_Int32 = function (a)
	{
		return a | 0;
	};

	else ClipperLib.Cast_Int32 = function (a)
	{ // eg. browser.chrome || browser.chromium || browser.firefox
		return ~~a;
	};

	/*
	--------------------------
	cast_64 speedtests: http://jsperf.com/truncate-float-to-integer
	Chrome: bitwise_not_floor
	Firefox17: toInteger (typeof test)
	IE9: bitwise_or_floor
	IE7 and IE8: to_parseint
	Chromium: to_floor_or_ceil
	Firefox3: to_floor_or_ceil
	Firefox15: to_floor_or_ceil
	Opera: to_floor_or_ceil
	Safari: to_floor_or_ceil
	--------------------------
	*/
	if (typeof Number.toInteger === "undefined")
		Number.toInteger = null;

	if (browser.chrome) ClipperLib.Cast_Int64 = function (a)
	{
		if (a < -2147483648 || a > 2147483647)
			return a < 0 ? Math.ceil(a) : Math.floor(a);
		else return ~~a;
	};

	else if (browser.firefox && typeof (Number.toInteger) === "function") ClipperLib.Cast_Int64 = function (a)
	{
		return Number.toInteger(a);
	};

	else if (browser.msie7 || browser.msie8) ClipperLib.Cast_Int64 = function (a)
	{
		return parseInt(a, 10);
	};

	else if (browser.msie) ClipperLib.Cast_Int64 = function (a)
	{
		if (a < -2147483648 || a > 2147483647)
			return a < 0 ? Math.ceil(a) : Math.floor(a);
		return a | 0;
	};

	// eg. browser.chromium || browser.firefox || browser.opera || browser.safari
	else ClipperLib.Cast_Int64 = function (a)
	{
		return a < 0 ? Math.ceil(a) : Math.floor(a);
	};

	ClipperLib.Clear = function (a)
	{
		a.length = 0;
	};

	//ClipperLib.MaxSteps = 64; // How many steps at maximum in arc in BuildArc() function
	ClipperLib.PI = 3.141592653589793;
	ClipperLib.PI2 = 2 * 3.141592653589793;
	/**
	* @constructor
	*/
	ClipperLib.IntPoint = function ()
	{
		var a = arguments,
			alen = a.length;
		this.X = 0;
		this.Y = 0;
		if (ClipperLib.use_xyz)
		{
			this.Z = 0;
			if (alen === 3) // public IntPoint(cInt x, cInt y, cInt z = 0)
			{
				this.X = a[0];
				this.Y = a[1];
				this.Z = a[2];
			}
			else if (alen === 2) // public IntPoint(cInt x, cInt y)
			{
				this.X = a[0];
				this.Y = a[1];
				this.Z = 0;
			}
			else if (alen === 1)
			{
				if (a[0] instanceof ClipperLib.DoublePoint) // public IntPoint(DoublePoint dp)
				{
					var dp = a[0];
					this.X = ClipperLib.Clipper.Round(dp.X);
					this.Y = ClipperLib.Clipper.Round(dp.Y);
					this.Z = 0;
				}
				else // public IntPoint(IntPoint pt)
				{
					var pt = a[0];
					if (typeof (pt.Z) === "undefined") pt.Z = 0;
					this.X = pt.X;
					this.Y = pt.Y;
					this.Z = pt.Z;
				}
			}
			else // public IntPoint()
			{
				this.X = 0;
				this.Y = 0;
				this.Z = 0;
			}
		}
		else // if (!ClipperLib.use_xyz)
		{
			if (alen === 2) // public IntPoint(cInt X, cInt Y)
			{
				this.X = a[0];
				this.Y = a[1];
			}
			else if (alen === 1)
			{
				if (a[0] instanceof ClipperLib.DoublePoint) // public IntPoint(DoublePoint dp)
				{
					var dp = a[0];
					this.X = ClipperLib.Clipper.Round(dp.X);
					this.Y = ClipperLib.Clipper.Round(dp.Y);
				}
				else // public IntPoint(IntPoint pt)
				{
					var pt = a[0];
					this.X = pt.X;
					this.Y = pt.Y;
				}
			}
			else // public IntPoint(IntPoint pt)
			{
				this.X = 0;
				this.Y = 0;
			}
		}
	};

	ClipperLib.IntPoint.op_Equality = function (a, b)
	{
		//return a == b;
		return a.X === b.X && a.Y === b.Y;
	};

	ClipperLib.IntPoint.op_Inequality = function (a, b)
	{
		//return a !== b;
		return a.X !== b.X || a.Y !== b.Y;
	};

	/*
  ClipperLib.IntPoint.prototype.Equals = function (obj)
  {
	if (obj === null)
		return false;
	if (obj instanceof ClipperLib.IntPoint)
	{
		var a = Cast(obj, ClipperLib.IntPoint);
		return (this.X == a.X) && (this.Y == a.Y);
	}
	else
		return false;
  };

	*/

	/**
	* @constructor
	*/
	ClipperLib.IntPoint0 = function ()
	{
		this.X = 0;
		this.Y = 0;
		if (ClipperLib.use_xyz)
			this.Z = 0;
	};

	ClipperLib.IntPoint0.prototype = ClipperLib.IntPoint.prototype;

	/**
	* @constructor
	*/
	ClipperLib.IntPoint1 = function (pt)
	{
		this.X = pt.X;
		this.Y = pt.Y;
		if (ClipperLib.use_xyz)
		{
			if (typeof pt.Z === "undefined") this.Z = 0;
			else this.Z = pt.Z;
		}
	};

	ClipperLib.IntPoint1.prototype = ClipperLib.IntPoint.prototype;

	/**
	* @constructor
	*/
	ClipperLib.IntPoint1dp = function (dp)
	{
		this.X = ClipperLib.Clipper.Round(dp.X);
		this.Y = ClipperLib.Clipper.Round(dp.Y);
		if (ClipperLib.use_xyz)
			this.Z = 0;
	};

	ClipperLib.IntPoint1dp.prototype = ClipperLib.IntPoint.prototype;

	/**
	* @constructor
	*/
	ClipperLib.IntPoint2 = function (x, y, z)
	{
		this.X = x;
		this.Y = y;
		if (ClipperLib.use_xyz)
		{
			if (typeof z === "undefined") this.Z = 0;
			else this.Z = z;
		}
	};

	ClipperLib.IntPoint2.prototype = ClipperLib.IntPoint.prototype;

	/**
	* @constructor
	*/
	ClipperLib.IntRect = function ()
	{
		var a = arguments,
			alen = a.length;
		if (alen === 4) // function (l, t, r, b)
		{
			this.left = a[0];
			this.top = a[1];
			this.right = a[2];
			this.bottom = a[3];
		}
		else if (alen === 1) // function (ir)
		{
			var ir = a[0];
			this.left = ir.left;
			this.top = ir.top;
			this.right = ir.right;
			this.bottom = ir.bottom;
		}
		else // function ()
		{
			this.left = 0;
			this.top = 0;
			this.right = 0;
			this.bottom = 0;
		}
	};

	/**
	* @constructor
	*/
	ClipperLib.IntRect0 = function ()
	{
		this.left = 0;
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
	};

	ClipperLib.IntRect0.prototype = ClipperLib.IntRect.prototype;

	/**
	* @constructor
	*/
	ClipperLib.IntRect1 = function (ir)
	{
		this.left = ir.left;
		this.top = ir.top;
		this.right = ir.right;
		this.bottom = ir.bottom;
	};

	ClipperLib.IntRect1.prototype = ClipperLib.IntRect.prototype;

	/**
	* @constructor
	*/
	ClipperLib.IntRect4 = function (l, t, r, b)
	{
		this.left = l;
		this.top = t;
		this.right = r;
		this.bottom = b;
	};

	ClipperLib.IntRect4.prototype = ClipperLib.IntRect.prototype;

	ClipperLib.ClipType = {
		ctIntersection: 0,
		ctUnion: 1,
		ctDifference: 2,
		ctXor: 3
	};

	ClipperLib.PolyType = {
		ptSubject: 0,
		ptClip: 1
	};

	ClipperLib.PolyFillType = {
		pftEvenOdd: 0,
		pftNonZero: 1,
		pftPositive: 2,
		pftNegative: 3
	};

	ClipperLib.JoinType = {
		jtSquare: 0,
		jtRound: 1,
		jtMiter: 2
	};

	ClipperLib.EndType = {
		etOpenSquare: 0,
		etOpenRound: 1,
		etOpenButt: 2,
		etClosedLine: 3,
		etClosedPolygon: 4
	};

	ClipperLib.EdgeSide = {
		esLeft: 0,
		esRight: 1
	};

	ClipperLib.Direction = {
		dRightToLeft: 0,
		dLeftToRight: 1
	};

	/**
	* @constructor
	*/
	ClipperLib.TEdge = function ()
	{
		this.Bot = new ClipperLib.IntPoint0();
		this.Curr = new ClipperLib.IntPoint0(); //current (updated for every new scanbeam)
		this.Top = new ClipperLib.IntPoint0();
		this.Delta = new ClipperLib.IntPoint0();
		this.Dx = 0;
		this.PolyTyp = ClipperLib.PolyType.ptSubject;
		this.Side = ClipperLib.EdgeSide.esLeft; //side only refers to current side of solution poly
		this.WindDelta = 0; //1 or -1 depending on winding direction
		this.WindCnt = 0;
		this.WindCnt2 = 0; //winding count of the opposite polytype
		this.OutIdx = 0;
		this.Next = null;
		this.Prev = null;
		this.NextInLML = null;
		this.NextInAEL = null;
		this.PrevInAEL = null;
		this.NextInSEL = null;
		this.PrevInSEL = null;
	};

	/**
	* @constructor
	*/
	ClipperLib.IntersectNode = function ()
	{
		this.Edge1 = null;
		this.Edge2 = null;
		this.Pt = new ClipperLib.IntPoint0();
	};

	ClipperLib.MyIntersectNodeSort = function () {};

	ClipperLib.MyIntersectNodeSort.Compare = function (node1, node2)
	{
		var i = node2.Pt.Y - node1.Pt.Y;
		if (i > 0) return 1;
		else if (i < 0) return -1;
		else return 0;
	};

	/**
	* @constructor
	*/
	ClipperLib.LocalMinima = function ()
	{
		this.Y = 0;
		this.LeftBound = null;
		this.RightBound = null;
		this.Next = null;
	};

	/**
	* @constructor
	*/
	ClipperLib.Scanbeam = function ()
	{
		this.Y = 0;
		this.Next = null;
	};

	/**
	* @constructor
	*/
	ClipperLib.Maxima = function ()
	{
		this.X = 0;
		this.Next = null;
		this.Prev = null;
	};

	//OutRec: contains a path in the clipping solution. Edges in the AEL will
	//carry a pointer to an OutRec when they are part of the clipping solution.
	/**
	* @constructor
	*/
	ClipperLib.OutRec = function ()
	{
		this.Idx = 0;
		this.IsHole = false;
		this.IsOpen = false;
		this.FirstLeft = null; //see comments in clipper.pas
		this.Pts = null;
		this.BottomPt = null;
		this.PolyNode = null;
	};

	/**
	* @constructor
	*/
	ClipperLib.OutPt = function ()
	{
		this.Idx = 0;
		this.Pt = new ClipperLib.IntPoint0();
		this.Next = null;
		this.Prev = null;
	};

	/**
	* @constructor
	*/
	ClipperLib.Join = function ()
	{
		this.OutPt1 = null;
		this.OutPt2 = null;
		this.OffPt = new ClipperLib.IntPoint0();
	};

	ClipperLib.ClipperBase = function ()
	{
		this.m_MinimaList = null;
		this.m_CurrentLM = null;
		this.m_edges = new Array();
		this.m_UseFullRange = false;
		this.m_HasOpenPaths = false;
		this.PreserveCollinear = false;
		this.m_Scanbeam = null;
		this.m_PolyOuts = null;
		this.m_ActiveEdges = null;
	};

	// Ranges are in original C# too high for Javascript (in current state 2013 september):
	// protected const double horizontal = -3.4E+38;
	// internal const cInt loRange = 0x3FFFFFFF; // = 1073741823 = sqrt(2^63 -1)/2
	// internal const cInt hiRange = 0x3FFFFFFFFFFFFFFFL; // = 4611686018427387903 = sqrt(2^127 -1)/2
	// So had to adjust them to more suitable for Javascript.
	// If JS some day supports truly 64-bit integers, then these ranges can be as in C#
	// and biginteger library can be more simpler (as then 128bit can be represented as two 64bit numbers)
	ClipperLib.ClipperBase.horizontal = -9007199254740992; //-2^53
	ClipperLib.ClipperBase.Skip = -2;
	ClipperLib.ClipperBase.Unassigned = -1;
	ClipperLib.ClipperBase.tolerance = 1E-20;
	ClipperLib.ClipperBase.loRange = 47453132; // sqrt(2^53 -1)/2
	ClipperLib.ClipperBase.hiRange = 4503599627370495; // sqrt(2^106 -1)/2

	ClipperLib.ClipperBase.near_zero = function (val)
	{
		return (val > -ClipperLib.ClipperBase.tolerance) && (val < ClipperLib.ClipperBase.tolerance);
	};

	ClipperLib.ClipperBase.IsHorizontal = function (e)
	{
		return e.Delta.Y === 0;
	};

	ClipperLib.ClipperBase.prototype.PointIsVertex = function (pt, pp)
	{
		var pp2 = pp;
		do {
			if (ClipperLib.IntPoint.op_Equality(pp2.Pt, pt))
				return true;
			pp2 = pp2.Next;
		}
		while (pp2 !== pp)
		return false;
	};

	ClipperLib.ClipperBase.prototype.PointOnLineSegment = function (pt, linePt1, linePt2, UseFullRange)
	{
		if (UseFullRange)
			return ((pt.X === linePt1.X) && (pt.Y === linePt1.Y)) ||
				((pt.X === linePt2.X) && (pt.Y === linePt2.Y)) ||
				(((pt.X > linePt1.X) === (pt.X < linePt2.X)) &&
					((pt.Y > linePt1.Y) === (pt.Y < linePt2.Y)) &&
					(Int128.op_Equality(Int128.Int128Mul((pt.X - linePt1.X), (linePt2.Y - linePt1.Y)),
						Int128.Int128Mul((linePt2.X - linePt1.X), (pt.Y - linePt1.Y)))));
		else
			return ((pt.X === linePt1.X) && (pt.Y === linePt1.Y)) || ((pt.X === linePt2.X) && (pt.Y === linePt2.Y)) || (((pt.X > linePt1.X) === (pt.X < linePt2.X)) && ((pt.Y > linePt1.Y) === (pt.Y < linePt2.Y)) && ((pt.X - linePt1.X) * (linePt2.Y - linePt1.Y) === (linePt2.X - linePt1.X) * (pt.Y - linePt1.Y)));
	};

	ClipperLib.ClipperBase.prototype.PointOnPolygon = function (pt, pp, UseFullRange)
	{
		var pp2 = pp;
		while (true)
		{
			if (this.PointOnLineSegment(pt, pp2.Pt, pp2.Next.Pt, UseFullRange))
				return true;
			pp2 = pp2.Next;
			if (pp2 === pp)
				break;
		}
		return false;
	};

	ClipperLib.ClipperBase.prototype.SlopesEqual = ClipperLib.ClipperBase.SlopesEqual = function ()
	{
		var a = arguments,
			alen = a.length;
		var e1, e2, pt1, pt2, pt3, pt4, UseFullRange;
		if (alen === 3) // function (e1, e2, UseFullRange)
		{
			e1 = a[0];
			e2 = a[1];
			UseFullRange = a[2];
			if (UseFullRange)
				return Int128.op_Equality(Int128.Int128Mul(e1.Delta.Y, e2.Delta.X), Int128.Int128Mul(e1.Delta.X, e2.Delta.Y));
			else
				return ClipperLib.Cast_Int64((e1.Delta.Y) * (e2.Delta.X)) === ClipperLib.Cast_Int64((e1.Delta.X) * (e2.Delta.Y));
		}
		else if (alen === 4) // function (pt1, pt2, pt3, UseFullRange)
		{
			pt1 = a[0];
			pt2 = a[1];
			pt3 = a[2];
			UseFullRange = a[3];
			if (UseFullRange)
				return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt2.X - pt3.X), Int128.Int128Mul(pt1.X - pt2.X, pt2.Y - pt3.Y));
			else
				return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt2.X - pt3.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt2.Y - pt3.Y)) === 0;
		}
		else // function (pt1, pt2, pt3, pt4, UseFullRange)
		{
			pt1 = a[0];
			pt2 = a[1];
			pt3 = a[2];
			pt4 = a[3];
			UseFullRange = a[4];
			if (UseFullRange)
				return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt3.X - pt4.X), Int128.Int128Mul(pt1.X - pt2.X, pt3.Y - pt4.Y));
			else
				return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt3.X - pt4.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt3.Y - pt4.Y)) === 0;
		}
	};

	ClipperLib.ClipperBase.SlopesEqual3 = function (e1, e2, UseFullRange)
	{
		if (UseFullRange)
			return Int128.op_Equality(Int128.Int128Mul(e1.Delta.Y, e2.Delta.X), Int128.Int128Mul(e1.Delta.X, e2.Delta.Y));
		else
			return ClipperLib.Cast_Int64((e1.Delta.Y) * (e2.Delta.X)) === ClipperLib.Cast_Int64((e1.Delta.X) * (e2.Delta.Y));
	};

	ClipperLib.ClipperBase.SlopesEqual4 = function (pt1, pt2, pt3, UseFullRange)
	{
		if (UseFullRange)
			return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt2.X - pt3.X), Int128.Int128Mul(pt1.X - pt2.X, pt2.Y - pt3.Y));
		else
			return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt2.X - pt3.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt2.Y - pt3.Y)) === 0;
	};

	ClipperLib.ClipperBase.SlopesEqual5 = function (pt1, pt2, pt3, pt4, UseFullRange)
	{
		if (UseFullRange)
			return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt3.X - pt4.X), Int128.Int128Mul(pt1.X - pt2.X, pt3.Y - pt4.Y));
		else
			return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt3.X - pt4.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt3.Y - pt4.Y)) === 0;
	};

	ClipperLib.ClipperBase.prototype.Clear = function ()
	{
		this.DisposeLocalMinimaList();
		for (var i = 0, ilen = this.m_edges.length; i < ilen; ++i)
		{
			for (var j = 0, jlen = this.m_edges[i].length; j < jlen; ++j)
				this.m_edges[i][j] = null;
			ClipperLib.Clear(this.m_edges[i]);
		}
		ClipperLib.Clear(this.m_edges);
		this.m_UseFullRange = false;
		this.m_HasOpenPaths = false;
	};

	ClipperLib.ClipperBase.prototype.DisposeLocalMinimaList = function ()
	{
		while (this.m_MinimaList !== null)
		{
			var tmpLm = this.m_MinimaList.Next;
			this.m_MinimaList = null;
			this.m_MinimaList = tmpLm;
		}
		this.m_CurrentLM = null;
	};

	ClipperLib.ClipperBase.prototype.RangeTest = function (Pt, useFullRange)
	{
		if (useFullRange.Value)
		{
			if (Pt.X > ClipperLib.ClipperBase.hiRange || Pt.Y > ClipperLib.ClipperBase.hiRange || -Pt.X > ClipperLib.ClipperBase.hiRange || -Pt.Y > ClipperLib.ClipperBase.hiRange)
				ClipperLib.Error("Coordinate outside allowed range in RangeTest().");
		}
		else if (Pt.X > ClipperLib.ClipperBase.loRange || Pt.Y > ClipperLib.ClipperBase.loRange || -Pt.X > ClipperLib.ClipperBase.loRange || -Pt.Y > ClipperLib.ClipperBase.loRange)
		{
			useFullRange.Value = true;
			this.RangeTest(Pt, useFullRange);
		}
	};

	ClipperLib.ClipperBase.prototype.InitEdge = function (e, eNext, ePrev, pt)
	{
		e.Next = eNext;
		e.Prev = ePrev;
		//e.Curr = pt;
		e.Curr.X = pt.X;
		e.Curr.Y = pt.Y;
		if (ClipperLib.use_xyz) e.Curr.Z = pt.Z;
		e.OutIdx = -1;
	};

	ClipperLib.ClipperBase.prototype.InitEdge2 = function (e, polyType)
	{
		if (e.Curr.Y >= e.Next.Curr.Y)
		{
			//e.Bot = e.Curr;
			e.Bot.X = e.Curr.X;
			e.Bot.Y = e.Curr.Y;
			if (ClipperLib.use_xyz) e.Bot.Z = e.Curr.Z;
			//e.Top = e.Next.Curr;
			e.Top.X = e.Next.Curr.X;
			e.Top.Y = e.Next.Curr.Y;
			if (ClipperLib.use_xyz) e.Top.Z = e.Next.Curr.Z;
		}
		else
		{
			//e.Top = e.Curr;
			e.Top.X = e.Curr.X;
			e.Top.Y = e.Curr.Y;
			if (ClipperLib.use_xyz) e.Top.Z = e.Curr.Z;
			//e.Bot = e.Next.Curr;
			e.Bot.X = e.Next.Curr.X;
			e.Bot.Y = e.Next.Curr.Y;
			if (ClipperLib.use_xyz) e.Bot.Z = e.Next.Curr.Z;
		}
		this.SetDx(e);
		e.PolyTyp = polyType;
	};

	ClipperLib.ClipperBase.prototype.FindNextLocMin = function (E)
	{
		var E2;
		for (;;)
		{
			while (ClipperLib.IntPoint.op_Inequality(E.Bot, E.Prev.Bot) || ClipperLib.IntPoint.op_Equality(E.Curr, E.Top))
				E = E.Next;
			if (E.Dx !== ClipperLib.ClipperBase.horizontal && E.Prev.Dx !== ClipperLib.ClipperBase.horizontal)
				break;
			while (E.Prev.Dx === ClipperLib.ClipperBase.horizontal)
				E = E.Prev;
			E2 = E;
			while (E.Dx === ClipperLib.ClipperBase.horizontal)
				E = E.Next;
			if (E.Top.Y === E.Prev.Bot.Y)
				continue;
			//ie just an intermediate horz.
			if (E2.Prev.Bot.X < E.Bot.X)
				E = E2;
			break;
		}
		return E;
	};

	ClipperLib.ClipperBase.prototype.ProcessBound = function (E, LeftBoundIsForward)
	{
		var EStart;
		var Result = E;
		var Horz;

		if (Result.OutIdx === ClipperLib.ClipperBase.Skip)
		{
			//check if there are edges beyond the skip edge in the bound and if so
			//create another LocMin and calling ProcessBound once more ...
			E = Result;
			if (LeftBoundIsForward)
			{
				while (E.Top.Y === E.Next.Bot.Y) E = E.Next;
				while (E !== Result && E.Dx === ClipperLib.ClipperBase.horizontal) E = E.Prev;
			}
			else
			{
				while (E.Top.Y === E.Prev.Bot.Y) E = E.Prev;
				while (E !== Result && E.Dx === ClipperLib.ClipperBase.horizontal) E = E.Next;
			}
			if (E === Result)
			{
				if (LeftBoundIsForward) Result = E.Next;
				else Result = E.Prev;
			}
			else
			{
				//there are more edges in the bound beyond result starting with E
				if (LeftBoundIsForward)
					E = Result.Next;
				else
					E = Result.Prev;
				var locMin = new ClipperLib.LocalMinima();
				locMin.Next = null;
				locMin.Y = E.Bot.Y;
				locMin.LeftBound = null;
				locMin.RightBound = E;
				E.WindDelta = 0;
				Result = this.ProcessBound(E, LeftBoundIsForward);
				this.InsertLocalMinima(locMin);
			}
			return Result;
		}

		if (E.Dx === ClipperLib.ClipperBase.horizontal)
		{
			//We need to be careful with open paths because this may not be a
			//true local minima (ie E may be following a skip edge).
			//Also, consecutive horz. edges may start heading left before going right.
			if (LeftBoundIsForward) EStart = E.Prev;
			else EStart = E.Next;

			if (EStart.Dx === ClipperLib.ClipperBase.horizontal) //ie an adjoining horizontal skip edge
			{
				if (EStart.Bot.X !== E.Bot.X && EStart.Top.X !== E.Bot.X)
					this.ReverseHorizontal(E);
			}
			else if (EStart.Bot.X !== E.Bot.X)
				this.ReverseHorizontal(E);
		}

		EStart = E;
		if (LeftBoundIsForward)
		{
			while (Result.Top.Y === Result.Next.Bot.Y && Result.Next.OutIdx !== ClipperLib.ClipperBase.Skip)
				Result = Result.Next;
			if (Result.Dx === ClipperLib.ClipperBase.horizontal && Result.Next.OutIdx !== ClipperLib.ClipperBase.Skip)
			{
				//nb: at the top of a bound, horizontals are added to the bound
				//only when the preceding edge attaches to the horizontal's left vertex
				//unless a Skip edge is encountered when that becomes the top divide
				Horz = Result;
				while (Horz.Prev.Dx === ClipperLib.ClipperBase.horizontal)
					Horz = Horz.Prev;
				if (Horz.Prev.Top.X > Result.Next.Top.X)
					Result = Horz.Prev;
			}
			while (E !== Result)
			{
				E.NextInLML = E.Next;
				if (E.Dx === ClipperLib.ClipperBase.horizontal && E !== EStart && E.Bot.X !== E.Prev.Top.X)
					this.ReverseHorizontal(E);
				E = E.Next;
			}
			if (E.Dx === ClipperLib.ClipperBase.horizontal && E !== EStart && E.Bot.X !== E.Prev.Top.X)
				this.ReverseHorizontal(E);
			Result = Result.Next;
			//move to the edge just beyond current bound
		}
		else
		{
			while (Result.Top.Y === Result.Prev.Bot.Y && Result.Prev.OutIdx !== ClipperLib.ClipperBase.Skip)
				Result = Result.Prev;
			if (Result.Dx === ClipperLib.ClipperBase.horizontal && Result.Prev.OutIdx !== ClipperLib.ClipperBase.Skip)
			{
				Horz = Result;
				while (Horz.Next.Dx === ClipperLib.ClipperBase.horizontal)
					Horz = Horz.Next;
				if (Horz.Next.Top.X === Result.Prev.Top.X || Horz.Next.Top.X > Result.Prev.Top.X)
				{
					Result = Horz.Next;
				}
			}
			while (E !== Result)
			{
				E.NextInLML = E.Prev;
				if (E.Dx === ClipperLib.ClipperBase.horizontal && E !== EStart && E.Bot.X !== E.Next.Top.X)
					this.ReverseHorizontal(E);
				E = E.Prev;
			}
			if (E.Dx === ClipperLib.ClipperBase.horizontal && E !== EStart && E.Bot.X !== E.Next.Top.X)
				this.ReverseHorizontal(E);
			Result = Result.Prev;
			//move to the edge just beyond current bound
		}

		return Result;
	};

	ClipperLib.ClipperBase.prototype.AddPath = function (pg, polyType, Closed)
	{
		if (ClipperLib.use_lines)
		{
			if (!Closed && polyType === ClipperLib.PolyType.ptClip)
				ClipperLib.Error("AddPath: Open paths must be subject.");
		}
		else
		{
			if (!Closed)
				ClipperLib.Error("AddPath: Open paths have been disabled.");
		}
		var highI = pg.length - 1;
		if (Closed)
			while (highI > 0 && (ClipperLib.IntPoint.op_Equality(pg[highI], pg[0])))
				--highI;
		while (highI > 0 && (ClipperLib.IntPoint.op_Equality(pg[highI], pg[highI - 1])))
			--highI;
		if ((Closed && highI < 2) || (!Closed && highI < 1))
			return false;
		//create a new edge array ...
		var edges = new Array();
		for (var i = 0; i <= highI; i++)
			edges.push(new ClipperLib.TEdge());
		var IsFlat = true;
		//1. Basic (first) edge initialization ...

		//edges[1].Curr = pg[1];
		edges[1].Curr.X = pg[1].X;
		edges[1].Curr.Y = pg[1].Y;
		if (ClipperLib.use_xyz) edges[1].Curr.Z = pg[1].Z;

		var $1 = {
			Value: this.m_UseFullRange
		};

		this.RangeTest(pg[0], $1);
		this.m_UseFullRange = $1.Value;

		$1.Value = this.m_UseFullRange;
		this.RangeTest(pg[highI], $1);
		this.m_UseFullRange = $1.Value;

		this.InitEdge(edges[0], edges[1], edges[highI], pg[0]);
		this.InitEdge(edges[highI], edges[0], edges[highI - 1], pg[highI]);
		for (var i = highI - 1; i >= 1; --i)
		{
			$1.Value = this.m_UseFullRange;
			this.RangeTest(pg[i], $1);
			this.m_UseFullRange = $1.Value;

			this.InitEdge(edges[i], edges[i + 1], edges[i - 1], pg[i]);
		}

		var eStart = edges[0];
		//2. Remove duplicate vertices, and (when closed) collinear edges ...
		var E = eStart,
			eLoopStop = eStart;
		for (;;)
		{
			//console.log(E.Next, eStart);
			//nb: allows matching start and end points when not Closed ...
			if (E.Curr === E.Next.Curr && (Closed || E.Next !== eStart))
			{
				if (E === E.Next)
					break;
				if (E === eStart)
					eStart = E.Next;
				E = this.RemoveEdge(E);
				eLoopStop = E;
				continue;
			}
			if (E.Prev === E.Next)
				break;
			else if (Closed && ClipperLib.ClipperBase.SlopesEqual4(E.Prev.Curr, E.Curr, E.Next.Curr, this.m_UseFullRange) && (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(E.Prev.Curr, E.Curr, E.Next.Curr)))
			{
				//Collinear edges are allowed for open paths but in closed paths
				//the default is to merge adjacent collinear edges into a single edge.
				//However, if the PreserveCollinear property is enabled, only overlapping
				//collinear edges (ie spikes) will be removed from closed paths.
				if (E === eStart)
					eStart = E.Next;
				E = this.RemoveEdge(E);
				E = E.Prev;
				eLoopStop = E;
				continue;
			}
			E = E.Next;
			if ((E === eLoopStop) || (!Closed && E.Next === eStart)) break;
		}
		if ((!Closed && (E === E.Next)) || (Closed && (E.Prev === E.Next)))
			return false;
		if (!Closed)
		{
			this.m_HasOpenPaths = true;
			eStart.Prev.OutIdx = ClipperLib.ClipperBase.Skip;
		}
		//3. Do second stage of edge initialization ...
		E = eStart;
		do {
			this.InitEdge2(E, polyType);
			E = E.Next;
			if (IsFlat && E.Curr.Y !== eStart.Curr.Y)
				IsFlat = false;
		}
		while (E !== eStart)
		//4. Finally, add edge bounds to LocalMinima list ...
		//Totally flat paths must be handled differently when adding them
		//to LocalMinima list to avoid endless loops etc ...
		if (IsFlat)
		{
			if (Closed)
				return false;

			E.Prev.OutIdx = ClipperLib.ClipperBase.Skip;

			var locMin = new ClipperLib.LocalMinima();
			locMin.Next = null;
			locMin.Y = E.Bot.Y;
			locMin.LeftBound = null;
			locMin.RightBound = E;
			locMin.RightBound.Side = ClipperLib.EdgeSide.esRight;
			locMin.RightBound.WindDelta = 0;

			for (;;)
			{
				if (E.Bot.X !== E.Prev.Top.X) this.ReverseHorizontal(E);
				if (E.Next.OutIdx === ClipperLib.ClipperBase.Skip) break;
				E.NextInLML = E.Next;
				E = E.Next;
			}
			this.InsertLocalMinima(locMin);
			this.m_edges.push(edges);
			return true;
		}
		this.m_edges.push(edges);
		var leftBoundIsForward;
		var EMin = null;

		//workaround to avoid an endless loop in the while loop below when
		//open paths have matching start and end points ...
		if (ClipperLib.IntPoint.op_Equality(E.Prev.Bot, E.Prev.Top))
			E = E.Next;

		for (;;)
		{
			E = this.FindNextLocMin(E);
			if (E === EMin)
				break;
			else if (EMin === null)
				EMin = E;
			//E and E.Prev now share a local minima (left aligned if horizontal).
			//Compare their slopes to find which starts which bound ...
			var locMin = new ClipperLib.LocalMinima();
			locMin.Next = null;
			locMin.Y = E.Bot.Y;
			if (E.Dx < E.Prev.Dx)
			{
				locMin.LeftBound = E.Prev;
				locMin.RightBound = E;
				leftBoundIsForward = false;
				//Q.nextInLML = Q.prev
			}
			else
			{
				locMin.LeftBound = E;
				locMin.RightBound = E.Prev;
				leftBoundIsForward = true;
				//Q.nextInLML = Q.next
			}
			locMin.LeftBound.Side = ClipperLib.EdgeSide.esLeft;
			locMin.RightBound.Side = ClipperLib.EdgeSide.esRight;
			if (!Closed)
				locMin.LeftBound.WindDelta = 0;
			else if (locMin.LeftBound.Next === locMin.RightBound)
				locMin.LeftBound.WindDelta = -1;
			else
				locMin.LeftBound.WindDelta = 1;
			locMin.RightBound.WindDelta = -locMin.LeftBound.WindDelta;
			E = this.ProcessBound(locMin.LeftBound, leftBoundIsForward);
			if (E.OutIdx === ClipperLib.ClipperBase.Skip)
				E = this.ProcessBound(E, leftBoundIsForward);
			var E2 = this.ProcessBound(locMin.RightBound, !leftBoundIsForward);
			if (E2.OutIdx === ClipperLib.ClipperBase.Skip) E2 = this.ProcessBound(E2, !leftBoundIsForward);
			if (locMin.LeftBound.OutIdx === ClipperLib.ClipperBase.Skip)
				locMin.LeftBound = null;
			else if (locMin.RightBound.OutIdx === ClipperLib.ClipperBase.Skip)
				locMin.RightBound = null;
			this.InsertLocalMinima(locMin);
			if (!leftBoundIsForward)
				E = E2;
		}
		return true;
	};

	ClipperLib.ClipperBase.prototype.AddPaths = function (ppg, polyType, closed)
	{
		//  console.log("-------------------------------------------");
		//  console.log(JSON.stringify(ppg));
		var result = false;
		for (var i = 0, ilen = ppg.length; i < ilen; ++i)
			if (this.AddPath(ppg[i], polyType, closed))
				result = true;
		return result;
	};

	ClipperLib.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3 = function (pt1, pt2, pt3)
	{
		if ((ClipperLib.IntPoint.op_Equality(pt1, pt3)) || (ClipperLib.IntPoint.op_Equality(pt1, pt2)) || (ClipperLib.IntPoint.op_Equality(pt3, pt2)))

			//if ((pt1 == pt3) || (pt1 == pt2) || (pt3 == pt2))
			return false;

		else if (pt1.X !== pt3.X)
			return (pt2.X > pt1.X) === (pt2.X < pt3.X);
		else
			return (pt2.Y > pt1.Y) === (pt2.Y < pt3.Y);
	};

	ClipperLib.ClipperBase.prototype.RemoveEdge = function (e)
	{
		//removes e from double_linked_list (but without removing from memory)
		e.Prev.Next = e.Next;
		e.Next.Prev = e.Prev;
		var result = e.Next;
		e.Prev = null; //flag as removed (see ClipperBase.Clear)
		return result;
	};

	ClipperLib.ClipperBase.prototype.SetDx = function (e)
	{
		e.Delta.X = (e.Top.X - e.Bot.X);
		e.Delta.Y = (e.Top.Y - e.Bot.Y);
		if (e.Delta.Y === 0) e.Dx = ClipperLib.ClipperBase.horizontal;
		else e.Dx = (e.Delta.X) / (e.Delta.Y);
	};

	ClipperLib.ClipperBase.prototype.InsertLocalMinima = function (newLm)
	{
		if (this.m_MinimaList === null)
		{
			this.m_MinimaList = newLm;
		}
		else if (newLm.Y >= this.m_MinimaList.Y)
		{
			newLm.Next = this.m_MinimaList;
			this.m_MinimaList = newLm;
		}
		else
		{
			var tmpLm = this.m_MinimaList;
			while (tmpLm.Next !== null && (newLm.Y < tmpLm.Next.Y))
				tmpLm = tmpLm.Next;
			newLm.Next = tmpLm.Next;
			tmpLm.Next = newLm;
		}
	};

	ClipperLib.ClipperBase.prototype.PopLocalMinima = function (Y, current)
	{
		current.v = this.m_CurrentLM;
		if (this.m_CurrentLM !== null && this.m_CurrentLM.Y === Y)
		{
			this.m_CurrentLM = this.m_CurrentLM.Next;
			return true;
		}
		return false;
	};

	ClipperLib.ClipperBase.prototype.ReverseHorizontal = function (e)
	{
		//swap horizontal edges' top and bottom x's so they follow the natural
		//progression of the bounds - ie so their xbots will align with the
		//adjoining lower edge. [Helpful in the ProcessHorizontal() method.]
		var tmp = e.Top.X;
		e.Top.X = e.Bot.X;
		e.Bot.X = tmp;
		if (ClipperLib.use_xyz)
		{
			tmp = e.Top.Z;
			e.Top.Z = e.Bot.Z;
			e.Bot.Z = tmp;
		}
	};

	ClipperLib.ClipperBase.prototype.Reset = function ()
	{
		this.m_CurrentLM = this.m_MinimaList;
		if (this.m_CurrentLM === null) //ie nothing to process
			return;
		//reset all edges ...
		this.m_Scanbeam = null;
		var lm = this.m_MinimaList;
		while (lm !== null)
		{
			this.InsertScanbeam(lm.Y);
			var e = lm.LeftBound;
			if (e !== null)
			{
				//e.Curr = e.Bot;
				e.Curr.X = e.Bot.X;
				e.Curr.Y = e.Bot.Y;
				if (ClipperLib.use_xyz) e.Curr.Z = e.Bot.Z;
				e.OutIdx = ClipperLib.ClipperBase.Unassigned;
			}
			e = lm.RightBound;
			if (e !== null)
			{
				//e.Curr = e.Bot;
				e.Curr.X = e.Bot.X;
				e.Curr.Y = e.Bot.Y;
				if (ClipperLib.use_xyz) e.Curr.Z = e.Bot.Z;
				e.OutIdx = ClipperLib.ClipperBase.Unassigned;
			}
			lm = lm.Next;
		}
		this.m_ActiveEdges = null;
	};

	ClipperLib.ClipperBase.prototype.InsertScanbeam = function (Y)
	{
		//single-linked list: sorted descending, ignoring dups.
		if (this.m_Scanbeam === null)
		{
			this.m_Scanbeam = new ClipperLib.Scanbeam();
			this.m_Scanbeam.Next = null;
			this.m_Scanbeam.Y = Y;
		}
		else if (Y > this.m_Scanbeam.Y)
		{
			var newSb = new ClipperLib.Scanbeam();
			newSb.Y = Y;
			newSb.Next = this.m_Scanbeam;
			this.m_Scanbeam = newSb;
		}
		else
		{
			var sb2 = this.m_Scanbeam;
			while (sb2.Next !== null && Y <= sb2.Next.Y)
			{
				sb2 = sb2.Next;
			}
			if (Y === sb2.Y)
			{
				return;
			} //ie ignores duplicates
			var newSb1 = new ClipperLib.Scanbeam();
			newSb1.Y = Y;
			newSb1.Next = sb2.Next;
			sb2.Next = newSb1;
		}
	};

	ClipperLib.ClipperBase.prototype.PopScanbeam = function (Y)
	{
		if (this.m_Scanbeam === null)
		{
			Y.v = 0;
			return false;
		}
		Y.v = this.m_Scanbeam.Y;
		this.m_Scanbeam = this.m_Scanbeam.Next;
		return true;
	};

	ClipperLib.ClipperBase.prototype.LocalMinimaPending = function ()
	{
		return (this.m_CurrentLM !== null);
	};

	ClipperLib.ClipperBase.prototype.CreateOutRec = function ()
	{
		var result = new ClipperLib.OutRec();
		result.Idx = ClipperLib.ClipperBase.Unassigned;
		result.IsHole = false;
		result.IsOpen = false;
		result.FirstLeft = null;
		result.Pts = null;
		result.BottomPt = null;
		result.PolyNode = null;
		this.m_PolyOuts.push(result);
		result.Idx = this.m_PolyOuts.length - 1;
		return result;
	};

	ClipperLib.ClipperBase.prototype.DisposeOutRec = function (index)
	{
		var outRec = this.m_PolyOuts[index];
		outRec.Pts = null;
		outRec = null;
		this.m_PolyOuts[index] = null;
	};

	ClipperLib.ClipperBase.prototype.UpdateEdgeIntoAEL = function (e)
	{
		if (e.NextInLML === null)
		{
			ClipperLib.Error("UpdateEdgeIntoAEL: invalid call");
		}
		var AelPrev = e.PrevInAEL;
		var AelNext = e.NextInAEL;
		e.NextInLML.OutIdx = e.OutIdx;
		if (AelPrev !== null)
		{
			AelPrev.NextInAEL = e.NextInLML;
		}
		else
		{
			this.m_ActiveEdges = e.NextInLML;
		}
		if (AelNext !== null)
		{
			AelNext.PrevInAEL = e.NextInLML;
		}
		e.NextInLML.Side = e.Side;
		e.NextInLML.WindDelta = e.WindDelta;
		e.NextInLML.WindCnt = e.WindCnt;
		e.NextInLML.WindCnt2 = e.WindCnt2;
		e = e.NextInLML;
		e.Curr.X = e.Bot.X;
		e.Curr.Y = e.Bot.Y;
		e.PrevInAEL = AelPrev;
		e.NextInAEL = AelNext;
		if (!ClipperLib.ClipperBase.IsHorizontal(e))
		{
			this.InsertScanbeam(e.Top.Y);
		}
		return e;
	};

	ClipperLib.ClipperBase.prototype.SwapPositionsInAEL = function (edge1, edge2)
	{
		//check that one or other edge hasn't already been removed from AEL ...
		if (edge1.NextInAEL === edge1.PrevInAEL || edge2.NextInAEL === edge2.PrevInAEL)
		{
			return;
		}

		if (edge1.NextInAEL === edge2)
		{
			var next = edge2.NextInAEL;
			if (next !== null)
			{
				next.PrevInAEL = edge1;
			}
			var prev = edge1.PrevInAEL;
			if (prev !== null)
			{
				prev.NextInAEL = edge2;
			}
			edge2.PrevInAEL = prev;
			edge2.NextInAEL = edge1;
			edge1.PrevInAEL = edge2;
			edge1.NextInAEL = next;
		}
		else if (edge2.NextInAEL === edge1)
		{
			var next1 = edge1.NextInAEL;
			if (next1 !== null)
			{
				next1.PrevInAEL = edge2;
			}
			var prev1 = edge2.PrevInAEL;
			if (prev1 !== null)
			{
				prev1.NextInAEL = edge1;
			}
			edge1.PrevInAEL = prev1;
			edge1.NextInAEL = edge2;
			edge2.PrevInAEL = edge1;
			edge2.NextInAEL = next1;
		}
		else
		{
			var next2 = edge1.NextInAEL;
			var prev2 = edge1.PrevInAEL;
			edge1.NextInAEL = edge2.NextInAEL;
			if (edge1.NextInAEL !== null)
			{
				edge1.NextInAEL.PrevInAEL = edge1;
			}
			edge1.PrevInAEL = edge2.PrevInAEL;
			if (edge1.PrevInAEL !== null)
			{
				edge1.PrevInAEL.NextInAEL = edge1;
			}
			edge2.NextInAEL = next2;
			if (edge2.NextInAEL !== null)
			{
				edge2.NextInAEL.PrevInAEL = edge2;
			}
			edge2.PrevInAEL = prev2;
			if (edge2.PrevInAEL !== null)
			{
				edge2.PrevInAEL.NextInAEL = edge2;
			}
		}

		if (edge1.PrevInAEL === null)
		{
			this.m_ActiveEdges = edge1;
		}
		else
		{
			if (edge2.PrevInAEL === null)
			{
				this.m_ActiveEdges = edge2;
			}
		}
	};

	ClipperLib.ClipperBase.prototype.DeleteFromAEL = function (e)
	{
		var AelPrev = e.PrevInAEL;
		var AelNext = e.NextInAEL;
		if (AelPrev === null && AelNext === null && e !== this.m_ActiveEdges)
		{
			return;
		} //already deleted
		if (AelPrev !== null)
		{
			AelPrev.NextInAEL = AelNext;
		}
		else
		{
			this.m_ActiveEdges = AelNext;
		}
		if (AelNext !== null)
		{
			AelNext.PrevInAEL = AelPrev;
		}
		e.NextInAEL = null;
		e.PrevInAEL = null;
	}

	// public Clipper(int InitOptions = 0)
	/**
	 * @suppress {missingProperties}
	 */
	ClipperLib.Clipper = function (InitOptions)
	{
		if (typeof (InitOptions) === "undefined") InitOptions = 0;
		this.m_PolyOuts = null;
		this.m_ClipType = ClipperLib.ClipType.ctIntersection;
		this.m_Scanbeam = null;
		this.m_Maxima = null;
		this.m_ActiveEdges = null;
		this.m_SortedEdges = null;
		this.m_IntersectList = null;
		this.m_IntersectNodeComparer = null;
		this.m_ExecuteLocked = false;
		this.m_ClipFillType = ClipperLib.PolyFillType.pftEvenOdd;
		this.m_SubjFillType = ClipperLib.PolyFillType.pftEvenOdd;
		this.m_Joins = null;
		this.m_GhostJoins = null;
		this.m_UsingPolyTree = false;
		this.ReverseSolution = false;
		this.StrictlySimple = false;

		ClipperLib.ClipperBase.call(this);

		this.m_Scanbeam = null;
		this.m_Maxima = null;
		this.m_ActiveEdges = null;
		this.m_SortedEdges = null;
		this.m_IntersectList = new Array();
		this.m_IntersectNodeComparer = ClipperLib.MyIntersectNodeSort.Compare;
		this.m_ExecuteLocked = false;
		this.m_UsingPolyTree = false;
		this.m_PolyOuts = new Array();
		this.m_Joins = new Array();
		this.m_GhostJoins = new Array();
		this.ReverseSolution = (1 & InitOptions) !== 0;
		this.StrictlySimple = (2 & InitOptions) !== 0;
		this.PreserveCollinear = (4 & InitOptions) !== 0;
		if (ClipperLib.use_xyz)
		{
			this.ZFillFunction = null; // function (IntPoint vert1, IntPoint vert2, ref IntPoint intersectPt);
		}
	};

	ClipperLib.Clipper.ioReverseSolution = 1;
	ClipperLib.Clipper.ioStrictlySimple = 2;
	ClipperLib.Clipper.ioPreserveCollinear = 4;

	ClipperLib.Clipper.prototype.Clear = function ()
	{
		if (this.m_edges.length === 0)
			return;
		//avoids problems with ClipperBase destructor
		this.DisposeAllPolyPts();
		ClipperLib.ClipperBase.prototype.Clear.call(this);
	};

	ClipperLib.Clipper.prototype.InsertMaxima = function (X)
	{
		//double-linked list: sorted ascending, ignoring dups.
		var newMax = new ClipperLib.Maxima();
		newMax.X = X;
		if (this.m_Maxima === null)
		{
			this.m_Maxima = newMax;
			this.m_Maxima.Next = null;
			this.m_Maxima.Prev = null;
		}
		else if (X < this.m_Maxima.X)
		{
			newMax.Next = this.m_Maxima;
			newMax.Prev = null;
			this.m_Maxima = newMax;
		}
		else
		{
			var m = this.m_Maxima;
			while (m.Next !== null && X >= m.Next.X)
			{
				m = m.Next;
			}
			if (X === m.X)
			{
				return;
			} //ie ignores duplicates (& CG to clean up newMax)
			//insert newMax between m and m.Next ...
			newMax.Next = m.Next;
			newMax.Prev = m;
			if (m.Next !== null)
			{
				m.Next.Prev = newMax;
			}
			m.Next = newMax;
		}
	};

	// ************************************
	ClipperLib.Clipper.prototype.Execute = function ()
	{
		var a = arguments,
			alen = a.length,
			ispolytree = a[1] instanceof ClipperLib.PolyTree;
		if (alen === 4 && !ispolytree) // function (clipType, solution, subjFillType, clipFillType)
		{
			var clipType = a[0],
				solution = a[1],
				subjFillType = a[2],
				clipFillType = a[3];
			if (this.m_ExecuteLocked)
				return false;
			if (this.m_HasOpenPaths)
				ClipperLib.Error("Error: PolyTree struct is needed for open path clipping.");
			this.m_ExecuteLocked = true;
			ClipperLib.Clear(solution);
			this.m_SubjFillType = subjFillType;
			this.m_ClipFillType = clipFillType;
			this.m_ClipType = clipType;
			this.m_UsingPolyTree = false;
			try
			{
				var succeeded = this.ExecuteInternal();
				//build the return polygons ...
				if (succeeded) this.BuildResult(solution);
			}
			finally
			{
				this.DisposeAllPolyPts();
				this.m_ExecuteLocked = false;
			}
			return succeeded;
		}
		else if (alen === 4 && ispolytree) // function (clipType, polytree, subjFillType, clipFillType)
		{
			var clipType = a[0],
				polytree = a[1],
				subjFillType = a[2],
				clipFillType = a[3];
			if (this.m_ExecuteLocked)
				return false;
			this.m_ExecuteLocked = true;
			this.m_SubjFillType = subjFillType;
			this.m_ClipFillType = clipFillType;
			this.m_ClipType = clipType;
			this.m_UsingPolyTree = true;
			try
			{
				var succeeded = this.ExecuteInternal();
				//build the return polygons ...
				if (succeeded) this.BuildResult2(polytree);
			}
			finally
			{
				this.DisposeAllPolyPts();
				this.m_ExecuteLocked = false;
			}
			return succeeded;
		}
		else if (alen === 2 && !ispolytree) // function (clipType, solution)
		{
			var clipType = a[0],
				solution = a[1];
			return this.Execute(clipType, solution, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);
		}
		else if (alen === 2 && ispolytree) // function (clipType, polytree)
		{
			var clipType = a[0],
				polytree = a[1];
			return this.Execute(clipType, polytree, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);
		}
	};

	ClipperLib.Clipper.prototype.FixHoleLinkage = function (outRec)
	{
		//skip if an outermost polygon or
		//already already points to the correct FirstLeft ...
		if (outRec.FirstLeft === null || (outRec.IsHole !== outRec.FirstLeft.IsHole && outRec.FirstLeft.Pts !== null))
			return;
		var orfl = outRec.FirstLeft;
		while (orfl !== null && ((orfl.IsHole === outRec.IsHole) || orfl.Pts === null))
			orfl = orfl.FirstLeft;
		outRec.FirstLeft = orfl;
	};

	ClipperLib.Clipper.prototype.ExecuteInternal = function ()
	{
		try
		{
			this.Reset();
			this.m_SortedEdges = null;
			this.m_Maxima = null;

			var botY = {},
				topY = {};

			if (!this.PopScanbeam(botY))
			{
				return false;
			}
			this.InsertLocalMinimaIntoAEL(botY.v);
			while (this.PopScanbeam(topY) || this.LocalMinimaPending())
			{
				this.ProcessHorizontals();
				this.m_GhostJoins.length = 0;
				if (!this.ProcessIntersections(topY.v))
				{
					return false;
				}
				this.ProcessEdgesAtTopOfScanbeam(topY.v);
				botY.v = topY.v;
				this.InsertLocalMinimaIntoAEL(botY.v);
			}

			//fix orientations ...
			var outRec, i, ilen;
			//fix orientations ...
			for (i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
			{
				outRec = this.m_PolyOuts[i];
				if (outRec.Pts === null || outRec.IsOpen) continue;
				if ((outRec.IsHole ^ this.ReverseSolution) == (this.Area$1(outRec) > 0))
					this.ReversePolyPtLinks(outRec.Pts);
			}

			this.JoinCommonEdges();

			for (i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
			{
				outRec = this.m_PolyOuts[i];
				if (outRec.Pts === null)
					continue;
				else if (outRec.IsOpen)
					this.FixupOutPolyline(outRec);
				else
					this.FixupOutPolygon(outRec);
			}

			if (this.StrictlySimple) this.DoSimplePolygons();
			return true;
		}
		//catch { return false; }
		finally
		{
			this.m_Joins.length = 0;
			this.m_GhostJoins.length = 0;
		}
	};

	ClipperLib.Clipper.prototype.DisposeAllPolyPts = function ()
	{
		for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; ++i)
			this.DisposeOutRec(i);
		ClipperLib.Clear(this.m_PolyOuts);
	};

	ClipperLib.Clipper.prototype.AddJoin = function (Op1, Op2, OffPt)
	{
		var j = new ClipperLib.Join();
		j.OutPt1 = Op1;
		j.OutPt2 = Op2;
		//j.OffPt = OffPt;
		j.OffPt.X = OffPt.X;
		j.OffPt.Y = OffPt.Y;
		if (ClipperLib.use_xyz) j.OffPt.Z = OffPt.Z;
		this.m_Joins.push(j);
	};

	ClipperLib.Clipper.prototype.AddGhostJoin = function (Op, OffPt)
	{
		var j = new ClipperLib.Join();
		j.OutPt1 = Op;
		//j.OffPt = OffPt;
		j.OffPt.X = OffPt.X;
		j.OffPt.Y = OffPt.Y;
		if (ClipperLib.use_xyz) j.OffPt.Z = OffPt.Z;
		this.m_GhostJoins.push(j);
	};

	//if (ClipperLib.use_xyz)
	//{
	ClipperLib.Clipper.prototype.SetZ = function (pt, e1, e2)
	{
		if (this.ZFillFunction !== null)
		{
			if (pt.Z !== 0 || this.ZFillFunction === null) return;
			else if (ClipperLib.IntPoint.op_Equality(pt, e1.Bot)) pt.Z = e1.Bot.Z;
			else if (ClipperLib.IntPoint.op_Equality(pt, e1.Top)) pt.Z = e1.Top.Z;
			else if (ClipperLib.IntPoint.op_Equality(pt, e2.Bot)) pt.Z = e2.Bot.Z;
			else if (ClipperLib.IntPoint.op_Equality(pt, e2.Top)) pt.Z = e2.Top.Z;
			else this.ZFillFunction(e1.Bot, e1.Top, e2.Bot, e2.Top, pt);
		}
	};
	//}

	ClipperLib.Clipper.prototype.InsertLocalMinimaIntoAEL = function (botY)
	{
		var lm = {};

		var lb;
		var rb;
		while (this.PopLocalMinima(botY, lm))
		{
			lb = lm.v.LeftBound;
			rb = lm.v.RightBound;

			var Op1 = null;
			if (lb === null)
			{
				this.InsertEdgeIntoAEL(rb, null);
				this.SetWindingCount(rb);
				if (this.IsContributing(rb))
					Op1 = this.AddOutPt(rb, rb.Bot);
			}
			else if (rb === null)
			{
				this.InsertEdgeIntoAEL(lb, null);
				this.SetWindingCount(lb);
				if (this.IsContributing(lb))
					Op1 = this.AddOutPt(lb, lb.Bot);
				this.InsertScanbeam(lb.Top.Y);
			}
			else
			{
				this.InsertEdgeIntoAEL(lb, null);
				this.InsertEdgeIntoAEL(rb, lb);
				this.SetWindingCount(lb);
				rb.WindCnt = lb.WindCnt;
				rb.WindCnt2 = lb.WindCnt2;
				if (this.IsContributing(lb))
					Op1 = this.AddLocalMinPoly(lb, rb, lb.Bot);
				this.InsertScanbeam(lb.Top.Y);
			}
			if (rb !== null)
			{
				if (ClipperLib.ClipperBase.IsHorizontal(rb))
				{
					if (rb.NextInLML !== null)
					{
						this.InsertScanbeam(rb.NextInLML.Top.Y);
					}
					this.AddEdgeToSEL(rb);
				}
				else
				{
					this.InsertScanbeam(rb.Top.Y);
				}
			}
			if (lb === null || rb === null) continue;
			//if output polygons share an Edge with a horizontal rb, they'll need joining later ...
			if (Op1 !== null && ClipperLib.ClipperBase.IsHorizontal(rb) && this.m_GhostJoins.length > 0 && rb.WindDelta !== 0)
			{
				for (var i = 0, ilen = this.m_GhostJoins.length; i < ilen; i++)
				{
					//if the horizontal Rb and a 'ghost' horizontal overlap, then convert
					//the 'ghost' join to a real join ready for later ...
					var j = this.m_GhostJoins[i];

					if (this.HorzSegmentsOverlap(j.OutPt1.Pt.X, j.OffPt.X, rb.Bot.X, rb.Top.X))
						this.AddJoin(j.OutPt1, Op1, j.OffPt);
				}
			}

			if (lb.OutIdx >= 0 && lb.PrevInAEL !== null &&
				lb.PrevInAEL.Curr.X === lb.Bot.X &&
				lb.PrevInAEL.OutIdx >= 0 &&
				ClipperLib.ClipperBase.SlopesEqual5(lb.PrevInAEL.Curr, lb.PrevInAEL.Top, lb.Curr, lb.Top, this.m_UseFullRange) &&
				lb.WindDelta !== 0 && lb.PrevInAEL.WindDelta !== 0)
			{
				var Op2 = this.AddOutPt(lb.PrevInAEL, lb.Bot);
				this.AddJoin(Op1, Op2, lb.Top);
			}
			if (lb.NextInAEL !== rb)
			{
				if (rb.OutIdx >= 0 && rb.PrevInAEL.OutIdx >= 0 &&
					ClipperLib.ClipperBase.SlopesEqual5(rb.PrevInAEL.Curr, rb.PrevInAEL.Top, rb.Curr, rb.Top, this.m_UseFullRange) &&
					rb.WindDelta !== 0 && rb.PrevInAEL.WindDelta !== 0)
				{
					var Op2 = this.AddOutPt(rb.PrevInAEL, rb.Bot);
					this.AddJoin(Op1, Op2, rb.Top);
				}
				var e = lb.NextInAEL;
				if (e !== null)
					while (e !== rb)
					{
						//nb: For calculating winding counts etc, IntersectEdges() assumes
						//that param1 will be to the right of param2 ABOVE the intersection ...
						this.IntersectEdges(rb, e, lb.Curr);
						//order important here
						e = e.NextInAEL;
					}
			}
		}
	};

	ClipperLib.Clipper.prototype.InsertEdgeIntoAEL = function (edge, startEdge)
	{
		if (this.m_ActiveEdges === null)
		{
			edge.PrevInAEL = null;
			edge.NextInAEL = null;
			this.m_ActiveEdges = edge;
		}
		else if (startEdge === null && this.E2InsertsBeforeE1(this.m_ActiveEdges, edge))
		{
			edge.PrevInAEL = null;
			edge.NextInAEL = this.m_ActiveEdges;
			this.m_ActiveEdges.PrevInAEL = edge;
			this.m_ActiveEdges = edge;
		}
		else
		{
			if (startEdge === null)
				startEdge = this.m_ActiveEdges;
			while (startEdge.NextInAEL !== null && !this.E2InsertsBeforeE1(startEdge.NextInAEL, edge))
				startEdge = startEdge.NextInAEL;
			edge.NextInAEL = startEdge.NextInAEL;
			if (startEdge.NextInAEL !== null)
				startEdge.NextInAEL.PrevInAEL = edge;
			edge.PrevInAEL = startEdge;
			startEdge.NextInAEL = edge;
		}
	};

	ClipperLib.Clipper.prototype.E2InsertsBeforeE1 = function (e1, e2)
	{
		if (e2.Curr.X === e1.Curr.X)
		{
			if (e2.Top.Y > e1.Top.Y)
				return e2.Top.X < ClipperLib.Clipper.TopX(e1, e2.Top.Y);
			else
				return e1.Top.X > ClipperLib.Clipper.TopX(e2, e1.Top.Y);
		}
		else
			return e2.Curr.X < e1.Curr.X;
	};

	ClipperLib.Clipper.prototype.IsEvenOddFillType = function (edge)
	{
		if (edge.PolyTyp === ClipperLib.PolyType.ptSubject)
			return this.m_SubjFillType === ClipperLib.PolyFillType.pftEvenOdd;
		else
			return this.m_ClipFillType === ClipperLib.PolyFillType.pftEvenOdd;
	};

	ClipperLib.Clipper.prototype.IsEvenOddAltFillType = function (edge)
	{
		if (edge.PolyTyp === ClipperLib.PolyType.ptSubject)
			return this.m_ClipFillType === ClipperLib.PolyFillType.pftEvenOdd;
		else
			return this.m_SubjFillType === ClipperLib.PolyFillType.pftEvenOdd;
	};

	ClipperLib.Clipper.prototype.IsContributing = function (edge)
	{
		var pft, pft2;
		if (edge.PolyTyp === ClipperLib.PolyType.ptSubject)
		{
			pft = this.m_SubjFillType;
			pft2 = this.m_ClipFillType;
		}
		else
		{
			pft = this.m_ClipFillType;
			pft2 = this.m_SubjFillType;
		}
		switch (pft)
		{
		case ClipperLib.PolyFillType.pftEvenOdd:
			if (edge.WindDelta === 0 && edge.WindCnt !== 1)
				return false;
			break;
		case ClipperLib.PolyFillType.pftNonZero:
			if (Math.abs(edge.WindCnt) !== 1)
				return false;
			break;
		case ClipperLib.PolyFillType.pftPositive:
			if (edge.WindCnt !== 1)
				return false;
			break;
		default:
			if (edge.WindCnt !== -1)
				return false;
			break;
		}
		switch (this.m_ClipType)
		{
		case ClipperLib.ClipType.ctIntersection:
			switch (pft2)
			{
			case ClipperLib.PolyFillType.pftEvenOdd:
			case ClipperLib.PolyFillType.pftNonZero:
				return (edge.WindCnt2 !== 0);
			case ClipperLib.PolyFillType.pftPositive:
				return (edge.WindCnt2 > 0);
			default:
				return (edge.WindCnt2 < 0);
			}
		case ClipperLib.ClipType.ctUnion:
			switch (pft2)
			{
			case ClipperLib.PolyFillType.pftEvenOdd:
			case ClipperLib.PolyFillType.pftNonZero:
				return (edge.WindCnt2 === 0);
			case ClipperLib.PolyFillType.pftPositive:
				return (edge.WindCnt2 <= 0);
			default:
				return (edge.WindCnt2 >= 0);
			}
		case ClipperLib.ClipType.ctDifference:
			if (edge.PolyTyp === ClipperLib.PolyType.ptSubject)
				switch (pft2)
				{
				case ClipperLib.PolyFillType.pftEvenOdd:
				case ClipperLib.PolyFillType.pftNonZero:
					return (edge.WindCnt2 === 0);
				case ClipperLib.PolyFillType.pftPositive:
					return (edge.WindCnt2 <= 0);
				default:
					return (edge.WindCnt2 >= 0);
				}
			else
				switch (pft2)
				{
				case ClipperLib.PolyFillType.pftEvenOdd:
				case ClipperLib.PolyFillType.pftNonZero:
					return (edge.WindCnt2 !== 0);
				case ClipperLib.PolyFillType.pftPositive:
					return (edge.WindCnt2 > 0);
				default:
					return (edge.WindCnt2 < 0);
				}
		case ClipperLib.ClipType.ctXor:
			if (edge.WindDelta === 0)
				switch (pft2)
				{
				case ClipperLib.PolyFillType.pftEvenOdd:
				case ClipperLib.PolyFillType.pftNonZero:
					return (edge.WindCnt2 === 0);
				case ClipperLib.PolyFillType.pftPositive:
					return (edge.WindCnt2 <= 0);
				default:
					return (edge.WindCnt2 >= 0);
				}
			else
				return true;
		}
		return true;
	};

	ClipperLib.Clipper.prototype.SetWindingCount = function (edge)
	{
		var e = edge.PrevInAEL;
		//find the edge of the same polytype that immediately preceeds 'edge' in AEL
		while (e !== null && ((e.PolyTyp !== edge.PolyTyp) || (e.WindDelta === 0)))
			e = e.PrevInAEL;
		if (e === null)
		{
			var pft = (edge.PolyTyp === ClipperLib.PolyType.ptSubject ? this.m_SubjFillType : this.m_ClipFillType);
			if (edge.WindDelta === 0)
			{
				edge.WindCnt = (pft === ClipperLib.PolyFillType.pftNegative ? -1 : 1);
			}
			else
			{
				edge.WindCnt = edge.WindDelta;
			}
			edge.WindCnt2 = 0;
			e = this.m_ActiveEdges;
			//ie get ready to calc WindCnt2
		}
		else if (edge.WindDelta === 0 && this.m_ClipType !== ClipperLib.ClipType.ctUnion)
		{
			edge.WindCnt = 1;
			edge.WindCnt2 = e.WindCnt2;
			e = e.NextInAEL;
			//ie get ready to calc WindCnt2
		}
		else if (this.IsEvenOddFillType(edge))
		{
			//EvenOdd filling ...
			if (edge.WindDelta === 0)
			{
				//are we inside a subj polygon ...
				var Inside = true;
				var e2 = e.PrevInAEL;
				while (e2 !== null)
				{
					if (e2.PolyTyp === e.PolyTyp && e2.WindDelta !== 0)
						Inside = !Inside;
					e2 = e2.PrevInAEL;
				}
				edge.WindCnt = (Inside ? 0 : 1);
			}
			else
			{
				edge.WindCnt = edge.WindDelta;
			}
			edge.WindCnt2 = e.WindCnt2;
			e = e.NextInAEL;
			//ie get ready to calc WindCnt2
		}
		else
		{
			//nonZero, Positive or Negative filling ...
			if (e.WindCnt * e.WindDelta < 0)
			{
				//prev edge is 'decreasing' WindCount (WC) toward zero
				//so we're outside the previous polygon ...
				if (Math.abs(e.WindCnt) > 1)
				{
					//outside prev poly but still inside another.
					//when reversing direction of prev poly use the same WC
					if (e.WindDelta * edge.WindDelta < 0)
						edge.WindCnt = e.WindCnt;
					else
						edge.WindCnt = e.WindCnt + edge.WindDelta;
				}
				else
					edge.WindCnt = (edge.WindDelta === 0 ? 1 : edge.WindDelta);
			}
			else
			{
				//prev edge is 'increasing' WindCount (WC) away from zero
				//so we're inside the previous polygon ...
				if (edge.WindDelta === 0)
					edge.WindCnt = (e.WindCnt < 0 ? e.WindCnt - 1 : e.WindCnt + 1);
				else if (e.WindDelta * edge.WindDelta < 0)
					edge.WindCnt = e.WindCnt;
				else
					edge.WindCnt = e.WindCnt + edge.WindDelta;
			}
			edge.WindCnt2 = e.WindCnt2;
			e = e.NextInAEL;
			//ie get ready to calc WindCnt2
		}
		//update WindCnt2 ...
		if (this.IsEvenOddAltFillType(edge))
		{
			//EvenOdd filling ...
			while (e !== edge)
			{
				if (e.WindDelta !== 0)
					edge.WindCnt2 = (edge.WindCnt2 === 0 ? 1 : 0);
				e = e.NextInAEL;
			}
		}
		else
		{
			//nonZero, Positive or Negative filling ...
			while (e !== edge)
			{
				edge.WindCnt2 += e.WindDelta;
				e = e.NextInAEL;
			}
		}
	};

	ClipperLib.Clipper.prototype.AddEdgeToSEL = function (edge)
	{
		//SEL pointers in PEdge are use to build transient lists of horizontal edges.
		//However, since we don't need to worry about processing order, all additions
		//are made to the front of the list ...
		if (this.m_SortedEdges === null)
		{
			this.m_SortedEdges = edge;
			edge.PrevInSEL = null;
			edge.NextInSEL = null;
		}
		else
		{
			edge.NextInSEL = this.m_SortedEdges;
			edge.PrevInSEL = null;
			this.m_SortedEdges.PrevInSEL = edge;
			this.m_SortedEdges = edge;
		}
	};

	ClipperLib.Clipper.prototype.PopEdgeFromSEL = function (e)
	{
		//Pop edge from front of SEL (ie SEL is a FILO list)
		e.v = this.m_SortedEdges;
		if (e.v === null)
		{
			return false;
		}
		var oldE = e.v;
		this.m_SortedEdges = e.v.NextInSEL;
		if (this.m_SortedEdges !== null)
		{
			this.m_SortedEdges.PrevInSEL = null;
		}
		oldE.NextInSEL = null;
		oldE.PrevInSEL = null;
		return true;
	};

	ClipperLib.Clipper.prototype.CopyAELToSEL = function ()
	{
		var e = this.m_ActiveEdges;
		this.m_SortedEdges = e;
		while (e !== null)
		{
			e.PrevInSEL = e.PrevInAEL;
			e.NextInSEL = e.NextInAEL;
			e = e.NextInAEL;
		}
	};

	ClipperLib.Clipper.prototype.SwapPositionsInSEL = function (edge1, edge2)
	{
		if (edge1.NextInSEL === null && edge1.PrevInSEL === null)
			return;
		if (edge2.NextInSEL === null && edge2.PrevInSEL === null)
			return;
		if (edge1.NextInSEL === edge2)
		{
			var next = edge2.NextInSEL;
			if (next !== null)
				next.PrevInSEL = edge1;
			var prev = edge1.PrevInSEL;
			if (prev !== null)
				prev.NextInSEL = edge2;
			edge2.PrevInSEL = prev;
			edge2.NextInSEL = edge1;
			edge1.PrevInSEL = edge2;
			edge1.NextInSEL = next;
		}
		else if (edge2.NextInSEL === edge1)
		{
			var next = edge1.NextInSEL;
			if (next !== null)
				next.PrevInSEL = edge2;
			var prev = edge2.PrevInSEL;
			if (prev !== null)
				prev.NextInSEL = edge1;
			edge1.PrevInSEL = prev;
			edge1.NextInSEL = edge2;
			edge2.PrevInSEL = edge1;
			edge2.NextInSEL = next;
		}
		else
		{
			var next = edge1.NextInSEL;
			var prev = edge1.PrevInSEL;
			edge1.NextInSEL = edge2.NextInSEL;
			if (edge1.NextInSEL !== null)
				edge1.NextInSEL.PrevInSEL = edge1;
			edge1.PrevInSEL = edge2.PrevInSEL;
			if (edge1.PrevInSEL !== null)
				edge1.PrevInSEL.NextInSEL = edge1;
			edge2.NextInSEL = next;
			if (edge2.NextInSEL !== null)
				edge2.NextInSEL.PrevInSEL = edge2;
			edge2.PrevInSEL = prev;
			if (edge2.PrevInSEL !== null)
				edge2.PrevInSEL.NextInSEL = edge2;
		}
		if (edge1.PrevInSEL === null)
			this.m_SortedEdges = edge1;
		else if (edge2.PrevInSEL === null)
			this.m_SortedEdges = edge2;
	};

	ClipperLib.Clipper.prototype.AddLocalMaxPoly = function (e1, e2, pt)
	{
		this.AddOutPt(e1, pt);
		if (e2.WindDelta === 0) this.AddOutPt(e2, pt);
		if (e1.OutIdx === e2.OutIdx)
		{
			e1.OutIdx = -1;
			e2.OutIdx = -1;
		}
		else if (e1.OutIdx < e2.OutIdx)
			this.AppendPolygon(e1, e2);
		else
			this.AppendPolygon(e2, e1);
	};

	ClipperLib.Clipper.prototype.AddLocalMinPoly = function (e1, e2, pt)
	{
		var result;
		var e, prevE;
		if (ClipperLib.ClipperBase.IsHorizontal(e2) || (e1.Dx > e2.Dx))
		{
			result = this.AddOutPt(e1, pt);
			e2.OutIdx = e1.OutIdx;
			e1.Side = ClipperLib.EdgeSide.esLeft;
			e2.Side = ClipperLib.EdgeSide.esRight;
			e = e1;
			if (e.PrevInAEL === e2)
				prevE = e2.PrevInAEL;
			else
				prevE = e.PrevInAEL;
		}
		else
		{
			result = this.AddOutPt(e2, pt);
			e1.OutIdx = e2.OutIdx;
			e1.Side = ClipperLib.EdgeSide.esRight;
			e2.Side = ClipperLib.EdgeSide.esLeft;
			e = e2;
			if (e.PrevInAEL === e1)
				prevE = e1.PrevInAEL;
			else
				prevE = e.PrevInAEL;
		}

		if (prevE !== null && prevE.OutIdx >= 0 && prevE.Top.Y < pt.Y && e.Top.Y < pt.Y)
		{
			var xPrev = ClipperLib.Clipper.TopX(prevE, pt.Y);
			var xE = ClipperLib.Clipper.TopX(e, pt.Y);
			if ((xPrev === xE) && (e.WindDelta !== 0) && (prevE.WindDelta !== 0) && ClipperLib.ClipperBase.SlopesEqual5(new ClipperLib.IntPoint2(xPrev, pt.Y), prevE.Top, new ClipperLib.IntPoint2(xE, pt.Y), e.Top, this.m_UseFullRange))
			{
				var outPt = this.AddOutPt(prevE, pt);
				this.AddJoin(result, outPt, e.Top);
			}
		}
		return result;
	};

	ClipperLib.Clipper.prototype.AddOutPt = function (e, pt)
	{
		if (e.OutIdx < 0)
		{
			var outRec = this.CreateOutRec();
			outRec.IsOpen = (e.WindDelta === 0);
			var newOp = new ClipperLib.OutPt();
			outRec.Pts = newOp;
			newOp.Idx = outRec.Idx;
			//newOp.Pt = pt;
			newOp.Pt.X = pt.X;
			newOp.Pt.Y = pt.Y;
			if (ClipperLib.use_xyz) newOp.Pt.Z = pt.Z;
			newOp.Next = newOp;
			newOp.Prev = newOp;
			if (!outRec.IsOpen)
				this.SetHoleState(e, outRec);
			e.OutIdx = outRec.Idx;
			//nb: do this after SetZ !
			return newOp;
		}
		else
		{
			var outRec = this.m_PolyOuts[e.OutIdx];
			//OutRec.Pts is the 'Left-most' point & OutRec.Pts.Prev is the 'Right-most'
			var op = outRec.Pts;
			var ToFront = (e.Side === ClipperLib.EdgeSide.esLeft);
			if (ToFront && ClipperLib.IntPoint.op_Equality(pt, op.Pt))
				return op;
			else if (!ToFront && ClipperLib.IntPoint.op_Equality(pt, op.Prev.Pt))
				return op.Prev;
			var newOp = new ClipperLib.OutPt();
			newOp.Idx = outRec.Idx;
			//newOp.Pt = pt;
			newOp.Pt.X = pt.X;
			newOp.Pt.Y = pt.Y;
			if (ClipperLib.use_xyz) newOp.Pt.Z = pt.Z;
			newOp.Next = op;
			newOp.Prev = op.Prev;
			newOp.Prev.Next = newOp;
			op.Prev = newOp;
			if (ToFront)
				outRec.Pts = newOp;
			return newOp;
		}
	};

	ClipperLib.Clipper.prototype.GetLastOutPt = function (e)
	{
		var outRec = this.m_PolyOuts[e.OutIdx];
		if (e.Side === ClipperLib.EdgeSide.esLeft)
		{
			return outRec.Pts;
		}
		else
		{
			return outRec.Pts.Prev;
		}
	};

	ClipperLib.Clipper.prototype.SwapPoints = function (pt1, pt2)
	{
		var tmp = new ClipperLib.IntPoint1(pt1.Value);
		//pt1.Value = pt2.Value;
		pt1.Value.X = pt2.Value.X;
		pt1.Value.Y = pt2.Value.Y;
		if (ClipperLib.use_xyz) pt1.Value.Z = pt2.Value.Z;
		//pt2.Value = tmp;
		pt2.Value.X = tmp.X;
		pt2.Value.Y = tmp.Y;
		if (ClipperLib.use_xyz) pt2.Value.Z = tmp.Z;
	};

	ClipperLib.Clipper.prototype.HorzSegmentsOverlap = function (seg1a, seg1b, seg2a, seg2b)
	{
		var tmp;
		if (seg1a > seg1b)
		{
			tmp = seg1a;
			seg1a = seg1b;
			seg1b = tmp;
		}
		if (seg2a > seg2b)
		{
			tmp = seg2a;
			seg2a = seg2b;
			seg2b = tmp;
		}
		return (seg1a < seg2b) && (seg2a < seg1b);
	}

	ClipperLib.Clipper.prototype.SetHoleState = function (e, outRec)
	{
		var e2 = e.PrevInAEL;
		var eTmp = null;
		while (e2 !== null)
		{
			if (e2.OutIdx >= 0 && e2.WindDelta !== 0)
			{
				if (eTmp === null)
					eTmp = e2;
				else if (eTmp.OutIdx === e2.OutIdx)
					eTmp = null; //paired
			}
			e2 = e2.PrevInAEL;
		}

		if (eTmp === null)
		{
			outRec.FirstLeft = null;
			outRec.IsHole = false;
		}
		else
		{
			outRec.FirstLeft = this.m_PolyOuts[eTmp.OutIdx];
			outRec.IsHole = !outRec.FirstLeft.IsHole;
		}
	};

	ClipperLib.Clipper.prototype.GetDx = function (pt1, pt2)
	{
		if (pt1.Y === pt2.Y)
			return ClipperLib.ClipperBase.horizontal;
		else
			return (pt2.X - pt1.X) / (pt2.Y - pt1.Y);
	};

	ClipperLib.Clipper.prototype.FirstIsBottomPt = function (btmPt1, btmPt2)
	{
		var p = btmPt1.Prev;
		while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt1.Pt)) && (p !== btmPt1))
			p = p.Prev;
		var dx1p = Math.abs(this.GetDx(btmPt1.Pt, p.Pt));
		p = btmPt1.Next;
		while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt1.Pt)) && (p !== btmPt1))
			p = p.Next;
		var dx1n = Math.abs(this.GetDx(btmPt1.Pt, p.Pt));
		p = btmPt2.Prev;
		while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt2.Pt)) && (p !== btmPt2))
			p = p.Prev;
		var dx2p = Math.abs(this.GetDx(btmPt2.Pt, p.Pt));
		p = btmPt2.Next;
		while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt2.Pt)) && (p !== btmPt2))
			p = p.Next;
		var dx2n = Math.abs(this.GetDx(btmPt2.Pt, p.Pt));

		if (Math.max(dx1p, dx1n) === Math.max(dx2p, dx2n) && Math.min(dx1p, dx1n) === Math.min(dx2p, dx2n))
		{
			return this.Area(btmPt1) > 0; //if otherwise identical use orientation
		}
		else
		{
			return (dx1p >= dx2p && dx1p >= dx2n) || (dx1n >= dx2p && dx1n >= dx2n);
		}
	};

	ClipperLib.Clipper.prototype.GetBottomPt = function (pp)
	{
		var dups = null;
		var p = pp.Next;
		while (p !== pp)
		{
			if (p.Pt.Y > pp.Pt.Y)
			{
				pp = p;
				dups = null;
			}
			else if (p.Pt.Y === pp.Pt.Y && p.Pt.X <= pp.Pt.X)
			{
				if (p.Pt.X < pp.Pt.X)
				{
					dups = null;
					pp = p;
				}
				else
				{
					if (p.Next !== pp && p.Prev !== pp)
						dups = p;
				}
			}
			p = p.Next;
		}
		if (dups !== null)
		{
			//there appears to be at least 2 vertices at bottomPt so ...
			while (dups !== p)
			{
				if (!this.FirstIsBottomPt(p, dups))
					pp = dups;
				dups = dups.Next;
				while (ClipperLib.IntPoint.op_Inequality(dups.Pt, pp.Pt))
					dups = dups.Next;
			}
		}
		return pp;
	};

	ClipperLib.Clipper.prototype.GetLowermostRec = function (outRec1, outRec2)
	{
		//work out which polygon fragment has the correct hole state ...
		if (outRec1.BottomPt === null)
			outRec1.BottomPt = this.GetBottomPt(outRec1.Pts);
		if (outRec2.BottomPt === null)
			outRec2.BottomPt = this.GetBottomPt(outRec2.Pts);
		var bPt1 = outRec1.BottomPt;
		var bPt2 = outRec2.BottomPt;
		if (bPt1.Pt.Y > bPt2.Pt.Y)
			return outRec1;
		else if (bPt1.Pt.Y < bPt2.Pt.Y)
			return outRec2;
		else if (bPt1.Pt.X < bPt2.Pt.X)
			return outRec1;
		else if (bPt1.Pt.X > bPt2.Pt.X)
			return outRec2;
		else if (bPt1.Next === bPt1)
			return outRec2;
		else if (bPt2.Next === bPt2)
			return outRec1;
		else if (this.FirstIsBottomPt(bPt1, bPt2))
			return outRec1;
		else
			return outRec2;
	};

	ClipperLib.Clipper.prototype.OutRec1RightOfOutRec2 = function (outRec1, outRec2)
	{
		do {
			outRec1 = outRec1.FirstLeft;
			if (outRec1 === outRec2)
				return true;
		}
		while (outRec1 !== null)
		return false;
	};

	ClipperLib.Clipper.prototype.GetOutRec = function (idx)
	{
		var outrec = this.m_PolyOuts[idx];
		while (outrec !== this.m_PolyOuts[outrec.Idx])
			outrec = this.m_PolyOuts[outrec.Idx];
		return outrec;
	};

	ClipperLib.Clipper.prototype.AppendPolygon = function (e1, e2)
	{
		//get the start and ends of both output polygons ...
		var outRec1 = this.m_PolyOuts[e1.OutIdx];
		var outRec2 = this.m_PolyOuts[e2.OutIdx];
		var holeStateRec;
		if (this.OutRec1RightOfOutRec2(outRec1, outRec2))
			holeStateRec = outRec2;
		else if (this.OutRec1RightOfOutRec2(outRec2, outRec1))
			holeStateRec = outRec1;
		else
			holeStateRec = this.GetLowermostRec(outRec1, outRec2);

		//get the start and ends of both output polygons and
		//join E2 poly onto E1 poly and delete pointers to E2 ...

		var p1_lft = outRec1.Pts;
		var p1_rt = p1_lft.Prev;
		var p2_lft = outRec2.Pts;
		var p2_rt = p2_lft.Prev;
		//join e2 poly onto e1 poly and delete pointers to e2 ...
		if (e1.Side === ClipperLib.EdgeSide.esLeft)
		{
			if (e2.Side === ClipperLib.EdgeSide.esLeft)
			{
				//z y x a b c
				this.ReversePolyPtLinks(p2_lft);
				p2_lft.Next = p1_lft;
				p1_lft.Prev = p2_lft;
				p1_rt.Next = p2_rt;
				p2_rt.Prev = p1_rt;
				outRec1.Pts = p2_rt;
			}
			else
			{
				//x y z a b c
				p2_rt.Next = p1_lft;
				p1_lft.Prev = p2_rt;
				p2_lft.Prev = p1_rt;
				p1_rt.Next = p2_lft;
				outRec1.Pts = p2_lft;
			}
		}
		else
		{
			if (e2.Side === ClipperLib.EdgeSide.esRight)
			{
				//a b c z y x
				this.ReversePolyPtLinks(p2_lft);
				p1_rt.Next = p2_rt;
				p2_rt.Prev = p1_rt;
				p2_lft.Next = p1_lft;
				p1_lft.Prev = p2_lft;
			}
			else
			{
				//a b c x y z
				p1_rt.Next = p2_lft;
				p2_lft.Prev = p1_rt;
				p1_lft.Prev = p2_rt;
				p2_rt.Next = p1_lft;
			}
		}
		outRec1.BottomPt = null;
		if (holeStateRec === outRec2)
		{
			if (outRec2.FirstLeft !== outRec1)
				outRec1.FirstLeft = outRec2.FirstLeft;
			outRec1.IsHole = outRec2.IsHole;
		}
		outRec2.Pts = null;
		outRec2.BottomPt = null;
		outRec2.FirstLeft = outRec1;
		var OKIdx = e1.OutIdx;
		var ObsoleteIdx = e2.OutIdx;
		e1.OutIdx = -1;
		//nb: safe because we only get here via AddLocalMaxPoly
		e2.OutIdx = -1;
		var e = this.m_ActiveEdges;
		while (e !== null)
		{
			if (e.OutIdx === ObsoleteIdx)
			{
				e.OutIdx = OKIdx;
				e.Side = e1.Side;
				break;
			}
			e = e.NextInAEL;
		}
		outRec2.Idx = outRec1.Idx;
	};

	ClipperLib.Clipper.prototype.ReversePolyPtLinks = function (pp)
	{
		if (pp === null)
			return;
		var pp1;
		var pp2;
		pp1 = pp;
		do {
			pp2 = pp1.Next;
			pp1.Next = pp1.Prev;
			pp1.Prev = pp2;
			pp1 = pp2;
		}
		while (pp1 !== pp)
	};

	ClipperLib.Clipper.SwapSides = function (edge1, edge2)
	{
		var side = edge1.Side;
		edge1.Side = edge2.Side;
		edge2.Side = side;
	};

	ClipperLib.Clipper.SwapPolyIndexes = function (edge1, edge2)
	{
		var outIdx = edge1.OutIdx;
		edge1.OutIdx = edge2.OutIdx;
		edge2.OutIdx = outIdx;
	};

	ClipperLib.Clipper.prototype.IntersectEdges = function (e1, e2, pt)
	{
		//e1 will be to the left of e2 BELOW the intersection. Therefore e1 is before
		//e2 in AEL except when e1 is being inserted at the intersection point ...
		var e1Contributing = (e1.OutIdx >= 0);
		var e2Contributing = (e2.OutIdx >= 0);

		if (ClipperLib.use_xyz)
			this.SetZ(pt, e1, e2);

		if (ClipperLib.use_lines)
		{
			//if either edge is on an OPEN path ...
			if (e1.WindDelta === 0 || e2.WindDelta === 0)
			{
				//ignore subject-subject open path intersections UNLESS they
				//are both open paths, AND they are both 'contributing maximas' ...
				if (e1.WindDelta === 0 && e2.WindDelta === 0) return;
				//if intersecting a subj line with a subj poly ...
				else if (e1.PolyTyp === e2.PolyTyp &&
					e1.WindDelta !== e2.WindDelta && this.m_ClipType === ClipperLib.ClipType.ctUnion)
				{
					if (e1.WindDelta === 0)
					{
						if (e2Contributing)
						{
							this.AddOutPt(e1, pt);
							if (e1Contributing)
								e1.OutIdx = -1;
						}
					}
					else
					{
						if (e1Contributing)
						{
							this.AddOutPt(e2, pt);
							if (e2Contributing)
								e2.OutIdx = -1;
						}
					}
				}
				else if (e1.PolyTyp !== e2.PolyTyp)
				{
					if ((e1.WindDelta === 0) && Math.abs(e2.WindCnt) === 1 &&
						(this.m_ClipType !== ClipperLib.ClipType.ctUnion || e2.WindCnt2 === 0))
					{
						this.AddOutPt(e1, pt);
						if (e1Contributing)
							e1.OutIdx = -1;
					}
					else if ((e2.WindDelta === 0) && (Math.abs(e1.WindCnt) === 1) &&
						(this.m_ClipType !== ClipperLib.ClipType.ctUnion || e1.WindCnt2 === 0))
					{
						this.AddOutPt(e2, pt);
						if (e2Contributing)
							e2.OutIdx = -1;
					}
				}
				return;
			}
		}
		//update winding counts...
		//assumes that e1 will be to the Right of e2 ABOVE the intersection
		if (e1.PolyTyp === e2.PolyTyp)
		{
			if (this.IsEvenOddFillType(e1))
			{
				var oldE1WindCnt = e1.WindCnt;
				e1.WindCnt = e2.WindCnt;
				e2.WindCnt = oldE1WindCnt;
			}
			else
			{
				if (e1.WindCnt + e2.WindDelta === 0)
					e1.WindCnt = -e1.WindCnt;
				else
					e1.WindCnt += e2.WindDelta;
				if (e2.WindCnt - e1.WindDelta === 0)
					e2.WindCnt = -e2.WindCnt;
				else
					e2.WindCnt -= e1.WindDelta;
			}
		}
		else
		{
			if (!this.IsEvenOddFillType(e2))
				e1.WindCnt2 += e2.WindDelta;
			else
				e1.WindCnt2 = (e1.WindCnt2 === 0) ? 1 : 0;
			if (!this.IsEvenOddFillType(e1))
				e2.WindCnt2 -= e1.WindDelta;
			else
				e2.WindCnt2 = (e2.WindCnt2 === 0) ? 1 : 0;
		}
		var e1FillType, e2FillType, e1FillType2, e2FillType2;
		if (e1.PolyTyp === ClipperLib.PolyType.ptSubject)
		{
			e1FillType = this.m_SubjFillType;
			e1FillType2 = this.m_ClipFillType;
		}
		else
		{
			e1FillType = this.m_ClipFillType;
			e1FillType2 = this.m_SubjFillType;
		}
		if (e2.PolyTyp === ClipperLib.PolyType.ptSubject)
		{
			e2FillType = this.m_SubjFillType;
			e2FillType2 = this.m_ClipFillType;
		}
		else
		{
			e2FillType = this.m_ClipFillType;
			e2FillType2 = this.m_SubjFillType;
		}
		var e1Wc, e2Wc;
		switch (e1FillType)
		{
		case ClipperLib.PolyFillType.pftPositive:
			e1Wc = e1.WindCnt;
			break;
		case ClipperLib.PolyFillType.pftNegative:
			e1Wc = -e1.WindCnt;
			break;
		default:
			e1Wc = Math.abs(e1.WindCnt);
			break;
		}
		switch (e2FillType)
		{
		case ClipperLib.PolyFillType.pftPositive:
			e2Wc = e2.WindCnt;
			break;
		case ClipperLib.PolyFillType.pftNegative:
			e2Wc = -e2.WindCnt;
			break;
		default:
			e2Wc = Math.abs(e2.WindCnt);
			break;
		}
		if (e1Contributing && e2Contributing)
		{
			if ((e1Wc !== 0 && e1Wc !== 1) || (e2Wc !== 0 && e2Wc !== 1) ||
				(e1.PolyTyp !== e2.PolyTyp && this.m_ClipType !== ClipperLib.ClipType.ctXor))
			{
				this.AddLocalMaxPoly(e1, e2, pt);
			}
			else
			{
				this.AddOutPt(e1, pt);
				this.AddOutPt(e2, pt);
				ClipperLib.Clipper.SwapSides(e1, e2);
				ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
			}
		}
		else if (e1Contributing)
		{
			if (e2Wc === 0 || e2Wc === 1)
			{
				this.AddOutPt(e1, pt);
				ClipperLib.Clipper.SwapSides(e1, e2);
				ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
			}
		}
		else if (e2Contributing)
		{
			if (e1Wc === 0 || e1Wc === 1)
			{
				this.AddOutPt(e2, pt);
				ClipperLib.Clipper.SwapSides(e1, e2);
				ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
			}
		}
		else if ((e1Wc === 0 || e1Wc === 1) && (e2Wc === 0 || e2Wc === 1))
		{
			//neither edge is currently contributing ...
			var e1Wc2, e2Wc2;
			switch (e1FillType2)
			{
			case ClipperLib.PolyFillType.pftPositive:
				e1Wc2 = e1.WindCnt2;
				break;
			case ClipperLib.PolyFillType.pftNegative:
				e1Wc2 = -e1.WindCnt2;
				break;
			default:
				e1Wc2 = Math.abs(e1.WindCnt2);
				break;
			}
			switch (e2FillType2)
			{
			case ClipperLib.PolyFillType.pftPositive:
				e2Wc2 = e2.WindCnt2;
				break;
			case ClipperLib.PolyFillType.pftNegative:
				e2Wc2 = -e2.WindCnt2;
				break;
			default:
				e2Wc2 = Math.abs(e2.WindCnt2);
				break;
			}
			if (e1.PolyTyp !== e2.PolyTyp)
			{
				this.AddLocalMinPoly(e1, e2, pt);
			}
			else if (e1Wc === 1 && e2Wc === 1)
				switch (this.m_ClipType)
				{
				case ClipperLib.ClipType.ctIntersection:
					if (e1Wc2 > 0 && e2Wc2 > 0)
						this.AddLocalMinPoly(e1, e2, pt);
					break;
				case ClipperLib.ClipType.ctUnion:
					if (e1Wc2 <= 0 && e2Wc2 <= 0)
						this.AddLocalMinPoly(e1, e2, pt);
					break;
				case ClipperLib.ClipType.ctDifference:
					if (((e1.PolyTyp === ClipperLib.PolyType.ptClip) && (e1Wc2 > 0) && (e2Wc2 > 0)) ||
						((e1.PolyTyp === ClipperLib.PolyType.ptSubject) && (e1Wc2 <= 0) && (e2Wc2 <= 0)))
						this.AddLocalMinPoly(e1, e2, pt);
					break;
				case ClipperLib.ClipType.ctXor:
					this.AddLocalMinPoly(e1, e2, pt);
					break;
				}
			else
				ClipperLib.Clipper.SwapSides(e1, e2);
		}
	};

	ClipperLib.Clipper.prototype.DeleteFromSEL = function (e)
	{
		var SelPrev = e.PrevInSEL;
		var SelNext = e.NextInSEL;
		if (SelPrev === null && SelNext === null && (e !== this.m_SortedEdges))
			return;
		//already deleted
		if (SelPrev !== null)
			SelPrev.NextInSEL = SelNext;
		else
			this.m_SortedEdges = SelNext;
		if (SelNext !== null)
			SelNext.PrevInSEL = SelPrev;
		e.NextInSEL = null;
		e.PrevInSEL = null;
	};

	ClipperLib.Clipper.prototype.ProcessHorizontals = function ()
	{
		var horzEdge = {}; //m_SortedEdges;
		while (this.PopEdgeFromSEL(horzEdge))
		{
			this.ProcessHorizontal(horzEdge.v);
		}
	};

	ClipperLib.Clipper.prototype.GetHorzDirection = function (HorzEdge, $var)
	{
		if (HorzEdge.Bot.X < HorzEdge.Top.X)
		{
			$var.Left = HorzEdge.Bot.X;
			$var.Right = HorzEdge.Top.X;
			$var.Dir = ClipperLib.Direction.dLeftToRight;
		}
		else
		{
			$var.Left = HorzEdge.Top.X;
			$var.Right = HorzEdge.Bot.X;
			$var.Dir = ClipperLib.Direction.dRightToLeft;
		}
	};

	ClipperLib.Clipper.prototype.ProcessHorizontal = function (horzEdge)
	{
		var $var = {
			Dir: null,
			Left: null,
			Right: null
		};

		this.GetHorzDirection(horzEdge, $var);
		var dir = $var.Dir;
		var horzLeft = $var.Left;
		var horzRight = $var.Right;

		var IsOpen = horzEdge.WindDelta === 0;

		var eLastHorz = horzEdge,
			eMaxPair = null;
		while (eLastHorz.NextInLML !== null && ClipperLib.ClipperBase.IsHorizontal(eLastHorz.NextInLML))
			eLastHorz = eLastHorz.NextInLML;
		if (eLastHorz.NextInLML === null)
			eMaxPair = this.GetMaximaPair(eLastHorz);

		var currMax = this.m_Maxima;
		if (currMax !== null)
		{
			//get the first maxima in range (X) ...
			if (dir === ClipperLib.Direction.dLeftToRight)
			{
				while (currMax !== null && currMax.X <= horzEdge.Bot.X)
				{
					currMax = currMax.Next;
				}
				if (currMax !== null && currMax.X >= eLastHorz.Top.X)
				{
					currMax = null;
				}
			}
			else
			{
				while (currMax.Next !== null && currMax.Next.X < horzEdge.Bot.X)
				{
					currMax = currMax.Next;
				}
				if (currMax.X <= eLastHorz.Top.X)
				{
					currMax = null;
				}
			}
		}
		var op1 = null;
		for (;;) //loop through consec. horizontal edges
		{
			var IsLastHorz = (horzEdge === eLastHorz);
			var e = this.GetNextInAEL(horzEdge, dir);
			while (e !== null)
			{
				//this code block inserts extra coords into horizontal edges (in output
				//polygons) whereever maxima touch these horizontal edges. This helps
				//'simplifying' polygons (ie if the Simplify property is set).
				if (currMax !== null)
				{
					if (dir === ClipperLib.Direction.dLeftToRight)
					{
						while (currMax !== null && currMax.X < e.Curr.X)
						{
							if (horzEdge.OutIdx >= 0 && !IsOpen)
							{
								this.AddOutPt(horzEdge, new ClipperLib.IntPoint2(currMax.X, horzEdge.Bot.Y));
							}
							currMax = currMax.Next;
						}
					}
					else
					{
						while (currMax !== null && currMax.X > e.Curr.X)
						{
							if (horzEdge.OutIdx >= 0 && !IsOpen)
							{
								this.AddOutPt(horzEdge, new ClipperLib.IntPoint2(currMax.X, horzEdge.Bot.Y));
							}
							currMax = currMax.Prev;
						}
					}
				}

				if ((dir === ClipperLib.Direction.dLeftToRight && e.Curr.X > horzRight) || (dir === ClipperLib.Direction.dRightToLeft && e.Curr.X < horzLeft))
				{
					break;
				}

				//Also break if we've got to the end of an intermediate horizontal edge ...
				//nb: Smaller Dx's are to the right of larger Dx's ABOVE the horizontal.
				if (e.Curr.X === horzEdge.Top.X && horzEdge.NextInLML !== null && e.Dx < horzEdge.NextInLML.Dx)
					break;

				if (horzEdge.OutIdx >= 0 && !IsOpen) //note: may be done multiple times
				{
					if (ClipperLib.use_xyz)
					{
						if (dir === ClipperLib.Direction.dLeftToRight)
							this.SetZ(e.Curr, horzEdge, e);
						else this.SetZ(e.Curr, e, horzEdge);
					}

					op1 = this.AddOutPt(horzEdge, e.Curr);
					var eNextHorz = this.m_SortedEdges;
					while (eNextHorz !== null)
					{
						if (eNextHorz.OutIdx >= 0 && this.HorzSegmentsOverlap(horzEdge.Bot.X, horzEdge.Top.X, eNextHorz.Bot.X, eNextHorz.Top.X))
						{
							var op2 = this.GetLastOutPt(eNextHorz);
							this.AddJoin(op2, op1, eNextHorz.Top);
						}
						eNextHorz = eNextHorz.NextInSEL;
					}
					this.AddGhostJoin(op1, horzEdge.Bot);
				}

				//OK, so far we're still in range of the horizontal Edge  but make sure
				//we're at the last of consec. horizontals when matching with eMaxPair
				if (e === eMaxPair && IsLastHorz)
				{
					if (horzEdge.OutIdx >= 0)
					{
						this.AddLocalMaxPoly(horzEdge, eMaxPair, horzEdge.Top);
					}
					this.DeleteFromAEL(horzEdge);
					this.DeleteFromAEL(eMaxPair);
					return;
				}

				if (dir === ClipperLib.Direction.dLeftToRight)
				{
					var Pt = new ClipperLib.IntPoint2(e.Curr.X, horzEdge.Curr.Y);
					this.IntersectEdges(horzEdge, e, Pt);
				}
				else
				{
					var Pt = new ClipperLib.IntPoint2(e.Curr.X, horzEdge.Curr.Y);
					this.IntersectEdges(e, horzEdge, Pt);
				}
				var eNext = this.GetNextInAEL(e, dir);
				this.SwapPositionsInAEL(horzEdge, e);
				e = eNext;
			} //end while(e !== null)

			//Break out of loop if HorzEdge.NextInLML is not also horizontal ...
			if (horzEdge.NextInLML === null || !ClipperLib.ClipperBase.IsHorizontal(horzEdge.NextInLML))
			{
				break;
			}

			horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
			if (horzEdge.OutIdx >= 0)
			{
				this.AddOutPt(horzEdge, horzEdge.Bot);
			}

			$var = {
				Dir: dir,
				Left: horzLeft,
				Right: horzRight
			};

			this.GetHorzDirection(horzEdge, $var);
			dir = $var.Dir;
			horzLeft = $var.Left;
			horzRight = $var.Right;

		} //end for (;;)

		if (horzEdge.OutIdx >= 0 && op1 === null)
		{
			op1 = this.GetLastOutPt(horzEdge);
			var eNextHorz = this.m_SortedEdges;
			while (eNextHorz !== null)
			{
				if (eNextHorz.OutIdx >= 0 && this.HorzSegmentsOverlap(horzEdge.Bot.X, horzEdge.Top.X, eNextHorz.Bot.X, eNextHorz.Top.X))
				{
					var op2 = this.GetLastOutPt(eNextHorz);
					this.AddJoin(op2, op1, eNextHorz.Top);
				}
				eNextHorz = eNextHorz.NextInSEL;
			}
			this.AddGhostJoin(op1, horzEdge.Top);
		}

		if (horzEdge.NextInLML !== null)
		{
			if (horzEdge.OutIdx >= 0)
			{
				op1 = this.AddOutPt(horzEdge, horzEdge.Top);

				horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
				if (horzEdge.WindDelta === 0)
				{
					return;
				}
				//nb: HorzEdge is no longer horizontal here
				var ePrev = horzEdge.PrevInAEL;
				var eNext = horzEdge.NextInAEL;
				if (ePrev !== null && ePrev.Curr.X === horzEdge.Bot.X && ePrev.Curr.Y === horzEdge.Bot.Y && ePrev.WindDelta === 0 && (ePrev.OutIdx >= 0 && ePrev.Curr.Y > ePrev.Top.Y && ClipperLib.ClipperBase.SlopesEqual3(horzEdge, ePrev, this.m_UseFullRange)))
				{
					var op2 = this.AddOutPt(ePrev, horzEdge.Bot);
					this.AddJoin(op1, op2, horzEdge.Top);
				}
				else if (eNext !== null && eNext.Curr.X === horzEdge.Bot.X && eNext.Curr.Y === horzEdge.Bot.Y && eNext.WindDelta !== 0 && eNext.OutIdx >= 0 && eNext.Curr.Y > eNext.Top.Y && ClipperLib.ClipperBase.SlopesEqual3(horzEdge, eNext, this.m_UseFullRange))
				{
					var op2 = this.AddOutPt(eNext, horzEdge.Bot);
					this.AddJoin(op1, op2, horzEdge.Top);
				}
			}
			else
			{
				horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
			}
		}
		else
		{
			if (horzEdge.OutIdx >= 0)
			{
				this.AddOutPt(horzEdge, horzEdge.Top);
			}
			this.DeleteFromAEL(horzEdge);
		}
	};

	ClipperLib.Clipper.prototype.GetNextInAEL = function (e, Direction)
	{
		return Direction === ClipperLib.Direction.dLeftToRight ? e.NextInAEL : e.PrevInAEL;
	};

	ClipperLib.Clipper.prototype.IsMinima = function (e)
	{
		return e !== null && (e.Prev.NextInLML !== e) && (e.Next.NextInLML !== e);
	};

	ClipperLib.Clipper.prototype.IsMaxima = function (e, Y)
	{
		return (e !== null && e.Top.Y === Y && e.NextInLML === null);
	};

	ClipperLib.Clipper.prototype.IsIntermediate = function (e, Y)
	{
		return (e.Top.Y === Y && e.NextInLML !== null);
	};

	ClipperLib.Clipper.prototype.GetMaximaPair = function (e)
	{
		if ((ClipperLib.IntPoint.op_Equality(e.Next.Top, e.Top)) && e.Next.NextInLML === null)
		{
			return e.Next;
		}
		else
		{
			if ((ClipperLib.IntPoint.op_Equality(e.Prev.Top, e.Top)) && e.Prev.NextInLML === null)
			{
				return e.Prev;
			}
			else
			{
				return null;
			}
		}
	};

	ClipperLib.Clipper.prototype.GetMaximaPairEx = function (e)
	{
		//as above but returns null if MaxPair isn't in AEL (unless it's horizontal)
		var result = this.GetMaximaPair(e);
		if (result === null || result.OutIdx === ClipperLib.ClipperBase.Skip ||
			((result.NextInAEL === result.PrevInAEL) && !ClipperLib.ClipperBase.IsHorizontal(result)))
		{
			return null;
		}
		return result;
	};

	ClipperLib.Clipper.prototype.ProcessIntersections = function (topY)
	{
		if (this.m_ActiveEdges === null)
			return true;
		try
		{
			this.BuildIntersectList(topY);
			if (this.m_IntersectList.length === 0)
				return true;
			if (this.m_IntersectList.length === 1 || this.FixupIntersectionOrder())
				this.ProcessIntersectList();
			else
				return false;
		}
		catch ($$e2)
		{
			this.m_SortedEdges = null;
			this.m_IntersectList.length = 0;
			ClipperLib.Error("ProcessIntersections error");
		}
		this.m_SortedEdges = null;
		return true;
	};

	ClipperLib.Clipper.prototype.BuildIntersectList = function (topY)
	{
		if (this.m_ActiveEdges === null)
			return;
		//prepare for sorting ...
		var e = this.m_ActiveEdges;
		//console.log(JSON.stringify(JSON.decycle( e )));
		this.m_SortedEdges = e;
		while (e !== null)
		{
			e.PrevInSEL = e.PrevInAEL;
			e.NextInSEL = e.NextInAEL;
			e.Curr.X = ClipperLib.Clipper.TopX(e, topY);
			e = e.NextInAEL;
		}
		//bubblesort ...
		var isModified = true;
		while (isModified && this.m_SortedEdges !== null)
		{
			isModified = false;
			e = this.m_SortedEdges;
			while (e.NextInSEL !== null)
			{
				var eNext = e.NextInSEL;
				var pt = new ClipperLib.IntPoint0();
				//console.log("e.Curr.X: " + e.Curr.X + " eNext.Curr.X" + eNext.Curr.X);
				if (e.Curr.X > eNext.Curr.X)
				{
					this.IntersectPoint(e, eNext, pt);
					if (pt.Y < topY)
					{
						pt = new ClipperLib.IntPoint2(ClipperLib.Clipper.TopX(e, topY), topY);
					}
					var newNode = new ClipperLib.IntersectNode();
					newNode.Edge1 = e;
					newNode.Edge2 = eNext;
					//newNode.Pt = pt;
					newNode.Pt.X = pt.X;
					newNode.Pt.Y = pt.Y;
					if (ClipperLib.use_xyz) newNode.Pt.Z = pt.Z;
					this.m_IntersectList.push(newNode);
					this.SwapPositionsInSEL(e, eNext);
					isModified = true;
				}
				else
					e = eNext;
			}
			if (e.PrevInSEL !== null)
				e.PrevInSEL.NextInSEL = null;
			else
				break;
		}
		this.m_SortedEdges = null;
	};

	ClipperLib.Clipper.prototype.EdgesAdjacent = function (inode)
	{
		return (inode.Edge1.NextInSEL === inode.Edge2) || (inode.Edge1.PrevInSEL === inode.Edge2);
	};

	ClipperLib.Clipper.IntersectNodeSort = function (node1, node2)
	{
		//the following typecast is safe because the differences in Pt.Y will
		//be limited to the height of the scanbeam.
		return (node2.Pt.Y - node1.Pt.Y);
	};

	ClipperLib.Clipper.prototype.FixupIntersectionOrder = function ()
	{
		//pre-condition: intersections are sorted bottom-most first.
		//Now it's crucial that intersections are made only between adjacent edges,
		//so to ensure this the order of intersections may need adjusting ...
		this.m_IntersectList.sort(this.m_IntersectNodeComparer);
		this.CopyAELToSEL();
		var cnt = this.m_IntersectList.length;
		for (var i = 0; i < cnt; i++)
		{
			if (!this.EdgesAdjacent(this.m_IntersectList[i]))
			{
				var j = i + 1;
				while (j < cnt && !this.EdgesAdjacent(this.m_IntersectList[j]))
					j++;
				if (j === cnt)
					return false;
				var tmp = this.m_IntersectList[i];
				this.m_IntersectList[i] = this.m_IntersectList[j];
				this.m_IntersectList[j] = tmp;
			}
			this.SwapPositionsInSEL(this.m_IntersectList[i].Edge1, this.m_IntersectList[i].Edge2);
		}
		return true;
	};

	ClipperLib.Clipper.prototype.ProcessIntersectList = function ()
	{
		for (var i = 0, ilen = this.m_IntersectList.length; i < ilen; i++)
		{
			var iNode = this.m_IntersectList[i];
			this.IntersectEdges(iNode.Edge1, iNode.Edge2, iNode.Pt);
			this.SwapPositionsInAEL(iNode.Edge1, iNode.Edge2);
		}
		this.m_IntersectList.length = 0;
	};

	/*
	--------------------------------
	Round speedtest: http://jsperf.com/fastest-round
	--------------------------------
	*/
	var R1 = function (a)
	{
		return a < 0 ? Math.ceil(a - 0.5) : Math.round(a)
	};

	var R2 = function (a)
	{
		return a < 0 ? Math.ceil(a - 0.5) : Math.floor(a + 0.5)
	};

	var R3 = function (a)
	{
		return a < 0 ? -Math.round(Math.abs(a)) : Math.round(a)
	};

	var R4 = function (a)
	{
		if (a < 0)
		{
			a -= 0.5;
			return a < -2147483648 ? Math.ceil(a) : a | 0;
		}
		else
		{
			a += 0.5;
			return a > 2147483647 ? Math.floor(a) : a | 0;
		}
	};

	if (browser.msie) ClipperLib.Clipper.Round = R1;
	else if (browser.chromium) ClipperLib.Clipper.Round = R3;
	else if (browser.safari) ClipperLib.Clipper.Round = R4;
	else ClipperLib.Clipper.Round = R2; // eg. browser.chrome || browser.firefox || browser.opera
	ClipperLib.Clipper.TopX = function (edge, currentY)
	{
		//if (edge.Bot == edge.Curr) alert ("edge.Bot = edge.Curr");
		//if (edge.Bot == edge.Top) alert ("edge.Bot = edge.Top");
		if (currentY === edge.Top.Y)
			return edge.Top.X;
		return edge.Bot.X + ClipperLib.Clipper.Round(edge.Dx * (currentY - edge.Bot.Y));
	};

	ClipperLib.Clipper.prototype.IntersectPoint = function (edge1, edge2, ip)
	{
		ip.X = 0;
		ip.Y = 0;
		var b1, b2;
		//nb: with very large coordinate values, it's possible for SlopesEqual() to
		//return false but for the edge.Dx value be equal due to double precision rounding.
		if (edge1.Dx === edge2.Dx)
		{
			ip.Y = edge1.Curr.Y;
			ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
			return;
		}
		if (edge1.Delta.X === 0)
		{
			ip.X = edge1.Bot.X;
			if (ClipperLib.ClipperBase.IsHorizontal(edge2))
			{
				ip.Y = edge2.Bot.Y;
			}
			else
			{
				b2 = edge2.Bot.Y - (edge2.Bot.X / edge2.Dx);
				ip.Y = ClipperLib.Clipper.Round(ip.X / edge2.Dx + b2);
			}
		}
		else if (edge2.Delta.X === 0)
		{
			ip.X = edge2.Bot.X;
			if (ClipperLib.ClipperBase.IsHorizontal(edge1))
			{
				ip.Y = edge1.Bot.Y;
			}
			else
			{
				b1 = edge1.Bot.Y - (edge1.Bot.X / edge1.Dx);
				ip.Y = ClipperLib.Clipper.Round(ip.X / edge1.Dx + b1);
			}
		}
		else
		{
			b1 = edge1.Bot.X - edge1.Bot.Y * edge1.Dx;
			b2 = edge2.Bot.X - edge2.Bot.Y * edge2.Dx;
			var q = (b2 - b1) / (edge1.Dx - edge2.Dx);
			ip.Y = ClipperLib.Clipper.Round(q);
			if (Math.abs(edge1.Dx) < Math.abs(edge2.Dx))
				ip.X = ClipperLib.Clipper.Round(edge1.Dx * q + b1);
			else
				ip.X = ClipperLib.Clipper.Round(edge2.Dx * q + b2);
		}
		if (ip.Y < edge1.Top.Y || ip.Y < edge2.Top.Y)
		{
			if (edge1.Top.Y > edge2.Top.Y)
			{
				ip.Y = edge1.Top.Y;
				ip.X = ClipperLib.Clipper.TopX(edge2, edge1.Top.Y);
				return ip.X < edge1.Top.X;
			}
			else
				ip.Y = edge2.Top.Y;
			if (Math.abs(edge1.Dx) < Math.abs(edge2.Dx))
				ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
			else
				ip.X = ClipperLib.Clipper.TopX(edge2, ip.Y);
		}
		//finally, don't allow 'ip' to be BELOW curr.Y (ie bottom of scanbeam) ...
		if (ip.Y > edge1.Curr.Y)
		{
			ip.Y = edge1.Curr.Y;
			//better to use the more vertical edge to derive X ...
			if (Math.abs(edge1.Dx) > Math.abs(edge2.Dx))
				ip.X = ClipperLib.Clipper.TopX(edge2, ip.Y);
			else
				ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
		}
	};

	ClipperLib.Clipper.prototype.ProcessEdgesAtTopOfScanbeam = function (topY)
	{
		var e = this.m_ActiveEdges;

		while (e !== null)
		{
			//1. process maxima, treating them as if they're 'bent' horizontal edges,
			//   but exclude maxima with horizontal edges. nb: e can't be a horizontal.
			var IsMaximaEdge = this.IsMaxima(e, topY);
			if (IsMaximaEdge)
			{
				var eMaxPair = this.GetMaximaPairEx(e);
				IsMaximaEdge = (eMaxPair === null || !ClipperLib.ClipperBase.IsHorizontal(eMaxPair));
			}
			if (IsMaximaEdge)
			{
				if (this.StrictlySimple)
				{
					this.InsertMaxima(e.Top.X);
				}
				var ePrev = e.PrevInAEL;
				this.DoMaxima(e);
				if (ePrev === null)
					e = this.m_ActiveEdges;
				else
					e = ePrev.NextInAEL;
			}
			else
			{
				//2. promote horizontal edges, otherwise update Curr.X and Curr.Y ...
				if (this.IsIntermediate(e, topY) && ClipperLib.ClipperBase.IsHorizontal(e.NextInLML))
				{
					e = this.UpdateEdgeIntoAEL(e);
					if (e.OutIdx >= 0)
						this.AddOutPt(e, e.Bot);
					this.AddEdgeToSEL(e);
				}
				else
				{
					e.Curr.X = ClipperLib.Clipper.TopX(e, topY);
					e.Curr.Y = topY;
				}

				if (ClipperLib.use_xyz)
				{
					if (e.Top.Y === topY) e.Curr.Z = e.Top.Z;
					else if (e.Bot.Y === topY) e.Curr.Z = e.Bot.Z;
					else e.Curr.Z = 0;
				}

				//When StrictlySimple and 'e' is being touched by another edge, then
				//make sure both edges have a vertex here ...
				if (this.StrictlySimple)
				{
					var ePrev = e.PrevInAEL;
					if ((e.OutIdx >= 0) && (e.WindDelta !== 0) && ePrev !== null &&
						(ePrev.OutIdx >= 0) && (ePrev.Curr.X === e.Curr.X) &&
						(ePrev.WindDelta !== 0))
					{
						var ip = new ClipperLib.IntPoint1(e.Curr);

						if (ClipperLib.use_xyz)
						{
							this.SetZ(ip, ePrev, e);
						}

						var op = this.AddOutPt(ePrev, ip);
						var op2 = this.AddOutPt(e, ip);
						this.AddJoin(op, op2, ip); //StrictlySimple (type-3) join
					}
				}
				e = e.NextInAEL;
			}
		}
		//3. Process horizontals at the Top of the scanbeam ...
		this.ProcessHorizontals();
		this.m_Maxima = null;
		//4. Promote intermediate vertices ...
		e = this.m_ActiveEdges;
		while (e !== null)
		{
			if (this.IsIntermediate(e, topY))
			{
				var op = null;
				if (e.OutIdx >= 0)
					op = this.AddOutPt(e, e.Top);
				e = this.UpdateEdgeIntoAEL(e);
				//if output polygons share an edge, they'll need joining later ...
				var ePrev = e.PrevInAEL;
				var eNext = e.NextInAEL;

				if (ePrev !== null && ePrev.Curr.X === e.Bot.X && ePrev.Curr.Y === e.Bot.Y && op !== null && ePrev.OutIdx >= 0 && ePrev.Curr.Y === ePrev.Top.Y && ClipperLib.ClipperBase.SlopesEqual5(e.Curr, e.Top, ePrev.Curr, ePrev.Top, this.m_UseFullRange) && (e.WindDelta !== 0) && (ePrev.WindDelta !== 0))
				{
					var op2 = this.AddOutPt(ePrev2, e.Bot);
					this.AddJoin(op, op2, e.Top);
				}
				else if (eNext !== null && eNext.Curr.X === e.Bot.X && eNext.Curr.Y === e.Bot.Y && op !== null && eNext.OutIdx >= 0 && eNext.Curr.Y === eNext.Top.Y && ClipperLib.ClipperBase.SlopesEqual5(e.Curr, e.Top, eNext.Curr, eNext.Top, this.m_UseFullRange) && (e.WindDelta !== 0) && (eNext.WindDelta !== 0))
				{
					var op2 = this.AddOutPt(eNext, e.Bot);
					this.AddJoin(op, op2, e.Top);
				}
			}
			e = e.NextInAEL;
		}
	};

	ClipperLib.Clipper.prototype.DoMaxima = function (e)
	{
		var eMaxPair = this.GetMaximaPairEx(e);
		if (eMaxPair === null)
		{
			if (e.OutIdx >= 0)
				this.AddOutPt(e, e.Top);
			this.DeleteFromAEL(e);
			return;
		}
		var eNext = e.NextInAEL;
		while (eNext !== null && eNext !== eMaxPair)
		{
			this.IntersectEdges(e, eNext, e.Top);
			this.SwapPositionsInAEL(e, eNext);
			eNext = e.NextInAEL;
		}
		if (e.OutIdx === -1 && eMaxPair.OutIdx === -1)
		{
			this.DeleteFromAEL(e);
			this.DeleteFromAEL(eMaxPair);
		}
		else if (e.OutIdx >= 0 && eMaxPair.OutIdx >= 0)
		{
			if (e.OutIdx >= 0) this.AddLocalMaxPoly(e, eMaxPair, e.Top);
			this.DeleteFromAEL(e);
			this.DeleteFromAEL(eMaxPair);
		}
		else if (ClipperLib.use_lines && e.WindDelta === 0)
		{
			if (e.OutIdx >= 0)
			{
				this.AddOutPt(e, e.Top);
				e.OutIdx = ClipperLib.ClipperBase.Unassigned;
			}
			this.DeleteFromAEL(e);
			if (eMaxPair.OutIdx >= 0)
			{
				this.AddOutPt(eMaxPair, e.Top);
				eMaxPair.OutIdx = ClipperLib.ClipperBase.Unassigned;
			}
			this.DeleteFromAEL(eMaxPair);
		}
		else
			ClipperLib.Error("DoMaxima error");
	};

	ClipperLib.Clipper.ReversePaths = function (polys)
	{
		for (var i = 0, len = polys.length; i < len; i++)
			polys[i].reverse();
	};

	ClipperLib.Clipper.Orientation = function (poly)
	{
		return ClipperLib.Clipper.Area(poly) >= 0;
	};

	ClipperLib.Clipper.prototype.PointCount = function (pts)
	{
		if (pts === null)
			return 0;
		var result = 0;
		var p = pts;
		do {
			result++;
			p = p.Next;
		}
		while (p !== pts)
		return result;
	};

	ClipperLib.Clipper.prototype.BuildResult = function (polyg)
	{
		ClipperLib.Clear(polyg);
		for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
		{
			var outRec = this.m_PolyOuts[i];
			if (outRec.Pts === null)
				continue;
			var p = outRec.Pts.Prev;
			var cnt = this.PointCount(p);
			if (cnt < 2)
				continue;
			var pg = new Array(cnt);
			for (var j = 0; j < cnt; j++)
			{
				pg[j] = p.Pt;
				p = p.Prev;
			}
			polyg.push(pg);
		}
	};

	ClipperLib.Clipper.prototype.BuildResult2 = function (polytree)
	{
		polytree.Clear();
		//add each output polygon/contour to polytree ...
		//polytree.m_AllPolys.set_Capacity(this.m_PolyOuts.length);
		for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
		{
			var outRec = this.m_PolyOuts[i];
			var cnt = this.PointCount(outRec.Pts);
			if ((outRec.IsOpen && cnt < 2) || (!outRec.IsOpen && cnt < 3))
				continue;
			this.FixHoleLinkage(outRec);
			var pn = new ClipperLib.PolyNode();
			polytree.m_AllPolys.push(pn);
			outRec.PolyNode = pn;
			pn.m_polygon.length = cnt;
			var op = outRec.Pts.Prev;
			for (var j = 0; j < cnt; j++)
			{
				pn.m_polygon[j] = op.Pt;
				op = op.Prev;
			}
		}
		//fixup PolyNode links etc ...
		//polytree.m_Childs.set_Capacity(this.m_PolyOuts.length);
		for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
		{
			var outRec = this.m_PolyOuts[i];
			if (outRec.PolyNode === null)
				continue;
			else if (outRec.IsOpen)
			{
				outRec.PolyNode.IsOpen = true;
				polytree.AddChild(outRec.PolyNode);
			}
			else if (outRec.FirstLeft !== null && outRec.FirstLeft.PolyNode !== null)
				outRec.FirstLeft.PolyNode.AddChild(outRec.PolyNode);
			else
				polytree.AddChild(outRec.PolyNode);
		}
	};

	ClipperLib.Clipper.prototype.FixupOutPolyline = function (outRec)
	{
		var pp = outRec.Pts;
		var lastPP = pp.Prev;
		while (pp !== lastPP)
		{
			pp = pp.Next;
			if (ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Prev.Pt))
			{
				if (pp === lastPP)
				{
					lastPP = pp.Prev;
				}
				var tmpPP = pp.Prev;
				tmpPP.Next = pp.Next;
				pp.Next.Prev = tmpPP;
				pp = tmpPP;
			}
		}
		if (pp === pp.Prev)
		{
			outRec.Pts = null;
		}
	};

	ClipperLib.Clipper.prototype.FixupOutPolygon = function (outRec)
	{
		//FixupOutPolygon() - removes duplicate points and simplifies consecutive
		//parallel edges by removing the middle vertex.
		var lastOK = null;
		outRec.BottomPt = null;
		var pp = outRec.Pts;
		var preserveCol = this.PreserveCollinear || this.StrictlySimple;
		for (;;)
		{
			if (pp.Prev === pp || pp.Prev === pp.Next)
			{
				outRec.Pts = null;
				return;
			}

			//test for duplicate points and collinear edges ...
			if ((ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Next.Pt)) || (ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Prev.Pt)) || (ClipperLib.ClipperBase.SlopesEqual4(pp.Prev.Pt, pp.Pt, pp.Next.Pt, this.m_UseFullRange) && (!preserveCol || !this.Pt2IsBetweenPt1AndPt3(pp.Prev.Pt, pp.Pt, pp.Next.Pt))))
			{
				lastOK = null;
				pp.Prev.Next = pp.Next;
				pp.Next.Prev = pp.Prev;
				pp = pp.Prev;
			}
			else if (pp === lastOK)
				break;
			else
			{
				if (lastOK === null)
					lastOK = pp;
				pp = pp.Next;
			}
		}
		outRec.Pts = pp;
	};

	ClipperLib.Clipper.prototype.DupOutPt = function (outPt, InsertAfter)
	{
		var result = new ClipperLib.OutPt();
		//result.Pt = outPt.Pt;
		result.Pt.X = outPt.Pt.X;
		result.Pt.Y = outPt.Pt.Y;
		if (ClipperLib.use_xyz) result.Pt.Z = outPt.Pt.Z;
		result.Idx = outPt.Idx;
		if (InsertAfter)
		{
			result.Next = outPt.Next;
			result.Prev = outPt;
			outPt.Next.Prev = result;
			outPt.Next = result;
		}
		else
		{
			result.Prev = outPt.Prev;
			result.Next = outPt;
			outPt.Prev.Next = result;
			outPt.Prev = result;
		}
		return result;
	};

	ClipperLib.Clipper.prototype.GetOverlap = function (a1, a2, b1, b2, $val)
	{
		if (a1 < a2)
		{
			if (b1 < b2)
			{
				$val.Left = Math.max(a1, b1);
				$val.Right = Math.min(a2, b2);
			}
			else
			{
				$val.Left = Math.max(a1, b2);
				$val.Right = Math.min(a2, b1);
			}
		}
		else
		{
			if (b1 < b2)
			{
				$val.Left = Math.max(a2, b1);
				$val.Right = Math.min(a1, b2);
			}
			else
			{
				$val.Left = Math.max(a2, b2);
				$val.Right = Math.min(a1, b1);
			}
		}
		return $val.Left < $val.Right;
	};

	ClipperLib.Clipper.prototype.JoinHorz = function (op1, op1b, op2, op2b, Pt, DiscardLeft)
	{
		var Dir1 = (op1.Pt.X > op1b.Pt.X ? ClipperLib.Direction.dRightToLeft : ClipperLib.Direction.dLeftToRight);
		var Dir2 = (op2.Pt.X > op2b.Pt.X ? ClipperLib.Direction.dRightToLeft : ClipperLib.Direction.dLeftToRight);
		if (Dir1 === Dir2)
			return false;
		//When DiscardLeft, we want Op1b to be on the Left of Op1, otherwise we
		//want Op1b to be on the Right. (And likewise with Op2 and Op2b.)
		//So, to facilitate this while inserting Op1b and Op2b ...
		//when DiscardLeft, make sure we're AT or RIGHT of Pt before adding Op1b,
		//otherwise make sure we're AT or LEFT of Pt. (Likewise with Op2b.)
		if (Dir1 === ClipperLib.Direction.dLeftToRight)
		{
			while (op1.Next.Pt.X <= Pt.X &&
				op1.Next.Pt.X >= op1.Pt.X && op1.Next.Pt.Y === Pt.Y)
				op1 = op1.Next;
			if (DiscardLeft && (op1.Pt.X !== Pt.X))
				op1 = op1.Next;
			op1b = this.DupOutPt(op1, !DiscardLeft);
			if (ClipperLib.IntPoint.op_Inequality(op1b.Pt, Pt))
			{
				op1 = op1b;
				//op1.Pt = Pt;
				op1.Pt.X = Pt.X;
				op1.Pt.Y = Pt.Y;
				if (ClipperLib.use_xyz) op1.Pt.Z = Pt.Z;
				op1b = this.DupOutPt(op1, !DiscardLeft);
			}
		}
		else
		{
			while (op1.Next.Pt.X >= Pt.X &&
				op1.Next.Pt.X <= op1.Pt.X && op1.Next.Pt.Y === Pt.Y)
				op1 = op1.Next;
			if (!DiscardLeft && (op1.Pt.X !== Pt.X))
				op1 = op1.Next;
			op1b = this.DupOutPt(op1, DiscardLeft);
			if (ClipperLib.IntPoint.op_Inequality(op1b.Pt, Pt))
			{
				op1 = op1b;
				//op1.Pt = Pt;
				op1.Pt.X = Pt.X;
				op1.Pt.Y = Pt.Y;
				if (ClipperLib.use_xyz) op1.Pt.Z = Pt.Z;
				op1b = this.DupOutPt(op1, DiscardLeft);
			}
		}
		if (Dir2 === ClipperLib.Direction.dLeftToRight)
		{
			while (op2.Next.Pt.X <= Pt.X &&
				op2.Next.Pt.X >= op2.Pt.X && op2.Next.Pt.Y === Pt.Y)
				op2 = op2.Next;
			if (DiscardLeft && (op2.Pt.X !== Pt.X))
				op2 = op2.Next;
			op2b = this.DupOutPt(op2, !DiscardLeft);
			if (ClipperLib.IntPoint.op_Inequality(op2b.Pt, Pt))
			{
				op2 = op2b;
				//op2.Pt = Pt;
				op2.Pt.X = Pt.X;
				op2.Pt.Y = Pt.Y;
				if (ClipperLib.use_xyz) op2.Pt.Z = Pt.Z;
				op2b = this.DupOutPt(op2, !DiscardLeft);
			}
		}
		else
		{
			while (op2.Next.Pt.X >= Pt.X &&
				op2.Next.Pt.X <= op2.Pt.X && op2.Next.Pt.Y === Pt.Y)
				op2 = op2.Next;
			if (!DiscardLeft && (op2.Pt.X !== Pt.X))
				op2 = op2.Next;
			op2b = this.DupOutPt(op2, DiscardLeft);
			if (ClipperLib.IntPoint.op_Inequality(op2b.Pt, Pt))
			{
				op2 = op2b;
				//op2.Pt = Pt;
				op2.Pt.X = Pt.X;
				op2.Pt.Y = Pt.Y;
				if (ClipperLib.use_xyz) op2.Pt.Z = Pt.Z;
				op2b = this.DupOutPt(op2, DiscardLeft);
			}
		}
		if ((Dir1 === ClipperLib.Direction.dLeftToRight) === DiscardLeft)
		{
			op1.Prev = op2;
			op2.Next = op1;
			op1b.Next = op2b;
			op2b.Prev = op1b;
		}
		else
		{
			op1.Next = op2;
			op2.Prev = op1;
			op1b.Prev = op2b;
			op2b.Next = op1b;
		}
		return true;
	};

	ClipperLib.Clipper.prototype.JoinPoints = function (j, outRec1, outRec2)
	{
		var op1 = j.OutPt1,
			op1b = new ClipperLib.OutPt();
		var op2 = j.OutPt2,
			op2b = new ClipperLib.OutPt();
		//There are 3 kinds of joins for output polygons ...
		//1. Horizontal joins where Join.OutPt1 & Join.OutPt2 are vertices anywhere
		//along (horizontal) collinear edges (& Join.OffPt is on the same horizontal).
		//2. Non-horizontal joins where Join.OutPt1 & Join.OutPt2 are at the same
		//location at the Bottom of the overlapping segment (& Join.OffPt is above).
		//3. StrictlySimple joins where edges touch but are not collinear and where
		//Join.OutPt1, Join.OutPt2 & Join.OffPt all share the same point.
		var isHorizontal = (j.OutPt1.Pt.Y === j.OffPt.Y);
		if (isHorizontal && (ClipperLib.IntPoint.op_Equality(j.OffPt, j.OutPt1.Pt)) && (ClipperLib.IntPoint.op_Equality(j.OffPt, j.OutPt2.Pt)))
		{
			//Strictly Simple join ...
			if (outRec1 !== outRec2) return false;

			op1b = j.OutPt1.Next;
			while (op1b !== op1 && (ClipperLib.IntPoint.op_Equality(op1b.Pt, j.OffPt)))
				op1b = op1b.Next;
			var reverse1 = (op1b.Pt.Y > j.OffPt.Y);
			op2b = j.OutPt2.Next;
			while (op2b !== op2 && (ClipperLib.IntPoint.op_Equality(op2b.Pt, j.OffPt)))
				op2b = op2b.Next;
			var reverse2 = (op2b.Pt.Y > j.OffPt.Y);
			if (reverse1 === reverse2)
				return false;
			if (reverse1)
			{
				op1b = this.DupOutPt(op1, false);
				op2b = this.DupOutPt(op2, true);
				op1.Prev = op2;
				op2.Next = op1;
				op1b.Next = op2b;
				op2b.Prev = op1b;
				j.OutPt1 = op1;
				j.OutPt2 = op1b;
				return true;
			}
			else
			{
				op1b = this.DupOutPt(op1, true);
				op2b = this.DupOutPt(op2, false);
				op1.Next = op2;
				op2.Prev = op1;
				op1b.Prev = op2b;
				op2b.Next = op1b;
				j.OutPt1 = op1;
				j.OutPt2 = op1b;
				return true;
			}
		}
		else if (isHorizontal)
		{
			//treat horizontal joins differently to non-horizontal joins since with
			//them we're not yet sure where the overlapping is. OutPt1.Pt & OutPt2.Pt
			//may be anywhere along the horizontal edge.
			op1b = op1;
			while (op1.Prev.Pt.Y === op1.Pt.Y && op1.Prev !== op1b && op1.Prev !== op2)
				op1 = op1.Prev;
			while (op1b.Next.Pt.Y === op1b.Pt.Y && op1b.Next !== op1 && op1b.Next !== op2)
				op1b = op1b.Next;
			if (op1b.Next === op1 || op1b.Next === op2)
				return false;
			//a flat 'polygon'
			op2b = op2;
			while (op2.Prev.Pt.Y === op2.Pt.Y && op2.Prev !== op2b && op2.Prev !== op1b)
				op2 = op2.Prev;
			while (op2b.Next.Pt.Y === op2b.Pt.Y && op2b.Next !== op2 && op2b.Next !== op1)
				op2b = op2b.Next;
			if (op2b.Next === op2 || op2b.Next === op1)
				return false;
			//a flat 'polygon'
			//Op1 -. Op1b & Op2 -. Op2b are the extremites of the horizontal edges

			var $val = {
				Left: null,
				Right: null
			};

			if (!this.GetOverlap(op1.Pt.X, op1b.Pt.X, op2.Pt.X, op2b.Pt.X, $val))
				return false;
			var Left = $val.Left;
			var Right = $val.Right;

			//DiscardLeftSide: when overlapping edges are joined, a spike will created
			//which needs to be cleaned up. However, we don't want Op1 or Op2 caught up
			//on the discard Side as either may still be needed for other joins ...
			var Pt = new ClipperLib.IntPoint0();
			var DiscardLeftSide;
			if (op1.Pt.X >= Left && op1.Pt.X <= Right)
			{
				//Pt = op1.Pt;
				Pt.X = op1.Pt.X;
				Pt.Y = op1.Pt.Y;
				if (ClipperLib.use_xyz) Pt.Z = op1.Pt.Z;
				DiscardLeftSide = (op1.Pt.X > op1b.Pt.X);
			}
			else if (op2.Pt.X >= Left && op2.Pt.X <= Right)
			{
				//Pt = op2.Pt;
				Pt.X = op2.Pt.X;
				Pt.Y = op2.Pt.Y;
				if (ClipperLib.use_xyz) Pt.Z = op2.Pt.Z;
				DiscardLeftSide = (op2.Pt.X > op2b.Pt.X);
			}
			else if (op1b.Pt.X >= Left && op1b.Pt.X <= Right)
			{
				//Pt = op1b.Pt;
				Pt.X = op1b.Pt.X;
				Pt.Y = op1b.Pt.Y;
				if (ClipperLib.use_xyz) Pt.Z = op1b.Pt.Z;
				DiscardLeftSide = op1b.Pt.X > op1.Pt.X;
			}
			else
			{
				//Pt = op2b.Pt;
				Pt.X = op2b.Pt.X;
				Pt.Y = op2b.Pt.Y;
				if (ClipperLib.use_xyz) Pt.Z = op2b.Pt.Z;
				DiscardLeftSide = (op2b.Pt.X > op2.Pt.X);
			}
			j.OutPt1 = op1;
			j.OutPt2 = op2;
			return this.JoinHorz(op1, op1b, op2, op2b, Pt, DiscardLeftSide);
		}
		else
		{
			//nb: For non-horizontal joins ...
			//    1. Jr.OutPt1.Pt.Y == Jr.OutPt2.Pt.Y
			//    2. Jr.OutPt1.Pt > Jr.OffPt.Y
			//make sure the polygons are correctly oriented ...
			op1b = op1.Next;
			while ((ClipperLib.IntPoint.op_Equality(op1b.Pt, op1.Pt)) && (op1b !== op1))
				op1b = op1b.Next;
			var Reverse1 = ((op1b.Pt.Y > op1.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual4(op1.Pt, op1b.Pt, j.OffPt, this.m_UseFullRange));
			if (Reverse1)
			{
				op1b = op1.Prev;
				while ((ClipperLib.IntPoint.op_Equality(op1b.Pt, op1.Pt)) && (op1b !== op1))
					op1b = op1b.Prev;

				if ((op1b.Pt.Y > op1.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual4(op1.Pt, op1b.Pt, j.OffPt, this.m_UseFullRange))
					return false;
			}
			op2b = op2.Next;
			while ((ClipperLib.IntPoint.op_Equality(op2b.Pt, op2.Pt)) && (op2b !== op2))
				op2b = op2b.Next;

			var Reverse2 = ((op2b.Pt.Y > op2.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual4(op2.Pt, op2b.Pt, j.OffPt, this.m_UseFullRange));
			if (Reverse2)
			{
				op2b = op2.Prev;
				while ((ClipperLib.IntPoint.op_Equality(op2b.Pt, op2.Pt)) && (op2b !== op2))
					op2b = op2b.Prev;

				if ((op2b.Pt.Y > op2.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual4(op2.Pt, op2b.Pt, j.OffPt, this.m_UseFullRange))
					return false;
			}
			if ((op1b === op1) || (op2b === op2) || (op1b === op2b) ||
				((outRec1 === outRec2) && (Reverse1 === Reverse2)))
				return false;
			if (Reverse1)
			{
				op1b = this.DupOutPt(op1, false);
				op2b = this.DupOutPt(op2, true);
				op1.Prev = op2;
				op2.Next = op1;
				op1b.Next = op2b;
				op2b.Prev = op1b;
				j.OutPt1 = op1;
				j.OutPt2 = op1b;
				return true;
			}
			else
			{
				op1b = this.DupOutPt(op1, true);
				op2b = this.DupOutPt(op2, false);
				op1.Next = op2;
				op2.Prev = op1;
				op1b.Prev = op2b;
				op2b.Next = op1b;
				j.OutPt1 = op1;
				j.OutPt2 = op1b;
				return true;
			}
		}
	};

	ClipperLib.Clipper.GetBounds = function (paths)
	{
		var i = 0,
			cnt = paths.length;
		while (i < cnt && paths[i].length === 0) i++;
		if (i === cnt) return new ClipperLib.IntRect(0, 0, 0, 0);
		var result = new ClipperLib.IntRect();
		result.left = paths[i][0].X;
		result.right = result.left;
		result.top = paths[i][0].Y;
		result.bottom = result.top;
		for (; i < cnt; i++)
			for (var j = 0, jlen = paths[i].length; j < jlen; j++)
			{
				if (paths[i][j].X < result.left) result.left = paths[i][j].X;
				else if (paths[i][j].X > result.right) result.right = paths[i][j].X;
				if (paths[i][j].Y < result.top) result.top = paths[i][j].Y;
				else if (paths[i][j].Y > result.bottom) result.bottom = paths[i][j].Y;
			}
		return result;
	}
	ClipperLib.Clipper.prototype.GetBounds2 = function (ops)
	{
		var opStart = ops;
		var result = new ClipperLib.IntRect();
		result.left = ops.Pt.X;
		result.right = ops.Pt.X;
		result.top = ops.Pt.Y;
		result.bottom = ops.Pt.Y;
		ops = ops.Next;
		while (ops !== opStart)
		{
			if (ops.Pt.X < result.left)
				result.left = ops.Pt.X;
			if (ops.Pt.X > result.right)
				result.right = ops.Pt.X;
			if (ops.Pt.Y < result.top)
				result.top = ops.Pt.Y;
			if (ops.Pt.Y > result.bottom)
				result.bottom = ops.Pt.Y;
			ops = ops.Next;
		}
		return result;
	};

	ClipperLib.Clipper.PointInPolygon = function (pt, path)
	{
		//returns 0 if false, +1 if true, -1 if pt ON polygon boundary
		//See "The Point in Polygon Problem for Arbitrary Polygons" by Hormann & Agathos
		//http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.88.5498&rep=rep1&type=pdf
		var result = 0,
			cnt = path.length;
		if (cnt < 3)
			return 0;
		var ip = path[0];
		for (var i = 1; i <= cnt; ++i)
		{
			var ipNext = (i === cnt ? path[0] : path[i]);
			if (ipNext.Y === pt.Y)
			{
				if ((ipNext.X === pt.X) || (ip.Y === pt.Y && ((ipNext.X > pt.X) === (ip.X < pt.X))))
					return -1;
			}
			if ((ip.Y < pt.Y) !== (ipNext.Y < pt.Y))
			{
				if (ip.X >= pt.X)
				{
					if (ipNext.X > pt.X)
						result = 1 - result;
					else
					{
						var d = (ip.X - pt.X) * (ipNext.Y - pt.Y) - (ipNext.X - pt.X) * (ip.Y - pt.Y);
						if (d === 0)
							return -1;
						else if ((d > 0) === (ipNext.Y > ip.Y))
							result = 1 - result;
					}
				}
				else
				{
					if (ipNext.X > pt.X)
					{
						var d = (ip.X - pt.X) * (ipNext.Y - pt.Y) - (ipNext.X - pt.X) * (ip.Y - pt.Y);
						if (d === 0)
							return -1;
						else if ((d > 0) === (ipNext.Y > ip.Y))
							result = 1 - result;
					}
				}
			}
			ip = ipNext;
		}
		return result;
	};

	ClipperLib.Clipper.prototype.PointInPolygon = function (pt, op)
	{
		//returns 0 if false, +1 if true, -1 if pt ON polygon boundary
		var result = 0;
		var startOp = op;
		var ptx = pt.X,
			pty = pt.Y;
		var poly0x = op.Pt.X,
			poly0y = op.Pt.Y;
		do {
			op = op.Next;
			var poly1x = op.Pt.X,
				poly1y = op.Pt.Y;
			if (poly1y === pty)
			{
				if ((poly1x === ptx) || (poly0y === pty && ((poly1x > ptx) === (poly0x < ptx))))
					return -1;
			}
			if ((poly0y < pty) !== (poly1y < pty))
			{
				if (poly0x >= ptx)
				{
					if (poly1x > ptx)
						result = 1 - result;
					else
					{
						var d = (poly0x - ptx) * (poly1y - pty) - (poly1x - ptx) * (poly0y - pty);
						if (d === 0)
							return -1;
						if ((d > 0) === (poly1y > poly0y))
							result = 1 - result;
					}
				}
				else
				{
					if (poly1x > ptx)
					{
						var d = (poly0x - ptx) * (poly1y - pty) - (poly1x - ptx) * (poly0y - pty);
						if (d === 0)
							return -1;
						if ((d > 0) === (poly1y > poly0y))
							result = 1 - result;
					}
				}
			}
			poly0x = poly1x;
			poly0y = poly1y;
		} while (startOp !== op);

		return result;
	};

	ClipperLib.Clipper.prototype.Poly2ContainsPoly1 = function (outPt1, outPt2)
	{
		var op = outPt1;
		do {
			//nb: PointInPolygon returns 0 if false, +1 if true, -1 if pt on polygon
			var res = this.PointInPolygon(op.Pt, outPt2);
			if (res >= 0)
				return res > 0;
			op = op.Next;
		}
		while (op !== outPt1)
		return true;
	};

	ClipperLib.Clipper.prototype.FixupFirstLefts1 = function (OldOutRec, NewOutRec)
	{
		var outRec, firstLeft;
		for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
		{
			outRec = this.m_PolyOuts[i];
			firstLeft = ClipperLib.Clipper.ParseFirstLeft(outRec.FirstLeft);
			if (outRec.Pts !== null && firstLeft === OldOutRec)
			{
				if (this.Poly2ContainsPoly1(outRec.Pts, NewOutRec.Pts))
					outRec.FirstLeft = NewOutRec;
			}
		}
	}

	ClipperLib.Clipper.prototype.FixupFirstLefts2 = function (innerOutRec, outerOutRec)
	{
		//A polygon has split into two such that one is now the inner of the other.
		//It's possible that these polygons now wrap around other polygons, so check
		//every polygon that's also contained by OuterOutRec's FirstLeft container
		//(including nil) to see if they've become inner to the new inner polygon ...
		var orfl = outerOutRec.FirstLeft;
		var outRec, firstLeft;
		for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
		{
			outRec = this.m_PolyOuts[i];
			if (outRec.Pts === null || outRec === outerOutRec || outRec === innerOutRec)
				continue;
			firstLeft = ClipperLib.Clipper.ParseFirstLeft(outRec.FirstLeft);
			if (firstLeft !== orfl && firstLeft !== innerOutRec && firstLeft !== outerOutRec)
				continue;
			if (this.Poly2ContainsPoly1(outRec.Pts, innerOutRec.Pts))
				outRec.FirstLeft = innerOutRec;
			else if (this.Poly2ContainsPoly1(outRec.Pts, outerOutRec.Pts))
				outRec.FirstLeft = outerOutRec;
			else if (outRec.FirstLeft === innerOutRec || outRec.FirstLeft === outerOutRec)
				outRec.FirstLeft = orfl;
		}
	}

	ClipperLib.Clipper.prototype.FixupFirstLefts3 = function (OldOutRec, NewOutRec)
	{
		//same as FixupFirstLefts1 but doesn't call Poly2ContainsPoly1()
		var outRec;
		var firstLeft;
		for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
		{
			outRec = this.m_PolyOuts[i];
			firstLeft = ClipperLib.Clipper.ParseFirstLeft(outRec.FirstLeft);
			if (outRec.Pts !== null && firstLeft === OldOutRec)
				outRec.FirstLeft = NewOutRec;
		}
	}

	ClipperLib.Clipper.ParseFirstLeft = function (FirstLeft)
	{
		while (FirstLeft !== null && FirstLeft.Pts === null)
			FirstLeft = FirstLeft.FirstLeft;
		return FirstLeft;
	};

	ClipperLib.Clipper.prototype.JoinCommonEdges = function ()
	{
		for (var i = 0, ilen = this.m_Joins.length; i < ilen; i++)
		{
			var join = this.m_Joins[i];
			var outRec1 = this.GetOutRec(join.OutPt1.Idx);
			var outRec2 = this.GetOutRec(join.OutPt2.Idx);
			if (outRec1.Pts === null || outRec2.Pts === null)
				continue;

			if (outRec1.IsOpen || outRec2.IsOpen)
			{
				continue;
			}

			//get the polygon fragment with the correct hole state (FirstLeft)
			//before calling JoinPoints() ...
			var holeStateRec;
			if (outRec1 === outRec2)
				holeStateRec = outRec1;
			else if (this.OutRec1RightOfOutRec2(outRec1, outRec2))
				holeStateRec = outRec2;
			else if (this.OutRec1RightOfOutRec2(outRec2, outRec1))
				holeStateRec = outRec1;
			else
				holeStateRec = this.GetLowermostRec(outRec1, outRec2);

			if (!this.JoinPoints(join, outRec1, outRec2)) continue;

			if (outRec1 === outRec2)
			{
				//instead of joining two polygons, we've just created a new one by
				//splitting one polygon into two.
				outRec1.Pts = join.OutPt1;
				outRec1.BottomPt = null;
				outRec2 = this.CreateOutRec();
				outRec2.Pts = join.OutPt2;
				//update all OutRec2.Pts Idx's ...
				this.UpdateOutPtIdxs(outRec2);

				if (this.Poly2ContainsPoly1(outRec2.Pts, outRec1.Pts))
				{
					//outRec1 contains outRec2 ...
					outRec2.IsHole = !outRec1.IsHole;
					outRec2.FirstLeft = outRec1;
					if (this.m_UsingPolyTree)
						this.FixupFirstLefts2(outRec2, outRec1);
					if ((outRec2.IsHole ^ this.ReverseSolution) == (this.Area$1(outRec2) > 0))
						this.ReversePolyPtLinks(outRec2.Pts);
				}
				else if (this.Poly2ContainsPoly1(outRec1.Pts, outRec2.Pts))
				{
					//outRec2 contains outRec1 ...
					outRec2.IsHole = outRec1.IsHole;
					outRec1.IsHole = !outRec2.IsHole;
					outRec2.FirstLeft = outRec1.FirstLeft;
					outRec1.FirstLeft = outRec2;
					if (this.m_UsingPolyTree)
						this.FixupFirstLefts2(outRec1, outRec2);

					if ((outRec1.IsHole ^ this.ReverseSolution) == (this.Area$1(outRec1) > 0))
						this.ReversePolyPtLinks(outRec1.Pts);
				}
				else
				{
					//the 2 polygons are completely separate ...
					outRec2.IsHole = outRec1.IsHole;
					outRec2.FirstLeft = outRec1.FirstLeft;
					//fixup FirstLeft pointers that may need reassigning to OutRec2
					if (this.m_UsingPolyTree)
						this.FixupFirstLefts1(outRec1, outRec2);
				}
			}
			else
			{
				//joined 2 polygons together ...
				outRec2.Pts = null;
				outRec2.BottomPt = null;
				outRec2.Idx = outRec1.Idx;
				outRec1.IsHole = holeStateRec.IsHole;
				if (holeStateRec === outRec2)
					outRec1.FirstLeft = outRec2.FirstLeft;
				outRec2.FirstLeft = outRec1;
				//fixup FirstLeft pointers that may need reassigning to OutRec1
				if (this.m_UsingPolyTree)
					this.FixupFirstLefts3(outRec2, outRec1);
			}
		}
	};

	ClipperLib.Clipper.prototype.UpdateOutPtIdxs = function (outrec)
	{
		var op = outrec.Pts;
		do {
			op.Idx = outrec.Idx;
			op = op.Prev;
		}
		while (op !== outrec.Pts)
	};

	ClipperLib.Clipper.prototype.DoSimplePolygons = function ()
	{
		var i = 0;
		while (i < this.m_PolyOuts.length)
		{
			var outrec = this.m_PolyOuts[i++];
			var op = outrec.Pts;
			if (op === null || outrec.IsOpen)
				continue;
			do //for each Pt in Polygon until duplicate found do ...
			{
				var op2 = op.Next;
				while (op2 !== outrec.Pts)
				{
					if ((ClipperLib.IntPoint.op_Equality(op.Pt, op2.Pt)) && op2.Next !== op && op2.Prev !== op)
					{
						//split the polygon into two ...
						var op3 = op.Prev;
						var op4 = op2.Prev;
						op.Prev = op4;
						op4.Next = op;
						op2.Prev = op3;
						op3.Next = op2;
						outrec.Pts = op;
						var outrec2 = this.CreateOutRec();
						outrec2.Pts = op2;
						this.UpdateOutPtIdxs(outrec2);
						if (this.Poly2ContainsPoly1(outrec2.Pts, outrec.Pts))
						{
							//OutRec2 is contained by OutRec1 ...
							outrec2.IsHole = !outrec.IsHole;
							outrec2.FirstLeft = outrec;
							if (this.m_UsingPolyTree) this.FixupFirstLefts2(outrec2, outrec);

						}
						else if (this.Poly2ContainsPoly1(outrec.Pts, outrec2.Pts))
						{
							//OutRec1 is contained by OutRec2 ...
							outrec2.IsHole = outrec.IsHole;
							outrec.IsHole = !outrec2.IsHole;
							outrec2.FirstLeft = outrec.FirstLeft;
							outrec.FirstLeft = outrec2;
							if (this.m_UsingPolyTree) this.FixupFirstLefts2(outrec, outrec2);
						}
						else
						{
							//the 2 polygons are separate ...
							outrec2.IsHole = outrec.IsHole;
							outrec2.FirstLeft = outrec.FirstLeft;
							if (this.m_UsingPolyTree) this.FixupFirstLefts1(outrec, outrec2);
						}
						op2 = op;
						//ie get ready for the next iteration
					}
					op2 = op2.Next;
				}
				op = op.Next;
			}
			while (op !== outrec.Pts)
		}
	};

	ClipperLib.Clipper.Area = function (poly)
	{
		if (!Array.isArray(poly))
			return 0;
		var cnt = poly.length;
		if (cnt < 3)
			return 0;
		var a = 0;
		for (var i = 0, j = cnt - 1; i < cnt; ++i)
		{
			a += (poly[j].X + poly[i].X) * (poly[j].Y - poly[i].Y);
			j = i;
		}
		return -a * 0.5;
	};

	ClipperLib.Clipper.prototype.Area = function (op)
	{
		var opFirst = op;
		if (op === null) return 0;
		var a = 0;
		do {
			a = a + (op.Prev.Pt.X + op.Pt.X) * (op.Prev.Pt.Y - op.Pt.Y);
			op = op.Next;
		} while (op !== opFirst); // && typeof op !== 'undefined');
		return a * 0.5;
	}

	ClipperLib.Clipper.prototype.Area$1 = function (outRec)
	{
		return this.Area(outRec.Pts);
	};

	ClipperLib.Clipper.SimplifyPolygon = function (poly, fillType)
	{
		var result = new Array();
		var c = new ClipperLib.Clipper(0);
		c.StrictlySimple = true;
		c.AddPath(poly, ClipperLib.PolyType.ptSubject, true);
		c.Execute(ClipperLib.ClipType.ctUnion, result, fillType, fillType);
		return result;
	};

	ClipperLib.Clipper.SimplifyPolygons = function (polys, fillType)
	{
		if (typeof (fillType) === "undefined") fillType = ClipperLib.PolyFillType.pftEvenOdd;
		var result = new Array();
		var c = new ClipperLib.Clipper(0);
		c.StrictlySimple = true;
		c.AddPaths(polys, ClipperLib.PolyType.ptSubject, true);
		c.Execute(ClipperLib.ClipType.ctUnion, result, fillType, fillType);
		return result;
	};

	ClipperLib.Clipper.DistanceSqrd = function (pt1, pt2)
	{
		var dx = (pt1.X - pt2.X);
		var dy = (pt1.Y - pt2.Y);
		return (dx * dx + dy * dy);
	};

	ClipperLib.Clipper.DistanceFromLineSqrd = function (pt, ln1, ln2)
	{
		//The equation of a line in general form (Ax + By + C = 0)
		//given 2 points (x¹,y¹) & (x²,y²) is ...
		//(y¹ - y²)x + (x² - x¹)y + (y² - y¹)x¹ - (x² - x¹)y¹ = 0
		//A = (y¹ - y²); B = (x² - x¹); C = (y² - y¹)x¹ - (x² - x¹)y¹
		//perpendicular distance of point (x³,y³) = (Ax³ + By³ + C)/Sqrt(A² + B²)
		//see http://en.wikipedia.org/wiki/Perpendicular_distance
		var A = ln1.Y - ln2.Y;
		var B = ln2.X - ln1.X;
		var C = A * ln1.X + B * ln1.Y;
		C = A * pt.X + B * pt.Y - C;
		return (C * C) / (A * A + B * B);
	};

	ClipperLib.Clipper.SlopesNearCollinear = function (pt1, pt2, pt3, distSqrd)
	{
		//this function is more accurate when the point that's GEOMETRICALLY
		//between the other 2 points is the one that's tested for distance.
		//nb: with 'spikes', either pt1 or pt3 is geometrically between the other pts
		if (Math.abs(pt1.X - pt2.X) > Math.abs(pt1.Y - pt2.Y))
		{
			if ((pt1.X > pt2.X) === (pt1.X < pt3.X))
				return ClipperLib.Clipper.DistanceFromLineSqrd(pt1, pt2, pt3) < distSqrd;
			else if ((pt2.X > pt1.X) === (pt2.X < pt3.X))
				return ClipperLib.Clipper.DistanceFromLineSqrd(pt2, pt1, pt3) < distSqrd;
			else
				return ClipperLib.Clipper.DistanceFromLineSqrd(pt3, pt1, pt2) < distSqrd;
		}
		else
		{
			if ((pt1.Y > pt2.Y) === (pt1.Y < pt3.Y))
				return ClipperLib.Clipper.DistanceFromLineSqrd(pt1, pt2, pt3) < distSqrd;
			else if ((pt2.Y > pt1.Y) === (pt2.Y < pt3.Y))
				return ClipperLib.Clipper.DistanceFromLineSqrd(pt2, pt1, pt3) < distSqrd;
			else
				return ClipperLib.Clipper.DistanceFromLineSqrd(pt3, pt1, pt2) < distSqrd;
		}
	}

	ClipperLib.Clipper.PointsAreClose = function (pt1, pt2, distSqrd)
	{
		var dx = pt1.X - pt2.X;
		var dy = pt1.Y - pt2.Y;
		return ((dx * dx) + (dy * dy) <= distSqrd);
	};

	ClipperLib.Clipper.ExcludeOp = function (op)
	{
		var result = op.Prev;
		result.Next = op.Next;
		op.Next.Prev = result;
		result.Idx = 0;
		return result;
	};

	ClipperLib.Clipper.CleanPolygon = function (path, distance)
	{
		if (typeof (distance) === "undefined") distance = 1.415;
		//distance = proximity in units/pixels below which vertices will be stripped.
		//Default ~= sqrt(2) so when adjacent vertices or semi-adjacent vertices have
		//both x & y coords within 1 unit, then the second vertex will be stripped.
		var cnt = path.length;
		if (cnt === 0)
			return new Array();
		var outPts = new Array(cnt);
		for (var i = 0; i < cnt; ++i)
			outPts[i] = new ClipperLib.OutPt();
		for (var i = 0; i < cnt; ++i)
		{
			outPts[i].Pt = path[i];
			outPts[i].Next = outPts[(i + 1) % cnt];
			outPts[i].Next.Prev = outPts[i];
			outPts[i].Idx = 0;
		}
		var distSqrd = distance * distance;
		var op = outPts[0];
		while (op.Idx === 0 && op.Next !== op.Prev)
		{
			if (ClipperLib.Clipper.PointsAreClose(op.Pt, op.Prev.Pt, distSqrd))
			{
				op = ClipperLib.Clipper.ExcludeOp(op);
				cnt--;
			}
			else if (ClipperLib.Clipper.PointsAreClose(op.Prev.Pt, op.Next.Pt, distSqrd))
			{
				ClipperLib.Clipper.ExcludeOp(op.Next);
				op = ClipperLib.Clipper.ExcludeOp(op);
				cnt -= 2;
			}
			else if (ClipperLib.Clipper.SlopesNearCollinear(op.Prev.Pt, op.Pt, op.Next.Pt, distSqrd))
			{
				op = ClipperLib.Clipper.ExcludeOp(op);
				cnt--;
			}
			else
			{
				op.Idx = 1;
				op = op.Next;
			}
		}
		if (cnt < 3)
			cnt = 0;
		var result = new Array(cnt);
		for (var i = 0; i < cnt; ++i)
		{
			result[i] = new ClipperLib.IntPoint1(op.Pt);
			op = op.Next;
		}
		outPts = null;
		return result;
	};

	ClipperLib.Clipper.CleanPolygons = function (polys, distance)
	{
		var result = new Array(polys.length);
		for (var i = 0, ilen = polys.length; i < ilen; i++)
			result[i] = ClipperLib.Clipper.CleanPolygon(polys[i], distance);
		return result;
	};

	ClipperLib.Clipper.Minkowski = function (pattern, path, IsSum, IsClosed)
	{
		var delta = (IsClosed ? 1 : 0);
		var polyCnt = pattern.length;
		var pathCnt = path.length;
		var result = new Array();
		if (IsSum)
			for (var i = 0; i < pathCnt; i++)
			{
				var p = new Array(polyCnt);
				for (var j = 0, jlen = pattern.length, ip = pattern[j]; j < jlen; j++, ip = pattern[j])
					p[j] = new ClipperLib.IntPoint2(path[i].X + ip.X, path[i].Y + ip.Y);
				result.push(p);
			}
		else
			for (var i = 0; i < pathCnt; i++)
			{
				var p = new Array(polyCnt);
				for (var j = 0, jlen = pattern.length, ip = pattern[j]; j < jlen; j++, ip = pattern[j])
					p[j] = new ClipperLib.IntPoint2(path[i].X - ip.X, path[i].Y - ip.Y);
				result.push(p);
			}
		var quads = new Array();
		for (var i = 0; i < pathCnt - 1 + delta; i++)
			for (var j = 0; j < polyCnt; j++)
			{
				var quad = new Array();
				quad.push(result[i % pathCnt][j % polyCnt]);
				quad.push(result[(i + 1) % pathCnt][j % polyCnt]);
				quad.push(result[(i + 1) % pathCnt][(j + 1) % polyCnt]);
				quad.push(result[i % pathCnt][(j + 1) % polyCnt]);
				if (!ClipperLib.Clipper.Orientation(quad))
					quad.reverse();
				quads.push(quad);
			}
		return quads;
	};

	ClipperLib.Clipper.MinkowskiSum = function (pattern, path_or_paths, pathIsClosed)
	{
		if (!(path_or_paths[0] instanceof Array))
		{
			var path = path_or_paths;
			var paths = ClipperLib.Clipper.Minkowski(pattern, path, true, pathIsClosed);
			var c = new ClipperLib.Clipper();
			c.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
			c.Execute(ClipperLib.ClipType.ctUnion, paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
			return paths;
		}
		else
		{
			var paths = path_or_paths;
			var solution = new ClipperLib.Paths();
			var c = new ClipperLib.Clipper();
			for (var i = 0; i < paths.length; ++i)
			{
				var tmp = ClipperLib.Clipper.Minkowski(pattern, paths[i], true, pathIsClosed);
				c.AddPaths(tmp, ClipperLib.PolyType.ptSubject, true);
				if (pathIsClosed)
				{
					var path = ClipperLib.Clipper.TranslatePath(paths[i], pattern[0]);
					c.AddPath(path, ClipperLib.PolyType.ptClip, true);
				}
			}
			c.Execute(ClipperLib.ClipType.ctUnion, solution,
				ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
			return solution;
		}
	}

	ClipperLib.Clipper.TranslatePath = function (path, delta)
	{
		var outPath = new ClipperLib.Path();
		for (var i = 0; i < path.length; i++)
			outPath.push(new ClipperLib.IntPoint2(path[i].X + delta.X, path[i].Y + delta.Y));
		return outPath;
	}

	ClipperLib.Clipper.MinkowskiDiff = function (poly1, poly2)
	{
		var paths = ClipperLib.Clipper.Minkowski(poly1, poly2, false, true);
		var c = new ClipperLib.Clipper();
		c.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
		c.Execute(ClipperLib.ClipType.ctUnion, paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
		return paths;
	}

	ClipperLib.Clipper.PolyTreeToPaths = function (polytree)
	{
		var result = new Array();
		//result.set_Capacity(polytree.get_Total());
		ClipperLib.Clipper.AddPolyNodeToPaths(polytree, ClipperLib.Clipper.NodeType.ntAny, result);
		return result;
	};

	ClipperLib.Clipper.AddPolyNodeToPaths = function (polynode, nt, paths)
	{
		var match = true;
		switch (nt)
		{
		case ClipperLib.Clipper.NodeType.ntOpen:
			return;
		case ClipperLib.Clipper.NodeType.ntClosed:
			match = !polynode.IsOpen;
			break;
		default:
			break;
		}
		if (polynode.m_polygon.length > 0 && match)
			paths.push(polynode.m_polygon);
		for (var $i3 = 0, $t3 = polynode.Childs(), $l3 = $t3.length, pn = $t3[$i3]; $i3 < $l3; $i3++, pn = $t3[$i3])
			ClipperLib.Clipper.AddPolyNodeToPaths(pn, nt, paths);
	};

	ClipperLib.Clipper.OpenPathsFromPolyTree = function (polytree)
	{
		var result = new ClipperLib.Paths();
		//result.set_Capacity(polytree.ChildCount());
		for (var i = 0, ilen = polytree.ChildCount(); i < ilen; i++)
			if (polytree.Childs()[i].IsOpen)
				result.push(polytree.Childs()[i].m_polygon);
		return result;
	};

	ClipperLib.Clipper.ClosedPathsFromPolyTree = function (polytree)
	{
		var result = new ClipperLib.Paths();
		//result.set_Capacity(polytree.Total());
		ClipperLib.Clipper.AddPolyNodeToPaths(polytree, ClipperLib.Clipper.NodeType.ntClosed, result);
		return result;
	};

	Inherit(ClipperLib.Clipper, ClipperLib.ClipperBase);
	ClipperLib.Clipper.NodeType = {
		ntAny: 0,
		ntOpen: 1,
		ntClosed: 2
	};

	/**
	* @constructor
	*/
	ClipperLib.ClipperOffset = function (miterLimit, arcTolerance)
	{
		if (typeof (miterLimit) === "undefined") miterLimit = 2;
		if (typeof (arcTolerance) === "undefined") arcTolerance = ClipperLib.ClipperOffset.def_arc_tolerance;
		this.m_destPolys = new ClipperLib.Paths();
		this.m_srcPoly = new ClipperLib.Path();
		this.m_destPoly = new ClipperLib.Path();
		this.m_normals = new Array();
		this.m_delta = 0;
		this.m_sinA = 0;
		this.m_sin = 0;
		this.m_cos = 0;
		this.m_miterLim = 0;
		this.m_StepsPerRad = 0;
		this.m_lowest = new ClipperLib.IntPoint0();
		this.m_polyNodes = new ClipperLib.PolyNode();
		this.MiterLimit = miterLimit;
		this.ArcTolerance = arcTolerance;
		this.m_lowest.X = -1;
	};

	ClipperLib.ClipperOffset.two_pi = 6.28318530717959;
	ClipperLib.ClipperOffset.def_arc_tolerance = 0.25;
	ClipperLib.ClipperOffset.prototype.Clear = function ()
	{
		ClipperLib.Clear(this.m_polyNodes.Childs());
		this.m_lowest.X = -1;
	};

	ClipperLib.ClipperOffset.Round = ClipperLib.Clipper.Round;
	ClipperLib.ClipperOffset.prototype.AddPath = function (path, joinType, endType)
	{
		var highI = path.length - 1;
		if (highI < 0)
			return;
		var newNode = new ClipperLib.PolyNode();
		newNode.m_jointype = joinType;
		newNode.m_endtype = endType;
		//strip duplicate points from path and also get index to the lowest point ...
		if (endType === ClipperLib.EndType.etClosedLine || endType === ClipperLib.EndType.etClosedPolygon)
			while (highI > 0 && ClipperLib.IntPoint.op_Equality(path[0], path[highI]))
				highI--;
		//newNode.m_polygon.set_Capacity(highI + 1);
		newNode.m_polygon.push(path[0]);
		var j = 0,
			k = 0;
		for (var i = 1; i <= highI; i++)
			if (ClipperLib.IntPoint.op_Inequality(newNode.m_polygon[j], path[i]))
			{
				j++;
				newNode.m_polygon.push(path[i]);
				if (path[i].Y > newNode.m_polygon[k].Y || (path[i].Y === newNode.m_polygon[k].Y && path[i].X < newNode.m_polygon[k].X))
					k = j;
			}
		if (endType === ClipperLib.EndType.etClosedPolygon && j < 2) return;

		this.m_polyNodes.AddChild(newNode);
		//if this path's lowest pt is lower than all the others then update m_lowest
		if (endType !== ClipperLib.EndType.etClosedPolygon)
			return;
		if (this.m_lowest.X < 0)
			this.m_lowest = new ClipperLib.IntPoint2(this.m_polyNodes.ChildCount() - 1, k);
		else
		{
			var ip = this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y];
			if (newNode.m_polygon[k].Y > ip.Y || (newNode.m_polygon[k].Y === ip.Y && newNode.m_polygon[k].X < ip.X))
				this.m_lowest = new ClipperLib.IntPoint2(this.m_polyNodes.ChildCount() - 1, k);
		}
	};

	ClipperLib.ClipperOffset.prototype.AddPaths = function (paths, joinType, endType)
	{
		for (var i = 0, ilen = paths.length; i < ilen; i++)
			this.AddPath(paths[i], joinType, endType);
	};

	ClipperLib.ClipperOffset.prototype.FixOrientations = function ()
	{
		//fixup orientations of all closed paths if the orientation of the
		//closed path with the lowermost vertex is wrong ...
		if (this.m_lowest.X >= 0 && !ClipperLib.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))
		{
			for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
			{
				var node = this.m_polyNodes.Childs()[i];
				if (node.m_endtype === ClipperLib.EndType.etClosedPolygon || (node.m_endtype === ClipperLib.EndType.etClosedLine && ClipperLib.Clipper.Orientation(node.m_polygon)))
					node.m_polygon.reverse();
			}
		}
		else
		{
			for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
			{
				var node = this.m_polyNodes.Childs()[i];
				if (node.m_endtype === ClipperLib.EndType.etClosedLine && !ClipperLib.Clipper.Orientation(node.m_polygon))
					node.m_polygon.reverse();
			}
		}
	};

	ClipperLib.ClipperOffset.GetUnitNormal = function (pt1, pt2)
	{
		var dx = (pt2.X - pt1.X);
		var dy = (pt2.Y - pt1.Y);
		if ((dx === 0) && (dy === 0))
			return new ClipperLib.DoublePoint2(0, 0);
		var f = 1 / Math.sqrt(dx * dx + dy * dy);
		dx *= f;
		dy *= f;
		return new ClipperLib.DoublePoint2(dy, -dx);
	};

	ClipperLib.ClipperOffset.prototype.DoOffset = function (delta)
	{
		this.m_destPolys = new Array();
		this.m_delta = delta;
		//if Zero offset, just copy any CLOSED polygons to m_p and return ...
		if (ClipperLib.ClipperBase.near_zero(delta))
		{
			//this.m_destPolys.set_Capacity(this.m_polyNodes.ChildCount);
			for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
			{
				var node = this.m_polyNodes.Childs()[i];
				if (node.m_endtype === ClipperLib.EndType.etClosedPolygon)
					this.m_destPolys.push(node.m_polygon);
			}
			return;
		}
		//see offset_triginometry3.svg in the documentation folder ...
		if (this.MiterLimit > 2)
			this.m_miterLim = 2 / (this.MiterLimit * this.MiterLimit);
		else
			this.m_miterLim = 0.5;
		var y;
		if (this.ArcTolerance <= 0)
			y = ClipperLib.ClipperOffset.def_arc_tolerance;
		else if (this.ArcTolerance > Math.abs(delta) * ClipperLib.ClipperOffset.def_arc_tolerance)
			y = Math.abs(delta) * ClipperLib.ClipperOffset.def_arc_tolerance;
		else
			y = this.ArcTolerance;
		//see offset_triginometry2.svg in the documentation folder ...
		var steps = 3.14159265358979 / Math.acos(1 - y / Math.abs(delta));
		this.m_sin = Math.sin(ClipperLib.ClipperOffset.two_pi / steps);
		this.m_cos = Math.cos(ClipperLib.ClipperOffset.two_pi / steps);
		this.m_StepsPerRad = steps / ClipperLib.ClipperOffset.two_pi;
		if (delta < 0)
			this.m_sin = -this.m_sin;
		//this.m_destPolys.set_Capacity(this.m_polyNodes.ChildCount * 2);
		for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
		{
			var node = this.m_polyNodes.Childs()[i];
			this.m_srcPoly = node.m_polygon;
			var len = this.m_srcPoly.length;
			if (len === 0 || (delta <= 0 && (len < 3 || node.m_endtype !== ClipperLib.EndType.etClosedPolygon)))
				continue;
			this.m_destPoly = new Array();
			if (len === 1)
			{
				if (node.m_jointype === ClipperLib.JoinType.jtRound)
				{
					var X = 1,
						Y = 0;
					for (var j = 1; j <= steps; j++)
					{
						this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + Y * delta)));
						var X2 = X;
						X = X * this.m_cos - this.m_sin * Y;
						Y = X2 * this.m_sin + Y * this.m_cos;
					}
				}
				else
				{
					var X = -1,
						Y = -1;
					for (var j = 0; j < 4; ++j)
					{
						this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + Y * delta)));
						if (X < 0)
							X = 1;
						else if (Y < 0)
							Y = 1;
						else
							X = -1;
					}
				}
				this.m_destPolys.push(this.m_destPoly);
				continue;
			}
			//build m_normals ...
			this.m_normals.length = 0;
			//this.m_normals.set_Capacity(len);
			for (var j = 0; j < len - 1; j++)
				this.m_normals.push(ClipperLib.ClipperOffset.GetUnitNormal(this.m_srcPoly[j], this.m_srcPoly[j + 1]));
			if (node.m_endtype === ClipperLib.EndType.etClosedLine || node.m_endtype === ClipperLib.EndType.etClosedPolygon)
				this.m_normals.push(ClipperLib.ClipperOffset.GetUnitNormal(this.m_srcPoly[len - 1], this.m_srcPoly[0]));
			else
				this.m_normals.push(new ClipperLib.DoublePoint1(this.m_normals[len - 2]));
			if (node.m_endtype === ClipperLib.EndType.etClosedPolygon)
			{
				var k = len - 1;
				for (var j = 0; j < len; j++)
					k = this.OffsetPoint(j, k, node.m_jointype);
				this.m_destPolys.push(this.m_destPoly);
			}
			else if (node.m_endtype === ClipperLib.EndType.etClosedLine)
			{
				var k = len - 1;
				for (var j = 0; j < len; j++)
					k = this.OffsetPoint(j, k, node.m_jointype);
				this.m_destPolys.push(this.m_destPoly);
				this.m_destPoly = new Array();
				//re-build m_normals ...
				var n = this.m_normals[len - 1];
				for (var j = len - 1; j > 0; j--)
					this.m_normals[j] = new ClipperLib.DoublePoint2(-this.m_normals[j - 1].X, -this.m_normals[j - 1].Y);
				this.m_normals[0] = new ClipperLib.DoublePoint2(-n.X, -n.Y);
				k = 0;
				for (var j = len - 1; j >= 0; j--)
					k = this.OffsetPoint(j, k, node.m_jointype);
				this.m_destPolys.push(this.m_destPoly);
			}
			else
			{
				var k = 0;
				for (var j = 1; j < len - 1; ++j)
					k = this.OffsetPoint(j, k, node.m_jointype);
				var pt1;
				if (node.m_endtype === ClipperLib.EndType.etOpenButt)
				{
					var j = len - 1;
					pt1 = new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * delta));
					this.m_destPoly.push(pt1);
					pt1 = new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X - this.m_normals[j].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y - this.m_normals[j].Y * delta));
					this.m_destPoly.push(pt1);
				}
				else
				{
					var j = len - 1;
					k = len - 2;
					this.m_sinA = 0;
					this.m_normals[j] = new ClipperLib.DoublePoint2(-this.m_normals[j].X, -this.m_normals[j].Y);
					if (node.m_endtype === ClipperLib.EndType.etOpenSquare)
						this.DoSquare(j, k);
					else
						this.DoRound(j, k);
				}
				//re-build m_normals ...
				for (var j = len - 1; j > 0; j--)
					this.m_normals[j] = new ClipperLib.DoublePoint2(-this.m_normals[j - 1].X, -this.m_normals[j - 1].Y);
				this.m_normals[0] = new ClipperLib.DoublePoint2(-this.m_normals[1].X, -this.m_normals[1].Y);
				k = len - 1;
				for (var j = k - 1; j > 0; --j)
					k = this.OffsetPoint(j, k, node.m_jointype);
				if (node.m_endtype === ClipperLib.EndType.etOpenButt)
				{
					pt1 = new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X - this.m_normals[0].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y - this.m_normals[0].Y * delta));
					this.m_destPoly.push(pt1);
					pt1 = new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + this.m_normals[0].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + this.m_normals[0].Y * delta));
					this.m_destPoly.push(pt1);
				}
				else
				{
					k = 1;
					this.m_sinA = 0;
					if (node.m_endtype === ClipperLib.EndType.etOpenSquare)
						this.DoSquare(0, 1);
					else
						this.DoRound(0, 1);
				}
				this.m_destPolys.push(this.m_destPoly);
			}
		}
	};

	ClipperLib.ClipperOffset.prototype.Execute = function ()
	{
		var a = arguments,
			ispolytree = a[0] instanceof ClipperLib.PolyTree;
		if (!ispolytree) // function (solution, delta)
		{
			var solution = a[0],
				delta = a[1];
			ClipperLib.Clear(solution);
			this.FixOrientations();
			this.DoOffset(delta);
			//now clean up 'corners' ...
			var clpr = new ClipperLib.Clipper(0);
			clpr.AddPaths(this.m_destPolys, ClipperLib.PolyType.ptSubject, true);
			if (delta > 0)
			{
				clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
			}
			else
			{
				var r = ClipperLib.Clipper.GetBounds(this.m_destPolys);
				var outer = new ClipperLib.Path();
				outer.push(new ClipperLib.IntPoint2(r.left - 10, r.bottom + 10));
				outer.push(new ClipperLib.IntPoint2(r.right + 10, r.bottom + 10));
				outer.push(new ClipperLib.IntPoint2(r.right + 10, r.top - 10));
				outer.push(new ClipperLib.IntPoint2(r.left - 10, r.top - 10));
				clpr.AddPath(outer, ClipperLib.PolyType.ptSubject, true);
				clpr.ReverseSolution = true;
				clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNegative, ClipperLib.PolyFillType.pftNegative);
				if (solution.length > 0)
					solution.splice(0, 1);
			}
			//console.log(JSON.stringify(solution));
		}
		else // function (polytree, delta)
		{
			var solution = a[0],
				delta = a[1];
			solution.Clear();
			this.FixOrientations();
			this.DoOffset(delta);
			//now clean up 'corners' ...
			var clpr = new ClipperLib.Clipper(0);
			clpr.AddPaths(this.m_destPolys, ClipperLib.PolyType.ptSubject, true);
			if (delta > 0)
			{
				clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
			}
			else
			{
				var r = ClipperLib.Clipper.GetBounds(this.m_destPolys);
				var outer = new ClipperLib.Path();
				outer.push(new ClipperLib.IntPoint2(r.left - 10, r.bottom + 10));
				outer.push(new ClipperLib.IntPoint2(r.right + 10, r.bottom + 10));
				outer.push(new ClipperLib.IntPoint2(r.right + 10, r.top - 10));
				outer.push(new ClipperLib.IntPoint2(r.left - 10, r.top - 10));
				clpr.AddPath(outer, ClipperLib.PolyType.ptSubject, true);
				clpr.ReverseSolution = true;
				clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNegative, ClipperLib.PolyFillType.pftNegative);
				//remove the outer PolyNode rectangle ...
				if (solution.ChildCount() === 1 && solution.Childs()[0].ChildCount() > 0)
				{
					var outerNode = solution.Childs()[0];
					//solution.Childs.set_Capacity(outerNode.ChildCount);
					solution.Childs()[0] = outerNode.Childs()[0];
					solution.Childs()[0].m_Parent = solution;
					for (var i = 1; i < outerNode.ChildCount(); i++)
						solution.AddChild(outerNode.Childs()[i]);
				}
				else
					solution.Clear();
			}
		}
	};

	ClipperLib.ClipperOffset.prototype.OffsetPoint = function (j, k, jointype)
	{
		//cross product ...
		this.m_sinA = (this.m_normals[k].X * this.m_normals[j].Y - this.m_normals[j].X * this.m_normals[k].Y);

		if (Math.abs(this.m_sinA * this.m_delta) < 1.0)
		{
			//dot product ...
			var cosA = (this.m_normals[k].X * this.m_normals[j].X + this.m_normals[j].Y * this.m_normals[k].Y);
			if (cosA > 0) // angle ==> 0 degrees
			{
				this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[k].X * this.m_delta),
					ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[k].Y * this.m_delta)));
				return k;
			}
			//else angle ==> 180 degrees
		}
		else if (this.m_sinA > 1)
			this.m_sinA = 1.0;
		else if (this.m_sinA < -1)
			this.m_sinA = -1.0;
		if (this.m_sinA * this.m_delta < 0)
		{
			this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[k].X * this.m_delta),
				ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[k].Y * this.m_delta)));
			this.m_destPoly.push(new ClipperLib.IntPoint1(this.m_srcPoly[j]));
			this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * this.m_delta),
				ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * this.m_delta)));
		}
		else
			switch (jointype)
			{
			case ClipperLib.JoinType.jtMiter:
				{
					var r = 1 + (this.m_normals[j].X * this.m_normals[k].X + this.m_normals[j].Y * this.m_normals[k].Y);
					if (r >= this.m_miterLim)
						this.DoMiter(j, k, r);
					else
						this.DoSquare(j, k);
					break;
				}
			case ClipperLib.JoinType.jtSquare:
				this.DoSquare(j, k);
				break;
			case ClipperLib.JoinType.jtRound:
				this.DoRound(j, k);
				break;
			}
		k = j;
		return k;
	};

	ClipperLib.ClipperOffset.prototype.DoSquare = function (j, k)
	{
		var dx = Math.tan(Math.atan2(this.m_sinA,
			this.m_normals[k].X * this.m_normals[j].X + this.m_normals[k].Y * this.m_normals[j].Y) / 4);
		this.m_destPoly.push(new ClipperLib.IntPoint2(
			ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_delta * (this.m_normals[k].X - this.m_normals[k].Y * dx)),
			ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_delta * (this.m_normals[k].Y + this.m_normals[k].X * dx))));
		this.m_destPoly.push(new ClipperLib.IntPoint2(
			ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_delta * (this.m_normals[j].X + this.m_normals[j].Y * dx)),
			ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_delta * (this.m_normals[j].Y - this.m_normals[j].X * dx))));
	};

	ClipperLib.ClipperOffset.prototype.DoMiter = function (j, k, r)
	{
		var q = this.m_delta / r;
		this.m_destPoly.push(new ClipperLib.IntPoint2(
			ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + (this.m_normals[k].X + this.m_normals[j].X) * q),
			ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + (this.m_normals[k].Y + this.m_normals[j].Y) * q)));
	};

	ClipperLib.ClipperOffset.prototype.DoRound = function (j, k)
	{
		var a = Math.atan2(this.m_sinA,
			this.m_normals[k].X * this.m_normals[j].X + this.m_normals[k].Y * this.m_normals[j].Y);

		var steps = Math.max(ClipperLib.Cast_Int32(ClipperLib.ClipperOffset.Round(this.m_StepsPerRad * Math.abs(a))), 1);

		var X = this.m_normals[k].X,
			Y = this.m_normals[k].Y,
			X2;
		for (var i = 0; i < steps; ++i)
		{
			this.m_destPoly.push(new ClipperLib.IntPoint2(
				ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + X * this.m_delta),
				ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + Y * this.m_delta)));
			X2 = X;
			X = X * this.m_cos - this.m_sin * Y;
			Y = X2 * this.m_sin + Y * this.m_cos;
		}
		this.m_destPoly.push(new ClipperLib.IntPoint2(
			ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * this.m_delta),
			ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * this.m_delta)));
	};

	ClipperLib.Error = function (message)
	{
		try
		{
			throw new Error(message);
		}
		catch (err)
		{
			alert(err.message);
		}
	};

	// ---------------------------------------------

	// JS extension by Timo 2013
	ClipperLib.JS = {};

	ClipperLib.JS.AreaOfPolygon = function (poly, scale)
	{
		if (!scale) scale = 1;
		return ClipperLib.Clipper.Area(poly) / (scale * scale);
	};

	ClipperLib.JS.AreaOfPolygons = function (poly, scale)
	{
		if (!scale) scale = 1;
		var area = 0;
		for (var i = 0; i < poly.length; i++)
		{
			area += ClipperLib.Clipper.Area(poly[i]);
		}
		return area / (scale * scale);
	};

	ClipperLib.JS.BoundsOfPath = function (path, scale)
	{
		return ClipperLib.JS.BoundsOfPaths([path], scale);
	};

	ClipperLib.JS.BoundsOfPaths = function (paths, scale)
	{
		if (!scale) scale = 1;
		var bounds = ClipperLib.Clipper.GetBounds(paths);
		bounds.left /= scale;
		bounds.bottom /= scale;
		bounds.right /= scale;
		bounds.top /= scale;
		return bounds;
	};

	// Clean() joins vertices that are too near each other
	// and causes distortion to offsetted polygons without cleaning
	ClipperLib.JS.Clean = function (polygon, delta)
	{
		if (!(polygon instanceof Array)) return [];
		var isPolygons = polygon[0] instanceof Array;
		var polygon = ClipperLib.JS.Clone(polygon);
		if (typeof delta !== "number" || delta === null)
		{
			ClipperLib.Error("Delta is not a number in Clean().");
			return polygon;
		}
		if (polygon.length === 0 || (polygon.length === 1 && polygon[0].length === 0) || delta < 0) return polygon;
		if (!isPolygons) polygon = [polygon];
		var k_length = polygon.length;
		var len, poly, result, d, p, j, i;
		var results = [];
		for (var k = 0; k < k_length; k++)
		{
			poly = polygon[k];
			len = poly.length;
			if (len === 0) continue;
			else if (len < 3)
			{
				result = poly;
				results.push(result);
				continue;
			}
			result = poly;
			d = delta * delta;
			//d = Math.floor(c_delta * c_delta);
			p = poly[0];
			j = 1;
			for (i = 1; i < len; i++)
			{
				if ((poly[i].X - p.X) * (poly[i].X - p.X) +
					(poly[i].Y - p.Y) * (poly[i].Y - p.Y) <= d)
					continue;
				result[j] = poly[i];
				p = poly[i];
				j++;
			}
			p = poly[j - 1];
			if ((poly[0].X - p.X) * (poly[0].X - p.X) +
				(poly[0].Y - p.Y) * (poly[0].Y - p.Y) <= d)
				j--;
			if (j < len)
				result.splice(j, len - j);
			if (result.length) results.push(result);
		}
		if (!isPolygons && results.length) results = results[0];
		else if (!isPolygons && results.length === 0) results = [];
		else if (isPolygons && results.length === 0) results = [
			[]
		];
		return results;
	}
	// Make deep copy of Polygons or Polygon
	// so that also IntPoint objects are cloned and not only referenced
	// This should be the fastest way
	ClipperLib.JS.Clone = function (polygon)
	{
		if (!(polygon instanceof Array)) return [];
		if (polygon.length === 0) return [];
		else if (polygon.length === 1 && polygon[0].length === 0) return [
			[]
		];
		var isPolygons = polygon[0] instanceof Array;
		if (!isPolygons) polygon = [polygon];
		var len = polygon.length,
			plen, i, j, result;
		var results = new Array(len);
		for (i = 0; i < len; i++)
		{
			plen = polygon[i].length;
			result = new Array(plen);
			for (j = 0; j < plen; j++)
			{
				result[j] = {
					X: polygon[i][j].X,
					Y: polygon[i][j].Y
				};

			}
			results[i] = result;
		}
		if (!isPolygons) results = results[0];
		return results;
	};

	// Removes points that doesn't affect much to the visual appearance.
	// If middle point is at or under certain distance (tolerance) of the line segment between
	// start and end point, the middle point is removed.
	ClipperLib.JS.Lighten = function (polygon, tolerance)
	{
		if (!(polygon instanceof Array)) return [];
		if (typeof tolerance !== "number" || tolerance === null)
		{
			ClipperLib.Error("Tolerance is not a number in Lighten().")
			return ClipperLib.JS.Clone(polygon);
		}
		if (polygon.length === 0 || (polygon.length === 1 && polygon[0].length === 0) || tolerance < 0)
		{
			return ClipperLib.JS.Clone(polygon);
		}
		var isPolygons = polygon[0] instanceof Array;
		if (!isPolygons) polygon = [polygon];
		var i, j, poly, k, poly2, plen, A, B, P, d, rem, addlast;
		var bxax, byay, l, ax, ay;
		var len = polygon.length;
		var toleranceSq = tolerance * tolerance;
		var results = [];
		for (i = 0; i < len; i++)
		{
			poly = polygon[i];
			plen = poly.length;
			if (plen === 0) continue;
			for (k = 0; k < 1000000; k++) // could be forever loop, but wiser to restrict max repeat count
			{
				poly2 = [];
				plen = poly.length;
				// the first have to added to the end, if first and last are not the same
				// this way we ensure that also the actual last point can be removed if needed
				if (poly[plen - 1].X !== poly[0].X || poly[plen - 1].Y !== poly[0].Y)
				{
					addlast = 1;
					poly.push(
					{
						X: poly[0].X,
						Y: poly[0].Y
					});
					plen = poly.length;
				}
				else addlast = 0;
				rem = []; // Indexes of removed points
				for (j = 0; j < plen - 2; j++)
				{
					A = poly[j]; // Start point of line segment
					P = poly[j + 1]; // Middle point. This is the one to be removed.
					B = poly[j + 2]; // End point of line segment
					ax = A.X;
					ay = A.Y;
					bxax = B.X - ax;
					byay = B.Y - ay;
					if (bxax !== 0 || byay !== 0) // To avoid Nan, when A==P && P==B. And to avoid peaks (A==B && A!=P), which have lenght, but not area.
					{
						l = ((P.X - ax) * bxax + (P.Y - ay) * byay) / (bxax * bxax + byay * byay);
						if (l > 1)
						{
							ax = B.X;
							ay = B.Y;
						}
						else if (l > 0)
						{
							ax += bxax * l;
							ay += byay * l;
						}
					}
					bxax = P.X - ax;
					byay = P.Y - ay;
					d = bxax * bxax + byay * byay;
					if (d <= toleranceSq)
					{
						rem[j + 1] = 1;
						j++; // when removed, transfer the pointer to the next one
					}
				}
				// add all unremoved points to poly2
				poly2.push(
				{
					X: poly[0].X,
					Y: poly[0].Y
				});
				for (j = 1; j < plen - 1; j++)
					if (!rem[j]) poly2.push(
					{
						X: poly[j].X,
						Y: poly[j].Y
					});
				poly2.push(
				{
					X: poly[plen - 1].X,
					Y: poly[plen - 1].Y
				});
				// if the first point was added to the end, remove it
				if (addlast) poly.pop();
				// break, if there was not anymore removed points
				if (!rem.length) break;
				// else continue looping using poly2, to check if there are points to remove
				else poly = poly2;
			}
			plen = poly2.length;
			// remove duplicate from end, if needed
			if (poly2[plen - 1].X === poly2[0].X && poly2[plen - 1].Y === poly2[0].Y)
			{
				poly2.pop();
			}
			if (poly2.length > 2) // to avoid two-point-polygons
				results.push(poly2);
		}
		if (!isPolygons)
		{
			results = results[0];
		}
		if (typeof (results) === "undefined")
		{
			results = [];
		}
		return results;
	}

	ClipperLib.JS.PerimeterOfPath = function (path, closed, scale)
	{
		if (typeof (path) === "undefined") return 0;
		var sqrt = Math.sqrt;
		var perimeter = 0.0;
		var p1, p2, p1x = 0.0,
			p1y = 0.0,
			p2x = 0.0,
			p2y = 0.0;
		var j = path.length;
		if (j < 2) return 0;
		if (closed)
		{
			path[j] = path[0];
			j++;
		}
		while (--j)
		{
			p1 = path[j];
			p1x = p1.X;
			p1y = p1.Y;
			p2 = path[j - 1];
			p2x = p2.X;
			p2y = p2.Y;
			perimeter += sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));
		}
		if (closed) path.pop();
		return perimeter / scale;
	};

	ClipperLib.JS.PerimeterOfPaths = function (paths, closed, scale)
	{
		if (!scale) scale = 1;
		var perimeter = 0;
		for (var i = 0; i < paths.length; i++)
		{
			perimeter += ClipperLib.JS.PerimeterOfPath(paths[i], closed, scale);
		}
		return perimeter;
	};

	ClipperLib.JS.ScaleDownPath = function (path, scale)
	{
		var i, p;
		if (!scale) scale = 1;
		i = path.length;
		while (i--)
		{
			p = path[i];
			p.X = p.X / scale;
			p.Y = p.Y / scale;
		}
	};

	ClipperLib.JS.ScaleDownPaths = function (paths, scale)
	{
		var i, j, p;
		if (!scale) scale = 1;
		i = paths.length;
		while (i--)
		{
			j = paths[i].length;
			while (j--)
			{
				p = paths[i][j];
				p.X = p.X / scale;
				p.Y = p.Y / scale;
			}
		}
	};

	ClipperLib.JS.ScaleUpPath = function (path, scale)
	{
		var i, p, round = Math.round;
		if (!scale) scale = 1;
		i = path.length;
		while (i--)
		{
			p = path[i];
			p.X = round(p.X * scale);
			p.Y = round(p.Y * scale);
		}
	};

	ClipperLib.JS.ScaleUpPaths = function (paths, scale)
	{
		var i, j, p, round = Math.round;
		if (!scale) scale = 1;
		i = paths.length;
		while (i--)
		{
			j = paths[i].length;
			while (j--)
			{
				p = paths[i][j];
				p.X = round(p.X * scale);
				p.Y = round(p.Y * scale);
			}
		}
	};

	/**
	* @constructor
	*/
	ClipperLib.ExPolygons = function ()
	{
		return [];
	}
	/**
	* @constructor
	*/
	ClipperLib.ExPolygon = function ()
	{
		this.outer = null;
		this.holes = null;
	};

	ClipperLib.JS.AddOuterPolyNodeToExPolygons = function (polynode, expolygons)
	{
		var ep = new ClipperLib.ExPolygon();
		ep.outer = polynode.Contour();
		var childs = polynode.Childs();
		var ilen = childs.length;
		ep.holes = new Array(ilen);
		var node, n, i, j, childs2, jlen;
		for (i = 0; i < ilen; i++)
		{
			node = childs[i];
			ep.holes[i] = node.Contour();
			//Add outer polygons contained by (nested within) holes ...
			for (j = 0, childs2 = node.Childs(), jlen = childs2.length; j < jlen; j++)
			{
				n = childs2[j];
				ClipperLib.JS.AddOuterPolyNodeToExPolygons(n, expolygons);
			}
		}
		expolygons.push(ep);
	};

	ClipperLib.JS.ExPolygonsToPaths = function (expolygons)
	{
		var a, i, alen, ilen;
		var paths = new ClipperLib.Paths();
		for (a = 0, alen = expolygons.length; a < alen; a++)
		{
			paths.push(expolygons[a].outer);
			for (i = 0, ilen = expolygons[a].holes.length; i < ilen; i++)
			{
				paths.push(expolygons[a].holes[i]);
			}
		}
		return paths;
	}
	ClipperLib.JS.PolyTreeToExPolygons = function (polytree)
	{
		var expolygons = new ClipperLib.ExPolygons();
		var node, i, childs, ilen;
		for (i = 0, childs = polytree.Childs(), ilen = childs.length; i < ilen; i++)
		{
			node = childs[i];
			ClipperLib.JS.AddOuterPolyNodeToExPolygons(node, expolygons);
		}
		return expolygons;
	};

})();

/* The MIT License (MIT)

Copyright (c) 2014 Volker Poplawski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["module"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod);
        global.fitCurve = mod.exports;
    }
})(this, function (module) {
    "use strict";

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    /**
     *  @preserve  JavaScript implementation of
     *  Algorithm for Automatically Fitting Digitized Curves
     *  by Philip J. Schneider
     *  "Graphics Gems", Academic Press, 1990
     *
     *  The MIT License (MIT)
     *
     *  https://github.com/soswow/fit-curves
     */

    /**
     * Fit one or more Bezier curves to a set of points.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points, e.g. [[5,5],[5,50],[110,140],[210,160],[320,110]]
     * @param {Number} maxError - Tolerance, squared error between points and fitted curve
     * @returns {Array<Array<Array<Number>>>} Array of Bezier curves, where each element is [first-point, control-point-1, control-point-2, second-point] and points are [x, y]
     */
    function fitCurve(points, maxError, progressCallback) {
        if (!Array.isArray(points)) {
            throw new TypeError("First argument should be an array");
        }
        points.forEach(function (point) {
            if (!Array.isArray(point) || point.some(function (item) {
                return typeof item !== 'number';
            }) || point.length !== points[0].length) {
                throw Error("Each point should be an array of numbers. Each point should have the same amount of numbers.");
            }
        });

        // Remove duplicate points
        points = points.filter(function (point, i) {
            return i === 0 || !point.every(function (val, j) {
                return val === points[i - 1][j];
            });
        });

        if (points.length < 2) {
            return [];
        }

        var len = points.length;
        var leftTangent = createTangent(points[1], points[0]);
        var rightTangent = createTangent(points[len - 2], points[len - 1]);

        return fitCubic(points, leftTangent, rightTangent, maxError, progressCallback);
    }

    /**
     * Fit a Bezier curve to a (sub)set of digitized points.
     * Your code should not call this function directly. Use {@link fitCurve} instead.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points, e.g. [[5,5],[5,50],[110,140],[210,160],[320,110]]
     * @param {Array<Number>} leftTangent - Unit tangent vector at start point
     * @param {Array<Number>} rightTangent - Unit tangent vector at end point
     * @param {Number} error - Tolerance, squared error between points and fitted curve
     * @returns {Array<Array<Array<Number>>>} Array of Bezier curves, where each element is [first-point, control-point-1, control-point-2, second-point] and points are [x, y]
     */
    function fitCubic(points, leftTangent, rightTangent, error, progressCallback) {
        var MaxIterations = 20; //Max times to try iterating (to find an acceptable curve)

        var bezCurve, //Control points of fitted Bezier curve
        u, //Parameter values for point
        uPrime, //Improved parameter values
        maxError, prevErr, //Maximum fitting error
        splitPoint, prevSplit, //Point to split point set at if we need more than one curve
        centerVector, toCenterTangent, fromCenterTangent, //Unit tangent vector(s) at splitPoint
        beziers, //Array of fitted Bezier curves if we need more than one curve
        dist, i;

        //console.log('fitCubic, ', points.length);

        //Use heuristic if region only has two points in it
        if (points.length === 2) {
            dist = maths.vectorLen(maths.subtract(points[0], points[1])) / 3.0;
            bezCurve = [points[0], maths.addArrays(points[0], maths.mulItems(leftTangent, dist)), maths.addArrays(points[1], maths.mulItems(rightTangent, dist)), points[1]];
            return [bezCurve];
        }

        //Parameterize points, and attempt to fit curve
        u = chordLengthParameterize(points);

        var _generateAndReport = generateAndReport(points, u, u, leftTangent, rightTangent, progressCallback);

        bezCurve = _generateAndReport[0];
        maxError = _generateAndReport[1];
        splitPoint = _generateAndReport[2];


        if (maxError === 0 || maxError < error) {
            return [bezCurve];
        }
        //If error not too large, try some reparameterization and iteration
        if (maxError < error * error) {

            uPrime = u;
            prevErr = maxError;
            prevSplit = splitPoint;

            for (i = 0; i < MaxIterations; i++) {

                uPrime = reparameterize(bezCurve, points, uPrime);

                var _generateAndReport2 = generateAndReport(points, u, uPrime, leftTangent, rightTangent, progressCallback);

                bezCurve = _generateAndReport2[0];
                maxError = _generateAndReport2[1];
                splitPoint = _generateAndReport2[2];


                if (maxError < error) {
                    return [bezCurve];
                }
                //If the development of the fitted curve grinds to a halt,
                //we abort this attempt (and try a shorter curve):
                else if (splitPoint === prevSplit) {
                        var errChange = maxError / prevErr;
                        if (errChange > .9999 && errChange < 1.0001) {
                            break;
                        }
                    }

                prevErr = maxError;
                prevSplit = splitPoint;
            }
        }

        //Fitting failed -- split at max error point and fit recursively
        beziers = [];

        //To create a smooth transition from one curve segment to the next, we
        //calculate the line between the points directly before and after the
        //center, and use that as the tangent both to and from the center point.
        centerVector = maths.subtract(points[splitPoint - 1], points[splitPoint + 1]);
        //However, this won't work if they're the same point, because the line we
        //want to use as a tangent would be 0. Instead, we calculate the line from
        //that "double-point" to the center point, and use its tangent.
        if (centerVector.every(function (val) {
            return val === 0;
        })) {
            //[x,y] -> [-y,x]: http://stackoverflow.com/a/4780141/1869660
            centerVector = maths.subtract(points[splitPoint - 1], points[splitPoint]);
            var _ref = [-centerVector[1], centerVector[0]];
            centerVector[0] = _ref[0];
            centerVector[1] = _ref[1];
        }
        toCenterTangent = maths.normalize(centerVector);
        //To and from need to point in opposite directions:
        fromCenterTangent = maths.mulItems(toCenterTangent, -1);

        /*
        Note: An alternative to this "divide and conquer" recursion could be to always
              let new curve segments start by trying to go all the way to the end,
              instead of only to the end of the current subdivided polyline.
              That might let many segments fit a few points more, reducing the number of total segments.
               However, a few tests have shown that the segment reduction is insignificant
              (240 pts, 100 err: 25 curves vs 27 curves. 140 pts, 100 err: 17 curves on both),
              and the results take twice as many steps and milliseconds to finish,
              without looking any better than what we already have.
        */
        beziers = beziers.concat(fitCubic(points.slice(0, splitPoint + 1), leftTangent, toCenterTangent, error, progressCallback));
        beziers = beziers.concat(fitCubic(points.slice(splitPoint), fromCenterTangent, rightTangent, error, progressCallback));
        return beziers;
    };

    function generateAndReport(points, paramsOrig, paramsPrime, leftTangent, rightTangent, progressCallback) {
        var bezCurve, maxError, splitPoint;

        bezCurve = generateBezier(points, paramsPrime, leftTangent, rightTangent, progressCallback);
        //Find max deviation of points to fitted curve.
        //Here we always use the original parameters (from chordLengthParameterize()),
        //because we need to compare the current curve to the actual source polyline,
        //and not the currently iterated parameters which reparameterize() & generateBezier() use,
        //as those have probably drifted far away and may no longer be in ascending order.

        var _computeMaxError = computeMaxError(points, bezCurve, paramsOrig);

        maxError = _computeMaxError[0];
        splitPoint = _computeMaxError[1];


        if (progressCallback) {
            progressCallback({
                bez: bezCurve,
                points: points,
                params: paramsOrig,
                maxErr: maxError,
                maxPoint: splitPoint
            });
        }

        return [bezCurve, maxError, splitPoint];
    }

    /**
     * Use least-squares method to find Bezier control points for region.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points
     * @param {Array<Number>} parameters - Parameter values for region
     * @param {Array<Number>} leftTangent - Unit tangent vector at start point
     * @param {Array<Number>} rightTangent - Unit tangent vector at end point
     * @returns {Array<Array<Number>>} Approximated Bezier curve: [first-point, control-point-1, control-point-2, second-point] where points are [x, y]
     */
    function generateBezier(points, parameters, leftTangent, rightTangent) {
        var bezCurve,
            //Bezier curve ctl pts
        A,
            a,
            //Precomputed rhs for eqn
        C,
            X,
            //Matrices C & X
        det_C0_C1,
            det_C0_X,
            det_X_C1,
            //Determinants of matrices
        alpha_l,
            alpha_r,
            //Alpha values, left and right

        epsilon,
            segLength,
            i,
            len,
            tmp,
            u,
            ux,
            firstPoint = points[0],
            lastPoint = points[points.length - 1];

        bezCurve = [firstPoint, null, null, lastPoint];
        //console.log('gb', parameters.length);

        //Compute the A's
        A = maths.zeros_Xx2x2(parameters.length);
        for (i = 0, len = parameters.length; i < len; i++) {
            u = parameters[i];
            ux = 1 - u;
            a = A[i];

            a[0] = maths.mulItems(leftTangent, 3 * u * (ux * ux));
            a[1] = maths.mulItems(rightTangent, 3 * ux * (u * u));
        }

        //Create the C and X matrices
        C = [[0, 0], [0, 0]];
        X = [0, 0];
        for (i = 0, len = points.length; i < len; i++) {
            u = parameters[i];
            a = A[i];

            C[0][0] += maths.dot(a[0], a[0]);
            C[0][1] += maths.dot(a[0], a[1]);
            C[1][0] += maths.dot(a[0], a[1]);
            C[1][1] += maths.dot(a[1], a[1]);

            tmp = maths.subtract(points[i], bezier.q([firstPoint, firstPoint, lastPoint, lastPoint], u));

            X[0] += maths.dot(a[0], tmp);
            X[1] += maths.dot(a[1], tmp);
        }

        //Compute the determinants of C and X
        det_C0_C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1];
        det_C0_X = C[0][0] * X[1] - C[1][0] * X[0];
        det_X_C1 = X[0] * C[1][1] - X[1] * C[0][1];

        //Finally, derive alpha values
        alpha_l = det_C0_C1 === 0 ? 0 : det_X_C1 / det_C0_C1;
        alpha_r = det_C0_C1 === 0 ? 0 : det_C0_X / det_C0_C1;

        //If alpha negative, use the Wu/Barsky heuristic (see text).
        //If alpha is 0, you get coincident control points that lead to
        //divide by zero in any subsequent NewtonRaphsonRootFind() call.
        segLength = maths.vectorLen(maths.subtract(firstPoint, lastPoint));
        epsilon = 1.0e-6 * segLength;
        if (alpha_l < epsilon || alpha_r < epsilon) {
            //Fall back on standard (probably inaccurate) formula, and subdivide further if needed.
            bezCurve[1] = maths.addArrays(firstPoint, maths.mulItems(leftTangent, segLength / 3.0));
            bezCurve[2] = maths.addArrays(lastPoint, maths.mulItems(rightTangent, segLength / 3.0));
        } else {
            //First and last control points of the Bezier curve are
            //positioned exactly at the first and last data points
            //Control points 1 and 2 are positioned an alpha distance out
            //on the tangent vectors, left and right, respectively
            bezCurve[1] = maths.addArrays(firstPoint, maths.mulItems(leftTangent, alpha_l));
            bezCurve[2] = maths.addArrays(lastPoint, maths.mulItems(rightTangent, alpha_r));
        }

        return bezCurve;
    };

    /**
     * Given set of points and their parameterization, try to find a better parameterization.
     *
     * @param {Array<Array<Number>>} bezier - Current fitted curve
     * @param {Array<Array<Number>>} points - Array of digitized points
     * @param {Array<Number>} parameters - Current parameter values
     * @returns {Array<Number>} New parameter values
     */
    function reparameterize(bezier, points, parameters) {
        /*
        var j, len, point, results, u;
        results = [];
        for (j = 0, len = points.length; j < len; j++) {
            point = points[j], u = parameters[j];
             results.push(newtonRaphsonRootFind(bezier, point, u));
        }
        return results;
        //*/
        return parameters.map(function (p, i) {
            return newtonRaphsonRootFind(bezier, points[i], p);
        });
    };

    /**
     * Use Newton-Raphson iteration to find better root.
     *
     * @param {Array<Array<Number>>} bez - Current fitted curve
     * @param {Array<Number>} point - Digitized point
     * @param {Number} u - Parameter value for "P"
     * @returns {Number} New u
     */
    function newtonRaphsonRootFind(bez, point, u) {
        /*
            Newton's root finding algorithm calculates f(x)=0 by reiterating
            x_n+1 = x_n - f(x_n)/f'(x_n)
            We are trying to find curve parameter u for some point p that minimizes
            the distance from that point to the curve. Distance point to curve is d=q(u)-p.
            At minimum distance the point is perpendicular to the curve.
            We are solving
            f = q(u)-p * q'(u) = 0
            with
            f' = q'(u) * q'(u) + q(u)-p * q''(u)
            gives
            u_n+1 = u_n - |q(u_n)-p * q'(u_n)| / |q'(u_n)**2 + q(u_n)-p * q''(u_n)|
        */

        var d = maths.subtract(bezier.q(bez, u), point),
            qprime = bezier.qprime(bez, u),
            numerator = maths.mulMatrix(d, qprime),
            denominator = maths.sum(maths.squareItems(qprime)) + 2 * maths.mulMatrix(d, bezier.qprimeprime(bez, u));

        if (denominator === 0) {
            return u;
        } else {
            return u - numerator / denominator;
        }
    };

    /**
     * Assign parameter values to digitized points using relative distances between points.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points
     * @returns {Array<Number>} Parameter values
     */
    function chordLengthParameterize(points) {
        var u = [],
            currU,
            prevU,
            prevP;

        points.forEach(function (p, i) {
            currU = i ? prevU + maths.vectorLen(maths.subtract(p, prevP)) : 0;
            u.push(currU);

            prevU = currU;
            prevP = p;
        });
        u = u.map(function (x) {
            return x / prevU;
        });

        return u;
    };

    /**
     * Find the maximum squared distance of digitized points to fitted curve.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points
     * @param {Array<Array<Number>>} bez - Fitted curve
     * @param {Array<Number>} parameters - Parameterization of points
     * @returns {Array<Number>} Maximum error (squared) and point of max error
     */
    function computeMaxError(points, bez, parameters) {
        var dist, //Current error
        maxDist, //Maximum error
        splitPoint, //Point of maximum error
        v, //Vector from point to curve
        i, count, point, t;

        maxDist = 0;
        splitPoint = Math.floor(points.length / 2);

        var t_distMap = mapTtoRelativeDistances(bez, 10);

        for (i = 0, count = points.length; i < count; i++) {
            point = points[i];
            //Find 't' for a point on the bez curve that's as close to 'point' as possible:
            t = find_t(bez, parameters[i], t_distMap, 10);

            v = maths.subtract(bezier.q(bez, t), point);
            dist = v[0] * v[0] + v[1] * v[1];

            if (dist > maxDist) {
                maxDist = dist;
                splitPoint = i;
            }
        }

        return [maxDist, splitPoint];
    };

    //Sample 't's and map them to relative distances along the curve:
    var mapTtoRelativeDistances = function mapTtoRelativeDistances(bez, B_parts) {
        var B_t_curr;
        var B_t_dist = [0];
        var B_t_prev = bez[0];
        var sumLen = 0;

        for (var i = 1; i <= B_parts; i++) {
            B_t_curr = bezier.q(bez, i / B_parts);

            sumLen += maths.vectorLen(maths.subtract(B_t_curr, B_t_prev));

            B_t_dist.push(sumLen);
            B_t_prev = B_t_curr;
        }

        //Normalize B_length to the same interval as the parameter distances; 0 to 1:
        B_t_dist = B_t_dist.map(function (x) {
            return x / sumLen;
        });
        return B_t_dist;
    };

    function find_t(bez, param, t_distMap, B_parts) {
        if (param < 0) {
            return 0;
        }
        if (param > 1) {
            return 1;
        }

        /*
            'param' is a value between 0 and 1 telling us the relative position
            of a point on the source polyline (linearly from the start (0) to the end (1)).
            To see if a given curve - 'bez' - is a close approximation of the polyline,
            we compare such a poly-point to the point on the curve that's the same
            relative distance along the curve's length.
             But finding that curve-point takes a little work:
            There is a function "B(t)" to find points along a curve from the parametric parameter 't'
            (also relative from 0 to 1: http://stackoverflow.com/a/32841764/1869660
                                        http://pomax.github.io/bezierinfo/#explanation),
            but 't' isn't linear by length (http://gamedev.stackexchange.com/questions/105230).
             So, we sample some points along the curve using a handful of values for 't'.
            Then, we calculate the length between those samples via plain euclidean distance;
            B(t) concentrates the points around sharp turns, so this should give us a good-enough outline of the curve.
            Thus, for a given relative distance ('param'), we can now find an upper and lower value
            for the corresponding 't' by searching through those sampled distances.
            Finally, we just use linear interpolation to find a better value for the exact 't'.
             More info:
                http://gamedev.stackexchange.com/questions/105230/points-evenly-spaced-along-a-bezier-curve
                http://stackoverflow.com/questions/29438398/cheap-way-of-calculating-cubic-bezier-length
                http://steve.hollasch.net/cgindex/curves/cbezarclen.html
                https://github.com/retuxx/tinyspline
        */
        var lenMax, lenMin, tMax, tMin, t;

        //Find the two t-s that the current param distance lies between,
        //and then interpolate a somewhat accurate value for the exact t:
        for (var i = 1; i <= B_parts; i++) {

            if (param <= t_distMap[i]) {
                tMin = (i - 1) / B_parts;
                tMax = i / B_parts;
                lenMin = t_distMap[i - 1];
                lenMax = t_distMap[i];

                t = (param - lenMin) / (lenMax - lenMin) * (tMax - tMin) + tMin;
                break;
            }
        }
        return t;
    }

    /**
     * Creates a vector of length 1 which shows the direction from B to A
     */
    function createTangent(pointA, pointB) {
        return maths.normalize(maths.subtract(pointA, pointB));
    }

    /*
        Simplified versions of what we need from math.js
        Optimized for our input, which is only numbers and 1x2 arrays (i.e. [x, y] coordinates).
    */

    var maths = function () {
        function maths() {
            _classCallCheck(this, maths);
        }

        maths.zeros_Xx2x2 = function zeros_Xx2x2(x) {
            var zs = [];
            while (x--) {
                zs.push([0, 0]);
            }
            return zs;
        };

        maths.mulItems = function mulItems(items, multiplier) {
            return items.map(function (x) {
                return x * multiplier;
            });
        };

        maths.mulMatrix = function mulMatrix(m1, m2) {
            //https://en.wikipedia.org/wiki/Matrix_multiplication#Matrix_product_.28two_matrices.29
            //Simplified to only handle 1-dimensional matrices (i.e. arrays) of equal length:
            return m1.reduce(function (sum, x1, i) {
                return sum + x1 * m2[i];
            }, 0);
        };

        maths.subtract = function subtract(arr1, arr2) {
            return arr1.map(function (x1, i) {
                return x1 - arr2[i];
            });
        };

        maths.addArrays = function addArrays(arr1, arr2) {
            return arr1.map(function (x1, i) {
                return x1 + arr2[i];
            });
        };

        maths.addItems = function addItems(items, addition) {
            return items.map(function (x) {
                return x + addition;
            });
        };

        maths.sum = function sum(items) {
            return items.reduce(function (sum, x) {
                return sum + x;
            });
        };

        maths.dot = function dot(m1, m2) {
            return maths.mulMatrix(m1, m2);
        };

        maths.vectorLen = function vectorLen(v) {
            return Math.hypot.apply(Math, v);
        };

        maths.divItems = function divItems(items, divisor) {
            return items.map(function (x) {
                return x / divisor;
            });
        };

        maths.squareItems = function squareItems(items) {
            return items.map(function (x) {
                return x * x;
            });
        };

        maths.normalize = function normalize(v) {
            return this.divItems(v, this.vectorLen(v));
        };

        return maths;
    }();

    var bezier = function () {
        function bezier() {
            _classCallCheck(this, bezier);
        }

        bezier.q = function q(ctrlPoly, t) {
            var tx = 1.0 - t;
            var pA = maths.mulItems(ctrlPoly[0], tx * tx * tx),
                pB = maths.mulItems(ctrlPoly[1], 3 * tx * tx * t),
                pC = maths.mulItems(ctrlPoly[2], 3 * tx * t * t),
                pD = maths.mulItems(ctrlPoly[3], t * t * t);
            return maths.addArrays(maths.addArrays(pA, pB), maths.addArrays(pC, pD));
        };

        bezier.qprime = function qprime(ctrlPoly, t) {
            var tx = 1.0 - t;
            var pA = maths.mulItems(maths.subtract(ctrlPoly[1], ctrlPoly[0]), 3 * tx * tx),
                pB = maths.mulItems(maths.subtract(ctrlPoly[2], ctrlPoly[1]), 6 * tx * t),
                pC = maths.mulItems(maths.subtract(ctrlPoly[3], ctrlPoly[2]), 3 * t * t);
            return maths.addArrays(maths.addArrays(pA, pB), pC);
        };

        bezier.qprimeprime = function qprimeprime(ctrlPoly, t) {
            return maths.addArrays(maths.mulItems(maths.addArrays(maths.subtract(ctrlPoly[2], maths.mulItems(ctrlPoly[1], 2)), ctrlPoly[0]), 6 * (1.0 - t)), maths.mulItems(maths.addArrays(maths.subtract(ctrlPoly[3], maths.mulItems(ctrlPoly[2], 2)), ctrlPoly[1]), 6 * t));
        };

        return bezier;
    }();

    module.exports = fitCurve;
    module.exports.fitCubic = fitCubic;
    module.exports.createTangent = createTangent;
});


/* Boost Software License - Version 1.0 - August 17th, 2003

Permission is hereby granted, free of charge, to any person or organization
obtaining a copy of the software and accompanying documentation covered by
this license (the "Software") to use, reproduce, display, distribute,
execute, and transmit the Software, and to prepare derivative works of the
Software, and to permit third-parties to whom the Software is furnished to
do so, all subject to the following:

The copyright notices in the Software and this entire statement, including
the above license grant, this restriction and the following disclaimer,
must be included in all copies of the Software, in whole or in part, and
all derivative works of the Software, unless such copies or derivative
works are solely in the form of machine-executable object code generated by
a source language processor.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
 */

'use strict';
// Symmetric periodic vector centerlines; no raster data is used in the generated pattern.
const BASE=440, LINES=[[[-220.0,-220.0],[-220.0,-205.167]],[[-220.0,-205.167],[-220.0,-148.333]],[[-220.0,-205.167],[-203.933,-197.2],[-155.333,-150.0]],[[-220.0,-148.333],[-220.0,-73.0]],[[-220.0,-148.333],[-164.0,-143.0],[-155.333,-150.0]],[[-220.0,-73.0],[-220.0,-43.333]],[[-220.0,-73.0],[-184.667,-82.667],[-174.833,-73.833]],[[-220.0,-43.333],[-220.0,-0.333]],[[-220.0,-43.333],[-206.867,-46.533],[-186.4,-59.067],[-174.833,-73.833]],[[-220.0,-0.333],[-220.0,0.0],[-220.0,0.333]],[[-220.0,-0.333],[-198.333,-0.333]],[[-220.0,0.333],[-220.0,43.333]],[[-220.0,0.333],[-198.333,0.333]],[[-220.0,43.333],[-220.0,73.0]],[[-220.0,43.333],[-206.867,46.533],[-186.4,59.067],[-174.833,73.833]],[[-220.0,73.0],[-220.0,148.333]],[[-220.0,73.0],[-184.667,82.667],[-174.833,73.833]],[[-220.0,148.333],[-220.0,205.167]],[[-220.0,148.333],[-164.0,143.0],[-155.333,150.0]],[[-220.0,205.167],[-220.0,220.0]],[[-220.0,205.167],[-203.933,197.2],[-155.333,150.0]],[[-198.333,-0.333],[-198.136,0.0],[-198.333,0.333]],[[-198.333,-0.333],[-188.667,-16.2],[-180.333,-20.667]],[[-198.333,0.333],[-188.667,16.2],[-180.333,20.667]],[[-180.333,-20.667],[-172.533,-12.133],[-168.0,0.0]],[[-180.333,-20.667],[-168.667,-66.333],[-174.833,-73.833]],[[-180.333,20.667],[-172.533,12.133],[-168.0,-0.0]],[[-180.333,20.667],[-168.667,66.333],[-174.833,73.833]],[[-174.833,-73.833],[-144.0,-106.333]],[[-174.833,73.833],[-144.0,106.333]],[[-168.0,-0.0],[-139.333,-0.333]],[[-168.0,-0.0],[-139.333,0.333]],[[-155.617,-220.0],[-146.667,-160.0],[-146.8,-156.467],[-153.0,-150.0]],[[-155.617,220.0],[-146.667,160.0],[-146.8,156.467],[-153.0,150.0]],[[-155.333,-150.0],[-153.0,-150.0]],[[-155.333,150.0],[-153.0,150.0]],[[-153.0,-150.0],[-138.333,-137.0]],[[-153.0,150.0],[-138.333,137.0]],[[-144.0,-106.333],[-138.333,-137.0]],[[-144.0,-106.333],[-112.667,-112.0]],[[-144.0,106.333],[-138.333,137.0]],[[-144.0,106.333],[-112.667,112.0]],[[-139.333,-0.333],[-139.183,0.0],[-139.333,0.333]],[[-139.333,-0.333],[-133.4,-13.267],[-94.0,-37.667]],[[-139.333,-0.333],[-40.667,-0.333]],[[-139.333,0.333],[-133.4,13.267],[-94.0,37.667]],[[-139.333,0.333],[-40.667,0.333]],[[-138.333,-137.0],[-120.667,-142.0],[-108.667,-142.0]],[[-138.333,137.0],[-120.667,142.0],[-108.667,142.0]],[[-112.667,-112.0],[-108.667,-142.0]],[[-112.667,-112.0],[-100.0,-99.0]],[[-112.667,112.0],[-108.667,142.0]],[[-112.667,112.0],[-100.0,99.0]],[[-108.667,-142.0],[-77.333,-171.0],[-82.667,-178.0],[-80.8,-191.667],[-73.867,-205.533],[-70.739,-220.0]],[[-108.667,142.0],[-77.333,171.0],[-82.667,178.0],[-80.8,191.667],[-73.867,205.533],[-70.739,220.0]],[[-100.0,-99.0],[-102.333,-93.333],[-94.0,-37.667]],[[-100.0,-99.0],[-91.0,-98.333]],[[-100.0,99.0],[-102.333,93.333],[-94.0,37.667]],[[-100.0,99.0],[-91.0,98.333]],[[-94.0,-37.667],[-84.333,-36.133],[-52.467,-21.533],[-43.333,-19.667]],[[-94.0,37.667],[-84.333,36.133],[-52.467,21.533],[-43.333,19.667]],[[-91.0,-98.333],[-85.667,-102.667],[-35.333,-97.0]],[[-91.0,-98.333],[-34.0,-34.0]],[[-91.0,98.333],[-85.667,102.667],[-35.333,97.0]],[[-91.0,98.333],[-34.0,34.0]],[[-43.333,-19.667],[-40.0,-12.333],[-40.667,-0.333]],[[-43.333,-19.667],[-38.333,-23.0],[-34.0,-34.0]],[[-43.333,19.667],[-40.0,12.333],[-40.667,0.333]],[[-43.333,19.667],[-38.333,23.0],[-34.0,34.0]],[[-40.667,-0.333],[-40.648,0.0],[-40.667,0.333]],[[-37.44,-220.0],[-41.8,-206.333],[-76.333,-171.0],[-69.333,-165.667],[-55.0,-167.133],[-34.667,-175.133],[-20.333,-177.333]],[[-37.44,220.0],[-41.8,206.333],[-76.333,171.0],[-69.333,165.667],[-55.0,167.133],[-34.667,175.133],[-20.333,177.333]],[[-35.333,-97.0],[-33.467,-85.867],[-16.333,-42.333]],[[-35.333,-97.0],[-11.2,-134.067],[0.0,-139.333]],[[-35.333,97.0],[-33.467,85.867],[-16.333,42.333]],[[-35.333,97.0],[-11.2,134.067],[0.0,139.333]],[[-34.0,-34.0],[-20.667,-38.267],[-16.333,-42.333]],[[-34.0,34.0],[-20.667,38.267],[-16.333,42.333]],[[-20.333,-177.333],[-16.0,-185.333],[0.0,-193.333]],[[-20.333,-177.333],[-6.867,-166.133],[0.0,-164.333]],[[-20.333,177.333],[-16.0,185.333],[0.0,193.333]],[[-20.333,177.333],[-6.867,166.133],[0.0,164.333]],[[-16.333,-42.333],[0.0,-41.0]],[[-16.333,42.333],[0.0,41.0]],[[0.0,-220.0],[0.0,-193.333]],[[0.0,-193.333],[16.0,-185.333],[20.333,-177.333]],[[-0.0,-164.333],[0.0,-139.333]],[[-0.0,-164.333],[6.867,-166.133],[20.333,-177.333]],[[0.0,-139.333],[0.0,-41.0]],[[0.0,-139.333],[11.2,-134.067],[35.333,-97.0]],[[0.0,-41.0],[16.333,-42.333]],[[0.0,41.0],[0.0,139.333]],[[0.0,41.0],[16.333,42.333]],[[0.0,139.333],[0.0,164.333]],[[0.0,139.333],[11.2,134.067],[35.333,97.0]],[[-0.0,164.333],[6.867,166.133],[20.333,177.333]],[[0.0,193.333],[0.0,220.0]],[[0.0,193.333],[16.0,185.333],[20.333,177.333]],[[16.333,-42.333],[20.667,-38.267],[34.0,-34.0]],[[16.333,-42.333],[33.467,-85.867],[35.333,-97.0]],[[16.333,42.333],[20.667,38.267],[34.0,34.0]],[[16.333,42.333],[33.467,85.867],[35.333,97.0]],[[20.333,-177.333],[34.667,-175.133],[55.0,-167.133],[69.333,-165.667],[76.333,-171.0],[41.8,-206.333],[37.44,-220.0]],[[20.333,177.333],[34.667,175.133],[55.0,167.133],[69.333,165.667],[76.333,171.0],[41.8,206.333],[37.44,220.0]],[[34.0,-34.0],[38.333,-23.0],[43.333,-19.667]],[[34.0,-34.0],[91.0,-98.333]],[[34.0,34.0],[38.333,23.0],[43.333,19.667]],[[34.0,34.0],[91.0,98.333]],[[35.333,-97.0],[85.667,-102.667],[91.0,-98.333]],[[35.333,97.0],[85.667,102.667],[91.0,98.333]],[[40.667,-0.333],[40.0,-12.333],[43.333,-19.667]],[[40.667,-0.333],[40.648,0.0],[40.667,0.333]],[[40.667,-0.333],[139.333,-0.333]],[[40.667,0.333],[40.0,12.333],[43.333,19.667]],[[40.667,0.333],[139.333,0.333]],[[43.333,-19.667],[52.467,-21.533],[84.333,-36.133],[94.0,-37.667]],[[43.333,19.667],[52.467,21.533],[84.333,36.133],[94.0,37.667]],[[70.739,-220.0],[73.867,-205.533],[80.8,-191.667],[82.667,-178.0],[77.333,-171.0],[108.667,-142.0]],[[70.739,220.0],[73.867,205.533],[80.8,191.667],[82.667,178.0],[77.333,171.0],[108.667,142.0]],[[91.0,-98.333],[100.0,-99.0]],[[91.0,98.333],[100.0,99.0]],[[94.0,-37.667],[102.333,-93.333],[100.0,-99.0]],[[94.0,-37.667],[133.4,-13.267],[139.333,-0.333]],[[94.0,37.667],[102.333,93.333],[100.0,99.0]],[[94.0,37.667],[133.4,13.267],[139.333,0.333]],[[100.0,-99.0],[112.667,-112.0]],[[100.0,99.0],[112.667,112.0]],[[108.667,-142.0],[112.667,-112.0]],[[108.667,-142.0],[120.667,-142.0],[138.333,-137.0]],[[108.667,142.0],[112.667,112.0]],[[108.667,142.0],[120.667,142.0],[138.333,137.0]],[[112.667,-112.0],[144.0,-106.333]],[[112.667,112.0],[144.0,106.333]],[[138.333,-137.0],[144.0,-106.333]],[[138.333,-137.0],[153.0,-150.0]],[[138.333,137.0],[144.0,106.333]],[[138.333,137.0],[153.0,150.0]],[[139.333,-0.333],[139.183,0.0],[139.333,0.333]],[[139.333,-0.333],[168.0,0.0]],[[139.333,0.333],[168.0,-0.0]],[[144.0,-106.333],[174.833,-73.833]],[[144.0,106.333],[174.833,73.833]],[[153.0,-150.0],[146.8,-156.467],[146.667,-160.0],[155.617,-220.0]],[[153.0,-150.0],[155.333,-150.0]],[[153.0,150.0],[146.8,156.467],[146.667,160.0],[155.617,220.0]],[[153.0,150.0],[155.333,150.0]],[[155.333,-150.0],[164.0,-143.0],[220.0,-148.333]],[[155.333,-150.0],[203.933,-197.2],[220.0,-205.167]],[[155.333,150.0],[164.0,143.0],[220.0,148.333]],[[155.333,150.0],[203.933,197.2],[220.0,205.167]],[[168.0,-0.0],[172.533,-12.133],[180.333,-20.667]],[[168.0,-0.0],[172.533,12.133],[180.333,20.667]],[[174.833,-73.833],[168.667,-66.333],[180.333,-20.667]],[[174.833,-73.833],[184.667,-82.667],[220.0,-73.0]],[[174.833,-73.833],[186.4,-59.067],[206.867,-46.533],[220.0,-43.333]],[[174.833,73.833],[168.667,66.333],[180.333,20.667]],[[174.833,73.833],[184.667,82.667],[220.0,73.0]],[[174.833,73.833],[186.4,59.067],[206.867,46.533],[220.0,43.333]],[[180.333,-20.667],[188.667,-16.2],[198.333,-0.333]],[[180.333,20.667],[188.667,16.2],[198.333,0.333]],[[198.333,-0.333],[198.136,0.0],[198.333,0.333]],[[198.333,-0.333],[220.0,-0.333]],[[198.333,0.333],[220.0,0.333]],[[220.0,-220.0],[220.0,-205.167]],[[220.0,-205.167],[220.0,-148.333]],[[220.0,-148.333],[220.0,-73.0]],[[220.0,-73.0],[220.0,-43.333]],[[220.0,-43.333],[220.0,-0.333]],[[220.0,-0.333],[220.0,0.0],[220.0,0.333]],[[220.0,0.333],[220.0,43.333]],[[220.0,43.333],[220.0,73.0]],[[220.0,73.0],[220.0,148.333]],[[220.0,148.333],[220.0,205.167]],[[220.0,205.167],[220.0,220.0]]];
const $=id=>document.getElementById(id), KEYS=['width','height','unit','mode','tile','cols','rows','radius','angle','shiftX','shiftY','stroke','opacity','fill','bg','transparent','exportStyle','ungrouped','patternSource','customRepeat','customColors','ignoreSvgBackground','customGrow','barPlacement','autoBarWidth','topEnabled','topWidth','topHeight','topOffset','topGap','bottomEnabled','bottomWidth','bottomHeight','bottomOffset','bottomGap','thickness'];
const DEFAULTS=Object.fromEntries(KEYS.map(k=>[k,$(k).type==='checkbox'?$(k).checked:$(k).value]));
let grid=false,seam=false,lastState=null,toastTimer,previousUnit='mm',frame=0;
const fmt=n=>Number(n.toFixed(8)).toString(), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function openCurve(p,r){
 if(p.length<2)return '';const pt=v=>v.map(fmt).join(' ');if(r===0||p.length===2)return 'M'+p.map(pt).join('L');
 let d='M'+pt(p[0]);for(let i=1;i<p.length-1;i++){const a=p[i-1],v=p[i],b=p[i+1],la=Math.hypot(a[0]-v[0],a[1]-v[1]),lb=Math.hypot(b[0]-v[0],b[1]-v[1]);if(la<1e-7||lb<1e-7)continue;const cut=Math.min(r,la*.3,lb*.3),before=[v[0]+(a[0]-v[0])/la*cut,v[1]+(a[1]-v[1])/la*cut],after=[v[0]+(b[0]-v[0])/lb*cut,v[1]+(b[1]-v[1])/lb*cut];d+='L'+pt(before)+'Q'+pt(v)+' '+pt(after)}return d+'L'+pt(p[p.length-1]);
}
function builtInBaseState(){
 const s={}; let valid=true;
 for(const k of KEYS){const e=$(k);s[k]=e.type==='checkbox'?e.checked:e.type==='number'||e.type==='range'?Number(e.value):e.value;if(e.type==='number'){const good=e.value!==''&&Number.isFinite(s[k])&&s[k]>=Number(e.min)&&s[k]<=Number(e.max);e.classList.toggle('invalid',!good);if(!good)valid=false;}}
 if(!valid)return null;
 s.cols=Math.round(s.cols);s.rows=Math.round(s.rows);
 if(s.mode==='fit'){s.nx=Math.max(1,Math.round(s.width/s.tile));s.ny=Math.max(1,Math.round(s.height/s.tile));s.px=s.width/s.nx;s.py=s.height/s.ny}
 else if(s.mode==='count'){s.nx=s.cols;s.ny=s.rows;s.px=s.width/s.nx;s.py=s.height/s.ny}
 else{s.px=s.py=s.tile;s.nx=Math.ceil(s.width/s.tile);s.ny=Math.ceil(s.height/s.tile)}
 s.seamless=Math.abs(s.width/s.px-Math.round(s.width/s.px))<1e-7&&Math.abs(s.height/s.py-Math.round(s.height/s.py))<1e-7;
 s.paths=LINES.map(p=>openCurve(p,s.radius));
 return s;
}
function copies(s){
 // Include adjacent periodic centerlines on each boundary, including stroke overhang.
 const rad=s.angle*Math.PI/180,c=Math.cos(rad),sn=Math.sin(rad),points=LINES.flat().map(([x,y])=>[x*c-y*sn,x*sn+y*c]),pad=s.stroke/Math.min(s.px,s.py)*BASE/2+1;
 const minx=Math.min(...points.map(p=>p[0]))-pad,maxx=Math.max(...points.map(p=>p[0]))+pad,miny=Math.min(...points.map(p=>p[1]))-pad,maxy=Math.max(...points.map(p=>p[1]))+pad,offx=BASE/2+s.shiftX/100*BASE,offy=BASE/2+s.shiftY/100*BASE,arr=[];
 for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const x=offx+i*BASE,y=offy+j*BASE;if(x+maxx>0&&x+minx<BASE&&y+maxy>0&&y+miny<BASE)arr.push([x,y])}return arr;
}
function cellPaths(s){
 const a=s.angle*Math.PI/180,c=Math.cos(a),sn=Math.sin(a),sx=s.px/BASE,sy=s.py/BASE,out=[],seen=new Set();
 for(const [cx,cy] of copies(s))for(const line of LINES){
   const p=line.map(([x,y])=>[(x*c-y*sn+cx)*sx,(x*sn+y*c+cy)*sy]),pad=s.stroke/2;
   if(Math.max(...p.map(v=>v[0]))+pad<0||Math.min(...p.map(v=>v[0]))-pad>s.px||Math.max(...p.map(v=>v[1]))+pad<0||Math.min(...p.map(v=>v[1]))-pad>s.py)continue;
   const forward=p.map(v=>v.map(fmt).join(',')).join(';'),backward=[...p].reverse().map(v=>v.map(fmt).join(',')).join(';'),key=forward<backward?forward:backward;
   if(seen.has(key))continue;seen.add(key);
   out.push(openCurve(p,s.radius*Math.min(sx,sy)));
 }return out;
}
function cellContent(s,individual=false){
 const paths=cellPaths(s),style=`fill="none" stroke="${s.fill}" stroke-width="${s.stroke}" stroke-linejoin="round" stroke-linecap="round"`;
 return individual?paths.map(d=>`<path d="${d}" ${style}/>`).join(''):`<path d="${paths.join('')}" ${style}/>`;
}
function colorGroup(color,label,content,attrs=''){return `<g id="color-${color.slice(1).toLowerCase()}" data-color="${color}" inkscape:groupmode="layer" inkscape:label="${esc(label+' '+color.toUpperCase())}" ${attrs}>${content}</g>`}
function previewSVG(s,{tile=false,flat=false,preview=false,onlyColor=null}={}){
 const w=tile?s.px:s.width,h=tile?s.py:s.height,sw=preview&&seam?w*2:w,sh=preview&&seam?h*2:h;
 let defs='',body='';const desc='Geometric floral lattice, vector reconstruction from reference. Uniform-width editable centerline strokes, one top-level group per actual color. Geometry transforms are baked into coordinates; stroke widths are never stretched. '+(s.seamless?'The full canvas repeats seamlessly on both axes.':'Fixed-size tiles; the cropped canvas may not itself repeat.');
 if(flat){const nx=tile?1:s.nx,ny=tile?1:s.ny;if(nx*ny*cellPaths(s).length>120000)throw Error('独立路径数量超过 120,000，请减小行列数，或改用「精简 SVG」。');
 defs=`<clipPath id="canvas-clip"><rect width="${fmt(w)}" height="${fmt(h)}"/></clipPath><clipPath id="tile-clip"><rect width="${s.px}" height="${s.py}"/></clipPath>`;
 body=`<g clip-path="url(#canvas-clip)">`;
 // Each visible shape has its own path. Clip each tile to avoid overlapping wrapped copies.
 const content=cellContent(s,true);
 for(let j=0;j<ny;j++)for(let i=0;i<nx;i++)body+=`<g id="tile-${j+1}-${i+1}" transform="translate(${fmt(i*s.px)} ${fmt(j*s.py)})"><g clip-path="url(#tile-clip)">${content}</g></g>`;body+='</g>';
 }else{defs=`<pattern id="floral-tile" patternUnits="userSpaceOnUse" width="${s.px}" height="${s.py}" >${cellContent(s)}</pattern>`;body=`<rect width="${fmt(w)}" height="${fmt(h)}" fill="url(#floral-tile)"/>`}
 const background=`<rect width="${fmt(w)}" height="${fmt(h)}" fill="${s.bg}"/>`;
 const hasInk=!onlyColor||onlyColor.toLowerCase()===s.fill.toLowerCase(),hasBackground=!s.transparent&&(!onlyColor||onlyColor.toLowerCase()===s.bg.toLowerCase());
 body=hasInk?colorGroup(s.fill,'图案（可编辑描边）',body,`opacity="${s.opacity/100}"`):'';
 if(hasBackground){if(hasInk&&s.bg.toLowerCase()===s.fill.toLowerCase()){body=colorGroup(s.fill,'同色对象',background+body.replace(/ id="color-[^"]+"/,'').replace(/ data-color="[^"]+"/,'').replace(/ inkscape:groupmode="layer"/,''))}else body=colorGroup(s.bg,'背景',background)+body}

 if(preview&&grid){defs+=`<pattern id="grid" width="${s.px}" height="${s.py}" patternUnits="userSpaceOnUse"><path d="M0 ${s.py}V0H${s.px}" fill="none" stroke="#d87940" stroke-width="1" vector-effect="non-scaling-stroke" stroke-dasharray="5 4"/></pattern>`;body+=`<rect width="${w}" height="${h}" fill="url(#grid)" pointer-events="none"/>`}
 if(preview&&seam){defs+=`<pattern id="canvas-repeat" patternUnits="userSpaceOnUse" width="${w}" height="${h}">${body}</pattern>`;body=`<rect width="${sw}" height="${sh}" fill="url(#canvas-repeat)"/>`}
 if(preview&&seam)body+=`<path d="M${w} 0V${sh}M0 ${h}H${sw}" stroke="#d56837" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-dasharray="8 5" fill="none"/>`;
 const meta=esc(JSON.stringify(Object.fromEntries(KEYS.map(k=>[k,s[k]]))));
 return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="${fmt(sw)}${s.unit}" height="${fmt(sh)}${s.unit}" viewBox="0 0 ${fmt(sw)} ${fmt(sh)}"><title>花间 · 几何花窗无缝纹样</title><desc>${desc}</desc><metadata id="pattern-settings">${meta}</metadata><defs>${defs}</defs>${body}</svg>`;
}
// Export actual, editable cubic Bezier curves. No pattern/use/clip/mask/transforms.

function pathSegments(d){
 const tokens=d.match(/[MLQ]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/gi)||[];let i=0,p=[0,0];const out=[];
 const point=()=>[Number(tokens[i++]),Number(tokens[i++])];
 while(i<tokens.length){const cmd=tokens[i++];if(cmd==='M')p=point();else if(cmd==='L'){const q=point();out.push([p,q]);p=q}else if(cmd==='Q'){const c=point(),q=point();out.push([p,c,q]);p=q}else throw Error('无法识别的曲线命令。')}
 return out;
}
function curvePoint(p,t){if(p.length===2)return p[0].map((v,k)=>v+(p[1][k]-v)*t);return p[0].map((v,k)=>(1-t)*(1-t)*v+2*(1-t)*t*p[1][k]+t*t*p[2][k])}
function curveRoots(p,k,bound){
 if(p.length===2){const d=p[1][k]-p[0][k];return Math.abs(d)<1e-12?[]:[(bound-p[0][k])/d]}
 const a=p[0][k]-2*p[1][k]+p[2][k],b=2*(p[1][k]-p[0][k]),c=p[0][k]-bound;
 if(Math.abs(a)<1e-12)return Math.abs(b)<1e-12?[]:[-c/b];const disc=b*b-4*a*c;if(disc<0)return [];const r=Math.sqrt(disc);return [(-b-r)/(2*a),(-b+r)/(2*a)];
}
function curvePieces(p,w,h){
 const ts=[0,1,...curveRoots(p,0,0),...curveRoots(p,0,w),...curveRoots(p,1,0),...curveRoots(p,1,h)].filter(t=>t>=0&&t<=1).sort((a,b)=>a-b),out=[];
 for(let i=1;i<ts.length;i++){const a=ts[i-1],b=ts[i];if(b-a<1e-10)continue;const mid=curvePoint(p,(a+b)/2);if(mid[0]<-1e-8||mid[0]>w+1e-8||mid[1]<-1e-8||mid[1]>h+1e-8)continue;
  const start=curvePoint(p,a),end=curvePoint(p,b);let c1,c2;
  if(p.length===2){c1=start.map((v,k)=>v+(end[k]-v)/3);c2=start.map((v,k)=>v+2*(end[k]-v)/3)}
  else {const control=start.map((v,k)=>v+(b-a)*((1-a)*(p[1][k]-p[0][k])+a*(p[2][k]-p[1][k])));c1=start.map((v,k)=>v+2*(control[k]-v)/3);c2=end.map((v,k)=>v+2*(control[k]-v)/3)}
  out.push([start,c1,c2,end]);
 }return out;
}
function editablePaths(s,w,h){
 const nx=Math.ceil(w/s.px),ny=Math.ceil(h/s.py);if((nx+2)*(ny+2)*LINES.length>250000)throw Error('直接曲线路径过多，请减小行列数或放大单元尺寸。');
 const angle=s.angle*Math.PI/180,c=Math.cos(angle),sn=Math.sin(angle),sx=s.px/BASE,sy=s.py/BASE,seen=new Set(),out=[];
 const pt=p=>p.map(fmt).join(' '),keyPoint=p=>p.map(v=>Number(v.toFixed(6))).join(','),equal=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1])<1e-7;
 for(let j=-1;j<=ny;j++)for(let i=-1;i<=nx;i++)for(const line of LINES){
  const points=line.map(([x,y])=>[(x*c-y*sn)*sx+(i+.5+s.shiftX/100)*s.px,(x*sn+y*c)*sy+(j+.5+s.shiftY/100)*s.py]);
  const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);if(Math.max(...xs)<0||Math.min(...xs)>w||Math.max(...ys)<0||Math.min(...ys)>h)continue;
  let chain='',last=null;
  for(const segment of pathSegments(openCurve(points,s.radius*Math.min(sx,sy))))for(const part of curvePieces(segment,w,h)){
   if(equal(part[0],part[3])&&equal(part[0],part[1])&&equal(part[0],part[2]))continue;
   const f=part.map(keyPoint).join(';'),r=[...part].reverse().map(keyPoint).join(';'),key=f<r?f:r;if(seen.has(key)){if(chain){out.push(chain);chain='';last=null}continue}seen.add(key);
   if(!last||!equal(last,part[0])){if(chain)out.push(chain);chain='M'+pt(part[0])}chain+='C'+part.slice(1).map(pt).join(' ');last=part[3];
  }if(chain)out.push(chain);
 }return out;
}
function editableSVG(s,{tile=false,onlyColor=null,ungrouped=false}={}){
 const w=tile?s.px:s.width,h=tile?s.py:s.height,hasInk=!onlyColor||onlyColor.toLowerCase()===s.fill.toLowerCase(),hasBg=!s.transparent&&(!onlyColor||onlyColor.toLowerCase()===s.bg.toLowerCase());
 const groups=new Map(),add=(color,label,content)=>{const key=color.toLowerCase();if(!groups.has(key))groups.set(key,{label,parts:[]});groups.get(key).parts.push(content)};
 if(hasBg)add(s.bg,'背景',`<path id="background-curve" d="M0 0L${fmt(w)} 0L${fmt(w)} ${fmt(h)}L0 ${fmt(h)}Z" fill="${s.bg}" stroke="none"/>`);
 if(hasInk){const paths=editablePaths(s,w,h);if(paths.length>120000)throw Error('直接曲线路径超过 120000 条，请减少行列数。');add(s.fill,'图案曲线',paths.map((d,i)=>`<path id="curve-${String(i+1).padStart(6,'0')}" d="${d}" fill="none" stroke="${s.fill}" stroke-width="${fmt(s.stroke)}" stroke-linecap="round" stroke-linejoin="round" opacity="${s.opacity/100}"/>`).join(''))}
 const body=[...groups].map(([color,g])=>ungrouped||s.exportStyle==='ungrouped'?g.parts.join(''):`<g id="color-${color.slice(1)}" data-color="${color}"><title>${esc(g.label+' '+color.toUpperCase())}</title>${g.parts.join('')}</g>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${fmt(w)}${s.unit}" height="${fmt(h)}${s.unit}" viewBox="0 0 ${fmt(w)} ${fmt(h)}"><title>花间 V6 · 可直接编辑节点的贝塞尔曲线</title><desc>Plain cubic Bezier paths. One color group per color. No pattern, use, clipping, mask, transforms or embedded bitmap. Ungroup one color group to edit individual curves.</desc>${body}</svg>`;
}

// V6: expand uniform-width strokes, union all intersections, export closed boundaries.
const CONTOUR_SCALE=10000;
let contourCacheKey='',contourCache=null,ringCache=new WeakMap();
function flattenQuadratic(segment,tol,out){
 if(segment.length===2){out.push(segment[1]);return}
 const [a,b,c]=segment,dx=c[0]-a[0],dy=c[1]-a[1],length=Math.hypot(dx,dy),dist=length?Math.abs(dx*(a[1]-b[1])-(a[0]-b[0])*dy)/length:Math.hypot(b[0]-a[0],b[1]-a[1]);
 if(dist<=tol){out.push(c);return}
 const ab=a.map((v,k)=>(v+b[k])/2),bc=b.map((v,k)=>(v+c[k])/2),mid=ab.map((v,k)=>(v+bc[k])/2);
 flattenQuadratic([a,ab,mid],tol,out);flattenQuadratic([mid,bc,c],tol,out);
}
function polygonBoolean(subject,clip,type){const c=new ClipperLib.Clipper(),solution=[];c.StrictlySimple=true;c.AddPaths(subject,ClipperLib.PolyType.ptSubject,true);if(clip.length)c.AddPaths(clip,ClipperLib.PolyType.ptClip,true);c.Execute(type,solution,ClipperLib.PolyFillType.pftNonZero,ClipperLib.PolyFillType.pftNonZero);return solution}
function builtInContourGeometry(s,w,h){
 const key=JSON.stringify([w,h,s.px,s.py,s.radius,s.angle,s.shiftX,s.shiftY,s.stroke,s.unit]);if(key===contourCacheKey&&contourCache)return contourCache;
 const nx=Math.ceil(w/s.px),ny=Math.ceil(h/s.py);if((nx+2)*(ny+2)*LINES.length>45000)throw Error('轮廓计算数量较大，请减少行列数或增大单元尺寸。');
 const unitFactor={px:1,mm:96/25.4,cm:96/2.54}[s.unit],tol=Math.max(.0002,Math.min(s.stroke/100,.02/unitFactor)),angle=s.angle*Math.PI/180,c=Math.cos(angle),sn=Math.sin(angle),sx=s.px/BASE,sy=s.py/BASE,offset=new ClipperLib.ClipperOffset(2,tol*CONTOUR_SCALE),seen=new Set(),half=s.stroke/2;
 let count=0;
 for(let j=-1;j<=ny;j++)for(let i=-1;i<=nx;i++)for(const line of LINES){
  const points=line.map(([x,y])=>[(x*c-y*sn)*sx+(i+.5+s.shiftX/100)*s.px,(x*sn+y*c)*sy+(j+.5+s.shiftY/100)*s.py]);
  if(Math.max(...points.map(p=>p[0]))+half<0||Math.min(...points.map(p=>p[0]))-half>w||Math.max(...points.map(p=>p[1]))+half<0||Math.min(...points.map(p=>p[1]))-half>h)continue;
  const segments=pathSegments(openCurve(points,s.radius*Math.min(sx,sy))),poly=[points[0]];for(const segment of segments)flattenQuadratic(segment,tol,poly);
  const integer=[];for(const p of poly){const q={X:Math.round(p[0]*CONTOUR_SCALE),Y:Math.round(p[1]*CONTOUR_SCALE)};if(!integer.length||integer[integer.length-1].X!==q.X||integer[integer.length-1].Y!==q.Y)integer.push(q)}if(integer.length<2)continue;
  const f=integer.map(p=>p.X+','+p.Y).join(';'),r=[...integer].reverse().map(p=>p.X+','+p.Y).join(';'),id=f<r?f:r;if(seen.has(id))continue;seen.add(id);
  const closed=integer[0].X===integer[integer.length-1].X&&integer[0].Y===integer[integer.length-1].Y;
  if(closed)integer.pop();offset.AddPath(integer,ClipperLib.JoinType.jtRound,closed?ClipperLib.EndType.etClosedLine:ClipperLib.EndType.etOpenRound);count++;
 }
 const expanded=[];offset.Execute(expanded,half*CONTOUR_SCALE);
 const frame=[[{X:0,Y:0},{X:Math.round(w*CONTOUR_SCALE),Y:0},{X:Math.round(w*CONTOUR_SCALE),Y:Math.round(h*CONTOUR_SCALE)},{X:0,Y:Math.round(h*CONTOUR_SCALE)}]];
 const ink=polygonBoolean(expanded,frame,ClipperLib.ClipType.ctIntersection),background=polygonBoolean(frame,ink,ClipperLib.ClipType.ctDifference);
 contourCacheKey=key;contourCache={ink,background,frame,tol,w,h,count};ringCache=new WeakMap();return contourCache;
}
function ringCurve(ring,geometry){
 if(ringCache.has(ring))return ringCache.get(ring);
 const p=ring.map(v=>[v.X/CONTOUR_SCALE,v.Y/CONTOUR_SCALE]),n=p.length,pt=v=>v.map(fmt).join(' ');if(n<3)return '';
 const corners=[];for(let i=0;i<n;i++){const a=p[(i+n-1)%n],b=p[i],c=p[(i+1)%n],u=[b[0]-a[0],b[1]-a[1]],v=[c[0]-b[0],c[1]-b[1]],len=Math.hypot(...u)*Math.hypot(...v),angle=len?Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/len))):0;
  const la=Math.hypot(...u),lb=Math.hypot(...v);
  // Preserve transitions from long straight edges to densely sampled round joins.
  // Otherwise endpoint-only fitting can bow a long edge between sample points.
  if(angle>.6||la>lb*2.5||lb>la*2.5)corners.push(i);
 }if(corners.length<2){corners.length=0;corners.push(0,Math.floor(n/2))}
 let d='M'+pt(p[corners[0]]);
 for(let j=0;j<corners.length;j++){let a=corners[j],b=corners[(j+1)%corners.length];if(b<=a)b+=n;const span=[];for(let i=a;i<=b;i++)span.push(p[i%n]);
  // Test interior samples as well as vertices to bound deviation along long edges.
  const sampled=[span[0]];for(let i=1;i<span.length;i++)for(let k=1;k<=4;k++)sampled.push(span[i-1].map((v,j)=>v+(span[i][j]-v)*k/4));
  const curves=fitCurve(sampled,geometry.tol*geometry.tol);
  for(const curve of curves){const controls=curve.slice(1).map(v=>[Math.max(0,Math.min(geometry.w,v[0])),Math.max(0,Math.min(geometry.h,v[1]))]);d+='C'+controls.map(pt).join(' ')}
 }d+='Z';ringCache.set(ring,d);return d;
}
function contourSVG(s,{tile=false,onlyColor=null,ungrouped=false,wireframe=s.exportStyle==='outline',preview=false}={}){
 if(isCustom(s))return customContourSVG(s,{tile,onlyColor,ungrouped,wireframe,preview});
 const bodyW=tile?s.px:s.width,bodyH=tile?s.py:s.height,geometry=tile?baseContourGeometry(s,bodyW,bodyH):contourGeometry(s,bodyW,bodyH),w=geometry.w,h=geometry.h,groups=new Map();
 const add=(color,label,rings)=>{const key=color.toLowerCase();if(!onlyColor||onlyColor.toLowerCase()===key){if(!groups.has(key))groups.set(key,{label,rings:[]});groups.get(key).rings.push(...rings)}};
 if(!s.transparent)add(s.bg,'背景闭合轮廓',geometry.background);add(s.fill,'图案闭合轮廓',geometry.ink);
 // Equal colors describe one full canvas region, with no duplicated internal borders.
 if(!s.transparent&&s.fill.toLowerCase()===s.bg.toLowerCase()&&groups.has(s.fill.toLowerCase()))groups.get(s.fill.toLowerCase()).rings=geometry.frame;
 let body='';for(const [color,g] of groups){const paths=g.rings.map(r=>ringCurve(r,geometry)).filter(Boolean),lineColor=preview?'#ef5753':color,thin=preview?1.1:.5/({px:1,mm:96/25.4,cm:96/2.54}[s.unit]);let content;
  const alpha=color===s.fill.toLowerCase()?s.opacity/100:1;
  if(wireframe)content=paths.map((d,i)=>`<path id="boundary-${color.slice(1)}-${i+1}" d="${d}" fill="none" stroke="${lineColor}" stroke-width="${fmt(thin)}"${preview?' vector-effect="non-scaling-stroke"':''} opacity="${alpha}"/>`).join('');
  else content=`<path id="region-${color.slice(1)}" d="${paths.join('')}" fill="${color}" fill-rule="evenodd" stroke="none" opacity="${alpha}"/>`;
  body+=ungrouped||s.ungrouped?content:`<g id="color-${color.slice(1)}" data-color="${color}"><title>${esc(g.label+' '+color.toUpperCase())}</title>${content}</g>`;
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${fmt(w)}${s.unit}" height="${fmt(h)}${s.unit}" viewBox="0 0 ${fmt(w)} ${fmt(h)}"><title>花间 V6 · 描边展开后的闭合内外轮廓</title><desc>Closed outer and inner boundary curves. Uniform strokes expanded and intersections united. Every boundary ends with Z. No centerline strokes, patterns, references, clipping masks or bitmaps. Material width ${s.stroke} ${s.unit}.</desc>${body}</svg>`;
}
let outlineView=false;
function contourPreview(s){
 const base=contourSVG(s,{onlyColor:s.fill,wireframe:true,ungrouped:true,preview:true});let inner=base.slice(base.indexOf('>')+1,base.lastIndexOf('</svg>'));
 const w=seam?s.width*2:s.width,h=seam?s.height*2:s.height;
 if(seam)inner=`<defs><pattern id="outline-repeat" width="${s.width}" height="${s.height}" patternUnits="userSpaceOnUse">${inner}</pattern></defs><rect width="${w}" height="${h}" fill="url(#outline-repeat)"/><path d="M${s.width} 0V${h}M0 ${s.height}H${w}" stroke="#c5a05a" fill="none" stroke-dasharray="6 5"/>`;
 if(grid){for(let i=1;i<s.nx;i++)inner+=`<path d="M${i*s.px} 0V${h}" stroke="#c3c8bc" stroke-width=".5" stroke-dasharray="5 5"/>`;for(let j=1;j<s.ny;j++)inner+=`<path d="M0 ${j*s.py}H${w}" stroke="#c3c8bc" stroke-width=".5" stroke-dasharray="5 5"/>`}
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}${s.unit}" height="${h}${s.unit}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#fffefa"/>${inner}</svg>`;
}

// V6: adjustable border solids and watertight extrusion of the same SVG profile.
let assemblyKey='',assemblyGeometry=null,meshKey='',meshCache=null,planarKey='',planarMesh=null,modelView=false;
function state(){const s=customBaseState();if(!s)return null;
 if(s.autoBarWidth){s.topWidth=s.bottomWidth=s.width;$('topWidth').value=fmt(s.width);$('bottomWidth').value=fmt(s.width)}
 if(s.barPlacement==='inside')for(const side of ['top','bottom']){s[side+'Height']=Math.min(s.height,s[side+'Height']);s[side+'Gap']=Math.min(Math.max(0,s.height-s[side+'Height']),s[side+'Gap']);$(side+'Height').value=fmt(s[side+'Height']);$(side+'Gap').value=fmt(s[side+'Gap'])}
 const b=assemblyBounds(s);s.outputWidth=b.maxX-b.minX;s.outputHeight=b.maxY-b.minY;return s;
}
function borderRectangles(s){const r=[];
 if(s.topEnabled&&s.topHeight>0&&s.topWidth>0)r.push({name:'top',x:(s.width-s.topWidth)/2+s.topOffset,y:s.barPlacement==='outside'?-s.topHeight-s.topGap:s.topGap,w:s.topWidth,h:s.topHeight});
 if(s.bottomEnabled&&s.bottomHeight>0&&s.bottomWidth>0)r.push({name:'bottom',x:(s.width-s.bottomWidth)/2+s.bottomOffset,y:s.barPlacement==='outside'?s.height+s.bottomGap:s.height-s.bottomGap-s.bottomHeight,w:s.bottomWidth,h:s.bottomHeight});return r;
}
function assemblyBounds(s){let minX=0,minY=0,maxX=s.width,maxY=s.height;for(const r of borderRectangles(s)){minX=Math.min(minX,r.x);minY=Math.min(minY,r.y);maxX=Math.max(maxX,r.x+r.w);maxY=Math.max(maxY,r.y+r.h)}return {minX,minY,maxX,maxY}}
function contourGeometry(s,w,h){
 if(w!==s.width||h!==s.height)return baseContourGeometry(s,w,h);
 const key=JSON.stringify([w,h,s.px,s.py,s.radius,s.angle,s.shiftX,s.shiftY,s.stroke,s.unit,borderRectangles(s),s.patternSource,customSource?.revision,s.customRepeat,s.customColors,s.ignoreSvgBackground,s.customGrow,s.fill,customSource?.excludedColors]);if(key===assemblyKey&&assemblyGeometry)return assemblyGeometry;
 const original=baseContourGeometry(s,w,h),bounds=assemblyBounds(s),bars=borderRectangles(s),S=CONTOUR_SCALE;
 const rects=bars.map(r=>[{X:Math.round(r.x*S),Y:Math.round(r.y*S)},{X:Math.round((r.x+r.w)*S),Y:Math.round(r.y*S)},{X:Math.round((r.x+r.w)*S),Y:Math.round((r.y+r.h)*S)},{X:Math.round(r.x*S),Y:Math.round((r.y+r.h)*S)}]);
 let joined=polygonBoolean([...original.ink,...rects],[],ClipperLib.ClipType.ctUnion);if(isCustom(s))joined=regularizeCustom(joined);
 const shift=paths=>paths.map(p=>p.map(v=>({X:v.X-Math.round(bounds.minX*S),Y:v.Y-Math.round(bounds.minY*S)})));
 joined=shift(joined);const aw=bounds.maxX-bounds.minX,ah=bounds.maxY-bounds.minY;
 const frame=[[{X:0,Y:0},{X:Math.round(aw*S),Y:0},{X:Math.round(aw*S),Y:Math.round(ah*S)},{X:0,Y:Math.round(ah*S)}]],background=polygonBoolean(frame,joined,ClipperLib.ClipType.ctDifference);
 assemblyKey=key;assemblyGeometry={...original,ink:joined,background,frame,w:aw,h:ah,bounds,bars};return assemblyGeometry;
}
function svg(s,options={}){return options.preview?assemblyPreview(s):contourSVG(s,options)}
function assemblyPreview(s){
 const g=contourGeometry(s,s.width,s.height),base=contourSVG(s,{wireframe:outlineView,onlyColor:outlineView&&!isCustom(s)?s.fill:null,preview:outlineView}),inside=base.slice(base.indexOf('>')+1,base.lastIndexOf('</svg>'));
 const w=g.w*(seam?2:1),h=g.h*(seam?2:1);let body=inside;
 if(seam)body=`<defs><pattern id="finished-repeat" width="${g.w}" height="${g.h}" patternUnits="userSpaceOnUse">${inside}</pattern></defs><rect width="${w}" height="${h}" fill="url(#finished-repeat)"/><path d="M${g.w} 0V${h}M0 ${g.h}H${w}" stroke="#cf8b48" stroke-width="1" fill="none" stroke-dasharray="6 5"/>`;
 if(grid){for(let i=0;i<=s.nx;i++){const x=i*s.px-g.bounds.minX;body+=`<path d="M${x} ${-g.bounds.minY}v${s.height}" stroke="#b79e72" vector-effect="non-scaling-stroke" stroke-width=".6" stroke-dasharray="5 5"/>`}for(let j=0;j<=s.ny;j++){const y=j*s.py-g.bounds.minY;body+=`<path d="M${-g.bounds.minX} ${y}h${s.width}" stroke="#b79e72" vector-effect="non-scaling-stroke" stroke-width=".6" stroke-dasharray="5 5"/>`}}
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}${s.unit}" height="${h}${s.unit}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#fffefa"/>${body}</svg>`;
}
function unitToMM(unit){return {mm:1,cm:10,px:25.4/96}[unit]}
function conformCaps(indices,vertices,integerPoints,ringStarts){
 // Earcut may omit collinear boundary vertices. Reinsert them on long triangle
 // edges so the caps meet the side walls without any T-junctions.
 const lines=new Map(),gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){const r=a%b;a=b;b=r}return a||1};
 function lineInfo(a,b){const p=integerPoints[a],q=integerPoints[b];let dx=q.X-p.X,dy=q.Y-p.Y,g=gcd(dx,dy);dx/=g;dy/=g;if(dx<0||dx===0&&dy<0){dx=-dx;dy=-dy}let cross;if(Math.abs(dx*p.Y)+Math.abs(dy*p.X)<8e15)cross=dx*p.Y-dy*p.X;else cross=(BigInt(dx)*BigInt(p.Y)-BigInt(dy)*BigInt(p.X)).toString();return {key:dx+','+dy+','+cross,axis:dx===0?'Y':'X'}}
 function add(a,b){const info=lineInfo(a,b);let bucket=lines.get(info.key);if(!bucket){bucket={axis:info.axis,points:new Map()};lines.set(info.key,bucket)}bucket.points.set(integerPoints[a][bucket.axis],a);bucket.points.set(integerPoints[b][bucket.axis],b)}
 for(let i=0;i<indices.length;i+=3){add(indices[i],indices[i+1]);add(indices[i+1],indices[i+2]);add(indices[i+2],indices[i])}
 for(let j=0;j<ringStarts.length-1;j++){const a=ringStarts[j],b=ringStarts[j+1];for(let i=a;i<b;i++)add(i,i+1<b?i+1:a)}
 for(const bucket of lines.values())bucket.sorted=[...bucket.points].sort((a,b)=>a[0]-b[0]);
 function chain(a,b){const info=lineInfo(a,b),bucket=lines.get(info.key),va=integerPoints[a][bucket.axis],vb=integerPoints[b][bucket.axis],middle=bucket.sorted.filter(p=>p[0]>Math.min(va,vb)&&p[0]<Math.max(va,vb)).map(p=>p[1]);if(va>vb)middle.reverse();return [a,...middle]}
 const result=[];for(let i=0;i<indices.length;i+=3){const a=indices[i],b=indices[i+1],c=indices[i+2],pa=integerPoints[a],pb=integerPoints[b],pc=integerPoints[c];
  // Reject exactly collinear ears using the integer geometry, before conversion
  // to floating-point millimeters can make them appear to have tiny area.
  if((pb.X-pa.X)*(pc.Y-pa.Y)-(pb.Y-pa.Y)*(pc.X-pa.X)===0)continue;
  const boundary=[...chain(a,b),...chain(b,c),...chain(c,a)];if(boundary.length===3){result.push(a,b,c);continue}const center=vertices.length/2;vertices.push((vertices[a*2]+vertices[b*2]+vertices[c*2])/3,(vertices[a*2+1]+vertices[b*2+1]+vertices[c*2+1])/3);for(let j=0;j<boundary.length;j++)result.push(center,boundary[j],boundary[(j+1)%boundary.length])}return result;
}
function createExtrusion(s){
 const g=contourGeometry(s,s.width,s.height),key=assemblyKey+'|'+s.thickness;if(key===meshKey&&meshCache)return meshCache;
 if(planarKey===assemblyKey&&planarMesh){const positions=new Float64Array(planarMesh.positions);for(let i=2;i<positions.length;i+=3)if(positions[i]!==0)positions[i]=s.thickness;meshKey=key;meshCache={...planarMesh,positions,depth:s.thickness,volume:planarMesh.area*s.thickness};return meshCache}
 const cleaned=ClipperLib.Clipper.CleanPolygons(g.ink,1),clip=new ClipperLib.Clipper(),tree=new ClipperLib.PolyTree();clip.StrictlySimple=true;clip.AddPaths(cleaned,ClipperLib.PolyType.ptSubject,true);clip.Execute(ClipperLib.ClipType.ctUnion,tree,ClipperLib.PolyFillType.pftNonZero,ClipperLib.PolyFillType.pftNonZero);
 const factor=unitToMM(s.unit)/CONTOUR_SCALE,tri=[],depth=s.thickness,capDeviation=[],allRings=[];let bodies=0,holes=0;
 const triangle=(a,b,c)=>{const u=b.map((v,k)=>v-a[k]),v=c.map((w,k)=>w-a[k]),cross=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];if(Math.hypot(...cross)<1e-15)return;tri.push(...a,...b,...c)};
 const convert=p=>[p.X*factor,(Math.round(g.h*CONTOUR_SCALE)-p.Y)*factor];
 function component(node){const rings=[node.Contour(),...node.Childs().filter(n=>n.IsHole()).map(n=>n.Contour())],vertices=[],integerPoints=[],ringStarts=[],holeIndices=[];let n=0;
  for(let j=0;j<rings.length;j++){ringStarts.push(n);if(j)holeIndices.push(n);for(const p of rings[j]){vertices.push(...convert(p));integerPoints.push(p);n++}allRings.push(rings[j])}ringStarts.push(n);holes+=rings.length-1;bodies++;
  const rawIndices=earcut.default(vertices,holeIndices,2),deviation=earcut.deviation(vertices,holeIndices,2,rawIndices);if(deviation>1e-7)throw Error('轮廓三角化未通过面积核对，请调整参数后重试。');capDeviation.push(deviation);const indices=conformCaps(rawIndices,vertices,integerPoints,ringStarts);
  for(let i=0;i<indices.length;i+=3){let a=indices[i]*2,b=indices[i+1]*2,c=indices[i+2]*2;if((vertices[b]-vertices[a])*(vertices[c+1]-vertices[a+1])-(vertices[b+1]-vertices[a+1])*(vertices[c]-vertices[a])<0){const swap=b;b=c;c=swap}
   const p=[vertices[a],vertices[a+1]],q=[vertices[b],vertices[b+1]],r=[vertices[c],vertices[c+1]];triangle([...p,depth],[...q,depth],[...r,depth]);triangle([...p,0],[...r,0],[...q,0]);
  }
  for(const ring of rings)for(let i=0;i<ring.length;i++){const p=convert(ring[i]),q=convert(ring[(i+1)%ring.length]);triangle([...p,0],[...p,depth],[...q,depth]);triangle([...p,0],[...q,depth],[...q,0])}
 }
 function visit(node){if(node.Contour().length&&!node.IsHole())component(node);for(const child of node.Childs())visit(child)}visit(tree);
 if(!tri.length)throw Error('当前轮廓没有可拉伸的实体。');
 const positions=new Float64Array(tri),width=g.w*unitToMM(s.unit),height=g.h*unitToMM(s.unit);let volume=0;
 for(let i=0;i<positions.length;i+=9){const a=positions.subarray(i,i+3),b=positions.subarray(i+3,i+6),c=positions.subarray(i+6,i+9);volume+=(a[0]*(b[1]*c[2]-b[2]*c[1])+a[1]*(b[2]*c[0]-b[0]*c[2])+a[2]*(b[0]*c[1]-b[1]*c[0]))/6}
 const area=cleaned.reduce((n,r)=>n+ClipperLib.Clipper.Area(r),0)*factor*factor;if(Math.abs(volume-area*depth)>Math.max(.0001,Math.abs(volume)*1e-7))throw Error('模型体积核对未通过，请调整参数。');
 const candidate={positions,width,height,depth,triangles:positions.length/9,bodies,holes,volume,area,capDeviation,rings:allRings};checkSTLTopology(candidate);meshKey=key;meshCache=candidate;planarKey=assemblyKey;planarMesh=meshCache;return meshCache;
}
function checkSTLTopology(mesh){const vertices=new Map(),edges=new Map(),p=mesh.positions;
 const id=i=>{const key=[Math.fround(p[i]),Math.fround(p[i+1]),Math.fround(p[i+2])].join(',');if(!vertices.has(key))vertices.set(key,vertices.size);return vertices.get(key)};
 for(let i=0;i<p.length;i+=9){const a=[id(i),id(i+3),id(i+6)];if(new Set(a).size!==3)throw Error('模型出现过小三角面，请适当增大图案或实体线径。');for(let j=0;j<3;j++){const x=a[j],y=a[(j+1)%3],key=x<y?x+','+y:y+','+x,s=x<y?1:-1,e=edges.get(key)||[0,0];e[0]++;e[1]+=s;edges.set(key,e)}}
 for(const e of edges.values())if(e[0]!==2||e[1]!==0)throw Error('当前参数未通过封闭网格检查，请调整实体宽度或围边位置。');mesh.watertight=true;return true;
}
function triangleNormal(p,i){const ux=p[i+3]-p[i],uy=p[i+4]-p[i+1],uz=p[i+5]-p[i+2],vx=p[i+6]-p[i],vy=p[i+7]-p[i+1],vz=p[i+8]-p[i+2],x=uy*vz-uz*vy,y=uz*vx-ux*vz,z=ux*vy-uy*vx,len=Math.hypot(x,y,z);return [x/len,y/len,z/len]}
function binarySTL(mesh){const buffer=new ArrayBuffer(84+50*mesh.triangles),view=new DataView(buffer),header=new TextEncoder().encode(`HUAJIAN V6 | units=mm | ${fmt(mesh.width)} x ${fmt(mesh.height)} x ${fmt(mesh.depth)}`);new Uint8Array(buffer,0,80).set(header.slice(0,80));view.setUint32(80,mesh.triangles,true);let off=84;
 for(let i=0;i<mesh.positions.length;i+=9){const normal=triangleNormal(mesh.positions,i);for(const v of normal){view.setFloat32(off,v,true);off+=4}for(let k=0;k<9;k++){view.setFloat32(off,mesh.positions[i+k],true);off+=4}view.setUint16(off,0,true);off+=2}return buffer;
}
async function exportSTL(){const button=$('exportSTL');button.disabled=true;button.textContent='正在拉伸模型…';await new Promise(r=>setTimeout(r,25));try{const s=state();if(!s)throw Error('请先填写有效参数。');const mesh=createExtrusion(s);download(binarySTL(mesh),'model/stl',`花间-V6-${fmt(mesh.width)}x${fmt(mesh.height)}x${fmt(mesh.depth)}mm.stl`);$('modelStats').textContent=`${mesh.bodies} 个实体 · ${mesh.holes} 个孔洞 · ${mesh.triangles.toLocaleString()} 个三角面`;toast(`已导出 STL：${fmt(mesh.width)} × ${fmt(mesh.height)} × ${fmt(mesh.depth)} mm`)}catch(e){toast(e.message)}finally{button.disabled=false;button.textContent='↓ 导出拉伸实体 STL'}}
function updateAssemblyUI(s){
 for(const side of ['top','bottom']){const enabled=s[side+'Enabled'];$(side+'Width').disabled=!enabled||s.autoBarWidth;for(const key of ['Height','Offset','Gap'])$(side+key).disabled=!enabled}
 $('dimW').textContent=fmt(s.outputWidth)+' '+s.unit+(seam?' × 2':'');$('dimH').textContent=fmt(s.outputHeight)+' '+s.unit+(seam?' × 2':'');
 $('finishedSize').textContent=`${fmt(s.outputWidth)} × ${fmt(s.outputHeight)} ${s.unit}`;
 $('modelSize').textContent=`${fmt(s.outputWidth*unitToMM(s.unit))} × ${fmt(s.outputHeight*unitToMM(s.unit))} × ${fmt(s.thickness)} mm`;
 $('previewLabel').textContent=modelView?'拖动旋转 · 滚轮缩放 · 双击复位':`图案主体 ${fmt(s.width)} × ${fmt(s.height)} ${s.unit} / 含围边 ${fmt(s.outputWidth)} × ${fmt(s.outputHeight)} ${s.unit}`;
 if(modelView)showModel(s);
}
function resize(){if(!lastState)return;const s=lastState,v=$('viewport'),scale=$('zoom').value;let w=s.outputWidth,h=s.outputHeight;if(seam){w*=2;h*=2}const f={px:1,mm:96/25.4,cm:96/2.54}[s.unit],z=scale==='fit'?Math.min(Math.max(150,v.clientWidth-96)/w,Math.max(180,v.clientHeight-96)/h):Number(scale)*f;$('board').style.width=w*z+'px';$('board').style.height=h*z+'px';v.style.justifyContent=w*z>v.clientWidth-70?'flex-start':'center';v.style.alignItems=h*z>v.clientHeight-70?'flex-start':'center';if(modelView&&modelRenderer)modelRenderer.resize()}

// Small self-contained WebGL viewer: orbit the actual extrusion; no visual Z scaling.
let modelRenderer=null;
function initModelRenderer(){
 const canvas=$('modelCanvas'),gl=canvas.getContext('webgl',{antialias:true,alpha:false});if(!gl)throw Error('当前浏览器未启用 WebGL；仍可直接导出 STL。');
 const vertex=`attribute vec3 aPosition;attribute vec3 aNormal;uniform mat4 uMVP;uniform mat3 uNormal;varying vec3 vNormal;void main(){gl_Position=uMVP*vec4(aPosition,1.0);vNormal=uNormal*aNormal;}`;
 const fragment=`precision mediump float;varying vec3 vNormal;uniform vec3 uColor;void main(){vec3 n=normalize(vNormal);float a=max(dot(n,normalize(vec3(-.45,-.5,1.0))),0.0);float b=max(dot(n,normalize(vec3(.7,.4,-.6))),0.0);vec3 col=uColor*(.5+.65*a+.2*b)+vec3(.07)*pow(a,24.0);gl_FragColor=vec4(col,1.0);}`;
 function shader(type,source){const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh}
 const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('三维着色器初始化失败。');gl.useProgram(program);
 const buffer=gl.createBuffer(),pos=gl.getAttribLocation(program,'aPosition'),norm=gl.getAttribLocation(program,'aNormal'),mvp=gl.getUniformLocation(program,'uMVP'),normal=gl.getUniformLocation(program,'uNormal'),color=gl.getUniformLocation(program,'uColor');
 let current=null,lastKey='',yaw=-.42,pitch=.62,zoom=1,drag=null;gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);
 function multiply(a,b){const r=new Float32Array(16);for(let c=0;c<4;c++)for(let row=0;row<4;row++)for(let k=0;k<4;k++)r[c*4+row]+=a[k*4+row]*b[c*4+k];return r}
 function draw(){if(!current)return;const w=canvas.width,h=canvas.height,aspect=w/h,c=Math.cos(yaw),s=Math.sin(yaw),cx=Math.cos(pitch),sx=Math.sin(pitch),rotation=new Float32Array([c,s*cx,s*sx,0,-s,c*cx,c*sx,0,0,-sx,cx,0,0,0,0,1]),max=Math.max(current.width,current.height,current.depth),half=[current.width/max,current.height/max,current.depth/max],rx=Math.abs(c)*half[0]+Math.abs(s)*half[1],ry=Math.abs(s*cx)*half[0]+Math.abs(c*cx)*half[1]+Math.abs(sx)*half[2],y=Math.max(ry,rx/aspect)*1.22/zoom,x=y*aspect,projection=new Float32Array([1/x,0,0,0,0,1/y,0,0,0,0,-.25,0,0,0,0,1]);
  gl.viewport(0,0,w,h);gl.clearColor(.10,.14,.13,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(program);gl.uniformMatrix4fv(mvp,false,multiply(projection,rotation));gl.uniformMatrix3fv(normal,false,new Float32Array([rotation[0],rotation[1],rotation[2],rotation[4],rotation[5],rotation[6],rotation[8],rotation[9],rotation[10]]));const rgb=lastState?.fill||'#354f42';gl.uniform3f(color,.32+parseInt(rgb.slice(1,3),16)/255*.6,.32+parseInt(rgb.slice(3,5),16)/255*.6,.32+parseInt(rgb.slice(5,7),16)/255*.6);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(pos);gl.enableVertexAttribArray(norm);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(norm,3,gl.FLOAT,false,24,12);gl.drawArrays(gl.TRIANGLES,0,current.triangles*3);
 }
 function resizeView(){const dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(100,canvas.clientWidth),h=Math.max(100,canvas.clientHeight);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);draw()}
 function setMesh(mesh,key){current=mesh;if(key!==lastKey){const vertices=new Float32Array(mesh.triangles*18),scale=2/Math.max(mesh.width,mesh.height,mesh.depth),center=[mesh.width/2,mesh.height/2,mesh.depth/2];let k=0;for(let i=0;i<mesh.positions.length;i+=9){const n=triangleNormal(mesh.positions,i);for(let j=0;j<3;j++){for(let a=0;a<3;a++)vertices[k++]=(mesh.positions[i+j*3+a]-center[a])*scale;for(const v of n)vertices[k++]=v}}gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);lastKey=key}resizeView()}
 canvas.addEventListener('pointerdown',e=>{drag=[e.clientX,e.clientY,yaw,pitch];canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing'});canvas.addEventListener('pointermove',e=>{if(!drag)return;yaw=drag[2]+(e.clientX-drag[0])*.008;pitch=Math.max(-1.55,Math.min(1.55,drag[3]+(e.clientY-drag[1])*.008));draw()});canvas.addEventListener('pointerup',()=>{drag=null;canvas.style.cursor='grab'});canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.25,Math.min(8,zoom*Math.exp(-e.deltaY*.001)));draw()},{passive:false});canvas.addEventListener('dblclick',()=>{yaw=-.42;pitch=.62;zoom=1;draw()});
 canvas.tabIndex=0;canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','Home'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')yaw-=.1;if(e.key==='ArrowRight')yaw+=.1;if(e.key==='ArrowUp')pitch=Math.min(1.55,pitch+.1);if(e.key==='ArrowDown')pitch=Math.max(-1.55,pitch-.1);if(e.key==='+')zoom=Math.min(8,zoom*1.1);if(e.key==='-')zoom=Math.max(.25,zoom/1.1);if(e.key==='Home'){yaw=-.42;pitch=.62;zoom=1}draw()});
 return {setMesh,resize:resizeView};
}
function showModel(s){try{const mesh=createExtrusion(s);if(!modelRenderer)modelRenderer=initModelRenderer();modelRenderer.setMesh(mesh,meshKey);$('modelStats').textContent=`${mesh.bodies} 个实体 · ${mesh.holes} 个孔洞 · ${mesh.triangles.toLocaleString()} 个三角面`;$('modelError').hidden=true}catch(e){$('modelError').hidden=false;$('modelError').textContent=e.message}}
function toggleModel(){modelView=!modelView;$('modelBtn').setAttribute('aria-pressed',modelView);$('modelPanel').hidden=!modelView;$('board').style.visibility=modelView?'hidden':'visible';redraw()}

// V6 SVG importer: only geometry and safe presentation attributes enter the live DOM.
const SVG_NS='http://www.w3.org/2000/svg';
const IMPORT_SCALE=1000000;
function svgBoolean(paths,fillRule='nonzero'){
 const c=new ClipperLib.Clipper(),out=[];c.StrictlySimple=true;c.AddPaths(paths,ClipperLib.PolyType.ptSubject,true);const rule=fillRule==='evenodd'?ClipperLib.PolyFillType.pftEvenOdd:ClipperLib.PolyFillType.pftNonZero;c.Execute(ClipperLib.ClipType.ctUnion,out,rule,rule);return out;
}
function svgColor(value){if(!value||value==='none')return null;const nums=value.match(/[\d.]+/g);if(!nums||nums.length<3)return null;if(nums.length>3&&+nums[3]===0)return null;return '#'+nums.slice(0,3).map(n=>Math.max(0,Math.min(255,Math.round(+n))).toString(16).padStart(2,'0')).join('')}
function parseCustomSVG(text,name='自定义.svg'){
 if(text.length>8*1024*1024)throw Error('SVG 文件请控制在 8 MB 以内。');
 const doc=new DOMParser().parseFromString(text,'image/svg+xml'),source=doc.documentElement;if(doc.querySelector('parsererror')||source.localName!=='svg')throw Error('无法解析 SVG，请检查文件是否为有效的矢量 SVG。');
 const host=document.createElement('div');host.style.cssText='position:fixed;left:-20000px;top:0;width:1024px;height:1024px;opacity:0;pointer-events:none';const shadow=host.attachShadow({mode:'closed'}),root=document.createElementNS(SVG_NS,'svg');shadow.append(root);document.body.append(host);
 const allowed=new Set(['svg','g','defs','symbol','path','rect','circle','ellipse','polygon','polyline','line','use','style','title','desc']);
 const attrs=new Set(['id','class','d','x','y','x1','x2','y1','y2','width','height','rx','ry','r','cx','cy','points','transform','viewBox','preserveAspectRatio','fill','fill-rule','fill-opacity','stroke','stroke-width','stroke-opacity','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-dasharray','opacity','display','visibility','color','vector-effect','paint-order']);
 let ignored=new Set();
 function cloneSafe(el){if(!allowed.has(el.localName)){if(!['metadata','namedview'].includes(el.localName))ignored.add(el.localName);return null}const n=document.createElementNS(SVG_NS,el.localName);if(el.localName==='style'){const css=el.textContent;if(/@|url\s*\(|expression\s*\(|animation|transition/i.test(css))throw Error('请移除 SVG 的外部资源、动画或渐变后再导入。');n.textContent=css;return n}for(const a of el.attributes){if(a.localName==='href'){if(!a.value.startsWith('#'))throw Error('SVG 包含外部引用，请先展开为本地曲线。');n.setAttribute('href',a.value)}else if(a.localName==='style'){if(/url\s*\(|@|expression\s*\(|animation|transition/i.test(a.value))throw Error('请将渐变、剪切或外部资源展开为普通路径。');n.setAttribute('style',a.value)}else if(['clip-path','mask','filter','marker-start','marker-mid','marker-end'].includes(a.localName)&&a.value!=='none')throw Error('请先将剪切蒙版、滤镜或箭头展开为普通路径。');else if(attrs.has(a.name)){if(/url\s*\(/i.test(a.value))throw Error('请将图案填充或渐变展开成普通色块。');n.setAttribute(a.name,a.value)}}for(const child of el.children){const safe=cloneSafe(child);if(safe)n.append(safe)}return n}
 try{
  const safe=cloneSafe(source);for(const a of safe.attributes)root.setAttribute(a.name,a.value);while(safe.firstChild)root.append(safe.firstChild);
  if(ignored.size)throw Error('包含暂不支持的元素：'+[...ignored].join('、')+'。请先转曲并展开为普通路径；位图无法拉伸为镂空模型。');
  let vb=(root.getAttribute('viewBox')||'').trim().split(/[\s,]+/).map(Number);if(vb.length!==4||!vb.every(Number.isFinite)||vb[2]<=0||vb[3]<=0){const w=parseFloat(root.getAttribute('width')),h=parseFloat(root.getAttribute('height'));if(!(w>0&&h>0))throw Error('SVG 需要有效的 viewBox 或宽高。');vb=[0,0,w,h];root.setAttribute('viewBox',vb.join(' '))}
  root.setAttribute('width','1024');root.setAttribute('height','1024');root.style.cssText='width:1024px;height:1024px;overflow:visible';
  let expansion=0;
  function expand(parent,stack=[]){for(const el of [...parent.children]){if(el.localName==='defs'||el.localName==='symbol')continue;if(el.localName==='use'){const ref=el.getAttribute('href'),id=ref?.slice(1),target=[...root.querySelectorAll('[id]')].find(e=>e.id===id);if(!target||stack.includes(id)||++expansion>2000)throw Error('SVG 引用无效、循环或数量过多。');const group=document.createElementNS(SVG_NS,'g');for(const a of el.attributes)if(!['href','x','y','width','height'].includes(a.name))group.setAttribute(a.name,a.value);const translated=document.createElementNS(SVG_NS,'g');translated.setAttribute('transform',`translate(${parseFloat(el.getAttribute('x'))||0} ${parseFloat(el.getAttribute('y'))||0})`);let copy=target.cloneNode(true);if(copy.localName==='symbol'){const symbol=document.createElementNS(SVG_NS,'svg');for(const a of copy.attributes)symbol.setAttribute(a.name,a.value);if(el.hasAttribute('width'))symbol.setAttribute('width',el.getAttribute('width'));if(el.hasAttribute('height'))symbol.setAttribute('height',el.getAttribute('height'));while(copy.firstChild)symbol.append(copy.firstChild);copy=symbol}translated.append(copy);group.append(translated);el.replaceWith(group);expand(group,[...stack,id])}else expand(el,stack)}}expand(root);
  const norm=Math.max(vb[2],vb[3]),tol=norm*.00006,paints=[],rootInverse=root.getCTM().inverse();let pointsTotal=0,shapeCount=0;
  function toInteger(p){return {X:Math.round((p.x-vb[0])/vb[2]*IMPORT_SCALE),Y:Math.round((p.y-vb[1])/vb[3]*IMPORT_SCALE)}}
  function sample(el,matrix){const len=el.getTotalLength();if(!Number.isFinite(len)||len<=0)return [];const out=[],scale=Math.max(Math.hypot(matrix.a,matrix.b),Math.hypot(matrix.c,matrix.d)),step=norm/(48*Math.max(.0001,scale));const at=t=>el.getPointAtLength(t).matrixTransform(matrix);const first=at(0);out.push(toInteger(first));
   function span(a,b,p,q,depth){const mid=(a+b)/2,r=at(mid),ux=q.x-p.x,uy=q.y-p.y,L=Math.hypot(ux,uy),dev=L?Math.abs(ux*(r.y-p.y)-uy*(r.x-p.x))/L:Math.hypot(r.x-p.x,r.y-p.y),detour=Math.hypot(r.x-p.x,r.y-p.y)+Math.hypot(q.x-r.x,q.y-r.y)-L;if(depth<14&&(dev>tol||detour>tol)){span(a,mid,p,r,depth+1);span(mid,b,r,q,depth+1)}else{out.push(toInteger(q));if(++pointsTotal>250000)throw Error('路径节点过多，请先简化 SVG 后再导入。')}}
   const n=Math.max(1,Math.ceil(len/step));if(n>250000)throw Error('SVG 路径长度过大，请先简化。');let a=0,p=first;for(let i=1;i<=n;i++){const b=len*i/n,q=at(b);span(a,b,p,q,0);a=b;p=q}return out.filter((p,i)=>i===0||p.X!==out[i-1].X||p.Y!==out[i-1].Y)}
  const geometry=[...root.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line')].filter(e=>!e.closest('defs,symbol'));
  for(const el of geometry){if(++shapeCount>3000)throw Error('SVG 图形超过 3000 个，请先合并和简化。');let hidden=false,opacity=1;for(let n=el;n&&n!==shadow;n=n.parentElement){const st=getComputedStyle(n);if(st.display==='none'||st.visibility==='hidden')hidden=true;opacity*=Number(st.opacity||1)}if(hidden||opacity<.001)continue;
   const st=getComputedStyle(el);if([st.fill,st.stroke,st.clipPath,st.mask,st.filter].some(v=>v&&v.includes('url(')))throw Error('请先将渐变、图案填充、蒙版或滤镜展开为普通曲线。');if(st.strokeDasharray&&st.strokeDasharray!=='none')throw Error('请先将虚线描边展开为实体路径。');const matrix=rootInverse.multiply(el.getCTM()),subpaths=[];
   if(el.localName==='path'){
    let end={x:0,y:0};const pieces=(el.getAttribute('d')||'').match(/[Mm][^Mm]*/g)||[];const probe=document.createElementNS(SVG_NS,'path');root.append(probe);
    try{for(let d of pieces){if(d[0]==='m'){const match=d.match(/^m\s*([-+]?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?)\s*,?\s*([-+]?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?)/i);if(!match)throw Error('SVG 路径的起点无效。');const tail=d.slice(match[0].length);d='M'+(end.x+Number(match[1]))+' '+(end.y+Number(match[2]))+(/^[\s,]*[-+.\d]/.test(tail)?'l':'')+tail}probe.setAttribute('d',d);const len=probe.getTotalLength(),last=probe.getPointAtLength(len);end={x:last.x,y:last.y};const pts=sample(probe,matrix);if(pts.length>1)subpaths.push({points:pts,closed:/[zZ]\s*$/.test(d)})}}finally{probe.remove()}
   }else{const pts=sample(el,matrix);if(pts.length>1)subpaths.push({points:pts,closed:!['line','polyline'].includes(el.localName)})}
   const fill=el.localName==='line'?null:svgColor(st.fill);if(fill&&Number(st.fillOpacity)>.001){const rings=svgBoolean(subpaths.map(p=>p.points).filter(p=>p.length>=3),st.fillRule);if(rings.length)paints.push({color:fill,paths:rings})}
   const stroke=svgColor(st.stroke),strokeW=parseFloat(st.strokeWidth);if(stroke&&Number(st.strokeOpacity)>.001&&strokeW>0){const offset=new ClipperLib.ClipperOffset(Math.max(2,parseFloat(st.strokeMiterlimit)||4),tol/norm*IMPORT_SCALE);const isotropic=Math.sqrt(Math.abs(matrix.a*matrix.d-matrix.b*matrix.c)),join={round:ClipperLib.JoinType.jtRound,bevel:ClipperLib.JoinType.jtSquare,miter:ClipperLib.JoinType.jtMiter}[st.strokeLinejoin]??ClipperLib.JoinType.jtMiter,cap={round:ClipperLib.EndType.etOpenRound,square:ClipperLib.EndType.etOpenSquare,butt:ClipperLib.EndType.etOpenButt}[st.strokeLinecap]??ClipperLib.EndType.etOpenButt;
    // Offset in original element coordinates to preserve anisotropic transforms.
    const inv=matrix.inverse(),localScale=IMPORT_SCALE/norm,loc=p=>{const point=new DOMPoint(p.X/IMPORT_SCALE*vb[2]+vb[0],p.Y/IMPORT_SCALE*vb[3]+vb[1]).matrixTransform(inv);return {X:Math.round(point.x*localScale),Y:Math.round(point.y*localScale)}};
    for(const sub of subpaths){let p=sub.points.map(loc);if(sub.closed&&p.length>2&&p[0].X===p[p.length-1].X&&p[0].Y===p[p.length-1].Y)p.pop();offset.AddPath(p,join,sub.closed?ClipperLib.EndType.etClosedLine:cap)}const expanded=[];offset.Execute(expanded,strokeW*localScale/2);const transformed=expanded.map(r=>r.map(p=>toInteger(new DOMPoint(p.X/localScale,p.Y/localScale).matrixTransform(matrix))));if(transformed.length)paints.push({color:stroke,paths:svgBoolean(transformed)})}
  }
  if(!paints.length)throw Error('SVG 中没有可导入的实体曲线，请先将文字转曲、将图片矢量化。');
  for(const paint of paints){paint.isBackground=Math.abs(paint.paths.reduce((n,r)=>n+ClipperLib.Clipper.Area(r),0))>=IMPORT_SCALE*IMPORT_SCALE*.9999&&paint.paths.every(r=>r.every(p=>p.X>=-2&&p.Y>=-2&&p.X<=IMPORT_SCALE+2&&p.Y<=IMPORT_SCALE+2));}
  return {name:name.slice(0,200),width:vb[2],height:vb[3],paints,shapes:shapeCount,points:pointsTotal,revision:Date.now()};
 }finally{host.remove()}
}

// V6: custom SVG source, periodic layouts, original color layers, shared SVG / STL geometry.
let customSource=null,customCacheKey='',customCache=null;
const DEMO_SVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f3f0e7"/><path d="M-10 50Q20 0 50 50T110 50M50-10Q0 20 50 50T50 110" fill="none" stroke="#354f42" stroke-width="8"/><circle cx="50" cy="50" r="12" fill="#b26445"/></svg>';
function customBaseState(){const s=builtInBaseState();if(!s||!customSource||s.patternSource!=='custom')return s;
 const aspect=customSource.height/customSource.width,mirror=s.customRepeat==='mirror';
 if(s.mode==='fit'){s.nx=Math.max(mirror?2:1,Math.round(s.width/s.tile/(mirror?2:1))*(mirror?2:1));s.ny=Math.max(mirror?2:1,Math.round(s.height/(s.tile*aspect)/(mirror?2:1))*(mirror?2:1));s.px=s.width/s.nx;s.py=s.height/s.ny}
 else if(s.mode==='count'){s.nx=mirror?Math.max(2,Math.ceil(s.cols/2)*2):s.cols;s.ny=mirror?Math.max(2,Math.ceil(s.rows/2)*2):s.rows;s.px=s.width/s.nx;s.py=s.height/s.ny}
 else{s.px=s.tile;s.py=s.tile*aspect;s.nx=Math.ceil(s.width/s.px);s.ny=Math.ceil(s.height/s.py)}
 s.seamless=Math.abs(s.width/s.px-Math.round(s.width/s.px))<1e-7&&Math.abs(s.height/s.py-Math.round(s.height/s.py))<1e-7&&(!mirror||(Math.round(s.width/s.px)%2===0&&Math.round(s.height/s.py)%2===0));return s;
}
function isCustom(s){return !!customSource&&s.patternSource==='custom'}
function regularizeCustom(paths){const offset=new ClipperLib.ClipperOffset(2,1),expanded=[],closed=[];offset.AddPaths(paths,ClipperLib.JoinType.jtMiter,ClipperLib.EndType.etClosedPolygon);offset.Execute(expanded,1);offset.Clear();offset.AddPaths(expanded,ClipperLib.JoinType.jtMiter,ClipperLib.EndType.etClosedPolygon);offset.Execute(closed,-1);return closed}
function baseContourGeometry(s,w,h){if(!isCustom(s))return builtInContourGeometry(s,w,h);
 const key=JSON.stringify([customSource.revision,w,h,s.px,s.py,s.customRepeat,s.customColors,s.ignoreSvgBackground,s.customGrow,s.angle,s.shiftX,s.shiftY,s.fill,s.unit,customSource.excludedColors]);if(key===customCacheKey&&customCache)return customCache;
 const S=CONTOUR_SCALE,frame=[[{X:0,Y:0},{X:Math.round(w*S),Y:0},{X:Math.round(w*S),Y:Math.round(h*S)},{X:0,Y:Math.round(h*S)}]],unit=[[{X:0,Y:0},{X:Math.round(s.px*S),Y:0},{X:Math.round(s.px*S),Y:Math.round(s.py*S)},{X:0,Y:Math.round(s.py*S)}]],angle=s.angle*Math.PI/180,c=Math.cos(angle),sn=Math.sin(angle),tol=.015/unitToMM(s.unit),cellLayers=new Map();
 function layer(color,paths){for(const [prior,old] of cellLayers){const remaining=polygonBoolean(old,paths,ClipperLib.ClipType.ctDifference);cellLayers.set(prior,remaining)}cellLayers.set(color,polygonBoolean([...(cellLayers.get(color)||[]),...paths],[],ClipperLib.ClipType.ctUnion))}
 let importedCount=0;
 for(const p of customSource.paints){if((customSource.excludedColors||[]).includes(p.color))continue;if(s.ignoreSvgBackground&&p.isBackground)continue;let paths=p.paths.map(r=>r.map(v=>{const x=(v.X/IMPORT_SCALE-.5)*s.px,y=(v.Y/IMPORT_SCALE-.5)*s.py;return {X:Math.round((x*c-y*sn+s.px/2)*S),Y:Math.round((x*sn+y*c+s.py/2)*S)}}));if(s.customGrow!==0){const offset=new ClipperLib.ClipperOffset(2,tol*S),out=[];offset.AddPaths(paths,ClipperLib.JoinType.jtRound,ClipperLib.EndType.etClosedPolygon);offset.Execute(out,s.customGrow*S);paths=out}paths=polygonBoolean(paths,unit,ClipperLib.ClipType.ctIntersection);if(paths.length){layer(s.customColors==='original'?p.color:s.fill,paths);importedCount++}}
 if(!importedCount)throw Error('移除底色或减薄后没有剩余图案，请关闭“忽略整幅底色”或减小减薄量。');
 const layers=new Map(),mirror=s.customRepeat==='mirror',nx=Math.ceil(w/s.px)+2,ny=Math.ceil(h/s.py)+2,complexity=[...cellLayers.values()].flat().reduce((n,r)=>n+r.length,0)*nx*ny;
 if(complexity>1600000||nx*ny>12000)throw Error('重复图案过多，请增大单元尺寸、减少行列或简化导入 SVG。');
 for(const [color,rings] of cellLayers){const repeated=[];for(let j=-1;j<ny;j++)for(let i=-1;i<nx;i++){const mx=mirror&&Math.abs(i%2)===1,my=mirror&&Math.abs(j%2)===1,dx=(i+s.shiftX/100)*s.px*S,dy=(j+s.shiftY/100)*s.py*S;for(const r of rings){let p=r.map(v=>{const tx=v.X/Math.round(s.px*S),ty=v.Y/Math.round(s.py*S);return {X:Math.round((i+(mx?1-tx:tx)+s.shiftX/100)*s.px*S),Y:Math.round((j+(my?1-ty:ty)+s.shiftY/100)*s.py*S)}});if(mx!==my)p.reverse();repeated.push(p)}}layers.set(color,polygonBoolean(repeated,frame,ClipperLib.ClipType.ctIntersection))}
 const ink=polygonBoolean([...layers.values()].flat(),[],ClipperLib.ClipType.ctUnion),background=polygonBoolean(frame,ink,ClipperLib.ClipType.ctDifference);
 customCacheKey=key;customCache={ink,background,frame,layers,tol,w,h,count:importedCount};ringCache=new WeakMap();return customCache;
}
function customGeometryLayers(s,g,tile){const layers=new Map();const dx=tile?0:Math.round(g.bounds.minX*CONTOUR_SCALE),dy=tile?0:Math.round(g.bounds.minY*CONTOUR_SCALE);for(const [color,paths] of g.layers)layers.set(color,paths.map(r=>r.map(p=>({X:p.X-dx,Y:p.Y-dy}))));
 if(!tile){const rects=borderRectangles(s).map(r=>[{X:Math.round(r.x*CONTOUR_SCALE)-dx,Y:Math.round(r.y*CONTOUR_SCALE)-dy},{X:Math.round((r.x+r.w)*CONTOUR_SCALE)-dx,Y:Math.round(r.y*CONTOUR_SCALE)-dy},{X:Math.round((r.x+r.w)*CONTOUR_SCALE)-dx,Y:Math.round((r.y+r.h)*CONTOUR_SCALE)-dy},{X:Math.round(r.x*CONTOUR_SCALE)-dx,Y:Math.round((r.y+r.h)*CONTOUR_SCALE)-dy}]);for(const [color,paths] of layers)layers.set(color,polygonBoolean(paths,rects,ClipperLib.ClipType.ctDifference));layers.set(s.fill,polygonBoolean([...(layers.get(s.fill)||[]),...rects],[],ClipperLib.ClipType.ctUnion))}return layers;
}
function customContourSVG(s,{tile=false,onlyColor=null,ungrouped=false,wireframe=s.exportStyle==='outline',preview=false}={}){
 const mult=tile&&s.customRepeat==='mirror'?2:1,g=tile?baseContourGeometry(s,s.px*mult,s.py*mult):contourGeometry(s,s.width,s.height),groups=new Map(),add=(color,rings)=>groups.set(color,polygonBoolean([...(groups.get(color)||[]),...rings],[],ClipperLib.ClipType.ctUnion));if(!s.transparent&&!preview)add(s.bg,g.background);for(const [color,paths] of customGeometryLayers(s,g,tile))add(color,paths);
 let body='';for(const [color,rings] of groups){if(onlyColor&&color.toLowerCase()!==onlyColor.toLowerCase())continue;const paths=rings.map(r=>ringCurve(r,g)).filter(Boolean);if(!paths.length)continue;const alpha=color===s.bg&&!s.transparent?1:s.opacity/100;let content;if(wireframe)content=paths.map((d,i)=>`<path id="boundary-${color.slice(1)}-${i+1}" d="${d}" fill="none" stroke="${preview?'#ef5753':color}" stroke-width="${preview?1.1:fmt(.15/unitToMM(s.unit))}"${preview?' vector-effect="non-scaling-stroke"':''}/>`).join('');else content=`<path id="region-${color.slice(1)}" d="${paths.join('')}" fill="${color}" fill-rule="evenodd" stroke="none" opacity="${alpha}"/>`;body+=ungrouped||s.ungrouped?content:`<g id="color-${color.slice(1)}" data-color="${color}"><title>${esc(color.toUpperCase())}</title>${content}</g>`}
 return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${fmt(g.w)}${s.unit}" height="${fmt(g.h)}${s.unit}" viewBox="0 0 ${fmt(g.w)} ${fmt(g.h)}"><title>花间 V6 · ${esc(customSource.name)}</title><desc>Editable closed vector boundary paths; each color is grouped. Imported SVG tiled as ${s.customRepeat}; physical units ${s.unit}.</desc>${body}</svg>`;
}
function colorFiles(s){let colors;if(isCustom(s)&&s.customColors==='original'){const g=contourGeometry(s,s.width,s.height);colors=[...new Set([...(s.transparent?[]:[s.bg]),...customGeometryLayers(s,g,false).keys()])]}else colors=[...new Set([...(s.transparent?[]:[s.bg]),s.fill].map(c=>c.toLowerCase()))];return colors.map((color,i)=>({name:`${String(i+1).padStart(2,'0')}-${color.slice(1).toUpperCase()}.svg`,text:'<?xml version="1.0" encoding="UTF-8"?>\n'+svg(s,{onlyColor:color})})).filter(f=>f.text.includes('<path '))}
function validateCustomSource(src){if(!src)return null;if(!Array.isArray(src.paints)||src.paints.length>6000||!(src.width>0&&src.height>0)||!Number.isFinite(src.width/src.height))throw Error('参数中的自定义 SVG 数据无效。');let n=0;for(const paint of src.paints){if(!/^#[0-9a-f]{6}$/i.test(paint.color)||!Array.isArray(paint.paths))throw Error('SVG 色块数据无效。');for(const ring of paint.paths){if(!Array.isArray(ring)||ring.length<3)throw Error('SVG 轮廓数据无效。');for(const v of ring)if(!Number.isSafeInteger(v.X)||!Number.isSafeInteger(v.Y)||Math.abs(v.X)>1e10||Math.abs(v.Y)>1e10||++n>500000)throw Error('SVG 曲线节点无效或过多。')}}return {...src,name:String(src.name||'自定义.svg').slice(0,200),excludedColors:Array.isArray(src.excludedColors)?src.excludedColors.filter(c=>/^#[0-9a-f]{6}$/i.test(c)):[],revision:Date.now()}}
function updateCustomUI(s){const active=isCustom(s);if(customSource){const colors=[...new Set(customSource.paints.map(p=>p.color))],signature=JSON.stringify([colors,customSource.excludedColors]);if($('svgColors').dataset.signature!==signature){$('svgColors').dataset.signature=signature;$('svgColors').innerHTML=colors.map(c=>`<label class="source-color"><input type="checkbox" data-source-color="${c}" ${(customSource.excludedColors||[]).includes(c)?'':'checked'}><i style="background:${c}"></i>${c.toUpperCase()}</label>`).join('')}}$('customControls').hidden=!customSource;$('sourceInfo').textContent=customSource?`${customSource.name} · ${fmt(customSource.width)} × ${fmt(customSource.height)} · ${customSource.shapes} 个图形`:'未导入 · 当前使用内置花间纹样';$('sourceInfo').title=$('sourceInfo').textContent;$('stroke').disabled=$('strokeRange').disabled=$('radius').disabled=active;$('customGrow').disabled=!active;$('customHint').hidden=!active;
 if(active){$('pathMetric').textContent=`自定义 SVG · ${s.customRepeat==='mirror'?'交替镜像':'原样重复'} · 闭合轮廓`;const ok=s.seamless&&(s.customRepeat==='mirror'||customEdgesMatch(s));$('seamStatus').innerHTML=ok?'<b></b>图案主体四边对应可循环':'<span class="error">单元边缘或裁切画布未对齐，请用镜像 / 自动适配</span>';$('fitHelp').textContent=s.customRepeat==='mirror'?'交替镜像以 2 × 2 单元为一组；自动适配及指定行列会向偶数调整，确保整幅主体可重复。':'原样重复保留方向；原图四边对应时，整幅主体才能无缝循环。';$('tile').previousElementSibling.innerHTML='期望单元宽度 <span class="unit-label">'+s.unit+'</span>'}
}
function customEdgesMatch(s){const g=baseContourGeometry(s,s.px,s.py),W=Math.round(s.px*CONTOUR_SCALE),H=Math.round(s.py*CONTOUR_SCALE);function edges(rings,axis,bound,other){const intervals=[];for(const r of rings)for(let i=0;i<r.length;i++){const a=r[i],b=r[(i+1)%r.length];if(Math.abs(a[axis]-bound)<=1&&Math.abs(b[axis]-bound)<=1)intervals.push([Math.min(a[other],b[other]),Math.max(a[other],b[other])])}intervals.sort((a,b)=>a[0]-b[0]);const merged=[];for(const p of intervals){if(merged.length&&p[0]<=merged[merged.length-1][1]+2)merged[merged.length-1][1]=Math.max(merged[merged.length-1][1],p[1]);else merged.push(p)}return merged}const same=(a,b)=>a.length===b.length&&a.every((p,i)=>Math.abs(p[0]-b[i][0])<3&&Math.abs(p[1]-b[i][1])<3);return [...g.layers.values()].every(rings=>same(edges(rings,'X',0,'Y'),edges(rings,'X',W,'Y'))&&same(edges(rings,'Y',0,'X'),edges(rings,'Y',H,'X')))}
async function loadSVGFile(file){if(!file)return;try{$('sourceInfo').textContent='正在解析 SVG 曲线…';if(file.size>8*1024*1024)throw Error('SVG 文件请控制在 8 MB 以内。');const candidate=validateCustomSource(parseCustomSVG(await file.text(),file.name));if(JSON.stringify(candidate).length>15*1024*1024)throw Error('转换后的曲线数据过大，请先简化 SVG。');candidate.excludedColors=[];customSource=candidate;$('patternSource').value='custom';customCacheKey=assemblyKey=meshKey=planarKey='';$('angle').value=0;$('shiftX').value=$('shiftY').value=0;redraw();toast('已导入 SVG，可调整拼接方式、尺寸、围边和厚度。')}catch(e){$('sourceInfo').textContent=e.message;toast(e.message)}finally{$('svgFile').value=''}}
function customConfig(){return {format:'floral-studio-models',version:6,settings:Object.fromEntries(KEYS.map(k=>[k,$(k).type==='checkbox'?$(k).checked:$(k).value])),customSource}}
function restoreCustomConfig(v){const src=v.version===6?validateCustomSource(v.customSource):null;customSource=src;customCacheKey=assemblyKey=meshKey=planarKey='';if(!src)$('patternSource').value='builtin';applySettings(v.settings);if(!src&&$('patternSource').value==='custom'){$('patternSource').value='builtin';redraw()}}

function config(){return customConfig()}
function redraw(){try{redrawInner()}catch(e){frame=0;$('seamStatus').textContent=e.message;toast(e.message)}}
function redrawInner(){frame=0;const s=state();if(!s){$('seamStatus').textContent='请检查尺寸输入（1–100000）';return}lastState=s;
 updateStrokeRange(); $('sizeField').hidden=s.mode==='count';$('countFields').hidden=s.mode!=='count';
 $('fitHelp').textContent=s.mode==='fixed'?'按指定边长铺排并裁切。单元自身可循环；若画布宽高不是边长的整数倍，整幅边缘可能无法拼接。':s.mode==='count'?'精确填满指定行列数，单元横纵向分别适配；整张画布可上下、左右重复。':'自动匹配整数行列，单元会轻微拉伸，确保整张导出图的四边也能无缝拼接。';
 for(const [k,suffix] of [['radius',''],['angle','°'],['shiftX','%'],['shiftY','%'],['opacity','%']])$(k+'Out').textContent=s[k]+suffix;
 $('fillHex').textContent=s.fill.toUpperCase();$('bgHex').textContent=s.bg.toUpperCase();$('bg').disabled=s.transparent;
 document.querySelectorAll('.unit-label').forEach(e=>e.textContent=s.unit);
 $('art').innerHTML=svg(s,{preview:true});$('dimW').textContent=fmt(s.width)+' '+s.unit+(seam?' × 2':'');$('dimH').textContent=fmt(s.height)+' '+s.unit+(seam?' × 2':'');
 $('tileMetric').textContent=`${Number(s.px.toFixed(2))} × ${Number(s.py.toFixed(2))} ${s.unit}`;$('repeatMetric').textContent=`${s.nx} 列 × ${s.ny} 行`;$('pathMetric').textContent=`纹样实体宽度 ${fmt(s.stroke)} ${s.unit} · ${s.transparent||s.fill===s.bg?1:2} 种颜色 · 闭合轮廓`;
 $('seamStatus').innerHTML=s.seamless?'<b></b>四边可连续拼接':'<span class="error">裁切画布 · 整幅边缘不保证拼接</span>';
 $('previewLabel').textContent=seam?'2 × 2 整幅拼接检查 / 橙色虚线为画布接缝':'LIVE PREVIEW / 矢量实时预览';resize();
 updateAssemblyUI(s);updateCustomUI(s);try{localStorage.setItem('floral-studio-v6-custom-svg',JSON.stringify(config()))}catch(e){}
}
function schedule(){clearTimeout(frame);frame=setTimeout(redraw,120)}
function legacyResize(){if(!lastState)return;const s=lastState,v=$('viewport'),scale=$('zoom').value;let w=s.width,h=s.height;if(seam){w*=2;h*=2}const unitScale={px:1,mm:96/25.4,cm:96/2.54}[s.unit],availableW=Math.max(150,v.clientWidth-96),availableH=Math.max(200,v.clientHeight-96),z=scale==='fit'?Math.min(availableW/w,availableH/h):Number(scale)*unitScale;$('board').style.width=w*z+'px';$('board').style.height=h*z+'px';v.style.justifyContent=w*z>v.clientWidth-70?'flex-start':'center';v.style.alignItems=h*z>v.clientHeight-70?'flex-start':'center'}
function legacyConfig(){return {format:'floral-studio-models',version:5,settings:Object.fromEntries(KEYS.map(k=>[k,$(k).type==='checkbox'?$(k).checked:$(k).value]))}}
function applySettings(obj){for(const k of KEYS){if(!(k in obj))continue;const e=$(k),v=obj[k];if(e.type==='checkbox'){if(typeof v==='boolean')e.checked=v}else if(e.tagName==='SELECT'){if([...e.options].some(o=>o.value===v))e.value=v}else if(e.type==='color'){if(/^#[0-9a-f]{6}$/i.test(v))e.value=v}else {const n=Number(v);if(Number.isFinite(n)&&n>=Number(e.min)&&n<=Number(e.max))e.value=n}}previousUnit=$('unit').value;redraw()}
function toast(t){document.querySelector('.toast')?.remove();clearTimeout(toastTimer);const e=document.createElement('div');e.className='toast';e.setAttribute('role','status');e.textContent=t;document.body.appendChild(e);toastTimer=setTimeout(()=>e.remove(),4500)}
function download(data,type,name){const url=URL.createObjectURL(new Blob([data],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000)}
function exportSVG(tile=false){try{const s=state();if(!s)throw Error('请先输入有效尺寸。');const flat=$('exportStyle').value==='paths',out=svg(s,{tile,flat});download('<?xml version="1.0" encoding="UTF-8"?>\n'+out,'image/svg+xml;charset=utf-8',tile?'花间-V6闭合轮廓-循环单元.svg':`花间-V6含围边-${fmt(s.outputWidth)}x${fmt(s.outputHeight)}${s.unit}.svg`);toast(tile?'已导出可四边拼接的循环单元':'已导出闭合内外轮廓，描边已展开，交叉处已合并')}catch(e){toast(e.message)}}
async function exportPNG(){const s=state();if(!s)return toast('请先输入有效尺寸。');const factor={px:1,mm:96/25.4,cm:96/2.54}[s.unit],w=Math.round(s.outputWidth*factor),h=Math.round(s.outputHeight*factor);if(w*h>32000000||w>16000||h>16000)return toast('PNG 限制为 3200 万像素、单边 16000 px；大画布请导出 SVG。');const b=$('exportPng');b.disabled=true;b.textContent='正在生成…';let url;
 try{url=URL.createObjectURL(new Blob([svg(s)],{type:'image/svg+xml'}));const im=new Image();await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=()=>reject(Error('PNG 渲染失败，请尝试 SVG 导出。'));im.src=url});const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;canvas.getContext('2d').drawImage(im,0,0,w,h);const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));if(!blob)throw Error('PNG 生成失败，请减小尺寸。');download(blob,'image/png',`花间-V6闭合轮廓-${w}x${h}.png`);toast(`已导出 ${w} × ${h} px PNG（96 dpi 换算）`)}catch(e){toast(e.message)}finally{if(url)URL.revokeObjectURL(url);b.disabled=false;b.textContent='导出 PNG'}
}

// ZIP store format (no dependency, no upload): one SVG per distinct color.
function zipStore(entries){
 const enc=new TextEncoder(),chunks=[],central=[],crcTable=Array.from({length:256},(_,i)=>{let c=i;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0});let offset=0;
 const crc=data=>{let c=0xffffffff;for(const b of data)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0};
 const header=n=>{const b=new Uint8Array(n);return {b,v:new DataView(b.buffer)}};
 for(const entry of entries){const name=enc.encode(entry.name),data=enc.encode(entry.text),sum=crc(data),l=header(30);l.v.setUint32(0,0x04034b50,true);l.v.setUint16(4,20,true);l.v.setUint16(6,0x800,true);l.v.setUint16(12,33,true);l.v.setUint32(14,sum,true);l.v.setUint32(18,data.length,true);l.v.setUint32(22,data.length,true);l.v.setUint16(26,name.length,true);chunks.push(l.b,name,data);
 const c=header(46);c.v.setUint32(0,0x02014b50,true);c.v.setUint16(4,20,true);c.v.setUint16(6,20,true);c.v.setUint16(8,0x800,true);c.v.setUint16(14,33,true);c.v.setUint32(16,sum,true);c.v.setUint32(20,data.length,true);c.v.setUint32(24,data.length,true);c.v.setUint16(28,name.length,true);c.v.setUint32(42,offset,true);central.push(c.b,name);offset+=30+name.length+data.length;
 }const size=central.reduce((n,b)=>n+b.length,0),end=header(22);end.v.setUint32(0,0x06054b50,true);end.v.setUint16(8,entries.length,true);end.v.setUint16(10,entries.length,true);end.v.setUint32(12,size,true);end.v.setUint32(16,offset,true);return new Blob([...chunks,...central,end.b],{type:'application/zip'});
}
function legacyColorFiles(s){
 const colors=[...new Set([...(s.transparent?[]:[s.bg]),s.fill].map(c=>c.toLowerCase()))];
 return colors.map((color,i)=>({name:`${String(i+1).padStart(2,'0')}-${color.slice(1).toUpperCase()}-${color===s.fill?'图案':'背景'}.svg`,text:'<?xml version="1.0" encoding="UTF-8"?>\n'+svg(s,{flat:$('exportStyle').value==='paths',onlyColor:color})}));
}
function exportColors(){try{const s=state();if(!s)throw Error('请先输入有效尺寸。');const files=colorFiles(s);download(zipStore(files),'application/zip',`花间-V6分色-${fmt(s.outputWidth)}x${fmt(s.outputHeight)}${s.unit}.zip`);toast(`已分别导出 ${files.length} 种颜色的 SVG，尺寸与坐标保持一致；解压即可单独编辑。`)}catch(e){toast(e.message)}}


globalThis.lanternRun=async request=>{const config=request.data.config;customSource=validateCustomSource(config.customSource);customCacheKey=assemblyKey=meshKey=planarKey='';for(const key of KEYS){const el=$(key);if(!(key in config.settings))throw Error('缺少参数 '+key);if(el.type==='checkbox')el.checked=!!config.settings[key];else el.value=String(config.settings[key]);}const s=state();if(!s)throw Error('尺寸或参数无效');if(s.patternSource==='custom'&&!customSource)throw Error('缺少自定义SVG');if(s.nx*s.ny>2000)throw Error('重复单元过多，请增大单元尺寸');const mode=request.action;if(mode==='svg')return{svg:svg(s,request.data.options||{}),state:s};if(mode==='colors')return{files:colorFiles(s),state:s};const mesh=createExtrusion(s);if(mode==='stl')return{base64:Buffer.from(binarySTL(mesh)).toString("base64"),state:s,stats:{triangles:mesh.triangles,bodies:mesh.bodies,holes:mesh.holes,width:mesh.width,height:mesh.height,depth:mesh.depth}};if(mode==='mesh')return{...mesh,positions:Array.from(mesh.positions)};throw Error('操作无效');};
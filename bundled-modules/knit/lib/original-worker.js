(()=>{var Dt=Object.create;var Ke=Object.defineProperty;var Rt=Object.getOwnPropertyDescriptor;var kt=Object.getOwnPropertyNames;var $t=Object.getPrototypeOf,Ut=Object.prototype.hasOwnProperty;var Yt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Jt=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of kt(t))!Ut.call(e,o)&&o!==n&&Ke(e,o,{get:()=>t[o],enumerable:!(r=Rt(t,o))||r.enumerable});return e};var Ht=(e,t,n)=>(n=e!=null?Dt($t(e)):{},Jt(t||!e||!e.__esModule?Ke(n,"default",{value:e,enumerable:!0}):n,e));var Zt=Yt((Tt,Nt)=>{(function(e){if(typeof Tt=="object")Nt.exports=e();else if(typeof define=="function"&&define.amd)define(e);else{var t;try{t=window}catch{t=self}t.SparkMD5=e()}})(function(e){"use strict";var t=function(c,f){return c+f&4294967295},n=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function r(c,f,i,a,l,_){return f=t(t(f,c),t(a,_)),t(f<<l|f>>>32-l,i)}function o(c,f){var i=c[0],a=c[1],l=c[2],_=c[3];i+=(a&l|~a&_)+f[0]-680876936|0,i=(i<<7|i>>>25)+a|0,_+=(i&a|~i&l)+f[1]-389564586|0,_=(_<<12|_>>>20)+i|0,l+=(_&i|~_&a)+f[2]+606105819|0,l=(l<<17|l>>>15)+_|0,a+=(l&_|~l&i)+f[3]-1044525330|0,a=(a<<22|a>>>10)+l|0,i+=(a&l|~a&_)+f[4]-176418897|0,i=(i<<7|i>>>25)+a|0,_+=(i&a|~i&l)+f[5]+1200080426|0,_=(_<<12|_>>>20)+i|0,l+=(_&i|~_&a)+f[6]-1473231341|0,l=(l<<17|l>>>15)+_|0,a+=(l&_|~l&i)+f[7]-45705983|0,a=(a<<22|a>>>10)+l|0,i+=(a&l|~a&_)+f[8]+1770035416|0,i=(i<<7|i>>>25)+a|0,_+=(i&a|~i&l)+f[9]-1958414417|0,_=(_<<12|_>>>20)+i|0,l+=(_&i|~_&a)+f[10]-42063|0,l=(l<<17|l>>>15)+_|0,a+=(l&_|~l&i)+f[11]-1990404162|0,a=(a<<22|a>>>10)+l|0,i+=(a&l|~a&_)+f[12]+1804603682|0,i=(i<<7|i>>>25)+a|0,_+=(i&a|~i&l)+f[13]-40341101|0,_=(_<<12|_>>>20)+i|0,l+=(_&i|~_&a)+f[14]-1502002290|0,l=(l<<17|l>>>15)+_|0,a+=(l&_|~l&i)+f[15]+1236535329|0,a=(a<<22|a>>>10)+l|0,i+=(a&_|l&~_)+f[1]-165796510|0,i=(i<<5|i>>>27)+a|0,_+=(i&l|a&~l)+f[6]-1069501632|0,_=(_<<9|_>>>23)+i|0,l+=(_&a|i&~a)+f[11]+643717713|0,l=(l<<14|l>>>18)+_|0,a+=(l&i|_&~i)+f[0]-373897302|0,a=(a<<20|a>>>12)+l|0,i+=(a&_|l&~_)+f[5]-701558691|0,i=(i<<5|i>>>27)+a|0,_+=(i&l|a&~l)+f[10]+38016083|0,_=(_<<9|_>>>23)+i|0,l+=(_&a|i&~a)+f[15]-660478335|0,l=(l<<14|l>>>18)+_|0,a+=(l&i|_&~i)+f[4]-405537848|0,a=(a<<20|a>>>12)+l|0,i+=(a&_|l&~_)+f[9]+568446438|0,i=(i<<5|i>>>27)+a|0,_+=(i&l|a&~l)+f[14]-1019803690|0,_=(_<<9|_>>>23)+i|0,l+=(_&a|i&~a)+f[3]-187363961|0,l=(l<<14|l>>>18)+_|0,a+=(l&i|_&~i)+f[8]+1163531501|0,a=(a<<20|a>>>12)+l|0,i+=(a&_|l&~_)+f[13]-1444681467|0,i=(i<<5|i>>>27)+a|0,_+=(i&l|a&~l)+f[2]-51403784|0,_=(_<<9|_>>>23)+i|0,l+=(_&a|i&~a)+f[7]+1735328473|0,l=(l<<14|l>>>18)+_|0,a+=(l&i|_&~i)+f[12]-1926607734|0,a=(a<<20|a>>>12)+l|0,i+=(a^l^_)+f[5]-378558|0,i=(i<<4|i>>>28)+a|0,_+=(i^a^l)+f[8]-2022574463|0,_=(_<<11|_>>>21)+i|0,l+=(_^i^a)+f[11]+1839030562|0,l=(l<<16|l>>>16)+_|0,a+=(l^_^i)+f[14]-35309556|0,a=(a<<23|a>>>9)+l|0,i+=(a^l^_)+f[1]-1530992060|0,i=(i<<4|i>>>28)+a|0,_+=(i^a^l)+f[4]+1272893353|0,_=(_<<11|_>>>21)+i|0,l+=(_^i^a)+f[7]-155497632|0,l=(l<<16|l>>>16)+_|0,a+=(l^_^i)+f[10]-1094730640|0,a=(a<<23|a>>>9)+l|0,i+=(a^l^_)+f[13]+681279174|0,i=(i<<4|i>>>28)+a|0,_+=(i^a^l)+f[0]-358537222|0,_=(_<<11|_>>>21)+i|0,l+=(_^i^a)+f[3]-722521979|0,l=(l<<16|l>>>16)+_|0,a+=(l^_^i)+f[6]+76029189|0,a=(a<<23|a>>>9)+l|0,i+=(a^l^_)+f[9]-640364487|0,i=(i<<4|i>>>28)+a|0,_+=(i^a^l)+f[12]-421815835|0,_=(_<<11|_>>>21)+i|0,l+=(_^i^a)+f[15]+530742520|0,l=(l<<16|l>>>16)+_|0,a+=(l^_^i)+f[2]-995338651|0,a=(a<<23|a>>>9)+l|0,i+=(l^(a|~_))+f[0]-198630844|0,i=(i<<6|i>>>26)+a|0,_+=(a^(i|~l))+f[7]+1126891415|0,_=(_<<10|_>>>22)+i|0,l+=(i^(_|~a))+f[14]-1416354905|0,l=(l<<15|l>>>17)+_|0,a+=(_^(l|~i))+f[5]-57434055|0,a=(a<<21|a>>>11)+l|0,i+=(l^(a|~_))+f[12]+1700485571|0,i=(i<<6|i>>>26)+a|0,_+=(a^(i|~l))+f[3]-1894986606|0,_=(_<<10|_>>>22)+i|0,l+=(i^(_|~a))+f[10]-1051523|0,l=(l<<15|l>>>17)+_|0,a+=(_^(l|~i))+f[1]-2054922799|0,a=(a<<21|a>>>11)+l|0,i+=(l^(a|~_))+f[8]+1873313359|0,i=(i<<6|i>>>26)+a|0,_+=(a^(i|~l))+f[15]-30611744|0,_=(_<<10|_>>>22)+i|0,l+=(i^(_|~a))+f[6]-1560198380|0,l=(l<<15|l>>>17)+_|0,a+=(_^(l|~i))+f[13]+1309151649|0,a=(a<<21|a>>>11)+l|0,i+=(l^(a|~_))+f[4]-145523070|0,i=(i<<6|i>>>26)+a|0,_+=(a^(i|~l))+f[11]-1120210379|0,_=(_<<10|_>>>22)+i|0,l+=(i^(_|~a))+f[2]+718787259|0,l=(l<<15|l>>>17)+_|0,a+=(_^(l|~i))+f[9]-343485551|0,a=(a<<21|a>>>11)+l|0,c[0]=i+c[0]|0,c[1]=a+c[1]|0,c[2]=l+c[2]|0,c[3]=_+c[3]|0}function u(c){var f=[],i;for(i=0;i<64;i+=4)f[i>>2]=c.charCodeAt(i)+(c.charCodeAt(i+1)<<8)+(c.charCodeAt(i+2)<<16)+(c.charCodeAt(i+3)<<24);return f}function v(c){var f=[],i;for(i=0;i<64;i+=4)f[i>>2]=c[i]+(c[i+1]<<8)+(c[i+2]<<16)+(c[i+3]<<24);return f}function s(c){var f=c.length,i=[1732584193,-271733879,-1732584194,271733878],a,l,_,F,h,w;for(a=64;a<=f;a+=64)o(i,u(c.substring(a-64,a)));for(c=c.substring(a-64),l=c.length,_=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],a=0;a<l;a+=1)_[a>>2]|=c.charCodeAt(a)<<(a%4<<3);if(_[a>>2]|=128<<(a%4<<3),a>55)for(o(i,_),a=0;a<16;a+=1)_[a]=0;return F=f*8,F=F.toString(16).match(/(.*?)(.{0,8})$/),h=parseInt(F[2],16),w=parseInt(F[1],16)||0,_[14]=h,_[15]=w,o(i,_),i}function m(c){var f=c.length,i=[1732584193,-271733879,-1732584194,271733878],a,l,_,F,h,w;for(a=64;a<=f;a+=64)o(i,v(c.subarray(a-64,a)));for(c=a-64<f?c.subarray(a-64):new Uint8Array(0),l=c.length,_=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],a=0;a<l;a+=1)_[a>>2]|=c[a]<<(a%4<<3);if(_[a>>2]|=128<<(a%4<<3),a>55)for(o(i,_),a=0;a<16;a+=1)_[a]=0;return F=f*8,F=F.toString(16).match(/(.*?)(.{0,8})$/),h=parseInt(F[2],16),w=parseInt(F[1],16)||0,_[14]=h,_[15]=w,o(i,_),i}function d(c){var f="",i;for(i=0;i<4;i+=1)f+=n[c>>i*8+4&15]+n[c>>i*8&15];return f}function p(c){var f;for(f=0;f<c.length;f+=1)c[f]=d(c[f]);return c.join("")}p(s("hello"))!=="5d41402abc4b2a76b9719d911017c592"&&(t=function(c,f){var i=(c&65535)+(f&65535),a=(c>>16)+(f>>16)+(i>>16);return a<<16|i&65535}),typeof ArrayBuffer<"u"&&!ArrayBuffer.prototype.slice&&(function(){function c(f,i){return f=f|0||0,f<0?Math.max(f+i,0):Math.min(f,i)}ArrayBuffer.prototype.slice=function(f,i){var a=this.byteLength,l=c(f,a),_=a,F,h,w,S;return i!==e&&(_=c(i,a)),l>_?new ArrayBuffer(0):(F=_-l,h=new ArrayBuffer(F),w=new Uint8Array(h),S=new Uint8Array(this,l,F),w.set(S),h)}})();function g(c){return/[\u0080-\uFFFF]/.test(c)&&(c=unescape(encodeURIComponent(c))),c}function y(c,f){var i=c.length,a=new ArrayBuffer(i),l=new Uint8Array(a),_;for(_=0;_<i;_+=1)l[_]=c.charCodeAt(_);return f?l:a}function x(c){return String.fromCharCode.apply(null,new Uint8Array(c))}function G(c,f,i){var a=new Uint8Array(c.byteLength+f.byteLength);return a.set(new Uint8Array(c)),a.set(new Uint8Array(f),c.byteLength),i?a:a.buffer}function b(c){var f=[],i=c.length,a;for(a=0;a<i-1;a+=2)f.push(parseInt(c.substr(a,2),16));return String.fromCharCode.apply(String,f)}function M(){this.reset()}return M.prototype.append=function(c){return this.appendBinary(g(c)),this},M.prototype.appendBinary=function(c){this._buff+=c,this._length+=c.length;var f=this._buff.length,i;for(i=64;i<=f;i+=64)o(this._hash,u(this._buff.substring(i-64,i)));return this._buff=this._buff.substring(i-64),this},M.prototype.end=function(c){var f=this._buff,i=f.length,a,l=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],_;for(a=0;a<i;a+=1)l[a>>2]|=f.charCodeAt(a)<<(a%4<<3);return this._finish(l,i),_=p(this._hash),c&&(_=b(_)),this.reset(),_},M.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},M.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},M.prototype.setState=function(c){return this._buff=c.buff,this._length=c.length,this._hash=c.hash,this},M.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},M.prototype._finish=function(c,f){var i=f,a,l,_;if(c[i>>2]|=128<<(i%4<<3),i>55)for(o(this._hash,c),i=0;i<16;i+=1)c[i]=0;a=this._length*8,a=a.toString(16).match(/(.*?)(.{0,8})$/),l=parseInt(a[2],16),_=parseInt(a[1],16)||0,c[14]=l,c[15]=_,o(this._hash,c)},M.hash=function(c,f){return M.hashBinary(g(c),f)},M.hashBinary=function(c,f){var i=s(c),a=p(i);return f?b(a):a},M.ArrayBuffer=function(){this.reset()},M.ArrayBuffer.prototype.append=function(c){var f=G(this._buff.buffer,c,!0),i=f.length,a;for(this._length+=c.byteLength,a=64;a<=i;a+=64)o(this._hash,v(f.subarray(a-64,a)));return this._buff=a-64<i?new Uint8Array(f.buffer.slice(a-64)):new Uint8Array(0),this},M.ArrayBuffer.prototype.end=function(c){var f=this._buff,i=f.length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],l,_;for(l=0;l<i;l+=1)a[l>>2]|=f[l]<<(l%4<<3);return this._finish(a,i),_=p(this._hash),c&&(_=b(_)),this.reset(),_},M.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},M.ArrayBuffer.prototype.getState=function(){var c=M.prototype.getState.call(this);return c.buff=x(c.buff),c},M.ArrayBuffer.prototype.setState=function(c){return c.buff=y(c.buff,!0),M.prototype.setState.call(this,c)},M.ArrayBuffer.prototype.destroy=M.prototype.destroy,M.ArrayBuffer.prototype._finish=M.prototype._finish,M.ArrayBuffer.hash=function(c,f){var i=m(new Uint8Array(c)),a=p(i);return f?b(a):a},M})});var B=Uint8Array,q=Uint16Array,je=Int32Array,Ge=new B([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Fe=new B([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Le=new B([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),rt=function(e,t){for(var n=new q(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var o=new je(n[30]),r=1;r<30;++r)for(var u=n[r];u<n[r+1];++u)o[u]=u-n[r]<<5|r;return{b:n,r:o}},at=rt(Ge,2),it=at.b,Te=at.r;it[28]=258,Te[258]=28;var ot=rt(Fe,0),Wt=ot.b,Qe=ot.r,Ne=new q(32768);for(C=0;C<32768;++C)ie=(C&43690)>>1|(C&21845)<<1,ie=(ie&52428)>>2|(ie&13107)<<2,ie=(ie&61680)>>4|(ie&3855)<<4,Ne[C]=((ie&65280)>>8|(ie&255)<<8)>>1;var ie,C,re=(function(e,t,n){for(var r=e.length,o=0,u=new q(t);o<r;++o)e[o]&&++u[e[o]-1];var v=new q(t);for(o=1;o<t;++o)v[o]=v[o-1]+u[o-1]<<1;var s;if(n){s=new q(1<<t);var m=15-t;for(o=0;o<r;++o)if(e[o])for(var d=o<<4|e[o],p=t-e[o],g=v[e[o]-1]++<<p,y=g|(1<<p)-1;g<=y;++g)s[Ne[g]>>m]=d}else for(s=new q(r),o=0;o<r;++o)e[o]&&(s[o]=Ne[v[e[o]-1]++]>>15-e[o]);return s}),fe=new B(288);for(C=0;C<144;++C)fe[C]=8;var C;for(C=144;C<256;++C)fe[C]=9;var C;for(C=256;C<280;++C)fe[C]=7;var C;for(C=280;C<288;++C)fe[C]=8;var C,ve=new B(32);for(C=0;C<32;++C)ve[C]=5;var C,qt=re(fe,9,0),Kt=re(fe,9,1),Qt=re(ve,5,0),Vt=re(ve,5,1),Xe=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},V=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},Pe=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},De=function(e){return(e+7)/8|0},ye=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new B(e.subarray(t,n))};var en=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],J=function(e,t,n){var r=new Error(t||en[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,J),!n)throw r;return r},tn=function(e,t,n,r){var o=e.length,u=r?r.length:0;if(!o||t.f&&!t.l)return n||new B(0);var v=!n,s=v||t.i!=2,m=t.i;v&&(n=new B(o*3));var d=function(se){var _e=n.length;if(se>_e){var j=new B(Math.max(_e*2,se));j.set(n),n=j}},p=t.f||0,g=t.p||0,y=t.b||0,x=t.l,G=t.d,b=t.m,M=t.n,c=o*8;do{if(!x){p=V(e,g,1);var f=V(e,g+1,3);if(g+=3,f)if(f==1)x=Kt,G=Vt,b=9,M=5;else if(f==2){var _=V(e,g,31)+257,F=V(e,g+10,15)+4,h=_+V(e,g+5,31)+1;g+=14;for(var w=new B(h),S=new B(19),A=0;A<F;++A)S[Le[A]]=V(e,g+A*3,7);g+=F*3;for(var E=Xe(S),N=(1<<E)-1,X=re(S,E,1),A=0;A<h;){var P=X[V(e,g,N)];g+=P&15;var i=P>>4;if(i<16)w[A++]=i;else{var I=0,Z=0;for(i==16?(Z=3+V(e,g,3),g+=2,I=w[A-1]):i==17?(Z=3+V(e,g,7),g+=3):i==18&&(Z=11+V(e,g,127),g+=7);Z--;)w[A++]=I}}var R=w.subarray(0,_),L=w.subarray(_);b=Xe(R),M=Xe(L),x=re(R,b,1),G=re(L,M,1)}else J(1);else{var i=De(g)+4,a=e[i-4]|e[i-3]<<8,l=i+a;if(l>o){m&&J(0);break}s&&d(y+a),n.set(e.subarray(i,l),y),t.b=y+=a,t.p=g=l*8,t.f=p;continue}if(g>c){m&&J(0);break}}s&&d(y+131072);for(var z=(1<<b)-1,k=(1<<M)-1,H=g;;H=g){var I=x[Pe(e,g)&z],$=I>>4;if(g+=I&15,g>c){m&&J(0);break}if(I||J(2),$<256)n[y++]=$;else if($==256){H=g,x=null;break}else{var O=$-254;if($>264){var A=$-257,T=Ge[A];O=V(e,g,(1<<T)-1)+it[A],g+=T}var Y=G[Pe(e,g)&k],W=Y>>4;Y||J(3),g+=Y&15;var L=Wt[W];if(W>3){var T=Fe[W];L+=Pe(e,g)&(1<<T)-1,g+=T}if(g>c){m&&J(0);break}s&&d(y+131072);var ae=y+O;if(y<L){var he=u-L,le=Math.min(L,ae);for(he+y<0&&J(3);y<le;++y)n[y]=r[he+y]}for(;y<ae;++y)n[y]=n[y-L]}}t.l=x,t.p=H,t.b=y,t.f=p,x&&(p=1,t.m=b,t.d=G,t.n=M)}while(!p);return y!=n.length&&v?ye(n,0,y):n.subarray(0,y)},oe=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},de=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},Ie=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var o=n.length,u=n.slice();if(!o)return{t:st,l:0};if(o==1){var v=new B(n[0].s+1);return v[n[0].s]=1,{t:v,l:1}}n.sort(function(l,_){return l.f-_.f}),n.push({s:-1,f:25001});var s=n[0],m=n[1],d=0,p=1,g=2;for(n[0]={s:-1,f:s.f+m.f,l:s,r:m};p!=o-1;)s=n[n[d].f<n[g].f?d++:g++],m=n[d!=p&&n[d].f<n[g].f?d++:g++],n[p++]={s:-1,f:s.f+m.f,l:s,r:m};for(var y=u[0].s,r=1;r<o;++r)u[r].s>y&&(y=u[r].s);var x=new q(y+1),G=Ze(n[p-1],x,0);if(G>t){var r=0,b=0,M=G-t,c=1<<M;for(u.sort(function(_,F){return x[F.s]-x[_.s]||_.f-F.f});r<o;++r){var f=u[r].s;if(x[f]>t)b+=c-(1<<G-x[f]),x[f]=t;else break}for(b>>=M;b>0;){var i=u[r].s;x[i]<t?b-=1<<t-x[i]++-1:++r}for(;r>=0&&b;--r){var a=u[r].s;x[a]==t&&(--x[a],++b)}G=t}return{t:new B(x),l:G}},Ze=function(e,t,n){return e.s==-1?Math.max(Ze(e.l,t,n+1),Ze(e.r,t,n+1)):t[e.s]=n},Ve=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new q(++t),r=0,o=e[0],u=1,v=function(m){n[r++]=m},s=1;s<=t;++s)if(e[s]==o&&s!=t)++u;else{if(!o&&u>2){for(;u>138;u-=138)v(32754);u>2&&(v(u>10?u-11<<5|28690:u-3<<5|12305),u=0)}else if(u>3){for(v(o),--u;u>6;u-=6)v(8304);u>2&&(v(u-3<<5|8208),u=0)}for(;u--;)v(o);u=1,o=e[s]}return{c:n.subarray(0,r),n:t}},ge=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},lt=function(e,t,n){var r=n.length,o=De(t+2);e[o]=r&255,e[o+1]=r>>8,e[o+2]=e[o]^255,e[o+3]=e[o+1]^255;for(var u=0;u<r;++u)e[o+u+4]=n[u];return(o+4+r)*8},et=function(e,t,n,r,o,u,v,s,m,d,p){oe(t,p++,n),++o[256];for(var g=Ie(o,15),y=g.t,x=g.l,G=Ie(u,15),b=G.t,M=G.l,c=Ve(y),f=c.c,i=c.n,a=Ve(b),l=a.c,_=a.n,F=new q(19),h=0;h<f.length;++h)++F[f[h]&31];for(var h=0;h<l.length;++h)++F[l[h]&31];for(var w=Ie(F,7),S=w.t,A=w.l,E=19;E>4&&!S[Le[E-1]];--E);var N=d+5<<3,X=ge(o,fe)+ge(u,ve)+v,P=ge(o,y)+ge(u,b)+v+14+3*E+ge(F,S)+2*F[16]+3*F[17]+7*F[18];if(m>=0&&N<=X&&N<=P)return lt(t,p,e.subarray(m,m+d));var I,Z,R,L;if(oe(t,p,1+(P<X)),p+=2,P<X){I=re(y,x,0),Z=y,R=re(b,M,0),L=b;var z=re(S,A,0);oe(t,p,i-257),oe(t,p+5,_-1),oe(t,p+10,E-4),p+=14;for(var h=0;h<E;++h)oe(t,p+3*h,S[Le[h]]);p+=3*E;for(var k=[f,l],H=0;H<2;++H)for(var $=k[H],h=0;h<$.length;++h){var O=$[h]&31;oe(t,p,z[O]),p+=S[O],O>15&&(oe(t,p,$[h]>>5&127),p+=$[h]>>12)}}else I=qt,Z=fe,R=Qt,L=ve;for(var h=0;h<s;++h){var T=r[h];if(T>255){var O=T>>18&31;de(t,p,I[O+257]),p+=Z[O+257],O>7&&(oe(t,p,T>>23&31),p+=Ge[O]);var Y=T&31;de(t,p,R[Y]),p+=L[Y],Y>3&&(de(t,p,T>>5&8191),p+=Fe[Y])}else de(t,p,I[T]),p+=Z[T]}return de(t,p,I[256]),p+Z[256]},nn=new je([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),st=new B(0),rn=function(e,t,n,r,o,u){var v=u.z||e.length,s=new B(r+v+5*(1+Math.ceil(v/7e3))+o),m=s.subarray(r,s.length-o),d=u.l,p=(u.r||0)&7;if(t){p&&(m[0]=u.r>>3);for(var g=nn[t-1],y=g>>13,x=g&8191,G=(1<<n)-1,b=u.p||new q(32768),M=u.h||new q(G+1),c=Math.ceil(n/3),f=2*c,i=function(pe){return(e[pe]^e[pe+1]<<c^e[pe+2]<<f)&G},a=new je(25e3),l=new q(288),_=new q(32),F=0,h=0,w=u.i||0,S=0,A=u.w||0,E=0;w+2<v;++w){var N=i(w),X=w&32767,P=M[N];if(b[X]=P,M[N]=X,A<=w){var I=v-w;if((F>7e3||S>24576)&&(I>423||!d)){p=et(e,m,0,a,l,_,h,S,E,w-E,p),S=F=h=0,E=w;for(var Z=0;Z<286;++Z)l[Z]=0;for(var Z=0;Z<30;++Z)_[Z]=0}var R=2,L=0,z=x,k=X-P&32767;if(I>2&&N==i(w-k))for(var H=Math.min(y,I)-1,$=Math.min(32767,w),O=Math.min(258,I);k<=$&&--z&&X!=P;){if(e[w+R]==e[w+R-k]){for(var T=0;T<O&&e[w+T]==e[w+T-k];++T);if(T>R){if(R=T,L=k,T>H)break;for(var Y=Math.min(k,T-2),W=0,Z=0;Z<Y;++Z){var ae=w-k+Z&32767,he=b[ae],le=ae-he&32767;le>W&&(W=le,P=ae)}}}X=P,P=b[X],k+=X-P&32767}if(L){a[S++]=268435456|Te[R]<<18|Qe[L];var se=Te[R]&31,_e=Qe[L]&31;h+=Ge[se]+Fe[_e],++l[257+se],++_[_e],A=w+R,++F}else a[S++]=e[w],++l[e[w]]}}for(w=Math.max(w,A);w<v;++w)a[S++]=e[w],++l[e[w]];p=et(e,m,d,a,l,_,h,S,E,w-E,p),d||(u.r=p&7|m[p/8|0]<<3,p-=7,u.h=M,u.p=b,u.i=w,u.w=A)}else{for(var w=u.w||0;w<v+d;w+=65535){var j=w+65535;j>=v&&(m[p/8|0]=d,j=v),p=lt(m,p+1,e.subarray(w,j))}u.i=v}return ye(s,0,r+De(p)+o)},an=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),on=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=an[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var ln=function(e,t,n,r,o){if(!o&&(o={l:1},t.dictionary)){var u=t.dictionary.subarray(-32768),v=new B(u.length+e.length);v.set(u),v.set(e,u.length),e=v,o.w=u.length}return rn(e,t.level==null?6:t.level,t.mem==null?o.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,o)},_t=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n};var ne=function(e,t){return e[t]|e[t+1]<<8},ee=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Ce=function(e,t){return ee(e,t)+ee(e,t+4)*4294967296},U=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function sn(e,t){return ln(e,t||{},0,0)}function _n(e,t){return tn(e,{i:2},t&&t.out,t&&t.dictionary)}var ft=function(e,t,n,r){for(var o in e){var u=e[o],v=t+o,s=r;Array.isArray(u)&&(s=_t(r,u[1]),u=u[0]),u instanceof B?n[v]=[u,s]:(n[v+="/"]=[new B(0),s],ft(u,v,n,r))}},tt=typeof TextEncoder<"u"&&new TextEncoder,Be=typeof TextDecoder<"u"&&new TextDecoder,fn=0;try{Be.decode(st,{stream:!0}),fn=1}catch{}var cn=function(e){for(var t="",n=0;;){var r=e[n++],o=(r>127)+(r>223)+(r>239);if(n+o>e.length)return{s:t,r:ye(e,n-1)};o?o==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):o&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function D(e,t){if(t){for(var n=new B(e.length),r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(tt)return tt.encode(e);for(var o=e.length,u=new B(e.length+(e.length>>1)),v=0,s=function(p){u[v++]=p},r=0;r<o;++r){if(v+5>u.length){var m=new B(v+8+(o-r<<1));m.set(u),u=m}var d=e.charCodeAt(r);d<128||t?s(d):d<2048?(s(192|d>>6),s(128|d&63)):d>55295&&d<57344?(d=65536+(d&1047552)|e.charCodeAt(++r)&1023,s(240|d>>18),s(128|d>>12&63),s(128|d>>6&63),s(128|d&63)):(s(224|d>>12),s(128|d>>6&63),s(128|d&63))}return ye(u,0,v)}function ce(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(Be)return Be.decode(e);var o=cn(e),u=o.s,n=o.r;return n.length&&J(8),u}}var un=function(e,t){return t+30+ne(e,t+26)+ne(e,t+28)},hn=function(e,t,n){var r=ne(e,t+28),o=ce(e.subarray(t+46,t+46+r),!(ne(e,t+8)&2048)),u=t+46+r,v=ee(e,t+20),s=n&&v==4294967295?pn(e,u):[v,ee(e,t+24),ee(e,t+42)],m=s[0],d=s[1],p=s[2];return[ne(e,t+10),m,d,o,u+ne(e,t+30)+ne(e,t+32),p]},pn=function(e,t){for(;ne(e,t)!=1;t+=4+ne(e,t+2));return[Ce(e,t+12),Ce(e,t+4),Ce(e,t+20)]},Oe=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;r>65535&&J(9),t+=r+4}return t},nt=function(e,t,n,r,o,u,v,s){var m=r.length,d=n.extra,p=s&&s.length,g=Oe(d);U(e,t,v!=null?33639248:67324752),t+=4,v!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(u<0&&8),e[t++]=o&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var y=new Date(n.mtime==null?Date.now():n.mtime),x=y.getFullYear()-1980;if((x<0||x>119)&&J(10),U(e,t,x<<25|y.getMonth()+1<<21|y.getDate()<<16|y.getHours()<<11|y.getMinutes()<<5|y.getSeconds()>>1),t+=4,u!=-1&&(U(e,t,n.crc),U(e,t+4,u<0?-u-2:u),U(e,t+8,n.size)),U(e,t+12,m),U(e,t+14,g),t+=16,v!=null&&(U(e,t,p),U(e,t+6,n.attrs),U(e,t+10,v),t+=14),e.set(r,t),t+=m,g)for(var G in d){var b=d[G],M=b.length;U(e,t,+G),U(e,t+2,M),e.set(b,t+4),t+=4+M}return p&&(e.set(s,t),t+=p),t},mn=function(e,t,n,r,o){U(e,t,101010256),U(e,t+8,n),U(e,t+10,n),U(e,t+12,r),U(e,t+16,o)};function Se(e,t){t||(t={});var n={},r=[];ft(e,"",n,t);var o=0,u=0;for(var v in n){var s=n[v],m=s[0],d=s[1],p=d.level==0?0:8,g=D(v),y=g.length,x=d.comment,G=x&&D(x),b=G&&G.length,M=Oe(d.extra);y>65535&&J(11);var c=p?sn(m,d):m,f=c.length,i=on();i.p(m),r.push(_t(d,{size:m.length,crc:i.d(),c,f:g,m:G,u:y!=v.length||G&&x.length!=b,o,compression:p})),o+=30+y+M+f,u+=76+2*(y+M)+(b||0)+f}for(var a=new B(u+22),l=o,_=u-o,F=0;F<r.length;++F){var g=r[F];nt(a,g.o,g,g.f,g.u,g.c.length);var h=30+g.f.length+Oe(g.extra);a.set(g.c,g.o+h),nt(a,o,g,g.f,g.u,g.c.length,g.o,g.m),o+=16+h+(g.m?g.m.length:0)}return mn(a,o,r.length,_,l),a}function ct(e,t){for(var n={},r=e.length-22;ee(e,r)!=101010256;--r)(!r||e.length-r>65558)&&J(13);var o=ne(e,r+8);if(!o)return{};var u=ee(e,r+16),v=u==4294967295||o==65535;if(v){var s=ee(e,r-12);v=ee(e,s)==101075792,v&&(o=ee(e,s+32),u=ee(e,s+48))}for(var m=t&&t.filter,d=0;d<o;++d){var p=hn(e,u,v),g=p[0],y=p[1],x=p[2],G=p[3],b=p[4],M=p[5],c=un(e,M);u=b,(!m||m({name:G,size:y,originalSize:x,compression:g}))&&(g?g==8?n[G]=_n(e.subarray(c,c+y),{out:new B(x)}):J(14,"unknown compression type "+g):n[G]=ye(e,c,c+y))}return n}var ut=(e,t,n)=>Math.max(t,Math.min(n,e)),ht=["A","B","C","D"],dn=e=>typeof e=="string"&&/^#[0-9a-f]{6}$/i.test(e);function pt(e,t){let r=[t[0],t[1]===t[0]?"#42654c":t[1],"#edb678","#b59acb"].map((s,m)=>dn(e.filamentColors?.[m])?e.filamentColors[m].toLowerCase():s),o=typeof e.layerSequence=="string"?e.layerSequence.toUpperCase().replace(/[^ABCD]/g,"").slice(0,32):"AB",u=(s,m,d,p)=>Number.isFinite(Number(s))?ut(Math.round(Number(s)),d,p):m,v={};if(e.layerOverrides&&typeof e.layerOverrides=="object"&&!Array.isArray(e.layerOverrides))for(let[s,m]of Object.entries(e.layerOverrides)){let d=Number(s),p=Number(m);Number.isInteger(d)&&d>=1&&d<=3750&&Number.isInteger(p)&&p>=0&&p<4&&(v[d]=p)}return{colorMode:e.colorMode==="layers"?"layers":"bands",filamentColors:r,layerSequence:o||"AB",layersPerColor:u(e.layersPerColor,1,1,100),layerOffset:u(e.layerOffset,0,0,31),layerOverrides:v}}function mt(e){return Math.max(1,Math.ceil(e.height/e.layer-1e-8))}function Re(e,t){let n=ut(Math.floor(t),1,mt(e));if(Object.hasOwn(e.layerOverrides,n))return e.layerOverrides[n];let r=(Math.floor((n-1)/e.layersPerColor)+e.layerOffset)%e.layerSequence.length;return ht.indexOf(e.layerSequence[r])}function ke(e){let t=mt(e),n=[];for(let r=1;r<=t;r++){let o=Re(e,r);n.push({layer:r,bottomZ:+((r-1)*e.layer).toFixed(5),topZ:+(r*e.layer).toFixed(5),slot:o,color:e.filamentColors[o],manual:Object.hasOwn(e.layerOverrides,r)})}return n}function dt(e){let t=ke(e);return t.filter((n,r)=>r===0||n.slot!==t[r-1].slot)}function gt(e){let t=ke(e),n=dt(e),r=[...new Set(t.map(o=>o.slot))].sort();return{layers:t.length,changes:n.length-1,slots:r,manualLayers:t.filter(o=>o.manual).length}}function vt(e){return`\uFEFFLayer,Bottom_Z_mm,Top_Z_mm,Filament_Slot,Color,Manual_override\r
`+ke(e).map(t=>[t.layer,t.bottomZ,t.topZ,ht[t.slot],t.color,t.manual?"yes":"no"].join(",")).join(`\r
`)}function yt(e){return'<?xml version="1.0" encoding="UTF-8"?><custom_gcodes_per_layer><plate><plate_info id="1"/>'+dt(e).map(n=>`<layer top_z="${n.topZ.toFixed(5)}" type="2" extruder="${n.slot+1}" color="${n.color.toUpperCase()}" extra="" gcode="tool_change"/>`).join("")+'<mode value="MultiAsSingle"/></plate></custom_gcodes_per_layer>'}var me={accel_to_decel_enable:"0",accel_to_decel_factor:"50%",activate_air_filtration:["0"],additional_cooling_fan_speed:["70"],additional_fan_full_speed_layer:["0"],alternate_extra_wall:"0",ams_filament_load_time_ams:"0",ams_filament_load_time_ams_lite:"0",ams_filament_load_time_n3f_s:"0",ams_filament_unload_time_ams:"0",ams_filament_unload_time_ams_lite:"0",ams_filament_unload_time_n3f_s:"0",apply_scarf_seam_on_circles:"1",auxiliary_fan:"0",avoid_crossing_wall_includes_support:"0",bed_custom_model:"",bed_custom_texture:"",bed_exclude_area:[],bed_heat_soak_area:[],bed_temperature_formula:"by_first_filament",before_layer_change_gcode:"",best_object_pos:"0.5,0.5",bottom_color_penetration_layers:"3",bottom_shell_layers:"6",bottom_shell_thickness:"0",bottom_surface_density:"100%",bottom_surface_pattern:"monotonic",bridge_angle:"0",bridge_flow:"1",bridge_no_support:"0",bridge_speed:["50"],brim_object_gap:"0.1",brim_type:"auto_brim",brim_width:"5",chamber_temperatures:["0"],change_filament_gcode:`;===== A1 20251031 =======================
M1007 S0 ; turn off mass estimation
G392 S0
M620 S[next_extruder]A
M204 S9000
G1 Z{max_layer_z + 3.0} F1200

M400
M106 P1 S0
M106 P2 S0
{if old_filament_temp > 142 && next_extruder < 255}
M104 S[old_filament_temp]
{endif}

G1 X267 F18000

{if long_retractions_when_cut[previous_extruder]}
M620.11 S1 I[previous_extruder] E-{retraction_distances_when_cut[previous_extruder]} F1200
{else}
M620.11 S0
{endif}
M400

M620.1 E F{flush_volumetric_speeds[previous_extruder]/2.4053*60} T{flush_temperatures[previous_extruder]}
M620.10 A0 F{flush_volumetric_speeds[previous_extruder]/2.4053*60}
T[next_extruder]
M620.1 E F{flush_volumetric_speeds[next_extruder]/2.4053*60} T{flush_temperatures[next_extruder]}
M620.10 A1 F{flush_volumetric_speeds[next_extruder]/2.4053*60} L[flush_length] H[nozzle_diameter] T{flush_temperatures[next_extruder]}

G1 Y128 F9000

{if next_extruder < 255}

{if long_retractions_when_cut[previous_extruder]}
M620.11 S1 I[previous_extruder] E{retraction_distances_when_cut[previous_extruder]} F{flush_volumetric_speeds[previous_extruder]/2.4053*60}
M628 S1
G92 E0
G1 E{retraction_distances_when_cut[previous_extruder]} F{flush_volumetric_speeds[previous_extruder]/2.4053*60}
M400
M629 S1
{else}
M620.11 S0
{endif}

M400
G92 E0
M628 S0

{if flush_length_1 > 1}
; FLUSH_START
; always use highest temperature to flush
M400
M1002 set_filament_type:UNKNOWN
M109 S[flush_temperatures[next_extruder]]
M106 P1 S60
{if flush_length_1 > 23.7}
G1 E23.7 F{flush_volumetric_speeds[previous_extruder]/2.4053*60} ; do not need pulsatile flushing for start part
G1 E{(flush_length_1 - 23.7) * 0.02} F50
G1 E{(flush_length_1 - 23.7) * 0.23} F{flush_volumetric_speeds[previous_extruder]/2.4053*60}
G1 E{(flush_length_1 - 23.7) * 0.02} F50
G1 E{(flush_length_1 - 23.7) * 0.23} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{(flush_length_1 - 23.7) * 0.02} F50
G1 E{(flush_length_1 - 23.7) * 0.23} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{(flush_length_1 - 23.7) * 0.02} F50
G1 E{(flush_length_1 - 23.7) * 0.23} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
{else}
G1 E{flush_length_1} F{flush_volumetric_speeds[previous_extruder]/2.4053*60}
{endif}
; FLUSH_END
G1 E-[old_retract_length_toolchange] F1800
G1 E[old_retract_length_toolchange] F300
M400
M1002 set_filament_type:{filament_type[next_extruder]}
{endif}

{if flush_length_1 > 45 && flush_length_2 > 1}
; WIPE
M400
M106 P1 S178
M400 S3
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
M400
M106 P1 S0
{endif}

{if flush_length_2 > 1}
M106 P1 S60
; FLUSH_START
G1 E{flush_length_2 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_2 * 0.02} F50
G1 E{flush_length_2 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_2 * 0.02} F50
G1 E{flush_length_2 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_2 * 0.02} F50
G1 E{flush_length_2 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_2 * 0.02} F50
G1 E{flush_length_2 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_2 * 0.02} F50
; FLUSH_END
G1 E-[new_retract_length_toolchange] F1800
G1 E[new_retract_length_toolchange] F300
{endif}

{if flush_length_2 > 45 && flush_length_3 > 1}
; WIPE
M400
M106 P1 S178
M400 S3
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
M400
M106 P1 S0
{endif}

{if flush_length_3 > 1}
M106 P1 S60
; FLUSH_START
G1 E{flush_length_3 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_3 * 0.02} F50
G1 E{flush_length_3 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_3 * 0.02} F50
G1 E{flush_length_3 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_3 * 0.02} F50
G1 E{flush_length_3 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_3 * 0.02} F50
G1 E{flush_length_3 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_3 * 0.02} F50
; FLUSH_END
G1 E-[new_retract_length_toolchange] F1800
G1 E[new_retract_length_toolchange] F300
{endif}

{if flush_length_3 > 45 && flush_length_4 > 1}
; WIPE
M400
M106 P1 S178
M400 S3
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
M400
M106 P1 S0
{endif}

{if flush_length_4 > 1}
M106 P1 S60
; FLUSH_START
G1 E{flush_length_4 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_4 * 0.02} F50
G1 E{flush_length_4 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_4 * 0.02} F50
G1 E{flush_length_4 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_4 * 0.02} F50
G1 E{flush_length_4 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_4 * 0.02} F50
G1 E{flush_length_4 * 0.18} F{flush_volumetric_speeds[next_extruder]/2.4053*60}
G1 E{flush_length_4 * 0.02} F50
; FLUSH_END
{endif}

M629

M400
M106 P1 S60
M109 S[new_filament_temp]
G1 E6 F{flush_volumetric_speeds[next_extruder]/2.4053*60} ;Compensate for filament spillage during waiting temperature
M400
G92 E0
G1 E-[new_retract_length_toolchange] F1800
M400
M106 P1 S178
M400 S3
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
G1 X-38.2 F18000
G1 X-48.2 F3000
M400
G1 Z{max_layer_z + 3.0} F3000
M106 P1 S0
{if layer_z <= (initial_layer_print_height + 0.001)}
M204 S[initial_layer_acceleration]
{else}
M204 S[default_acceleration]
{endif}
{else}
G1 X[x_after_toolchange] Y[y_after_toolchange] Z[z_after_toolchange] F12000
{endif}

M622.1 S0
M9833 F{outer_wall_volumetric_speed/2.4} A0.3 ; cali dynamic extrusion compensation
M1002 judge_flag filament_need_cali_flag
M622 J1
  G92 E0
  G1 E-[new_retract_length_toolchange] F1800
  M400
  
  M106 P1 S178
  M400 S4
  G1 X-38.2 F18000
  G1 X-48.2 F3000
  G1 X-38.2 F18000 ;wipe and shake
  G1 X-48.2 F3000
  G1 X-38.2 F12000 ;wipe and shake
  G1 X-48.2 F3000
  M400
  M106 P1 S0 
M623

M621 S[next_extruder]A
G392 S0

M1007 S1
`,circle_compensation_manual_offset:"0",circle_compensation_speed:["200"],close_additional_fan_first_x_layers:["1"],close_fan_the_first_x_layers:["1"],compatible_printers_condition:"",complete_print_exhaust_fan_speed:["70"],cool_plate_temp:["35"],cool_plate_temp_initial_layer:["35"],cooling_filter_enabled:"0",cooling_perimeter_transition_distance:["10"],cooling_slowdown_logic:["uniform_cooling"],counter_coef_1:["0"],counter_coef_2:["0.008"],counter_coef_3:["-0.041"],counter_limit_max:["0.033"],counter_limit_min:["-0.035"],counterbore_hole_bridging:"none",curr_bed_type:"Textured PEI Plate",default_acceleration:["6000"],default_ams_type:"-1",default_filament_colour:[""],default_filament_profile:["Bambu PLA Basic @BBL A1"],default_jerk:"0",default_nozzle_volume_type:["Standard"],default_print_profile:"0.20mm Standard @BBL A1",deretraction_speed:["30"],detect_floating_vertical_shell:"1",detect_narrow_internal_solid_infill:"1",detect_overhang_wall:"1",detect_thin_wall:"0",diameter_limit:["50"],different_settings_to_system:["","",""],draft_shield:"disabled",during_print_exhaust_fan_speed:["70"],elefant_foot_compensation:"0.075",embedding_wall_into_infill:"0",enable_arc_fitting:"1",enable_circle_compensation:"0",enable_filament_dynamic_map:"0",enable_height_slowdown:["0"],enable_long_retraction_when_cut:"2",enable_mixed_color_sublayer:"0",enable_order_independent_overlap_carving:"0",enable_overhang_bridge_fan:["1"],enable_overhang_speed:["1"],enable_pre_heating:"0",enable_pressure_advance:["0"],enable_prime_tower:"1",enable_support:"0",enable_support_ironing:"0",enable_tower_interface_features:"0",enable_wrapping_detection:"0",enforce_support_layers:"0",eng_plate_temp:["0"],eng_plate_temp_initial_layer:["0"],ensure_vertical_shell_thickness:"enabled",exclude_object:"1",extruder_ams_count:[],extruder_clearance_dist_to_rod:"56.5",extruder_clearance_height_to_lid:"256",extruder_clearance_height_to_rod:"25",extruder_clearance_max_radius:"73",extruder_colour:["#018001"],extruder_max_nozzle_count:["1"],extruder_nozzle_stats:[],extruder_offset:["0x0"],extruder_printable_area:[],extruder_printable_height:[],extruder_type:["Direct Drive"],extruder_variant_list:["Direct Drive Standard"],fan_cooling_layer_time:["80"],fan_direction:"undefine",fan_max_speed:["80"],fan_min_speed:["60"],farthest_point_timelapse:"0",filament_adaptive_volumetric_speed:["0"],filament_adhesiveness_category:["100"],filament_bridge_speed:["25"],filament_change_length:["5"],filament_change_length_nc:["10"],filament_colour:["#00AE42"],filament_cooling_before_tower:["0"],filament_cost:["19.99"],filament_density:["1.26"],filament_deretraction_speed:["nil"],filament_dev_ams_drying_ams_limitations:["1"],filament_dev_ams_drying_heat_distortion_temperature:["45"],filament_dev_ams_drying_temperature:["45"],filament_dev_ams_drying_time:["12"],filament_dev_chamber_drying_bed_temperature:["70"],filament_dev_chamber_drying_time:["12"],filament_dev_drying_cooling_temperature:["45"],filament_dev_drying_softening_temperature:["50"],filament_diameter:["1.75"],filament_enable_overhang_speed:["1"],filament_end_gcode:[`; filament end gcode 

`],filament_extruder_compatibility:["0"],filament_extruder_variant:["Direct Drive Standard"],filament_flow_ratio:["0.98"],filament_flush_temp:["0"],filament_flush_temp_fast:["0"],filament_flush_volumetric_speed:["0"],filament_ids:["GFA00"],filament_is_mixed:["0"],filament_is_support:["0"],filament_long_retractions_when_cut:["1"],filament_map:["1"],filament_map_2:["1"],filament_map_mode:"Auto For Flush",filament_max_volumetric_speed:["21"],filament_metal_stickiness:["None"],filament_minimal_purge_on_wipe_tower:["15"],filament_mixed_components:[""],filament_mixed_gradient:["0"],filament_mixed_gradient_curve:[""],filament_mixed_gradient_per_part:["0"],filament_mixed_gradient_range:[""],filament_mixed_sublayer_ratios:[""],filament_notes:"",filament_nozzle_map:["1"],filament_overhang_1_4_speed:["0"],filament_overhang_2_4_speed:["50"],filament_overhang_3_4_speed:["30"],filament_overhang_4_4_speed:["10"],filament_overhang_totally_speed:["10"],filament_pre_cooling_temperature:["0"],filament_pre_cooling_temperature_nc:["0"],filament_preheat_temperature_delta:["0"],filament_prime_volume:["30"],filament_prime_volume_nc:["60"],filament_printable:["3"],filament_ramming_travel_time:["0"],filament_ramming_travel_time_nc:["0"],filament_ramming_volumetric_speed:["-1"],filament_ramming_volumetric_speed_nc:["-1"],filament_retract_before_wipe:["nil"],filament_retract_length_nc:["14"],filament_retract_restart_extra:["nil"],filament_retract_when_changing_layer:["nil"],filament_retraction_distances_when_cut:["18"],filament_retraction_length:["nil"],filament_retraction_minimum_travel:["nil"],filament_retraction_speed:["nil"],filament_scarf_gap:["0%"],filament_scarf_height:["10%"],filament_scarf_length:["10"],filament_scarf_seam_type:["none"],filament_self_index:["1"],filament_settings_id:["Bambu PLA Basic @BBL A1"],filament_shrink:["100%"],filament_soluble:["0"],filament_start_gcode:[`; filament start gcode
{if  (bed_temperature[current_extruder] >55)||(bed_temperature_initial_layer[current_extruder] >55)}M106 P3 S200
{elsif(bed_temperature[current_extruder] >50)||(bed_temperature_initial_layer[current_extruder] >50)}M106 P3 S150
{elsif(bed_temperature[current_extruder] >45)||(bed_temperature_initial_layer[current_extruder] >45)}M106 P3 S50
{endif}

{if activate_air_filtration[current_extruder] && support_air_filtration}
M106 P3 S{during_print_exhaust_fan_speed_num[current_extruder]} 
{endif}`],filament_tower_interface_pre_extrusion_dist:["10"],filament_tower_interface_pre_extrusion_length:["0"],filament_tower_interface_print_temp:["-1"],filament_tower_interface_purge_volume:["20"],filament_tower_ironing_area:["4"],filament_type:["PLA"],filament_velocity_adaptation_factor:["1"],filament_vendor:["Bambu Lab"],filament_volume_map:["0"],filament_wipe:["nil"],filament_wipe_distance:["nil"],filament_z_hop:["nil"],filament_z_hop_types:["nil"],filename_format:"{input_filename_base}_{filament_type[0]}_{print_time}.gcode",fill_multiline:"1",filter_out_gap_fill:"0",first_layer_print_sequence:["0"],first_x_layer_fan_speed:["0"],first_x_layer_part_fan_speed:["0"],flush_into_infill:"0",flush_into_objects:"0",flush_into_support:"1",flush_multiplier:["1"],flush_multiplier_fast:["1.2"],flush_volumes_matrix:["0","280","280","280","280","0","280","280","280","280","0","280","280","280","280","0"],flush_volumes_vector:["140","140","140","140","140","140","140","140"],from:"project",full_fan_speed_layer:["0"],fuzzy_skin:"none",fuzzy_skin_first_layer:"0",fuzzy_skin_mode:"displacement",fuzzy_skin_noise_type:"classic",fuzzy_skin_octaves:"4",fuzzy_skin_persistence:"0.5",fuzzy_skin_point_distance:"0.8",fuzzy_skin_scale:"1",fuzzy_skin_thickness:"0.3",gap_infill_speed:["250"],gcode_add_line_number:"0",gcode_flavor:"marlin",grab_length:["17.4"],group_algo_with_time:"0",has_filament_switcher:"0",has_scarf_joint_seam:"0",head_wrap_detect_zone:["226x224","256x224","256x256","226x256"],hole_coef_1:["0"],hole_coef_2:["-0.008"],hole_coef_3:["0.23415"],hole_limit_max:["0.22"],hole_limit_min:["0.088"],hot_plate_temp:["65"],hot_plate_temp_initial_layer:["65"],hotend_cooling_rate:["2"],hotend_heating_rate:["2"],impact_strength_z:["13.8"],independent_support_layer_height:"1",infill_combination:"0",infill_direction:"45",infill_instead_top_bottom_surfaces:"0",infill_jerk:"9",infill_lock_depth:"1",infill_rotate_step:"0",infill_shift_step:"0.4",infill_wall_overlap:"15%",inherits_group:["","",""],initial_layer_acceleration:["500"],initial_layer_flow_ratio:"1",initial_layer_infill_speed:["105"],initial_layer_jerk:"9",initial_layer_line_width:"0.5",initial_layer_print_height:"0.2",initial_layer_speed:["50"],initial_layer_travel_acceleration:["6000"],inner_wall_acceleration:["0"],inner_wall_jerk:"9",inner_wall_line_width:"0.45",inner_wall_speed:["40"],interface_shells:"0",interlocking_beam:"0",interlocking_beam_layer_count:"2",interlocking_beam_width:"0.8",interlocking_boundary_avoidance:"2",interlocking_depth:"2",interlocking_orientation:"22.5",internal_bridge_support_thickness:"0.8",internal_solid_infill_line_width:"0.42",internal_solid_infill_pattern:"zig-zag",internal_solid_infill_speed:["250"],ironing_direction:"45",ironing_fan_speed:["-1"],ironing_flow:"10%",ironing_inset:"0.21",ironing_pattern:"zig-zag",ironing_spacing:"0.15",ironing_speed:"30",ironing_type:"no ironing",is_infill_first:"0",layer_change_gcode:`; layer num/total_layer_count: {layer_num+1}/[total_layer_count]
; update layer progress
M73 L{layer_num+1}
M991 S0 P{layer_num} ;notify layer change`,layer_height:"0.16",line_width:"0.42",locked_skeleton_infill_pattern:"zigzag",locked_skin_infill_pattern:"crosszag",long_retractions_when_cut:["0"],long_retractions_when_ec:["0"],machine_bed_mass_Y:"0",machine_end_gcode:`;===== date: 20260513 =====================
G392 S0 ;turn off nozzle clog detect

M400 ; wait for buffer to clear
G92 E0 ; zero the extruder
G90
G1 Z{max_layer_z + 0.4} F900 ; lower z a little
G1 X0 Y{first_layer_center_no_wipe_tower[1]} F18000 ; move to safe pos
G1 X-13.0 F3000 ; move to safe pos
{if !spiral_mode && print_sequence != "by object"}
M1002 judge_flag timelapse_record_flag
M622 J1
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M400 P100
M971 S11 C11 O0
M991 S0 P-1 ;end timelapse at safe pos
M623
{endif}

M140 S0 ; turn off bed
M106 S0 ; turn off fan
M106 P2 S0 ; turn off remote part cooling fan
M106 P3 S0 ; turn off chamber cooling fan

;G1 X27 F15000 ; wipe

; pull back filament to AMS
M620 S255
G1 X267 F15000
T255
G1 X-28.5 F18000
G1 X-48.2 F3000
G1 X-28.5 F18000
G1 X-48.2 F3000
M621 S255

M104 S0 ; turn off hotend

M400 ; wait all motion done
M17 S
M17 Z0.4 ; lower z motor current to reduce impact if there is something in the bottom
{if (max_layer_z + 100.0) < 256}
    G1 Z{max_layer_z + 100.0} F600
    G1 Z{max_layer_z +98.0}
{else}
    G1 Z256 F600
    G1 Z256
{endif}
M400 P100
M17 R ; restore z current

G90
G1 X-48 Y180 F3600

M220 S100  ; Reset feedrate magnitude
M201.2 K1.0 ; Reset acc magnitude
M73.2   R1.0 ;Reset left time magnitude
M1002 set_gcode_claim_speed_level : 0

;=====printer finish  sound=========
M17
M400 S1
M1006 S1
M1006 A0 B20 L100 C37 D20 M40 E42 F20 N60
M1006 A0 B10 L100 C44 D10 M60 E44 F10 N60
M1006 A0 B10 L100 C46 D10 M80 E46 F10 N80
M1006 A44 B20 L100 C39 D20 M60 E48 F20 N60
M1006 A0 B10 L100 C44 D10 M60 E44 F10 N60
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N60
M1006 A0 B10 L100 C39 D10 M60 E39 F10 N60
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N60
M1006 A0 B10 L100 C44 D10 M60 E44 F10 N60
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N60
M1006 A0 B10 L100 C39 D10 M60 E39 F10 N60
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N60
M1006 A0 B10 L100 C48 D10 M60 E44 F10 N80
M1006 A0 B10 L100 C0 D10 M60 E0 F10  N80
M1006 A44 B20 L100 C49 D20 M80 E41 F20 N80
M1006 A0 B20 L100 C0 D20 M60 E0 F20 N80
M1006 A0 B20 L100 C37 D20 M30 E37 F20 N60
M1006 W
;=====printer finish  sound=========

;M17 X0.8 Y0.8 Z0.5 ; lower motor current to 45% power
M400
M18 X Y Z

`,machine_hotend_change_time:"0",machine_load_filament_time:"25",machine_max_acceleration_e:["5000","5000"],machine_max_acceleration_extruding:["12000","12000"],machine_max_acceleration_retracting:["5000","5000"],machine_max_acceleration_travel:["6000","6000"],machine_max_acceleration_x:["6000","6000"],machine_max_acceleration_y:["6000","6000"],machine_max_acceleration_z:["1500","1500"],machine_max_force_Y:"0",machine_max_jerk_e:["3","3"],machine_max_jerk_x:["9","9"],machine_max_jerk_y:["9","9"],machine_max_jerk_z:["3","3"],machine_max_printed_mass:"0",machine_max_speed_e:["30","30"],machine_max_speed_x:["500","200"],machine_max_speed_y:["500","200"],machine_max_speed_z:["30","30"],machine_min_extruding_rate:["0","0"],machine_min_travel_rate:["0","0"],machine_pause_gcode:"M400 U1",machine_prepare_compensation_time:"260",machine_start_gcode:`;===== machine: A1 =========================
;===== date: 20260513 ==================
G392 S0
M9833.2
;M400
;M73 P1.717

;===== start to heat heatbead&hotend==========
M1002 gcode_claim_action : 2
M1002 set_filament_type:{filament_type[initial_no_support_extruder]}
M104 S140
M140 S[bed_temperature_initial_layer_single]

;=====start printer sound ===================
M17
M400 S1
M1006 S1
M1006 A0 B10 L100 C37 D10 M60 E37 F10 N60
M1006 A0 B10 L100 C41 D10 M60 E41 F10 N60
M1006 A0 B10 L100 C44 D10 M60 E44 F10 N60
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N60
M1006 A43 B10 L100 C46 D10 M70 E39 F10 N80
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N80
M1006 A0 B10 L100 C43 D10 M60 E39 F10 N80
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N80
M1006 A0 B10 L100 C41 D10 M80 E41 F10 N80
M1006 A0 B10 L100 C44 D10 M80 E44 F10 N80
M1006 A0 B10 L100 C49 D10 M80 E49 F10 N80
M1006 A0 B10 L100 C0 D10 M80 E0 F10 N80
M1006 A44 B10 L100 C48 D10 M60 E39 F10 N80
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N80
M1006 A0 B10 L100 C44 D10 M80 E39 F10 N80
M1006 A0 B10 L100 C0 D10 M60 E0 F10 N80
M1006 A43 B10 L100 C46 D10 M60 E39 F10 N80
M1006 W
M18 
;=====start printer sound ===================

;=====avoid end stop =================
G91
G380 S2 Z40 F1200
G380 S3 Z-15 F1200
G90

;===== reset machine status =================
;M290 X39 Y39 Z8
M204 S6000

M630 S0 P0
G91
M17 Z0.3 ; lower the z-motor current

G90
M17 X0.65 Y1.2 Z0.6 ; reset motor current to default
M960 S5 P1 ; turn on logo lamp
G90
M220 S100 ;Reset Feedrate
M221 S100 ;Reset Flowrate
M73.2   R1.0 ;Reset left time magnitude
;M211 X0 Y0 Z0 ; turn off soft endstop to prevent protential logic problem

;====== cog noise reduction=================
M982.2 S1 ; turn on cog noise reduction

M1002 gcode_claim_action : 13

G28 X
G91
G1 Z5 F1200
G90
G0 X128 F30000
G0 Y254 F3000
G91
G1 Z-5 F1200

M109 S25 H140

M17 E0.3
M83
G1 E10 F1200
G1 E-0.5 F30
M17 D

G28 Z P0 T140; home z with low precision,permit 300deg temperature
M104 S{nozzle_temperature_initial_layer[initial_extruder]}

M1002 judge_flag build_plate_detect_flag
M622 S1
  G39.4
  G90
  G1 Z5 F1200
M623

;M400
;M73 P1.717

;===== prepare print temperature and material ==========
M1002 gcode_claim_action : 24

M400
;G392 S1
M211 X0 Y0 Z0 ;turn off soft endstop
M975 S1 ; turn on

G90
G1 X-28.5 F30000
G1 X-48.2 F3000

M620 M ;enable remap
M620 S[initial_no_support_extruder]A   ; switch material if AMS exist
    M1002 gcode_claim_action : 4
    M400
    M1002 set_filament_type:UNKNOWN
    M109 S[nozzle_temperature_initial_layer]
{if (filament_type[initial_no_support_extruder] == "PLA") && (nozzle_diameter != 0.2)}
    M104 S220
{else}
    M104 S250
{endif}
    M400
    T[initial_no_support_extruder]
    G1 X-48.2 F3000
    M400

{if (filament_type[initial_no_support_extruder] == "PLA") && (nozzle_diameter != 0.2)}
    M620.1 E F{flush_volumetric_speeds[initial_no_support_extruder]/2.4053*60} T220
    M109 S220 ;set nozzle to common flush temp
{else}
    M620.1 E F{flush_volumetric_speeds[initial_no_support_extruder]/2.4053*60} T{flush_temperatures[initial_no_support_extruder]}
    M109 S250 ;set nozzle to common flush temp
{endif}
    M106 P1 S0
    G92 E0
    G1 E50 F200
    M400
    M1002 set_filament_type:{filament_type[initial_no_support_extruder]}
M621 S[initial_no_support_extruder]A

{if (filament_type[initial_no_support_extruder] == "PLA") && (nozzle_diameter != 0.2)}
    M109 S220 H300
{else}
    M109 S{flush_temperatures[initial_no_support_extruder]} H300
{endif}
G92 E0
G1 E50 F200 ; lower extrusion speed to avoid clog
M400
M106 P1 S178
G92 E0
G1 E5 F200
M104 S{nozzle_temperature_initial_layer[initial_no_support_extruder]}
G92 E0
G1 E-0.5 F300

G1 X-28.5 F30000
G1 X-48.2 F3000
G1 X-28.5 F30000 ;wipe and shake
G1 X-48.2 F3000
G1 X-28.5 F30000 ;wipe and shake
G1 X-48.2 F3000

;G392 S0

M400
M106 P1 S0
;===== prepare print temperature and material end =====

;M400
;M73 P1.717

;===== auto extrude cali start =========================
M975 S1
;G392 S1

G90
M83
T1000
G1 X-48.2 Y0 Z10 F10000
M400
M1002 set_filament_type:UNKNOWN

M412 S1 ;  ===turn on  filament runout detection===
M400 P10
M620.3 W1; === turn on filament tangle detection===
M400 S2

M1002 set_filament_type:{filament_type[initial_no_support_extruder]}

;M1002 set_flag extrude_cali_flag=1
M1002 judge_flag extrude_cali_flag

M622 J1
    M1002 gcode_claim_action : 8

    M109 S{nozzle_temperature[initial_extruder]}
    G1 E10 F{outer_wall_volumetric_speed/2.4*60}
    M983 F{outer_wall_volumetric_speed/2.4} A0.3 H[nozzle_diameter]; cali dynamic extrusion compensation

    M106 P1 S255
    M400 S5
    G1 X-28.5 F18000
    G1 X-48.2 F3000
    G1 X-28.5 F18000 ;wipe and shake
    G1 X-48.2 F3000
    G1 X-28.5 F12000 ;wipe and shake
    G1 X-48.2 F3000
    M400
    M106 P1 S0

    M1002 judge_last_extrude_cali_success
    M622 J0
        M983 F{outer_wall_volumetric_speed/2.4} A0.3 H[nozzle_diameter]; cali dynamic extrusion compensation
        M106 P1 S255
        M400 S5
        G1 X-28.5 F18000
        G1 X-48.2 F3000
        G1 X-28.5 F18000 ;wipe and shake
        G1 X-48.2 F3000
        G1 X-28.5 F12000 ;wipe and shake
        M400
        M106 P1 S0
    M623
    
    G1 X-48.2 F3000
    M400
    M984 A0.1 E1 S1 F{outer_wall_volumetric_speed/2.4} H[nozzle_diameter]
    M106 P1 S178
    M400 S7
    G1 X-28.5 F18000
    G1 X-48.2 F3000
    G1 X-28.5 F18000 ;wipe and shake
    G1 X-48.2 F3000
    G1 X-28.5 F12000 ;wipe and shake
    G1 X-48.2 F3000
    M400
    M106 P1 S0
M623 ; end of "draw extrinsic para cali paint"

;G392 S0
;===== auto extrude cali end ========================

;M400
;M73 P1.717

M104 S170 ; prepare to wipe nozzle
M106 S255 ; turn on fan

;===== mech mode fast check start =====================
M1002 gcode_claim_action : 3

G1 X128 Y128 F20000
G1 Z5 F1200
M400 P200
M970.3 Q1 A5 K0 O3
M974 Q1 S2 P0

M970.2 Q1 K1 W58 Z0.1
M974 S2

G1 X128 Y128 F20000
G1 Z5 F1200
M400 P200
M970.3 Q0 A10 K0 O1
M974 Q0 S2 P0

M970.2 Q0 K1 W78 Z0.1
M974 S2

M975 S1
G1 F30000
G1 X0 Y5
G28 X ; re-home XY

G1 Z4 F1200

;===== mech mode fast check end =======================

;M400
;M73 P1.717

;===== wipe nozzle ===============================
M1002 gcode_claim_action : 14

M975 S1
M106 S255 ; turn on fan (G28 has turn off fan)
M211 S; push soft endstop status
M211 X0 Y0 Z0 ;turn off Z axis endstop

;===== remove waste by touching start =====

M104 S170 ; set temp down to heatbed acceptable

M83
G1 E-1 F500
G90
M83

M109 S170
G0 X108 Y-0.5 F30000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X110 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X112 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X114 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X116 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X118 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X120 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X122 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X124 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X126 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X128 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X130 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X132 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X134 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X136 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X138 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X140 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X142 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X144 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X146 F10000
G380 S3 Z-5 F1200
G1 Z2 F1200
G1 X148 F10000
G380 S3 Z-5 F1200

G1 Z5 F30000
;===== remove waste by touching end =====

G1 Z10 F1200
G0 X118 Y261 F30000
G1 Z5 F1200
M109 S{nozzle_temperature_initial_layer[initial_extruder]-50}

G28 Z P0 T300; home z with low precision,permit 300deg temperature
G29.2 S0 ; turn off ABL
M104 S140 ; prepare to abl
G0 Z5 F20000

G0 X128 Y261 F20000  ; move to exposed steel surface
G0 Z-1.01 F1200      ; stop the nozzle

G91
G2 I1 J0 X2 Y0 F2000.1
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5

G90
G1 Z10 F1200

;===== brush material wipe nozzle =====

G90
G1 Y250 F30000
G1 X55
G1 Z1.300 F1200
G1 Y262.5 F6000
G91
G1 X-35 F30000
G1 Y-0.5
G1 X45
G1 Y-0.5
G1 X-45
G1 Y-0.5
G1 X45
G1 Y-0.5
G1 X-45
G1 Y-0.5
G1 X45
G1 Z5.000 F1200

G90
G1 X30 Y250.000 F30000
G1 Z1.300 F1200
G1 Y262.5 F6000
G91
G1 X35 F30000
G1 Y-0.5
G1 X-45
G1 Y-0.5
G1 X45
G1 Y-0.5
G1 X-45
G1 Y-0.5
G1 X45
G1 Y-0.5
G1 X-45
G1 Z10.000 F1200

;===== brush material wipe nozzle end =====

G90
;G0 X128 Y261 F20000  ; move to exposed steel surface
G1 Y250 F30000
G1 X138
G1 Y261
G0 Z-1.01 F1200      ; stop the nozzle

G91
G2 I1 J0 X2 Y0 F2000.1
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5
G2 I1 J0 X2
G2 I-0.75 J0 X-1.5

M109 S140
M106 S255 ; turn on fan (G28 has turn off fan)

M211 R; pop softend status

;===== wipe nozzle end ================================

;M400
;M73 P1.717

;===== bed leveling ==================================
M1002 judge_flag g29_before_print_flag

G90
G1 Z5 F1200
G1 X0 Y0 F30000
G29.2 S1 ; turn on ABL

M190 S[bed_temperature_initial_layer_single]; ensure bed temp
M109 S140
M106 S0 ; turn off fan , too noisy

M622 J1
    M1002 gcode_claim_action : 1
    G29 A1 X{first_layer_print_min[0]} Y{first_layer_print_min[1]} I{first_layer_print_size[0]} J{first_layer_print_size[1]}
    M400
    M500 ; save cali data
M623
;===== bed leveling end ================================

;===== home after wipe mouth============================
M1002 judge_flag g29_before_print_flag
M622 J0

    M1002 gcode_claim_action : 13
    G28

M623

;===== home after wipe mouth end =======================

;M400
;M73 P1.717

G1 X108.000 Y-0.500 F30000
G1 Z0.300 F1200
M400
G2814 Z0.32

M104 S{nozzle_temperature_initial_layer[initial_extruder]} ; prepare to print

;===== nozzle load line ===============================
;G90
;M83
;G1 Z5 F1200
;G1 X88 Y-0.5 F20000
;G1 Z0.3 F1200

;M109 S{nozzle_temperature_initial_layer[initial_extruder]}

;G1 E2 F300
;G1 X168 E4.989 F6000
;G1 Z1 F1200
;===== nozzle load line end ===========================

;===== extrude cali test ===============================

M400
    M900 S
    M900 C
    G90
    M83

    M109 S{nozzle_temperature_initial_layer[initial_extruder]}
    G0 X128 E8  F{outer_wall_volumetric_speed/(24/20)    * 60}
    G0 X133 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)/4     * 60}
    G0 X138 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)     * 60}
    G0 X143 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)/4     * 60}
    G0 X148 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)     * 60}
    G0 X153 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)/4     * 60}
    G91
    G1 X1 Z-0.300
    G1 X4
    G1 Z1 F1200
    G90
    M400

M900 R

M1002 judge_flag extrude_cali_flag
M622 J1
    G90
    G1 X108.000 Y1.000 F30000
    G91
    G1 Z-0.700 F1200
    G90
    M83
    G0 X128 E10  F{outer_wall_volumetric_speed/(24/20)    * 60}
    G0 X133 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)/4     * 60}
    G0 X138 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)     * 60}
    G0 X143 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)/4     * 60}
    G0 X148 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)     * 60}
    G0 X153 E.3742  F{outer_wall_volumetric_speed/(0.3*0.5)/4     * 60}
    G91
    G1 X1 Z-0.300
    G1 X4
    G1 Z1 F1200
    G90
    M400
M623

G1 Z0.2

;M400
;M73 P1.717

;========turn off light and wait extrude temperature =============
M1002 gcode_claim_action : 0
M400

;===== for Textured PEI Plate , lower the nozzle as the nozzle was touching topmost of the texture when homing ==
;curr_bed_type={curr_bed_type}
{if curr_bed_type=="Textured PEI Plate"}
G29.1 Z{-0.02} ; for Textured PEI Plate
{endif}

M960 S1 P0 ; turn off laser
M960 S2 P0 ; turn off laser
M106 S0 ; turn off fan
M106 P2 S0 ; turn off big fan
M106 P3 S0 ; turn off chamber fan

M975 S1 ; turn on mech mode supression
G90
M83
T1000

M211 X0 Y0 Z0 ;turn off soft endstop
;G392 S1 ; turn on clog detection
M1007 S1 ; turn on mass estimation
G29.4
`,machine_switch_extruder_time:"0",machine_unload_filament_time:"29",master_extruder_id:"1",max_bridge_length:"0",max_layer_height:["0.28"],max_travel_detour_distance:"0",min_bead_width:"85%",min_feature_size:"25%",min_layer_height:["0.08"],minimum_sparse_infill_area:"15",mmu_segmented_region_interlocking_depth:"0",mmu_segmented_region_max_width:"0",monotonic_travel_into_wall:"0%",name:"project_settings",no_slow_down_for_cooling_on_outwalls:["0"],nozzle_diameter:["0.4"],nozzle_flush_dataset:["0"],nozzle_height:"4.76",nozzle_temperature:["220"],nozzle_temperature_initial_layer:["220"],nozzle_temperature_range_high:["240"],nozzle_temperature_range_low:["190"],nozzle_type:["stainless_steel"],nozzle_volume:["92"],nozzle_volume_type:["Standard"],only_one_wall_first_layer:"0",ooze_prevention:"0",other_layers_print_sequence:["0"],other_layers_print_sequence_nums:"0",outer_wall_acceleration:["5000"],outer_wall_jerk:"9",outer_wall_line_width:"0.42",outer_wall_speed:["30"],overhang_1_4_speed:["0"],overhang_2_4_speed:["50"],overhang_3_4_speed:["30"],overhang_4_4_speed:["10"],overhang_fan_speed:["100"],overhang_fan_threshold:["50%"],overhang_threshold_participating_cooling:["95%"],overhang_totally_speed:["10"],override_filament_scarf_seam_setting:"0",override_process_overhang_speed:["0"],physical_extruder_map:["0"],post_process:[],pre_start_fan_time:["2"],precise_outer_wall:"0",precise_z_height:"0",pressure_advance:["0.02"],prime_tower_brim_width:"3",prime_tower_enable_framework:"0",prime_tower_extra_rib_length:"0",prime_tower_fillet_wall:"1",prime_tower_flat_ironing:"0",prime_tower_infill_gap:"150%",prime_tower_lift_height:"-1",prime_tower_lift_speed:"90",prime_tower_max_speed:"90",prime_tower_rib_wall:"1",prime_tower_rib_width:"8",prime_tower_skip_points:"1",prime_tower_width:"35",prime_volume_mode:"Default",print_compatible_printers:["Bambu Lab A1 0.4 nozzle"],print_extruder_id:["1"],print_extruder_variant:["Direct Drive Standard"],print_flow_ratio:"1",print_in_clockwise:"0",print_sequence:"by layer",print_settings_id:"0.20mm Standard @BBL A1",printable_area:["0x0","256x0","256x256","0x256"],printable_height:"256",printer_extruder_id:["1"],printer_extruder_variant:["Direct Drive Standard"],printer_model:"Bambu Lab A1",printer_notes:"",printer_settings_id:"Bambu Lab A1 0.4 nozzle",printer_structure:"i3",printer_technology:"FFF",printer_variant:"0.4",printing_by_object_gcode:"",process_notes:"",raft_contact_distance:"0.1",raft_expansion:"1.5",raft_first_layer_density:"90%",raft_first_layer_expansion:"-1",raft_layers:"0",reduce_crossing_wall:"0",reduce_fan_stop_start_freq:["1"],reduce_infill_retraction_mode:"Auto",required_nozzle_HRC:["3"],resolution:"0.012",retract_before_wipe:["0%"],retract_length_toolchange:["2"],retract_lift_above:["0"],retract_lift_below:["255"],retract_restart_extra:["0"],retract_restart_extra_toolchange:["0"],retract_when_changing_layer:["1"],retraction_distances_when_cut:["18"],retraction_distances_when_ec:["0"],retraction_length:["0.8"],retraction_minimum_travel:["1"],retraction_speed:["30"],role_base_wipe_speed:"1",scan_first_layer:"0",scarf_angle_threshold:"155",seam_gap:"15%",seam_placement_away_from_overhangs:"0",seam_position:"aligned",seam_slope_conditional:"1",seam_slope_entire_loop:"0",seam_slope_gap:"0",seam_slope_inner_walls:"1",seam_slope_min_length:"10",seam_slope_start_height:"10%",seam_slope_steps:"10",seam_slope_type:"none",silent_mode:"0",single_extruder_multi_material:"1",skeleton_infill_density:"15%",skeleton_infill_line_width:"0.45",skin_infill_density:"15%",skin_infill_depth:"2",skin_infill_line_width:"0.45",skirt_distance:"2",skirt_height:"1",skirt_loops:"0",skirt_per_object:"1",slice_closing_radius:"0.049",slicing_mode:"regular",slow_down_for_layer_cooling:["1"],slow_down_layer_time:["6"],slow_down_min_speed:["20"],slowdown_end_acc:["100000"],slowdown_end_height:["400"],slowdown_end_speed:["1000"],slowdown_start_acc:["100000"],slowdown_start_height:["0"],slowdown_start_speed:["1000"],small_perimeter_speed:["50%"],small_perimeter_threshold:["0"],smooth_coefficient:"80",smooth_speed_discontinuity_area:"1",solid_infill_filament:"0",sparse_infill_acceleration:["100%"],sparse_infill_anchor:"400%",sparse_infill_anchor_max:"20",sparse_infill_density:"0%",sparse_infill_filament:"0",sparse_infill_lattice_angle_1:"-45",sparse_infill_lattice_angle_2:"45",sparse_infill_line_width:"0.45",sparse_infill_pattern:"grid",sparse_infill_speed:["270"],spiral_mode:"0",spiral_mode_max_xy_smoothing:"200%",spiral_mode_smooth:"0",standby_temperature_delta:"-5",start_end_points:["30x-3","54x245"],supertack_plate_temp:["45"],supertack_plate_temp_initial_layer:["45"],support_air_filtration:"0",support_angle:"0",support_base_pattern:"default",support_base_pattern_spacing:"2.5",support_bottom_interface_spacing:"0.5",support_bottom_z_distance:"0.2",support_chamber_temp_control:"0",support_cooling_filter:"0",support_critical_regions_only:"0",support_expansion:"0",support_fast_purge_mode:"0",support_filament:"0",support_interface_bottom_layers:"2",support_interface_filament:"0",support_interface_loop_pattern:"0",support_interface_not_for_body:"1",support_interface_pattern:"auto",support_interface_spacing:"0.5",support_interface_speed:["80"],support_interface_top_layers:"2",support_ironing_direction:"0",support_ironing_flow:"10%",support_ironing_inset:"0",support_ironing_pattern:"zig-zag",support_ironing_spacing:"0.15",support_ironing_speed:"30",support_line_width:"0.42",support_object_first_layer_gap:"0.2",support_object_skip_flush:"0",support_object_xy_distance:"0.35",support_on_build_plate_only:"0",support_remove_small_overhang:"1",support_speed:["150"],support_style:"default",support_threshold_angle:"30",support_top_z_distance:"0.2",support_type:"tree(auto)",symmetric_infill_y_axis:"0",temperature_vitrification:["45"],template_custom_gcode:"",textured_plate_temp:["65"],textured_plate_temp_initial_layer:["65"],thick_bridges:"0",thumbnail_size:["50x50"],time_lapse_gcode:`;===================== date: 20250206 =====================
{if !spiral_mode && print_sequence != "by object"}
; don't support timelapse gcode in spiral_mode and by object sequence for I3 structure printer
; SKIPPABLE_START
; SKIPTYPE: timelapse
M622.1 S1 ; for prev firmware, default turned on
M1002 judge_flag timelapse_record_flag
M622 J1
G92 E0
G1 Z{max_layer_z + 0.4}
G1 X0 Y{first_layer_center_no_wipe_tower[1]} F18000 ; move to safe pos
G1 X-48.2 F3000 ; move to safe pos
M400
M1004 S5 P1  ; external shutter
M400 P300
M971 S11 C11 O0
G92 E0
G1 X0 F18000
M623

; SKIPTYPE: head_wrap_detect
M622.1 S1
M1002 judge_flag g39_3rd_layer_detect_flag
M622 J1
    ; enable nozzle clog detect at 3rd layer
    {if layer_num == 2}
      M400
      G90
      M83
      M204 S5000
      G0 Z2 F4000
      G0 X261 Y250 F20000
      M400 P200
      G39 S1
      G0 Z2 F4000
    {endif}


    M622.1 S1
    M1002 judge_flag g39_detection_flag
    M622 J1
      {if !in_head_wrap_detect_zone}
        M622.1 S0
        M1002 judge_flag g39_mass_exceed_flag
        M622 J1
        {if layer_num > 2}
            G392 S0
            M400
            G90
            M83
            M204 S5000
            G0 Z{max_layer_z + 0.4} F4000
            G39.3 S1
            G0 Z{max_layer_z + 0.4} F4000
            G392 S0
          {endif}
        M623
    {endif}
    M623
M623
; SKIPPABLE_END
{endif}
`,timelapse_type:"0",top_area_threshold:"200%",top_color_penetration_layers:"5",top_one_wall_type:"all top",top_shell_layers:"6",top_shell_thickness:"1",top_solid_infill_flow_ratio:["1"],top_surface_acceleration:["2000"],top_surface_density:"100%",top_surface_jerk:"9",top_surface_line_width:"0.42",top_surface_pattern:"monotonicline",top_surface_speed:["200"],top_z_overrides_xy_distance:"0",travel_acceleration:["10000"],travel_jerk:"9",travel_short_distance_acceleration:["250"],travel_speed:["700"],travel_speed_z:["0"],tree_support_branch_angle:"45",tree_support_branch_diameter:"2",tree_support_branch_diameter_angle:"5",tree_support_branch_distance:"5",tree_support_wall_count:"-1",upward_compatible_machine:["Bambu Lab H2D 0.4 nozzle","Bambu Lab H2D Pro 0.4 nozzle","Bambu Lab H2S 0.4 nozzle","Bambu Lab P2S 0.4 nozzle","Bambu Lab H2C 0.4 nozzle","Bambu Lab X2D 0.4 nozzle","Bambu Lab A2L 0.4 nozzle"],use_firmware_retraction:"0",use_relative_e_distances:"1",version:"02.08.02.61",vertical_shell_speed:["80%"],volumetric_speed_coefficients:["0 0 0 0 0 0"],wall_distribution_count:"1",wall_filament:"0",wall_generator:"arachne",wall_loops:"2",wall_sequence:"inner wall/outer wall",wall_transition_angle:"10",wall_transition_filter_deviation:"25%",wall_transition_length:"100%",wipe:["1"],wipe_distance:["2"],wipe_speed:"80%",wipe_tower_no_sparse_layers:"0",wipe_tower_rotation_angle:"0",wipe_tower_x:["15"],wipe_tower_y:["220"],wrapping_detection_gcode:"",wrapping_detection_layers:"20",wrapping_exclude_area:[],xy_contour_compensation:"0",xy_hole_compensation:"0",z_direction_outwall_speed_continuous:"0",z_hop:["0.4"],z_hop_types:["Auto Lift"]};var Mt=["activate_air_filtration","additional_cooling_fan_speed","additional_fan_full_speed_layer","chamber_temperatures","circle_compensation_speed","close_additional_fan_first_x_layers","close_fan_the_first_x_layers","complete_print_exhaust_fan_speed","cool_plate_temp","cool_plate_temp_initial_layer","cooling_perimeter_transition_distance","cooling_slowdown_logic","counter_coef_1","counter_coef_2","counter_coef_3","counter_limit_max","counter_limit_min","diameter_limit","during_print_exhaust_fan_speed","eng_plate_temp","eng_plate_temp_initial_layer","fan_cooling_layer_time","fan_max_speed","fan_min_speed","filament_adaptive_volumetric_speed","filament_adhesiveness_category","filament_bridge_speed","filament_change_length","filament_colour","filament_cooling_before_tower","filament_cost","filament_density","filament_deretraction_speed","filament_dev_ams_drying_ams_limitations","filament_dev_ams_drying_heat_distortion_temperature","filament_dev_ams_drying_temperature","filament_dev_ams_drying_time","filament_dev_chamber_drying_bed_temperature","filament_dev_chamber_drying_time","filament_dev_drying_cooling_temperature","filament_dev_drying_softening_temperature","filament_diameter","filament_enable_overhang_speed","filament_end_gcode","filament_extruder_compatibility","filament_extruder_variant","filament_flow_ratio","filament_flush_temp","filament_flush_temp_fast","filament_flush_volumetric_speed","filament_ids","filament_is_support","filament_long_retractions_when_cut","filament_long_retractions_when_ec","filament_max_volumetric_speed","filament_metal_stickiness","filament_minimal_purge_on_wipe_tower","filament_overhang_1_4_speed","filament_overhang_2_4_speed","filament_overhang_3_4_speed","filament_overhang_4_4_speed","filament_overhang_totally_speed","filament_pre_cooling_temperature","filament_pre_cooling_temperature_nc","filament_preheat_temperature_delta","filament_prime_volume","filament_prime_volume_nc","filament_printable","filament_ramming_travel_time","filament_ramming_travel_time_nc","filament_ramming_volumetric_speed","filament_ramming_volumetric_speed_nc","filament_retract_before_wipe","filament_retract_length_nc","filament_retract_restart_extra","filament_retract_when_changing_layer","filament_retraction_distances_when_cut","filament_retraction_distances_when_ec","filament_retraction_length","filament_retraction_minimum_travel","filament_retraction_speed","filament_scarf_gap","filament_scarf_height","filament_scarf_length","filament_scarf_seam_type","filament_settings_id","filament_shrink","filament_soluble","filament_start_gcode","filament_tower_interface_pre_extrusion_dist","filament_tower_interface_pre_extrusion_length","filament_tower_interface_print_temp","filament_tower_interface_purge_volume","filament_tower_ironing_area","filament_type","filament_velocity_adaptation_factor","filament_vendor","filament_wipe","filament_wipe_distance","filament_z_hop","filament_z_hop_types","full_fan_speed_layer","hole_coef_1","hole_coef_2","hole_coef_3","hole_limit_max","hole_limit_min","hot_plate_temp","hot_plate_temp_initial_layer","impact_strength_z","long_retractions_when_ec","no_slow_down_for_cooling_on_outwalls","nozzle_temperature","nozzle_temperature_initial_layer","nozzle_temperature_range_high","nozzle_temperature_range_low","overhang_fan_speed","overhang_fan_threshold","override_process_overhang_speed","pre_start_fan_time","reduce_fan_stop_start_freq","required_nozzle_HRC","retraction_distances_when_ec","slow_down_for_layer_cooling","slow_down_layer_time","slow_down_min_speed","supertack_plate_temp","supertack_plate_temp_initial_layer","temperature_vitrification","textured_plate_temp","textured_plate_temp_initial_layer","volumetric_speed_coefficients"];var yn=Math.PI*2,Mn=(e,t,n)=>Math.max(t,Math.min(n,e)),Ee=(e,t,n,r)=>Number.isFinite(Number(e))?Mn(Number(e),n,r):t,ze=(e,t,n,r)=>Math.round(Ee(e,t,n,r)),xn=["#285744","#eee6cd","#d6a5ca","#dfbb51"];function xt(e={}){let t=ze(e.cols,48,8,192),n=ze(e.rows,24,2,128),r=Array.from({length:t*n},(u,v)=>{let s=e.pixels?.[v];return Number.isInteger(s)&&s>=-1&&s<4?s:Math.abs((v%t/t*4%1-.5)*2)+Math.abs((Math.floor(v/t)/n*3%1-.5)*2)<.65?0:1}),o=xn.map((u,v)=>/^#[0-9a-f]{6}$/i.test(e.palette?.[v])?e.palette[v].toLowerCase():u);return{enabled:e.enabled===!0,cols:t,rows:n,pixels:r,palette:o,depth:Ee(e.depth,.09,0,.6),transition:Ee(e.transition,.35,.1,.5),rotation:Ee(e.rotation,0,-360,360),repeat:ze(e.repeat,1,1,8),mirror:e.mirror===!0,layersPerRow:ze(e.layersPerRow,6,2,100),sequence:(typeof e.sequence=="string"?e.sequence.toUpperCase().replace(/[^ABCD]/g,"").slice(0,32):"AB")||"AB"}}function wn(e,t){return[...new Set(e.pixels.slice(t*e.cols,(t+1)*e.cols).filter(n=>n>=0))].sort()}function bn(e,t,n){return Math.floor((e-t)/n.layersPerRow)}function Gn(e,t){let n=(e/yn-t.rotation/360)*t.repeat;return((t.mirror?-n:n)%1+1)%1}function wt(e,t,n,r,o){let u=bn(t,r,o);if(!o.enabled||u<0||u>=o.rows)return 0;let v=Gn(e,o)*o.cols,s=Math.min(o.cols-1,Math.floor(v)),m=v-s,d=y=>{let x=o.pixels[u*o.cols+(y%o.cols+o.cols)%o.cols];return x<0?0:x===n?o.depth:-o.depth},p=y=>y*y*(3-2*y),g=o.transition;if(m<g){let y=.5+.5*p(m/g);return d(s-1)*(1-y)+d(s)*y}if(m>1-g){let y=.5*p((m-1+g)/g);return d(s)*(1-y)+d(s+1)*y}return d(s)}function bt(e,t,n,r){let o=Math.min(r,n+t.rows*t.layersPerRow-1),u=new Map;for(let m of e.runs)m.layer<n||m.layer>o||(u.has(m.layer)||u.set(m.layer,new Set),u.get(m.layer).add(m.tool));let v=[],s=[];for(let m=0;m<t.rows;m++){let d=n+m*t.layersPerRow,p=d+t.layersPerRow-1;if(d>r)break;let g={},y=wn(t,m),x=[];for(let b=d;b<=Math.min(p,r);b++){let M=u.get(b);if(!M){x.push(b);continue}M.size!==1&&s.push(`\u7B2C ${b} \u5C42\u5899\u4F53\u4F7F\u7528\u591A\u4E2A\u8272\u69FD\uFF1B\u9010\u5C42\u7F16\u7EC7\u8981\u6C42\u6BCF\u5C42\u5899\u4F53\u53EA\u6709\u4E00\u79CD\u989C\u8272\u3002`);for(let c of M)g[c]=(g[c]||0)+1}let G=y.filter(b=>!g[b]);G.length&&s.push(`\u56FE\u6848\u7B2C ${m+1} \u884C\uFF08${d}\u2013${Math.min(p,r)} \u5C42\uFF09\u7F3A\u5C11 ${G.map(b=>"T"+b).join("\u3001")}\u3002\u8BF7\u5728\u62D3\u7AF9\u5207\u7247\u65F6\u52A0\u5165\u8FD9\u4E9B\u9010\u5C42\u989C\u8272\uFF0C\u6216\u589E\u52A0\u6BCF\u56FE\u6848\u884C\u5C42\u6570\u3002`),x.length&&s.push(`\u56FE\u6848\u7B2C ${m+1} \u884C\u7F3A\u5C11\u5899\u4F53\u8DEF\u5F84\uFF1A\u7B2C ${x.slice(0,4).join("\u3001")} \u5C42\u3002`),v.push({row:m+1,startLayer:d,endLayer:Math.min(p,r),requestedEndLayer:p,tools:y,counts:g,complete:p<=r,minRepeats:y.length?Math.min(...y.map(b=>g[b]||0)):0})}if(s.length)throw Error(s.slice(0,3).join(" "));return{coordinateSystem:"fixed-object-angle / fixed-print-layer-bands",startLayer:n,endLayer:o,cols:t.cols,rows:t.rows,visibleRows:v.length,clippedRows:t.rows-v.length,layerSpan:t.layersPerRow,rotation:t.rotation,repeat:t.repeat,depth:t.depth,bands:v,physicalPrintTested:!1}}var Fn={stitches:64,amplitude:.12,phase:.5,flow:1,maxSpeed:30,maxFlow:8,lineWidth:.45,filament:1.75,startLayer:8,endLayer:0,bedSize:256},Q=Math.PI*2,Ue=(e,t,n)=>Math.max(t,Math.min(n,e));function Ye(e={}){let t={...Fn};for(let[n,[r,o]]of Object.entries({stitches:[8,192],amplitude:[0,1.5],phase:[0,1],flow:[.6,1.4],maxSpeed:[5,100],maxFlow:[1,30],lineWidth:[.2,1.2],filament:[1.5,3],startLayer:[1,1e4],endLayer:[0,1e4],bedSize:[120,400]})){let u=Number(e[n]);Number.isFinite(u)&&(t[n]=Ue(u,r,o))}for(let n of["stitches","startLayer","endLayer"])t[n]=Math.round(t[n]);return t.pattern=xt(e.pattern),t.localPrinter=typeof e.localPrinter=="string"?e.localPrinter.slice(0,100):"Bambu Lab A1 0.4 nozzle",t.localMaterial=typeof e.localMaterial=="string"?e.localMaterial.slice(0,100):"Bambu PLA Basic",t.autoColors=e.autoColors!==!1,t}function Sn(e,t){return(e-1)%2*t.phase}function zt(e,t,n=0){return t.pattern?.enabled?n%2*t.phase:Sn(e,t)}function zn(e,t,n,r=0){return n.amplitude*Math.cos(n.stitches*e-Q*zt(t,n,r))+(n.pattern?.enabled?wt(e,t,r,n.startLayer,n.pattern):0)}function En(e){let t=e.split(";",1)[0].replace(/\([^)]*\)/g,"").trim();if(!t)return null;let n=/^([GMT]\d+(?:\.\d+)?)\b/i.exec(t);if(!n)return{cmd:"?",v:{},code:t};let r={};for(let o of t.slice(n[0].length).matchAll(/([A-Z])\s*([-+]?(?:\d*\.\d+|\d+\.?\d*))/gi))r[o[1].toUpperCase()]=Number(o[2]);return{cmd:n[1].toUpperCase().replace(/^G0([0-9])$/,"G$1"),v:r,code:t}}var Me=(e,t)=>Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z),An=(e,t)=>Math.atan2(Math.sin(t-e),Math.cos(t-e));function Gt(e,t,n){if(!["G2","G3"].includes(n.cmd))return null;let{v:r}=n;if(!("I"in r||"J"in r)||"R"in r)throw Error("\u5706\u5F27\u9700\u8981 G17 \u5E73\u9762\u3001\u76F8\u5BF9 I/J \u5706\u5FC3\u683C\u5F0F\uFF1B\u8BF7\u5173\u95ED\u5706\u5F27\u62DF\u5408\u540E\u91CD\u65B0\u5BFC\u51FA\u3002");let o=e.x+(r.I||0),u=e.y+(r.J||0),v=Math.hypot(e.x-o,e.y-u),s=Math.hypot(t.x-o,t.y-u);if(v<.01||Math.abs(v-s)>.08)throw Error("\u5706\u5F27\u534A\u5F84\u4E0D\u4E00\u81F4\uFF0C\u65E0\u6CD5\u53EF\u9760\u6539\u5199\u3002");let m=Math.atan2(e.y-u,e.x-o),d=Math.atan2(t.y-u,t.x-o)-m;if(n.cmd==="G2")for(;d>=-1e-8;)d-=Q;else for(;d<=1e-8;)d+=Q;return{cx:o,cy:u,r:v,t0:m,sweep:d,length:Math.hypot(v*d,t.z-e.z)}}function Je(e){if(typeof e!="string"||!e.trim())throw Error("\u8BF7\u9009\u62E9\u5DF2\u5207\u7247\u7684\u6587\u672C G-code\u3002");if(e.length>80*1024*1024)throw Error("\u6587\u4EF6\u8D85\u8FC7 80 MB\uFF0C\u8BF7\u5148\u5BFC\u51FA\u4E00\u4E2A\u5C0F\u6837\u3002");if(e.includes("; KNITFORM_PATH_ENGINE:"))throw Error("\u8BE5\u6587\u4EF6\u5DF2\u7ECF\u8FC7\u8DEF\u5F84\u6539\u5199\u3002\u8BF7\u5BFC\u5165\u539F\u59CB\u5207\u7247\u7ED3\u679C\uFF0C\u907F\u514D\u91CD\u590D\u53E0\u52A0\u3002");let t=e.replace(/^\uFEFF/,"").split(/\r?\n/),n=[],r=[],o=new Map,u=new Set,v=[],s={x:NaN,y:NaN,z:NaN,e:0,f:1800,relative:!1,eRelative:!1,tool:0},m=0,d="",p=null,g="G17",y=!1,x=0,G=0,b=0,M=!0,c=()=>{p?.moves.length&&r.push(p),p=null};for(let a=0;a<t.length;a++){let l=t[a],_;if(/CONFIG_BLOCK_START/.test(l)&&(M=!1),/CONFIG_BLOCK_END/.test(l)){M=!0;continue}if(!M)continue;if((_=/^;\s*layer num\/total_layer_count:\s*(\d+)\/(\d+)/i.exec(l))&&(c(),m=+_[1],o.set(m,{number:m,z:x,height:G})),(_=/^;\s*LAYER:\s*(-?\d+)/i.exec(l))&&!e.includes("layer num/total_layer_count:")&&(c(),m=+_[1]+1,o.set(m,{number:m,z:0,height:0}),d=""),(_=/^;\s*Z_HEIGHT:\s*([\d.]+)/i.exec(l))&&(x=+_[1]),(_=/^;\s*LAYER_HEIGHT:\s*([\d.]+)/i.exec(l))&&(G=+_[1]),(_=/^;\s*(?:LINE_WIDTH|WIDTH):\s*([\d.]+)/i.exec(l))&&(b=+_[1]),/MACHINE_END_GCODE_START/.test(l)&&(c(),m=0,d="Custom"),(_=/^;\s*(?:FEATURE|TYPE):\s*(.*)/i.exec(l))&&(d!==_[1].trim()&&c(),d=_[1].trim()),(_=/^;\s*OBJECT_ID:\s*(-?\d+)/i.exec(l))&&+_[1]>=0&&u.add(+_[1]),/^\s*N\d+\s|\*\d+\s*$/.test(l))throw Error("\u4E0D\u652F\u6301\u5E26\u884C\u53F7\u6821\u9A8C\u548C\u7684\u4E32\u53E3 G-code\uFF0C\u8BF7\u5BFC\u51FA\u666E\u901A\u6587\u4EF6\u3002");let F=En(l);if(!F)continue;let{cmd:h,v:w}=F;if(h==="G20")throw Error("\u4EC5\u652F\u6301\u6BEB\u7C73\u5355\u4F4D G-code\u3002");if(h==="G90"||h==="G91"){c(),s.relative=h==="G91",s.eRelative=s.relative;continue}if(h==="M82"||h==="M83"){c(),s.eRelative=h==="M83";continue}if(["G17","G18","G19"].includes(h)){c(),g=h;continue}if(h==="G90.1"||h==="G91.1"){c(),y=h==="G90.1";continue}if(h==="G92"){c();for(let I of["X","Y","Z","E"])I in w&&(s[I.toLowerCase()]=w[I]);continue}if(/^T\d+$/.test(h)){c(),+h.slice(1)<255&&(s.tool=+h.slice(1));continue}if(!["G0","G1","G2","G3"].includes(h)){["M204","M205","M73","M991","M106"].includes(h)||c(),h==="G28"&&(s.x=NaN,s.y=NaN,s.z=NaN);continue}let S={...s};for(let I of["X","Y","Z"])I in w&&(s[I.toLowerCase()]=s.relative?s[I.toLowerCase()]+w[I]:w[I]);let A="E"in w?s.eRelative?w.E:w.E-s.e:0;"E"in w&&(s.e=s.eRelative?s.e+w.E:w.E),"F"in w&&(s.f=w.F);let E={...s},N=/^(?:Outer wall|Inner wall|External perimeter|Perimeter)$/i.test(d),X=Number.isFinite(S.x)&&Number.isFinite(S.y)&&Math.hypot(E.x-S.x,E.y-S.y)>1e-5;if(m>0&&N&&A>0&&s.relative)throw Error("\u5899\u4F53\u4F7F\u7528 G91 \u76F8\u5BF9\u5750\u6807\uFF1B\u8BF7\u6539\u4E3A G90 \u7EDD\u5BF9 XYZ \u540E\u5BFC\u51FA\u3002");if(!X&&!(N&&A>0&&["G2","G3"].includes(h))){if(N&&A>0&&A<.05&&("X"in w||"Y"in w)&&Math.abs(E.z-S.z)<.002){if(!s.eRelative&&p?.moves.length)throw Error("\u7EDD\u5BF9\u6324\u51FA\u5899\u73AF\u5305\u542B\u505C\u70B9\u8865\u6599\uFF0C\u65E0\u6CD5\u539F\u6837\u4FDD\u7559 E \u5750\u6807\u3002\u8BF7\u6539\u7528\u76F8\u5BF9\u6324\u51FA M83 \u91CD\u65B0\u5207\u7247\u3002");continue}("E"in w||"X"in w||"Y"in w||"Z"in w)&&c();continue}let P={i:a,a:S,b:E,de:A,layer:m,feature:d,tool:s.tool,c:F,wall:N,width:b,arc:null};if(A>0&&m>0&&N){if(s.relative)throw Error("\u5899\u4F53\u4F7F\u7528 G91 \u76F8\u5BF9\u5750\u6807\uFF1B\u8BF7\u6539\u4E3A G90 \u7EDD\u5BF9 XYZ \u540E\u5BFC\u51FA\u3002");if(g!=="G17"||y)throw Error("\u4EC5\u652F\u6301 G17\u3001\u76F8\u5BF9 I/J \u5706\u5FC3\u7684\u5E73\u9762\u8DEF\u5F84\u3002");if(P.arc=Gt(S,E,F),!Number.isFinite(S.z)||Math.abs(E.z-S.z)>.002)throw Error("\u5899\u4F53\u5305\u542B\u8FDE\u7EED\u62AC Z \u6216\u659C\u7F1D\u8DEF\u5F84\u3002\u8BF7\u5173\u95ED\u87BA\u65CB\u82B1\u74F6\u3001\u659C\u62FC\u63A5/Scarf seam\u3002");p||(p={layer:m,feature:d,tool:s.tool,moves:[]}),p.moves.push(P),o.get(m).z||(o.get(m).z=E.z)}else c();A>0&&m>0&&(!P.arc&&["G2","G3"].includes(h)&&g==="G17"&&!y&&(P.arc=Gt(S,E,F)),n.push(P))}if(c(),!o.size||!r.length)throw Error("\u672A\u627E\u5230\u5E26\u5C42\u53F7\u548C\u5899\u4F53\u6807\u8BB0\u7684\u8DEF\u5F84\u3002\u8BF7\u4F7F\u7528 Bambu Studio \u5BFC\u51FA\u7684 G-code\uFF0C\u4FDD\u7559 FEATURE \u6CE8\u91CA\u3002");if(u.size>1)throw Error("\u68C0\u6D4B\u5230\u591A\u4E2A\u6253\u5370\u5BF9\u8C61\u3002\u8BF7\u4EC5\u4FDD\u7559\u4E00\u4E2A\u706F\u7F69/\u82B1\u74F6\uFF0C\u64E6\u6599\u5854\u53EF\u4EE5\u4FDD\u7559\u3002");let f=[...o.values()].sort((a,l)=>a.number-l.number);for(let a=0;a<f.length;a++)f[a].height||(f[a].height=f[a].z-(f[a-1]?.z||0));let i=(/^;\s*filament_colour\s*=\s*(.*)$/m.exec(e)?.[1]||"").split(";").map(a=>a.trim()).filter(a=>/^#[0-9a-f]{6}$/i.test(a));return{text:e,lines:t,moves:n,runs:r,layers:f,objects:[...u],warnings:v,filamentColors:i,totalLayers:f.at(-1).number,bambu:/BambuStudio/.test(e)}}function $e(e){let t=e.moves.flatMap(x=>{if(!x.arc)return[x.a,x.b];let G=Math.max(16,Math.ceil(Math.abs(x.arc.sweep)/.05)),b=Array.from({length:G+1},(M,c)=>c/G);for(let M=-8;M<=8;M++){let c=(M*Math.PI/2-x.arc.t0)/x.arc.sweep;c>0&&c<1&&b.push(c)}return b.map(M=>({x:x.arc.cx+x.arc.r*Math.cos(x.arc.t0+x.arc.sweep*M),y:x.arc.cy+x.arc.r*Math.sin(x.arc.t0+x.arc.sweep*M),z:x.a.z}))}),n=t.map(x=>x.x),r=t.map(x=>x.y),o=(Math.min(...n)+Math.max(...n))/2,u=(Math.min(...r)+Math.max(...r))/2,v=0,s=1/0;for(let x of e.moves){let G=x.arc?Math.max(1,Math.ceil(Math.abs(x.arc.sweep)/.1)):1,b=x.a;for(let M=1;M<=G;M++){let c=M/G,f=x.arc?{x:x.arc.cx+x.arc.r*Math.cos(x.arc.t0+x.arc.sweep*c),y:x.arc.cy+x.arc.r*Math.sin(x.arc.t0+x.arc.sweep*c)}:x.b;v+=An(Math.atan2(b.y-u,b.x-o),Math.atan2(f.y-u,f.x-o)),s=Math.min(s,Math.hypot(f.x-o,f.y-u)),b=f}}let m=e.moves.reduce((x,G)=>x+(G.arc?.length??Me(G.a,G.b)),0),d=Me(e.moves[0].a,e.moves.at(-1).b),p=t.map(x=>({theta:(Math.atan2(x.y-u,x.x-o)+Q)%Q,r:Math.hypot(x.x-o,x.y-u)})).sort((x,G)=>x.theta-G.theta),g=[],y=0;for(let x=0;x<384;x++){let G=x/384*Q;for(;y<p.length-1&&p[y+1].theta<G;)y++;let b=p[y],M=p[y+1]||{theta:p[0].theta+Q,r:p[0].r};G<b.theta&&(b={theta:p.at(-1).theta-Q,r:p.at(-1).r});let c=Ue((G-b.theta)/Math.max(1e-9,M.theta-b.theta),0,1);g.push(b.r+(M.r-b.r)*c)}return{cx:o,cy:u,minR:s,length:m,gap:d,winding:v,radial:g,closed:Math.abs(Math.abs(v)-Q)<.22&&d<Math.max(1.5,m*.02)}}function Ft(e,t){return Math.min(.45,Q*e.minR/t.stitches/16,t.pattern.enabled?Q*e.minR/(t.pattern.cols*t.pattern.repeat)*t.pattern.transition/4:1/0)}var St=(e,t=4)=>Number(e.toFixed(t));function Et(e,t={}){let n=typeof e=="string"?Je(e):e,r=Ye(t),o=new Map,u=[],v=[],s={engine:"KNITFORM_PATH_ENGINE:3.0",settings:r,layers:n.totalLayers,changedLayers:[],changedLoops:0,changedMoves:0,segments:0,oldFilament:0,newFilament:0,pathLength:0,maxFlow:0,minOverlap:1/0,maxLayerShift:0,toolChanges:(n.text.match(/^T\d+\s*$/gm)||[]).length,warnings:[],bounds:{min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]}},m=r.endLayer||n.totalLayers,d=new Set,p=[],g=new Map,y=new Map,x=1/0;if(m<r.startLayer)throw Error("\u7ED3\u675F\u5C42\u5FC5\u987B\u4E0D\u5C0F\u4E8E\u8D77\u59CB\u5C42\u3002");r.pattern.enabled&&(s.pattern=bt(n,r.pattern,r.startLayer,m));for(let h of n.runs){if(h.layer<r.startLayer||h.layer>m)continue;let w=$e(h);w.closed&&(y.set(h,w),p.push([w.cx,w.cy]))}if(!p.length)throw Error("\u6240\u9009\u5C42\u8303\u56F4\u5185\u6CA1\u6709\u53EF\u6539\u5199\u7684\u95ED\u5408\u5899\u73AF\u3002");let G=h=>{let w=[...h].sort((A,E)=>A-E),S=Math.floor(w.length/2);return w.length%2?w[S]:(w[S-1]+w[S])/2},b=[G(p.map(h=>h[0])),G(p.map(h=>h[1]))],M=0;for(let[h,w]of y)for(let S of h.moves)M+=Math.ceil((S.arc?.length??Me(S.a,S.b))/Ft(w,r));if(M>2e6)throw Error("\u9884\u8BA1\u8DEF\u5F84\u8D85\u8FC7 200 \u4E07\u6BB5\uFF0C\u8BF7\u51CF\u5C11\u73AF\u5411\u683C\u6570\u3001\u91CD\u590D\u6B21\u6570\u6216\u9488\u6570\uFF0C\u6216\u5148\u7F29\u77ED\u7F16\u8F91\u5C42\u8303\u56F4\u3002");if(p.some(h=>Math.hypot(h[0]-b[0],h[1]-b[1])>1))throw Error("\u5404\u5899\u73AF\u7684\u4E2D\u5FC3\u4E0D\u4E00\u81F4\u3002\u5F53\u524D\u8DEF\u7EBF\u4EC5\u652F\u6301\u5355\u4E2A\u540C\u5FC3\u65CB\u8F6C\u4F53\u3002");for(let h of n.runs){if(h.layer<r.startLayer||h.layer>m)continue;let w=y.get(h)||$e(h);if(!w.closed){if(r.pattern.enabled||/Outer|External/i.test(h.feature))throw Error(`\u7B2C ${h.layer} \u5C42\u5916\u5899\u4E0D\u662F\u5355\u4E2A\u8FD1\u95ED\u5408\u73AF\u3002\u8BF7\u5173\u95ED\u659C\u7F1D\u3001\u6A21\u7CCA\u8868\u9762\u3001\u65AD\u7EED\u5899\u53CA\u652F\u6491\u3002`);s.warnings.push(`\u7B2C ${h.layer} \u5C42\u6709\u975E\u95ED\u5408\u5185\u5899\uFF0C\u672A\u6539\u5199\u3002`);continue}if(w.minR<3)throw Error("\u5899\u73AF\u534A\u5F84\u8FC7\u5C0F\uFF0C\u8BF7\u4F7F\u7528\u7A7A\u5FC3\u65CB\u8F6C\u4F53\u5C0F\u6837\u3002");y.set(h,w);for(let L of h.moves)L.width>.1&&(x=Math.min(x,L.width));g.set(h.layer,(g.get(h.layer)||0)+1);let S=Ft(w,r),A=Math.min(w.length/8,Math.max(1,Q*w.minR/r.stitches)),E=n.layers.find(L=>L.number===h.layer).height;if(!(E>0&&E<=1))throw Error(`\u7B2C ${h.layer} \u5C42\u7684\u5C42\u9AD8\u65E0\u6CD5\u89E3\u6790\u3002`);let N=0,X={...h.moves[0].a},P=X.e,I=0,Z=X.f;for(let L=0;L<h.moves.length;L++){let z=h.moves[L],k=z.arc?.length??Me(z.a,z.b),H=Math.max(1,Math.ceil(k/S)),$=z.de/k*r.flow,O=[];P=z.a.e+I,L===0&&O.push(`; KNITFORM_LOOP L${h.layer} phase=${zt(h.layer,r,h.tool)} tool=${h.tool} pattern=${r.pattern.enabled?"registered":"off"} stitches=${r.stitches} amplitude=${r.amplitude}`);for(let T=1;T<=H;T++){let Y=T/H,W=z.arc?{x:z.arc.cx+z.arc.r*Math.cos(z.arc.t0+z.arc.sweep*Y),y:z.arc.cy+z.arc.r*Math.sin(z.arc.t0+z.arc.sweep*Y),z:z.b.z}:{x:z.a.x+(z.b.x-z.a.x)*Y,y:z.a.y+(z.b.y-z.a.y)*Y,z:z.b.z};T===H&&(W.x=z.b.x,W.y=z.b.y);let ae=N+k*Y,he=Ue(Math.min(ae,w.length-ae)/A,0,1),le=Math.atan2(W.y-b[1],W.x-b[0]),se=zn(le,h.layer,r,h.tool)*he,_e=Math.hypot(W.x-b[0],W.y-b[1]),j={x:St(b[0]+(_e+se)*Math.cos(le)),y:St(b[1]+(_e+se)*Math.sin(le)),z:z.b.z};L===h.moves.length-1&&T===H&&(j.x=z.b.x,j.y=z.b.y);let pe=Me(X,j),be=pe*$,He=Math.PI*(r.filament/2)**2,jt=Math.min(z.b.f/60,r.maxSpeed,r.maxFlow/($*He)),We=Math.max(1,Math.floor(jt*60));P+=be,O.push(`G1 X${j.x.toFixed(4)} Y${j.y.toFixed(4)} E${(z.b.eRelative?be:P).toFixed(6)} F${We}`),u.push({a:[X.x,X.y,X.z],b:[j.x,j.y,j.z],layer:h.layer,tool:z.tool,de:be,modified:!0,feature:h.feature,width:z.width||r.lineWidth,height:E});for(let ue=0;ue<3;ue++){let qe=[j.x,j.y,j.z][ue];s.bounds.min[ue]=Math.min(s.bounds.min[ue],qe),s.bounds.max[ue]=Math.max(s.bounds.max[ue],qe)}s.pathLength+=pe,s.newFilament+=be,s.maxFlow=Math.max(s.maxFlow,$*He*We/60),X=j}I=P-z.b.e,N+=k,s.oldFilament+=z.de,Z=z.b.f,L===h.moves.length-1&&(z.b.eRelative||O.push(`G92 E${z.b.e.toFixed(6)} ; restore source E coordinate`),O.push(`G1 F${Z} ; restore source feedrate`,"; KNITFORM_LOOP_END")),o.set(z.i,O.join(`
`)),s.changedMoves++}s.changedLoops++,d.add(h.layer);let R=2*r.amplitude*Math.abs(Math.sin(Math.PI*r.phase))+(r.pattern.enabled?2*r.pattern.depth:0);s.maxLayerShift=Math.max(s.maxLayerShift,R),s.minOverlap=Math.min(s.minOverlap,r.lineWidth-R)}if(!s.changedLoops)throw Error("\u6240\u9009\u5C42\u8303\u56F4\u5185\u6CA1\u6709\u53EF\u6539\u5199\u7684\u5899\u73AF\u3002");let c=b;if(s.bounds.min[0]<1||s.bounds.min[1]<1||s.bounds.max[0]>r.bedSize-1||s.bounds.max[1]>r.bedSize-1)throw Error("\u6539\u5199\u5899\u4F53\u8D85\u51FA\u6240\u8BBE\u5E73\u53F0\u8FB9\u754C\uFF0C\u8BF7\u68C0\u67E5\u5E73\u53F0\u5C3A\u5BF8\u548C\u6A21\u578B\u4F4D\u7F6E\u3002");let f=n.layers.filter(h=>d.has(h.number)).map(h=>h.height);if(Math.max(...f)-Math.min(...f)>.005)throw Error("\u7F16\u8F91\u8303\u56F4\u5B58\u5728\u81EA\u9002\u5E94\u5C42\u9AD8\u3002\u8BF7\u5173\u95ED\u81EA\u9002\u5E94\u5C42\u9AD8\u540E\u91CD\u65B0\u5207\u7247\u3002");let i=new Map;for(let h of n.runs)i.has(h.layer)||i.set(h.layer,[]),i.get(h.layer).push(h);let a=0,l=new Set([...d,...[...d].map(h=>h+1)]);for(let h of l){let w=i.get(h-1),S=i.get(h);if(w&&S){let A=X=>X.map(P=>y.get(P)||$e(P)).filter(P=>P.closed).sort((P,I)=>I.minR-P.minR)[0],E=A(w),N=A(S);if(!E||!N)continue;for(let X=0;X<E.radial.length;X++)a=Math.max(a,Math.abs(E.radial[X]-N.radial[X])+Math.hypot(E.cx-N.cx,E.cy-N.cy))}}if(s.maxLayerShift+=a,s.effectiveLineWidth=Math.min(r.lineWidth,x),s.minOverlap=s.effectiveLineWidth-s.maxLayerShift,s.minOverlap<s.effectiveLineWidth*.15)throw Error(`\u5C42\u95F4\u642D\u63A5\u4E0D\u8DB3\uFF1A\u4F30\u7B97\u6700\u5927\u504F\u79FB ${s.maxLayerShift.toFixed(3)} mm\uFF0C\u7EBF\u5BBD ${s.effectiveLineWidth.toFixed(3)} mm\u3002\u8BF7\u51CF\u5C0F\u632F\u5E45/\u8F6E\u5ED3\u659C\u7387\uFF0C\u6216\u589E\u5927\u5B9E\u9645\u5207\u7247\u7EBF\u5BBD\u3002`);s.warnings.push("\u642D\u63A5\u4E3A\u5F84\u5411\u4E2D\u5FC3\u7EBF\u7684\u4FDD\u5B88\u4F30\u7B97\uFF1B\u6324\u51FA\u622A\u9762\u3001\u6750\u6599\u9ECF\u7ED3\u53CA\u5B9E\u7269\u8D28\u611F\u4ECD\u9700\u5C0F\u6837\u9A8C\u8BC1\u3002"),s.minOverlap<r.lineWidth*.45&&s.warnings.push("\u5C42\u95F4\u642D\u63A5\u5C11\u4E8E\u7EBF\u5BBD\u7684 45%\uFF0C\u5EFA\u8BAE\u51CF\u5C0F\u632F\u5E45\u3002");for(let h of n.moves){if(o.has(h.i))continue;let w=h.arc?Math.max(1,Math.ceil(h.arc.length/.6)):1,S=h.a;for(let A=1;A<=w;A++){let E=A/w,N=h.arc?{x:h.arc.cx+h.arc.r*Math.cos(h.arc.t0+h.arc.sweep*E),y:h.arc.cy+h.arc.r*Math.sin(h.arc.t0+h.arc.sweep*E),z:h.b.z}:h.b;v.push({a:[S.x,S.y,S.z],b:[N.x,N.y,N.z],layer:h.layer,tool:h.tool,de:h.de/w,modified:!1,feature:h.feature,width:h.width||r.lineWidth,height:n.layers.find(X=>X.number===h.layer)?.height||.2}),S=N}}return s.changedLayers=[...d].sort((h,w)=>h-w),s.segments=u.length,s.center=c,s.extraFilament=s.newFilament-s.oldFilament,s.warnings=[...new Set(s.warnings)],s.pattern&&(s.pattern.origin=b,s.pattern.seamPolicy="original endpoints with one-stitch fade",s.warnings.push("\u63D0\u82B1\u901A\u8FC7\u5B9E\u9645\u8272\u69FD\u7684\u5916\u51F8/\u5185\u6536\u5BF9\u9F50\uFF1B\u5185\u6536\u989C\u8272\u4ECD\u53EF\u80FD\u9732\u51FA\uFF0C\u6548\u679C\u53D6\u51B3\u4E8E\u6324\u51FA\u622A\u9762\u3001\u89C6\u89D2\u548C\u6750\u6599\u3002\u63A5\u7F1D\u6E10\u53D8\u533A\u57DF\u4E0D\u4FDD\u8BC1\u5B8C\u6574\u56FE\u6848\u3002"),s.pattern.clippedRows&&s.warnings.push(`\u6A21\u578B\u9AD8\u5EA6\u4EC5\u5BB9\u7EB3 ${s.pattern.visibleRows} \u884C\uFF0C\u9876\u90E8 ${s.pattern.clippedRows} \u884C\u672A\u6253\u5370\u3002`),s.pattern.bands.some(h=>!h.complete)&&s.warnings.push("\u6700\u540E\u4E00\u884C\u56FE\u6848\u88AB\u7ED3\u675F\u5C42\u622A\u65AD\u3002"),s.pattern.bands.some(h=>h.tools.length&&h.minRepeats<2)&&s.warnings.push("\u90E8\u5206\u56FE\u6848\u884C\u6BCF\u79CD\u989C\u8272\u53EA\u51FA\u73B0\u4E00\u6B21\uFF1B\u589E\u52A0\u6BCF\u683C\u5C42\u6570\u53EF\u5F62\u6210\u8FDE\u7EED\u540C\u8272\u5806\u53E0\u3002")),{text:["; KNITFORM_PATH_ENGINE:3.0","; Edited planar walls; original start/end/AMS blocks retained. Do not re-slice.","; Original time/filament statistics below are stale after editing.",`; KNITFORM_SETTINGS ${JSON.stringify(r)}`,`; KNITFORM_DELTA_FILAMENT_MM ${s.extraFilament.toFixed(3)}`].join(`
`)+`
`+n.lines.map((h,w)=>o.get(w)??h).join(`
`),report:s,segments:[...v,...u].sort((h,w)=>h.layer-w.layer),layers:n.layers,replacements:o}}var Xn=1,te={name:"\u67D4\u5149 \xB7 \u73CD\u73E0\u7EC7\u7F69",shape:"orb",kind:"lamp",height:168,diameter:156,top:.46,base:.58,belly:1,lobes:8,flute:0,twist:0,texture:"knit",amplitude:.65,stitches:88,rowHeight:1.6,wall:.8,bottom:1.2,hole:40,palette:"pearl",bands:5,layer:.2,nozzle:.4,lineWidth:.5,speed:30,temperature:210,bedTemperature:55,bedSize:256,bedHeight:256,filament:1.75,density:1.24,quality:"standard",exportMode:"shell"},At={pearl:["#eae4d7","#eae4d7"],lilac:["#dcbce7","#efdc6b"],moss:["#233f35","#a4c96c"],clay:["#c58668","#e4bd99"],ocean:["#779fa5","#d0e3db"],ink:["#344148","#738992"]},Qn=[{id:"pearl",label:"\u67D4\u5149\u7EC7\u7F69",tag:"\u706F\u7F69",description:"\u73CD\u73E0\u767D \xB7 \u7EC6\u5BC6\u4EBA\u5B57\u9488",params:{...te}},{id:"lilac",label:"\u6625\u65E5\u7EC7\u74F6",tag:"\u82B1\u74F6",description:"\u4E01\u9999\u7D2B \xD7 \u5976\u6CB9\u9EC4",params:{...te,name:"\u6625\u65E5 \xB7 \u7F57\u7EB9\u7EC7\u74F6",kind:"vase",shape:"waist",height:195,diameter:132,top:.91,base:.64,belly:.9,lobes:8,flute:.06,hole:0,palette:"lilac",texture:"seed",amplitude:.55,bands:7}},{id:"moss",label:"\u82D4\u7EFF\u7F16\u7BEE",tag:"\u88C5\u9970",description:"\u82D4\u7EFF\u8272 \xB7 \u68CB\u76D8\u7EC7\u6CD5",params:{...te,name:"\u82D4\u7EFF \xB7 \u68CB\u76D8\u7F16\u7BEE",shape:"orb",kind:"vase",height:116,diameter:150,top:.76,base:.66,hole:0,palette:"moss",texture:"basket",amplitude:.5,stitches:72}},{id:"clay",label:"\u8D64\u9676\u65CB\u7EB9",tag:"\u82B1\u74F6",description:"\u6696\u8D64\u9676 \xB7 \u626D\u8F6C\u9EBB\u82B1",params:{...te,name:"\u8D64\u9676 \xB7 \u65CB\u7EB9\u82B1\u74F6",shape:"gourd",kind:"vase",height:205,diameter:122,top:.5,base:.67,hole:0,palette:"clay",texture:"cable",twist:45,amplitude:.55}},{id:"ocean",label:"\u6F6E\u6C50\u6CE2\u7EB9",tag:"\u706F\u7F69",description:"\u96FE\u84DD\u8272 \xB7 \u6CE2\u6D6A\u7EB9\u7406",params:{...te,name:"\u6F6E\u6C50 \xB7 \u6CE2\u7EB9\u706F\u7F69",shape:"cylinder",height:160,diameter:132,top:.86,base:.84,hole:40,palette:"ocean",texture:"wave",amplitude:.5}},{id:"ink",label:"\u58A8\u8272\u7F57\u7EB9",tag:"\u82B1\u74F6",description:"\u77F3\u58A8\u7070 \xB7 \u7EB5\u5411\u7EC7\u7EB9",params:{...te,name:"\u58A8\u8272 \xB7 \u7F57\u7EB9\u82B1\u74F6",shape:"waist",kind:"vase",height:186,diameter:118,top:.85,base:.62,hole:0,palette:"ink",texture:"rib",flute:.05,amplitude:.45}}],xe=(e,t,n)=>Math.min(n,Math.max(t,e));function Xt(e={}){let t={...te,...e},n={height:[30,300],diameter:[30,260],top:[.2,1.2],base:[.25,1.1],belly:[.55,1.15],lobes:[3,24],flute:[0,.15],twist:[-180,180],amplitude:[0,1.5],stitches:[16,144],rowHeight:[.6,5],wall:[.4,3],bottom:[.6,4],hole:[0,80],bands:[1,12],layer:[.08,.4],nozzle:[.2,.8],lineWidth:[.25,1.2],speed:[10,100],temperature:[170,270],bedTemperature:[0,110],bedSize:[120,400],bedHeight:[120,400],filament:[1.5,3],density:[.9,1.5]};for(let[r,[o,u]]of Object.entries(n)){let v=Number(t[r]);t[r]=xe(Number.isFinite(v)?v:te[r],o,u)}for(let r of["lobes","stitches","bands"])t[r]=Math.round(t[r]);for(let[r,o]of Object.entries({shape:["orb","waist","gourd","cylinder"],kind:["lamp","vase"],texture:["knit","seed","basket","cable","wave","rib","none"],palette:Object.keys(At),quality:["draft","standard","fine"],exportMode:["shell","solid"]}))o.includes(t[r])||(t[r]=te[r]);return t.name=typeof t.name=="string"&&t.name.trim().slice(0,60)||te.name,t.kind==="vase"&&(t.hole=0),Object.assign(t,pt(t,At[t.palette])),t.pathConfig=Ye(t.pathConfig),t}function Pn(e,t){let n=xe(t,0,1)*(e.length-1),r=Math.min(e.length-2,Math.floor(n)),o=n-r,u=e[r+1]-e[r],v=r>0?e[r]-e[r-1]:u,s=r+2<e.length?e[r+2]-e[r+1]:u,m=(x,G)=>x*G<=0?0:2*x*G/(x+G),d=m(v,u),p=m(u,s),g=o*o,y=g*o;return(2*y-3*g+1)*e[r]+(y-2*g+o)*d+(-2*y+3*g)*e[r+1]+(y-g)*p}function we(e,t){let n=e.belly,r={orb:[e.base,.83*n,.98*n,n,.96*n,.8*n,e.top],waist:[e.base,.94*n,n,.83*n,.72*n,.79*n,e.top],gourd:[e.base,.94*n,n,.82*n,.57*n,.48*n,e.top],cylinder:[e.base,.95*n,n,n,n,.96*n,e.top]};return e.diameter/2*Pn(r[e.shape],t)}function In(e,t,n){let r=n/e.height,o=t+e.twist*Math.PI/180*r,u={basket:6,cable:3,wave:3,rib:2}[e.texture]||1,v=Math.max(u,Math.round(e.stitches/u)*u),s=o*v/(2*Math.PI),m=n/e.rowHeight,d=0;switch(e.texture){case"knit":{let g=(s%1+1)%1;d=Math.cos(2*Math.PI*(m-.85*Math.abs(g-.5)))*.44+Math.cos(2*Math.PI*s)*.32;break}case"seed":d=.68*Math.cos(2*Math.PI*(s+.24*Math.sin(Math.PI*m)))*Math.cos(Math.PI*m);break;case"basket":{let g=Math.sin(2*Math.PI*s/6)*Math.sin(2*Math.PI*m/6),y=.5+.5*Math.tanh(g*4);d=.56*(y*Math.cos(2*Math.PI*s)+(1-y)*Math.cos(2*Math.PI*m));break}case"cable":d=.65*Math.cos(2*Math.PI*(s/3+.34*Math.sin(m*Math.PI/4)));break;case"wave":d=.65*Math.sin(2*Math.PI*(s/3+.25*Math.sin(m)));break;case"rib":d=.7*Math.cos(2*Math.PI*s/2);break}let p=xe(n/2,0,1)*xe((e.height-n)/1.4,0,1);return e.amplitude*d*p}function K(e,t,n,r=!0){let o=xe(n/e.height,0,1),u=t+e.twist*Math.PI/180*o,v=we(e,o)*(1+e.flute*Math.cos(u*e.lobes));return Math.max(e.wall+1,v+(r?In(e,t,n):0))}function Cn(e,t=!1){let n=e.quality==="fine"?1.5:e.quality==="draft"?.65:1;return{n:Math.min(t?320:768,Math.max(128,Math.ceil(e.stitches*(t?4:6)*n/8)*8)),m:Math.min(t?480:1400,Math.max(60,Math.ceil(e.height/Math.min(t?.48:.3,e.rowHeight/6)*n)))}}function Pt(e,t={}){let n=Xt(e),r=Cn(n,t.preview),o=t.n||r.n,u=t.m||r.m,v=t.mode||n.exportMode,s=[],m=[],d=(M,c)=>{let f=[];for(let i=0;i<o;i++){let a=i/o*2*Math.PI,l=c(a);f.push(s.length/3),s.push(l*Math.cos(a),l*Math.sin(a),M)}return f},p=(M,c,f=!1)=>{for(let i=0;i<o;i++){let a=(i+1)%o,l=[M[i],M[a],c[i],M[a],c[a],c[i]];f?m.push(l[0],l[2],l[1],l[3],l[5],l[4]):m.push(...l)}},g=(M,c,f)=>{let i=s.length/3;s.push(0,0,c);for(let a=0;a<o;a++){let l=(a+1)%o;m.push(i,f?M[a]:M[l],f?M[l]:M[a])}},y,x;for(let M=0;M<=u;M++){let c=M/u*n.height,f=d(c,i=>K(n,i,c));M===0?y=f:p(x,f),x=f}let G=m.length,b=0;if(v==="solid")g(y,0,!1),g(x,n.height,!0);else{let M=Math.max(2,Math.ceil(u*(n.height-n.bottom)/n.height)),c,f;for(let i=0;i<=M;i++){let a=n.bottom+i/M*(n.height-n.bottom),l=d(a,_=>K(n,_,a)-n.wall);i===0?c=l:p(f,l,!0),f=l}if(b=m.length-G,p(x,f),n.hole>0){let i=n.hole/2,a=d(0,()=>i),l=d(n.bottom,()=>i);p(a,y),p(a,l,!0),p(c,l)}else g(y,0,!1),g(c,n.bottom,!0)}return{positions:new Float32Array(s),indices:new Uint32Array(m),n:o,m:u,params:n,outerCount:G,innerCount:b}}function Ln(e){let t=0,n=0,r=0,o=1/0,u=0,v=160,s=96,m=e.height/v,d=2*Math.PI/s;for(let G=0;G<v;G++)for(let b=0;b<s;b++){let M=(G+.5)*m,c=b*d,f=K(e,c,M),i=(K(e,c,Math.min(e.height,M+m/2))-K(e,c,Math.max(0,M-m/2)))/m,a=(K(e,c+d/2,M)-K(e,c-d/2,M))/d;t+=Math.sqrt(f*f*(1+i*i)+a*a)*d*m,n+=f*f*.5*d*m,r=Math.max(r,f),o=Math.min(o,f)}let p=we(e,0)*(1+e.flute),g=Math.max(0,Math.PI*(p*p-e.hole*e.hole/4)*e.bottom),y=t*e.wall+g,x=y/1e3*e.density;for(let G=0;G<100;G++)for(let b=0;b<128;b++){let M=G/100*(e.height-e.layer),c=b/128*2*Math.PI;u=Math.max(u,Math.abs(K(e,c,M+e.layer)-K(e,c,M)))}return{area:t,volume:n/1e3,grams:x,maxR:r,minR:o,maxShift:u,layers:Math.ceil(e.height/e.layer),minutes:y/(e.lineWidth*e.layer*e.speed*60)*1.15,filament:y/(Math.PI*(e.filament/2)**2)/1e3}}function Tn(e){let t=Xt(e),n=Ln(t),r=[];return 2*n.maxR+10>t.bedSize&&r.push({level:"error",text:`\u6A21\u578B\u52A0\u8FB9\u8DDD\u9700 ${(2*n.maxR+10).toFixed(1)} mm\uFF0C\u8D85\u8FC7 ${t.bedSize} mm \u5E73\u53F0\u3002`}),t.height>t.bedHeight&&r.push({level:"error",text:`\u9AD8\u5EA6\u8D85\u8FC7 ${t.bedHeight} mm \u6253\u5370\u7A7A\u95F4\u3002`}),t.hole>0&&t.hole/2+t.wall+2>Math.min(we(t,0),we(t,t.bottom/t.height))*(1-t.flute)&&r.push({level:"error",text:"\u5B89\u88C5\u5B54\u8FC7\u5927\uFF0C\u8BF7\u51CF\u5C0F\u5B54\u5F84\u6216\u589E\u5927\u5E95\u90E8\u6BD4\u4F8B\u3002"}),t.layer>t.nozzle*.75&&r.push({level:"error",text:"\u5C42\u9AD8\u8D85\u8FC7\u55B7\u5634\u76F4\u5F84\u7684 75%\uFF0C\u8BF7\u964D\u4F4E\u5C42\u9AD8\u3002"}),(t.lineWidth<t.nozzle*.9||t.lineWidth>t.nozzle*1.8)&&r.push({level:"error",text:"\u7EBF\u5BBD\u5E94\u5728\u55B7\u5634\u76F4\u5F84\u7684 0.9\u20131.8 \u500D\u4E4B\u95F4\u3002"}),n.maxShift>t.lineWidth*.65&&r.push({level:"warning",text:`\u5C40\u90E8\u5C42\u95F4\u504F\u79FB\u7EA6 ${n.maxShift.toFixed(2)} mm\uFF0C\u5EFA\u8BAE\u51CF\u5C0F\u7EB9\u7406\u8D77\u4F0F\u3001\u52A0\u5927\u9488\u8DDD\u6216\u4F7F\u7528\u5C0F\u6837\u8BD5\u6253\u3002`}),t.wall<t.lineWidth*.9&&r.push({level:"warning",text:"\u8584\u58C1\u539A\u5EA6\u5C0F\u4E8E\u5F53\u524D\u7EBF\u5BBD\uFF0C\u5EFA\u8BAE\u589E\u52A0\u58C1\u539A\u6216\u51CF\u5C0F\u7EBF\u5BBD\u3002"}),t.kind==="lamp"&&t.hole>0&&r.push({level:"info",text:`\u5E95\u90E8\u9884\u7559 \xD8${t.hole} mm \u5B89\u88C5\u5B54\uFF1B\u8BF7\u6309\u5B9E\u9645\u706F\u5EA7\u5C3A\u5BF8\u6838\u5BF9\u3002`}),{params:t,stats:n,issues:r,valid:!r.some(o=>o.level==="error")}}function It(e){let t=e.indices.length/3,n=new ArrayBuffer(84+t*50),r=new DataView(n);new Uint8Array(n,0,80).set(new TextEncoder().encode("KNITFORM binary STL | millimeter units | z up")),r.setUint32(80,t,!0);let o=e.positions,u=e.indices,v=84;for(let s=0;s<u.length;s+=3){let m=u[s]*3,d=u[s+1]*3,p=u[s+2]*3,g=o[d]-o[m],y=o[d+1]-o[m+1],x=o[d+2]-o[m+2],G=o[p]-o[m],b=o[p+1]-o[m+1],M=o[p+2]-o[m+2],c=y*M-x*b,f=x*G-g*M,i=g*b-y*G,a=Math.hypot(c,f,i)||1;for(let l of[c/a,f/a,i/a,o[m],o[m+1],o[m+2],o[d],o[d+1],o[d+2],o[p],o[p+1],o[p+2]])r.setFloat32(v,l,!0),v+=4;v+=2}return new Uint8Array(n)}var Ae=e=>String(e).replace(/[<>&"']/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"})[t]);function Ct(e){let t=e.params,n=e.positions,r=e.indices,o=t.colorMode==="layers"?'<metadata name="Application">BambuStudio-2.0.0.0</metadata><metadata name="BambuStudio:3mfVersion">1</metadata><metadata name="Designer">KNITFORM 1.1</metadata><metadata name="Description">Generated by KNITFORM 1.1; Bambu Studio compatible layer-color project</metadata>':'<metadata name="Application">KNITFORM 1.1</metadata>',u=['<?xml version="1.0" encoding="UTF-8"?><model unit="millimeter" xml:lang="zh-CN" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"><metadata name="Title">'+Ae(t.name)+"</metadata>"+o+'<resources><object id="1" type="model" name="'+Ae(t.name)+'"><mesh><vertices>'];for(let s=0;s<n.length;s+=3)u.push(`<vertex x="${n[s].toFixed(5)}" y="${n[s+1].toFixed(5)}" z="${n[s+2].toFixed(5)}"/>`);u.push("</vertices><triangles>");for(let s=0;s<r.length;s+=3)u.push(`<triangle v1="${r[s]}" v2="${r[s+1]}" v3="${r[s+2]}"/>`);u.push("</triangles></mesh></object>"+(t.colorMode==="layers"?'<object id="2" type="model"><components><component objectid="1"/></components></object>':"")+'</resources><build><item objectid="'+(t.colorMode==="layers"?2:1)+'"'+(t.colorMode==="layers"?` transform="1 0 0 0 1 0 0 0 1 ${t.bedSize/2} ${t.bedSize/2} 0"`:"")+"/></build></model>");let v={"[Content_Types].xml":D('<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/><Default Extension="json" ContentType="application/json"/></Types>'),"_rels/.rels":D('<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>'),"3D/3dmodel.model":D(u.join("")),"Metadata/knitform.json":D(JSON.stringify({app:"knitform",version:Xn,params:t},null,2))};if(t.colorMode==="layers"){let s=gt(t),m=Math.max(...s.slots)+1,d=t.filamentColors.slice(0,m),p=Re(t,1)+1;v["Metadata/custom_gcode_per_layer.xml"]=D(yt(t)),v["Metadata/knitform-layer-colors.csv"]=D(vt(t));let g={...me,layer_height:String(t.layer),initial_layer_print_height:String(t.layer),spiral_mode:"0",enable_prime_tower:"1",wall_generator:"arachne",sparse_infill_density:"0%",filament_colour:d.map(y=>y.toUpperCase()),flush_volumes_matrix:d.flatMap((y,x)=>d.map((G,b)=>x===b?"0":"280")),flush_volumes_vector:d.flatMap(()=>["140","140"])};for(let y of Mt)Array.isArray(me[y])&&(g[y]=d.flatMap(()=>me[y]));for(let[y,x]of Object.entries(me))y.startsWith("filament_")&&Array.isArray(x)&&x.length===1&&!["filament_map","filament_map_2"].includes(y)&&(g[y]=d.map(()=>x[0]));g.filament_colour=d.map(y=>y.toUpperCase()),g.different_settings_to_system=me.different_settings_to_system,v["Metadata/project_settings.config"]=D(JSON.stringify(g,null,2)),v["Metadata/model_settings.config"]=D(`<?xml version="1.0" encoding="UTF-8"?><config><object id="2"><metadata key="name" value="${Ae(t.name)}"/><metadata key="extruder" value="${p}"/><part id="1" subtype="normal_part"><metadata key="name" value="${Ae(t.name)}"/><metadata key="extruder" value="${p}"/></part></object><plate><metadata key="plater_id" value="1"/><metadata key="plater_name" value="KNITFORM layer colors"/><model_instance><metadata key="object_id" value="2"/><metadata key="instance_id" value="0"/><metadata key="identify_id" value="1"/></model_instance></plate></config>`)}return Se(v,{level:6})}function Lt(e){let t=Tn(e),n=t.params;if(!t.valid)throw Error(t.issues.filter(M=>M.level==="error").map(M=>M.text).join(" "));if(n.colorMode==="layers")throw Error("\u9010\u5C42\u591A\u8272\u8BF7\u5BFC\u51FA 3MF\uFF0C\u7531 Bambu Studio \u751F\u6210\u5E26\u6362\u8272\u4E0E\u51B2\u5237\u7684\u673A\u5668\u6307\u4EE4\u3002\u901A\u7528\u5355\u58C1 G-code \u4E0D\u5305\u542B\u6362\u8272\u3002");if(n.hole>0)throw Error("\u901A\u7528\u87BA\u65CB G-code \u6682\u4E0D\u5904\u7406\u5E95\u90E8\u5B89\u88C5\u5B54\u3002\u8BF7\u9009\u62E9 3MF / STL\uFF0C\u5728 Bambu Studio \u4E2D\u5207\u7247\u3002");if(t.stats.maxShift>n.lineWidth*.65)throw Error("\u5F53\u524D\u7EB9\u7406\u5C42\u95F4\u504F\u79FB\u8FC7\u5927\uFF0C\u8BF7\u5148\u51CF\u5C0F\u8D77\u4F0F\u6216\u589E\u5927\u9488\u8DDD\uFF0C\u518D\u751F\u6210\u901A\u7528 G-code\u3002");let r=Math.max(240,n.stitches*10),o=n.bedSize/2,u=o,v=n.layer*(n.lineWidth-n.layer)+Math.PI*(n.layer/2)**2,s=Math.PI*(n.filament/2)**2,m=0,d=null,p=0,g=["; KNITFORM 1.0 \u2014 GENERIC MARLIN ONLY; NOT BAMBU MACHINE CODE","; single wall, one material; palette is preview only","; parameters "+JSON.stringify(n),"G21","G90","M82","M140 S"+n.bedTemperature,"M104 S"+n.temperature,"G28","M190 S"+n.bedTemperature,"M109 S"+n.temperature,"G92 E0","M107"],y=(M,c,f,i=!0,a=n.speed)=>{let l=[M+o,c+u,f];if(i&&d){let _=Math.hypot(l[0]-d[0],l[1]-d[1],l[2]-d[2]);m+=_*v/s,p+=_}g.push(`${i?"G1":"G0"} X${l[0].toFixed(3)} Y${l[1].toFixed(3)} Z${f.toFixed(3)}${i?" E"+m.toFixed(5):""} F${(a*60).toFixed(0)}`),d=l},x=Math.ceil(n.bottom/n.layer),G=x*n.layer;for(let M=1;M<=x;M++){let c=M*n.layer;g.push(";LAYER:"+M,";TYPE:Solid floor");let f=we(n,c/n.height)*(1+n.flute)+n.amplitude,i=n.lineWidth*.92,a=Math.ceil(f/i);for(let l=1;l<=a;l++){let _=l/a;for(let F=0;F<=r;F++){let h=F/r*2*Math.PI,w=Math.max(.1,K(n,h,c)-n.lineWidth/2)*_;y(w*Math.cos(h),w*Math.sin(h),c,F>0,15)}}}y(K(n,0,G)-n.lineWidth/2,0,G,!1,20);for(let M=1;M<=r;M++){let c=M/r*2*Math.PI,f=K(n,c,G)-n.lineWidth/2;y(f*Math.cos(c),f*Math.sin(c),G)}g.push("M106 S180");let b=Math.ceil((n.height-G)/n.layer);for(let M=0;M<b;M++){g.push(";LAYER:"+(x+M+1),";TYPE:Spiral outer wall");for(let c=1;c<=r;c++){let f=Math.min(n.height,G+(M+c/r)*n.layer),i=c/r*2*Math.PI,a=K(n,i,f)-n.lineWidth/2;y(a*Math.cos(i),a*Math.sin(i),f)}}return g.push("M400","G92 E0","G1 E-0.8 F1800",`G0 Z${Math.min(n.bedHeight,n.height+5).toFixed(2)} F600`,"M104 S0","M140 S0","M107","M84",`; PATH_LENGTH_MM:${p.toFixed(1)}`),g.join(`
`)}var Bt=Ht(Zt(),1);function Nn(e){let t=0,n=0;if(e.byteLength>80*1024*1024)throw Error("\u6587\u4EF6\u8D85\u8FC7 80 MB\uFF0C\u8BF7\u4F7F\u7528\u5C0F\u6837\u3002");let r=ct(e,{filter:u=>{if(t+=u.originalSize,t>250*1024*1024||++n>5e3)throw Error("\u89E3\u538B\u6587\u4EF6\u8D85\u8FC7 250 MB \u6216\u5305\u542B\u8FC7\u591A\u6761\u76EE\uFF0C\u8BF7\u4F7F\u7528\u5C0F\u6837\u3002");return!0}}),o=Object.keys(r).filter(u=>/^Metadata\/plate_\d+\.gcode$/.test(u));if(o.length!==1)throw Error("\u8BF7\u9009\u62E9\u53EA\u542B\u4E00\u4E2A\u5DF2\u5207\u7247\u5E73\u53F0\u7684 3MF\u3002");if(Object.values(r).reduce((u,v)=>u+v.byteLength,0)>250*1024*1024)throw Error("\u89E3\u538B\u6587\u4EF6\u8D85\u8FC7 250 MB\uFF0C\u8BF7\u4F7F\u7528\u5C0F\u6837\u3002");return{files:r,key:o[0],text:ce(r[o[0]])}}function Ot(e,t){let{files:n,key:r}=Nn(e);if(!/^; KNITFORM_PATH_ENGINE:(?:2|3)\.0/m.test(t.text))throw Error("\u6CA1\u6709\u53EF\u5C01\u88C5\u7684\u6539\u5199\u8DEF\u5F84\u3002");let o=D(t.text);n[r]=o,n[r+".md5"]=D(Bt.default.ArrayBuffer.hash(o.buffer.slice(o.byteOffset,o.byteOffset+o.byteLength)).toUpperCase()),Zn(n,t.report.nativeSlicer);let u=/plate_(\d+)/.exec(r)[1],v=`Metadata/plate_${u}.json`;if(n[v]){let s=JSON.parse(ce(n[v])),m=t.report.bounds,d=t.report.effectiveLineWidth/2,p=[m.min[0]-d,m.min[1]-d,m.max[0]+d,m.max[1]+d],g=y=>Array.isArray(y)&&y.length===4?[Math.min(y[0],p[0]),Math.min(y[1],p[1]),Math.max(y[2],p[2]),Math.max(y[3],p[3])]:p;s.bbox_all=g(s.bbox_all),s.bbox_objects?.length===1&&(s.bbox_objects[0].bbox=g(s.bbox_objects[0].bbox)),n[v]=D(JSON.stringify(s))}return n["Metadata/knitform-path-report.json"]=D(JSON.stringify({...t.report,statisticsStale:!0,thumbnailShowsOriginalBody:!0,physicalPrintTested:!1},null,2)),Bn(n),Se(n,{level:6})}function Zn(e,t){if(t?.modelId){let n=JSON.parse(ce(e["Metadata/project_settings.config"]));if(n.printer_settings_id!==t.printer||n.printer_model!==t.model)throw Error("\u5207\u7247\u673A\u578B\u914D\u7F6E\u4E0E\u6253\u5370\u5305\u8EAB\u4EFD\u4E0D\u4E00\u81F4\u3002");if(!/^[A-Za-z0-9-]+$/.test(t.modelId))throw Error("\u65E0\u6548\u7684\u673A\u578B\u7F16\u53F7\u3002");let r="Metadata/slice_info.config";if(!e[r])throw Error("\u5207\u7247\u5305\u7F3A\u5C11\u6253\u5370\u53D1\u9001\u5143\u6570\u636E\u3002");let o=ce(e[r]),u=!1;if(o=o.replace(/<metadata\b[^>]*\/>/g,v=>/\bkey="printer_model_id"/.test(v)?(u=!0,v.replace(/\bvalue="[^"]*"/,`value="${t.modelId}"`)):v),u||(o=o.replace("<plate>",`<plate>
    <metadata key="printer_model_id" value="${t.modelId}"/>`)),!o.includes(`key="printer_model_id" value="${t.modelId}"`))throw Error("\u672A\u80FD\u5199\u5165\u6253\u5370\u53D1\u9001\u673A\u578B\u7F16\u53F7\u3002");e[r]=D(o)}}function Bn(e){let t="3D/3dmodel.model";if(e[t]){let r=ce(e[t]);r=r.replace(/<resources\b[^>]*>[\s\S]*?<\/resources>/g,"<resources/>").replace(/<build\b[^>]*>[\s\S]*?<\/build>/g,"<build/>"),e[t]=D(r)}for(let r of Object.keys(e))(r.startsWith("3D/Objects/")||r==="3D/_rels/3dmodel.model.rels")&&delete e[r];let n="Metadata/model_settings.config";if(e[n]){let r=ce(e[n]);r=r.replace(/<object\b[^>]*>[\s\S]*?<\/object>/g,"").replace(/<model_instance\b[^>]*>[\s\S]*?<\/model_instance>/g,"").replace(/<assemble\b[^>]*>[\s\S]*?<\/assemble>/g,""),e[n]=D(r)}}self.onmessage=e=>{try{let{params:t,format:n,task:r,text:o,settings:u}=e.data;if(r==="package"){let m=Ot(e.data.archive,e.data.result);self.postMessage({data:m},[m.buffer]);return}if(r==="toolpath"){self.postMessage({progress:"\u6B63\u5728\u89E3\u6790\u5C42\u3001\u5899\u73AF\u4E0E\u6324\u51FA\u6A21\u5F0F\u2026"});let m=Je(o);self.postMessage({progress:"\u6B63\u5728\u8BA1\u7B97\u4EA4\u9519\u8DEF\u5F84\u3001\u6D41\u91CF\u4E0E\u642D\u63A5\u2026"});let d=Et(m,u);self.postMessage({data:{text:d.text,report:d.report,segments:d.segments,layers:d.layers,sourceTools:m.moves.filter(p=>p.wall).map(p=>({layer:p.layer,tool:p.tool})),bambu:m.bambu,filamentColors:m.filamentColors}});return}if(self.postMessage({progress:"\u6B63\u5728\u6784\u5EFA\u51E0\u4F55\u2026"}),n==="gcode"){let m=Lt(t);self.postMessage({data:m});return}let v=Pt(t);self.postMessage({progress:n==="3mf"?"\u6B63\u5728\u538B\u7F29 3MF\u2026":"\u6B63\u5728\u5199\u5165 STL\u2026"});let s=n==="3mf"?Ct(v):It(v);self.postMessage({data:s},[s.buffer])}catch(t){self.postMessage({error:t.message||"\u5BFC\u51FA\u5931\u8D25\u3002"})}};})();

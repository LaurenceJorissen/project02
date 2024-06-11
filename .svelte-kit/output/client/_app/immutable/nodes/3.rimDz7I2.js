import{s as te,n as Q,o as se,b as X,r as le}from"../chunks/scheduler.B4houzoZ.js";import{S as ae,i as re,e as v,t as R,s as T,c as k,a as D,f as j,d as y,b as F,x as Y,h,k as B,l as r,m as W,v as oe,u as A,g as ne}from"../chunks/index.DlrXzjOH.js";import{e as Z}from"../chunks/each.D6YF6ztN.js";import{w as ie}from"../chunks/index.CV1gxh0y.js";async function de({data:t}){return{users:t.users,images:t.images}}const pe=Object.freeze(Object.defineProperty({__proto__:null,load:de},Symbol.toStringTag,{value:"Module"}));function $(t,a,s){const m=t.slice();return m[22]=a[s],m}function x(t){let a,s,m=t[22].name+"",N,P,g,S,_=t[6](t[22].userId)+"",J,u,p,b,V,L,o,d=t[22].description+"",n,U,l,E,M,z,H,e,i;function I(...f){return t[13](t[22],...f)}function C(){return t[14](t[22])}function w(){return t[15](t[22])}return{c(){a=v("div"),s=v("h3"),N=R(m),P=T(),g=v("p"),S=R("Uploaded by: "),J=R(_),u=T(),p=v("img"),L=T(),o=v("p"),n=R(d),U=T(),l=v("span"),E=R("❤"),M=T(),this.h()},l(f){a=k(f,"DIV",{class:!0,style:!0});var c=D(a);s=k(c,"H3",{});var O=D(s);N=j(O,m),O.forEach(y),P=F(c),g=k(c,"P",{});var G=D(g);S=j(G,"Uploaded by: "),J=j(G,_),G.forEach(y),u=F(c),p=k(c,"IMG",{src:!0,alt:!0}),L=F(c),o=k(c,"P",{});var K=D(o);n=j(K,d),K.forEach(y),U=F(c),l=k(c,"SPAN",{class:!0,style:!0});var q=D(l);E=j(q,"❤"),q.forEach(y),M=F(c),c.forEach(y),this.h()},h(){X(p.src,b=t[22].imageUrl)||h(p,"src",b),h(p,"alt",V=t[22].name),h(l,"class","heart-icon"),Y(l,"color",t[1][`${t[22].userId}_${t[22].imageUrl}`]?"#4a3f35":"#ccc"),h(a,"class",z="image-item "+(t[3]===t[22].imageUrl?"enlarged":"")),h(a,"style",H=t[3]===t[22].imageUrl?t[4]:"")},m(f,c){B(f,a,c),r(a,s),r(s,N),r(a,P),r(a,g),r(g,S),r(g,J),r(a,u),r(a,p),r(a,L),r(a,o),r(o,n),r(a,U),r(a,l),r(l,E),r(a,M),e||(i=[W(p,"click",I),W(l,"click",C),W(a,"dblclick",w)],e=!0)},p(f,c){t=f,c&1&&m!==(m=t[22].name+"")&&A(N,m),c&1&&_!==(_=t[6](t[22].userId)+"")&&A(J,_),c&1&&!X(p.src,b=t[22].imageUrl)&&h(p,"src",b),c&1&&V!==(V=t[22].name)&&h(p,"alt",V),c&1&&d!==(d=t[22].description+"")&&A(n,d),c&3&&Y(l,"color",t[1][`${t[22].userId}_${t[22].imageUrl}`]?"#4a3f35":"#ccc"),c&9&&z!==(z="image-item "+(t[3]===t[22].imageUrl?"enlarged":""))&&h(a,"class",z),c&25&&H!==(H=t[3]===t[22].imageUrl?t[4]:"")&&h(a,"style",H)},d(f){f&&y(a),e=!1,le(i)}}}function ee(t){let a,s,m,N="×",P,g,S=t[2].name+"",_,J,u,p,b=t[6](t[2].userId)+"",V,L,o,d,n,U,l,E=t[2].description+"",M,z,H;return{c(){a=v("div"),s=v("div"),m=v("span"),m.textContent=N,P=T(),g=v("h2"),_=R(S),J=T(),u=v("p"),p=R("Uploaded by: "),V=R(b),L=T(),o=v("img"),U=T(),l=v("p"),M=R(E),this.h()},l(e){a=k(e,"DIV",{class:!0});var i=D(a);s=k(i,"DIV",{class:!0});var I=D(s);m=k(I,"SPAN",{class:!0,"data-svelte-h":!0}),ne(m)!=="svelte-1e29kf7"&&(m.textContent=N),P=F(I),g=k(I,"H2",{});var C=D(g);_=j(C,S),C.forEach(y),J=F(I),u=k(I,"P",{});var w=D(u);p=j(w,"Uploaded by: "),V=j(w,b),w.forEach(y),L=F(I),o=k(I,"IMG",{src:!0,alt:!0}),U=F(I),l=k(I,"P",{});var f=D(l);M=j(f,E),f.forEach(y),I.forEach(y),i.forEach(y),this.h()},h(){h(m,"class","close"),X(o.src,d=t[2].imageUrl)||h(o,"src",d),h(o,"alt",n=t[2].name),h(s,"class","modal-content"),h(a,"class","modal")},m(e,i){B(e,a,i),r(a,s),r(s,m),r(s,P),r(s,g),r(g,_),r(s,J),r(s,u),r(u,p),r(u,V),r(s,L),r(s,o),r(s,U),r(s,l),r(l,M),z||(H=W(m,"click",t[10]),z=!0)},p(e,i){i&4&&S!==(S=e[2].name+"")&&A(_,S),i&4&&b!==(b=e[6](e[2].userId)+"")&&A(V,b),i&4&&!X(o.src,d=e[2].imageUrl)&&h(o,"src",d),i&4&&n!==(n=e[2].name)&&h(o,"alt",n),i&4&&E!==(E=e[2].description+"")&&A(M,E)},d(e){e&&y(a),z=!1,H()}}}function ce(t){let a,s,m,N,P,g,S,_,J,u,p,b,V,L=Z(t[0]),o=[];for(let n=0;n<L.length;n+=1)o[n]=x($(t,L,n));let d=t[2]!==null&&ee(t);return{c(){a=v("div"),s=v("div"),m=v("h1"),N=R("Discovery page"),P=T(),g=v("div"),S=v("form"),_=v("input"),J=T(),u=v("div");for(let n=0;n<o.length;n+=1)o[n].c();p=T(),d&&d.c(),this.h()},l(n){a=k(n,"DIV",{class:!0});var U=D(a);s=k(U,"DIV",{class:!0});var l=D(s);m=k(l,"H1",{style:!0});var E=D(m);N=j(E,"Discovery page"),E.forEach(y),P=F(l),g=k(l,"DIV",{class:!0});var M=D(g);S=k(M,"FORM",{class:!0});var z=D(S);_=k(z,"INPUT",{type:!0,placeholder:!0}),z.forEach(y),M.forEach(y),J=F(l),u=k(l,"DIV",{class:!0});var H=D(u);for(let e=0;e<o.length;e+=1)o[e].l(H);H.forEach(y),p=F(l),d&&d.l(l),l.forEach(y),U.forEach(y),this.h()},h(){Y(m,"font-size",ue+"rem"),h(_,"type","text"),h(_,"placeholder","Search by user name or image name"),h(S,"class","form-group"),h(g,"class","search"),h(u,"class","gallery"),h(s,"class","container"),h(a,"class","front-page")},m(n,U){B(n,a,U),r(a,s),r(s,m),r(m,N),r(s,P),r(s,g),r(g,S),r(S,_),r(s,J),r(s,u);for(let l=0;l<o.length;l+=1)o[l]&&o[l].m(u,null);r(s,p),d&&d.m(s,null),b||(V=W(_,"input",t[12]),b=!0)},p(n,[U]){if(U&891){L=Z(n[0]);let l;for(l=0;l<L.length;l+=1){const E=$(n,L,l);o[l]?o[l].p(E,U):(o[l]=x(E),o[l].c(),o[l].m(u,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=L.length}n[2]!==null?d?d.p(n,U):(d=ee(n),d.c(),d.m(s,null)):d&&(d.d(1),d=null)},i:Q,o:Q,d(n){n&&y(a),oe(o,n),d&&d.d(),b=!1,V()}}}let ue=10;function me(t,a,s){let{data:m}=a;const N=JSON.parse(m.users);let P=JSON.parse(m.images),g=P;const S=e=>{window.location.href=`/usersProfile/${e}`},_=e=>{const i=N.find(I=>I.id===e);return i?i.name:"Unknown User"},J=e=>{e.trim()?s(0,g=P.filter(i=>_(i.userId).toLowerCase().includes(e.toLowerCase())||i.name.toLowerCase().includes(e.toLowerCase()))):s(0,g=P)};let u={};const p=()=>{if(typeof window<"u"&&window.localStorage){const e=localStorage.getItem("currentUserId"),i=N.find(f=>f.id===e);if(!i){console.error("User not found");return}s(1,u={});const I=JSON.parse(localStorage.getItem("likedImages"))||[],C=i.savedImages,w=new Set(C.map(f=>`${f[3]}_${f[2]}`));I.forEach(f=>{const c=`${f.userId}_${f.imageUrl}`;s(1,u[c]=w.has(c),u)}),C.forEach(f=>{const c=`${f[3]}_${f[2]}`;s(1,u[c]=!0,u)}),b.set({})}};se(()=>{L(),p()});const b=ie(),V=e=>{if(typeof window<"u"&&window.localStorage){const i=`${e.userId}_${e.imageUrl}`,I=localStorage.getItem("currentUserId");if(N.find(C=>C.id===I),u[i]){const w=(JSON.parse(localStorage.getItem("likedImages"))||[]).filter(f=>!(f.userId===e.userId&&f.imageUrl===e.imageUrl));localStorage.setItem("likedImages",JSON.stringify(w)),s(1,u[i]=null,u)}else{const C={imageName:e.name,imageDescription:e.description,imageUrl:e.imageUrl,userId:e.userId,userName:_(e.userId)},w=JSON.parse(localStorage.getItem("likedImages"))||[];w.push(C),localStorage.setItem("likedImages",JSON.stringify(w)),s(1,u[i]=!0,u)}b.set({})}},L=()=>{try{const e=localStorage.getItem("currentUserId"),i=N.find(O=>O.id===e);if(!i){console.error("User not found");return}const C=i.savedImages.map(O=>({imageName:O[0],imageDescription:O[1],imageUrl:O[2],userId:O[3],userName:O[4]}));localStorage.setItem("likedImages",JSON.stringify(C));const w=new Set(g.map(O=>O.imageUrl)),c=(JSON.parse(localStorage.getItem("likedImages"))||[]).filter(O=>w.has(O.imageUrl));localStorage.setItem("likedImages",JSON.stringify(c)),p()}catch(e){console.error("Error loading saved images from database:",e.message)}};let o=null,d=null,n="";const U=(e,i)=>{if(d===e.imageUrl)s(3,d=null),s(4,n="transform: scale(1); z-index: 1;"),setTimeout(()=>{s(4,n="")},500);else{s(3,d=e.imageUrl);const I=window.innerWidth,C=window.innerHeight,w=i.target.getBoundingClientRect(),f=w.left+w.width/2,c=w.top+w.height/2,O=I/2-f,G=C/2-c;s(4,n=`transform: translate(${O}px, ${G}px) scale(1.4); z-index: 1;`)}},l=()=>{s(2,o=null)},E=e=>J(e.target.value),M=(e,i)=>U(e,i),z=e=>V(e),H=e=>S(e.userId);return t.$$set=e=>{"data"in e&&s(11,m=e.data)},[g,u,o,d,n,S,_,J,V,U,l,m,E,M,z,H]}class Ie extends ae{constructor(a){super(),re(this,a,me,ce,te,{data:11})}}export{Ie as component,pe as universal};
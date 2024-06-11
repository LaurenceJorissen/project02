import{s as B,n as $,e as K,o as Q,b as j,i as R}from"../chunks/scheduler.B4houzoZ.js";import{S as W,i as X,e as _,t as y,s as D,c as p,a as I,f as P,d as g,b as q,x as C,h as v,k as A,l as n,v as Y,m as Z,u as F}from"../chunks/index.DlrXzjOH.js";import{e as G}from"../chunks/each.D6YF6ztN.js";import{w as x}from"../chunks/index.CV1gxh0y.js";import{s as J}from"../chunks/supabase.DztQxiPM.js";function L(r,t,l){const o=r.slice();return o[6]=t[l],o}function N(r){let t,l,o=r[6][0]+"",m,u,c,f,s=r[6][4]+"",e,d,a,h,b,S,w,E=r[6][1]+"",U,V,z,H;return{c(){t=_("div"),l=_("h3"),m=y(o),u=D(),c=_("p"),f=y("Uploaded by: "),e=y(s),d=D(),a=_("img"),S=D(),w=_("p"),U=y(E),V=D(),this.h()},l(k){t=p(k,"DIV",{class:!0});var i=I(t);l=p(i,"H3",{});var M=I(l);m=P(M,o),M.forEach(g),u=q(i),c=p(i,"P",{});var T=I(c);f=P(T,"Uploaded by: "),e=P(T,s),T.forEach(g),d=q(i),a=p(i,"IMG",{src:!0,alt:!0}),S=q(i),w=p(i,"P",{});var O=I(w);U=P(O,E),O.forEach(g),V=q(i),i.forEach(g),this.h()},h(){j(a.src,h=r[6][2])||v(a,"src",h),v(a,"alt",b=r[6][0]),v(t,"class","image-item")},m(k,i){A(k,t,i),n(t,l),n(l,m),n(t,u),n(t,c),n(c,f),n(c,e),n(t,d),n(t,a),n(t,S),n(t,w),n(w,U),n(t,V),z||(H=Z(t,"dblclick",function(){R(r[3](r[6][3]))&&r[3](r[6][3]).apply(this,arguments)}),z=!0)},p(k,i){r=k,i&2&&o!==(o=r[6][0]+"")&&F(m,o),i&2&&s!==(s=r[6][4]+"")&&F(e,s),i&2&&!j(a.src,h=r[6][2])&&v(a,"src",h),i&2&&b!==(b=r[6][0])&&v(a,"alt",b),i&2&&E!==(E=r[6][1]+"")&&F(U,E)},d(k){k&&g(t),z=!1,H()}}}function ee(r){let t,l,o,m,u,c,f=G(r[1]),s=[];for(let e=0;e<f.length;e+=1)s[e]=N(L(r,f,e));return{c(){t=_("div"),l=_("div"),o=_("h1"),m=y("Saved images"),u=D(),c=_("div");for(let e=0;e<s.length;e+=1)s[e].c();this.h()},l(e){t=p(e,"DIV",{class:!0});var d=I(t);l=p(d,"DIV",{class:!0});var a=I(l);o=p(a,"H1",{style:!0});var h=I(o);m=P(h,"Saved images"),h.forEach(g),u=q(a),c=p(a,"DIV",{class:!0});var b=I(c);for(let S=0;S<s.length;S+=1)s[S].l(b);b.forEach(g),a.forEach(g),d.forEach(g),this.h()},h(){C(o,"font-size",r[0]+"rem"),v(c,"class","gallery"),v(l,"class","container"),v(t,"class","Saved-images")},m(e,d){A(e,t,d),n(t,l),n(l,o),n(o,m),n(l,u),n(l,c);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(c,null)},p(e,[d]){if(d&1&&C(o,"font-size",e[0]+"rem"),d&10){f=G(e[1]);let a;for(a=0;a<f.length;a+=1){const h=L(e,f,a);s[a]?s[a].p(h,d):(s[a]=N(h),s[a].c(),s[a].m(c,null))}for(;a<s.length;a+=1)s[a].d(1);s.length=f.length}},i:$,o:$,d(e){e&&g(t),Y(s,e)}}}function ae(r,t,l){let o;const m=x([]);K(r,m,e=>l(1,o=e));let u=10;const c=async()=>{try{const e=localStorage.getItem("currentUserId"),a=(JSON.parse(localStorage.getItem("likedImages"))||[]).map(h=>Object.values(h));await J.from("users").update({savedImages:a}).eq("id",e)}catch(e){console.error("Error uploading liked images to Supabase:",e.message)}},f=async()=>{try{const e=localStorage.getItem("currentUserId"),{data:d,error:a}=await J.from("users").select("savedImages").eq("id",e).single();if(a)throw a;return d.savedImages}catch(e){throw console.error("Error fetching saved images from database:",e.message),e}},s=e=>{window.location.href=`/usersProfile/${e}`};return Q(async()=>{await c();const e=await f();m.set(e),setTimeout(()=>{l(0,u=2)},500)}),[u,o,m,s]}class ie extends W{constructor(t){super(),X(this,t,ae,ee,B,{})}}export{ie as component};
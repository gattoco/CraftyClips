import{u as z,c as o,i as r,g as p,h,F as L,S as R,p as G,t as c,x as J,y as K,T as O}from"./index-SNy9RXEc.js";import{C as V}from"./List-AsCyP0NT.js";var W=c('<h2 class="text-lg font-bold mb-2">Select Clips to Add/Remove'),X=c("<div class=space-y-2>"),Y=c('<h2 class="text-lg font-bold mt-6">Clips'),Z=c('<div class="container mx-auto p-4"><div class=mb-6><h2 class="text-lg font-bold mb-2">Select a Queue</h2><select class="p-2 border rounded w-full"><option value=all>All Clips</option></select></div><div class=mb-6><input class="p-2 border rounded w-full mb-2"type=text placeholder="New Queue Name"><button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create new queue</button></div><div class=mb-6><h2 class="text-lg font-bold mb-2">Add New Clip by URL</h2><input class="p-2 border rounded w-full mb-2"type=text placeholder="Paste Twitch Clip URL"><button class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add Clip</button></div><div class=mb-6><button class="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">'),q=c("<option>"),ee=c('<div class="flex items-center space-x-2"><input type=checkbox><span>');const ie=()=>{const{state:a,setState:U}=z(),[g,v]=o(a.clipQueue??[]),[d,N]=o("all"),[C,x]=o(""),[b,k]=o(!1),[_,A]=o(""),w=e=>{if(e==="all")return a.clips;const t=g().find(l=>l.id===e);return t?t.clips.map(l=>a.clips.find(i=>i.id===l)).filter(l=>!!l):[]},F=(e,t)=>{v(l=>l.map(i=>i.id===t?{...i,clips:i.clips.includes(e)?i.clips.filter(u=>u!==e):[...i.clips,e]}:i))},T=()=>{const e=C().trim();e&&(v([...g(),{name:e,clips:[],id:J()}]),x(""))},E=async e=>{try{const t=I(e),l=await K(O.CLIPS,{id:t});l.length&&U("clips",[...a.clips,l[0]])}catch(t){console.error("Failed to fetch clip details:",t)}},I=e=>{const t=e.match(/\/clip\/(\w+)/);return t?t[1]:""};return(()=>{var e=Z(),t=e.firstChild,l=t.firstChild,i=l.nextSibling;i.firstChild;var u=t.nextSibling,m=u.firstChild,D=m.nextSibling,S=u.nextSibling,B=S.firstChild,$=B.nextSibling,P=$.nextSibling,H=S.nextSibling,y=H.firstChild;return i.addEventListener("change",n=>N(n.currentTarget.value)),r(i,p(L,{get each(){return g()},children:n=>(()=>{var s=q();return r(s,()=>n.name),h(()=>s.value=n.id),s})()}),null),m.$$input=n=>x(n.currentTarget.value),D.$$click=T,$.$$input=n=>A(n.currentTarget.value),P.$$click=()=>E(_()),y.$$click=()=>k(!b()),r(y,()=>b()?"Hide Clip Selector":"Show Clip Selector"),r(e,p(R,{get when(){return b()},get children(){return[W(),(()=>{var n=X();return r(n,p(L,{get each(){return a.clips},children:s=>(()=>{var Q=ee(),f=Q.firstChild,M=f.nextSibling;return f.addEventListener("change",()=>F(s.id,d())),r(M,()=>s.title),h(()=>f.checked=w(d()).some(j=>j.id===s.id)),Q})()})),n})()]}}),null),r(e,p(R,{get when(){return d()!==null},get children(){return[Y(),p(V,{get clips(){return w(d())}})]}}),null),h(()=>m.value=C()),h(()=>$.value=_()),e})()};G(["input","click"]);export{ie as default};

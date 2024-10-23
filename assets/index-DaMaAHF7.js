import{s as T,c as W,a as v,S as U,b as _,d as Ae,e as M,f as w,o as xe,g as Ee,h as ve,u as Te,i as x,F as ke,j as G,k as Le,t as E,l as ee}from"./index-CxIWv2we.js";import{g as ie,a as se,e as Oe,T as ae,I as Ne,F as we,b as Ue,c as Be,C as te}from"./List-CZ28nFzs.js";const Fe=100,Re=async e=>{try{await ie();const[r]=await se(ae.CLIPS,{id:e});return r}catch(r){return console.error("Error fetching Twitch data:",r),null}},Ce=async(e="985378831",r=Fe,t=void 0)=>{await ie();const[n,a]=await se(ae.CLIPS,{broadcaster_id:e,first:r},!1,t);return[await Oe(n.reverse()),a]},Me=async e=>{try{await ie();const[r]=await se(ae.USERS,{login:e});return r&&r.length>0?r[0]:null}catch(r){return console.error("Error fetching Twitch data:",r),null}};function De(e){return Ne({a:{fill:"currentColor",viewBox:"0 0 16 16"},c:'<path fill-rule="evenodd" d="M4.681 3H2V2h3.5l.5.5V6H5V4a5 5 0 1 0 4.53-.761l.302-.954A6 6 0 1 1 4.681 3z" clip-rule="evenodd"/>'},e)}function Ie(e,r,t){let n=t.length,a=r.length,i=n,s=0,l=0,d=r[a-1].nextSibling,h=null;for(;s<a||l<i;){if(r[s]===t[l]){s++,l++;continue}for(;r[a-1]===t[i-1];)a--,i--;if(a===s){const o=i<n?l?t[l-1].nextSibling:t[i-l]:d;for(;l<i;)e.insertBefore(t[l++],o)}else if(i===l)for(;s<a;)(!h||!h.has(r[s]))&&r[s].remove(),s++;else if(r[s]===t[i-1]&&t[l]===r[a-1]){const o=r[--a].nextSibling;e.insertBefore(t[l++],r[s++].nextSibling),e.insertBefore(t[--i],o),r[a]=t[i]}else{if(!h){h=new Map;let f=l;for(;f<i;)h.set(t[f],f++)}const o=h.get(r[s]);if(o!=null)if(l<o&&o<i){let f=s,m=1,p;for(;++f<a&&f<i&&!((p=h.get(r[f]))==null||p!==o+m);)m++;if(m>o-l){const B=r[s];for(;l<o;)e.insertBefore(t[l++],B)}else e.replaceChild(t[l++],r[s++])}else s++;else r[s++].remove()}}}const be="_$DX_DELEGATE";function Pe(e,r,t){const n=document.createElement("template");if(n.innerHTML=e,n.innerHTML.split("<").length-1!==r)throw`The browser resolved template HTML does not match JSX input:
${n.innerHTML}

${e}. Is your HTML properly formed?`;return n.content.firstChild}function He(e,r=window.document){const t=r[be]||(r[be]=new Set);for(let n=0,a=e.length;n<a;n++){const i=e[n];t.has(i)||(t.add(i),r.addEventListener(i,Ge))}}function Q(e,r,t){t==null?e.removeAttribute(r):e.setAttribute(r,t)}function Ve(e,r,t,n){Array.isArray(t)?(e[`$$${r}`]=t[0],e[`$$${r}Data`]=t[1]):e[`$$${r}`]=t}function me(e,r,t={}){const n=Object.keys(r||{}),a=Object.keys(t);let i,s;for(i=0,s=a.length;i<s;i++){const l=a[i];!l||l==="undefined"||r[l]||($e(e,l,!1),delete t[l])}for(i=0,s=n.length;i<s;i++){const l=n[i],d=!!r[l];!l||l==="undefined"||t[l]===d||!d||($e(e,l,!0),t[l]=d)}return t}function ye(e,r,t){if(!r)return t?Q(e,"style"):r;const n=e.style;if(typeof r=="string")return n.cssText=r;typeof t=="string"&&(n.cssText=t=void 0),t||(t={}),r||(r={});let a,i;for(i in t)r[i]==null&&n.removeProperty(i),delete t[i];for(i in r)a=r[i],a!==t[i]&&(n.setProperty(i,a),t[i]=a);return t}function je(e,r,t){return Ae(()=>e(r,t))}function re(e,r,t,n){if(t!==void 0&&!n&&(n=[]),typeof r!="function")return Y(e,r,n,t);_(a=>Y(e,r(),a,t),n)}function $e(e,r,t){const n=r.trim().split(/\s+/);for(let a=0,i=n.length;a<i;a++)e.classList.toggle(n[a],t)}function Ge(e){const r=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),T.registry&&!T.done&&(T.done=!0,document.querySelectorAll("[id^=pl-]").forEach(n=>{for(;n&&n.nodeType!==8&&n.nodeValue!=="pl-"+e;){let a=n.nextSibling;n.remove(),n=a}n&&n.remove()}));t;){const n=t[r];if(n&&!t.disabled){const a=t[`${r}Data`];if(a!==void 0?n.call(t,a,e):n.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function Y(e,r,t,n,a){for(T.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(r===t)return t;const i=typeof r,s=n!==void 0;if(e=s&&t[0]&&t[0].parentNode||e,i==="string"||i==="number"){if(T.context)return t;if(i==="number"&&(r=r.toString()),s){let l=t[0];l&&l.nodeType===3?l.data=r:l=document.createTextNode(r),t=j(e,t,n,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=r:t=e.textContent=r}else if(r==null||i==="boolean"){if(T.context)return t;t=j(e,t,n)}else{if(i==="function")return _(()=>{let l=r();for(;typeof l=="function";)l=l();t=Y(e,l,t,n)}),()=>t;if(Array.isArray(r)){const l=[],d=t&&Array.isArray(t);if(le(l,r,t,a))return _(()=>t=Y(e,l,t,n,!0)),()=>t;if(T.context){if(!l.length)return t;for(let h=0;h<l.length;h++)if(l[h].parentNode)return t=l}if(l.length===0){if(t=j(e,t,n),s)return t}else d?t.length===0?_e(e,l,n):Ie(e,t,l):(t&&j(e),_e(e,l));t=l}else if(r instanceof Node){if(T.context&&r.parentNode)return t=s?[r]:r;if(Array.isArray(t)){if(s)return t=j(e,t,n,r);j(e,t,null,r)}else t==null||t===""||!e.firstChild?e.appendChild(r):e.replaceChild(r,e.firstChild);t=r}else console.warn("Unrecognized value. Skipped inserting",r)}return t}function le(e,r,t,n){let a=!1;for(let i=0,s=r.length;i<s;i++){let l=r[i],d=t&&t[i];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))a=le(e,l,d)||a;else if(typeof l=="function")if(n){for(;typeof l=="function";)l=l();a=le(e,Array.isArray(l)?l:[l],Array.isArray(d)?d:[d])||a}else e.push(l),a=!0;else{const h=String(l);h==="<!>"?d&&d.nodeType===8&&e.push(d):d&&d.nodeType===3?(d.data=h,e.push(d)):e.push(document.createTextNode(h))}}return a}function _e(e,r,t=null){for(let n=0,a=r.length;n<a;n++)e.insertBefore(r[n],t)}function j(e,r,t,n){if(t===void 0)return e.textContent="";const a=n||document.createTextNode("");if(r.length){let i=!1;for(let s=r.length-1;s>=0;s--){const l=r[s];if(a!==l){const d=l.parentNode===e;!i&&!s?d?e.replaceChild(a,l):e.insertBefore(a,t):d&&l.remove()}else i=!0}}else e.insertBefore(a,t);return[a]}const qe="http://www.w3.org/2000/svg";function ze(e,r=!1){return r?document.createElementNS(qe,e):document.createElement(e)}function Xe(e){const{useShadow:r}=e,t=document.createTextNode(""),n=()=>e.mount||document.body,a=M(i());function i(){if(T.context){const[s,l]=w(!1);return xe(()=>l(!0)),()=>s()&&e.children}else return()=>e.children}return _(()=>{const s=n();if(s instanceof HTMLHeadElement){const[l,d]=w(!1),h=()=>d(!0);Ee(o=>re(s,()=>l()?o():a(),null)),ve(()=>{T.context?queueMicrotask(h):h()})}else{const l=ze(e.isSVG?"g":"div",e.isSVG),d=r&&l.attachShadow?l.attachShadow({mode:"open"}):l;Object.defineProperty(l,"_$host",{get(){return t.parentNode},configurable:!0}),re(d,a),s.appendChild(l),e.ref&&e.ref(l),ve(()=>s.removeChild(l))}}),t}const Je='a, button:not(:disabled), input, textarea, select, details, [tabindex]:not([tabindex="-1"])',Ke=e=>Array.from(e.querySelectorAll(Je));var ne=(e=>(e.TAB="Tab",e.ESCAPE="Escape",e))(ne||{});const We=Pe('<div role="presentation"><div aria-modal="true" tabindex="0"></div></div>',4),Qe={position:"fixed",padding:"1rem",top:"50%",left:"50%",transform:"translate(-50%, -50%)",overflow:"auto",border:"1px solid rgba(200, 200, 200, 0.5)","background-color":"white","border-radius":"1rem","max-height":"90%","max-width":"90%"},Ye={position:"fixed",inset:"0 0 0 0","background-color":"rgba(255, 255, 255, 0.5)"},Ze=e=>{let r,t,n=[];const a={"solid-modal-overlay":!0,[e.overlayClass]:!!e.overlayClass},i={"solid-modal-content":!0,[e.contentClass]:!!e.contentClass},s=o=>{n.length>1?n[0].focus():o.focus()},l=o=>{o<n.length-1?n[o+1].focus():n[0].focus()},d=o=>{o>0?n[o-1].focus():n[n.length-1].focus()};W(()=>{e.isOpen&&e.children&&r&&(n=Ke(r))}),W(()=>{e.isOpen&&r&&(t=document.activeElement,s(r))}),W(()=>{!e.isOpen&&t&&t.focus()});const h=o=>{switch(o.key){case ne.TAB:if(o.preventDefault(),document.activeElement===r&&n.length>0){o.shiftKey?n[n.length-1].focus():n[0].focus();return}const f=n.findIndex(m=>m===document.activeElement);f>-1&&(o.shiftKey?d(f):l(f));return;case ne.ESCAPE:o.stopPropagation(),e.onCloseRequest();return;default:return}};return v(Xe,{get children(){return v(U,{get when(){return e.isOpen},get children(){const o=We.cloneNode(!0),f=o.firstChild;Ve(o,"click",e.closeOnOutsideClick?e.onCloseRequest:void 0),f.$$click=p=>p.stopImmediatePropagation();const m=r;return typeof m=="function"?je(m,f):r=f,f.$$keydown=h,re(f,()=>e.children),_(p=>{const B=e.overlayClass?e.overlayStyle:{...Ye,...e.overlayStyle},X=a,D=e.ariaLabelledBy,b=e.ariaLabel,L=e.contentClass?e.contentStyle:{...Qe,...e.overlayStyle},I=i,A=e.role??"dialog";return p._v$=ye(o,B,p._v$),p._v$2=me(o,X,p._v$2),D!==p._v$3&&Q(f,"aria-labelledby",p._v$3=D),b!==p._v$4&&Q(f,"aria-label",p._v$4=b),p._v$5=ye(f,L,p._v$5),p._v$6=me(f,I,p._v$6),A!==p._v$7&&Q(f,"role",p._v$7=A),p},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0,_v$7:void 0}),o}})}})};He(["click","keydown"]);var et=E('<div class=mb-4><input type=text placeholder="Enter clip URL"class="p-2 border rounded mr-2 w-full"><button class="py-1 px-4 my-2 rounded-full bg-green-500 text-white">Search for Clip'),tt=E('<div class="flex items-center space-x-4 bg-white p-2 hover:bg-gray-200 rounded-lg"><img class="w-12 h-12 rounded-full"><div><p class=font-semibold></p></div><div class=buttons><a class="py-1 px-4 rounded-full bg-purple-500 text-white"target=_blank>View on Twitch</a><button class="py-1 px-4 rounded-full bg-green-500 text-white">'),rt=E('<div class="flex max-h-[22rem] overflow-auto">'),lt=E('<div class=mb-4><input type=text placeholder="Enter broadcaster name"class="p-2 border rounded mr-2 w-full"><button class="py-1 px-4 my-2 rounded-full bg-green-500 text-white">Search for Broadcaster'),nt=E('<div class="mb-6 relative p-4 w-[30rem]"><h2 class="font-bold mb-2">Add clips by:</h2><div class="flex items-center space-x-4 mb-4"><label><input type=radio name=type value=url class=hidden>URL</label><label><input type=radio name=type value=broadcaster class=hidden>Broadcaster'),it=E('<div>Last updated: <!> <button class="py-1 px-3 rounded-full bg-blue-500 text-white">'),st=E('<div class=mb-6><span class="font-semibold block mb-2">Filters</span><div class="flex flex-wrap items-center space-x-4"><div class="flex space-x-2"><label><input type=radio name=sort value=added_at class=hidden>Added At</label><label><input type=radio name=sort value=created_at class=hidden>Created At</label><label><input type=radio name=sort value=view_count class=hidden>View Count</label><label><input type=radio name=sort value=duration class=hidden>Duration</label></div><div><select id=gameFilter class="p-2 border rounded"><option value="">All Games</option></select></div><div class="flex space-x-2 items-center"><button class="py-1 px-3 rounded-full flex items-center space-x-2 bg-blue-500 text-white">'),at=E('<div class="container mx-auto p-4"><div class="flex justify-between items-center"><div class="flex gap-2"><h2 class="text-xl font-bold mb-4">Clips</h2><button class="py-1 px-3 rounded-full bg-blue-500 text-white">Add clips'),ot=E('<div class="flex justify-center items-center">'),ct=E("<option>"),dt=E("<span>Oldest"),ut=E("<span>Latest");const ft=()=>{const[e,r]=w(""),[t,n]=w(),[a,i]=w(""),[s,l]=w(),[d,h]=w(null),[o,f]=w(!1),[m,p]=w("url"),B=async()=>{const b=await Me(e());console.log(b),b&&n(b)},X=b=>{const L=b.split("/");return L[L.length-1]},D=async()=>{const b=await Re(X(a()));b&&l(b)};return(()=>{var b=nt(),L=b.firstChild,I=L.nextSibling,A=I.firstChild,F=A.firstChild,J=A.nextSibling,K=J.firstChild;return F.addEventListener("change",()=>{p("url"),l()}),K.addEventListener("change",()=>{p("broadcaster"),l()}),x(b,v(U,{get when(){return m()==="url"},get children(){var c=et(),u=c.firstChild,C=u.nextSibling;return u.$$input=S=>i(S.currentTarget.value),C.$$click=D,x(c,v(U,{get when(){return M(()=>!!s())()&&s().length>0},get children(){return v(te,{get clips(){return M(()=>!!s())()?[s()?.[0]]:[]},layout:"list",withButtons:["add","remove"]})}}),null),_(()=>u.value=a()),c}}),null),x(b,v(U,{get when(){return m()==="broadcaster"},get children(){var c=lt(),u=c.firstChild,C=u.nextSibling;return u.$$input=S=>r(S.currentTarget.value),C.$$click=B,x(c,v(U,{get when(){return t()},get children(){return[(()=>{var S=tt(),O=S.firstChild,y=O.nextSibling,q=y.firstChild,P=y.nextSibling,R=P.firstChild,k=R.nextSibling;return x(q,()=>t()?.display_name),k.$$click=async()=>{if(!t()?.id)return;f(!0);const[$,N]=await Ce(t()?.id);$&&(h(N),l($)),f(!1)},x(k,(()=>{var $=M(()=>!!o());return()=>$()?v(we,{class:"animate-spin text-xl"}):"Get Clips"})()),_($=>{var N=t()?.profile_image_url,z=t()?.display_name,H=`https://www.twitch.tv/${t()?.login}`;return N!==$.e&&ee(O,"src",$.e=N),z!==$.t&&ee(O,"alt",$.t=z),H!==$.a&&ee(R,"href",$.a=H),$},{e:void 0,t:void 0,a:void 0}),S})(),v(U,{get when(){return M(()=>!!s())()&&s().length>0},get children(){var S=rt();return x(S,v(te,{get clips(){return s()},layout:"list",withButtons:["add","remove"]})),S}})]}}),null),_(()=>u.value=e()),c}}),null),_(c=>{var u=`cursor-pointer py-1 px-4 rounded-full ${m()==="url"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`,C=`cursor-pointer py-1 px-4 rounded-full ${m()==="broadcaster"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`;return u!==c.e&&G(A,c.e=u),C!==c.t&&G(J,c.t=C),c},{e:void 0,t:void 0}),_(()=>F.checked=m()==="url"),_(()=>K.checked=m()==="broadcaster"),b})()},gt=()=>{const{state:e,setState:r}=Te(),[t,n]=w([]),[a,i]=w(!0),[s,l]=w("added_at"),[d,h]=w("desc"),[o,f]=w(""),[m,p]=w(!1),[B,X]=w("grid"),D=c=>{c||(c=e.clips);const u=I(c,s(),"desc");n(u),l("added_at"),h("desc"),f("")},b=async()=>{i(!0);const[c,u]=await Ce(e.broadcaster_id,50);c&&r(C=>({clipsCursor:u,clips:[...C.clips,...c],clipsUpdated:Date.now()})),A(),i(!1)},L=()=>{const u=e.clipsUpdated;return!u||Date.now()-u>36e5};xe(()=>{!e.clips.length&&L()?b():(D(),i(!1))});const I=(c,u,C)=>[...c].sort((S,O)=>{let y=0;return u==="added_at"||u==="created_at"||u==="duration"?y=new Date(S[u]).getTime()-new Date(O[u]).getTime():u==="view_count"&&(y=S.view_count-O.view_count),C==="asc"?y:-y}),A=()=>{let c=e.clips;o()&&(c=c.filter(C=>C.game_id===o()));const u=I(c,s(),d());n(u)},F=c=>{l(c),A()},J=c=>{f(c.target.value),A()},K=c=>{h(c),A()};return W(()=>{A()},[e.clips,s(),d(),o()]),(()=>{var c=at(),u=c.firstChild,C=u.firstChild,S=C.firstChild,O=S.nextSibling;return O.$$click=()=>p(!0),x(u,v(U,{get when(){return e.clipsUpdated},get children(){var y=it(),q=y.firstChild,P=q.nextSibling,R=P.nextSibling,k=R.nextSibling;return x(y,(()=>{var $=M(()=>!!e.clipsUpdated);return()=>$()?new Date(e.clipsUpdated).toLocaleString():"Never"})(),P),k.$$click=b,x(k,v(De,{})),y}}),null),x(c,v(U,{get when(){return!a()},get fallback(){return(()=>{var y=ot();return x(y,v(we,{class:"animate-spin text-3xl"})),y})()},get children(){return[(()=>{var y=st(),q=y.firstChild,P=q.nextSibling,R=P.firstChild,k=R.firstChild,$=k.firstChild,N=k.nextSibling,z=N.firstChild,H=N.nextSibling,oe=H.firstChild,ce=H.nextSibling,de=ce.firstChild,ue=R.nextSibling,Z=ue.firstChild;Z.firstChild;var Se=ue.nextSibling,fe=Se.firstChild;return $.addEventListener("change",()=>F("added_at")),z.addEventListener("change",()=>F("created_at")),oe.addEventListener("change",()=>F("view_count")),de.addEventListener("change",()=>F("duration")),Z.addEventListener("change",J),x(Z,v(ke,{get each(){return Array.from(new Map(e.clips.filter(g=>g.game?.id&&g.game?.name).map(g=>[g.game?.id,{id:g.game?.id,name:g.game?.name}])).values())},children:g=>(()=>{var V=ct();return x(V,()=>g.name),_(()=>V.value=g.id),V})()}),null),fe.$$click=()=>K(d()==="asc"?"desc":"asc"),x(fe,(()=>{var g=M(()=>d()==="asc");return()=>g()?[v(Ue,{})," ",dt()]:[v(Be,{})," ",ut()]})()),_(g=>{var V=`cursor-pointer py-1 px-3 rounded-full ${s()==="added_at"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`,pe=`cursor-pointer py-1 px-3 rounded-full ${s()==="created_at"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`,he=`cursor-pointer py-1 px-3 rounded-full ${s()==="view_count"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`,ge=`cursor-pointer py-1 px-3 rounded-full ${s()==="duration"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`;return V!==g.e&&G(k,g.e=V),pe!==g.t&&G(N,g.t=pe),he!==g.a&&G(H,g.a=he),ge!==g.o&&G(ce,g.o=ge),g},{e:void 0,t:void 0,a:void 0,o:void 0}),_(()=>$.checked=s()==="added_at"),_(()=>z.checked=s()==="created_at"),_(()=>oe.checked=s()==="view_count"),_(()=>de.checked=s()==="duration"),y})(),v(te,{get clips(){return t()},get layout(){return B()},withButtons:["visible"]})]}}),null),x(c,v(Ze,{get isOpen(){return m()},onCloseRequest:()=>p(!1),closeOnOutsideClick:!0,get children(){return v(ft,{})}}),null),c})()};Le(["input","click"]);export{gt as default};

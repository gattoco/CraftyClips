import{s as E,e as Q,b as v,S as B,a as _,f as we,g as R,c as C,o as $e,h as Ce,j as pe,u as Se,i as w,F as Ae,k as G,d as ke,t as k,l as ee}from"./index-DOlaBTxZ.js";import{b as ye,c as Ee,d as Te}from"./util-K9-qtCwY.js";import{I as Le,F as xe,a as Oe,b as Ne,C as te}from"./List-3pUVuOfe.js";import"./twitch-B1AAW--y.js";function Be(t){return Le({a:{fill:"currentColor",viewBox:"0 0 16 16"},c:'<path fill-rule="evenodd" d="M4.681 3H2V2h3.5l.5.5V6H5V4a5 5 0 1 0 4.53-.761l.302-.954A6 6 0 1 1 4.681 3z" clip-rule="evenodd"/>'},t)}function Ue(t,r,e){let n=e.length,o=r.length,s=n,i=0,l=0,d=r[o-1].nextSibling,h=null;for(;i<o||l<s;){if(r[i]===e[l]){i++,l++;continue}for(;r[o-1]===e[s-1];)o--,s--;if(o===i){const c=s<n?l?e[l-1].nextSibling:e[s-l]:d;for(;l<s;)t.insertBefore(e[l++],c)}else if(s===l)for(;i<o;)(!h||!h.has(r[i]))&&r[i].remove(),i++;else if(r[i]===e[s-1]&&e[l]===r[o-1]){const c=r[--o].nextSibling;t.insertBefore(e[l++],r[i++].nextSibling),t.insertBefore(e[--s],c),r[o]=e[s]}else{if(!h){h=new Map;let f=l;for(;f<s;)h.set(e[f],f++)}const c=h.get(r[i]);if(c!=null)if(l<c&&c<s){let f=i,$=1,p;for(;++f<o&&f<s&&!((p=h.get(r[f]))==null||p!==c+$);)$++;if($>c-l){const U=r[i];for(;l<c;)t.insertBefore(e[l++],U)}else t.replaceChild(e[l++],r[i++])}else i++;else r[i++].remove()}}}const he="_$DX_DELEGATE";function Fe(t,r,e){const n=document.createElement("template");if(n.innerHTML=t,n.innerHTML.split("<").length-1!==r)throw`The browser resolved template HTML does not match JSX input:
${n.innerHTML}

${t}. Is your HTML properly formed?`;return n.content.firstChild}function Me(t,r=window.document){const e=r[he]||(r[he]=new Set);for(let n=0,o=t.length;n<o;n++){const s=t[n];e.has(s)||(e.add(s),r.addEventListener(s,He))}}function W(t,r,e){e==null?t.removeAttribute(r):t.setAttribute(r,e)}function Re(t,r,e,n){Array.isArray(e)?(t[`$$${r}`]=e[0],t[`$$${r}Data`]=e[1]):t[`$$${r}`]=e}function ge(t,r,e={}){const n=Object.keys(r||{}),o=Object.keys(e);let s,i;for(s=0,i=o.length;s<i;s++){const l=o[s];!l||l==="undefined"||r[l]||(be(t,l,!1),delete e[l])}for(s=0,i=n.length;s<i;s++){const l=n[s],d=!!r[l];!l||l==="undefined"||e[l]===d||!d||(be(t,l,!0),e[l]=d)}return e}function ve(t,r,e){if(!r)return e?W(t,"style"):r;const n=t.style;if(typeof r=="string")return n.cssText=r;typeof e=="string"&&(n.cssText=e=void 0),e||(e={}),r||(r={});let o,s;for(s in e)r[s]==null&&n.removeProperty(s),delete e[s];for(s in r)o=r[s],o!==e[s]&&(n.setProperty(s,o),e[s]=o);return e}function De(t,r,e){return we(()=>t(r,e))}function re(t,r,e,n){if(e!==void 0&&!n&&(n=[]),typeof r!="function")return Y(t,r,n,e);_(o=>Y(t,r(),o,e),n)}function be(t,r,e){const n=r.trim().split(/\s+/);for(let o=0,s=n.length;o<s;o++)t.classList.toggle(n[o],e)}function He(t){const r=`$$${t.type}`;let e=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==e&&Object.defineProperty(t,"target",{configurable:!0,value:e}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return e||document}}),E.registry&&!E.done&&(E.done=!0,document.querySelectorAll("[id^=pl-]").forEach(n=>{for(;n&&n.nodeType!==8&&n.nodeValue!=="pl-"+t;){let o=n.nextSibling;n.remove(),n=o}n&&n.remove()}));e;){const n=e[r];if(n&&!e.disabled){const o=e[`${r}Data`];if(o!==void 0?n.call(e,o,t):n.call(e,t),t.cancelBubble)return}e=e._$host||e.parentNode||e.host}}function Y(t,r,e,n,o){for(E.context&&!e&&(e=[...t.childNodes]);typeof e=="function";)e=e();if(r===e)return e;const s=typeof r,i=n!==void 0;if(t=i&&e[0]&&e[0].parentNode||t,s==="string"||s==="number"){if(E.context)return e;if(s==="number"&&(r=r.toString()),i){let l=e[0];l&&l.nodeType===3?l.data=r:l=document.createTextNode(r),e=V(t,e,n,l)}else e!==""&&typeof e=="string"?e=t.firstChild.data=r:e=t.textContent=r}else if(r==null||s==="boolean"){if(E.context)return e;e=V(t,e,n)}else{if(s==="function")return _(()=>{let l=r();for(;typeof l=="function";)l=l();e=Y(t,l,e,n)}),()=>e;if(Array.isArray(r)){const l=[],d=e&&Array.isArray(e);if(le(l,r,e,o))return _(()=>e=Y(t,l,e,n,!0)),()=>e;if(E.context){if(!l.length)return e;for(let h=0;h<l.length;h++)if(l[h].parentNode)return e=l}if(l.length===0){if(e=V(t,e,n),i)return e}else d?e.length===0?me(t,l,n):Ue(t,e,l):(e&&V(t),me(t,l));e=l}else if(r instanceof Node){if(E.context&&r.parentNode)return e=i?[r]:r;if(Array.isArray(e)){if(i)return e=V(t,e,n,r);V(t,e,null,r)}else e==null||e===""||!t.firstChild?t.appendChild(r):t.replaceChild(r,t.firstChild);e=r}else console.warn("Unrecognized value. Skipped inserting",r)}return e}function le(t,r,e,n){let o=!1;for(let s=0,i=r.length;s<i;s++){let l=r[s],d=e&&e[s];if(l instanceof Node)t.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))o=le(t,l,d)||o;else if(typeof l=="function")if(n){for(;typeof l=="function";)l=l();o=le(t,Array.isArray(l)?l:[l],Array.isArray(d)?d:[d])||o}else t.push(l),o=!0;else{const h=String(l);h==="<!>"?d&&d.nodeType===8&&t.push(d):d&&d.nodeType===3?(d.data=h,t.push(d)):t.push(document.createTextNode(h))}}return o}function me(t,r,e=null){for(let n=0,o=r.length;n<o;n++)t.insertBefore(r[n],e)}function V(t,r,e,n){if(e===void 0)return t.textContent="";const o=n||document.createTextNode("");if(r.length){let s=!1;for(let i=r.length-1;i>=0;i--){const l=r[i];if(o!==l){const d=l.parentNode===t;!s&&!i?d?t.replaceChild(o,l):t.insertBefore(o,e):d&&l.remove()}else s=!0}}else t.insertBefore(o,e);return[o]}const Ie="http://www.w3.org/2000/svg";function Pe(t,r=!1){return r?document.createElementNS(Ie,t):document.createElement(t)}function je(t){const{useShadow:r}=t,e=document.createTextNode(""),n=()=>t.mount||document.body,o=R(s());function s(){if(E.context){const[i,l]=C(!1);return $e(()=>l(!0)),()=>i()&&t.children}else return()=>t.children}return _(()=>{const i=n();if(i instanceof HTMLHeadElement){const[l,d]=C(!1),h=()=>d(!0);Ce(c=>re(i,()=>l()?c():o(),null)),pe(()=>{E.context?queueMicrotask(h):h()})}else{const l=Pe(t.isSVG?"g":"div",t.isSVG),d=r&&l.attachShadow?l.attachShadow({mode:"open"}):l;Object.defineProperty(l,"_$host",{get(){return e.parentNode},configurable:!0}),re(d,o),i.appendChild(l),t.ref&&t.ref(l),pe(()=>i.removeChild(l))}}),e}const Ve='a, button:not(:disabled), input, textarea, select, details, [tabindex]:not([tabindex="-1"])',Ge=t=>Array.from(t.querySelectorAll(Ve));var ne=(t=>(t.TAB="Tab",t.ESCAPE="Escape",t))(ne||{});const qe=Fe('<div role="presentation"><div aria-modal="true" tabindex="0"></div></div>',4),ze={position:"fixed",padding:"1rem",top:"50%",left:"50%",transform:"translate(-50%, -50%)",overflow:"auto",border:"1px solid rgba(200, 200, 200, 0.5)","background-color":"white","border-radius":"1rem","max-height":"90%","max-width":"90%"},Xe={position:"fixed",inset:"0 0 0 0","background-color":"rgba(255, 255, 255, 0.5)"},Je=t=>{let r,e,n=[];const o={"solid-modal-overlay":!0,[t.overlayClass]:!!t.overlayClass},s={"solid-modal-content":!0,[t.contentClass]:!!t.contentClass},i=c=>{n.length>1?n[0].focus():c.focus()},l=c=>{c<n.length-1?n[c+1].focus():n[0].focus()},d=c=>{c>0?n[c-1].focus():n[n.length-1].focus()};Q(()=>{t.isOpen&&t.children&&r&&(n=Ge(r))}),Q(()=>{t.isOpen&&r&&(e=document.activeElement,i(r))}),Q(()=>{!t.isOpen&&e&&e.focus()});const h=c=>{switch(c.key){case ne.TAB:if(c.preventDefault(),document.activeElement===r&&n.length>0){c.shiftKey?n[n.length-1].focus():n[0].focus();return}const f=n.findIndex($=>$===document.activeElement);f>-1&&(c.shiftKey?d(f):l(f));return;case ne.ESCAPE:c.stopPropagation(),t.onCloseRequest();return;default:return}};return v(je,{get children(){return v(B,{get when(){return t.isOpen},get children(){const c=qe.cloneNode(!0),f=c.firstChild;Re(c,"click",t.closeOnOutsideClick?t.onCloseRequest:void 0),f.$$click=p=>p.stopImmediatePropagation();const $=r;return typeof $=="function"?De($,f):r=f,f.$$keydown=h,re(f,()=>t.children),_(p=>{const U=t.overlayClass?t.overlayStyle:{...Xe,...t.overlayStyle},X=o,D=t.ariaLabelledBy,b=t.ariaLabel,L=t.contentClass?t.contentStyle:{...ze,...t.overlayStyle},H=s,A=t.role??"dialog";return p._v$=ve(c,U,p._v$),p._v$2=ge(c,X,p._v$2),D!==p._v$3&&W(f,"aria-labelledby",p._v$3=D),b!==p._v$4&&W(f,"aria-label",p._v$4=b),p._v$5=ve(f,L,p._v$5),p._v$6=ge(f,H,p._v$6),A!==p._v$7&&W(f,"role",p._v$7=A),p},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0,_v$7:void 0}),c}})}})};Me(["click","keydown"]);var Ke=k('<div class=mb-4><input type=text placeholder="Enter clip URL"class="p-2 border rounded mr-2 w-full"><button class="py-1 px-4 my-2 rounded-full bg-green-500 text-white">Search for Clip'),Qe=k('<div class="flex items-center space-x-4 bg-white p-2 hover:bg-gray-200 rounded-lg"><img class="w-12 h-12 rounded-full"><div><p class=font-semibold></p></div><div class=buttons><a class="py-1 px-4 rounded-full bg-purple-500 text-white"target=_blank>View on Twitch</a><button class="py-1 px-4 rounded-full bg-green-500 text-white">'),We=k('<div class="flex max-h-[22rem] overflow-auto">'),Ye=k('<div class=mb-4><input type=text placeholder="Enter broadcaster name"class="p-2 border rounded mr-2 w-full"><button class="py-1 px-4 my-2 rounded-full bg-green-500 text-white">Search for Broadcaster'),Ze=k('<div class="mb-6 relative p-4 w-[30rem]"><h2 class="font-bold mb-2">Add clips by:</h2><div class="flex items-center space-x-4 mb-4"><label><input type=radio name=type value=url class=hidden>URL</label><label><input type=radio name=type value=broadcaster class=hidden>Broadcaster'),et=k('<div>Last updated: <!> <button class="py-1 px-3 rounded-full bg-blue-500 text-white">'),tt=k('<div class=mb-6><span class="font-semibold block mb-2">Filters</span><div class="flex flex-wrap items-center space-x-4"><div class="flex space-x-2"><label><input type=radio name=sort value=added_at class=hidden>Added At</label><label><input type=radio name=sort value=created_at class=hidden>Created At</label><label><input type=radio name=sort value=view_count class=hidden>View Count</label><label><input type=radio name=sort value=duration class=hidden>Duration</label></div><div><select id=gameFilter class="p-2 border rounded"><option value="">All Games</option></select></div><div class="flex space-x-2 items-center"><button class="py-1 px-3 rounded-full flex items-center space-x-2 bg-blue-500 text-white">'),rt=k('<div class="container mx-auto p-4"><div class="flex justify-between items-center"><div class="flex gap-2"><h2 class="text-xl font-bold mb-4">Clips</h2><button class="py-1 px-3 rounded-full bg-blue-500 text-white">Add clips'),lt=k('<div class="flex justify-center items-center">'),nt=k("<option>"),it=k("<span>Oldest"),st=k("<span>Latest");const ot=()=>{const[t,r]=C(""),[e,n]=C(),[o,s]=C(""),[i,l]=C(),[d,h]=C(null),[c,f]=C(!1),[$,p]=C("url"),U=async()=>{const b=await Ee(t());console.log(b),b&&n(b)},X=b=>{const L=b.split("/");return L[L.length-1]},D=async()=>{const b=await Te(X(o()));b&&l(b)};return(()=>{var b=Ze(),L=b.firstChild,H=L.nextSibling,A=H.firstChild,F=A.firstChild,J=A.nextSibling,K=J.firstChild;return F.addEventListener("change",()=>{p("url"),l()}),K.addEventListener("change",()=>{p("broadcaster"),l()}),w(b,v(B,{get when(){return $()==="url"},get children(){var a=Ke(),u=a.firstChild,S=u.nextSibling;return u.$$input=m=>s(m.currentTarget.value),S.$$click=D,w(a,v(B,{get when(){return R(()=>!!i())()&&i().length>0},get children(){return v(te,{get clips(){return R(()=>!!i())()?[i()?.[0]]:[]},layout:"list",withButtons:["add","remove"]})}}),null),_(()=>u.value=o()),a}}),null),w(b,v(B,{get when(){return $()==="broadcaster"},get children(){var a=Ye(),u=a.firstChild,S=u.nextSibling;return u.$$input=m=>r(m.currentTarget.value),S.$$click=U,w(a,v(B,{get when(){return e()},get children(){return[(()=>{var m=Qe(),O=m.firstChild,y=O.nextSibling,q=y.firstChild,I=y.nextSibling,M=I.firstChild,T=M.nextSibling;return w(q,()=>e()?.display_name),T.$$click=async()=>{if(!e()?.id)return;f(!0);const[x,N]=await ye(e()?.id);x&&(h(N),l(x)),f(!1)},w(T,(()=>{var x=R(()=>!!c());return()=>x()?v(xe,{class:"animate-spin text-xl"}):"Get Clips"})()),_(x=>{var N=e()?.profile_image_url,z=e()?.display_name,P=`https://www.twitch.tv/${e()?.login}`;return N!==x.e&&ee(O,"src",x.e=N),z!==x.t&&ee(O,"alt",x.t=z),P!==x.a&&ee(M,"href",x.a=P),x},{e:void 0,t:void 0,a:void 0}),m})(),v(B,{get when(){return R(()=>!!i())()&&i().length>0},get children(){var m=We();return w(m,v(te,{get clips(){return i()},layout:"list",withButtons:["add","remove"]})),m}})]}}),null),_(()=>u.value=t()),a}}),null),_(a=>{var u=`cursor-pointer py-1 px-4 rounded-full ${$()==="url"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`,S=`cursor-pointer py-1 px-4 rounded-full ${$()==="broadcaster"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`;return u!==a.e&&G(A,a.e=u),S!==a.t&&G(J,a.t=S),a},{e:void 0,t:void 0}),_(()=>F.checked=$()==="url"),_(()=>K.checked=$()==="broadcaster"),b})()},ft=()=>{const{state:t,setState:r}=Se(),[e,n]=C([]),[o,s]=C(!0),[i,l]=C("added_at"),[d,h]=C("desc"),[c,f]=C(""),[$,p]=C(!1),[U,X]=C("grid"),D=a=>{a||(a=t.clips);const u=H(a,i(),"desc");n(u),l("added_at"),h("desc"),f("")},b=async()=>{s(!0);const[a,u]=await ye(t.broadcaster_id,50),S=a?.filter(m=>m.thumbnail_url.includes("static-cdn.jtvnw.net"));console.log("weird clips",S),a&&r(m=>({clipsCursor:u,clips:[...m.clips,...a],clipsUpdated:Date.now()})),A(),s(!1)},L=()=>{const u=t.clipsUpdated;return!u||Date.now()-u>36e5};$e(()=>{!t.clips.length&&L()?b():(D(),s(!1))});const H=(a,u,S)=>[...a].sort((m,O)=>{let y=0;return u==="added_at"||u==="created_at"||u==="duration"?y=new Date(m[u]).getTime()-new Date(O[u]).getTime():u==="view_count"&&(y=m.view_count-O.view_count),S==="asc"?y:-y}),A=()=>{let a=t.clips;c()&&(a=a.filter(S=>S.game_id===c()));const u=H(a,i(),d());n(u)},F=a=>{l(a),A()},J=a=>{f(a.target.value),A()},K=a=>{h(a),A()};return Q(()=>{A()},[t.clips,i(),d(),c()]),(()=>{var a=rt(),u=a.firstChild,S=u.firstChild,m=S.firstChild,O=m.nextSibling;return O.$$click=()=>p(!0),w(u,v(B,{get when(){return t.clipsUpdated},get children(){var y=et(),q=y.firstChild,I=q.nextSibling,M=I.nextSibling,T=M.nextSibling;return w(y,(()=>{var x=R(()=>!!t.clipsUpdated);return()=>x()?new Date(t.clipsUpdated).toLocaleString():"Never"})(),I),T.$$click=b,w(T,v(Be,{})),y}}),null),w(a,v(B,{get when(){return!o()},get fallback(){return(()=>{var y=lt();return w(y,v(xe,{class:"animate-spin text-3xl"})),y})()},get children(){return[(()=>{var y=tt(),q=y.firstChild,I=q.nextSibling,M=I.firstChild,T=M.firstChild,x=T.firstChild,N=T.nextSibling,z=N.firstChild,P=N.nextSibling,ie=P.firstChild,se=P.nextSibling,oe=se.firstChild,ae=M.nextSibling,Z=ae.firstChild;Z.firstChild;var _e=ae.nextSibling,ce=_e.firstChild;return x.addEventListener("change",()=>F("added_at")),z.addEventListener("change",()=>F("created_at")),ie.addEventListener("change",()=>F("view_count")),oe.addEventListener("change",()=>F("duration")),Z.addEventListener("change",J),w(Z,v(Ae,{get each(){return Array.from(new Map(t.clips.filter(g=>g.game?.id&&g.game?.name).map(g=>[g.game?.id,{id:g.game?.id,name:g.game?.name}])).values())},children:g=>(()=>{var j=nt();return w(j,()=>g.name),_(()=>j.value=g.id),j})()}),null),ce.$$click=()=>K(d()==="asc"?"desc":"asc"),w(ce,(()=>{var g=R(()=>d()==="asc");return()=>g()?[v(Oe,{})," ",it()]:[v(Ne,{})," ",st()]})()),_(g=>{var j=`cursor-pointer py-1 px-3 rounded-full ${i()==="added_at"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`,de=`cursor-pointer py-1 px-3 rounded-full ${i()==="created_at"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`,ue=`cursor-pointer py-1 px-3 rounded-full ${i()==="view_count"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`,fe=`cursor-pointer py-1 px-3 rounded-full ${i()==="duration"?"bg-blue-500 text-white":"bg-gray-200 text-gray-700"}`;return j!==g.e&&G(T,g.e=j),de!==g.t&&G(N,g.t=de),ue!==g.a&&G(P,g.a=ue),fe!==g.o&&G(se,g.o=fe),g},{e:void 0,t:void 0,a:void 0,o:void 0}),_(()=>x.checked=i()==="added_at"),_(()=>z.checked=i()==="created_at"),_(()=>ie.checked=i()==="view_count"),_(()=>oe.checked=i()==="duration"),y})(),v(te,{get clips(){return e()},get layout(){return U()},withButtons:["visible"]})]}}),null),w(a,v(Je,{get isOpen(){return $()},onCloseRequest:()=>p(!1),closeOnOutsideClick:!0,get children(){return v(ot,{})}}),null),a})()};ke(["input","click"]);export{ft as default};

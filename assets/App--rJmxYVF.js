import{d,u as i,c as l,a as _,b as o,i as c,S as b,t as r}from"./index-DOlaBTxZ.js";import{f as g,a as h}from"./util-K9-qtCwY.js";import"./twitch-B1AAW--y.js";var f=r('<input type=text name=teamName placeholder="Enter team name"required>'),v=r("<button type=button>Get Team"),S=r("<div><h2></h2><button type=button>Get Streams");const T=()=>{i();const[a,n]=l(""),[s,u]=l(),p=async e=>{const t=await g(e);t&&u(t)},$=async()=>{const e=s()?.users.map(m=>m.user_login);if(!e)return;const t=await h(e);console.log(t)};return[(()=>{var e=f();return e.$$input=t=>n(t.currentTarget.value),_(()=>e.value=a()),e})(),(()=>{var e=v();return e.$$click=()=>p(a()),e})(),o(b,{get when(){return s()},get children(){var e=S(),t=e.firstChild,m=t.nextSibling;return c(t,()=>s()?.team_display_name),m.$$click=()=>$(),e}})]};d(["input","click"]);var y=r("<div>Home dashboard something soemthing<br>");const C=()=>(i(),(()=>{var a=y(),n=a.firstChild;return n.nextSibling,c(a,o(T,{}),null),a})());export{C as default};
"use strict";(self.webpackChunkevil_instagram=self.webpackChunkevil_instagram||[]).push([[917],{802:(e,s,t)=>{t.d(s,{A:()=>p});var n=t(9998),a=t(2483),l=t(7757),i=t(61),c=t(4202),r=t(3376),o=t(9313),d=t(4316),m=t(5035),u=t(6723);const p=e=>{let{hider:s,trigger:t,data:p,comheartobj:h,type:f,extra:g}=e,j=(0,l.d4)((e=>e.youryr.value)),x=(0,l.d4)((e=>e.themeyr.value)),y=(0,l.wA)(),w=(0,r.Zp)(),[v,N]=(0,a.useState)(void 0!=p.isliked?p.isliked:p.likes.map((e=>e.username)).includes(j.usrn)),[k,b]=(0,a.useState)(p.likesnum),[_,S]=(0,a.useState)(L),[C,T]=(0,a.useState)({}),[A,O]=(0,a.useState)(null),[E,J]=(0,a.useState)(!1),[P,q]=(0,a.useState)(!1),D="http://localhost:3001",L={};p.comments.map((e=>{L[e._id]=e.numlikes}));const M=e=>{const s=e.type;"diff"==e.type&&(e=e.date);const t=new Date-new Date(e),n=Math.floor(t/864e5),a=Math.floor(t%864e5/36e5),l=Math.round(t%864e5%36e5/6e4);return 0!=n?"".concat(n,"diff"==s?1==n?" DAY":" DAYS":"d"):0!=a?"diff"==s?1==a?"".concat(n," HOUR"):"".concat(a," HOURS"):"".concat(a,"h"):"diff"==s?1==l?"".concat(n," MINUTE"):"".concat(l," MINUTES"):"".concat(l,"m")};P&&(t(!1),g.deleter(!1));const R=e=>{y((0,m.gl)(e)),w("/profile/".concat(e))};return n.createPortal((0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"blurremain"}),("leftlim"==s||1==s)&&(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-right-circle-fill rightmover",viewBox:"0 0 16 16",onClick:()=>{t(!1),"explore"==f?y((0,o.s1)(!0)):"profile"==f&&y((0,d.uR)(!0))},children:(0,u.jsx)("path",{d:"M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"})}),("rightlim"==s||1==s)&&(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-circle-fill leftmover",viewBox:"0 0 16 16",onClick:()=>{t(!1),"explore"==f?y((0,o.s1)(!1)):"profile"==f&&y((0,d.uR)(!1))},children:(0,u.jsx)("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"})}),(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-x undopopup",viewBox:"0 0 16 16",onClick:()=>{t(!1)},children:(0,u.jsx)("path",{d:"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"})}),E&&(0,u.jsx)(c.A,{trigger:J,text:"this post",bold:"Delete",extra:{purpose:"delpost",thepost:p,curuser:j,setDelsuccess:q}}),(0,u.jsxs)("div",{className:"postmodal",children:[(0,u.jsx)("div",{className:"postsection",children:(0,u.jsx)("img",{src:p.img,alt:" ",className:"bigpost"})}),(0,u.jsxs)("div",{className:x?"postdetssection":"postdetssection postdetssectionnight",children:[(0,u.jsxs)("div",{className:"listdiv",children:[(0,u.jsx)("span",{className:x?"listusername":"listusername nighttextpost",onClick:()=>{R(p.username)},children:p.username}),(0,u.jsx)("img",{className:"listpfp",src:p.pfp,onClick:()=>{R(p.username)}}),j.usrn==p.username&&(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6 delpost",onClick:()=>{J(!0)},children:(0,u.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})]}),(0,u.jsx)("hr",{className:"viewpostruler"}),(0,u.jsxs)("div",{className:"secuserinp",children:[(0,u.jsx)("div",{className:"commentsection",children:(0,u.jsxs)("ul",{className:"allcomments",children:[(0,u.jsx)("li",{className:"eachcomment",children:(0,u.jsxs)("div",{className:"uppercom",children:[(0,u.jsx)("img",{className:"compfp",src:p.pfp,onClick:()=>{R(p.username)}}),(0,u.jsxs)("div",{className:"onlycom",children:[(0,u.jsx)("p",{className:x?"comandusername":"comandusername nighttextpost",onClick:()=>{R(p.username)},children:(0,u.jsxs)("span",{children:[" ",(0,u.jsx)("b",{children:p.username})," ",p.desc]})}),(0,u.jsx)("div",{className:"likeandtime",children:(0,u.jsx)("span",{className:"whenpostedbyuser",children:M(p.createdAt)})})]})]})}),p.comments.map((e=>(0,u.jsx)("li",{className:"eachcomment",children:(0,u.jsxs)("div",{className:"uppercom",children:[(0,u.jsx)("img",{className:"compfp",src:e.pfp,onClick:()=>{R(e.username)}}),(0,u.jsxs)("div",{className:"onlycom",children:[(0,u.jsx)("p",{className:x?"comandusername":"comandusername nighttextpost",onClick:()=>{R(e.username)},children:(0,u.jsxs)("span",{children:[" ",(0,u.jsxs)("b",{children:[e.username," "]}),e.thecomment]})}),(0,u.jsxs)("div",{className:"likeandtime",children:[1==_[e._id]?(0,u.jsxs)("span",{className:"comlike",children:[_[e._id]," like"]}):(0,u.jsxs)("span",{className:"comlike",children:[_[e._id]," likes"]}),(0,u.jsx)("span",{className:"whenposted",children:M(e.timeposted)})]})]}),(0,u.jsx)("div",{className:"heartdiv",children:(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",className:h[e._id]||C[e._id]?"w-6 h-6 comlikerred":x?"w-6 h-6 comliker":"w-6 h-6 comliker comlikernight",onClick:()=>{(e=>{if(C[e._id]||h[e._id]){"homepage"!=f&&"explore"!=f||(h[e._id]=!1,p.comments.filter((s=>s._id==e._id))[0].numlikes-=1),T({...C,[e._id]:!1}),_[e._id]--,S(_);let s={liker:j.usrn,commenter:e.username,commentid:e._id};fetch("".concat(D,"/posts/commentunlike/").concat(p._id),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"});const t={username:j.usrn,type:"commentlikedel",attachement:p.img,commentifany:e.thecomment};fetch("".concat(D,"/notif/rem/").concat(e.username),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"})}else{"homepage"!=f&&"explore"!=f||(h[e._id]=!0,p.comments.filter((s=>s._id==e._id))[0].numlikes+=1),T({...C,[e._id]:!0}),_[e._id]++,S(_);let s={liker:j.usrn,commenter:e.username,commentid:e._id};fetch("".concat(D,"/posts/commentlike/").concat(p._id),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"});const t={username:j.usrn,pfp:j.pfp,fullname:j.fullname,type:"commentlike",attachement:p.img,commentifany:e.thecomment,reference:p._id};fetch("".concat(D,"/notif/").concat(e.username),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"})}})(e)},children:(0,u.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"})})})]})},e._id)))]})}),(0,u.jsxs)("div",{className:x?"yourinput":"yourinput yourinputnight",children:[(0,u.jsx)("hr",{className:"inpruler"}),(0,u.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",className:v?"w-6 h-6 comlikerinpred":x?"w-6 h-6 comlikerinp":"w-6 h-6 comlikerinp comlikerinpnight",onClick:()=>{N(!v);let e={username:j.usrn,pfp:j.pfp,fullname:j.fullname};if(v){b(k-1),fetch("".concat(D,"/posts/unliked/").concat(p._id),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),credentials:"include"});const s={username:j.usrn,type:"postlikedel",attachement:p.img};if(fetch("".concat(D,"/notif/rem/").concat(p.username),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"}),"explore"==f){let e=p.likes.filter((e=>e.username!=j.usrn));p.likes=e,p.likesnum-=1}if("homepage"==f){g.action[0][p._id]--,g.actionperformer[0](g.action[0]);let e=p.likes.filter((e=>e.username!=j.usrn));p.likes=e,p.likesnum-=1,g.action[1][p._id]=!1,g.actionperformer[1](g.action[1])}}else{b(k+1),fetch("".concat(D,"/posts/liked/").concat(p._id),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),credentials:"include"});const s={username:j.usrn,type:"postlike",attachement:p.img,commentifany:null,pfp:j.pfp,fullname:j.fullname,reference:p._id};if(fetch("".concat(D,"/notif/").concat(p.username),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"}),"explore"==f&&(p.likes.push(e),p.likesnum+=1),"homepage"==f){g.action[0][p._id]++,g.actionperformer[0](g.action[0]);let e={username:j.usrn,pfp:j.pfp,fullname:j.fullname};p.likes.push(e),p.likesnum+=1,g.action[1][p._id]=!0,g.actionperformer[1](g.action[1])}}},children:(0,u.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"})}),1==k?(0,u.jsxs)("span",{className:x?"likecounterpopup":"likecounterpopup nighttextpost",children:[k," like"]}):(0,u.jsxs)("span",{className:x?"likecounterpopup":"likecounterpopup nighttextpost",children:[k," likes"]}),(0,u.jsxs)("span",{className:"timeagopopup",children:[M({date:p.createdAt,type:"diff"})," AGO"]}),(0,u.jsx)("hr",{className:"inprulertwo"}),(0,u.jsx)("input",{type:"text",value:A,placeholder:"Add a comment...",className:x?"commentadderpopup":"commentadderpopup commentadderpopupnight",onChange:e=>{(e=>{O(e.target.value)})(e)}}),(0,u.jsx)("button",{className:"commentpostbut",onClick:e=>{(async e=>{"homepage"==f&&(g.action[2][p._id]++,g.actionperformer[2](g.action[2]));let s=(0,i.A)();const t={username:j.usrn,pfp:j.pfp,thecomment:A,_id:s};"homepage"==f&&(p.comments.unshift({username:j.usrn,pfp:j.pfp,thecomment:A,_id:s,timeposted:new Date,numlikes:0,likes:[]}),_[s]=0,S(_)),"explore"!=f&&"profile"!=f||p.comments.unshift({username:j.usrn,pfp:j.pfp,thecomment:A,_id:s,timeposted:new Date,numlikes:0,likes:[]}),await fetch("".concat(D,"/posts/addcomment/").concat(p._id),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"}),O("");let n={username:j.usrn,pfp:j.pfp,fullname:j.fullname,type:"commented",attachement:p.img,commentifany:A,reference:p._id};await fetch("".concat(D,"/notif/").concat(p.username),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"include"})})()},children:"POST"})]})]})]})]})]}),document.getElementById("portal"))}},3089:(e,s,t)=>{t.r(s),t.d(s,{default:()=>A});var n=t(2483),a=t(3376),l=t(5197),i=t(7757),c=(t(6377),t(5897)),r=t(6024),o=t(3712),d=t(8107),m=t(1186),u=t(3001),p=t(3105),h=t(802),f=t(61),g=t(831),j=t(5035),x=t(6723);const y=e=>{let{refer:s}=e,t=(0,i.d4)((e=>e.followyr.value)),l=(0,i.d4)((e=>e.themeyr.value)),c=(0,i.d4)((e=>e.youryr.value)),y=(0,i.wA)(),w=(0,a.Zp)(),v="http://localhost:3001";(0,n.useEffect)((()=>{C(t.isrequested),A(t.cancelreq)}),[t]);let[N,k]=(0,n.useState)({}),[b,_]=(0,n.useState)({}),[S,C]=(0,n.useState)({}),[T,A]=(0,n.useState)({}),[O,E]=(0,n.useState)(!1),[J,P]=(0,n.useState)([]),[q,D]=(0,n.useState)(7),[L,M]=(0,n.useState)(null),[R,z]=(0,n.useState)({}),[H,F]=(0,n.useState)({}),[B,U]=(0,n.useState)({}),[I,Z]=(0,n.useState)(null),[Y,G]=(0,n.useState)({}),[V,W]=(0,n.useState)({}),[X,K]=(0,n.useState)(null),Q=(0,n.useRef)({}),$=(0,n.useRef)(null),ee=(0,n.useRef)(1),se=(0,n.useRef)(1),te=(0,n.useRef)(1);(0,n.useEffect)((()=>{!async function(){const e=await fetch("".concat(v,"/posts/nextseven/").concat(c.usrn,"?skip=0"),{credentials:"include"}),s=await e.json(),t={},n={},a={};s.map((e=>{c.following.map((s=>{s==e.userid&&k((s=>({...s,[e.userid]:!0})))})),t[e._id]=e.likesnum,e.likes.map((e=>e.username)).includes(c.usrn)&&(n[e._id]=!0),Q.current[e._id]={},e.comments.map((s=>{s.likes.includes(c.usrn)&&(Q.current[e._id][s._id]=!0)})),a[e._id]=e.comments.length})),z({...R,...t}),U({...B,...n}),W({...V,...a});for(let l=s.length-1;l>0;l--){const e=Math.floor(Math.random()*(l+1));[s[l],s[e]]=[s[e],s[l]]}P(s)}()}),[]);const ne=(0,n.useCallback)((async()=>{const e=await fetch("".concat(v,"/posts/nextseven/").concat(c.usrn,"?skip=").concat(q),{credentials:"include"}),s=await e.json(),t={},n={},a={};s.map((e=>{c.following.map((s=>{s==e.userid&&k((s=>({...s,[e.userid]:!0})))})),t[e._id]=e.likesnum,e.likes.map((e=>e.username)).includes(c.usrn)&&(n[e._id]=!0),Q.current[e._id]={},e.comments.map((s=>{s.likes.includes(c.usrn)&&(Q.current[e._id][s._id]=!0)})),a[e._id]=e.comments.length})),z((e=>({...e,...t}))),U((e=>({...e,...n}))),W((e=>({...e,...a}))),0==s.length&&M(!1),se.current=s.length,function(e){for(let s=e.length-1;s>0;s--){const t=Math.floor(Math.random()*(s+1));[e[s],e[t]]=[e[t],e[s]]}}(s),P((e=>[...e,...s])),D((e=>e+7)),M(!1),ee.current=1}),[L]);(0,n.useEffect)((()=>{const e=()=>{1==ee.current&&Math.abs(s.scrollHeight-s.clientHeight-s.scrollTop)<1&&(0!=se.current&&(ne(),M(!0),ee.current=0),0==se.current&&te.current&&(M(!0),te.current=0,setTimeout((()=>{M(!1)}),3e3)))};if(null!=s)return s.addEventListener("scroll",e),()=>{s.removeEventListener("scroll",e)}}));const ae=e=>{fetch("".concat(v,"/users/follow/").concat(e.username),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c.usrn}),credentials:"include"});const s={username:c.usrn,type:"followreq",attachement:null,commentifany:null,pfp:c.pfp,fullname:c.fullname,reference:null};fetch("".concat(v,"/notif/").concat(e.username),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"}),C((s=>({...s,[e.userid]:!0}))),A((s=>({...s,[e.userid]:!0})))};(0,n.useEffect)((()=>{y((0,g.lD)({isrequested:S,cancelreq:T}))}),[S]);const le=e=>{Z(!0),$.current={post:e,postid:e._id}},ie=e=>{y((0,j.gl)(e)),w("/profile/".concat(e))};return(0,x.jsxs)(x.Fragment,{children:[I&&(0,x.jsx)(h.A,{trigger:Z,data:$.current.post,comheartobj:Q.current[$.current.postid],type:"homepage",extra:{actionperformer:[z,U,W,K,E],action:[R,B,V,null,O]}}),J.map((e=>(0,x.jsx)("div",{className:e.desc.length<68?l?"sharecomp":"sharecompnight":l?"sharecomplong":"sharecomplongnight",children:(0,x.jsxs)("div",{className:"sharecontainer",children:[(0,x.jsxs)("div",{className:"shareheader",children:[(0,x.jsx)("img",{className:l?"homepagefeedpfps":"homepagefeedpfpsnight",src:e.pfp,onClick:()=>{ie(e.username)}}),(0,x.jsx)("span",{className:l?"homepagefeedusername":"homepagefeedusernamenight",onClick:()=>{ie(e.username)},children:e.username}),!N[e.userid]&&(0,x.jsx)("button",{className:T[e.userid]?"blue_follow_buttonheadhidden":"blue_follow_buttonhead",onClick:()=>{ae(e)},children:"Follow "}),!N[e.userid]&&(0,x.jsx)(u.A,{className:T[e.userid]?"justplusheadhidden":"justplushead",onClick:()=>{ae(e)}}),!N[e.userid]&&(0,x.jsx)("button",{className:S[e.userid]?"silver_requested_buttonhead":"silver_requested_buttonheadhidden",onClick:()=>{(e=>{const s={username:c.usrn,type:"followreqdel"};fetch("".concat(v,"/notif/rem/").concat(e.username),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"}),fetch("".concat(v,"/users/followcancel/").concat(e.username),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c.usrn}),credentials:"include"}),C((s=>({...s,[e.userid]:!1}))),A((s=>({...s,[e.userid]:!1})))})(e)},children:"Requested "})]}),(0,x.jsx)("div",{className:"postcontainer",children:(0,x.jsx)("img",{className:"thepost",src:e.img,alt:"",onDoubleClick:()=>{le(e)}})}),(0,x.jsx)("div",{className:"sharefooter",children:(0,x.jsxs)("div",{className:"shareoptions",children:[(0,x.jsx)("div",{className:"shareoption",children:(0,x.jsx)(r.A,{fontSize:"large",className:B[e._id]||H[e._id]?"likeiconrede":l?"likeicone":"likeiconenight",onClick:()=>{(e=>{let s={username:c.usrn,pfp:c.pfp,fullname:c.fullname};if(e.likes.push(s),e.likesnum+=1,H[e._id]||B[e._id]){R[e._id]--,z(R),B[e._id]=!1,U(B),F({...H,[e._id]:!1}),fetch("".concat(v,"/posts/unliked/").concat(e._id),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"});const t={username:c.usrn,type:"postlikedel",attachement:e.img};fetch("".concat(v,"/notif/rem/").concat(e.username),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"})}else{R[e._id]++,z(R),F({...H,[e._id]:!0}),fetch("".concat(v,"/posts/liked/").concat(e._id),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"});const t={username:c.usrn,type:"postlike",attachement:e.img,commentifany:null,pfp:c.pfp,fullname:c.fullname,reference:e._id};fetch("".concat(v,"/notif/").concat(e.username),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"})}})(e)}})}),(0,x.jsx)("div",{className:"shareoption",children:(0,x.jsx)(o.A,{fontSize:"large",className:l?"commenticone":"commenticonenight",onClick:()=>{var s;s=e._id,b[s]=!0,_({...b})}})}),(0,x.jsx)("div",{className:"postdesc",children:(0,x.jsx)("span",{className:l?"desce":"descenight",children:e.desc.length<130?e.desc:"".concat(e.desc.substring(0,130),"...")})}),1!=R[e._id]&&(0,x.jsxs)("span",{className:e.desc.length<68?"numlikes":"numlikeslong",children:[R[e._id]," likes"]}),1==R[e._id]&&(0,x.jsxs)("span",{className:e.desc.length<68?"numlikes":"numlikeslong",children:[R[e._id]," like"]}),(0,x.jsx)("span",{className:0==V[e._id]?e.desc.length<68?"numcommentszero":"numcommentszerolong":e.desc.length<68?"numcomments":"numcommentslong",onClick:()=>{le(e)},children:0==V[e._id]?"No comments":1==V[e._id]?" view 1 comment":"View all ".concat(V[e._id]," comments")}),(0,x.jsx)("span",{className:e.desc.length<68?"dateposted":"datepostedlong",children:(0,p.Ay)(e.createdAt).substring(4,15)}),(0,x.jsx)("input",{value:Y[e._id],type:"text",className:b[e._id]?l?"addcomment":"addcommentnight":"addcommenthidden",placeholder:"Add a comment...",onChange:s=>{((e,s)=>{Y[s]=e.target.value,G({...Y})})(s,e._id)}}),(0,x.jsx)(d.A,{fontSize:"large",className:b[e._id]?"sendericon":"sendericonhidden",onClick:()=>{(async e=>{let s=(0,f.A)();const t={username:c.usrn,pfp:c.pfp,thecomment:Y[e._id],_id:s};e.comments.unshift({likes:[],numlikes:0,pfp:c.pfp,thecomment:Y[e._id],timeposted:new Date,username:c.usrn,_id:s}),await fetch("".concat(v,"/posts/addcomment/").concat(e._id),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"});let n={username:c.usrn,pfp:c.pfp,fullname:c.fullname,type:"commented",attachement:e.img,commentifany:Y[e._id],reference:e._id};Y[e._id]="",G({...Y}),V[e._id]+=1,W({...V}),await fetch("".concat(v,"/notif/").concat(e.username),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"include"})})(e)}}),(0,x.jsx)(m.A,{fontSize:"large",className:b[e._id]?"cancelcommenticon":"cancelcommenticonhidden",onClick:()=>{var s;s=e._id,b[s]=!1,_(b),Y[s]="",G({...Y})}})]})})]})},e._id))),L&&(0,x.jsx)("div",{className:"loadingmoreposts"})]})},w=e=>{let{refer:s}=e;return(0,x.jsx)("div",{className:"feedpane",children:(0,x.jsx)(y,{refer:s})})};var v=t(6854);const N=()=>{let[e,s]=(0,n.useState)([]),[t,l]=(0,n.useState)({}),[c,r]=(0,n.useState)({}),[o,d]=(0,n.useState)(!1),m=(0,i.d4)((e=>e.followyr.value)),p=(0,i.d4)((e=>e.themeyr.value)),h=(0,i.d4)((e=>e.youryr.value)),f=(0,n.useRef)(!1),y=(0,i.wA)(),w=(0,a.Zp)(),N="http://localhost:3001";(0,n.useEffect)((()=>{l(m.isrequested),r(m.cancelreq)}),[m]);const k=e=>{fetch("".concat(N,"/users/follow/").concat(e.usr),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:h.usrn}),credentials:"include"});const s={username:h.usrn,type:"followreq",attachement:null,commentifany:null,pfp:h.pfp,fullname:h.fullname,reference:null};fetch("".concat(N,"/notif/").concat(e.usr),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"}),l((s=>({...s,[e.id]:!0}))),r((s=>({...s,[e.id]:!0})))};(0,n.useEffect)((()=>{y((0,g.lD)({isrequested:t,cancelreq:c}))}),[t]);(0,n.useEffect)((()=>{0!=h.userid.length&&0==f.current&&(!async function(){const e=await fetch("".concat(N,"/users/getall"),{credentials:"include"});let t=(await e.json()).filter((e=>{for(let s=0;s<h.following.length;s++)if(e.id==h.following[s])return!1;return e.id!=h.userid}));for(let s=t.length-1;s>0;s--){const e=Math.floor(Math.random()*(s+1));[t[s],t[e]]=[t[e],t[s]]}t=t.slice(0,5),s(t),d(!0)}(),f.current=!0)}),[h]);const b=e=>{y((0,j.gl)(e)),w("/profile/".concat(e))};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{className:"sidepaincont1",children:[(0,x.jsx)("span",{className:p?"sugge":"suggenight",children:"Suggested for you"}),(0,x.jsx)("ul",{className:"followusers",children:o?e.map((e=>(0,x.jsx)("li",{className:"userlistitem",children:(0,x.jsxs)("div",{className:"listdiv",children:[(0,x.jsx)("span",{className:p?"listusernameshorte":"listusernameshortenight",onClick:()=>{b(e.usr)},children:e.usr}),(0,x.jsx)("span",{className:p?"listfnameshorte":"listfnameshortenight",onClick:()=>{b(e.usr)},children:e.fname}),(0,x.jsx)("img",{className:"listpfpsp",src:e.pfp,onClick:()=>{b(e.usr)}}),(0,x.jsx)("button",{className:c[e.id]?"blue_follow_buttonhidden":"blue_follow_button",onClick:()=>{k(e)},children:"Follow "}),(0,x.jsx)(u.A,{className:c[e.id]?"justplushidden":"justplus",onClick:()=>{k(e)}}),(0,x.jsx)("button",{className:t[e.id]?"silver_requested_button":"silver_requested_buttonhidden",onClick:()=>{(e=>{const s={username:h.usrn,type:"followreqdel"};fetch("".concat(N,"/notif/rem/").concat(e.usr),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"}),fetch("".concat(N,"/users/followcancel/").concat(e.usr),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:h.usrn}),credentials:"include"}),l((s=>({...s,[e.id]:!1}))),r((s=>({...s,[e.id]:!1})))})(e)},children:"Requested "})]})},e.id))):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{className:"falsesuggestions",children:[(0,x.jsxs)("div",{className:"eachfalsesugg",children:[(0,x.jsx)("div",{className:"falsesuggcircle",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesuggusername",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesugguserfname",children:(0,x.jsx)(v.A,{})})]}),(0,x.jsxs)("div",{className:"eachfalsesugg",children:[(0,x.jsx)("div",{className:"falsesuggcircle",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesuggusername",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesugguserfname",children:(0,x.jsx)(v.A,{})})]}),(0,x.jsxs)("div",{className:"eachfalsesugg",children:[(0,x.jsx)("div",{className:"falsesuggcircle",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesuggusername",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesugguserfname",children:(0,x.jsx)(v.A,{})})]}),(0,x.jsxs)("div",{className:"eachfalsesugg",children:[(0,x.jsx)("div",{className:"falsesuggcircle",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesuggusername",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesugguserfname",children:(0,x.jsx)(v.A,{})})]}),(0,x.jsxs)("div",{className:"eachfalsesugg",children:[(0,x.jsx)("div",{className:"falsesuggcircle",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesuggusername",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsesugguserfname",children:(0,x.jsx)(v.A,{})})]})]})})})]})})};var k=t(8892),b=t(8487),_=t(8840),S=t(9998),C=t(3837);const T=e=>{let{trigger:s,changes:t,current:a}=e,[l,c]=(0,n.useState)(!1),[r,o]=(0,n.useState)(!1),[d,m]=(0,n.useState)(!1),[u,p]=(0,n.useState)(!1),[h,f]=(0,n.useState)(!1),[g,j]=(0,n.useState)(!0),[y,w]=(0,n.useState)({type:"private",thepost:null}),v=(0,i.d4)((e=>e.themeyr.value)),N=(0,i.d4)((e=>e.youryr.value)),k="http://localhost:3001";const b=async e=>{e.preventDefault();const n=await fetch("".concat(k,"/story/create/").concat(N.usrn),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(y),credentials:"include"});if("compression required"===await n.json()){const e=await(l=y.thepost,i=3200,c=3200,new Promise(((e,s)=>{const t=document.createElement("canvas");t.width=i,t.height=c;let n=t.getContext("2d"),a=document.createElement("img");a.src=l,a.onload=function(){n.scale(i/a.width,c/a.height),n.drawImage(a,0,0),e(t.toDataURL())}})));let n={type:y.type,thepost:e};const r=await fetch("".concat(k,"/story/create/").concat(N.usrn),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"include"});"compression required"===await r.json()?(p(!0),setTimeout((()=>{p(!1)}),2e3)):(o(!0),setTimeout((()=>{s(!1),o(!1),t(!a)}),5e3))}else o(!0),setTimeout((()=>{s(!1),o(!1),t(!a)}),5e3);var l,i,c};return S.createPortal((0,x.jsxs)(x.Fragment,{children:[r&&(0,x.jsx)(C.A,{trigger:o}),(0,x.jsx)("div",{className:"blurremains"}),(0,x.jsxs)("div",{className:d?v?"storyformbig":"storyformbig nightbgstory":v?"storyform":"storyform nightbgstory",children:[(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",className:v?"w-6 h-6 cancelspost":"w-6 h-6 cancelspost nighttextstory",onClick:()=>{s(!1)},children:(0,x.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})}),(0,x.jsx)("h1",{className:v?"theheading":"theheading nighttextstory",children:"post a story"}),(0,x.jsxs)("form",{id:"form",children:[(0,x.jsx)("span",{className:v?"typelabel":"typelabel nighttextstory ",children:"select story type"}),(0,x.jsxs)("select",{name:"storytype",id:v?"storytype":"storytypenight",onChange:e=>{(e=>{let s=e.target.value;w({...y,type:s}),c(!l)})(e)},children:[(0,x.jsx)("option",{value:"private",children:"private"}),(0,x.jsx)("option",{value:"public",children:"public"})]}),u&&(0,x.jsx)("span",{className:"fallbackimg",children:"please select a smaller image"}),h&&(0,x.jsx)("span",{className:"wrongextension",children:"please select .jpg , .jpeg , .png or .webp files only"}),(0,x.jsx)("div",{className:"input-groups",children:(0,x.jsxs)("div",{className:v?"hiders":"hiders hidersnight",children:["choose an image",(0,x.jsx)("input",{id:"filess",onChange:e=>{(e=>{if(void 0!=e.target.files[0]){c(!l);const s=new FileReader;let t=e.target.files[0].name.split(".").pop();if("jpg"!=t&&"jpeg"!=t&&"png"!=t&&"webp"!=t)return j(!1),f(!0),m(!1),void setTimeout((()=>{f(!1)}),5e3);j(!0),s.readAsDataURL(e.target.files[0]),s.onload=()=>{w({...y,thepost:s.result})},s.onerror=e=>{console.log(e)},m(!0)}})(e)},name:"thepost",type:"file"})]})}),g&&y.thepost&&(0,x.jsx)("button",{className:"submits",onClick:e=>{b(e)},children:"post"})]})]})]}),document.getElementById("portal"))},A=()=>{let[e,s]=(0,n.useState)(!0),[t,r]=(0,n.useState)(null),[o,d]=(0,n.useState)(null),[m,u]=(0,n.useState)(null),[p,h]=(0,n.useState)(null),[f,g]=(0,n.useState)(null),[j,y]=(0,n.useState)(null),[S,C]=(0,n.useState)(!1),[A,O]=(0,n.useState)(!1),E=(0,n.useRef)(null),J=(0,n.useRef)([]),P=(0,n.useRef)(null),q=(0,n.useRef)({verdict:!1,val:null}),D=(0,i.d4)((e=>e.youryr.value)),L=(0,i.d4)((e=>e.themeyr.value)),M=(0,a.Zp)(),R=(0,i.wA)(),z="http://localhost:3001";(0,n.useEffect)((()=>{!async function(){const e=await fetch("".concat(z,"/welcome"),{credentials:"include"}),s=await e.json();if("auth failed"!==s){r(s.username),h(s.profpic);let e,t={username:s.username,fname:s.fname,gender:s.gender,bio:s.bio,acctype:s.acctype,profpic:s.profpic,email:s.emailID};R((0,_.LS)(t)),e=0==s.userstory.length?{pfp:s.profpic,usrn:s.username,email:s.emailID,fullname:s.fname,userid:s.userid,following:s.following,blocked:s.blocklist,story:!1,acctype:s.acctype}:{pfp:s.profpic,usrn:s.username,email:s.emailID,fullname:s.fname,userid:s.userid,following:s.following,blocked:s.blocklist,story:!0,acctype:s.acctype},R((0,l.XG)(e)),0!=s.userstory&&(q.current={verdict:!0,val:s.userstory},y(s.userstory))}else M("/",{replace:!0});null!=t&&fetch("".concat(z,"/stories"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t}),credentials:"include"}).then((e=>e.json())).then((e=>{let s=e.array.map((e=>e[2]));q.current.verdict?(s.unshift(q.current.val),q.current={verdict:!1,val:"furtherprocess"}):s.unshift(null),g(s),e.array.unshift([p,t]);let n=-1,a=e.array.map((e=>(e[1].length>15&&(e[1]=e[1].substring(0,13)+".."),n+=1,[e[0],e[1],n]))),l=[];!async function(){for(let s=1;s<a.length;s++){const e=await fetch("".concat(z,"/colorchecker/").concat(a[s][1]),{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t})});await e.json()||l.push(a[s][1])}J.current=l;let e=[];for(let t=0;t<a.length;t++){if(null==s[t])continue;const n=s[t].map((e=>({img:e.thepost,time:e.timeposted})));let l={name:a[t][1],pfp:a[t][0],thepost:n,num:n.length};e.push(l)}let n=[],i=[];for(let s=1;s<a.length;s++)J.current.includes(a[s][1])?(n.unshift(a[s]),i.unshift(a[s])):(n.push(a[s]),i.push(a[s]));null!=q.current.val&&i.unshift(a[0]),n.unshift(a[0]);let c=[];for(let s=0;s<i.length;s++){let t=i[s][1],n=e.filter((e=>e.name==t));c.push(n[0])}a=i,e=c;let r={trimarr:a,totalstory:e,iscolorful:l};R((0,b.Pl)(r)),d(n),u(!0)}()})).catch((e=>{console.log(e)}))}()}),[t,A]);return console.log(P.current),(0,x.jsx)(x.Fragment,{children:e&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.A,{caller:"welcomepage",extra:null}),S&&(0,x.jsx)(T,{trigger:C,changes:O,current:A}),(0,x.jsxs)("div",{className:L?"hpagecontainer":"hpagecontainernight",children:[(0,x.jsx)("div",{className:"leftpain",children:(0,x.jsx)(k.A,{parent:"homepage"})}),(0,x.jsxs)("div",{ref:P,className:"topdown",children:[(0,x.jsx)("div",{id:"storyscroll",className:L?"tw-overflow-x-auto tw-flex tw-border tw-border-black tw-border-solid":"tw-overflow-x-auto tw-flex tw-border tw-border-white tw-border-solid",ref:E,children:m?o.map((e=>(0,x.jsxs)("div",{className:"tw-pl-0.4",children:[(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",className:"w-6 h-6 plusc",onClick:()=>{C(!0)},children:(0,x.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,x.jsx)("div",{id:e[1]==t?null==j?"qwertyold":L?"qwertynew":"qwertynewnight":J.current.includes(e[1])?L?"qwertynew":"qwertynewnight":"qwertyold",className:L?" tw-cursor-pointer tw-p-1 tw-bg-white tw-m-2.5 tw-overflow-hidden tw-border-solid tw-border-black-800 tw-border-2 tw-rounded-full":"tw-cursor-pointer tw-p-1 tw-bg-black tw-m-2.5 tw-overflow-hidden tw-border-solid tw-border-white-800 tw-border-2 tw-rounded-full",onClick:()=>{((e,s,n)=>{if(e!=t||null!=j){let s="multiple",t="none";M("/stories/".concat(e,"/").concat(s,"/").concat(t))}})(e[1],e[0],e[2])},children:(0,x.jsx)("img",{src:e[0],className:"storylanepfp"})}),(0,x.jsx)("div",{className:"tw-flex tw-justify-center tw-items-center ",children:(0,x.jsx)("label",{className:L?" tw-w-28 tw-h-6 tw-overflow-hidden tw-text-center":" tw-w-28 tw-h-6 tw-text-white tw-overflow-hidden tw-text-center",children:e[1]==t?"You":e[1]})})]},e[1]))):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"falsestory",children:[(0,x.jsx)("div",{className:"falsestorycircle",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsestoryposter",children:(0,x.jsx)(v.A,{})})]}),(0,x.jsxs)("div",{className:"falsestory",children:[(0,x.jsx)("div",{className:"falsestorycircle",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsestoryposter",children:(0,x.jsx)(v.A,{})})]}),(0,x.jsxs)("div",{className:"falsestory",children:[(0,x.jsx)("div",{className:"falsestorycircle",children:(0,x.jsx)(v.A,{})}),(0,x.jsx)("div",{className:"falsestoryposter",children:(0,x.jsx)(v.A,{})})]})]})}),0!=D.userid.length&&(0,x.jsx)(w,{refer:P.current})]}),(0,x.jsx)("div",{className:"sidepane",children:(0,x.jsx)(N,{})})]})]})})}}}]);
//# sourceMappingURL=917.52b25256.chunk.js.map
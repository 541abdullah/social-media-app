"use strict";(self.webpackChunkevil_instagram=self.webpackChunkevil_instagram||[]).push([[182],{7527:(e,t,s)=>{s.r(t),s.d(t,{default:()=>w});var l=s(5897),a=s(8892),r=s(2483),n=s(7757),d=s(5237),i=s(3837),c=s(3376),o=s(4511),u=s(831),h=s(8840),m=s(6585),p=s(3057),v=s(4316),x=s(9313),f=s(8025),g=s(5035),b=s(8607),j=s(8487),N=s(5197),S=s(5846),y=s(1003),A=s(6723);const w=()=>{var e;let t=(0,n.d4)((e=>e.youryr.value)),s=(0,n.d4)((e=>e.settingdefault.value)),w=(0,n.d4)((e=>e.themeyr.value)),[C,z]=(0,r.useState)(null===(e=s.bio)||void 0===e?void 0:e.length),[M,k]=(0,r.useState)(null===s||void 0===s?void 0:s.email),[E,P]=(0,r.useState)(null===s||void 0===s?void 0:s.acctype),[T,L]=(0,r.useState)(null===s||void 0===s?void 0:s.acctype),[D,H]=(0,r.useState)(null===s||void 0===s?void 0:s.bio),[_,R]=(0,r.useState)(null===s||void 0===s?void 0:s.gender),[J,V]=(0,r.useState)(null===s||void 0===s?void 0:s.fname),[F,I]=(0,r.useState)(null===s||void 0===s?void 0:s.username),[O,G]=(0,r.useState)(null===s||void 0===s?void 0:s.profpic),[$,q]=(0,r.useState)(null),[U,Z]=(0,r.useState)(null),[B,X]=(0,r.useState)(null),[K,Q]=(0,r.useState)(null),[W,Y]=(0,r.useState)(null),[ee,te]=(0,r.useState)(!1),[se,le]=(0,r.useState)(!1),[ae,re]=(0,r.useState)(!1),[ne,de]=(0,r.useState)(!1),[ie,ce]=(0,r.useState)(!1),[oe,ue]=(0,r.useState)(!1),[he,me]=(0,r.useState)(!1),[pe,ve]=(0,r.useState)(!1),[xe,fe]=(0,r.useState)(!1),[ge,be]=(0,r.useState)(!1),[je,Ne]=(0,r.useState)(!1),[Se,ye]=(0,r.useState)(!1),[Ae,we]=(0,r.useState)(!1),[Ce,ze]=(0,r.useState)([]),[Me,ke]=(0,r.useState)(!1),Ee=(0,r.useRef)(null),Pe=(0,r.useRef)(null),Te=(0,c.Zp)(),Le=(0,n.wA)(),De="http://localhost:3001";(0,r.useEffect)((()=>{ze(["Male","Female","Rather not say"].filter((e=>e!=_)))}),[]);const He=e=>{L(e)},_e=e=>{X(e.target.value),Ne(!1)};(0,r.useEffect)((()=>{ee&&(oe&&ie&&ae&&se&&ne?""==W?(fe(!0),ve(!1),Pe.current.style.border="rgb(220 38 38) solid 2px"):W!=K?(fe(!1),ve(!0),Pe.current.style.border="rgb(220 38 38) solid 2px"):W==K&&(be(!1),ve(!1),fe(!1),Pe.current.style.border="rgb(46 138 61) solid 2px",Y(W)):(be(!0),fe(!1),ve(!1),Pe.current.style.border="rgb(220 38 38) solid 2px"))}),[Se,W]),(0,r.useEffect)((()=>{we(!(K==W&&(ae&&se&&ie&&oe&&ne||!he)))}),[K,W]);return(0,A.jsxs)(A.Fragment,{children:[Me&&(0,A.jsx)(i.A,{trigger:ke}),(0,A.jsx)(l.A,{caller:"settings",extra:null}),(0,A.jsxs)("div",{className:w?"mainform":" mainform mainformnight",children:[(0,A.jsx)("div",{className:"formleftpain",children:(0,A.jsx)(a.A,{parent:"explore"})}),(0,A.jsx)("div",{className:w?"formpart":"formpartnight",children:(0,A.jsxs)("div",{className:"innerform",children:[(0,A.jsx)("span",{className:w?"heading":"headingnight",children:"Edit Profile"}),(0,A.jsx)("span",{className:w?"usernameform":"usernameform persondetsdark",children:F}),(0,A.jsx)("img",{className:w?"pfpform":"pfpform persondetsdark",src:O}),(0,A.jsxs)("button",{className:w?"pfpchanger":"pfpchangernight",children:["change profile picture ",(0,A.jsx)("input",{name:"thepost",id:"filess",onChange:e=>{(e=>{const t=new FileReader;t.readAsDataURL(e.target.files[0]),t.onload=()=>{G(t.result),async function(){await fetch("".concat(De,"/detschange/changepfp/").concat(F),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({newpfp:t.result}),credentials:"include"})}()},t.onerror=e=>{}})(e)},type:"file"})," "]}),(0,A.jsxs)("form",{action:"",className:"formdets",children:[(0,A.jsxs)("div",{className:"formelememail",children:[(0,A.jsx)("label",{className:w?"emaillabel":"emaillabel persondetsdark",for:w?"email":"emailnight",children:"Email ID"}),(0,A.jsx)("input",{type:"text",id:w?"email":"emailnight",placeholder:M,disabled:!0})]}),(0,A.jsxs)("div",{className:"formelemname",children:[(0,A.jsx)("label",{className:w?"namelabel":"namelabel persondetsdark",for:w?"name":"namenight",children:"Name"}),(0,A.jsx)("input",{type:"text",id:w?"name":"namenight",placeholder:J,onChange:e=>{(e=>{0==e.target.value.length?q(null):q(e.target.value)})(e)}})]}),(0,A.jsxs)("div",{className:"formelembio",children:[(0,A.jsx)("label",{className:w?"biolabel":"biolabel persondetsdark",for:w?"bio":"bionight",children:"Bio"}),(0,A.jsxs)("div",{className:"biocounter",children:[(0,A.jsx)("textarea",{id:w?"bio":"bionight",maxLength:"70",className:"biochanger",onChange:e=>{(e=>{let t=e.target.value.length;z(t),0==e.target.value.length?(z(s.bio.length),Z(null)):Z(e.target.value)})(e)},placeholder:D}),(0,A.jsxs)("span",{className:w?"lencounter":"lencounternight",children:[C,"/70"]})]})]}),(0,A.jsxs)("div",{className:"formelempass",children:[(0,A.jsx)("label",{className:w?"passwordlabel":"passwordlabel persondetsdark",for:w?"pword":"pwordnight",children:"Change Password"}),(0,A.jsx)("input",{type:"text",id:w?"pword":"pwordnight",ref:Ee,onChange:e=>{(e=>{null!=W&&ye(!Se),0!=e.target.value.length?(te(!0),Q(e.target.value),(e=>{me(!0);let t=e,s=!0;/[A-Z]/.test(t)?ce(!0):(ce(!1),s=!1),/[a-z]/.test(t)?ue(!0):(ue(!1),s=!1),/[0-9]/.test(t)?le(!0):(le(!1),s=!1),/.{8,}/.test(t)?re(!0):(re(!1),s=!1),/[!@#$%^&*_]/.test(t)?de(!0):(de(!1),s=!1),s?(be(!1),Ee.current.style.border="rgb(46 138 61) solid 2px",null!=Pe.current&&(Pe.current.style.border="rgb(0 0 0) solid 2px")):Ee.current.style.border="rgb(220 38 38) solid 2px",""==t&&(ce(!1),de(!1),re(!1),le(!1),ue(!1),me(!1),Ee.current.style.border="rgb(0 0 0) solid 2px")})(e.target.value)):(te(!1),fe(!1),ve(!1),be(!1),me(!1),Q(null),Y(null),Ee.current.style.border="rgb(0 0 0) solid 2px")})(e)}})]}),he&&(0,A.jsx)(d.A,{nosymbol:ne,noeight:ae,nonum:se,nolowerletter:oe,noupperletter:ie,loc:!1}),ee&&(0,A.jsxs)("div",{className:ae&&se&&ie&&oe&&ne||!he?"formelemrepassvalid":"formelemrepass",children:[(0,A.jsx)("label",{className:w?"repasswordlabel":"repasswordlabel persondetsdark",for:w?"repassword":"repasswordnight",children:"Re-enter new Password"}),(0,A.jsx)("input",{type:"text",id:w?"repassword":"repasswordnight",ref:Pe,onChange:e=>{Y(e.target.value)}})]}),xe&&(0,A.jsx)("p",{className:ae&&se&&ie&&oe&&ne||!he?" tw-text-red-600 repassredtextvalid":" tw-text-red-600 repassredtext",children:"*please re-enter the new password"}),pe&&(0,A.jsx)("p",{className:ae&&se&&ie&&oe&&ne||!he?" tw-text-red-600 repassredtextvalid":" tw-text-red-600 repassredtext",children:"*passwords do not match"}),ge&&(0,A.jsx)("p",{className:ae&&se&&ie&&oe&&ne||!he?" tw-text-red-600 repassredtextvalid":" tw-text-red-600 repassredtext",children:"*please enter a valid password above"}),(0,A.jsxs)("div",{className:"radioboxes",children:[(0,A.jsx)("span",{className:w?"accstatus":" accstatus persondetsdark",children:"Account status "}),(0,A.jsxs)("div",{className:w?"formelempriv":"formelemprivnight",children:[(0,A.jsx)("label",{for:"private",children:(0,A.jsx)("b",{children:"private"})}),(0,A.jsx)("input",{className:"radbuts",type:"radio",id:"private",name:"acctype",checked:"Private"==T,onClick:()=>{He("Private")}})]}),(0,A.jsxs)("div",{className:w?"formelempub":"formelempubnight",children:[(0,A.jsx)("label",{for:"public",children:(0,A.jsx)("b",{children:"public"})}),(0,A.jsx)("input",{className:"radbuts",type:"radio",id:"public",name:"acctype",checked:"Public"==T,onClick:()=>{He("Public")}})]})]}),(0,A.jsxs)("div",{className:"formelemgen",children:[(0,A.jsx)("label",{className:w?"genderlabel":"genderlabel persondetsdark",for:w?"genderx":"genderxnight",children:"Gender"}),"null"===_?(0,A.jsxs)("select",{id:w?"genderx":"genderxnight",required:!0,onChange:e=>{_e(e)},children:[(0,A.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Select your gender"}),(0,A.jsx)("option",{value:Ce[0],children:Ce[0]}),(0,A.jsx)("option",{value:Ce[1],children:Ce[1]}),(0,A.jsx)("option",{value:Ce[2],children:Ce[2]})]}):(0,A.jsxs)("select",{id:w?"genderx":"genderxnight",required:!0,onChange:e=>{_e(e)},children:[(0,A.jsx)("option",{value:_,children:_}),(0,A.jsx)("option",{value:Ce[0],children:Ce[0]}),(0,A.jsx)("option",{value:Ce[1],children:Ce[1]})]})]}),je&&(0,A.jsx)("span",{className:"gendersel",children:"*Please select your gender"}),(0,A.jsx)("div",{className:"formelem"}),(0,A.jsx)("button",{className:w?"saverbut":"saverbutnight",disabled:Ae,onClick:e=>{(e=>{if(e.preventDefault(),"null"!=_||null!=B){const e={};e.name=!!$&&$!=J&&{new:$,prev:J},e.bio=!!U&&U!=D&&U,e.password=K||!1,e.accstatus=!!T&&T!=E&&T,e.gender=!!B&&B!=_&&B,e.username=F,ke(!0),setTimeout((()=>{ke(!1),Te("/welcome"),Le((0,p.PJ)("HomeIcon"))}),4e3),fetch("".concat(De,"/users/userupdate/").concat(t.userid),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),credentials:"include"})}else Ne(!0)})(e)},children:"Save Changes"}),(0,A.jsx)("div",{className:"formelemdel",children:(0,A.jsx)("button",{className:"deletedanger",onClick:e=>{(e=>{e.preventDefault(),ke(!0),setTimeout((()=>{ke(!1),Le((0,o.$M)(!1)),fetch("".concat(De,"/logout"),{credentials:"include"}),Te("/",{replace:!0})}),8e3),setTimeout((()=>{Le((0,u.Xj)(!0)),Le((0,h.dR)(!0)),Le((0,m.A4)(!0)),Le((0,p.jT)(!0)),Le((0,o.NG)(!0)),Le((0,v.kE)(!0)),Le((0,x.$N)(!0)),Le((0,f.oj)(!0)),Le((0,g.dM)(!0)),Le((0,b.FP)(!0)),Le((0,j.iE)(!0)),Le((0,N.NN)(!0)),Le((0,S.GJ)(!0)),Le((0,y.tj)(!0))}),1e4);let s={username:F};fetch("".concat(De,"/users/userdelete/").concat(t.userid),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),credentials:"include"})})(e)},children:"Delete Account"})})]})]})})]})]})}},5745:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"}),"AddCircle");t.A=n},7936:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"}),"Circle");t.A=n},4171:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"}),"DarkMode");t.A=n},1681:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"}),"Explore");t.A=n},8669:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"}),"LightMode");t.A=n},3062:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"}),"Logout");t.A=n},9896:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"}),"NotificationsNone");t.A=n},2414:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"}),"Send");t.A=n},9377:(e,t,s)=>{var l=s(4994);t.A=void 0;var a=l(s(6839)),r=s(6723),n=(0,a.default)((0,r.jsx)("path",{d:"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"}),"Settings");t.A=n},6692:(e,t,s)=>{s.d(t,{A:()=>g});var l=s(8168),a=s(8587),r=s(2483);const n=r.createContext(null);function d(){return r.useContext(n)}const i="function"===typeof Symbol&&Symbol.for?Symbol.for("mui.nested"):"__THEME_NESTED__";var c=s(6723);const o=function(e){const{children:t,theme:s}=e,a=d(),o=r.useMemo((()=>{const e=null===a?s:function(e,t){if("function"===typeof t)return t(e);return(0,l.A)({},e,t)}(a,s);return null!=e&&(e[i]=null!==a),e}),[s,a]);return(0,c.jsx)(n.Provider,{value:o,children:t})};var u=s(3094),h=s(7162);const m={};function p(e,t,s){let a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r.useMemo((()=>{const r=e&&t[e]||t;if("function"===typeof s){const n=s(r),d=e?(0,l.A)({},t,{[e]:n}):n;return a?()=>d:d}return e?(0,l.A)({},t,{[e]:s}):(0,l.A)({},t,s)}),[e,t,s,a])}const v=function(e){const{children:t,theme:s,themeId:l}=e,a=(0,h.A)(m),r=d()||m,n=p(l,a,s),i=p(l,r,s,!0);return(0,c.jsx)(o,{theme:i,children:(0,c.jsx)(u.T.Provider,{value:n,children:t})})};var x=s(5663);const f=["theme"];function g(e){let{theme:t}=e,s=(0,a.A)(e,f);const r=t[x.A];return(0,c.jsx)(v,(0,l.A)({},s,{themeId:r?x.A:void 0,theme:r||t}))}}}]);
//# sourceMappingURL=182.401cb8b5.chunk.js.map
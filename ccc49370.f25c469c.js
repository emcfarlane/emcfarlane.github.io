(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{87:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(98),r=a(107),i=a(92);var o=function(e){const{nextItem:t,prevItem:a}=e;return l.a.createElement("nav",{className:"pagination-nav","aria-label":"Blog post page navigation"},l.a.createElement("div",{className:"pagination-nav__item"},a&&l.a.createElement(i.a,{className:"pagination-nav__link",to:a.permalink},l.a.createElement("div",{className:"pagination-nav__sublabel"},"Newer Post"),l.a.createElement("div",{className:"pagination-nav__label"},"\xab ",a.title))),l.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&l.a.createElement(i.a,{className:"pagination-nav__link",to:t.permalink},l.a.createElement("div",{className:"pagination-nav__sublabel"},"Older Post"),l.a.createElement("div",{className:"pagination-nav__label"},t.title," \xbb"))))},s=a(97),m=a(90);var d=function(e,t,a){const[l,c]=Object(n.useState)(void 0);Object(n.useEffect)((()=>{function n(){const n=function(){const e=Array.from(document.getElementsByClassName("anchor")),t=e.find((e=>{const{top:t}=e.getBoundingClientRect();return t>=a}));if(t){if(t.getBoundingClientRect().top>=a){const a=e[e.indexOf(t)-1];return null!=a?a:t}return t}return e[e.length-1]}();if(n){let a=0,r=!1;const i=document.getElementsByClassName(e);for(;a<i.length&&!r;){const e=i[a],{href:o}=e,s=decodeURIComponent(o.substring(o.indexOf("#")+1));n.id===s&&(l&&l.classList.remove(t),e.classList.add(t),c(e),r=!0),a+=1}}}return document.addEventListener("scroll",n),document.addEventListener("resize",n),n(),()=>{document.removeEventListener("scroll",n),document.removeEventListener("resize",n)}}))},v=a(81),u=a.n(v);const E="table-of-contents__link";function g({toc:e,isChild:t}){return e.length?l.a.createElement("ul",{className:t?"":"table-of-contents table-of-contents__left-border"},e.map((e=>l.a.createElement("li",{key:e.id},l.a.createElement("a",{href:`#${e.id}`,className:E,dangerouslySetInnerHTML:{__html:e.value}}),l.a.createElement(g,{isChild:!0,toc:e.children}))))):null}var p=function({toc:e}){return d(E,"table-of-contents__link--active",100),l.a.createElement("div",{className:Object(m.a)(u.a.tableOfContents,"thin-scrollbar")},l.a.createElement(g,{toc:e}))},f=a(3),b=a(82),_=a.n(b);var N=({className:e,...t})=>l.a.createElement("svg",Object(f.a)({fill:"currentColor",height:"1.2em",width:"1.2em",preserveAspectRatio:"xMidYMid meet",role:"img",viewBox:"0 0 40 40",className:Object(m.a)(_.a.iconEdit,e)},t),l.a.createElement("g",null,l.a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})));t.default=function(e){const{content:t,sidebar:a}=e,{frontMatter:n,metadata:i}=t,{title:m,description:d,nextItem:v,prevItem:u,editUrl:E}=i,{hide_table_of_contents:g}=n;return l.a.createElement(c.a,{title:m,description:d,wrapperClassName:"blog-wrapper"},t&&l.a.createElement("div",{className:"container margin-vert--lg"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col col--2"},l.a.createElement(s.a,{sidebar:a})),l.a.createElement("main",{className:"col col--8"},l.a.createElement(r.a,{frontMatter:n,metadata:i,isBlogPostPage:!0},l.a.createElement(t,null)),l.a.createElement("div",null,E&&l.a.createElement("a",{href:E,target:"_blank",rel:"noreferrer noopener"},l.a.createElement(N,null),"Edit this page")),(v||u)&&l.a.createElement("div",{className:"margin-vert--xl"},l.a.createElement(o,{nextItem:v,prevItem:u}))),!g&&t.toc&&l.a.createElement("div",{className:"col col--2"},l.a.createElement(p,{toc:t.toc})))))}},95:function(e,t,a){"use strict";var n=a(0),l=a.n(n),c=a(20),r=a(90);t.a=function(e){const{onChange:t,className:a,checked:i}=e,[o,s]=Object(n.useState)(!i),{isClient:m}=Object(c.default)();return m?l.a.createElement("div",{onClick:e=>{s(!o),t(e)},className:Object(r.a)(a,"navbar__link","header-sunmoon","header-logo"),"aria-label":"Dark mode toggle",checked:o}):l.a.createElement("span",e)}}}]);
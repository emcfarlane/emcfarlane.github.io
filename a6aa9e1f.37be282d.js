(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{101:function(a,e,t){"use strict";var n=t(0),l=t.n(n),i=t(20),c=t(96);e.a=function(a){const{onChange:e,className:t,checked:r}=a,[s,m]=Object(n.useState)(!r),{isClient:o}=Object(i.default)();return o?l.a.createElement("div",{onClick:a=>{m(!s),e(a)},className:Object(c.a)(t,"navbar__link","header-sunmoon","header-logo"),"aria-label":"Dark mode toggle",checked:s}):l.a.createElement("span",a)}},94:function(a,e,t){"use strict";t.r(e);var n=t(0),l=t.n(n),i=t(20),c=t(104),r=t(113),s=t(98);var m=function(a){const{metadata:e}=a,{previousPage:t,nextPage:n}=e;return l.a.createElement("nav",{className:"pagination-nav","aria-label":"Blog list page navigation"},l.a.createElement("div",{className:"pagination-nav__item"},t&&l.a.createElement(s.a,{className:"pagination-nav__link",to:t},l.a.createElement("div",{className:"pagination-nav__label"},"\xab Newer Entries"))),l.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},n&&l.a.createElement(s.a,{className:"pagination-nav__link",to:n},l.a.createElement("div",{className:"pagination-nav__label"},"Older Entries \xbb"))))},o=t(103);e.default=function(a){const{metadata:e,items:t,sidebar:n}=a,{siteConfig:{title:s}}=Object(i.default)(),{blogDescription:d,blogTitle:p,permalink:v}=e,g="/"===v?s:p;return l.a.createElement(c.a,{title:g,description:d,wrapperClassName:"blog-wrapper"},l.a.createElement("div",{className:"container margin-vert--lg"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col col--2"},l.a.createElement(o.a,{sidebar:n})),l.a.createElement("main",{className:"col col--8"},t.map((({content:a})=>l.a.createElement(r.a,{key:a.metadata.permalink,frontMatter:a.frontMatter,metadata:a.metadata,truncated:a.metadata.truncated},l.a.createElement(a,null)))),l.a.createElement(m,{metadata:e})))))}}}]);
(()=>{"use strict";var e={98:()=>{class e extends HTMLElement{constructor(){super();const e=this.getAttribute("title"),t=this.getAttribute("emoji"),o=this.getAttribute("name");this.innerHTML=`\n      <a class='card' href="${o}.html">\n        <div class='title-wrapper'>\n          <div class='emoji'>\n            <iconify-icon icon="fluent-emoji:${t}"></iconify-icon>\n          </div>\n          <h3 class='card-title'>\n            <div>${e}</div>\n          </h3>\n        </div>\n      </a>\n    `}}window.customElements.define("project-card",e)},474:(e,t,o)=>{o.r(t)},920:(e,t,o)=>{e.exports=o.p+"meow0.mp3"},818:(e,t,o)=>{e.exports=o.p+"meow1.mp3"},554:(e,t,o)=>{e.exports=o.p+"meow2.mp3"}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,o),i.exports}o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="",(()=>{o(98),o(474);const e=[o(920),o(818),o(554)],t=document.querySelector(".cat"),r=document.documentElement,n=getComputedStyle(r);new window.LazyLoad,t.addEventListener("click",(()=>{!function(){const t=Math.floor(Math.random()*Math.floor(3));new Audio(e[t]).play()}();const t=n.getPropertyValue("--dark-color"),o=n.getPropertyValue("--light-color"),i=n.getPropertyValue("--dark-mode-cat"),l=n.getPropertyValue("--light-mode-cat");r.style.setProperty("--dark-color",o),r.style.setProperty("--light-color",t),r.style.setProperty("--dark-mode-cat",l),r.style.setProperty("--light-mode-cat",i)}))})()})();
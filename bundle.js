(()=>{"use strict";var e={98:()=>{class e extends HTMLElement{constructor(){super();const e=this.getAttribute("title"),t=this.getAttribute("emoji"),o=this.getAttribute("name"),r=this.innerHTML;this.innerHTML=`\n      <button class='card' id=${o}>\n        <div class='title-wrapper'>\n          <h3 class='card-title'>\n            <span>${e}</span>\n            <div class='icon-container'>\n              <span>${t}</span>\n              <span class='close-button'>X</span>\n            </div>\n          </h3>\n        </div>\n        <div class='content'>\n          ${r}\n        </div>\n      </button>\n    `,this.className="no-after"}}window.customElements.define("project-card",e)},474:(e,t,o)=>{o.r(t)},920:(e,t,o)=>{e.exports=o.p+"meow0.mp3"},818:(e,t,o)=>{e.exports=o.p+"meow1.mp3"},554:(e,t,o)=>{e.exports=o.p+"meow2.mp3"}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="",(()=>{o(98),o(474);const e=[o(920),o(818),o(554)],t=[...document.getElementsByClassName("card")],r=document.querySelector(".cat"),n=document.documentElement,s=getComputedStyle(n),l=s.getPropertyValue("--card-height"),i=document.createElement("div");i.classList.add("placeholder"),new window.LazyLoad,t.forEach((e=>{!function(e){if(e.scrollHeight>e.offsetHeight){const t=document.createElement("div");t.classList.add("fade"),e.appendChild(t)}}(e),e.parentElement.addEventListener("click",(function(o){const r=o.target;if("a"===r.tagName.toLowerCase()||r.classList.contains("emoji-sprinkle-button"))return;const n=e.querySelector(".fade");!function(e,o){t.filter((t=>t!==e&&(o||t.classList.value.includes("active")))).forEach((e=>{e.classList.remove("active"),e.style.height=l,e.lastElementChild.style.display="block"}))}(e,n),this.children[0].classList.toggle("active"),this.classList.toggle("modal"),document.body.classList.toggle("modal-open");const s=new URL(document.location).searchParams;this.classList.value.includes("modal")?(n&&(e.style.height="fit-content",n.style.display="none"),s.set("project",e.id),document.querySelector(".projects").insertBefore(i,e.parentNode)):(n&&(e.style.height=l,n.style.display="block"),s.delete("project"),i.remove()),function(e){window.history.replaceState({},"",`${window.location.pathname}?${e}`)}(s)}))})),function(){const e=new URL(document.location).searchParams.get("project"),t=document.querySelector(`#${e}`);if(t){t.click();const{left:e,top:o}=t.getBoundingClientRect();document.querySelector(".projects").scrollTo(e,0),window.scrollTo(0,o)}}(),function(e){const t=window.innerWidth;if(t<=600){const e=.87*t;n.style.setProperty("--card-width",`${e}px`)}}(),r.addEventListener("click",(()=>{!function(){const t=Math.floor(Math.random()*Math.floor(3));new Audio(e[t]).play()}();const t=s.getPropertyValue("--dark-color"),o=s.getPropertyValue("--light-color"),r=s.getPropertyValue("--dark-mode-cat"),l=s.getPropertyValue("--light-mode-cat"),i=s.getPropertyValue("--link-dark-color"),c=s.getPropertyValue("--link-visited-dark-color"),a=s.getPropertyValue("--link-light-color"),d=s.getPropertyValue("--link-visited-light-color"),p=s.getPropertyValue("--fade-dark-color"),u=s.getPropertyValue("--fade-light-color");n.style.setProperty("--dark-color",o),n.style.setProperty("--light-color",t),n.style.setProperty("--dark-mode-cat",l),n.style.setProperty("--light-mode-cat",r),n.style.setProperty("--link-dark-color",a),n.style.setProperty("--link-visited-dark-color",d),n.style.setProperty("--link-light-color",i),n.style.setProperty("--link-visited-light-color",c),n.style.setProperty("--fade-dark-color",u),n.style.setProperty("--fade-light-color",p)})),async function(){const e=(new Date).toISOString().slice(0,10),t=await fetch(`https://api.npmjs.org/downloads/point/2021-01-01:${e}/emoji-sprinkle`),{downloads:o}=await t.json();document.querySelector(".download-count").innerHTML=o}()})()})();
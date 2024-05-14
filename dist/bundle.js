(()=>{"use strict";window.addEventListener("DOMContentLoaded",(()=>{(function(){const e=document.getElementById("myForm"),t=document.getElementById("ansForm");e.addEventListener("submit",(e=>{e.preventDefault(),async function(e){const n=e.target;let o=new FormData(n);t.innerHTML="Загрузка...",(await fetch("mailer/smart.php",{method:"POST",body:o})).ok?(t.innerHTML="Ваши данные успешно отправлены!",n.reset(),setTimeout((function(){t.innerHTML=""}),3e3)):(alert("Ошибка"),t.innerHTML="")}(e)}))})(),function(){const e=document.querySelector(".hamburger"),t=document.querySelector(".menu__close"),n=document.querySelector(".menu"),o=document.querySelectorAll(".menu__link"),i=document.querySelectorAll(".promo__buttons a");e.addEventListener("click",(()=>{n.classList.add("active")})),t.addEventListener("click",(()=>{n.classList.remove("active")})),n.addEventListener("click",(e=>{!e.target.classList.contains("menu__block")&&n.classList.contains("active")&&n.classList.remove("active")}));for(let e=0;e<o.length;e++)o[e].addEventListener("click",(function(e){e.preventDefault(),n.classList.remove("active"),document.querySelector(this.getAttribute("href")).scrollIntoView({behavior:"smooth"})}));for(let e=0;e<i.length;e++)i[e].addEventListener("click",(function(e){e.preventDefault(),document.querySelector(this.getAttribute("href")).scrollIntoView({behavior:"smooth"})}))}(),function(){const e=document.querySelectorAll(".choose-language__item a"),t=document.querySelector(".choose-language__list"),n=document.querySelector(".choose-language__btn"),o=document.querySelectorAll(".choose-language__btn img");function i(e){var t;t=e,o.forEach((e=>{e.dataset.lang===t?e.style.display="block":e.style.display="none"}));const n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState===XMLHttpRequest.DONE)if(200===n.status){const e=JSON.parse(n.responseText);document.querySelector(".promo__subtitle").innerText=e.promo__subtitle,document.querySelector(".promo__title").innerText=e.promo__title}else console.error("Error: "+n.status)},n.open("GET","language.php?lang="+e,!0),n.send()}window.addEventListener("load",(()=>{let e=function(e){const t=`; ${document.cookie}`.split("; lang=");if(2===t.length)return t.pop().split(";").shift()}();e||(e="en"),i(e)})),n.addEventListener("click",(e=>{e.preventDefault(),t.classList.add("choose-language__list_active")})),e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault();const o=e.dataset.lang;return t.classList.remove("choose-language__list_active"),i(o),!1}))}))}(),function(){const e=document.querySelector(".sidepanel__text"),t=document.querySelector(".sidepanel__divider"),n=document.querySelectorAll(".sidepanel .linkedin svg path"),o=document.querySelectorAll(".sidepanel .inst svg path"),i=document.querySelectorAll(".sidepanel .github svg path"),l=document.querySelector(".sidepanel .github"),c=document.querySelector(".sidepanel .inst"),a=document.querySelector(".sidepanel .linkedin");function s(e,t){for(let n=0;n<e.length;n++)e[n].style.fill=t}function r(e,t,n){let o;e.addEventListener("mouseover",(()=>{o=document.querySelectorAll(`.sidepanel .${n} svg path`)[0].style.fill,s(t,"var(--color-hover)")})),e.addEventListener("mouseout",(()=>{s(t,`${o}`)}))}r(l,i,"github"),r(c,o,"inst"),r(a,n,"linkedin"),window.addEventListener("scroll",(()=>{const l=window.scrollY,c=window.innerHeight;l>c/2&&document.body.classList.contains("night-theme")?e.style.color="#8bb5df":e.style.color=l>c/2?"black":"white",l>c/2+100&&document.body.classList.contains("night-theme")?(t.style.backgroundColor="#8bb5df",s(i,"#8bb5df")):l>c/2+100?(t.style.backgroundColor="black",s(i,"black")):(t.style.backgroundColor="white",s(i,"white")),l>c/2+200&&document.body.classList.contains("night-theme")?(s(n,"#8bb5df"),s(o,"#8bb5df")):l>c/2+200?(s(n,"black"),s(o,"black")):(s(n,"white"),s(o,"white"))}))}(),function(){const e=document.querySelectorAll(".skills__stripe-inner");window.addEventListener("scroll",(function(){for(let t=0;t<e.length;t++){const n=e[t].getBoundingClientRect();if(n.top>=0&&n.bottom<=window.innerHeight){const n=e[t].style.width,o=document.createElement("style"),i="changeWidth"+t;o.innerHTML=`\n                @keyframes ${i} {\n                    from {\n                        width: 0;\n                    }\n                    to {\n                        width: ${n};\n                    }\n                }\n                `,document.head.appendChild(o),e[t].style.animationDuration="1.5s",e[t].style.animationName=i}else e[t].style.animationName=""}}))}(),function(){const e=document.querySelector(".exp__wrapper");e.style.opacity="0";let t=document.getElementById("lowestElementInExpSection"),n=!1;const o=document.querySelectorAll(".animation-stick");function i(e,t){e>=o.length&&"experience"===t||e>=o.length/2&&"education"===t||(o[e].style.opacity="1",o[e].animate([{height:"0"},{height:"calc(100% + 16px)"}],{duration:500,iterations:1,pseudoElement:"::after",easing:"ease-in"}).finished.then((()=>{!function(e){let t=document.querySelector(`.exp__item_anim${e}`).animate([{width:"0"},{width:"45px"}],{duration:250,iterations:1,pseudoElement:"::before",easing:"ease-in"});t.play(),t.finished.then((()=>{let t=document.createElement("style");t.innerHTML=`\n            .exp__item_anim${e}:before {\n                width: 45px;\n            }\n        `,document.head.appendChild(t)}))}(e+1),i(e+1,t)})))}window.addEventListener("scroll",(()=>{t.getBoundingClientRect().bottom<=window.innerHeight&&!n&&(document.querySelectorAll(".exp__item-header").forEach((e=>{e.classList.add("animate__animated")})),document.querySelectorAll(".exp__item-body").forEach((e=>{e.classList.add("animate__animated")})),n=!0,o.forEach((e=>{e.style.opacity="0"})),e.style.opacity="1",setTimeout((()=>{i(0,"education"),i(2,"experience")}),950))}))}(),function(){const e=document.querySelector(".night-theme"),t=document.querySelector(".switch"),n=document.documentElement;function o(t){"night"===t?(localStorage.setItem("theme",t),e.classList.add("night-theme"),document.getElementById("slider").checked=!1,n.style.setProperty("--color-main","#617e9d")):(localStorage.setItem("theme",t),e.classList.remove("night-theme"),document.getElementById("slider").checked=!0,n.style.setProperty("--color-main","#68a0de"))}null!==localStorage.getItem("theme")?o(localStorage.getItem("theme")):o("night"),t.addEventListener("change",(()=>{"night"===localStorage.getItem("theme")?o("light"):"light"===localStorage.getItem("theme")&&o("night")}))}()}))})();
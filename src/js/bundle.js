/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function form() {

    const myForm = document.getElementById('myForm');
    const ansForm = document.getElementById('ansForm')
    async function formSend(e){

        const form = e.target;
        let formData = new FormData(form);

        ansForm.innerHTML = 'Загрузка...';

        let response = await fetch('mailer/smart.php', {
            method: 'POST',
            body: formData
        });

        if(response.ok) {
            ansForm.innerHTML = "Ваши данные успешно отправлены!"
            form.reset();
            setTimeout(function(){
                ansForm.innerHTML = ""
            }, 3000)
        } else {
            alert("Ошибка");
            ansForm.innerHTML = ""
        }
    }

    myForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formSend(e);
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./src/js/modules/hamburger.js":
/*!*************************************!*\
  !*** ./src/js/modules/hamburger.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function hamburger() {
    const hamburger = document.querySelector('.hamburger');
    const close = document.querySelector('.menu__close');
    const menu = document.querySelector('.menu');
    const menuLink = document.querySelectorAll('.menu__link');
    const promoButtons = document.querySelectorAll('.promo__buttons a');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    })

    close.addEventListener('click', () => {
        menu.classList.remove('active');
    })

// Close menu when the user clicked outside the menu
    menu.addEventListener('click', (event) => {
        if (!event.target.classList.contains("menu__block") && menu.classList.contains("active")) {
            menu.classList.remove('active');
        }
    })


// Close menu when the user clicked on the link
    for (let i = 0; i < menuLink.length; i++) {
        menuLink[i].addEventListener('click', function (e) {
            e.preventDefault();
            menu.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        })
    }

// Smooth scroll for promo buttons
    for (let i = 0; i < promoButtons.length; i++) {
        promoButtons[i].addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        })
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hamburger);

/***/ }),

/***/ "./src/js/modules/language.js":
/*!************************************!*\
  !*** ./src/js/modules/language.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function language() {
    // The switching of language

    const languagesBtn = document.querySelectorAll(".choose-language__item a");
    const languagesList = document.querySelector(".choose-language__list");
    const languagesMainBtn = document.querySelector(".choose-language__btn");
    const languagesFlags = document.querySelectorAll(".choose-language__btn img");

    function changeLanguage(lang) {
        setLanguageIcon(lang);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    document.querySelector('.promo__subtitle').innerText = response.promo__subtitle;
                    document.querySelector('.promo__title').innerText = response.promo__title;
                } else {
                    console.error('Error: ' + xhr.status);
                }
            }
        };
        xhr.open('GET', 'language.php?lang=' + lang, true);
        xhr.send();
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setLanguageIcon(nameLanguage) {
        languagesFlags.forEach(item => {
            if (item.dataset.lang === nameLanguage) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        })
    }

    window.addEventListener('load', () => {
        let langCookie = getCookie('lang');
        if (langCookie) {
            changeLanguage(langCookie);
        } else {
            langCookie = "en";
            changeLanguage(langCookie);
        }
    });

    languagesMainBtn.addEventListener("click", (event) => {
        event.preventDefault();
        languagesList.classList.add("choose-language__list_active");
    })

    languagesBtn.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const lang = item.dataset.lang;
            languagesList.classList.remove("choose-language__list_active");
            changeLanguage(lang);
            return false;
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (language);

/***/ }),

/***/ "./src/js/modules/sidepanel.js":
/*!*************************************!*\
  !*** ./src/js/modules/sidepanel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function sidepanel() {

    const item = document.querySelector('.sidepanel__text');
    const divider = document.querySelector('.sidepanel__divider');
    const linkedin = document.querySelectorAll('.sidepanel .linkedin svg path');
    const inst = document.querySelectorAll('.sidepanel .inst svg path');
    const github = document.querySelectorAll('.sidepanel .github svg path');
    const githubIcon = document.querySelector('.sidepanel .github');
    const instIcon = document.querySelector('.sidepanel .inst');
    const linkedinIcon = document.querySelector('.sidepanel .linkedin');

    function fillIcon(item, color) {
        for (let i = 0; i < item.length; i++) {
            item[i].style.fill = color;
        }
    }

    // Function for change color because css hover dont work
    function changeColorAfterHover(icon, color, name) {
        let prevColor;

        icon.addEventListener('mouseover', () => {
            prevColor = document.querySelectorAll(`.sidepanel .${name} svg path`)[0].style.fill;
            fillIcon(color, 'var(--color-hover)');
        })

        icon.addEventListener('mouseout', () => {
            fillIcon(color, `${prevColor}`);
        })
    }

    changeColorAfterHover(githubIcon, github, "github");
    changeColorAfterHover(instIcon, inst, "inst");
    changeColorAfterHover(linkedinIcon, linkedin, "linkedin");

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        const sectionHeight = window.innerHeight;

        if (scrollPosition > sectionHeight / 2 && document.body.classList.contains("night-theme")) {
            item.style.color = '#8bb5df';
        } else if (scrollPosition > sectionHeight / 2){
            item.style.color = 'black';
        } else {
            item.style.color = 'white';
        }

        if (scrollPosition > sectionHeight / 2 + 100 && document.body.classList.contains("night-theme")) {
            divider.style.backgroundColor = '#8bb5df';
            fillIcon(github, '#8bb5df');
        } else if (scrollPosition > sectionHeight / 2 + 100) {
            divider.style.backgroundColor = 'black';
            fillIcon(github, 'black');
        }
        else {
            divider.style.backgroundColor = 'white';
            fillIcon(github, 'white');
        }

        if (scrollPosition > sectionHeight / 2 + 200 && document.body.classList.contains("night-theme")) {
            fillIcon(linkedin, '#8bb5df');
            fillIcon(inst, '#8bb5df');
        } else if (scrollPosition > sectionHeight / 2 + 200) {
            fillIcon(linkedin, 'black');
            fillIcon(inst, 'black');
        }
        else {
            fillIcon(linkedin, 'white');
            fillIcon(inst, 'white');
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sidepanel);

/***/ }),

/***/ "./src/js/modules/skillsStripes.js":
/*!*****************************************!*\
  !*** ./src/js/modules/skillsStripes.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function skillsStripes() {
    const elements = document.querySelectorAll('.skills__stripe-inner');

    window.addEventListener('scroll', function () {
        for (let i = 0; i < elements.length; i++) {
            const position = elements[i].getBoundingClientRect();

            // Checking element is in the field of view
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                const width = elements[i].style.width;

                // Unique animation for each element
                const style = document.createElement('style');
                const differentAnimationNameForEachElement = "changeWidth" + i;
                style.innerHTML = `
                @keyframes ${differentAnimationNameForEachElement} {
                    from {
                        width: 0;
                    }
                    to {
                        width: ${width};
                    }
                }
                `;
                document.head.appendChild(style);
                elements[i].style.animationDuration = `1.5s`;
                elements[i].style.animationName = differentAnimationNameForEachElement;
            } else {
                elements[i].style.animationName = '';
            }

        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (skillsStripes);

/***/ }),

/***/ "./src/js/modules/stick.js":
/*!*********************************!*\
  !*** ./src/js/modules/stick.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function stick() {
    const expWrapper = document.querySelector(".exp__wrapper");
    expWrapper.style.opacity = "0";

    let lowestElement = document.getElementById("lowestElementInExpSection");
    let eventHappened = false;
    const sticks = document.querySelectorAll(".animation-stick");

    function playHorizontalStickAnimations(index) {
        let stickAnimation = document.querySelector(`.exp__item_anim${index}`).animate([
            {width: "0"},
            {width: "45px"},
        ], {
            duration: 250,
            iterations: 1,
            pseudoElement: '::before',
            easing: 'ease-in'
        });
        stickAnimation.play();
        stickAnimation.finished.then(() => {
            let styleForSticksHorizontal = document.createElement('style');
            styleForSticksHorizontal.innerHTML = `
            .exp__item_anim${index}:before {
                width: 45px;
            }
        `;
            document.head.appendChild(styleForSticksHorizontal);
        });
    }

    function playVerticalStickAnimations(index, indicator) {
        if (index >= sticks.length && indicator === "experience") return; // Если достигнут конец массива, выходим из функции
        if (index >= sticks.length / 2 && indicator === "education") return;
        sticks[index].style.opacity = "1";

        let stickAnimation = sticks[index].animate([
            {height: "0"},
            {height: "calc(100% + 16px)"},
        ], {
            duration: 500,
            iterations: 1,
            pseudoElement: '::after',
            easing: 'ease-in'
        });

        stickAnimation.finished.then(() => {
            playHorizontalStickAnimations(index + 1);
            playVerticalStickAnimations(index + 1, indicator); // Рекурсивно запускаем следующую анимацию после завершения текущей
        });
    }

    window.addEventListener("scroll", () => {
        let currentPositionLowestElement = lowestElement.getBoundingClientRect();

        if (currentPositionLowestElement.bottom <= window.innerHeight && !eventHappened) {

            document.querySelectorAll(".exp__item-header").forEach(item => {
                item.classList.add("animate__animated");
            })
            document.querySelectorAll(".exp__item-body").forEach(item => {
                item.classList.add("animate__animated");
            })

            eventHappened = true;

            sticks.forEach(item => {
                item.style.opacity = "0";
            })
            expWrapper.style.opacity = "1";
            setTimeout(() => {
                playVerticalStickAnimations(0, "education");
                playVerticalStickAnimations(2, "experience");
            }, 950);
        }

    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stick);

/***/ }),

/***/ "./src/js/modules/theme.js":
/*!*********************************!*\
  !*** ./src/js/modules/theme.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function theme() {
    //Switch to theme
    const theme = document.querySelector(".night-theme");
    const switchBtn = document.querySelector(".switch");
    const root = document.documentElement;

    function setTheme(themeName) {
        if (themeName === "night") {
            localStorage.setItem("theme", themeName);
            theme.classList.add("night-theme");
            document.getElementById('slider').checked = false;
            root.style.setProperty('--color-main', '#617e9d');
        } else {
            localStorage.setItem("theme", themeName);
            theme.classList.remove("night-theme");
            document.getElementById('slider').checked = true;
            root.style.setProperty('--color-main', '#68a0de');
        }
    }
    function toggleTheme() {
        if (localStorage.getItem("theme") === "night") {
            setTheme("light");
        } else if (localStorage.getItem("theme") === "light") {
            setTheme("night");
        }
    }

    if (localStorage.getItem("theme") !== null){
        setTheme(localStorage.getItem("theme"));
    } else {
        setTheme("night");
    }

    switchBtn.addEventListener("change", () => {
        toggleTheme();
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_hamburger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/hamburger */ "./src/js/modules/hamburger.js");
/* harmony import */ var _modules_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/language */ "./src/js/modules/language.js");
/* harmony import */ var _modules_sidepanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/sidepanel */ "./src/js/modules/sidepanel.js");
/* harmony import */ var _modules_skillsStripes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/skillsStripes */ "./src/js/modules/skillsStripes.js");
/* harmony import */ var _modules_stick__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/stick */ "./src/js/modules/stick.js");
/* harmony import */ var _modules_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/theme */ "./src/js/modules/theme.js");


;








window.addEventListener("DOMContentLoaded", () => {
    // Sending form
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_0__["default"])();

    (0,_modules_hamburger__WEBPACK_IMPORTED_MODULE_1__["default"])();

    (0,_modules_language__WEBPACK_IMPORTED_MODULE_2__["default"])();

    // Adaptive sidepanel, when it is located on the white/blue background
    (0,_modules_sidepanel__WEBPACK_IMPORTED_MODULE_3__["default"])();

    // Animation for skills stripes
    (0,_modules_skillsStripes__WEBPACK_IMPORTED_MODULE_4__["default"])();

    // Add animation to stick in exp section
    (0,_modules_stick__WEBPACK_IMPORTED_MODULE_5__["default"])();

    (0,_modules_theme__WEBPACK_IMPORTED_MODULE_6__["default"])();
})












































})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
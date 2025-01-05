/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/wowjs/dist/wow.js":
/*!****************************************!*\
  !*** ./node_modules/wowjs/dist/wow.js ***!
  \****************************************/
/***/ (function() {

(function() {
  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    Util.prototype.createEvent = function(event, bubble, cancel, detail) {
      var customEvent;
      if (bubble == null) {
        bubble = false;
      }
      if (cancel == null) {
        cancel = false;
      }
      if (detail == null) {
        detail = null;
      }
      if (document.createEvent != null) {
        customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, bubble, cancel, detail);
      } else if (document.createEventObject != null) {
        customEvent = document.createEventObject();
        customEvent.eventType = event;
      } else {
        customEvent.eventName = event;
      }
      return customEvent;
    };

    Util.prototype.emitEvent = function(elem, event) {
      if (elem.dispatchEvent != null) {
        return elem.dispatchEvent(event);
      } else if (event in (elem != null)) {
        return elem[event]();
      } else if (("on" + event) in (elem != null)) {
        return elem["on" + event]();
      }
    };

    Util.prototype.addEvent = function(elem, event, fn) {
      if (elem.addEventListener != null) {
        return elem.addEventListener(event, fn, false);
      } else if (elem.attachEvent != null) {
        return elem.attachEvent("on" + event, fn);
      } else {
        return elem[event] = fn;
      }
    };

    Util.prototype.removeEvent = function(elem, event, fn) {
      if (elem.removeEventListener != null) {
        return elem.removeEventListener(event, fn, false);
      } else if (elem.detachEvent != null) {
        return elem.detachEvent("on" + event, fn);
      } else {
        return delete elem[event];
      }
    };

    Util.prototype.innerHeight = function() {
      if ('innerHeight' in window) {
        return window.innerHeight;
      } else {
        return document.documentElement.clientHeight;
      }
    };

    return Util;

  })();

  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
    function WeakMap() {
      this.keys = [];
      this.values = [];
    }

    WeakMap.prototype.get = function(key) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          return this.values[i];
        }
      }
    };

    WeakMap.prototype.set = function(key, value) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          this.values[i] = value;
          return;
        }
      }
      this.keys.push(key);
      return this.values.push(value);
    };

    return WeakMap;

  })());

  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
    function MutationObserver() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
      }
      if (typeof console !== "undefined" && console !== null) {
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    MutationObserver.notSupported = true;

    MutationObserver.prototype.observe = function() {};

    return MutationObserver;

  })());

  getComputedStyle = this.getComputedStyle || function(el, pseudo) {
    this.getPropertyValue = function(prop) {
      var ref;
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      if (getComputedStyleRX.test(prop)) {
        prop.replace(getComputedStyleRX, function(_, _char) {
          return _char.toUpperCase();
        });
      }
      return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      callback: null,
      scrollContainer: null
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = bind(this.scrollCallback, this);
      this.scrollHandler = bind(this.scrollHandler, this);
      this.resetAnimation = bind(this.resetAnimation, this);
      this.start = bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
      if (options.scrollContainer != null) {
        this.config.scrollContainer = document.querySelector(options.scrollContainer);
      }
      this.animationNameCache = new WeakMap();
      this.wowEvent = this.util().createEvent(this.config.boxClass);
    }

    WOW.prototype.init = function() {
      var ref;
      this.element = window.document.documentElement;
      if ((ref = document.readyState) === "interactive" || ref === "complete") {
        this.start();
      } else {
        this.util().addEvent(document, 'DOMContentLoaded', this.start);
      }
      return this.finished = [];
    };

    WOW.prototype.start = function() {
      var box, j, len, ref;
      this.stopped = false;
      this.boxes = (function() {
        var j, len, ref, results;
        ref = this.element.querySelectorAll("." + this.config.boxClass);
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      this.all = (function() {
        var j, len, ref, results;
        ref = this.boxes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      if (this.boxes.length) {
        if (this.disabled()) {
          this.resetStyle();
        } else {
          ref = this.boxes;
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            this.applyStyle(box, true);
          }
        }
      }
      if (!this.disabled()) {
        this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
        this.util().addEvent(window, 'resize', this.scrollHandler);
        this.interval = setInterval(this.scrollCallback, 50);
      }
      if (this.config.live) {
        return new MutationObserver((function(_this) {
          return function(records) {
            var k, len1, node, record, results;
            results = [];
            for (k = 0, len1 = records.length; k < len1; k++) {
              record = records[k];
              results.push((function() {
                var l, len2, ref1, results1;
                ref1 = record.addedNodes || [];
                results1 = [];
                for (l = 0, len2 = ref1.length; l < len2; l++) {
                  node = ref1[l];
                  results1.push(this.doSync(node));
                }
                return results1;
              }).call(_this));
            }
            return results;
          };
        })(this)).observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };

    WOW.prototype.stop = function() {
      this.stopped = true;
      this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
      this.util().removeEvent(window, 'resize', this.scrollHandler);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.sync = function(element) {
      if (MutationObserver.notSupported) {
        return this.doSync(this.element);
      }
    };

    WOW.prototype.doSync = function(element) {
      var box, j, len, ref, results;
      if (element == null) {
        element = this.element;
      }
      if (element.nodeType !== 1) {
        return;
      }
      element = element.parentNode || element;
      ref = element.querySelectorAll("." + this.config.boxClass);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        if (indexOf.call(this.all, box) < 0) {
          this.boxes.push(box);
          this.all.push(box);
          if (this.stopped || this.disabled()) {
            this.resetStyle();
          } else {
            this.applyStyle(box, true);
          }
          results.push(this.scrolled = true);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      box.className = box.className + " " + this.config.animateClass;
      if (this.config.callback != null) {
        this.config.callback(box);
      }
      this.util().emitEvent(box, this.wowEvent);
      this.util().addEvent(box, 'animationend', this.resetAnimation);
      this.util().addEvent(box, 'oanimationend', this.resetAnimation);
      this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
      this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
      return box;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return this.animate((function(_this) {
        return function() {
          return _this.customStyle(box, hidden, duration, delay, iteration);
        };
      })(this));
    };

    WOW.prototype.animate = (function() {
      if ('requestAnimationFrame' in window) {
        return function(callback) {
          return window.requestAnimationFrame(callback);
        };
      } else {
        return function(callback) {
          return callback();
        };
      }
    })();

    WOW.prototype.resetStyle = function() {
      var box, j, len, ref, results;
      ref = this.boxes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        results.push(box.style.visibility = 'visible');
      }
      return results;
    };

    WOW.prototype.resetAnimation = function(event) {
      var target;
      if (event.type.toLowerCase().indexOf('animationend') >= 0) {
        target = event.target || event.srcElement;
        return target.className = target.className.replace(this.config.animateClass, '').trim();
      }
    };

    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      if (hidden) {
        this.cacheAnimationName(box);
      }
      box.style.visibility = hidden ? 'hidden' : 'visible';
      if (duration) {
        this.vendorSet(box.style, {
          animationDuration: duration
        });
      }
      if (delay) {
        this.vendorSet(box.style, {
          animationDelay: delay
        });
      }
      if (iteration) {
        this.vendorSet(box.style, {
          animationIterationCount: iteration
        });
      }
      this.vendorSet(box.style, {
        animationName: hidden ? 'none' : this.cachedAnimationName(box)
      });
      return box;
    };

    WOW.prototype.vendors = ["moz", "webkit"];

    WOW.prototype.vendorSet = function(elem, properties) {
      var name, results, value, vendor;
      results = [];
      for (name in properties) {
        value = properties[name];
        elem["" + name] = value;
        results.push((function() {
          var j, len, ref, results1;
          ref = this.vendors;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            vendor = ref[j];
            results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    WOW.prototype.vendorCSS = function(elem, property) {
      var j, len, ref, result, style, vendor;
      style = getComputedStyle(elem);
      result = style.getPropertyCSSValue(property);
      ref = this.vendors;
      for (j = 0, len = ref.length; j < len; j++) {
        vendor = ref[j];
        result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
      }
      return result;
    };

    WOW.prototype.animationName = function(box) {
      var animationName, error;
      try {
        animationName = this.vendorCSS(box, 'animation-name').cssText;
      } catch (error) {
        animationName = getComputedStyle(box).getPropertyValue('animation-name');
      }
      if (animationName === 'none') {
        return '';
      } else {
        return animationName;
      }
    };

    WOW.prototype.cacheAnimationName = function(box) {
      return this.animationNameCache.set(box, this.animationName(box));
    };

    WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box);
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var j, len, ref, results;
          ref = this.boxes;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            results.push(box);
          }
          return results;
        }).call(this);
        if (!(this.boxes.length || this.config.live)) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      while (element.offsetTop === void 0) {
        element = element.parentNode;
      }
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset;
      viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util != null ? this._util : this._util = new Util();
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);


/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

        ansForm.innerHTML = 'Loading...';

        let response = await fetch('mailer/smart.php', {
            method: 'POST',
            body: formData
        });

        if(response.ok) {
            ansForm.innerHTML = "Completed!"
            form.reset();
            setTimeout(function(){
                ansForm.innerHTML = ""
            }, 3000)
        } else {
            alert("Error");
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

"use strict";
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

"use strict";
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
                    
                    // мне было скучно
                    
                    document.querySelector('.promo__subtitle').innerText = response.promo__subtitle;
                    document.querySelector('.promo__title').innerText = response.promo__title;

                    document.querySelector('.sidepanel__text span').innerText = response.sidepanel__text;
                    document.querySelector('[href="#about"]').innerText = response.menu__about;
                    document.querySelector('[href="#exp"]').innerText = response.menu__exp;
                    document.querySelector('[href="#skills"]').innerText = response.menu__skills;
                    document.querySelector('[href="#portfolio"]').innerText = response.menu__works;
                    document.querySelector('[href="#contacts"]').innerText = response.menu__contacts;
                    
                    document.querySelectorAll('.title.title_fs14')[0].innerText = response.button__portfolio;
                    document.querySelectorAll('.title.title_fs14')[1].innerText = response.button__about;

                    document.querySelector('.title.title_fs16.about__subtitle').innerText = response.menu__about;
                    document.querySelector('.title.title_fs36.about__title').innerText = response.about__title;
                    document.querySelector('.about__description').innerText = response.about__description;
                    document.querySelectorAll('.title.title_fs14.about__item-title')[0].innerText = response.about__item_title;
                    document.querySelectorAll('.about__item-description')[0].innerText = response.about__item_description_0;
                    document.querySelectorAll('.about__item-description')[1].innerText = response.about__item_description_1;
                    document.querySelectorAll('.about__item-description')[2].innerText = response.about__item_description_2;

                    document.querySelector('.title.title_fs16.exp__subtitle').innerText = response.exp__subtitle;
                    document.querySelector('.title.title_fs36.exp__title').innerText = response.exp__title;

                    document.querySelectorAll('.title.title_fs20.exp__column-title')[0].innerText = response.exp__column_title_0;
                    document.querySelectorAll('.title.title_fs20.exp__column-title')[1].innerText = response.exp__column_title_1;
                    document.querySelectorAll('.exp__item-location')[0].innerText = response.exp__item_location_0; 
                    document.querySelectorAll('.exp__item-location')[1].innerText = response.exp__item_location_1; 
                    document.querySelectorAll('.exp__item-location')[2].innerText = response.exp__item_location_2;

                    document.querySelectorAll('.exp__item-body')[0].innerText = response.exp__item_body_0; 
                    document.querySelectorAll('.exp__item-body')[1].innerText = response.exp__item_body_1; 
                    document.querySelectorAll('.exp__item-body')[2].innerText = response.exp__item_body_2;  
                    
                    document.querySelectorAll('.exp__item-subtitle')[0].innerText = response.exp__item_subtitle_0; 
                    document.querySelectorAll('.exp__item-subtitle')[1].innerText = response.exp__item_subtitle_1; 
                    document.querySelectorAll('.exp__item-subtitle')[2].innerText = response.exp__item_subtitle_2;

                    document.querySelector('.skills__title').innerText = response.skills__title;
                    document.querySelector('.skills__subtitle').innerText = response.skills__subtitle;
                    
                    document.querySelectorAll('.skills__item-second-title')[0].innerText = response.skills__item_second_title_0; 
                    document.querySelectorAll('.skills__item-second-title')[1].innerText = response.skills__item_second_title_1; 
                    document.querySelectorAll('.skills__item-second-title')[2].innerText = response.skills__item_second_title_2;  document.querySelectorAll('.exp__item-subtitle')[0].innerText = response.exp__item_subtitle_0; 
                    document.querySelectorAll('.skills__item-second-title')[3].innerText = response.skills__item_second_title_3; 
                    
                    document.querySelector('.portfolio__title').innerText = response.portfolio__title;
                    document.querySelector('.portfolio__subtitle').innerText = response.portfolio__subtitle;

                    document.querySelectorAll('.portfolio__item-text span').forEach(item => {
                        item.innerText = response.portfolio__item_text 
                    });

                    document.querySelector('.contacts__title').innerText = response.contacts__title;
                    document.querySelector('.contacts__subtitle').innerText = response.contacts__subtitle;

                    document.querySelector('.contacts__change').innerText = response.contacts__change;
                    document.querySelector('.contacts__give-data').innerText = response.contacts__give_data;

                    document.querySelectorAll('.contacts__input label')[0].innerText = response.contacts__input_0;
                    document.querySelectorAll('.contacts__input label')[1].innerText = response.contacts__input_1;

                    document.querySelector('.contacts__textarea label').innerText = response.contacts__textarea;

                    document.querySelector('.button.contacts__button').innerText = response.contacts__button;
                    document.querySelector('.contacts__policy a').innerText = response.contacts__policy;
                    document.querySelector('.contacts__policy span').innerText = response.contacts__policy_text;

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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var wowjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wowjs */ "./node_modules/wowjs/dist/wow.js");
/* harmony import */ var wowjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wowjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_hamburger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/hamburger */ "./src/js/modules/hamburger.js");
/* harmony import */ var _modules_language__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/language */ "./src/js/modules/language.js");
/* harmony import */ var _modules_sidepanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/sidepanel */ "./src/js/modules/sidepanel.js");
/* harmony import */ var _modules_skillsStripes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/skillsStripes */ "./src/js/modules/skillsStripes.js");
/* harmony import */ var _modules_stick__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/stick */ "./src/js/modules/stick.js");
/* harmony import */ var _modules_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/theme */ "./src/js/modules/theme.js");


;









window.addEventListener("DOMContentLoaded", () => {

    new (wowjs__WEBPACK_IMPORTED_MODULE_0___default().WOW)().init();
    // Sending form
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_1__["default"])();

    (0,_modules_hamburger__WEBPACK_IMPORTED_MODULE_2__["default"])();

    (0,_modules_language__WEBPACK_IMPORTED_MODULE_3__["default"])();

    // Adaptive sidepanel, when it is located on the white/blue background
    (0,_modules_sidepanel__WEBPACK_IMPORTED_MODULE_4__["default"])();

    // Animation for skills stripes
    (0,_modules_skillsStripes__WEBPACK_IMPORTED_MODULE_5__["default"])();

    // Add animation to stick in exp section
    (0,_modules_stick__WEBPACK_IMPORTED_MODULE_6__["default"])();

    (0,_modules_theme__WEBPACK_IMPORTED_MODULE_7__["default"])();
})












































})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
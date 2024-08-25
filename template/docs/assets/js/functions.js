/**
* Mizzle | Technology and Corporate Bootstrap Template
*
* @author Webestica (https://www.webestica.com/)
* 
**/

/* ===================
Table Of Content
======================
01 PRELOADER
02 GLIGHTBOX
03 ACTIVE CLASS
04 SIMPLE SCROLLBAR
05 Parallax Background
06 SWIPER SLIDER
07 MENU DROPDOWN HOVER
====================== */

"use strict";
!function () {

    window.Element.prototype.removeClass = function () {
        let className = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            selectors = this;
        if (!(selectors instanceof HTMLElement) && selectors !== null) {
            selectors = document.querySelector(selectors);
        }
        if (this.isVariableDefined(selectors) && className) {
            selectors.classList.remove(className);
        }
        return this;
    }, window.Element.prototype.addClass = function () {
        let className = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            selectors = this;
        if (!(selectors instanceof HTMLElement) && selectors !== null) {
            selectors = document.querySelector(selectors);
        }
        if (this.isVariableDefined(selectors) && className) {
            selectors.classList.add(className);
        }
        return this;
    }, window.Element.prototype.toggleClass = function () {
        let className = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            selectors = this;
        if (!(selectors instanceof HTMLElement) && selectors !== null) {
            selectors = document.querySelector(selectors);
        }
        if (this.isVariableDefined(selectors) && className) {
            selectors.classList.toggle(className);
        }
        return this;
    }, window.Element.prototype.isVariableDefined = function () {
        return !!this && typeof (this) != 'undefined' && this != null;
    }
}();


var e = {
    init: function () {
        e.preLoader(),
        e.lightBox(),
        e.activeClass(),
        e.sScrollbar(),
        e.parallaxBG(),
        e.aosFunc(),
        e.dropdownHover(),
        e.swiperSlider(),
        e.typeText(),
        e.mouseMove();
    },
    isVariableDefined: function (el) {
        return typeof !!el && (el) != 'undefined' && el != null;
    },
    getParents: function (el, selector, filter) {
        const result = [];
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        // match start from parent
        el = el.parentElement;
        while (el && !matchesSelector.call(el, selector)) {
            if (!filter) {
                if (selector) {
                    if (matchesSelector.call(el, selector)) {
                        return result.push(el);
                    }
                } else {
                    result.push(el);
                }
            } else {
                if (matchesSelector.call(el, filter)) {
                    result.push(el);
                }
            }
            el = el.parentElement;
            if (e.isVariableDefined(el)) {
                if (matchesSelector.call(el, selector)) {
                    return el;
                }
            }

        }
        return result;
    },
    getNextSiblings: function (el, selector, filter) {
        let sibs = [];
        let nextElem = el.parentNode.firstChild;
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
        do {
            if (nextElem.nodeType === 3) continue; // ignore text nodes
            if (nextElem === el) continue; // ignore elem of target
            if (nextElem === el.nextElementSibling) {
                if ((!filter || filter(el))) {
                    if (selector) {
                        if (matchesSelector.call(nextElem, selector)) {
                            return nextElem;
                        }
                    } else {
                        sibs.push(nextElem);
                    }
                    el = nextElem;

                }
            }
        } while (nextElem = nextElem.nextSibling)
        return sibs;
    },
    on: function (selectors, type, listener) {
        document.addEventListener("DOMContentLoaded", () => {
            if (!(selectors instanceof HTMLElement) && selectors !== null) {
                selectors = document.querySelector(selectors);
            }
            selectors.addEventListener(type, listener);
        });
    },
    onAll: function (selectors, type, listener) {
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll(selectors).forEach((element) => {
                if (type.indexOf(',') > -1) {
                    let types = type.split(',');
                    types.forEach((type) => {
                        element.addEventListener(type, listener);
                    });
                } else {
                    element.addEventListener(type, listener);
                }


            });
        });
    },
    removeClass: function (selectors, className) {
        if (!(selectors instanceof HTMLElement) && selectors !== null) {
            selectors = document.querySelector(selectors);
        }
        if (e.isVariableDefined(selectors)) {
            selectors.removeClass(className);
        }
    },
    removeAllClass: function (selectors, className) {
        if (e.isVariableDefined(selectors) && (selectors instanceof HTMLElement)) {
            document.querySelectorAll(selectors).forEach((element) => {
                element.removeClass(className);
            });
        }

    },
    toggleClass: function (selectors, className) {
        if (!(selectors instanceof HTMLElement) && selectors !== null) {
            selectors = document.querySelector(selectors);
        }
        if (e.isVariableDefined(selectors)) {
            selectors.toggleClass(className);
        }
    },
    toggleAllClass: function (selectors, className) {
        if (e.isVariableDefined(selectors)  && (selectors instanceof HTMLElement)) {
            document.querySelectorAll(selectors).forEach((element) => {
                element.toggleClass(className);
            });
        }
    },
    addClass: function (selectors, className) {
        if (!(selectors instanceof HTMLElement) && selectors !== null) {
            selectors = document.querySelector(selectors);
        }
        if (e.isVariableDefined(selectors)) {
            selectors.addClass(className);
        }
    },
    select: function (selectors) {
        return document.querySelector(selectors);
    },
    selectAll: function (selectors) {
        return document.querySelectorAll(selectors);
    },

    // START: 01 Preloader
    preLoader: function () {
        window.onload = function () {
            var preloader = e.select('.preloader');
            if (e.isVariableDefined(preloader)) {
                preloader.className += ' animate__animated animate__fadeOut';
                setTimeout(function(){
                    preloader.style.display = 'none';
                }, 200);
            }
        };
    },
    // END: Preloader

    // START: 02 GLightbox
    lightBox: function () {
        var light = e.select('[data-glightbox]');
        if (e.isVariableDefined(light)) {
            var lb = GLightbox({
                selector: '*[data-glightbox]',
                openEffect: 'fade',
                closeEffect: 'fade'
            });
        }
    },
    // END: GLightbox

    // START: 03 Active class
    activeClass: function () {
      var currentPath = window.location.pathname;
      var path = currentPath.split("/").pop();

      var d = e.select(".navbar .left-sidebar");
      if(e.isVariableDefined(d)) {
        var hTarget = e.select('.left-sidebar .list-group-borderless .list-group-item[href="'+path+'"]');

        if(e.isVariableDefined(hTarget)) {
          var hh = hTarget.getAttribute("href");

          if(path === hh) {
            hTarget.classList.add('active');
          }
        }
      }
    },
    // END: Active class

    // START: 04 Simple scrollbar
    sScrollbar: function () {
      var sb = e.select('.left-sidebar');
      if (e.isVariableDefined(sb)) {
        SimpleScrollbar.initEl(sb);
      }
    },
    // END: Simple scrollbar

    // START: 05 Parallax Background
    parallaxBG: function () {
      var parBG = e.select('.bg-parallax');
      if (e.isVariableDefined(parBG)) {
          jarallax(e.selectAll('.bg-parallax'), {
              speed: 0.6
          });
      }
    },
    // END: Parallax Background

    // START: 06 Swiper slider
    swiperSlider: function () {

        var swpr = e.select('[data-swiper-options]');
        if (e.isVariableDefined(swpr)) {
    
          // basic options for all sliders
          let defaults = {
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            autoplay:{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            },
            freeMode: false,
          };
          
          // call init function
          initSwipers(defaults);
          
          function initSwipers(defaults = {}, selector = ".swiper") {
            // get all swiper elements
            let swipers = document.querySelectorAll(selector);
          
            // iterate over swiper elements
            swipers.forEach((swiper) => {
              // get custom options
              let optionsData = swiper.getAttribute("data-swiper-options")
                ? JSON.parse(swiper.getAttribute("data-swiper-options"))
                : {};
          
              // combine defaults and custom options
              let options = {
                ...defaults,
                ...optionsData
              };
          
              // init swiper
              new Swiper(swiper, options);
            });
          }
        }
      },
    // END: Swiper slider

    // START: 02 Menu Dropdown Hover
    dropdownHover: function () {
        // Hover menu code starts here
        if (window.matchMedia('(min-width: 992px)').matches) {
          (function($bs) {
            document.querySelectorAll('.dropdown-hover .dropdown').forEach(function(dd) {
                dd.addEventListener('mouseenter', function(e) {
                    let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
                    if (!toggle.classList.contains('show')) {
                        $bs.Dropdown.getOrCreateInstance(toggle).toggle();
                        // dd.classList.add(CLASS_NAME);
                        // $bs.Dropdown.clearMenus();
                    }
                });
                dd.addEventListener('mouseleave', function(e) {
                    let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
                    if (toggle.classList.contains('show')) {
                        $bs.Dropdown.getOrCreateInstance(toggle).toggle();
                    }
                });
            });
          })(bootstrap);
        }
        // Hover menu code ends here.
  
  
      },
      // END: Menu Dropdown Hover

      // START: 17 Typing Text Animation
    /* @required https://github.com/luisvinicius167/ityped */

    typeText: function () {
        var t = e.select('.typed');
        if (e.isVariableDefined(t)) {
            var type = e.selectAll('.typed');
            type.forEach(el => {
                var strings = el.getAttribute('data-type-text');
                var split_strings = strings.split("&&");
                var typespeed = el.getAttribute('data-speed') ? el.getAttribute('data-speed') : 200;
                var typeBackSpeed = el.getAttribute('data-back-speed') ? el.getAttribute('data-back-speed') : 50;
  
                ityped.init(el, {
                    strings: split_strings,
                    showCursor: true,
                    typeSpeed: typespeed,
                    backSpeed: typeBackSpeed
                });
            });
        }
    },
    // END: Typing Text Animation


     // START: 09 AOS Animation
    /* @required https://github.com/michalsnik/aos/tree/v2 */

    aosFunc: function () {
        var aos = e.select('.aos');
        if (e.isVariableDefined(aos)) {
            AOS.init({
                duration: 500,
                easing: 'ease-out-quart',
                once: true
            });
        }
    },
    // END: AOS Animation

    // START: 20 Mouse Move Parallax
   mouseMove: function () {
    document.addEventListener("mousemove", parallax);
        function parallax(event) {
            this.querySelectorAll(".parallax-wrap .layer").forEach((shift) => {
                const position = shift.getAttribute("data-depth");
                const x = (window.innerWidth - event.pageX * position) / 90;
                const y = (window.innerHeight - event.pageY * position) / 90;

                shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        }
    
  },
  // END: Mouse Move Parallax
    };

e.init();







/* Custom Scrollbar */
// var el = document.querySelector('.left-sidebar');
// SimpleScrollbar.initEl(el);

/* Clipboard JS - Copy code button */
var cl = document.querySelector('.copy-link');
if(typeof !!cl && (cl) != 'undefined' && cl != null) {
        var cle = document.querySelectorAll('.copy-link');
        cle.forEach(el => {
            el.addEventListener("click", function () {
                      var theButton = this;
                      var copyId = this.getAttribute('id');
                      var clipboard = new ClipboardJS( '#' + copyId );
                      
                      clipboard.on('success', function(e) {
                        e.clearSelection();
                      theButton.innerHTML = 'Copied';
                      setTimeout(function() {
                          theButton.innerHTML = 'Copy';
                        }, 10000);
                      });
            });         
        });
} 
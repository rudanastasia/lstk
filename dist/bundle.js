(() => {
  const __create = Object.create;
  const __defProp = Object.defineProperty;
  const __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  const __getOwnPropNames = Object.getOwnPropertyNames;
  const __getProtoOf = Object.getPrototypeOf;
  const __hasOwnProp = Object.prototype.hasOwnProperty;
  const __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  const __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (const key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  const __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // js/slider.js
  const require_slider = __commonJS({
    "js/slider.js"() {
      document.addEventListener("DOMContentLoaded", () => {
        const projects = document.querySelector(".projects");
        const slider = projects.querySelector(".projects__slider");
        const items = projects.querySelectorAll(".projects__item");
        const prevBtn = projects.querySelector(".directions__btn--prev");
        const nextBtn = projects.querySelector(".directions__btn--next");
        let current = 0;
        function updateSlider() {
          slider.style.transform = `translateX(-${current * 100}%)`;
        }
        function next() {
          current = (current + 1) % items.length;
          updateSlider();
        }
        function prev() {
          current = (current - 1 + items.length) % items.length;
          updateSlider();
        }
        nextBtn.addEventListener("click", next);
        prevBtn.addEventListener("click", prev);
        let startX = 0;
        let endX = 0;
        slider.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
        });
        slider.addEventListener("touchmove", (e) => {
          endX = e.touches[0].clientX;
        });
        slider.addEventListener("touchend", () => {
          const diff = startX - endX;
          const threshold = 50;
          if (Math.abs(diff) > threshold) {
            if (diff > 0) {
              next();
            } else {
              prev();
            }
          }
        });
        updateSlider();
      });
      document.addEventListener("DOMContentLoaded", () => {
        const reviews = document.querySelector(".reviews");
        const slider = reviews.querySelector(".reviews__list");
        const items = reviews.querySelectorAll(".reviews__item");
        const prevBtn = reviews.querySelector(".directions__btn--prev");
        const nextBtn = reviews.querySelector(".directions__btn--next");
        let currentIndex = 0;
        let startX = 0;
        let currentX = 0;
        let isSwiping = false;
        function getVisibleItems() {
          return window.innerWidth <= 768 ? 1 : 2;
        }
        function updateSlider() {
          const itemWidth = items[0].offsetWidth;
          const gap = parseInt(getComputedStyle(slider).gap) || 0;
          slider.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;
        }
        function next() {
          const maxIndex = items.length - getVisibleItems();
          currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
          updateSlider();
        }
        function prev() {
          const maxIndex = items.length - getVisibleItems();
          currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
          updateSlider();
        }
        nextBtn.addEventListener("click", next);
        prevBtn.addEventListener("click", prev);
        slider.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
          isSwiping = true;
        });
        slider.addEventListener("touchmove", (e) => {
          if (!isSwiping) return;
          currentX = e.touches[0].clientX;
        });
        slider.addEventListener("touchend", () => {
          if (!isSwiping) return;
          isSwiping = false;
          const diff = startX - currentX;
          const threshold = 50;
          if (Math.abs(diff) > threshold) {
            if (diff > 0) {
              next();
            } else {
              prev();
            }
          }
        });
        window.addEventListener("resize", () => {
          const maxIndex = items.length - getVisibleItems();
          if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
          }
          updateSlider();
        });
        updateSlider();
      });
      document.addEventListener("DOMContentLoaded", () => {
        const blog = document.querySelector(".blog");
        const slider = blog.querySelector(".info-block__list--slider");
        const items = blog.querySelectorAll(".info-block__item--slider");
        const prevBtn = blog.querySelector(".directions__btn--prev");
        const nextBtn = blog.querySelector(".directions__btn--next");
        let currentIndex = 0;
        function getVisibleItems() {
          return window.innerWidth <= 768 ? 1 : 2;
        }
        function updateSlider() {
          if (window.innerWidth > 768) {
            slider.style.transform = "";
            currentIndex = 0;
            return;
          }
          const itemWidth = items[0].offsetWidth;
          const gap = parseInt(getComputedStyle(slider).gap || 0) || 0;
          slider.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;
        }
        function moveNext() {
          const maxIndex = items.length - getVisibleItems();
          currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
          updateSlider();
        }
        function movePrev() {
          const maxIndex = items.length - getVisibleItems();
          currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
          updateSlider();
        }
        nextBtn.addEventListener("click", moveNext);
        prevBtn.addEventListener("click", movePrev);
        window.addEventListener("resize", () => {
          const maxIndex = items.length - getVisibleItems();
          if (currentIndex > maxIndex) currentIndex = maxIndex;
          updateSlider();
        });
        let startX = 0;
        let endX = 0;
        slider.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
        });
        slider.addEventListener("touchmove", (e) => {
          endX = e.touches[0].clientX;
        });
        slider.addEventListener("touchend", () => {
          const diff = startX - endX;
          const threshold = 50;
          if (Math.abs(diff) < threshold) return;
          if (diff > 0) {
            moveNext();
          } else {
            movePrev();
          }
          startX = 0;
          endX = 0;
        });
        updateSlider();
      });
    }
  });

  // js/reviews.js
  const require_reviews = __commonJS({
    "js/reviews.js"() {
      document.querySelectorAll(".reviews__src").forEach((link) => {
        link.addEventListener("click", function(e) {
          e.preventDefault();
          const item = this.closest(".reviews__item");
          const description = item.querySelector(".reviews__description");
          description.classList.toggle("reviews__description--expanded");
          this.textContent = description.classList.contains("reviews__description--expanded") ? "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C" : "\u0427\u0438\u0442\u0430\u0442\u044C \u043E\u0442\u0437\u044B\u0432 \u0446\u0435\u043B\u0438\u043A\u043E\u043C";
        });
      });
    }
  });

  // js/map.js
  const require_map = __commonJS({
    "js/map.js"() {
      async function init() {
        await ymaps3.ready;
        const customization = await fetch("./customization.json").then((response) => response.json());
        const coords = [38.974016, 45.041572];
        const map = new ymaps3.YMap(document.getElementById("map"), {
          location: {
            center: coords,
            zoom: 16
          }
        });
        map.addChild(
          new ymaps3.YMapDefaultSchemeLayer({
            customization
          })
        );
        map.addChild(new ymaps3.YMapDefaultFeaturesLayer());
        const markerElement = document.createElement("div");
        markerElement.className = "my-marker";
        markerElement.innerHTML = `  
  <img src="assets/img/icons/marker.svg" alt="\u041C\u0435\u0442\u043A\u0430">
  `;
        map.addChild(
          new ymaps3.YMapMarker(
            {
              coordinates: coords
            },
            markerElement
          )
        );
      }
      init();
    }
  });

  // js/script.js
  const require_script = __commonJS({
    "js/script.js"() {
      const import_slider = __toESM(require_slider());
      const import_reviews = __toESM(require_reviews());
      const import_map = __toESM(require_map());
    }
  });
  require_script();
})();

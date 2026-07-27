///
///Слайдер для проектов////
///
document.addEventListener('DOMContentLoaded', () => {
  const projects = document.querySelector('.projects');
  if (!projects) return;

  const slider = projects.querySelector('.projects__slider');
  const items = projects.querySelectorAll('.projects__item');

  const prevBtn = projects.querySelector('.directions__btn--prev');
  const nextBtn = projects.querySelector('.directions__btn--next');

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

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  //
  // Свайп//
  //

  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
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

///
///Карусель для отзывов////
///
document.addEventListener('DOMContentLoaded', () => {
  const reviews = document.querySelector('.reviews');
  if (!reviews) return;

  const slider = reviews.querySelector('.reviews__list');
  const items = reviews.querySelectorAll('.reviews__item');

  const prevBtn = reviews.querySelector('.directions__btn--prev');
  const nextBtn = reviews.querySelector('.directions__btn--next');

  let currentIndex = 0;

  //
  // Свайп//
  //
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

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;

    const diff = startX - currentX;

    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        next(); //
      } else {
        prev(); //
      }
    }
  });

  window.addEventListener('resize', () => {
    const maxIndex = items.length - getVisibleItems();

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    updateSlider();
  });

  updateSlider();
});

///
///Слайдер для блога////
///
document.addEventListener('DOMContentLoaded', () => {
  const blog = document.querySelector('.blog');
  if (!blog) return;

  const slider = blog.querySelector('.info-block__list--slider');
  const items = blog.querySelectorAll('.info-block__item--slider');

  const prevBtn = blog.querySelector('.directions__btn--prev');
  const nextBtn = blog.querySelector('.directions__btn--next');

  let currentIndex = 0;

  function getVisibleItems() {
    return window.innerWidth <= 768 ? 1 : 2;
  }

  function updateSlider() {
    if (window.innerWidth > 768) {
      slider.style.transform = '';
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

  nextBtn.addEventListener('click', moveNext);
  prevBtn.addEventListener('click', movePrev);

  window.addEventListener('resize', () => {
    const maxIndex = items.length - getVisibleItems();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    updateSlider();
  });

  //
  // Свайп//
  //

  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
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

///
///Карусель для портфолио////
///
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = document.querySelector('.portfolio');
  if (!portfolio) return;

  const slider = portfolio.querySelector('.slider-img__list');

  const prevBtn = portfolio.querySelector('.directions__btn--prev');
  const nextBtn = portfolio.querySelector('.directions__btn--next');

  function updateActive() {
    const items = [...slider.children];

    items.forEach((item) => {
      item.classList.remove('slider-img__item--active');
      item.querySelector('img').classList.remove('slider-img-style--active');
    });

    const active = items[1];

    active.classList.add('slider-img__item--active');
    active.querySelector('img').classList.add('slider-img-style--active');
  }

  function next() {
    slider.style.transition = 'transform .4s';
    slider.style.transform = 'translateX(calc(-33% - 20px))';

    slider.addEventListener('transitionend', function handler() {
      slider.removeEventListener('transitionend', handler);

      slider.style.transition = 'none';

      slider.append(slider.firstElementChild);

      slider.style.transform = 'translateX(0)';

      updateActive();

      requestAnimationFrame(() => {
        slider.style.transition = 'transform .4s';
      });
    });
  }

  function prev() {
    slider.style.transition = 'none';

    slider.prepend(slider.lastElementChild);

    slider.style.transform = 'translateX(calc(-33% - 20px))';

    requestAnimationFrame(() => {
      slider.style.transition = 'transform .4s';
      slider.style.transform = 'translateX(0)';
    });

    slider.addEventListener('transitionend', function handler() {
      slider.removeEventListener('transitionend', handler);

      updateActive();
    });
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // swipe

  let startX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;

    if (Math.abs(diff) < 50) return;

    diff > 0 ? next() : prev();
  });

  updateActive();
});

///
///Слайдер для статей на детальных страницах////
///
document.addEventListener('DOMContentLoaded', () => {
  const section__articles = document.querySelector('.section__articles');
  if (!section__articles) return;

  const slider = section__articles.querySelector('.info-block__list--slider');
  const items = section__articles.querySelectorAll('.info-block__item--slider');

  const prevBtn = section__articles.querySelector('.directions__btn--prev');
  const nextBtn = section__articles.querySelector('.directions__btn--next');

  let currentIndex = 0;

  //
  // Свайп//
  //
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

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;

    const diff = startX - currentX;

    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        next(); //
      } else {
        prev(); //
      }
    }
  });

  window.addEventListener('resize', () => {
    const maxIndex = items.length - getVisibleItems();

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    updateSlider();
  });

  updateSlider();
});

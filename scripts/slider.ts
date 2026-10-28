const SWIPE_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 768;

const isMobile = (): boolean => window.innerWidth <= MOBILE_BREAKPOINT;

//===========================
//==== Настраиваем свайп ====
//===========================
function addSwipe(el: HTMLElement, onNext: () => void, onPrev: () => void): void {
  let startX = 0;

  el.addEventListener(
    'touchstart',
    (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  el.addEventListener('touchend', (e: TouchEvent) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;

    if (diff > 0) onNext();
    else onPrev();
  });
}

//===========================
//==== Пошаговые слайдеры (проекты, блог, перелинковка статей, отзывы) ====
//===========================
interface SliderConfig {
  root: string; // контейнер секции
  track: string; // лента, которую двигаем
  item: string; // слайды
  unit?: 'px' | 'percent'; // как считать сдвиг
  visible?: () => number; // сколько слайдов видно одновременно
  mobileOnly?: boolean; // работает только на мобильных
}

function initSlider({
  root,
  track,
  item,
  unit = 'px',
  visible = () => (isMobile() ? 1 : 2),
  mobileOnly = false,
}: SliderConfig): void {
  const container = document.querySelector<HTMLElement>(root);
  const slider = container?.querySelector<HTMLElement>(track);
  const prevBtn = container?.querySelector<HTMLButtonElement>('.directions__btn--prev');
  const nextBtn = container?.querySelector<HTMLButtonElement>('.directions__btn--next');
  if (!container || !slider || !prevBtn || !nextBtn) return;

  const items = container?.querySelectorAll<HTMLElement>(item);
  if (items.length === 0) return;

  let index = 0;

  const getMaxIndex = (): number => Math.max(items.length - visible(), 0);

  const update = (): void => {
    if (mobileOnly && !isMobile()) {
      slider.style.transform = ''; ///сбрасываем сдвиг при переключении с мобильных на десктоп
      index = 0; ///возвращаем слайдер в исходное положение
      return;
    }

    let offset: string;
    if (unit === 'percent') {
      offset = `${index * 100}%`;
    } else {
      const gap = parseFloat(getComputedStyle(slider).gap) || 0;
      offset = `${index * (items[0].offsetWidth + gap)}px`;
    }

    slider.style.transform = `translateX(-${offset})`;
  };

  const next = (): void => {
    index = index >= getMaxIndex() ? 0 : index + 1; ///проверяем достиг ли текущий индекс своего максимума
    update();
  };

  const prev = (): void => {
    index = index <= 0 ? getMaxIndex() : index - 1;
    update();
  };

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  addSwipe(slider, next, prev);

  window.addEventListener('resize', () => {
    index = Math.min(index, getMaxIndex());
    update();
  });

  update();
}

const sliders: SliderConfig[] = [
  {
    root: '.projects',
    track: '.projects__slider',
    item: '.projects__item',
    unit: 'percent',
    visible: () => 1,
  },
  {
    root: '.reviews',
    track: '.reviews__list',
    item: '.reviews__item',
  },
  {
    root: '.blog',
    track: '.info-block__list--slider',
    item: '.info-block__item--slider',
    mobileOnly: true,
  },
  {
    root: '.section__articles',
    track: '.info-block__list--slider',
    item: '.info-block__item--slider',
  },
];

sliders.forEach(initSlider);

//===========================
//==== Бесконечная карусель фото в портфолио (деталка проектов) ====
//==== десктоп: три слайда, средний активный (шире и цветной)
//==== мобильные (≤ 768px): обычная бесконечная карусель, по одному слайду, без модификатора --active
//===========================
const PORTFOLIO_MS = 400;
const PORTFOLIO_TRANSITION = `transform ${PORTFOLIO_MS}ms`;

function initPortfolio(): void {
  const portfolio = document.querySelector<HTMLElement>('.portfolio');
  const slider = portfolio?.querySelector<HTMLElement>('.slider-img__list');
  const prevBtn = portfolio?.querySelector<HTMLButtonElement>('.directions__btn--prev');
  const nextBtn = portfolio?.querySelector<HTMLButtonElement>('.directions__btn--next');
  if (!slider || !prevBtn || !nextBtn) return;

  const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

  const setTransform = (transform: string, transition: string): void => {
    slider.style.transition = transition;
    slider.style.transform = transform;
  };

  // шаг сдвига = ширина слайда, который уходит за край, + зазор между слайдами
  const getStep = (el: Element): number =>
    (el as HTMLElement).offsetWidth + (parseFloat(getComputedStyle(slider).columnGap) || 0);

  // Запускает анимацию и блокирует повторные клики, пока она не закончится.
  // Без блокировки быстрые клики подписывают несколько обработчиков transitionend,
  // и слайды переставляются больше одного раза за шаг.
  let isAnimating = false;

  const animate = (start: () => void, finish?: () => void): void => {
    if (isAnimating) return;
    isAnimating = true;

    const done = (): void => {
      slider.removeEventListener('transitionend', onEnd);
      window.clearTimeout(timer);
      finish?.();
      isAnimating = false;
    };
    const onEnd = (e: TransitionEvent): void => {
      if (e.target === slider) done();
    };
    // запасной вариант: если transitionend не придёт (например, вкладка в фоне), блокировка всё равно снимется
    const timer = window.setTimeout(done, PORTFOLIO_MS + 100);

    slider.addEventListener('transitionend', onEnd);
    start();
  };

  // выделяем визуально активную карточку (по индексу в ленте); -1 снимает выделение со всех
  const setActive = (activeIndex: number): void => {
    Array.from(slider.children).forEach((el, i) => {
      const isActive = i === activeIndex;
      el.classList.toggle('slider-img__item--active', isActive);
      el.querySelector('img')?.classList.toggle('slider-img-style--active', isActive);
    });
  };

  const next = (): void => {
    animate(
      () => {
        const step = getStep(slider.children[0]);

        // на десктопе активной становится следующая карточка, размеры меняются вместе со сдвигом
        if (!mobileQuery.matches) setActive(2);
        setTransform(`translateX(-${step}px)`, PORTFOLIO_TRANSITION);
      },
      () => {
        slider.append(slider.children[0]); // первый слайд уходит в конец
        setTransform('translateX(0)', 'none');
        slider.getBoundingClientRect(); // применяем сброс без анимации
        slider.style.transition = PORTFOLIO_TRANSITION;
      },
    );
  };

  const prev = (): void => {
    animate(() => {
      const last = slider.children[slider.children.length - 1];
      const step = getStep(last);

      slider.prepend(last);
      setTransform(`translateX(-${step}px)`, 'none'); // визуально остаёмся на прежнем месте
      slider.getBoundingClientRect(); // применяем сдвиг без анимации

      // на десктопе активной становится предыдущая карточка
      if (!mobileQuery.matches) setActive(1);
      setTransform('translateX(0)', PORTFOLIO_TRANSITION);
    });
  };

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  addSwipe(slider, next, prev);

  // при переходе между мобильной и десктопной версией сбрасываем сдвиг и выделение
  const applyMode = (): void => {
    setTransform('translateX(0)', 'none');
    slider.getBoundingClientRect();
    slider.style.transition = PORTFOLIO_TRANSITION;
    setActive(mobileQuery.matches ? -1 : 1);
  };

  mobileQuery.addEventListener('change', applyMode);
  applyMode();
}

initPortfolio();

export {};

const hamburger = document.querySelector<HTMLElement>('.hamburger');
const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu');
const closeBtn = document.querySelector<HTMLElement>('.mobile-menu__close');

if (hamburger && mobileMenu && closeBtn) {
  const menuSet = (isOpen: boolean): void => {
    mobileMenu.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  hamburger.addEventListener('click', () => menuSet(true));
  closeBtn.addEventListener('click', () => menuSet(false));
}

export {};

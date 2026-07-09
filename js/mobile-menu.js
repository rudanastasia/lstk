const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-menu__close');

function openMenu() {
  mobileMenu.classList.add('active');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  mobileMenu.classList.remove('active');
  document.body.classList.remove('menu-open');
}

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

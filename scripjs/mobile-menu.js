"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hamburger = document.querySelector('.hamburger');
var mobileMenu = document.querySelector('.mobile-menu');
var closeBtn = document.querySelector('.mobile-menu__close');
if (hamburger && mobileMenu && closeBtn) {
  var menuSet = function menuSet(isOpen) {
    mobileMenu.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };
  hamburger.addEventListener('click', function () {
    return menuSet(true);
  });
  closeBtn.addEventListener('click', function () {
    return menuSet(false);
  });
}
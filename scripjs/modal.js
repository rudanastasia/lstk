"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/////////-------Модальное окно с формой (отзывы)-------/////////
///
var modal = document.getElementById('review-modal');
var openBtn = document.getElementById('open-review');
if (modal && openBtn) {
  var _modal$querySelector, _modal$querySelector2;
  var closeModal = function closeModal() {
    return modal.classList.remove('active');
  };
  openBtn.addEventListener('click', function () {
    return modal.classList.add('active');
  });
  (_modal$querySelector = modal.querySelector('.modal__close')) === null || _modal$querySelector === void 0 || _modal$querySelector.addEventListener('click', closeModal);
  (_modal$querySelector2 = modal.querySelector('.modal__overlay')) === null || _modal$querySelector2 === void 0 || _modal$querySelector2.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}
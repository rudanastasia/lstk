"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
///
///Описания отзывов////
///
document.querySelectorAll('.reviews__item').forEach(function (item) {
  var description = item.querySelector('.reviews__description');
  var link = item.querySelector('.reviews__src');
  if (!description || !link) return;
  if (description.scrollHeight <= description.clientHeight) {
    link.style.display = 'none';
    return;
  }
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var isExpanded = description.classList.toggle('reviews__description--expanded');
    link.textContent = isExpanded ? 'Свернуть' : 'Читать отзыв целиком';
  });
});
///
///Описание отзывов////
///
document.querySelectorAll('.reviews__src').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const item = this.closest('.reviews__item');
    const description = item.querySelector('.reviews__description');

    description.classList.toggle('reviews__description--expanded');

    this.textContent = description.classList.contains('reviews__description--expanded')
      ? 'Свернуть'
      : 'Читать отзыв целиком';
  });
});

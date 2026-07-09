///
///Описание отзывов////
///
document.querySelectorAll('.reviews__item').forEach((item) => {
  const description = item.querySelector('.reviews__description');
  const link = item.querySelector('.reviews__src');

  const lineHeight = parseFloat(getComputedStyle(description).lineHeight);
  const maxLines = 4;

  if (description.scrollHeight <= lineHeight * maxLines + 1) {
    link.style.display = 'none';
    return;
  }

  link.addEventListener('click', function (e) {
    e.preventDefault();

    description.classList.toggle('reviews__description--expanded');

    this.textContent = description.classList.contains('reviews__description--expanded')
      ? 'Свернуть'
      : 'Читать отзыв целиком';
  });
});

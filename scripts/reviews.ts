///
///Описания отзывов////
///
document.querySelectorAll<HTMLElement>('.reviews__item').forEach((item) => {
  const description = item.querySelector<HTMLElement>('.reviews__description');
  const link = item.querySelector<HTMLAnchorElement>('.reviews__src');
  if (!description || !link) return;

  if (description.scrollHeight <= description.clientHeight) {
    link.style.display = 'none';
    return;
  }

  link.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();

    const isExpanded = description.classList.toggle('reviews__description--expanded');

    link.textContent = isExpanded ? 'Свернуть' : 'Читать отзыв целиком';
  });
});

export {};

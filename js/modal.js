/////////-------Модальное окно с формой (отзывы)-------/////////
///
const modal = document.getElementById('review-modal');
const openBtn = document.getElementById('open-review');
const closeBtn = modal.querySelector('.modal__close');
const overlay = modal.querySelector('.modal__overlay');

openBtn.addEventListener('click', () => {
  modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

overlay.addEventListener('click', () => {
  modal.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('active');
  }
});

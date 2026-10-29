/////////-------Модальное окно с формой (отзывы)-------/////////
///
const modal = document.getElementById('review-modal');
const openBtn = document.getElementById('open-review');

import { clearFormMessage } from './form';

if (modal && openBtn) {
  const closeModal = (): void => {
    modal.classList.remove('active');
    clearFormMessage();
  };

  openBtn.addEventListener('click', () => {
    clearFormMessage();
    modal.classList.add('active');
  });

  modal.querySelector('.modal__close')?.addEventListener('click', closeModal);
  modal.querySelector('.modal__overlay')?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

export {};

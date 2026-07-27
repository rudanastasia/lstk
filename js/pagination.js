/////////-------Пагинация для отзывов-------/////////
///
document.addEventListener('DOMContentLoaded', () => {
  const reviews__block = document.querySelector('.reviews__block');
  if (!reviews__block) return;

  const items = reviews__block.querySelectorAll('.reviews__item');
  const pagination = reviews__block.querySelector('.pagination');
  if (!pagination) return;

  const itemsPerPage = 6;
  const pageCount = Math.ceil(items.length / itemsPerPage);

  function showPage(page) {
    items.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage ? '' : 'none';
    });

    document.querySelectorAll('.page-btn').forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.page) === page);
    });
  }

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.dataset.page = i;
    btn.className = 'page-btn';

    btn.addEventListener('click', () => showPage(i));

    pagination.appendChild(btn);
  }

  showPage(1);
});

/////////-------Пагинация для проектов-портфолио-------/////////
///
document.addEventListener('DOMContentLoaded', () => {
  const product__block = document.querySelector('.product__block');
  if (!product__block) return;

  const items = product__block.querySelectorAll('.product__item');
  const pagination = product__block.querySelector('.pagination');
  if (!pagination) return;

  const itemsPerPage = 6;
  const pageCount = Math.ceil(items.length / itemsPerPage);

  function showPage(page) {
    items.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage ? '' : 'none';
    });

    document.querySelectorAll('.page-btn').forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.page) === page);
    });
  }

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.dataset.page = i;
    btn.className = 'page-btn';

    btn.addEventListener('click', () => showPage(i));

    pagination.appendChild(btn);
  }

  showPage(1);
});

/////////-------Пагинация для блога-------/////////
///
document.addEventListener('DOMContentLoaded', () => {
  const blog__content = document.querySelector('.blog__content');
  if (!blog__content) return;

  const items = blog__content.querySelectorAll('.blog__item');
  const pagination = blog__content.querySelector('.pagination');
  if (!pagination) return;

  const itemsPerPage = 9;
  const pageCount = Math.ceil(items.length / itemsPerPage);

  function showPage(page) {
    items.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage ? '' : 'none';
    });

    document.querySelectorAll('.page-btn').forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.page) === page);
    });
  }

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.dataset.page = i;
    btn.className = 'page-btn';

    btn.addEventListener('click', () => showPage(i));

    pagination.appendChild(btn);
  }

  showPage(1);
});

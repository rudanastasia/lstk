interface PaginationConfig {
  container: string;
  item: string;
  perPage: number;
}

const paginations: PaginationConfig[] = [
  { container: '.reviews__block', item: '.reviews__item', perPage: 6 },
  { container: '.product__block', item: '.product__item', perPage: 6 },
  { container: '.blog__content', item: '.blog__item', perPage: 9 },
];

function initPagination({ container, item, perPage }: PaginationConfig): void {
  const root = document.querySelector<HTMLElement>(container);
  const pagination = root?.querySelector<HTMLElement>('.pagination');
  if (!root || !pagination) return;

  const items = root.querySelectorAll<HTMLElement>(item);
  const pageCount = Math.ceil(items.length / perPage);
  const buttons: HTMLButtonElement[] = [];

  const showPage = (page: number): void => {
    const start = (page - 1) * perPage;
    const end = page * perPage;

    items.forEach((el, index) => {
      el.style.display = index >= start && index < end ? '' : 'none';
    });

    buttons.forEach((btn, index) => {
      btn.classList.toggle('active', index + 1 === page);
    });
  };

  for (let page = 1; page <= pageCount; page++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(page);
    btn.className = 'page-btn';
    btn.dataset.page = String(page);
    btn.addEventListener('click', () => showPage(page));

    buttons.push(btn);
    pagination.appendChild(btn);
  }

  showPage(1);
}

paginations.forEach(initPagination);

export {};

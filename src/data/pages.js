export default {
  '/pages/about.html': {
    breadcrumbs: [{ title: 'Главная', url: '' }, { title: 'О компании' }],
  },

  '/pages/blog.html': {
    breadcrumbs: [{ title: 'Главная', url: '' }, { title: 'Блог' }],
  },

  '/pages/article.html': {
    breadcrumbs: [
      { title: 'Главная', url: '' },
      { title: 'Блог', url: 'pages/blog.html' },
      { title: 'Статья' },
    ],
  },

  '/pages/projects.html': {
    breadcrumbs: [{ title: 'Главная', url: '' }, { title: 'Наши проекты' }],
  },

  '/pages/services.html': {
    breadcrumbs: [{ title: 'Главная', url: '' }, { title: 'Наши услуги' }],
  },

  '/pages/contacts.html': {
    breadcrumbs: [{ title: 'Главная', url: '' }, { title: 'Контакты' }],
  },

  '/pages/reviews.html': {
    breadcrumbs: [{ title: 'Главная', url: '' }, { title: 'Отзывы клиентов' }],
  },
};

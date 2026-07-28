# Фабрика стальных каркасов (ЛСТК)

Многостраничный сайт-визитка компании, выполняющей проектные и строительно-монтажные работы по технологии ЛСТК (лёгкие стальные тонкостенные конструкции).

Сайт опубликован на GitHub Pages: **https://rudanastasia.github.io/lstk/**

## Стек

- HTML + SCSS + JavaScript (ES-модули), без фреймворков
- [Vite](https://vitejs.dev/) — сборка, dev-сервер с горячей перезагрузкой
- [Sass](https://sass-lang.com/) — препроцессор стилей
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — линт и форматирование кода
- Yandex Maps JS API — карта на главной и странице контактов
- Деплой — GitHub Actions → GitHub Pages (автоматически при пуше в `main`)

## Структура проекта

```
├── index.html          # главная страница
├── pages/               # остальные страницы (about, services, projects, ...)
├── css/                 # SCSS-исходники (styles.scss — главный файл со всеми @import)
├── js/                  # JS-модули (script.js — общая точка входа со всеми import)
├── public/               # статика, которая копируется в сборку как есть
│   ├── assets/           # картинки, спрайты
│   └── customization.json # настройки оформления Yandex-карты
├── vite.config.js        # конфигурация сборки (список HTML-страниц, base-путь)
└── .github/workflows/    # автосборка и деплой на GitHub Pages
```

## Разработка

Установить зависимости (один раз после клонирования репозитория):

```bash
npm install
```

Запустить локальный сервер разработки с автообновлением страницы при сохранении:

```bash
npm run dev
```

Сайт откроется по адресу `http://localhost:5173/lstk/` (обязательно с `/lstk/` в конце пути).

## Сборка

Собрать финальную версию сайта в папку `dist/`:

```bash
npm run build
```

Локально проверить уже собранную версию (то, что реально попадёт на сайт):

```bash
npm run preview
```

## Линт и форматирование

```bash
npm run lint          # проверить код на ошибки ESLint
npm run lint:fix       # автоматически исправить, что можно
npm run format         # отформатировать все файлы Prettier
npm run format:check   # проверить, всё ли отформатировано
```

## Деплой

Деплой полностью автоматический: при каждом пуше в ветку `main` GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) собирает проект (`npm run build`) и публикует содержимое `dist/` на GitHub Pages. Прогресс и логи сборки — во вкладке [Actions](https://github.com/rudanastasia/lstk/actions) репозитория.

Вручную ничего собирать и заливать не нужно — достаточно закоммитить изменения в исходниках и запушить в `main`.

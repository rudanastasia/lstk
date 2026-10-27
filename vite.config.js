"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vite = require("vite");
var _vitePluginHandlebars = _interopRequireDefault(require("vite-plugin-handlebars"));
var _path = require("path");
var _url = require("url");
var _pages = _interopRequireDefault(require("./src/data/pages.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _dirname = (0, _url.fileURLToPath)(new URL('.', import.meta.url));
var _default = exports.default = (0, _vite.defineConfig)({
  base: '/lstk/',
  plugins: [(0, _vitePluginHandlebars.default)({
    partialDirectory: (0, _path.resolve)(_dirname, 'src/partials'),
    context: function context(pagePath) {
      var normalizedPath = pagePath.replace(/\\/g, '/');
      var pageKey = Object.keys(_pages.default).find(function (key) {
        return normalizedPath.endsWith(key);
      });
      var isHomePage = normalizedPath.endsWith('/index.html') || normalizedPath.endsWith('/pages/project.html');
      return _objectSpread({
        base: '/lstk/',
        isInnerPage: !isHomePage
      }, pageKey ? _pages.default[pageKey] : {});
    }
  })],
  build: {
    rollupOptions: {
      input: {
        index: (0, _path.resolve)(_dirname, 'index.html'),
        about: (0, _path.resolve)(_dirname, 'pages/about.html'),
        blog: (0, _path.resolve)(_dirname, 'pages/blog.html'),
        article: (0, _path.resolve)(_dirname, 'pages/article.html'),
        contacts: (0, _path.resolve)(_dirname, 'pages/contacts.html'),
        projects: (0, _path.resolve)(_dirname, 'pages/projects.html'),
        project: (0, _path.resolve)(_dirname, 'pages/project.html'),
        services: (0, _path.resolve)(_dirname, 'pages/services.html'),
        reviews: (0, _path.resolve)(_dirname, 'pages/reviews.html')
      }
    }
  }
});
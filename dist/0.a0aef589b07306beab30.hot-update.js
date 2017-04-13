webpackHotUpdate(0,{

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allFragmentsAsQuery = exports.queryWithFragments = exports.fragmentsAsString = undefined;

var _templateObject = _taggedTemplateLiteral(['', '\n                   ', ''], ['', '\n                   ', '']),
    _templateObject2 = _taggedTemplateLiteral(['', '', ''], ['', '', '']);

var _graphqlTag = __webpack_require__(11);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var fragmentsAsString = exports.fragmentsAsString = function () {
  function fragmentsAsString(fragments) {
    return fragments ? Object.values(fragments).reduce(function (acc, val) {
      return (0, _graphqlTag2['default'])(_templateObject, acc, val);
    }, '') : "";
  }

  return fragmentsAsString;
}();

var queryWithFragments = exports.queryWithFragments = function () {
  function queryWithFragments(fragments, query) {
    return (0, _graphqlTag2['default'])(_templateObject2, query, fragmentsAsString(fragments));
  }

  return queryWithFragments;
}();

var allFragmentsAsQuery = exports.allFragmentsAsQuery = function () {
  function allFragmentsAsQuery(fragments) {
    return Object.keys(fragments).reduce(function (acc, key) {
      return String(acc) + '\n              ...' + String(key);
    }, '');
  }

  return allFragmentsAsQuery;
}();

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVXRpbC9xdWVyeVRyYW5zZm9ybXMuanN4P2RiNjkiXSwibmFtZXMiOlsiZnJhZ21lbnRzQXNTdHJpbmciLCJmcmFnbWVudHMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJyZWR1Y2UiLCJhY2MiLCJ2YWwiLCJxdWVyeVdpdGhGcmFnbWVudHMiLCJxdWVyeSIsImFsbEZyYWdtZW50c0FzUXVlcnkiLCJrZXlzIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRU8sSUFBTUE7QUFBb0IsV0FBcEJBLGlCQUFvQixDQUFTQyxTQUFULEVBQW9CO0FBQ25ELFdBQVFBLFlBQ0VDLE9BQU9DLE1BQVAsQ0FBY0YsU0FBZCxFQUNHRyxNQURILENBRUksVUFBQ0MsR0FBRCxFQUFNQyxHQUFOO0FBQUEsMkRBQ1FELEdBRFIsRUFFS0MsR0FGTDtBQUFBLEtBRkosRUFJZ0IsRUFKaEIsQ0FERixHQU1FLEVBTlY7QUFPRDs7QUFSWTtBQUFBLEdBQU47O0FBVUEsSUFBTUM7QUFBcUIsV0FBckJBLGtCQUFxQixDQUFTTixTQUFULEVBQW9CTyxLQUFwQixFQUEyQjtBQUMzRCwwREFBYUEsS0FBYixFQUFxQlIsa0JBQWtCQyxTQUFsQixDQUFyQjtBQUNEOztBQUZZO0FBQUEsR0FBTjs7QUFJQSxJQUFNUTtBQUFzQixXQUF0QkEsbUJBQXNCLENBQVNSLFNBQVQsRUFBb0I7QUFDckQsV0FBT0MsT0FBT1EsSUFBUCxDQUFZVCxTQUFaLEVBQ0VHLE1BREYsQ0FFRyxVQUFDQyxHQUFELEVBQU1NLEdBQU47QUFBQSxvQkFDS04sR0FETCxtQ0FFT00sR0FGUDtBQUFBLEtBRkgsRUFJaUIsRUFKakIsQ0FBUDtBQUtEOztBQU5ZO0FBQUEsR0FBTixDIiwiZmlsZSI6IjAuYTBhZWY1ODliMDczMDZiZWFiMzAuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuXG5leHBvcnQgY29uc3QgZnJhZ21lbnRzQXNTdHJpbmcgPSBmdW5jdGlvbihmcmFnbWVudHMpIHtcbiAgcmV0dXJuICBmcmFnbWVudHNcbiAgICAgICAgICA/IE9iamVjdC52YWx1ZXMoZnJhZ21lbnRzKVxuICAgICAgICAgICAgICAucmVkdWNlKFxuICAgICAgICAgICAgICAgIChhY2MsIHZhbCkgPT5cbiAgICAgICAgICAgICAgICAgIGdxbGAke2FjY31cbiAgICAgICAgICAgICAgICAgICAke3ZhbH1gLCAnJylcbiAgICAgICAgICA6IFwiXCI7XG59XG5cbmV4cG9ydCBjb25zdCBxdWVyeVdpdGhGcmFnbWVudHMgPSBmdW5jdGlvbihmcmFnbWVudHMsIHF1ZXJ5KSB7XG4gIHJldHVybiBncWxgJHtxdWVyeX0ke2ZyYWdtZW50c0FzU3RyaW5nKGZyYWdtZW50cyl9YDtcbn1cblxuZXhwb3J0IGNvbnN0IGFsbEZyYWdtZW50c0FzUXVlcnkgPSBmdW5jdGlvbihmcmFnbWVudHMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGZyYWdtZW50cylcbiAgICAgICAgICAucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywga2V5KSA9PlxuICAgICAgICAgICAgICBgJHthY2N9XG4gICAgICAgICAgICAgIC4uLiR7a2V5fWAsICcnKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC9xdWVyeVRyYW5zZm9ybXMuanN4Il0sInNvdXJjZVJvb3QiOiIifQ==
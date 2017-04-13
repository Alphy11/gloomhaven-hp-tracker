webpackHotUpdate(0,{

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    fragment monsterInfoMobile on Monster {\n      id,\n      number,\n      hp,\n      maxHp,\n    }'], ['\n    fragment monsterInfoMobile on Monster {\n      id,\n      number,\n      hp,\n      maxHp,\n    }']);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _graphqlTag = __webpack_require__(11);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _ListItem = __webpack_require__(75);

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListSection = __webpack_require__(119);

var _ListSection2 = _interopRequireDefault(_ListSection);

var _MonsterGroupContainer = __webpack_require__(74);

var _MonsterGroupContainer2 = _interopRequireDefault(_MonsterGroupContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function MonsterListRow(_ref) {
  var monster = _ref.monster;
  var number = monster.number,
      hp = monster.hp,
      maxHp = monster.maxHp;


  return _react2['default'].createElement(
    _ListItem2['default'],
    null,
    _react2['default'].createElement(
      _ListSection2['default'],
      { sections: 2 },
      '+'
    ),
    _react2['default'].createElement(
      _ListSection2['default'],
      null,
      number
    ),
    _react2['default'].createElement(
      _ListSection2['default'],
      { sections: 6 },
      Hp,
      ' / ',
      maxHp
    )
  );
}

MonsterListRow.fragments = {
  monsterInfoMobile: (0, _graphqlTag2['default'])(_templateObject)
};

exports['default'] = MonsterListRow;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvTW9iaWxlTW9uc3RlclRyYWNrZXIvTW9uc3Rlckxpc3RSb3cuanN4PzExNmUiXSwibmFtZXMiOlsiTW9uc3Rlckxpc3RSb3ciLCJtb25zdGVyIiwibnVtYmVyIiwiaHAiLCJtYXhIcCIsIkhwIiwiZnJhZ21lbnRzIiwibW9uc3RlckluZm9Nb2JpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxTQUFTQSxjQUFULE9BQXFDO0FBQUEsTUFBWEMsT0FBVyxRQUFYQSxPQUFXO0FBQUEsTUFFakNDLE1BRmlDLEdBSy9CRCxPQUwrQixDQUVqQ0MsTUFGaUM7QUFBQSxNQUdqQ0MsRUFIaUMsR0FLL0JGLE9BTCtCLENBR2pDRSxFQUhpQztBQUFBLE1BSWpDQyxLQUppQyxHQUsvQkgsT0FMK0IsQ0FJakNHLEtBSmlDOzs7QUFPbkMsU0FDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsUUFBYSxVQUFVLENBQXZCO0FBQUE7QUFBQSxLQURGO0FBRUU7QUFBQTtBQUFBO0FBQWNGO0FBQWQsS0FGRjtBQUdFO0FBQUE7QUFBQSxRQUFhLFVBQVUsQ0FBdkI7QUFBMkJHLFFBQTNCO0FBQUE7QUFBa0NEO0FBQWxDO0FBSEYsR0FERjtBQU1EOztBQUVESixlQUFlTSxTQUFmLEdBQTJCO0FBQ3pCQztBQUR5QixDQUEzQjs7cUJBVWVQLGMiLCJmaWxlIjoiMC44MzM0NjY1ZjRlNjM1MWJkYTM0Yi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuaW1wb3J0IExpc3RJdGVtIGZyb20gJy4vTGlzdEl0ZW0nO1xuaW1wb3J0IExpc3RTZWN0aW9uIGZyb20gJy4vTGlzdFNlY3Rpb24nO1xuaW1wb3J0IE1vbnN0ZXJHcm91cENvbnRhaW5lciBmcm9tICcuLi9Db250YWluZXJzL01vbnN0ZXJHcm91cENvbnRhaW5lcidcblxuZnVuY3Rpb24gTW9uc3Rlckxpc3RSb3coeyBtb25zdGVyIH0pIHtcbiAgY29uc3Qge1xuICAgIG51bWJlcixcbiAgICBocCxcbiAgICBtYXhIcCxcbiAgfSA9IG1vbnN0ZXI7XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdEl0ZW0+XG4gICAgICA8TGlzdFNlY3Rpb24gc2VjdGlvbnM9ezJ9Pis8L0xpc3RTZWN0aW9uPlxuICAgICAgPExpc3RTZWN0aW9uPntudW1iZXJ9PC9MaXN0U2VjdGlvbj5cbiAgICAgIDxMaXN0U2VjdGlvbiBzZWN0aW9ucz17Nn0+e0hwfSAvIHttYXhIcH08L0xpc3RTZWN0aW9uPlxuICAgIDwvTGlzdEl0ZW0+KTtcbn1cblxuTW9uc3Rlckxpc3RSb3cuZnJhZ21lbnRzID0ge1xuICBtb25zdGVySW5mb01vYmlsZTogZ3FsYFxuICAgIGZyYWdtZW50IG1vbnN0ZXJJbmZvTW9iaWxlIG9uIE1vbnN0ZXIge1xuICAgICAgaWQsXG4gICAgICBudW1iZXIsXG4gICAgICBocCxcbiAgICAgIG1heEhwLFxuICAgIH1gLFxufVxuXG5leHBvcnQgZGVmYXVsdCBNb25zdGVyTGlzdFJvdztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvTW9iaWxlTW9uc3RlclRyYWNrZXIvTW9uc3Rlckxpc3RSb3cuanN4Il0sInNvdXJjZVJvb3QiOiIifQ==
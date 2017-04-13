webpackHotUpdate(0,{

/***/ 435:
/***/ (function(module, exports) {



/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.subscribeToData = subscribeToData;
exports['default'] = setupSubscription;

var _graphqlTag = __webpack_require__(11);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _queryTransforms = __webpack_require__(435);

var queryTransforms = _interopRequireWildcard(_queryTransforms);

var _list = __webpack_require__(41);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Keep as *, if imported with {}, we get an undefined error in subscribeToData.

function unsbuscribe(subscription) {
  subscription();
}

function subscribeToData(objectName, relationName) {
  return function (Wrappedcomponent) {
    return function (_React$Component) {
      _inherits(subscriptionHOC, _React$Component);

      function subscriptionHOC() {
        _classCallCheck(this, subscriptionHOC);

        return _possibleConstructorReturn(this, (subscriptionHOC.__proto__ || Object.getPrototypeOf(subscriptionHOC)).apply(this, arguments));
      }

      _createClass(subscriptionHOC, [{
        key: 'componentWillReceiveProps',
        value: function () {
          function componentWillReceiveProps(newProps) {
            setupSubscription(Wrappedcomponent, newProps, objectName, relationName);
          }

          return componentWillReceiveProps;
        }()
      }, {
        key: 'render',
        value: function () {
          function render() {
            return _react2['default'].createElement(Wrappedcomponent, this.props);
          }

          return render;
        }()
      }], [{
        key: 'fragments',
        get: function () {
          function get() {
            return Wrappedcomponent.fragments;
          }

          return get;
        }()
      }, {
        key: 'displayName',
        get: function () {
          function get() {
            return 'subscriptionHOC(' + String(Wrappedcomponent.name);
          }

          return get;
        }()
      }]);

      return subscriptionHOC;
    }(_react2['default'].Component);
  };
}

function setupSubscription(WrappedComponent, newProps, objectName, relationName) {
  propsToOptions = WrappedComponent.propsToOptions || function (props) {
    return props;
  };
  var query = subscriptionQuery(WrappedComponent.fragments, objectName, relationName);

  if (!newProps.data.loading) {
    if (WrappedComponent.subscription) {
      if (newProps.data.allPosts !== WrappedComponent.props.data.allPosts) {
        // if the feed has changed, we need to unsubscribe before resubscribing
        unsbuscribe(WrappedComponent.subscription);
      } else {
        // we already have an active subscription with the right params
        return;
      }
    }

    WrappedComponent.subscription = newProps.data.subscribeToMore({
      document: query,
      variables: Object.assign({}, propsToOptions(newProps)),

      updateQuery: function () {
        function updateQuery(_ref, _ref2) {
          var prevEntries = _ref[objectName];
          var newData = _ref2.subscriptionData;

          var newObj = newData.data[objectName];
          var newEntry = newObj.node;
          var mutatedValues = newObj.previousValues;
          var mutation = newObj.mutation;
          var retList = void 0;

          switch (mutation) {
            case "CREATED":
              retList = (0, _list.addValue)(prevEntries, newEntry);
              break;
            case "UPDATED":
              retList = (0, _list.updateValue)(prevEntries, newEntry);
              break;
            case "DELETED":
              retList = (0, _list.removeValue)(prevEntries, mutatedValues);
              break;
            default:
              retList = prevEntries;
          }

          var retVal = _defineProperty({}, objectName, retList);
          return retVal;
        }

        return updateQuery;
      }(),

      onError: function () {
        function onError(err) {
          return console.error(err);
        }

        return onError;
      }()
    });
  }
}

function subscriptionQuery(fragments, type, relationName) {
  var fragmentsAsQuery = queryTransforms.allFragmentsAsQuery(fragments);

  var subscriptionTemplate = 'subscription ($id: ID!) {\n      ' + String(type) + '(\n        filter: {\n          mutation_in: [CREATED, UPDATED, DELETED],\n          node: {\n            ' + String(relationName) + ': {\n              id: $id\n            }\n          }\n        }\n      ) {\n        node {\n          ' + String(fragmentsAsQuery) + '\n        },\n        mutation,\n        previousValues {\n          id\n        }\n      }\n    }';
  return queryTransforms.queryWithFragments(fragments, subscriptionTemplate);
}

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVXRpbC9zdWJzY3JpYmUuanM/ZWFiOSJdLCJuYW1lcyI6WyJzdWJzY3JpYmVUb0RhdGEiLCJzZXR1cFN1YnNjcmlwdGlvbiIsInF1ZXJ5VHJhbnNmb3JtcyIsInVuc2J1c2NyaWJlIiwic3Vic2NyaXB0aW9uIiwib2JqZWN0TmFtZSIsInJlbGF0aW9uTmFtZSIsIldyYXBwZWRjb21wb25lbnQiLCJuZXdQcm9wcyIsInByb3BzIiwiZnJhZ21lbnRzIiwibmFtZSIsIkNvbXBvbmVudCIsIldyYXBwZWRDb21wb25lbnQiLCJwcm9wc1RvT3B0aW9ucyIsInF1ZXJ5Iiwic3Vic2NyaXB0aW9uUXVlcnkiLCJkYXRhIiwibG9hZGluZyIsImFsbFBvc3RzIiwic3Vic2NyaWJlVG9Nb3JlIiwiZG9jdW1lbnQiLCJ2YXJpYWJsZXMiLCJ1cGRhdGVRdWVyeSIsInByZXZFbnRyaWVzIiwibmV3RGF0YSIsInN1YnNjcmlwdGlvbkRhdGEiLCJuZXdPYmoiLCJuZXdFbnRyeSIsIm5vZGUiLCJtdXRhdGVkVmFsdWVzIiwicHJldmlvdXNWYWx1ZXMiLCJtdXRhdGlvbiIsInJldExpc3QiLCJyZXRWYWwiLCJvbkVycm9yIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwidHlwZSIsImZyYWdtZW50c0FzUXVlcnkiLCJhbGxGcmFnbWVudHNBc1F1ZXJ5Iiwic3Vic2NyaXB0aW9uVGVtcGxhdGUiLCJxdWVyeVdpdGhGcmFnbWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdCZ0JBLGUsR0FBQUEsZTtxQkFzQlFDLGlCOztBQXRDeEI7Ozs7QUFDQTs7OztBQUNBOztJQUFZQyxlOztBQUNaOzs7Ozs7Ozs7Ozs7OztBQU9BOztBQUVBLFNBQVNDLFdBQVQsQ0FBcUJDLFlBQXJCLEVBQW1DO0FBQ2pDQTtBQUNEOztBQUVNLFNBQVNKLGVBQVQsQ0FBeUJLLFVBQXpCLEVBQXFDQyxZQUFyQyxFQUFtRDtBQUN0RCxTQUFPLFVBQVVDLGdCQUFW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QSxNQUFNZ0Msb0VBRUFILElBRkEsMEhBTU1qQyxZQU5OLHdIQWFJa0MsZ0JBYkosd0dBQU47QUFxQkEsU0FBT3RDLGdCQUFnQnlDLGtCQUFoQixDQUFtQ2pDLFNBQW5DLEVBQThDZ0Msb0JBQTlDLENBQVA7QUFDRCxDIiwiZmlsZSI6IjAuMGViZTNjNjViYWRkNzY4NmQwNmIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIHF1ZXJ5VHJhbnNmb3JtcyBmcm9tICcuL3F1ZXJ5VHJhbnNmb3Jtcyc7XG5pbXBvcnQge1xuICBmaW5kVmFsdWVJbmRleCxcbiAgYWRkVmFsdWUsXG4gIHVwZGF0ZVZhbHVlLFxuICByZW1vdmVWYWx1ZVxufSBmcm9tICdVdGlsL2xpc3QnO1xuXG4vLyBLZWVwIGFzICosIGlmIGltcG9ydGVkIHdpdGgge30sIHdlIGdldCBhbiB1bmRlZmluZWQgZXJyb3IgaW4gc3Vic2NyaWJlVG9EYXRhLlxuXG5mdW5jdGlvbiB1bnNidXNjcmliZShzdWJzY3JpcHRpb24pIHtcbiAgc3Vic2NyaXB0aW9uKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmVUb0RhdGEob2JqZWN0TmFtZSwgcmVsYXRpb25OYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChXcmFwcGVkY29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gY2xhc3Mgc3Vic2NyaXB0aW9uSE9DIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAgICAgc3RhdGljIGdldCBmcmFnbWVudHMoKXtcbiAgICAgICAgICByZXR1cm4gV3JhcHBlZGNvbXBvbmVudC5mcmFnbWVudHNcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBnZXQgZGlzcGxheU5hbWUoKSB7XG4gICAgICAgICAgcmV0dXJuIGBzdWJzY3JpcHRpb25IT0MoJHtXcmFwcGVkY29tcG9uZW50Lm5hbWV9YFxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICAgIHNldHVwU3Vic2NyaXB0aW9uKFdyYXBwZWRjb21wb25lbnQsIG5ld1Byb3BzLCBvYmplY3ROYW1lLCByZWxhdGlvbk5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiA8V3JhcHBlZGNvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgfVxuICAgICAgfVxuICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR1cFN1YnNjcmlwdGlvbihXcmFwcGVkQ29tcG9uZW50LCBuZXdQcm9wcywgb2JqZWN0TmFtZSwgcmVsYXRpb25OYW1lKSB7XG4gIHByb3BzVG9PcHRpb25zID0gV3JhcHBlZENvbXBvbmVudC5wcm9wc1RvT3B0aW9ucyB8fCAoIChwcm9wcykgPT4gcHJvcHMgKTtcbiAgY29uc3QgcXVlcnkgPSBzdWJzY3JpcHRpb25RdWVyeShXcmFwcGVkQ29tcG9uZW50LmZyYWdtZW50cywgb2JqZWN0TmFtZSwgcmVsYXRpb25OYW1lKTtcblxuICBpZiAoIW5ld1Byb3BzLmRhdGEubG9hZGluZykge1xuICAgICAgaWYgKFdyYXBwZWRDb21wb25lbnQuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5kYXRhLmFsbFBvc3RzICE9PSBXcmFwcGVkQ29tcG9uZW50LnByb3BzLmRhdGEuYWxsUG9zdHMpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgZmVlZCBoYXMgY2hhbmdlZCwgd2UgbmVlZCB0byB1bnN1YnNjcmliZSBiZWZvcmUgcmVzdWJzY3JpYmluZ1xuICAgICAgICAgIHVuc2J1c2NyaWJlKFdyYXBwZWRDb21wb25lbnQuc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSBhbHJlYWR5IGhhdmUgYW4gYWN0aXZlIHN1YnNjcmlwdGlvbiB3aXRoIHRoZSByaWdodCBwYXJhbXNcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBXcmFwcGVkQ29tcG9uZW50LnN1YnNjcmlwdGlvbiA9IG5ld1Byb3BzLmRhdGEuc3Vic2NyaWJlVG9Nb3JlKHtcbiAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5LFxuICAgICAgICB2YXJpYWJsZXM6IHsgLi4ucHJvcHNUb09wdGlvbnMobmV3UHJvcHMpIH0sXG5cbiAgICAgICAgdXBkYXRlUXVlcnk6ICh7W29iamVjdE5hbWVdOiBwcmV2RW50cmllc30sIHtzdWJzY3JpcHRpb25EYXRhOiBuZXdEYXRhfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld09iaiA9IG5ld0RhdGEuZGF0YVtvYmplY3ROYW1lXVxuICAgICAgICAgIGNvbnN0IG5ld0VudHJ5ID0gbmV3T2JqLm5vZGU7XG4gICAgICAgICAgY29uc3QgbXV0YXRlZFZhbHVlcyA9IG5ld09iai5wcmV2aW91c1ZhbHVlcztcbiAgICAgICAgICBjb25zdCBtdXRhdGlvbiA9IG5ld09iai5tdXRhdGlvbjtcbiAgICAgICAgICBsZXQgcmV0TGlzdDtcblxuICAgICAgICAgIHN3aXRjaCAobXV0YXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJDUkVBVEVEXCI6XG4gICAgICAgICAgICAgIHJldExpc3QgPSBhZGRWYWx1ZShwcmV2RW50cmllcywgbmV3RW50cnkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJVUERBVEVEXCI6XG4gICAgICAgICAgICAgIHJldExpc3QgPSB1cGRhdGVWYWx1ZShwcmV2RW50cmllcywgbmV3RW50cnkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJERUxFVEVEXCI6XG4gICAgICAgICAgICAgIHJldExpc3QgPSByZW1vdmVWYWx1ZShwcmV2RW50cmllcywgbXV0YXRlZFZhbHVlcyk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0TGlzdCA9IHByZXZFbnRyaWVzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHJldFZhbCA9IHtcbiAgICAgICAgICAgIFtvYmplY3ROYW1lXTogcmV0TGlzdCxcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkVycm9yOiAoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyciksXG4gICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc3Vic2NyaXB0aW9uUXVlcnkoZnJhZ21lbnRzLCB0eXBlLCByZWxhdGlvbk5hbWUpIHtcbiAgY29uc3QgZnJhZ21lbnRzQXNRdWVyeSA9IHF1ZXJ5VHJhbnNmb3Jtcy5hbGxGcmFnbWVudHNBc1F1ZXJ5KGZyYWdtZW50cyk7XG5cbiAgY29uc3Qgc3Vic2NyaXB0aW9uVGVtcGxhdGUgPVxuICAgIGBzdWJzY3JpcHRpb24gKCRpZDogSUQhKSB7XG4gICAgICAke3R5cGV9KFxuICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICBtdXRhdGlvbl9pbjogW0NSRUFURUQsIFVQREFURUQsIERFTEVURURdLFxuICAgICAgICAgIG5vZGU6IHtcbiAgICAgICAgICAgICR7cmVsYXRpb25OYW1lfToge1xuICAgICAgICAgICAgICBpZDogJGlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApIHtcbiAgICAgICAgbm9kZSB7XG4gICAgICAgICAgJHtmcmFnbWVudHNBc1F1ZXJ5fVxuICAgICAgICB9LFxuICAgICAgICBtdXRhdGlvbixcbiAgICAgICAgcHJldmlvdXNWYWx1ZXMge1xuICAgICAgICAgIGlkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9YFxuICByZXR1cm4gcXVlcnlUcmFuc2Zvcm1zLnF1ZXJ5V2l0aEZyYWdtZW50cyhmcmFnbWVudHMsIHN1YnNjcmlwdGlvblRlbXBsYXRlKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVXRpbC9zdWJzY3JpYmUuanMiXSwic291cmNlUm9vdCI6IiJ9
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setPage = exports.fetchPost = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fetchPost = (0, _toolkit.createAsyncThunk)('fetchPost', function _callee() {
  var page,
      response,
      _args = arguments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("https://jsonplaceholder.typicode.com/posts?_limit=10&_page=".concat(page)));

        case 4:
          response = _context.sent;

          if (!(response.status !== 200)) {
            _context.next = 7;
            break;
          }

          throw new Error('Failed to fetch data from the API');

        case 7:
          return _context.abrupt("return", {
            data: response.data,
            page: page
          });

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.log("Error Message is:", _context.t0.message);
          throw new Error("Failed to connect to the API, ".concat(_context.t0.message));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
exports.fetchPost = fetchPost;
var cryptoCoinSlice = (0, _toolkit.createSlice)({
  name: 'post',
  initialState: {
    loading: false,
    data: [],
    state: 'idle',
    error: null,
    page: 1,
    hasMore: true // Indicator to check if more data is available

  },
  reducers: {
    setPage: function setPage(state, action) {
      state.page = action.payload;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchPost.pending, function (state) {
      state.loading = true;
    });
    builder.addCase(fetchPost.fulfilled, function (state, action) {
      state.loading = false;

      if (action.payload.data.length === 0) {
        state.hasMore = false;
      } else {
        // Ensure no duplication
        var newData = action.payload.data.filter(function (item) {
          return !state.data.some(function (existingItem) {
            return existingItem.id === item.id;
          });
        });
        state.data = [].concat(_toConsumableArray(state.data), _toConsumableArray(newData));
      }
    });
    builder.addCase(fetchPost.rejected, function (state, action) {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});
var setPage = cryptoCoinSlice.actions.setPage;
exports.setPage = setPage;
var _default = cryptoCoinSlice.reducer;
exports["default"] = _default;
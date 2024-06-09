"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.cryptoCoin = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cryptoCoin = (0, _toolkit.createAsyncThunk)('cryptoCoin', function _callee() {
  var response, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'));

        case 3:
          response = _context.sent;

          if (!(response !== 200)) {
            _context.next = 6;
            break;
          }

          throw new Error('Failed to fetch data from the API');

        case 6:
          result = response.data;
          return _context.abrupt("return", result);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log("Error Message is:", _context.t0.message);
          throw new Error("Failed to connect to the API, ".concat(_context.t0.message));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
exports.cryptoCoin = cryptoCoin;
var _default = cryptoCoin.reducer;
exports["default"] = _default;
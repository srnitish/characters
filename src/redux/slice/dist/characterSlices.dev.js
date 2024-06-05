"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.fetchCharacterById = exports.fetchAllCharacter = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchAllCharacter = (0, _toolkit.createAsyncThunk)('fetchAllCharacter', function _callee() {
  var response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("https://rickandmortyapi.com/api/character"));

        case 3:
          response = _context.sent;

          if (!(response.status !== 200)) {
            _context.next = 6;
            break;
          }

          throw new Error('Failed to fetch data from the API');

        case 6:
          data = response.data.results;
          return _context.abrupt("return", data);

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
exports.fetchAllCharacter = fetchAllCharacter;
var fetchCharacterById = (0, _toolkit.createAsyncThunk)('fetchCharacterById', function _callee2(id) {
  var response, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("https://rickandmortyapi.com/api/character/".concat(id)));

        case 3:
          response = _context2.sent;

          if (!(response.status !== 200)) {
            _context2.next = 6;
            break;
          }

          throw new Error('Failed to fetch data from the API');

        case 6:
          data = response.data;
          return _context2.abrupt("return", data);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log("Error", _context2.t0);
          throw new Error("Failed to connect to the API, ".concat(_context2.t0.message));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
exports.fetchCharacterById = fetchCharacterById;
var characterSlice = (0, _toolkit.createSlice)({
  name: 'characters',
  initialState: {
    loading: false,
    data: null,
    status: 'idle',
    error: false,
    currentCharacter: null
  },
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchAllCharacter.pending, function (state, action) {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCharacter.fulfilled, function (state, action) {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllCharacter.rejected, function (state, action) {
      state.loading = false;
      console.log("Error Message Getting From Slice.js in Rejected State:", action.error.message);
      state.error = action.error.message;
    }); // CharacterByID

    builder.addCase(fetchCharacterById.pending, function (state, action) {
      state.loading = true;
      state.currentCharacter = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCharacterById.fulfilled, function (state, action) {
      state.loading = false;
      state.currentCharacter = action.payload;
    });
    builder.addCase(fetchCharacterById.rejected, function (state, action) {
      state.loading = false;
      console.log("Error", action.payload);
      state.error = action.payload;
    });
  }
});
var _default = characterSlice.reducer;
exports["default"] = _default;
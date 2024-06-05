"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistor = exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _characterSlices = _interopRequireDefault(require("./slice/characterSlices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// defaults to localStorage for web
var persistConfig = {
  key: 'root',
  storage: _storage["default"]
};
var persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, _characterSlices["default"]);
var store = (0, _toolkit.configureStore)({
  reducer: {
    character: _characterSlices["default"],
    persistor: persistedReducer
  }
});
exports.store = store;
var persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = _interopRequireDefault(require("./errors.json"));

var _generic_validations = require("./generic_validations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function text(currentValue, state, name) {
  var textState = state[name];
  var textErrors = _errors.default.textErrors;
  var rules = textState.rules,
      _textState$errors = textState.errors,
      errors = _textState$errors === void 0 ? [] : _textState$errors;
  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 100 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 0 : _rules$minSize;
  var toWrite = maxSize - "".concat(currentValue).length;
  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, maxSize, textErrors, errors, function (errorsArray, msg) {
    textState.errors = errorsArray;
    textState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _objectSpread({}, textState);
  textState.value = currentValue;
  textState.toWrite = toWrite;
  (0, _generic_validations.minSizeValidation)(toWrite, maxSize, minSize, textErrors, textState.errors, function (errorsArray, msg) {
    textState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') textState.errorMessage = msg;
  });
  return _objectSpread({}, textState);
}

var _default = text;
exports.default = _default;
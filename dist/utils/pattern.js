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

function pattern(currentValue, state, name) {
  var patternState = state[name];
  var patternErrors = _errors.default.patternErrors;
  var pttrn = patternState.pattern,
      rules = patternState.rules,
      _patternState$errors = patternState.errors,
      errors = _patternState$errors === void 0 ? [] : _patternState$errors;
  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 100 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 0 : _rules$minSize;
  var toWrite = maxSize - "".concat(currentValue).length;

  if (pttrn === '' || pttrn === undefined) {
    var notPattern = patternErrors.notPattern;
    throw new Error("".concat(notPattern.error, " ").concat(notPattern.message));
  }

  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, maxSize, patternErrors, errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    patternState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _objectSpread({}, patternState); // Current value is setting in state

  patternState.value = currentValue;
  patternState.toWrite = toWrite;
  (0, _generic_validations.patternMatchValidation)(pttrn, currentValue, patternErrors, patternState.errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') patternState.errorMessage = msg;
  });
  (0, _generic_validations.minSizeValidation)(toWrite, maxSize, minSize, patternErrors, patternState.errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') patternState.errorMessage = msg;
  });
  return _objectSpread({}, patternState);
}

var _default = pattern;
exports.default = _default;
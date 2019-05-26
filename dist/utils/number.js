"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = _interopRequireDefault(require("./errors.json"));

var _error = require("./error");

var _generic_validations = require("./generic_validations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function number(currentValue, state, name) {
  var numberErrors = _errors.default.numberErrors;
  var numberState = state[name];
  var rules = numberState.rules,
      _numberState$errors = numberState.errors,
      errors = _numberState$errors === void 0 ? [] : _numberState$errors;
  var _rules$format = rules.format,
      format = _rules$format === void 0 ? 'int' : _rules$format,
      _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 7 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 5 : _rules$minSize,
      _rules$enforceZero = rules.enforceZero,
      enforceZero = _rules$enforceZero === void 0 ? false : _rules$enforceZero;
  var toWrite = maxSize - "".concat(currentValue).length;
  var writeDot = false;
  var isNotNumber = (0, _generic_validations.isNotNumberValidation)(currentValue, numberErrors, errors, function (errorsArray, msg) {
    numberState.errors = errorsArray;
    numberState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (isNotNumber) return _objectSpread({}, numberState);
  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, maxSize, numberErrors, errors, function (errorsArray, msg) {
    numberState.errors = errorsArray;
    numberState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _objectSpread({}, numberState);

  if (format === 'float' || format === 'int') {
    var notInteger = numberErrors.notInteger;

    if (currentValue.includes('.') && format === 'int') {
      var errs = (0, _error.setStandarError)(errors, notInteger.error);
      numberState.errors = errs;
      numberState.errorMessage = notInteger.msg;
      return _objectSpread({}, numberState);
    }

    if (currentValue[currentValue.length - 1] === '.') writeDot = !writeDot;
  } else {
    var invalidFormat = numberErrors.invalidFormat;
    throw new Error("".concat(invalidFormat.error, " -> ").concat(invalidFormat.message));
  }

  var virtualValue = currentValue;
  if (!writeDot && currentValue !== '') virtualValue = Number(currentValue);
  if (currentValue === '' && enforceZero) virtualValue = Number(currentValue);
  if (currentValue === '' && !enforceZero) virtualValue = '';
  numberState.value = virtualValue;
  numberState.toWrite = toWrite;
  (0, _generic_validations.minSizeValidation)(toWrite, maxSize, minSize, numberErrors, numberState.errors, function (arrayErrors, msg) {
    numberState.errors = arrayErrors;
    numberState.errorMessage = msg;
  });
  return _objectSpread({}, numberState);
}

var _default = number;
exports.default = _default;
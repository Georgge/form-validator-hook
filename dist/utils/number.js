'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _errors = require('./errors.json');

var _errors2 = _interopRequireDefault(_errors);

var _error = require('./error');

var _generic_validations = require('./generic_validations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function number(currentValue, state, name) {
  var numberErrors = _errors2.default.numberErrors;

  var numberState = state[name];
  var rules = numberState.rules,
      _numberState$errors = numberState.errors,
      errors = _numberState$errors === undefined ? [] : _numberState$errors;
  var _rules$format = rules.format,
      format = _rules$format === undefined ? 'int' : _rules$format,
      _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === undefined ? 7 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === undefined ? 5 : _rules$minSize,
      _rules$enforceZero = rules.enforceZero,
      enforceZero = _rules$enforceZero === undefined ? false : _rules$enforceZero;


  var toWrite = maxSize - ('' + currentValue).length;
  var writeDot = false;

  var isNotNumber = (0, _generic_validations.isNotNumberValidation)(currentValue, numberErrors, errors, function (errorsArray, msg) {
    numberState.errors = errorsArray;
    numberState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (isNotNumber) return _extends({}, numberState);

  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, maxSize, numberErrors, errors, function (errorsArray, msg) {
    numberState.errors = errorsArray;
    numberState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _extends({}, numberState);

  if (format === 'float' || format === 'int') {
    var notInteger = numberErrors.notInteger;


    if (currentValue.includes('.') && format === 'int') {
      var errs = (0, _error.setStandarError)(errors, notInteger.error);
      numberState.errors = errs;
      numberState.errorMessage = notInteger.msg;
      return _extends({}, numberState);
    }

    if (currentValue[currentValue.length - 1] === '.') writeDot = !writeDot;
  } else {
    var invalidFormat = numberErrors.invalidFormat;

    throw new Error(invalidFormat.error + ' -> ' + invalidFormat.message);
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

  return _extends({}, numberState);
}

exports.default = number;
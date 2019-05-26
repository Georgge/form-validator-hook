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
  var number_errors = _errors2.default.number_errors;

  var numberState = state[name];
  var rules = numberState.rules,
      _numberState$errors = numberState.errors,
      errors = _numberState$errors === undefined ? [] : _numberState$errors;
  var _rules$format = rules.format,
      format = _rules$format === undefined ? 'int' : _rules$format,
      _rules$max_size = rules.max_size,
      max_size = _rules$max_size === undefined ? 7 : _rules$max_size,
      _rules$min_size = rules.min_size,
      min_size = _rules$min_size === undefined ? 5 : _rules$min_size,
      _rules$enforce_zero = rules.enforce_zero,
      enforce_zero = _rules$enforce_zero === undefined ? false : _rules$enforce_zero;


  var toWrite = max_size - ('' + currentValue).length;
  var writeDot = false;

  var isNotNumber = (0, _generic_validations.isNotNumberValidation)(currentValue, number_errors, errors, function (errorsArray, msg) {
    numberState.errors = errorsArray;
    numberState.error_message = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (isNotNumber) return _extends({}, numberState);

  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, max_size, number_errors, errors, function (errorsArray, msg) {
    numberState.errors = errorsArray;
    numberState.error_message = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _extends({}, numberState);

  if (format === 'float' || format === 'int') {
    var not_integer = number_errors.not_integer;


    if (currentValue.includes('.') && format === 'int') {
      var errs = (0, _error.setStandarError)(errors, not_integer.error);
      numberState.errors = errs;
      numberState.error_message = not_integer.msg;
      return _extends({}, numberState);
    }

    if (currentValue[currentValue.length - 1] === '.') writeDot = !writeDot;
  } else {
    var invalid_format = number_errors.invalid_format;

    throw new Error(invalid_format.error + ' -> ' + invalid_format.message);
  }

  var virtualValue = currentValue;
  if (!writeDot && currentValue !== '') virtualValue = Number(currentValue);
  if (currentValue === '' && enforce_zero) virtualValue = Number(currentValue);
  if (currentValue === '' && !enforce_zero) virtualValue = '';

  numberState.value = virtualValue;
  numberState.to_write = toWrite;

  (0, _generic_validations.minSizeValidation)(toWrite, max_size, min_size, number_errors, numberState.errors, function (arrayErrors, msg) {
    numberState.errors = arrayErrors;
    numberState.error_message = msg;
  });

  return _extends({}, numberState);
}

exports.default = number;
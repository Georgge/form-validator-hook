'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _errors = require('./errors.json');

var _errors2 = _interopRequireDefault(_errors);

var _generic_validations = require('./generic_validations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pattern(currentValue, state, name) {
  var patternState = state[name];
  var pattern_errors = _errors2.default.pattern_errors;
  var pttrn = patternState.pattern,
      rules = patternState.rules,
      _patternState$errors = patternState.errors,
      errors = _patternState$errors === undefined ? [] : _patternState$errors;
  var _rules$max_size = rules.max_size,
      max_size = _rules$max_size === undefined ? 100 : _rules$max_size,
      _rules$min_size = rules.min_size,
      min_size = _rules$min_size === undefined ? 0 : _rules$min_size;


  var toWrite = max_size - ('' + currentValue).length;

  if (pttrn === '' || pttrn === undefined) {
    var not_pattern = pattern_errors.not_pattern;

    throw new Error(not_pattern.error + ' ' + not_pattern.message);
  }

  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, max_size, pattern_errors, errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    patternState.error_message = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _extends({}, patternState);

  // Current value is setting in state
  patternState.value = currentValue;
  patternState.to_write = toWrite;

  (0, _generic_validations.patternMatchValidation)(pttrn, currentValue, pattern_errors, patternState.errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') patternState.error_message = msg;
  });

  (0, _generic_validations.minSizeValidation)(toWrite, max_size, min_size, pattern_errors, patternState.errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') patternState.error_message = msg;
  });

  return _extends({}, patternState);
}

exports.default = pattern;
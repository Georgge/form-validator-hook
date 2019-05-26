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
  var patternErrors = _errors2.default.patternErrors;
  var pttrn = patternState.pattern,
      rules = patternState.rules,
      _patternState$errors = patternState.errors,
      errors = _patternState$errors === undefined ? [] : _patternState$errors;
  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === undefined ? 100 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === undefined ? 0 : _rules$minSize;


  var toWrite = maxSize - ('' + currentValue).length;

  if (pttrn === '' || pttrn === undefined) {
    var notPattern = patternErrors.notPattern;

    throw new Error(notPattern.error + ' ' + notPattern.message);
  }

  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, maxSize, patternErrors, errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    patternState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _extends({}, patternState);

  // Current value is setting in state
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

  return _extends({}, patternState);
}

exports.default = pattern;
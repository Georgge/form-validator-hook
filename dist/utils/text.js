'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _errors = require('./errors.json');

var _errors2 = _interopRequireDefault(_errors);

var _generic_validations = require('./generic_validations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function text(currentValue, state, name) {
  var textState = state[name];
  var textErrors = _errors2.default.textErrors;
  var rules = textState.rules,
      _textState$errors = textState.errors,
      errors = _textState$errors === undefined ? [] : _textState$errors;
  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === undefined ? 100 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === undefined ? 0 : _rules$minSize;


  var toWrite = maxSize - ('' + currentValue).length;

  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, maxSize, textErrors, errors, function (errorsArray, msg) {
    textState.errors = errorsArray;
    textState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _extends({}, textState);

  textState.value = currentValue;
  textState.toWrite = toWrite;

  (0, _generic_validations.minSizeValidation)(toWrite, maxSize, minSize, textErrors, textState.errors, function (errorsArray, msg) {
    textState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') textState.errorMessage = msg;
  });

  return _extends({}, textState);
}

exports.default = text;
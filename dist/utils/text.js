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
  var text_errors = _errors2.default.text_errors;
  var rules = textState.rules,
      _textState$errors = textState.errors,
      errors = _textState$errors === undefined ? [] : _textState$errors;
  var _rules$max_size = rules.max_size,
      max_size = _rules$max_size === undefined ? 100 : _rules$max_size,
      _rules$min_size = rules.min_size,
      min_size = _rules$min_size === undefined ? 0 : _rules$min_size;


  var toWrite = max_size - ('' + currentValue).length;

  var maxError = (0, _generic_validations.maxSizeValidation)(toWrite, max_size, text_errors, errors, function (errorsArray, msg) {
    textState.errors = errorsArray;
    textState.error_message = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _extends({}, textState);

  textState.value = currentValue;
  textState.to_write = toWrite;

  (0, _generic_validations.minSizeValidation)(toWrite, max_size, min_size, text_errors, textState.errors, function (errorsArray, msg) {
    textState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') textState.error_message = msg;
  });

  return _extends({}, textState);
}

exports.default = text;
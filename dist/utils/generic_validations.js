'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotNumberValidation = exports.isNumber = exports.patternMatchValidation = exports.minSizeValidation = exports.maxSizeValidation = undefined;

var _error = require('./error');

function maxSizeValidation(toWrite, maxSize, errorCodes, currentErrors, callback) {
  var sizeError = (0, _error.createMaxSizeError)(errorCodes, maxSize);
  if (toWrite + 1 === 0) {
    var _errors = (0, _error.setStandarError)(currentErrors, sizeError.error);
    return callback(_errors, sizeError.message);
  }

  var errors = (0, _error.removeStandarError)(currentErrors, sizeError.error);
  return callback(errors, '');
}

function minSizeValidation(toWrite, maxSize, minSize, errorCodes, currentErrors, callback) {
  var sizeError = (0, _error.createMinSizeError)(errorCodes, minSize);
  if (toWrite > maxSize - minSize) {
    var _errors2 = (0, _error.setStandarError)(currentErrors, sizeError.error);
    return callback(_errors2, sizeError.message);
  }

  var errors = (0, _error.removeStandarError)(currentErrors, sizeError.error);
  return callback(errors, '');
}

function patternMatchValidation(pattern, value, errorCodes, currentErrors, callback) {
  var not_match = errorCodes.not_match;

  if (!pattern.test(value)) {
    var _errors3 = (0, _error.setStandarError)(currentErrors, not_match.error);
    return callback(_errors3, not_match.message);
  }

  var errors = (0, _error.removeStandarError)(currentErrors, not_match.error);
  return callback(errors, '');
}

function isNumber(value) {
  return !Number.isNaN(Number(value));
}

function isNotNumberValidation(value, errorCodes, currentErrors, callback) {
  var isNum = isNumber(value);
  var not_number = errorCodes.not_number;

  if (!isNum) {
    var _errors4 = (0, _error.setStandarError)(currentErrors, not_number.error);
    return callback(_errors4, not_number.message);
  }

  var errors = (0, _error.removeStandarError)(currentErrors, not_number.error);
  return callback(errors, '');
}

exports.maxSizeValidation = maxSizeValidation;
exports.minSizeValidation = minSizeValidation;
exports.patternMatchValidation = patternMatchValidation;
exports.isNumber = isNumber;
exports.isNotNumberValidation = isNotNumberValidation;
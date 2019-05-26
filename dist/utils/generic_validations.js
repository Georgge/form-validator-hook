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
  var notMatch = errorCodes.notMatch;

  if (!pattern.test(value)) {
    var _errors3 = (0, _error.setStandarError)(currentErrors, notMatch.error);
    return callback(_errors3, notMatch.message);
  }

  var errors = (0, _error.removeStandarError)(currentErrors, notMatch.error);
  return callback(errors, '');
}

function isNumber(value) {
  return !Number.isNaN(Number(value));
}

function isNotNumberValidation(value, errorCodes, currentErrors, callback) {
  var isNum = isNumber(value);
  var notNumber = errorCodes.notNumber;

  if (!isNum) {
    var _errors4 = (0, _error.setStandarError)(currentErrors, notNumber.error);
    return callback(_errors4, notNumber.message);
  }

  var errors = (0, _error.removeStandarError)(currentErrors, notNumber.error);
  return callback(errors, '');
}

exports.maxSizeValidation = maxSizeValidation;
exports.minSizeValidation = minSizeValidation;
exports.patternMatchValidation = patternMatchValidation;
exports.isNumber = isNumber;
exports.isNotNumberValidation = isNotNumberValidation;
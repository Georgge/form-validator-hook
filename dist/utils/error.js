"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function setStandarError(currentErrros, newError) {
  if (currentErrros.includes(newError)) return currentErrros;
  return [].concat(_toConsumableArray(currentErrros), [newError]);
}

function removeStandarError(currentErrros, desiredError) {
  if (currentErrros.includes(desiredError)) {
    var errors = currentErrros.filter(function (error) {
      return error !== desiredError;
    });
    return errors;
  }

  return currentErrros;
}

function createMaxSizeError(Errors, size) {
  var errorSize = {};
  var max_size = Errors.max_size;

  errorSize.message = "" + max_size.message + size;
  errorSize.error = max_size.error;

  return errorSize;
}

function createMinSizeError(Errors, size) {
  var errorSize = {};
  var min_size = Errors.min_size;

  errorSize.message = "" + min_size.message + size;
  errorSize.error = min_size.error;

  return errorSize;
}

exports.setStandarError = setStandarError;
exports.removeStandarError = removeStandarError;
exports.createMaxSizeError = createMaxSizeError;
exports.createMinSizeError = createMinSizeError;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStandarError = setStandarError;
exports.removeStandarError = removeStandarError;
exports.createMaxSizeError = createMaxSizeError;
exports.createMinSizeError = createMinSizeError;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
  var maxSize = Errors.maxSize;
  errorSize.message = "".concat(maxSize.message).concat(size);
  errorSize.error = maxSize.error;
  return errorSize;
}

function createMinSizeError(Errors, size) {
  var errorSize = {};
  var minSize = Errors.minSize;
  errorSize.message = "".concat(minSize.message).concat(size);
  errorSize.error = minSize.error;
  return errorSize;
}
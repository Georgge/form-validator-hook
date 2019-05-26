import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

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

export { setStandarError, removeStandarError, createMaxSizeError, createMinSizeError };
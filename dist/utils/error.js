import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { concatenateMessage } from './generalUtils';

function setStandarError() {
  var currentErrros = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var newError = arguments.length > 1 ? arguments[1] : undefined;
  if (currentErrros.includes(newError)) return currentErrros;
  return [].concat(_toConsumableArray(currentErrros), [newError]);
}

function removeStandarError() {
  var currentErrros = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var desiredError = arguments.length > 1 ? arguments[1] : undefined;

  if (currentErrros.includes(desiredError)) {
    var errors = currentErrros.filter(function (error) {
      return error !== desiredError;
    });
    return errors;
  }

  return currentErrros;
}

function setTemporalError(currentErrorMessage, state, name, setState) {
  var time = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1000;
  var currentState = state[name];
  setTimeout(function () {
    setState(_objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, currentState, {
      errorMessage: currentErrorMessage
    }))));
  }, time);
}

function createMaxSizeError(Errors, size) {
  var errorSize = {};
  var maxSize = Errors.maxSize;
  errorSize.message = concatenateMessage(maxSize.message, size);
  errorSize.error = maxSize.error;
  return errorSize;
}

function createMinSizeError(Errors, size) {
  var errorSize = {};
  var minSize = Errors.minSize;
  errorSize.message = concatenateMessage(minSize.message, size);
  errorSize.error = minSize.error;
  return errorSize;
}

export { setStandarError, removeStandarError, setTemporalError, createMaxSizeError, createMinSizeError };
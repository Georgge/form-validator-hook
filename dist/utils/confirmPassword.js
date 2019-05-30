import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import Errors from './errors.json';
import { setTemporalError } from './error';
import { maxSizeValidation, minSizeValidation, equalValuesValidation } from './generic_validations';

function confirmPassword(currentValue, state, name, setState) {
  var confirmState = state[name];
  var rules = confirmState.rules,
      _confirmState$errors = confirmState.errors,
      errors = _confirmState$errors === void 0 ? [] : _confirmState$errors,
      passwordFather = confirmState.passwordFather,
      customMessages = confirmState.customMessages,
      temporalMessagesTime = confirmState.temporalMessagesTime;

  var _ref = customMessages || Errors,
      confirmPasswordErrors = _ref.confirmPasswordErrors;

  var passwordState = passwordFather ? state[passwordFather] : false;
  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 16 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 8 : _rules$minSize;
  var toWrite = maxSize - "".concat(currentValue).length;

  if (passwordFather === '' || passwordFather === undefined) {
    var notPasswordFather = confirmPasswordErrors.notPasswordFather;
    throw new Error("[".concat(notPasswordFather.error, "] ").concat(notPasswordFather.message));
  }

  var maxError = maxSizeValidation(toWrite, maxSize, confirmPasswordErrors, errors, function (valid, errorsArray, msg) {
    if (msg) {
      var currentError = confirmState.errorMessage;
      setTemporalError(currentError, state, name, setState, temporalMessagesTime);
      confirmState.errorMessage = msg;
      return true;
    }

    return false;
  });
  if (maxError) return _objectSpread({}, confirmState);
  confirmState.valid = true;
  confirmState.errorMessage = '';
  confirmState.value = currentValue;
  confirmState.toWrite = toWrite;
  minSizeValidation(toWrite, maxSize, minSize, confirmPasswordErrors, confirmState.errors, function (valid, errorsArray, msg) {
    confirmState.errors = errorsArray;

    if (msg) {
      confirmState.valid = valid;
      confirmState.errorMessage = msg;
    }
  });

  if (passwordState) {
    var value = passwordState.value;
    var notEqual = confirmPasswordErrors.notEqual;
    equalValuesValidation(currentValue, value, _objectSpread({}, notEqual), confirmState.errors, function (valid, errorsArray, msg) {
      confirmState.errors = errorsArray;

      if (msg) {
        confirmState.valid = valid;
        confirmState.errorMessage = msg;
      }
    });
  }

  return _objectSpread({}, confirmState);
}

export default confirmPassword;
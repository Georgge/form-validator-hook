import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import Errors from './errors.json';
import { maxSizeValidation, minSizeValidation, patternMatchValidation } from './generic_validations';

function pattern(currentValue, state, name) {
  var patternState = state[name];
  var pttrn = patternState.pattern,
      rules = patternState.rules,
      _patternState$errors = patternState.errors,
      errors = _patternState$errors === void 0 ? [] : _patternState$errors,
      customMessages = patternState.customMessages;

  var _ref = customMessages || Errors,
      patternErrors = _ref.patternErrors;

  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 100 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 0 : _rules$minSize;
  var toWrite = maxSize - "".concat(currentValue).length;
  patternState.valid = true;
  patternState.errorMessage = '';

  if (pttrn === '' || pttrn === undefined) {
    var notPattern = patternErrors.notPattern;
    throw new Error("".concat(notPattern.error, " ").concat(notPattern.message));
  }

  var maxError = maxSizeValidation(toWrite, maxSize, patternErrors, errors, function (valid, errorsArray, msg) {
    patternState.errors = errorsArray;

    if (msg) {
      patternState.valid = valid;
      patternState.errorMessage = msg;
      return true;
    }

    return false;
  });
  if (maxError) return _objectSpread({}, patternState); // Current value is setting in state

  patternState.value = currentValue;
  patternState.toWrite = toWrite;
  patternMatchValidation(pttrn, currentValue, _objectSpread({}, patternErrors.notMatch), patternState.errors, function (valid, errorsArray, msg) {
    patternState.errors = errorsArray;

    if (msg) {
      patternState.valid = valid;
      patternState.errorMessage = msg;
    }
  });
  minSizeValidation(toWrite, maxSize, minSize, patternErrors, patternState.errors, function (valid, errorsArray, msg) {
    patternState.errors = errorsArray;

    if (msg) {
      patternState.valid = valid;
      patternState.errorMessage = msg;
    }
  });
  return _objectSpread({}, patternState);
}

export default pattern;
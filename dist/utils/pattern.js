import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import Errors from './errors.json';
import { maxSizeValidation, minSizeValidation, patternMatchValidation } from './generic_validations';

function pattern(currentValue, state, name) {
  var patternState = state[name];
  var patternErrors = Errors.patternErrors;
  var pttrn = patternState.pattern,
      rules = patternState.rules,
      _patternState$errors = patternState.errors,
      errors = _patternState$errors === void 0 ? [] : _patternState$errors;
  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 100 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 0 : _rules$minSize;
  var toWrite = maxSize - "".concat(currentValue).length;

  if (pttrn === '' || pttrn === undefined) {
    var notPattern = patternErrors.notPattern;
    throw new Error("".concat(notPattern.error, " ").concat(notPattern.message));
  }

  var maxError = maxSizeValidation(toWrite, maxSize, patternErrors, errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    patternState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _objectSpread({}, patternState); // Current value is setting in state

  patternState.value = currentValue;
  patternState.toWrite = toWrite;
  patternMatchValidation(pttrn, currentValue, patternErrors, patternState.errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') patternState.errorMessage = msg;
  });
  minSizeValidation(toWrite, maxSize, minSize, patternErrors, patternState.errors, function (errorsArray, msg) {
    patternState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') patternState.errorMessage = msg;
  });
  return _objectSpread({}, patternState);
}

export default pattern;
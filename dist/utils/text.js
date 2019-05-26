import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import Errors from './errors.json';
import { maxSizeValidation, minSizeValidation } from './generic_validations';

function text(currentValue, state, name) {
  var textState = state[name];
  var textErrors = Errors.textErrors;
  var rules = textState.rules,
      _textState$errors = textState.errors,
      errors = _textState$errors === void 0 ? [] : _textState$errors;
  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 100 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 0 : _rules$minSize;
  var toWrite = maxSize - "".concat(currentValue).length;
  var maxError = maxSizeValidation(toWrite, maxSize, textErrors, errors, function (errorsArray, msg) {
    textState.errors = errorsArray;
    textState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _objectSpread({}, textState);
  textState.value = currentValue;
  textState.toWrite = toWrite;
  minSizeValidation(toWrite, maxSize, minSize, textErrors, textState.errors, function (errorsArray, msg) {
    textState.errors = errorsArray;
    if (errorsArray.length > 0 && msg !== '') textState.errorMessage = msg;
  });
  return _objectSpread({}, textState);
}

export default text;
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import Errors from './errors.json';
import { setTemporalError } from './error';
import { trimLeft, trimMultipleSpecials } from './generalUtils';
import { maxSizeValidation, minSizeValidation } from './generic_validations';

function text(value, state, name, setState) {
  var textState = state[name];
  var rules = textState.rules,
      _textState$errors = textState.errors,
      errors = _textState$errors === void 0 ? [] : _textState$errors,
      customMessages = textState.customMessages,
      temporalMessagesTime = textState.temporalMessagesTime,
      trim = textState.trim;

  var _ref = customMessages || Errors,
      textErrors = _ref.textErrors;

  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 100 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 0 : _rules$minSize;
  var currentValue = value;
  if (trim === 'sides') currentValue = value.trim();
  if (trim === 'start') currentValue = trimLeft(value);
  if (trim === 'multiples') currentValue = trimMultipleSpecials(value);
  var toWrite = maxSize - "".concat(currentValue).length;
  var maxError = maxSizeValidation(toWrite, maxSize, textErrors, errors, function (valid, errorsArray, msg) {
    if (msg) {
      var currentMessage = textState.errorMessage;
      setTemporalError(currentMessage, state, name, setState, temporalMessagesTime);
      textState.errorMessage = msg;
      return true;
    }

    return false;
  });
  if (maxError) return _objectSpread({}, textState);
  textState.valid = true;
  textState.errorMessage = '';
  textState.value = currentValue;
  textState.toWrite = toWrite;
  minSizeValidation(toWrite, maxSize, minSize, textErrors, textState.errors, function (valid, errorsArray, msg) {
    textState.valid = valid;
    textState.errors = errorsArray;
    if (msg) textState.errorMessage = msg;
  });
  return _objectSpread({}, textState);
}

export default text;
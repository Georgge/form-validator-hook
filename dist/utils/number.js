import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import Errors from './errors.json';
import { setStandarError } from './error';
import { maxSizeValidation, minSizeValidation, isNotNumberValidation } from './generic_validations';

function number(currentValue, state, name) {
  var numberErrors = Errors.numberErrors;
  var numberState = state[name];
  var rules = numberState.rules,
      _numberState$errors = numberState.errors,
      errors = _numberState$errors === void 0 ? [] : _numberState$errors;
  var _rules$format = rules.format,
      format = _rules$format === void 0 ? 'int' : _rules$format,
      _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 7 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 5 : _rules$minSize,
      _rules$enforceZero = rules.enforceZero,
      enforceZero = _rules$enforceZero === void 0 ? false : _rules$enforceZero;
  var toWrite = maxSize - "".concat(currentValue).length;
  var writeDot = false;
  var isNotNumber = isNotNumberValidation(currentValue, numberErrors, errors, function (errorsArray, msg) {
    numberState.errors = errorsArray;
    numberState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (isNotNumber) return _objectSpread({}, numberState);
  var maxError = maxSizeValidation(toWrite, maxSize, numberErrors, errors, function (errorsArray, msg) {
    numberState.errors = errorsArray;
    numberState.errorMessage = msg;
    if (msg.length > 0) return true;
    return false;
  });
  if (maxError) return _objectSpread({}, numberState);

  if (format === 'float' || format === 'int') {
    var notInteger = numberErrors.notInteger;

    if (currentValue.includes('.') && format === 'int') {
      var errs = setStandarError(errors, notInteger.error);
      numberState.errors = errs;
      numberState.errorMessage = notInteger.msg;
      return _objectSpread({}, numberState);
    }

    if (currentValue[currentValue.length - 1] === '.') writeDot = !writeDot;
  } else {
    var invalidFormat = numberErrors.invalidFormat;
    throw new Error("".concat(invalidFormat.error, " -> ").concat(invalidFormat.message));
  }

  var virtualValue = currentValue;
  if (!writeDot && currentValue !== '') virtualValue = Number(currentValue);
  if (currentValue === '' && enforceZero) virtualValue = Number(currentValue);
  if (currentValue === '' && !enforceZero) virtualValue = '';
  numberState.value = virtualValue;
  numberState.toWrite = toWrite;
  minSizeValidation(toWrite, maxSize, minSize, numberErrors, numberState.errors, function (arrayErrors, msg) {
    numberState.errors = arrayErrors;
    numberState.errorMessage = msg;
  });
  return _objectSpread({}, numberState);
}

export default number;
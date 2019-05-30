import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import Errors from './errors.json';
import { setTemporalError } from './error';
import { maxSizeValidation, minSizeValidation, patternMatchValidation } from './generic_validations';

function password(currentValue, state, name, setState) {
  var passwordState = state[name];
  var rules = passwordState.rules,
      _passwordState$errors = passwordState.errors,
      errors = _passwordState$errors === void 0 ? [] : _passwordState$errors,
      customMessages = passwordState.customMessages,
      temporalMessagesTime = passwordState.temporalMessagesTime;

  var _ref = customMessages || Errors,
      passwordErrors = _ref.passwordErrors;

  var _rules$maxSize = rules.maxSize,
      maxSize = _rules$maxSize === void 0 ? 16 : _rules$maxSize,
      _rules$minSize = rules.minSize,
      minSize = _rules$minSize === void 0 ? 8 : _rules$minSize,
      _rules$upperCases = rules.upperCases,
      upperCases = _rules$upperCases === void 0 ? true : _rules$upperCases,
      _rules$lowerCases = rules.lowerCases,
      lowerCases = _rules$lowerCases === void 0 ? true : _rules$lowerCases,
      _rules$numbers = rules.numbers,
      numbers = _rules$numbers === void 0 ? true : _rules$numbers,
      _rules$specials = rules.specials,
      specials = _rules$specials === void 0 ? true : _rules$specials;
  var toWrite = maxSize - "".concat(currentValue).length;
  var fullSecurity = upperCases && lowerCases && numbers && specials;
  var maxError = maxSizeValidation(toWrite, maxSize, passwordErrors, errors, function (valid, errorsArray, msg) {
    if (msg) {
      var currentMessage = passwordState.errorMessage;
      console.log(currentMessage);
      setTemporalError(currentMessage, state, name, setState, temporalMessagesTime);
      passwordState.errorMessage = msg;
      return true;
    }

    return false;
  });
  if (maxError) return _objectSpread({}, passwordState);
  passwordState.valid = true;
  passwordState.errorMessage = '';
  passwordState.value = currentValue;
  passwordState.toWrite = toWrite;
  minSizeValidation(toWrite, maxSize, minSize, passwordErrors, passwordState.errors, function (valid, errorsArray, msg) {
    passwordState.errors = errorsArray;

    if (msg) {
      passwordState.valid = valid;
      passwordState.errorMessage = msg;
    }
  });

  if (fullSecurity) {
    var fse = passwordErrors.fullSecurity;
    var pattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&* _-])[\w!@#$%^&* _-]/;
    patternMatchValidation(pattern, currentValue, _objectSpread({}, fse), errors, function (valid, errorsArray, msg) {
      passwordState.errors = errorsArray;

      if (msg) {
        passwordState.valid = valid;
        passwordState.errorMessage = msg;
      }
    });
  }

  return _objectSpread({}, passwordState);
}

export default password;
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import JSONerrors from './errors.json';
import { hasRequiredValidation, hasInvalidFieldsValidation } from './generic_validations';

function required(target, state) {
  var formErrors = JSONerrors.formErrors;
  var requiredFields = formErrors.requiredFields,
      invalidFields = formErrors.invalidFields;
  var fields = target.querySelectorAll('input');
  var requiredState = state;
  var _requiredState$errors = requiredState.errors,
      errors = _requiredState$errors === void 0 ? [] : _requiredState$errors;
  requiredState.errorMessage = '';
  hasRequiredValidation(fields, requiredState, _objectSpread({}, requiredFields), errors, function (valid, errorsArray, msg) {
    requiredState.valid = valid;
    requiredState.errors = errorsArray;
    if (msg) requiredState.errorMessage = msg;
  });
  hasInvalidFieldsValidation(fields, requiredState, _objectSpread({}, invalidFields), requiredState.errors, function (valid, errorsArray, msg) {
    if (requiredState.valid) requiredState.valid = valid;
    requiredState.errors = errorsArray;
    if (msg) requiredState.errorMessage = msg;
  });
  return _objectSpread({}, requiredState);
}

export default required;
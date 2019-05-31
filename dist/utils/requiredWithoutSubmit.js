import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import JSONerrors from './errors.json';
import { hasRequiredValidation, hasInvalidFieldsValidation } from './generic_validations';

function requiredWithoutSubmit(state) {
  var requiredState = state;
  var formErrors = JSONerrors.formErrors;
  var formId = requiredState.formId,
      _requiredState$errors = requiredState.errors,
      errors = _requiredState$errors === void 0 ? [] : _requiredState$errors;
  var form = formId ? document.querySelector("#".concat(formId)) : false;
  var invalidFields = formErrors.invalidFields,
      requiredFields = formErrors.requiredFields,
      notFormId = formErrors.notFormId,
      notInputs = formErrors.notInputs;

  if (formId === '' || formId === undefined || !form) {
    throw new Error("[".concat(notFormId.error, "] ").concat(notFormId.message));
  }

  var fields = form.querySelectorAll('input');
  requiredState.valid = true;
  requiredState.errorMessage = '';

  if (!fields) {
    throw new Error("[".concat(notInputs.error, "] ").concat(notInputs.message));
  }

  hasRequiredValidation(fields, requiredState, _objectSpread({}, requiredFields), errors, function (valid, errorsArray, msg) {
    requiredState.errors = errorsArray;

    if (msg) {
      requiredState.valid = valid;
      requiredState.errorMessage = msg;
    }
  });
  hasInvalidFieldsValidation(fields, requiredState, _objectSpread({}, invalidFields), requiredState.errors, function (valid, errorsArray, msg) {
    requiredState.errors = errorsArray;
    if (requiredState.valid) requiredState.valid = valid;
    if (msg) requiredState.errorMessage = msg;
  });
  return _objectSpread({}, requiredState);
}

export default requiredWithoutSubmit;
import JSONerrors from './errors.json';
import { hasRequiredValidation, hasInvalidFieldsValidation } from './generic_validations';

function requiredWithoutSubmit(state) {
  const requiredState = state;
  const { formErrors } = JSONerrors;
  const { formId, errors = [] } = requiredState;
  const form = formId ? document.querySelector(`#${formId}`) : false;
  const {
    invalidFields, requiredFields, notFormId, notInputs,
  } = formErrors;

  if (formId === '' || formId === undefined || !form) {
    throw new Error(`[${notFormId.error}] ${notFormId.message}`);
  }

  const fields = form.querySelectorAll('input');

  requiredState.valid = true;
  requiredState.errorMessage = '';

  if (!fields) {
    throw new Error(`[${notInputs.error}] ${notInputs.message}`);
  }

  hasRequiredValidation(fields, requiredState, { ...requiredFields }, errors,
    (valid, errorsArray, msg) => {
      requiredState.errors = errorsArray;
      if (msg) {
        requiredState.valid = valid;
        requiredState.errorMessage = msg;
      }
    });

  hasInvalidFieldsValidation(fields, requiredState, { ...invalidFields }, requiredState.errors,
    (valid, errorsArray, msg) => {
      requiredState.errors = errorsArray;
      if (requiredState.valid) requiredState.valid = valid;
      if (msg)requiredState.errorMessage = msg;
    });

  return { ...requiredState };
}

export default requiredWithoutSubmit;

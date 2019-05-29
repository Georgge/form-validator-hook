import JSONerrors from './errors.json';
import { hasRequiredValidation, hasInvalidFieldsValidation } from './generic_validations';

function required(target, state) {
  const { formErrors } = JSONerrors;
  const { requiredFields, invalidFields } = formErrors;
  const fields = target.querySelectorAll('input');
  const requiredState = state;
  const { errors = [] } = requiredState;

  requiredState.errorMessage = '';

  hasRequiredValidation(fields, requiredState, { ...requiredFields }, errors,
    (valid, errorsArray, msg) => {
      requiredState.valid = valid;
      requiredState.errors = errorsArray;
      if (msg) requiredState.errorMessage = msg;
    });

  hasInvalidFieldsValidation(fields, requiredState, { ...invalidFields }, requiredState.errors,
    (valid, errorsArray, msg) => {
      if (requiredState.valid) requiredState.valid = valid;
      requiredState.errors = errorsArray;
      if (msg) requiredState.errorMessage = msg;
    });

  return { ...requiredState };
}

export default required;

// eslint-disable-next-line no-unused-vars
import React from 'react';

import {
  number, text, pattern, hasRequiredValidation, JSONerrors,
  hasInvalidFieldsValidation,
} from '../utils';

function useFormValidator() {
  const typeValidator = (target, state) => {
    const { name, value } = target;
    const { type } = state[name];

    switch (type) {
      case 'number':
        return { ...state, [name]: { ...number(value, state, name) } };
      case 'text':
        return { ...state, [name]: { ...text(value, state, name) } };
      case 'pattern':
        return { ...state, [name]: { ...pattern(value, state, name) } };
      default:
        return { ...state };
    }
  };

  const requiredValidator = (target, state) => {
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
  };

  return {
    typeValidator,
    requiredValidator,
  };
}

export default useFormValidator;

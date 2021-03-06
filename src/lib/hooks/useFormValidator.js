// eslint-disable-next-line no-unused-vars
import React from 'react';

import {
  number, text, pattern, password, confirmPassword,
  requiredWithoutSubmit, required, radio,
} from '../utils';

function useFormValidator() {
  const typeValidator = (target, state, setState) => {
    const { name, value } = target;
    const { type } = state[name];

    switch (type) {
      case 'number':
        return { ...state, [name]: { ...number(value, state, name, setState) } };
      case 'text':
        return { ...state, [name]: { ...text(value, state, name, setState) } };
      case 'pattern':
        return { ...state, [name]: { ...pattern(value, state, name, setState) } };
      case 'password':
        return { ...state, [name]: { ...password(value, state, name, setState) } };
      case 'confirm-password':
        return { ...state, [name]: { ...confirmPassword(value, state, name, setState) } };
      case 'radio':
        return { ...state, [name]: { ...radio(value, state, name, setState) } };
      default:
        return { ...state };
    }
  };


  const requiredValidatorWithoutSubmit = (state) => {
    const validation = requiredWithoutSubmit(state);
    return { ...validation };
  };


  const requiredValidator = (target, state) => {
    const validation = required(target, state);
    return { ...validation };
  };

  return {
    typeValidator,
    requiredValidatorWithoutSubmit,
    requiredValidator,
  };
}

export default useFormValidator;

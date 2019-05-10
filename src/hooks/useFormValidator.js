// eslint-disable-next-line no-unused-vars
import React from 'react';

import number from '../utils/number';

function useFormValidator() {
  const changeValidator = (target, state) => {
    const { name, value } = target;
    const { type } = state[name];

    switch (type) {
      case 'number':
        return { ...state, [name]: { ...number(value, state[name]) } };
      default:
        break;
    }
  };

  const submitValidator = () => {
    //
  };

  return {
    changeValidator,
    submitValidator,
  };
}

export default useFormValidator;

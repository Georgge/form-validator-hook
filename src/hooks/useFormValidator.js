// eslint-disable-next-line no-unused-vars
import React from 'react';

import { number, text, pattern } from '../utils';

function useFormValidator() {
  const changeValidator = (target, object, setState) => {
    const { name, value } = target;
    const { type } = object[name];

    switch (type) {
      case 'number':
        return { ...object, [name]: { ...number(value, object, name, setState) } };
      case 'text':
        return { ...object, [name]: { ...text(value, object, name, setState) } };
      case 'pattern':
        return { ...object, [name]: { ...pattern(value, object, name, setState) } };
      default:
        return { ...object };
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

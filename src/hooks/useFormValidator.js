// eslint-disable-next-line no-unused-vars
import React from 'react';

import { number, text } from '../utils/utils';

function useFormValidator() {
  const changeValidator = (target, object) => {
    const { name, value } = target;
    const { type } = object[name];

    switch (type) {
      case 'number':
        return { ...object, [name]: { ...number(value, object[name]) } };
      case 'text':
        return { ...object, [name]: { ...text(value, object[name]) } };
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

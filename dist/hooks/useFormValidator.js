import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { number, text, pattern } from '../utils';

function useFormValidator() {
  var changeValidator = function changeValidator(target, object) {
    var name = target.name,
        value = target.value;
    var type = object[name].type;

    switch (type) {
      case 'number':
        return _objectSpread({}, object, _defineProperty({}, name, _objectSpread({}, number(value, object, name))));

      case 'text':
        return _objectSpread({}, object, _defineProperty({}, name, _objectSpread({}, text(value, object, name))));

      case 'pattern':
        return _objectSpread({}, object, _defineProperty({}, name, _objectSpread({}, pattern(value, object, name))));

      default:
        return _objectSpread({}, object);
    }
  };

  var submitValidator = function submitValidator() {//
  };

  return {
    changeValidator: changeValidator,
    submitValidator: submitValidator
  };
}

export default useFormValidator;
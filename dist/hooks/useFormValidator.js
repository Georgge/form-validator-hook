import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { number, text, pattern, password, confirmPassword, requiredWithoutSubmit, required } from '../utils';

function useFormValidator() {
  var typeValidator = function typeValidator(target, state, setState) {
    var name = target.name,
        value = target.value;
    var type = state[name].type;

    switch (type) {
      case 'number':
        return _objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, number(value, state, name, setState))));

      case 'text':
        return _objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, text(value, state, name, setState))));

      case 'pattern':
        return _objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, pattern(value, state, name, setState))));

      case 'password':
        return _objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, password(value, state, name, setState))));

      case 'confirm-password':
        return _objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, confirmPassword(value, state, name, setState))));

      default:
        return _objectSpread({}, state);
    }
  };

  var requiredValidatorWithoutSubmit = function requiredValidatorWithoutSubmit(state) {
    var validation = requiredWithoutSubmit(state);
    return _objectSpread({}, validation);
  };

  var requiredValidator = function requiredValidator(target, state) {
    var validation = required(target, state);
    return _objectSpread({}, validation);
  };

  return {
    typeValidator: typeValidator,
    requiredValidatorWithoutSubmit: requiredValidatorWithoutSubmit,
    requiredValidator: requiredValidator
  };
}

export default useFormValidator;
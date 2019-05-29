import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { number, text, pattern, hasRequiredValidation, JSONerrors, hasInvalidFieldsValidation } from '../utils';

function useFormValidator() {
  var typeValidator = function typeValidator(target, state) {
    var name = target.name,
        value = target.value;
    var type = state[name].type;

    switch (type) {
      case 'number':
        return _objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, number(value, state, name))));

      case 'text':
        return _objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, text(value, state, name))));

      case 'pattern':
        return _objectSpread({}, state, _defineProperty({}, name, _objectSpread({}, pattern(value, state, name))));

      default:
        return _objectSpread({}, state);
    }
  };

  var requiredValidator = function requiredValidator(target, state) {
    var formErrors = JSONerrors.formErrors;
    var requiredFields = formErrors.requiredFields,
        invalidFields = formErrors.invalidFields;
    var fields = target.querySelectorAll('input');
    var requiredState = state;
    var _requiredState$errors = requiredState.errors,
        errors = _requiredState$errors === void 0 ? [] : _requiredState$errors;
    requiredState.errorMessage = '';
    hasRequiredValidation(fields, requiredState, _objectSpread({}, requiredFields), errors, function (valid, errorsArray, msg) {
      requiredState.valid = valid;
      requiredState.errors = errorsArray;
      if (msg) requiredState.errorMessage = msg;
    });
    hasInvalidFieldsValidation(fields, requiredState, _objectSpread({}, invalidFields), requiredState.errors, function (valid, errorsArray, msg) {
      if (requiredState.valid) requiredState.valid = valid;
      requiredState.errors = errorsArray;
      if (msg) requiredState.errorMessage = msg;
    });
    return _objectSpread({}, requiredState);
  };

  return {
    typeValidator: typeValidator,
    requiredValidator: requiredValidator
  };
}

export default useFormValidator;
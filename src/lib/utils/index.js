import JSONerrors from './errors.json';
import { setStandarError } from './error';
import {
  trimLeft, trimMultipleSpecials, concatenateMessage,
} from './generalUtils';
import {
  maxSizeValidation, minSizeValidation, hasRequiredValidation,
  hasInvalidFieldsValidation,
} from './generic_validations';
import required from './required';
import requiredWithoutSubmit from './requiredWithoutSubmit';
import number from './number';
import pattern from './pattern';
import text from './text';
import password from './password';
import confirmPassword from './confirmPassword';
import radio from './radio';

export {
  JSONerrors,
  setStandarError,
  trimLeft,
  trimMultipleSpecials,
  concatenateMessage,
  maxSizeValidation,
  minSizeValidation,
  hasRequiredValidation,
  hasInvalidFieldsValidation,
  required,
  requiredWithoutSubmit,
  number,
  pattern,
  text,
  password,
  confirmPassword,
  radio,
};

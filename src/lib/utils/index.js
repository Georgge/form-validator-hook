import JSONerrors from './errors.json';
import {
  maxSizeValidation, minSizeValidation, hasRequiredValidation,
  hasInvalidFieldsValidation,
} from './generic_validations';
import { setStandarError } from './error';
import required from './required';
import requiredWithoutSubmit from './requiredWithoutSubmit';
import number from './number';
import pattern from './pattern';
import text from './text';
import password from './password';
import confirmPassword from './confirmPassword';

export {
  JSONerrors,
  maxSizeValidation,
  minSizeValidation,
  setStandarError,
  required,
  requiredWithoutSubmit,
  number,
  pattern,
  text,
  password,
  confirmPassword,
  hasRequiredValidation,
  hasInvalidFieldsValidation,
};

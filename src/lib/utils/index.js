import JSONerrors from './errors.json';
import {
  maxSizeValidation, minSizeValidation, hasRequiredValidation,
  hasInvalidFieldsValidation,
} from './generic_validations';
import { setStandarError } from './error';
import number from './number';
import pattern from './pattern';
import text from './text';
import password from './password';

export {
  JSONerrors,
  maxSizeValidation,
  minSizeValidation,
  setStandarError,
  number,
  pattern,
  text,
  password,
  hasRequiredValidation,
  hasInvalidFieldsValidation,
};

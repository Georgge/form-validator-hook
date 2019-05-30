import Errors from './errors.json';
import { setTemporalError } from './error';
import { trimLeft, trimMultipleSpecials } from './generalUtils';
import {
  maxSizeValidation, minSizeValidation, patternMatchValidation,
} from './generic_validations';

function pattern(value, state, name, setState) {
  const patternState = state[name];
  const {
    pattern: pttrn, rules, errors = [], customMessages,
    temporalMessagesTime, trim,
  } = patternState;
  const { patternErrors } = customMessages || Errors;
  const {
    maxSize = 100,
    minSize = 0,
  } = rules;

  let currentValue = value;
  if (trim === 'sides') currentValue = value.trim();
  if (trim === 'start') currentValue = trimLeft(value);
  if (trim === 'multiples') currentValue = trimMultipleSpecials(value);

  const toWrite = maxSize - `${currentValue}`.length;

  if (pttrn === '' || pttrn === undefined) {
    const { notPattern } = patternErrors;
    throw new Error(`${notPattern.error} ${notPattern.message}`);
  }

  const maxError = maxSizeValidation(toWrite, maxSize, patternErrors, errors,
    (valid, errorsArray, msg) => {
      if (msg) {
        const currentMessage = patternState.errorMessage;
        setTemporalError(currentMessage, state, name, setState, temporalMessagesTime);
        patternState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...patternState };


  patternState.valid = true;
  patternState.errorMessage = '';
  patternState.value = currentValue;
  patternState.toWrite = toWrite;

  patternMatchValidation(pttrn, currentValue, { ...patternErrors.notMatch }, patternState.errors,
    (valid, errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (msg) {
        patternState.valid = valid;
        patternState.errorMessage = msg;
      }
    });

  minSizeValidation(toWrite, maxSize, minSize, patternErrors, patternState.errors,
    (valid, errorsArray, msg) => {
      patternState.errors = errorsArray;
      if (msg) {
        patternState.valid = valid;
        patternState.errorMessage = msg;
      }
    });

  return { ...patternState };
}

export default pattern;

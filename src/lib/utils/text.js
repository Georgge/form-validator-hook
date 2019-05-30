import Errors from './errors.json';
import { setTemporalError } from './error';
import { trimLeft, trimMultipleSpecials } from './generalUtils';
import { maxSizeValidation, minSizeValidation } from './generic_validations';

function text(value, state, name, setState) {
  const textState = state[name];
  const {
    rules, errors = [], customMessages,
    temporalMessagesTime, trim,
  } = textState;
  const { textErrors } = customMessages || Errors;
  const {
    maxSize = 100,
    minSize = 0,
  } = rules;

  let currentValue = value;
  if (trim === 'sides') currentValue = value.trim();
  if (trim === 'start') currentValue = trimLeft(value);
  if (trim === 'multiples') currentValue = trimMultipleSpecials(value);

  const toWrite = maxSize - `${currentValue}`.length;

  const maxError = maxSizeValidation(toWrite, maxSize, textErrors, errors,
    (valid, errorsArray, msg) => {
      if (msg) {
        const currentMessage = textState.errorMessage;
        setTemporalError(currentMessage, state, name, setState, temporalMessagesTime);
        textState.errorMessage = msg;
        return true;
      }
      return false;
    });
  if (maxError) return { ...textState };


  textState.valid = true;
  textState.errorMessage = '';
  textState.value = currentValue;
  textState.toWrite = toWrite;

  minSizeValidation(toWrite, maxSize, minSize, textErrors, textState.errors,
    (valid, errorsArray, msg) => {
      textState.valid = valid;
      textState.errors = errorsArray;
      if (msg) textState.errorMessage = msg;
    });

  return { ...textState };
}

export default text;

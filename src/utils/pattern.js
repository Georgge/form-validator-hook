import Errors from './errors.json';
import { maxSizeValidation, minSizeValidation } from './generic_validations';

function pattern(currentValue, object) {
  const patternState = object;
  const { pattern_errors } = Errors;
  const { pattern: pttrn, rules, errors = [] } = patternState;
  const {
    max_size = 100,
    min_size = 0,
  } = rules;

  const toWrite = max_size - `${currentValue}`.length;

  if (pttrn === '' || pttrn === undefined) {
    const { not_pattern } = pattern_errors;
    throw new Error(`${not_pattern.error} ${not_pattern.message}`);
  }

  const maxSizeValid = maxSizeValidation(toWrite, max_size, pattern_errors, errors, patternState);
  if (maxSizeValid) return { ...maxSizeValid };

  patternState.value = currentValue;

  const minSizeValid = minSizeValidation(toWrite, max_size, min_size, pattern_errors, errors, patternState);
  if (minSizeValid) return { ...minSizeValid };

  return { ...patternState, errors: [], error_message: '', to_write: toWrite };
}

export default pattern;

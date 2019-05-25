import {
  createMaxSizeError, createMinSizeError, setStandarError,
  removeStandarError,
} from './error';


function maxSizeValidation(toWrite, maxSize, errorCodes, currentErrors, callback) {
  const sizeError = createMaxSizeError(errorCodes, maxSize);
  if (toWrite + 1 === 0) {
    const errors = setStandarError(currentErrors, sizeError.error);
    return callback(errors, sizeError.message);
  }

  const errors = removeStandarError(currentErrors, sizeError.error);
  return callback(errors, '');
}


function minSizeValidation(toWrite, maxSize, minSize, errorCodes, currentErrors, callback) {
  const sizeError = createMinSizeError(errorCodes, minSize);
  if (toWrite > maxSize - minSize) {
    const errors = setStandarError(currentErrors, sizeError.error);
    return callback(errors, sizeError.message);
  }

  const errors = removeStandarError(currentErrors, sizeError.error);
  return callback(errors, '');
}


function patternMatchValidation(pattern, value, errorCodes, currentErrors, callback) {
  const { not_match } = errorCodes;
  if (!pattern.test(value)) {
    const errors = setStandarError(currentErrors, not_match.error);
    return callback(errors, not_match.message);
  }

  const errors = removeStandarError(currentErrors, not_match.error);
  return callback(errors, '');
}


export {
  maxSizeValidation,
  minSizeValidation,
  patternMatchValidation,
};

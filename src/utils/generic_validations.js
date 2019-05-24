import {
  createMaxSizeError, createMinSizeError, setStandarError,
  removeStandarError,
} from './error';

function maxSizeValidation(toWrite, maxSize, Errors, errors, state) {
  if (toWrite + 1 === 0) {
    const sizeError = createMaxSizeError(Errors, maxSize);
    const error = setStandarError(state, sizeError);
    return { ...error };
  }

  return false;
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

export {
  maxSizeValidation,
  minSizeValidation,
};

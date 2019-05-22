import {
  createMaxSizeError, createMinSizeError, setStandarError,
} from './error';

function maxSizeValidation(toWrite, maxSize, Errors, errors, state) {
  if (toWrite + 1 === 0) {
    const sizeError = createMaxSizeError(Errors, maxSize, errors);
    const error = setStandarError(state, sizeError.errors, sizeError.msg);
    return { ...error };
  }

  return false;
}

function minSizeValidation(toWrite, maxSize, minSize, Errors, errors, state) {
  console.log(errors)
  if (toWrite > maxSize - minSize) {
    const sizeError = createMinSizeError(Errors, minSize, errors);
    const error = setStandarError(state, sizeError.errors, sizeError.msg);
    return { ...error };
  }

  return false;
}

export {
  maxSizeValidation,
  minSizeValidation,
};

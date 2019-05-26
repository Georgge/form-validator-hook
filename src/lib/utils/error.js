function setStandarError(currentErrros, newError) {
  if (currentErrros.includes(newError)) return currentErrros;
  return [...currentErrros, newError];
}

function removeStandarError(currentErrros, desiredError) {
  if (currentErrros.includes(desiredError)) {
    const errors = currentErrros.filter(error => error !== desiredError);
    return errors;
  }

  return currentErrros;
}

function createMaxSizeError(Errors, size) {
  const errorSize = {};
  const { maxSize } = Errors;
  errorSize.message = `${maxSize.message}${size}`;
  errorSize.error = maxSize.error;

  return errorSize;
}

function createMinSizeError(Errors, size) {
  const errorSize = {};
  const { minSize } = Errors;
  errorSize.message = `${minSize.message}${size}`;
  errorSize.error = minSize.error;

  return errorSize;
}

export {
  setStandarError,
  removeStandarError,
  createMaxSizeError,
  createMinSizeError,
};

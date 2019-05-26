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
  const { max_size } = Errors;
  errorSize.message = `${max_size.message}${size}`;
  errorSize.error = max_size.error;

  return errorSize;
}

function createMinSizeError(Errors, size) {
  const errorSize = {};
  const { min_size } = Errors;
  errorSize.message = `${min_size.message}${size}`;
  errorSize.error = min_size.error;

  return errorSize;
}

export {
  setStandarError,
  removeStandarError,
  createMaxSizeError,
  createMinSizeError,
};

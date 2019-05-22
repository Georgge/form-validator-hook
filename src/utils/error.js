function setStandarError(object, array, string) {
  const objectValue = object;
  objectValue.valid = false;
  objectValue.errors = array;
  objectValue.error_message = string;

  return { ...objectValue };
}

function createMaxSizeError(Errors, size, errors) {
  const errorSize = { errors: [], msg: '' };
  const { max_size } = Errors;

  errorSize.msg = `${max_size.message}${size}`;
  errorSize.errors = [...errors, max_size.error];

  return { ...errorSize };
}

function createMinSizeError(Errors, size, errors) {
  const errorSize = { errors: [], msg: '' };
  const { min_size } = Errors;

  errorSize.msg = `${min_size.message}${size}`;
  errorSize.errors = [...errors, min_size.error];

  return { ...errorSize };
}

export {
  setStandarError,
  createMaxSizeError,
  createMinSizeError,
};

function setStandarError(object, array, string) {
  const objectValue = object;
  objectValue.valid = false;
  objectValue.errors = array;
  objectValue.error_message = string;

  return { ...objectValue };
}

export {
  // eslint-disable-next-line import/prefer-default-export
  setStandarError,
};

import { concatenateMessage } from './generalUtils';

function setStandarError(currentErrros = [], newError) {
  if (currentErrros.includes(newError)) return currentErrros;
  return [...currentErrros, newError];
}

function removeStandarError(currentErrros = [], desiredError) {
  if (currentErrros.includes(desiredError)) {
    const errors = currentErrros.filter(error => error !== desiredError);
    return errors;
  }

  return currentErrros;
}

function setTemporalError(currentErrorMessage, state, name, setState, time = 1000) {
  const currentState = state[name];

  setTimeout(() => {
    setState({
      ...state,
      [name]: {
        ...currentState,
        errorMessage: currentErrorMessage,
      },
    });
  }, time);
}

function createMaxSizeError(Errors, size) {
  const errorSize = {};
  const { maxSize } = Errors;
  errorSize.message = concatenateMessage(maxSize.message, size);
  errorSize.error = maxSize.error;

  return errorSize;
}

function createMinSizeError(Errors, size) {
  const errorSize = {};
  const { minSize } = Errors;
  errorSize.message = concatenateMessage(minSize.message, size);
  errorSize.error = minSize.error;

  return errorSize;
}

export {
  setStandarError,
  removeStandarError,
  setTemporalError,
  createMaxSizeError,
  createMinSizeError,
};

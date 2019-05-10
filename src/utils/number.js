import Errors from './errors.json';

function number(currentValue, state) {
  const { number_errors } = Errors;
  const numberState = state;
  const { value, rules } = numberState;
  const {
    format = 'int',
  } = rules;
  const isNumber = !Number.isNaN(Number(currentValue));
  let errors = [];

  console.log(isNumber, format)
  if (!isNumber) {
    const { not_number } = number_errors;

    numberState.valid = false;
    errors = [...errors, not_number.error];
    numberState.error_message = not_number.message;
    return { ...numberState, errors };
  }

  if (format === 'float' || format === 'int') {
    const { not_integer } = number_errors;

    if (currentValue.includes('.') && format === 'int') {
      numberState.valid = false;
      errors = [...errors, not_integer.error];
      numberState.error_message = not_integer.message;
      return { ...numberState, errors };
    }
  } else {
    const { invalid_format } = number_errors;
    console.error(invalid_format.message);
    throw new Error(invalid_format.error);
  }

  numberState.value = currentValue;
  return { ...numberState, errors: [], error_message: '' };
}

export default number;

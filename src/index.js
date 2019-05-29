/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { render } from 'react-dom';

import useFormValidator from './lib';

function App() {
  const { typeValidator, requiredValidator } = useFormValidator();
  const [state, setState] = useState({
    valid: false,
    number: {
      valid: true,
      value: '',
      type: 'number',
      rules: {
        format: 'int',
      },
    },
    text: {
      valid: true,
      required: true,
      value: '',
      type: 'text',
      rules: {
        maxSize: 20,
        minSize: 5,
      },
    },
    pattern: {
      valid: true,
      required: true,
      value: '',
      type: 'pattern',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      rules: {
        maxSize: 20,
        minSize: 10,
      },
    },
  });

  console.log(state);

  const handleChange = (e) => {
    const { target } = e;
    const status = typeValidator(target, state);
    setState(status);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const status = requiredValidator(target, state);
    setState(status);
  };

  const { number, text, pattern } = state;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Valid form:
          { `${state.valid}` }
          <div>{ state.errorMessage }</div>
        </div>
        <div>
          <label>Number</label>
          <input name="number" onChange={handleChange} value={number.value} />
          <div>{ number.errorMessage }</div>
        </div>
        <div>
          <label>Text</label>
          <input type="text" name="text" onChange={handleChange} value={text.value} />
          <div>{ text.errorMessage }</div>
        </div>
        <div>
          <label>Pattern (email example)</label>
          <input type="text" name="pattern" onChange={handleChange} value={pattern.value} />
          <div>{ pattern.errorMessage }</div>
        </div>
        <div>
          <button type="submit">Validate</button>
        </div>
      </form>
    </div>
  );
}

render(<App />, document.getElementById('root'));

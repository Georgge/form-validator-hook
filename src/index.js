/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { render } from 'react-dom';

import useFormValidator from './lib';

function App() {
  const { changeValidator } = useFormValidator();
  const [state, setState] = useState({
    form_valid: false,
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
      value: '',
      type: 'text',
      rules: {
        maxSize: 20,
        minSize: 5,
      },
    },
    pattern: {
      valid: true,
      value: '',
      type: 'pattern',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      rules: {
        maxSize: 10,
        minSize: 5,
      },
    },
  });


  const handleChange = (e) => {
    const { target } = e;
    const status = changeValidator(target, state);
    setState(status);
  };

  const { number, text, pattern } = state;

  return (
    <div>
      <form>
        <div>
          <label>Numero</label>
          <input name="number" onChange={handleChange} value={number.value} />
          <div>{ number.errorMessage }</div>
        </div>
        <div>
          <label>Texto</label>
          <input type="text" name="text" onChange={handleChange} value={text.value} />
          <div>{ text.errorMessage }</div>
        </div>
        <div>
          <label>Pattern</label>
          <input type="text" name="pattern" onChange={handleChange} value={pattern.value} />
          <div>{ pattern.errorMessage }</div>
        </div>
      </form>
    </div>
  );
}

render(<App />, document.getElementById('root'));

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import useFormValidator from './hooks/useFormValidator';
import './App.css';

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
        max_size: 20,
      },
    },
    pattern: {
      valid: true,
      value: '',
      type: 'pattern',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      rules: {
        max_size: 10,
        min_size: 5,
        clear_max_size_error: true,
      },
    },
  });

  const changeState = (props) => {
    setState({
      ...state,
      ...props,
    });
  };

  const handleChange = (e) => {
    const { target } = e;
    const status = changeValidator(target, state, changeState);
    setState(status);
  };

  const { number, text, pattern } = state;

  console.log(pattern);

  return (
    <div className="App">
      <form>
        <div>
          <label>Numero</label>
          <input name="number" onChange={handleChange} value={number.value} />
          <div>{ number.error_message }</div>
        </div>
        <div>
          <label>Texto</label>
          <input type="text" name="text" onChange={handleChange} value={text.value} />
          <div>{ text.error_message }</div>
        </div>
        <div>
          <label>Pattern</label>
          <input type="text" name="pattern" onChange={handleChange} value={pattern.value} />
          <div>{ pattern.error_message }</div>
        </div>
      </form>
    </div>
  );
}

export default App;

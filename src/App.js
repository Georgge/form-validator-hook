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
        format: 'floating',
      },
    },
  });

  const handleChange = (e) => {
    const { target } = e;
    const status = changeValidator(target, state);
    setState(status);
  };

  const { number } = state;

  console.log(number);

  return (
    <div className="App">
      <input name="number" onChange={handleChange} value={number.value} />
      <div>{ number.error_message }</div>
    </div>
  );
}

export default App;

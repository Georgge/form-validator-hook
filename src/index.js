/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { render } from 'react-dom';

import customMsgs from './customMsgs.json';
import useFormValidator from './lib';

function App() {
  const { typeValidator, requiredValidatorWithoutSubmit } = useFormValidator();
  const [state, setState] = useState({
    valid: false,
    formId: 'exampleForm',
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
      trim: 'multiples',
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
      trim: 'sides',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      rules: {
        maxSize: 20,
        minSize: 10,
      },
      customMessages: customMsgs.email,
    },
    password: {
      valid: true,
      required: true,
      value: '',
      type: 'password',
      rules: {},
    },
    passwordConfirm: {
      valid: true,
      required: true,
      value: '',
      type: 'confirm-password',
      passwordFather: 'password',
      rules: {},
    },
    choice: {
      valid: true,
      required: true,
      value: '',
      type: 'radio',
    },
  });

  console.log(state);

  const handleChange = (event) => {
    const { target } = event;
    const typeValidation = typeValidator(target, state, setState);
    const status = requiredValidatorWithoutSubmit(typeValidation);
    setState(status);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { target } = e;
  //   const status = requiredValidator(target, state);
  //   setState(status);
  // };

  const {
    number, text, pattern, password, passwordConfirm,
  } = state;

  return (
    <div>
      <form id="exampleForm">
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
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} value={password.value} />
          <div>{ password.errorMessage }</div>
        </div>
        <div>
          <label>Password Confirm</label>
          <input type="password" name="passwordConfirm" onChange={handleChange} value={passwordConfirm.value} />
          <div>{ passwordConfirm.errorMessage }</div>
        </div>
        <div>
          <div>Choice one:</div>
          <label>1</label>
          <input type="radio" name="choice" value={1} onChange={handleChange} />
          <label>2</label>
          <input type="radio" name="choice" value={2} onChange={handleChange} />
          <label>3</label>
          <input type="radio" name="choice" value={3} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Validate</button>
        </div>
      </form>
    </div>
  );
}

render(<App />, document.getElementById('root'));

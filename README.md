# Form Validator Hookc (FVH)

A simple form validator for React based in hooks.

FVH use a state local or context for define the input rules,  then the onChange and onSubmit events do the work along with FVH hook.

## Install

`npm install --save form-validator-hook`
or
`yarn add form-validator-hook`

## Usage

```javascript
import React, { useState } from 'react';
import useFormValidator from 'form-validator-hook'

function App() {
  const { changeValidator } = useFormValidator();
  const [state, setState] = useState({
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
  })

  const { number, text, pattern } = state;

  const handleChange = (e) => {
    const { target } = e;
    const formStatus = changeValidator(target, state);
    setState(formStatus);
  }

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

export default App;

```
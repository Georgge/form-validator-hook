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
        maxSize: 10,
        minSize: 5,
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

export default App;
```

------------

**IMPORTANT:** The name field declared in the state should be the same that "name" property of input element.
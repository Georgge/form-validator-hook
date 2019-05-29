# Form Validator Hookc (FVH)

A simple form validator for React based in hooks.

FVH use a state local or context for define the input rules,  then the onChange and onSubmit events do the work along with FVH hook.

## Install

`npm install --save form-validator-hook`
or
`yarn add form-validator-hook`

## Basic Usage

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

## Hook Methods

Both methods are available in the hook. There examples are based in basic usage (above)

```javascript
/* ...more code above, this is only a piece of code */
import useFormValidator from 'form-validator-hook'

function NameFunction() {
	const { typeValidator, requiredValidator } = useFormValidator();
/* more code down... */

```

### typeValidator(target, state)

This validate the field type by the `onChange` event, its important to know that this method recibe two obligatory args: **the `target` prop of `input` and the `state`** of form fields. See the down example with a handle `arrow function`:

```javascript
const handleChange = (event) => {
    const { target } = event; // target destructuring (this is the input target)
    const status = typeValidator(target, state); // hook response
    setState(status); // set state with new validations obtains from typeValidator
  };
```

Call the `handleChange` function from `input element` and get the current value (use destructuring for get the field from state):

```javascript
<input type="text" name="text" onChange={handleChange} value={text.value} />
```
**VERY IMPORTANT:** the method take the `name prop` of `input element` to search the corresponding field in the `state`. So, the name should be the same in the `state` and in the `input`

### requiredValidator(target, state)

This validate the required fields, also it's check if all values are valids before to do the `submit`. This method is invoked in the `onSubmit` event, its important to know that this method recibe two obligatory args: **the `target` prop of `submit event` and the state** of form fields. See the down example with a handle arrow function:

```javascript
const handleSubmit = (event) => {
    e.preventDefault(); // important for not send the form
    const { target } = event; // target of submit event
    const status = requiredValidator(target, state); // hook response
    setState(status); // set new validations
  };
```

Call the handleSubmit function:

```javascript
<form onSubmit={handleSubmit}>
```

Invoke the handleSubmit function (button inside form):

```javascript
<button type="submit">Validate</button>
```
Know if form is valid:

```javascript
console.log(state.valid)
```

###  Response of the methods

Both methods response with the same structure (the declared state) but with different values. So, here are a little response example based in the example of **Basic Usage** section:

```javascript
{
	valid: false,
	errorMessage: "There are some fields with invalid values",
	errors: ["invalidFields"],
	text: {
		errorMessage: ""
		errors: []
		required: true
		rules: {maxSize: 20, minSize: 5}
		toWrite: 15
		type: "text"
		valid: true
		value: "1111a"
	},
	number: {...}
	pattern: {...}
}
```

Like you see the response is very similar to the declared state, but the values changed even are added some.

#### Important attributes of the response.
For form:
<table>
	<tr> <th>Attribute</th><th>Value</th><th>Description</th></tr>
	<tr><td>valid</td><td>Bolean</td><td>Determine if the form is valid, by default should be declared like `false` in the `state`.</td></tr>
	<tr><td>errorMessage</td><td>String</td><td>Current error message.</td></tr>
	<tr><td>errors</td><td>String array</td><td>The error codes of all current errors for form.</td></tr>
</table>

For inputs elements:
<table>
	<tr> <th>Attribute</th><th>Value</th><th>Description</th></tr>
	<tr><td>value</td><td>String / number</td><td>The current vale of input</td></tr>
	<tr><td>valid</td><td>Bolean</td><td>Determine if the form is valid, by default should be declared like `true` in the `state`.</td></tr>
	<tr><td>errorMessage</td><td>String</td><td>Current error message.</td></tr>
	<tr><td>errors</td><td>String array</td><td>The error codes of all current errors for spesifict input.</td></tr>
	<tr><td>toWrite</td><td>Number</td><td>The number of characters left to write.</td></tr>
</table>

## Coming soon
  - Password validator

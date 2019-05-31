function radio(value, state, name) {
  const radioState = state[name];
  radioState.valid = true;
  radioState.value = value;

  return { ...radioState };
}

export default radio;

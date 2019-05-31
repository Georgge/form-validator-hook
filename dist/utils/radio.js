import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

function radio(value, state, name) {
  var radioState = state[name];
  radioState.valid = true;
  radioState.value = value;
  return _objectSpread({}, radioState);
}

export default radio;
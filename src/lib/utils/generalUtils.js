function trimLeft(value) {
  return value.replace(/^\s+/g, '');
}

function trimMultipleSpecials(value) {
  let newValue = value;
  newValue = newValue.trimLeft(newValue);
  newValue = newValue.replace(/\s+/g, ' ');
  newValue = newValue.replace(/\.+/g, '.');
  newValue = newValue.replace(/,+/g, ',');
  newValue = newValue.replace(/!+/g, '!');
  newValue = newValue.replace(/¡+/g, '¡');
  newValue = newValue.replace(/\?+/g, '?');
  newValue = newValue.replace(/¿+/g, '¿');
  newValue = newValue.replace(/:+/g, ':');
  newValue = newValue.replace(/;+/g, ';');
  newValue = newValue.replace(/\(+/g, '(');
  newValue = newValue.replace(/\)+/g, ')');
  newValue = newValue.replace(/{+/g, '{');
  newValue = newValue.replace(/}+/g, '}');
  newValue = newValue.replace(/\[+/g, '[');
  newValue = newValue.replace(/]+/g, ']');
  newValue = newValue.replace(/=+/g, '=');
  newValue = newValue.replace(/%+/g, '%');
  newValue = newValue.replace(/&+/g, '&');
  newValue = newValue.replace(/\$+/g, '$');
  newValue = newValue.replace(/'+/g, '\'');
  newValue = newValue.replace(/"+/g, '"');

  return newValue;
}

export {
  trimLeft,
  trimMultipleSpecials,
};

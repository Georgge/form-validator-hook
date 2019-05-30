function trimLeft(value) {
  return value.replace(/^\s+/g, '');
}

function trimMultipleSpecials(value) {
  var newValue = value;
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

function concatenateMessage(value1) {
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!value1.includes('%msg%')) {
    console.warn('If you are used custom messages you should define \'%msg%\' to replace it with the number size in max size and min size validations');
    return value1;
  }

  var completeMessage = value1.replace('%msg%', value2);
  return completeMessage;
}

export { trimLeft, trimMultipleSpecials, concatenateMessage };
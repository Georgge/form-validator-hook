'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-next-line no-unused-vars


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useFormValidator() {
  var changeValidator = function changeValidator(target, object) {
    var name = target.name,
        value = target.value;
    var type = object[name].type;


    switch (type) {
      case 'number':
        return _extends({}, object, _defineProperty({}, name, _extends({}, (0, _utils.number)(value, object, name))));
      case 'text':
        return _extends({}, object, _defineProperty({}, name, _extends({}, (0, _utils.text)(value, object, name))));
      case 'pattern':
        return _extends({}, object, _defineProperty({}, name, _extends({}, (0, _utils.pattern)(value, object, name))));
      default:
        return _extends({}, object);
    }
  };

  var submitValidator = function submitValidator() {
    //
  };

  return {
    changeValidator: changeValidator,
    submitValidator: submitValidator
  };
}

exports.default = useFormValidator;
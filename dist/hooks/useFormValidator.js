"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useFormValidator() {
  var changeValidator = function changeValidator(target, object) {
    var name = target.name,
        value = target.value;
    var type = object[name].type;

    switch (type) {
      case 'number':
        return _objectSpread({}, object, _defineProperty({}, name, _objectSpread({}, (0, _utils.number)(value, object, name))));

      case 'text':
        return _objectSpread({}, object, _defineProperty({}, name, _objectSpread({}, (0, _utils.text)(value, object, name))));

      case 'pattern':
        return _objectSpread({}, object, _defineProperty({}, name, _objectSpread({}, (0, _utils.pattern)(value, object, name))));

      default:
        return _objectSpread({}, object);
    }
  };

  var submitValidator = function submitValidator() {//
  };

  return {
    changeValidator: changeValidator,
    submitValidator: submitValidator
  };
}

var _default = useFormValidator;
exports.default = _default;
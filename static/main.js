"use strict";

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generate = document.getElementById("generate");
console.log(generate.childNodes);

_db["default"].forEach(function (element) {
  console.log(element.word);
});
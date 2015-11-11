/* */ 
'use strict';
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    return Reflect.decorate(decorators, target, key, desc);
  switch (arguments.length) {
    case 2:
      return decorators.reduceRight(function(o, d) {
        return (d && d(o)) || o;
      }, target);
    case 3:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key)), void 0;
      }, void 0);
    case 4:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key, o)) || o;
      }, desc);
  }
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var lang_1 = require('../facade/lang');
var metadata_1 = require('../metadata');
var di_1 = require('../di');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
var UpperCasePipe = (function() {
  function UpperCasePipe() {}
  UpperCasePipe.prototype.transform = function(value, args) {
    if (args === void 0) {
      args = null;
    }
    if (lang_1.isBlank(value))
      return value;
    if (!lang_1.isString(value)) {
      throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(UpperCasePipe, value);
    }
    return lang_1.StringWrapper.toUpperCase(value);
  };
  UpperCasePipe = __decorate([lang_1.CONST(), metadata_1.Pipe({name: 'uppercase'}), di_1.Injectable(), __metadata('design:paramtypes', [])], UpperCasePipe);
  return UpperCasePipe;
})();
exports.UpperCasePipe = UpperCasePipe;

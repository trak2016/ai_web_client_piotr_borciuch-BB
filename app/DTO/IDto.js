var Error = (function () {
    function Error(json) {
        this._errors = [];
        if (json != null) {
            this.setErrors(json);
        }
    }
    Error.prototype.setErrors = function (json) {
        this._errors = new Array();
    };
    Object.defineProperty(Error.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    Error.prototype.clearErrors = function () {
        this._errors = [];
    };
    Error.prototype.toJson = function () {
        return null;
    };
    return Error;
})();
exports.Error = Error;
//# sourceMappingURL=IDto.js.map
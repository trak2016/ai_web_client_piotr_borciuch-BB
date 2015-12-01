var IDto_1 = require("../DTO/IDto");
var Service = (function () {
    function Service() {
    }
    Service.prototype.handle = function (response) { };
    Service.prototype.registerVoidHandler = function (handler) {
        this.voidHandler = handler;
    };
    Service.prototype.registerErrorsHandler = function (handler) {
        this.errorHandler = handler;
    };
    Service.prototype.registerObjectHandler = function (handler) {
        this.objectHandler = handler;
    };
    Service.prototype.registerArrayHandler = function (handler) {
        this.arrayHandler = handler;
    };
    Service.prototype.mapError = function (json) {
        var errors = new Array();
        for (var i = 0; i < json.length; i++) {
            errors.push(new IDto_1.Error(json[i]));
            console.log("element " + json[i]["message"]);
        }
        console.log(errors);
        return errors;
    };
    return Service;
})();
exports.Service = Service;
//# sourceMappingURL=service.js.map
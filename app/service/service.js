var Service = (function () {
    function Service() {
    }
    Service.prototype.handle = function (response) {
        if (response.status == 200 || response.status == 201) {
            this.actionHandler.onSuccess(response.json());
        }
        else {
            this.actionHandler.onFailed(response.json());
        }
    };
    Service.prototype.registerHandler = function (handler) {
        this.actionHandler = handler;
    };
    return Service;
})();
exports.Service = Service;
//# sourceMappingURL=service.js.map
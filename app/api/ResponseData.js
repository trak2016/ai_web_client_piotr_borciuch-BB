/**
 * Created by test on 2015-11-11.
 */
var ResponseData = (function () {
    function ResponseData(response) {
        this._status = response.status;
        this._body = response.text();
        this.json = response.json();
    }
    Object.defineProperty(ResponseData.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponseData.prototype, "body", {
        get: function () {
            return this._body;
        },
        set: function (value) {
            this._body = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponseData.prototype, "json", {
        get: function () {
            return this._json;
        },
        set: function (value) {
            this._json = value;
        },
        enumerable: true,
        configurable: true
    });
    return ResponseData;
})();
exports.ResponseData = ResponseData;
//# sourceMappingURL=ResponseData.js.map
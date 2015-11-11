/// <reference path="../../../typings/tsd.d.ts" />
require('zone.js');
require('reflect-metadata');
var http_1 = require('angular2/http');
var Token_1 = require('./Token');
var RestApi = (function () {
    function RestApi(http) {
        this.http = http;
        this.prepareDefaultHeaders();
    }
    RestApi.prototype.postRequest = function (url, object) {
        var _this = this;
        this.token = Token_1.Token.getInstance();
        this.addHeader(this.token.name, this.token.value);
        return this.http.post(url, object.toJson(), {
            headers: this.headers
        })
            .subscribe(function (response) {
            _this.doAction(response);
        });
    };
    RestApi.prototype.putRequest = function (url, object) {
        var _this = this;
        this.token = Token_1.Token.getInstance();
        this.addHeader(this.token.name, this.token.value);
        return this.http.put(url, object.toJson(), {
            headers: this.headers
        })
            .subscribe(function (response) {
            _this.doAction(response);
        });
    };
    RestApi.prototype.getRequest = function (url, onSuccess) {
        var _this = this;
        this.token = Token_1.Token.getInstance();
        this.addHeader(this.token.name, this.token.value);
        return this.http.get(url, {
            headers: this.headers
        })
            .subscribe(function (response) {
            _this.doAction(response);
        });
    };
    RestApi.prototype.registerHandler = function (handler) {
        this.responseHandler = handler;
    };
    RestApi.prototype.prepareDefaultHeaders = function () {
        this.headers = new http_1.Headers();
    };
    RestApi.prototype.addHeader = function (name, value) {
        this.headers.append(name, value);
    };
    RestApi.prototype.doAction = function (response) {
        this.token.value = response.headers.get(this.token.name);
        this.responseHandler.handleResponse(response);
    };
    return RestApi;
})();
exports.RestApi = RestApi;
//# sourceMappingURL=RestApi.js.map
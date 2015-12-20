var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var http_1 = require('angular2/http');
var angular2_1 = require('angular2/angular2');
var RestApi = (function () {
    function RestApi(http) {
        this.SERVLET_CONTEXT = "http://localhost:8333/Restaurant/";
        this.http = http;
    }
    RestApi.prototype.postRequest = function (url, object, handler) {
        var _this = this;
        var headers = this.prepareDefaultHeaders();
        var json = object != null ? object.toJson() : "";
        this.http.post(this.SERVLET_CONTEXT + url, json, { headers: headers })
            .subscribe(function (response) {
            handler.handle(response);
            _this.doAction(response);
        });
    };
    RestApi.prototype.putRequest = function (url, object, handler) {
        var _this = this;
        this.http.put(this.SERVLET_CONTEXT + url, object.toJson(), { headers: this.prepareDefaultHeaders() })
            .subscribe(function (response) {
            handler.handle(response);
            _this.doAction(response);
        });
    };
    RestApi.prototype.getRequest = function (url, handler) {
        var _this = this;
        this.http.get(this.SERVLET_CONTEXT + url, { headers: this.prepareDefaultHeaders() })
            .subscribe(function (response) {
            handler.handle(response);
            _this.doAction(response);
        });
    };
    RestApi.prototype.prepareDefaultHeaders = function () {
        var headers = new http_1.Headers();
        headers.set("Content-Type", "application/text");
        var tokenValue = this.getAuthToken();
        if (tokenValue != "null")
            headers.set("Restaurant-Auth-Token", tokenValue);
        return headers;
    };
    RestApi.prototype.doAction = function (response) {
        this.setAuthToken(response.headers.get("Restaurant-Auth-Token"));
    };
    RestApi.prototype.getAuthToken = function () {
        return sessionStorage.getItem("authToken");
    };
    RestApi.prototype.setAuthToken = function (token) {
        sessionStorage.setItem("authToken", token);
    };
    RestApi = __decorate([
        angular2_1.Injectable(),
        __param(0, angular2_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RestApi);
    return RestApi;
})();
exports.RestApi = RestApi;
//# sourceMappingURL=RestApi.js.map
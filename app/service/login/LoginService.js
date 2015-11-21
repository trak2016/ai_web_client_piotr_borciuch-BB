var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var angular2_1 = require('angular2/angular2');
var RestApi_1 = require("../../api/RestApi");
var Service_1 = require("../Service");
var LoginService = (function (_super) {
    __extends(LoginService, _super);
    function LoginService(restApi) {
        _super.call(this);
        this.restApi = restApi;
    }
    LoginService.prototype.login = function (login, password) {
        var auth = new AuthDTO(login, password);
        this.restApi.postRequest("auth/login", auth, this);
    };
    LoginService = __decorate([
        angular2_1.Injectable(),
        __param(0, angular2_1.Inject(RestApi_1.RestApi)), 
        __metadata('design:paramtypes', [RestApi_1.RestApi])
    ], LoginService);
    return LoginService;
})(Service_1.Service);
exports.LoginService = LoginService;
var AuthDTO = (function () {
    function AuthDTO(login, password) {
        this.login = login;
        this.password = password;
    }
    AuthDTO.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return AuthDTO;
})();
//# sourceMappingURL=LoginService.js.map
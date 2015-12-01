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
var IDto_1 = require("../../DTO/IDto");
var Service_1 = require("../Service");
var SharedMemory_1 = require("../../shared/SharedMemory");
var LoginService = (function (_super) {
    __extends(LoginService, _super);
    function LoginService(restApi, sharedMemeory) {
        _super.call(this);
        this.sharedMemory = sharedMemeory;
        this.restApi = restApi;
    }
    LoginService.prototype.login = function (login, password) {
        var auth = new IDto_1.AuthDTO(login, password);
        this.restApi.postRequest("auth/login", auth, this);
    };
    LoginService.prototype.handle = function (response) {
        console.log(response.text());
        if (response.status == 200) {
            var employeeData = new IDto_1.EmployeeDTO(response.json());
            this.putUserDataInMemory(employeeData);
            this.objectHandler.handle(employeeData);
        }
        else {
            this.errorHandler.handle(this.mapError(JSON.parse(response.text())));
        }
    };
    LoginService.prototype.putUserDataInMemory = function (employeeData) {
        sessionStorage.setItem("userLogin", employeeData.getLogin());
        var privileges = employeeData.getPrivileges();
        var cook = privileges.indexOf("COOK") >= 0 ? '0001' : '0000';
        var waiter = privileges.indexOf("WAITER") >= 0 ? '0010' : '0000';
        var manager = privileges.indexOf("MANAGER") >= 0 ? '0100' : '0000';
        var owner = privileges.indexOf("OWNER") >= 0 ? '1000' : '0000';
        var privilegesValue = (parseInt(cook, 2) | parseInt(waiter, 2) |
            parseInt(manager, 2) | parseInt(owner, 2)).toString();
        sessionStorage.setItem("userPrivileges", privilegesValue);
    };
    LoginService = __decorate([
        __param(0, angular2_1.Inject(RestApi_1.RestApi)),
        __param(1, angular2_1.Inject(SharedMemory_1.SharedMemory)), 
        __metadata('design:paramtypes', [RestApi_1.RestApi, SharedMemory_1.SharedMemory])
    ], LoginService);
    return LoginService;
})(Service_1.Service);
exports.LoginService = LoginService;
//# sourceMappingURL=LoginService.js.map
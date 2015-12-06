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
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var LoginService_1 = require('../../service/login/LoginService');
var SharedMemory_1 = require("../../shared/SharedMemory");
var LoginComponent = (function () {
    function LoginComponent(loginService, router, sharedMemory) {
        this.sharedMemory = sharedMemory;
        this.loginService = loginService;
        this.login = "";
        this.password = "";
        this.registerHandlers();
        this.router = router;
    }
    LoginComponent.prototype.onLogin = function () {
        this.sharedMemory.appErrors = [];
        this.loginService.login(this.login, this.password);
    };
    LoginComponent.prototype.handleError = function (errors) {
        for (var item in errors)
            this.sharedMemory.appErrors = errors;
    };
    LoginComponent.prototype.handleObject = function (dto) {
        this.sharedMemory.userLogin = sessionStorage.getItem("userLogin");
        this.sharedMemory.userPrivileges = sessionStorage.getItem("userPrivileges");
        this.router.navigate(['/Main']);
    };
    LoginComponent.prototype.registerHandlers = function () {
        var _this = this;
        var objectHandler = {
            handle: function (object) { return _this.handleObject(object); }
        };
        var errorsHandler = {
            handle: function (errors) { return _this.handleError(errors); }
        };
        this.loginService.registerErrorsHandler(errorsHandler);
        this.loginService.registerObjectHandler(objectHandler);
    };
    LoginComponent = __decorate([
        angular2_1.Component({
            selector: 'login',
            providers: [LoginService_1.LoginService],
        }),
        angular2_1.View({
            templateUrl: './app/view/login.html',
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [LoginService_1.LoginService, router_1.Router, SharedMemory_1.SharedMemory])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=LoginComponent.js.map
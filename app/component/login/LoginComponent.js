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
var router_1 = require('angular2/router');
var LoginService_1 = require('../../service/login/LoginService');
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.error = [];
        this.loginService = loginService;
        this.login = "";
        this.password = "";
        this.loginService.registerHandler(this);
        this.router = router;
    }
    LoginComponent.prototype.onLogin = function () {
        this.error = [];
        this.loginService.login(this.login, this.password);
    };
    LoginComponent.prototype.onSuccess = function (json) {
        var employeeData = new EmployeeData(json);
        localStorage.setItem('userLogin', employeeData.login);
        localStorage.setItem('userPrivileges', employeeData.getPrivileges().toString());
        this.router.parent.navigateByUrl('/main');
    };
    LoginComponent.prototype.onFailed = function (error) {
        this.error = error;
    };
    LoginComponent = __decorate([
        angular2_1.Component({
            selector: 'logincomponent',
            providers: [LoginService_1.LoginService],
        }),
        angular2_1.View({
            templateUrl: './app/view/login.html',
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }),
        __param(0, angular2_1.Inject(LoginService_1.LoginService)), 
        __metadata('design:paramtypes', [LoginService_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
var EmployeeData = (function () {
    function EmployeeData(json) {
        this.login = json['authenticationData']['login'];
        this.roles = json['roles'];
    }
    EmployeeData.prototype.getPrivileges = function () {
        var privileges = new Array(this.roles.length);
        for (var role in this.roles) {
            privileges.push(role["name"]);
        }
        return privileges;
    };
    return EmployeeData;
})();
//# sourceMappingURL=LoginComponent.js.map
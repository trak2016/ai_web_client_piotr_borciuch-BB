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
/**
 * Created by test on 2015-11-15.
 */
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var SharedMemory_1 = require("../../shared/SharedMemory");
var LoginComponent_1 = require("../login/LoginComponent");
var MainMenu = (function () {
    function MainMenu(sharedMemory) {
        this.sharedMemory = sharedMemory;
        this.hasAdminRole = (parseInt(this.sharedMemory.userPrivileges) & parseInt("1100", 2)) > 3;
        this.isLogged = this.sharedMemory.userLogin != null;
    }
    MainMenu.prototype.onLogin = function (event) {
        this.hasAdminRole = (parseInt(this.sharedMemory.userPrivileges) & parseInt("1100", 2)) > 3;
        this.isLogged = this.sharedMemory.userLogin != null;
        console.log(sessionStorage.getItem("authToken"));
    };
    MainMenu = __decorate([
        angular2_1.Component({
            selector: 'mainmenu'
        }),
        angular2_1.View({
            templateUrl: './app/view/main.html',
            directives: [router_1.ROUTER_DIRECTIVES, angular2_1.NgIf, LoginComponent_1.LoginComponent],
        }), 
        __metadata('design:paramtypes', [SharedMemory_1.SharedMemory])
    ], MainMenu);
    return MainMenu;
})();
exports.MainMenu = MainMenu;
//# sourceMappingURL=MainMenu.js.map
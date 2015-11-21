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
var MainMenu = (function () {
    function MainMenu() {
        this.login = this.getLogin();
    }
    MainMenu.prototype.getLogin = function () {
        return localStorage.getItem('userLogin');
    };
    MainMenu.prototype.isLogged = function () {
        return localStorage.getItem("userData") != null;
    };
    MainMenu = __decorate([
        angular2_1.Component({
            selector: 'mainmenu'
        }),
        angular2_1.View({
            templateUrl: './app/view/main.html',
            directives: [router_1.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [])
    ], MainMenu);
    return MainMenu;
})();
exports.MainMenu = MainMenu;
//# sourceMappingURL=MainMenu.js.map
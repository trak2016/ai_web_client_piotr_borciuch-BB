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
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
var MainMenu_1 = require('./main/MainMenu');
var RestApi_1 = require("../api/RestApi");
var LoginComponent_1 = require("./login/LoginComponent");
var AuthRouting_1 = require('./routing/AuthRouting');
var App = (function () {
    function App(router) {
        this.router = router;
        router.navigateByUrl('/login');
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        angular2_1.View({
            templateUrl: './app/view/app.html',
            directives: [router_1.ROUTER_DIRECTIVES, MainMenu_1.MainMenu, AuthRouting_1.AuthRouting],
        }),
        router_1.RouteConfig([
            { path: '/main', component: MainMenu_1.MainMenu, as: 'MainMenu' },
            { path: '/login', component: LoginComponent_1.LoginComponent, as: 'LoginComponent' }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], App);
    return App;
})();
exports.App = App;
angular2_1.bootstrap(App, [angular2_1.bind(router_1.APP_BASE_HREF).toValue('/'), RestApi_1.RestApi, http_1.HTTP_PROVIDERS, router_1.ROUTER_DIRECTIVES, router_1.ROUTER_PROVIDERS]);
//# sourceMappingURL=app.js.map
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
var AuthRouting_1 = require('./routing/AuthRouting');
var PositionComponent_1 = require("./position/PositionComponent");
var SharedMemory_1 = require("../shared/SharedMemory");
var RestaurantTableComponent_1 = require("./restaurantTable/RestaurantTableComponent");
var App = (function () {
    function App(router, sharedMemory) {
        this.router = router;
        this.sharedMemory = sharedMemory;
        this.router.navigate(['/Main']);
    }
    App.prototype.back = function () {
        this.router.renavigate();
    };
    App.prototype.logout = function () {
        sessionStorage.clear();
        this.sharedMemory.clear();
        this.router.navigate(['/Main']);
    };
    App = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        angular2_1.View({
            templateUrl: './app/view/app.html',
            directives: [router_1.ROUTER_DIRECTIVES, angular2_1.CORE_DIRECTIVES, MainMenu_1.MainMenu, AuthRouting_1.AuthRouting],
        }),
        router_1.RouteConfig([
            new router_1.Route({ path: '/', component: MainMenu_1.MainMenu, as: 'Main' }),
            new router_1.Route({ path: '/main', component: MainMenu_1.MainMenu, as: 'Main' }),
            new router_1.Route({ path: '/room', component: RestaurantTableComponent_1.RestaurantTableComponent, as: 'Room' }),
            new router_1.Route({ path: '/employees', component: PositionComponent_1.PositionComponent, as: 'Employees' })
        ]), 
        __metadata('design:paramtypes', [router_1.Router, SharedMemory_1.SharedMemory])
    ], App);
    return App;
})();
exports.App = App;
angular2_1.bootstrap(App, [angular2_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    angular2_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: App }),
    angular2_1.provide(router_1.APP_BASE_HREF, { useValue: '/#/' }),
    RestApi_1.RestApi, http_1.HTTP_PROVIDERS, router_1.ROUTER_DIRECTIVES, router_1.ROUTER_PROVIDERS, SharedMemory_1.SharedMemory]);
//# sourceMappingURL=app.js.map
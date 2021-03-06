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
/**
 * Created by test on 2015-11-21.
 */
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var AuthRouting = (function (_super) {
    __extends(AuthRouting, _super);
    function AuthRouting(_elementRef, _loader, _parentRouter, nameAttr) {
        _super.call(this, _elementRef, _loader, _parentRouter, nameAttr);
        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true,
        };
    }
    AuthRouting.prototype.activate = function (instruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && sessionStorage.getItem("userLogin") == null) {
            this.parentRouter.navigate(['/Login']);
        }
        return _super.prototype.activate.call(this, instruction);
    };
    AuthRouting = __decorate([
        angular2_1.Directive({ selector: 'auth-routing' }),
        __param(3, angular2_1.Attribute('name')), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, angular2_1.DynamicComponentLoader, router_1.Router, String])
    ], AuthRouting);
    return AuthRouting;
})(router_1.RouterOutlet);
exports.AuthRouting = AuthRouting;
//# sourceMappingURL=AuthRouting.js.map
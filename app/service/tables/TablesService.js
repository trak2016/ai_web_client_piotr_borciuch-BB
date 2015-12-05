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
var Service_1 = require("../Service");
var angular2_1 = require("angular2/angular2");
var RestApi_1 = require("../../api/RestApi");
var IDto_1 = require("../../DTO/IDto");
var TablesService = (function (_super) {
    __extends(TablesService, _super);
    function TablesService(restApi) {
        _super.call(this);
        this.restApi = restApi;
    }
    TablesService.prototype.getAllTables = function () {
        this.restApi.getRequest("tables", this);
    };
    TablesService.prototype.updateTable = function (table) {
        this.restApi.putRequest("tables/table", table, this);
    };
    TablesService.prototype.createNewTable = function (table) {
        this.restApi.postRequest("tables/table", table, this);
    };
    TablesService.prototype.handle = function (response) {
        if (response.status == 200) {
            if (response.text() != "") {
                this.arrayHandler.handle(this.mapObject(JSON.parse(response.text())));
            }
            else {
                this.voidHandler.handle();
            }
        }
        else if (response.status == 201) {
            this.voidHandler.handle();
        }
        else {
            this.errorHandler.handle(this.mapError(JSON.parse(response.text())));
        }
    };
    TablesService.prototype.mapObject = function (json) {
        var objects = new Array();
        for (var i = 0; i < json.length; i++) {
            objects.push(new IDto_1.RestaurantTable(json[i]));
        }
        return objects;
    };
    TablesService = __decorate([
        __param(0, angular2_1.Inject(RestApi_1.RestApi)), 
        __metadata('design:paramtypes', [RestApi_1.RestApi])
    ], TablesService);
    return TablesService;
})(Service_1.Service);
exports.TablesService = TablesService;
//# sourceMappingURL=TablesService.js.map
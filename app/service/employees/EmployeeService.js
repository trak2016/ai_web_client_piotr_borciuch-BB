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
var Service_1 = require("./../Service");
var RestApi_1 = require("../../api/RestApi");
var angular2_1 = require("angular2/angular2");
var IDto_1 = require("../../DTO/IDto");
var EmployeeService = (function (_super) {
    __extends(EmployeeService, _super);
    function EmployeeService(restApi) {
        _super.call(this);
        this.restApi = restApi;
    }
    EmployeeService.prototype.getAllEmployees = function () {
        this.restApi.getRequest("employees/", this);
    };
    EmployeeService.prototype.addNewEmployee = function (employee) {
        this.restApi.postRequest("employees/employee", employee, this);
    };
    EmployeeService.prototype.editEmployee = function (employee) {
        this.restApi.putRequest("employees/employee", employee, this);
    };
    EmployeeService.prototype.changeEmployeeStatus = function (employee) {
        this.restApi.putRequest("employees/employee" + employee.getLogin(), null, this);
    };
    EmployeeService.prototype.handle = function (response) {
        if (response.status == 200) {
            if (response.json() != null) {
                this.arrayHandler.handle(this.mapObjects(JSON.parse(response.text())));
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
    EmployeeService.prototype.mapObjects = function (json) {
        var objects = new Array();
        for (var i = 0; i < json.length; i++) {
            objects.push(new IDto_1.EmployeeDTO(json[i]));
        }
        return objects;
    };
    EmployeeService = __decorate([
        __param(0, angular2_1.Inject(RestApi_1.RestApi)), 
        __metadata('design:paramtypes', [RestApi_1.RestApi])
    ], EmployeeService);
    return EmployeeService;
})(Service_1.Service);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=EmployeeService.js.map
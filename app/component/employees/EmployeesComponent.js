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
var SortingTable_1 = require("../table/SortingTable");
var EmployeeService_1 = require("../../service/employees/EmployeeService");
var PositionService_1 = require("../../service/positions/PositionService");
var IDto_1 = require("../../DTO/IDto");
var Column_1 = require("../table/Column");
var Row_1 = require("../table/Row");
var EmployeesComponent = (function () {
    function EmployeesComponent(employeeService, positionService) {
        //Varaibles below are used to manage view
        //if true, then new employee is created, status button is blocked
        this.isNew = true;
        //If true then employee is employeed, used in input tag with type: radio
        this.employed = "EMPLOYEED";
        //if true then employee has or will have role, used in inputs with type = "checkbox"
        this.waiter = false;
        this.cook = false;
        this.manager = false;
        this.owner = false;
        this.passwordMismatch = false;
        this.employees = [];
        this.rows = [];
        this.positions = [];
        this.columns = this.getColumns();
        this.employeeService = employeeService;
        this.positionService = positionService;
        this.selectedEmployee = new IDto_1.EmployeeDTO(null);
        this.registerHandlers();
        this.statusButtonDescription = "Zwolnij";
        this.employeeService.getAllEmployees();
        this.positionService.getAllPositions();
    }
    EmployeesComponent.prototype.getColumns = function () {
        return [
            new Column_1.Column("id", "ID"),
            new Column_1.Column("name", "Imię"),
            new Column_1.Column("surname", "Nazwisko"),
            new Column_1.Column("position", "Stanowisko"),
            new Column_1.Column("status", "Status")
        ];
    };
    EmployeesComponent.prototype.mapToRows = function () {
        this.rows = new Array();
        for (var i = 0; i < this.employees.length; i++) {
            var row = new Row_1.Row();
            row.addCell("id", this.employees[i].id.toString());
            row.addCell("name", this.employees[i].name);
            row.addCell("surname", this.employees[i].surname);
            row.addCell("position", this.employees[i].getPosition());
            row.addCell("status", this.employees[i].status == "EMPLOYED" ? "Zatrudniony" : "Zwolniony");
            this.rows.push(row);
        }
    };
    EmployeesComponent.prototype.handleError = function (errors) {
        this.errors = errors;
    };
    EmployeesComponent.prototype.handleEmployeesArray = function (dtos) {
        this.employees = dtos;
        console.log(this.employees);
        this.mapToRows();
        this.refreshSelected();
        console.log(this.rows);
    };
    EmployeesComponent.prototype.handlePositionsArray = function (positions) {
        console.log(positions);
        this.positions = positions;
    };
    EmployeesComponent.prototype.onSaveEmployee = function () {
        this.passwordMismatch = false;
        if (this.selectedEmployee.id == 0) {
            if (this.password == this.confirm) {
                this.selectedEmployee.setAuthenticationData(this.login, this.password);
                this.employeeService.addNewEmployee(this.selectedEmployee);
            }
            else {
                this.passwordMismatch = true;
            }
        }
        else {
            this.employeeService.editEmployee(this.selectedEmployee);
        }
    };
    EmployeesComponent.prototype.onChangeStatus = function () {
        if (this.selectedEmployee.id != 0)
            this.employeeService.changeEmployeeStatus(this.selectedEmployee);
    };
    EmployeesComponent.prototype.onNewEmployee = function () {
        this.selectedEmployee = new IDto_1.EmployeeDTO(null);
        this.isNew = true;
        this.login = "";
        this.password = "";
        this.confirm = "";
    };
    EmployeesComponent.prototype.onSelected = function (event) {
        this.setSelectedEmployeeById(event.getElementId());
        console.log(this.selectedEmployee);
        this.isNew = false;
        //sets checkboxs with employee's roles
        this.employed = this.selectedEmployee.status;
        this.managePrivileges();
    };
    EmployeesComponent.prototype.managePrivileges = function () {
        var privileges = this.selectedEmployee.getPrivileges();
        this.waiter = this.cook = this.manager = this.owner = false;
        for (var i = 0; i < privileges.length; i++) {
            if (privileges[i] == "WAITER") {
                this.waiter = true;
            }
            else if (privileges[i] == "COOK") {
                this.cook = true;
            }
            else if (privileges[i] == "MANAGER") {
                this.manager = true;
            }
            else if (privileges[i] = "OWNER") {
                this.owner = true;
            }
        }
    };
    EmployeesComponent.prototype.prepareEmployeeToSave = function () {
        this.selectedEmployee.status = this.employed;
        var privileges = new Array();
        if (this.waiter)
            privileges.push("WAITER");
        if (this.cook)
            privileges.push("COOK");
        if (this.manager)
            privileges.push("MANAGER");
        if (this.owner)
            privileges.push("OWNER");
        this.selectedEmployee.createRoleFromPrivileges(privileges);
    };
    EmployeesComponent.prototype.setSelectedEmployeeById = function (id) {
        for (var i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id == id) {
                this.selectedEmployee = this.employees[i];
                this.statusButtonDescription = this.selectedEmployee.status == "EMPLOYED" ? "Zwolnij" : "Przywróć";
                break;
            }
        }
    };
    EmployeesComponent.prototype.refreshSelected = function () {
        if (this.selectedEmployee.id != 0) {
            this.setSelectedEmployeeById(this.selectedEmployee.id);
        }
    };
    EmployeesComponent.prototype.registerHandlers = function () {
        var _this = this;
        var errorsHandler = {
            handle: function (errors) { return _this.handleError(errors); }
        };
        var employeeHandler = {
            handle: function (employees) { return _this.handleEmployeesArray(employees); }
        };
        var positionsHandler = {
            handle: function (positions) { return _this.handlePositionsArray(positions); }
        };
        this.employeeService.registerArrayHandler(employeeHandler);
        this.employeeService.registerErrorsHandler(errorsHandler);
        this.positionService.registerErrorsHandler(errorsHandler);
        this.positionService.registerArrayHandler(positionsHandler);
    };
    EmployeesComponent = __decorate([
        angular2_1.Component({
            selector: 'employees',
            providers: [EmployeeService_1.EmployeeService, PositionService_1.PositionService]
        }),
        angular2_1.View({
            templateUrl: './app/view/employees.html',
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, SortingTable_1.SortingTable]
        }), 
        __metadata('design:paramtypes', [EmployeeService_1.EmployeeService, PositionService_1.PositionService])
    ], EmployeesComponent);
    return EmployeesComponent;
})();
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=EmployeesComponent.js.map
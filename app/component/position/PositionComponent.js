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
var angular2_1 = require("angular2/angular2");
var PositionService_1 = require("../../service/positions/PositionService");
var CustomTable_1 = require("../table/CustomTable");
var Column_1 = require("../table/Column");
var Row_1 = require("../table/Row");
var IDto_1 = require("../../DTO/IDto");
var SharedMemory_1 = require("../../shared/SharedMemory");
var EmployeesComponent_1 = require("../employees/EmployeesComponent");
var PositionComponent = (function () {
    function PositionComponent(positionService, sharedMemory) {
        this.isDisabled = false;
        this.positionService = positionService;
        this.registerHandlers();
        this.rows = [];
        this.sharedMemory = sharedMemory;
        this.columns = this.prepareColumns();
        this.selectedPosition = new IDto_1.PositionDTO(null);
        this.getAllPositions();
    }
    PositionComponent.prototype.prepareColumns = function () {
        return [
            new Column_1.Column("id", "ID"),
            new Column_1.Column("name", "Nazwa"),
        ];
    };
    PositionComponent.prototype.getAllPositions = function () {
        this.sharedMemory.appErrors = [];
        this.positionService.getAllPositions();
    };
    PositionComponent.prototype.handleOnPositionSave = function () {
        this.getAllPositions();
    };
    PositionComponent.prototype.handlePositionsArray = function (positions) {
        this.positions = positions;
        this.mapToRows();
        this.choosePositionToShow();
    };
    PositionComponent.prototype.mapToRows = function () {
        this.rows = new Array();
        for (var i = 0; i < this.positions.length; i++) {
            var row = new Row_1.Row();
            row.addCell("id", this.positions[i].id.toString());
            row.addCell("name", this.positions[i].name);
            this.rows.push(row);
        }
    };
    PositionComponent.prototype.onEmployeeChange = function (event) {
        this.sharedMemory.appErrors = [];
        this.getAllPositions();
    };
    PositionComponent.prototype.onSelectedPosition = function (event) {
        this.sharedMemory.appErrors = [];
        this.setSelectedPositionById(event.getElementId());
        this.isDisabled = false;
    };
    PositionComponent.prototype.onNewPosition = function () {
        this.sharedMemory.appErrors = [];
        this.selectedPosition = new IDto_1.PositionDTO(null);
        this.isDisabled = true;
    };
    PositionComponent.prototype.onSavePosition = function () {
        this.sharedMemory.appErrors = [];
        if (this.selectedPosition.id == 0)
            this.positionService.savePosition(this.selectedPosition);
        else
            this.positionService.editPosition(this.selectedPosition);
    };
    PositionComponent.prototype.setSelectedPositionById = function (id) {
        this.selectedPosition = new IDto_1.PositionDTO(null);
        for (var i = 0; i < this.positions.length; i++) {
            if (this.positions[i].id == id) {
                this.selectedPosition = this.positions[i];
                this.isDisabled = false;
                break;
            }
        }
    };
    PositionComponent.prototype.registerHandlers = function () {
        var _this = this;
        var errorsHandler = {
            handle: function (errors) { return _this.sharedMemory.appErrors = errors; }
        };
        var voidHandler = {
            handle: function () { return _this.handleOnPositionSave(); }
        };
        var positionsHandler = {
            handle: function (positions) { return _this.handlePositionsArray(positions); }
        };
        this.positionService.registerArrayHandler(positionsHandler);
        this.positionService.registerErrorsHandler(errorsHandler);
        this.positionService.registerVoidHandler(voidHandler);
    };
    PositionComponent.prototype.choosePositionToShow = function () {
        var id = this.selectedPosition.id;
        if (id != 0) {
            this.setSelectedPositionById(id);
            if (this.selectedPosition.id == 0 && this.positions.length > 0) {
                this.selectedPosition = this.positions.pop();
            }
        }
        else {
            this.setNewestPosition();
        }
    };
    PositionComponent.prototype.setNewestPosition = function () {
        if (this.positions.length > 0) {
            this.positions.sort(function (first, second) {
                if (first.id > second.id)
                    return 1;
                else if (first.id < second.id)
                    return -1;
                else
                    return 0;
            });
            this.selectedPosition = this.positions[0];
        }
    };
    PositionComponent = __decorate([
        angular2_1.Component({
            selector: 'positions',
            providers: [PositionService_1.PositionService]
        }),
        angular2_1.View({
            templateUrl: './app/view/positions.html',
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, CustomTable_1.CustomTable, EmployeesComponent_1.EmployeesComponent]
        }), 
        __metadata('design:paramtypes', [PositionService_1.PositionService, SharedMemory_1.SharedMemory])
    ], PositionComponent);
    return PositionComponent;
})();
exports.PositionComponent = PositionComponent;
//# sourceMappingURL=PositionComponent.js.map
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
var TablesService_1 = require("../../service/tables/TablesService");
var CustomTable_1 = require("../table/CustomTable");
var Row_1 = require("../table/Row");
var Column_1 = require("../table/Column");
var IDto_1 = require("../../DTO/IDto");
var SharedMemory_1 = require("../../shared/SharedMemory");
var RestaurantTableComponent = (function () {
    function RestaurantTableComponent(tableService, sharedMemory) {
        this.sharedMemory = sharedMemory;
        this.tableService = tableService;
        this.registerHandlers();
        this.rows = [];
        this.columns = this.prepareColumns();
        this.selectedTable = new IDto_1.RestaurantTable(null);
        this.tableService.getAllTables();
    }
    RestaurantTableComponent.prototype.prepareColumns = function () {
        return [
            new Column_1.Column("id", "ID"),
            new Column_1.Column("tableNumber", "Numer stolika"),
            new Column_1.Column("tableSeats", "Ilość miejsc"),
            new Column_1.Column("status", "Status")
        ];
    };
    RestaurantTableComponent.prototype.getAllTables = function () {
        this.sharedMemory.appErrors = [];
        this.tableService.getAllTables();
    };
    RestaurantTableComponent.prototype.onSelected = function (event) {
        this.sharedMemory.appErrors = [];
        this.setSelectedTableById(event.getElementId());
    };
    RestaurantTableComponent.prototype.setSelectedTableById = function (id) {
        this.selectedTable = new IDto_1.RestaurantTable(null);
        for (var i = 0; i < this.tables.length; i++) {
            if (this.tables[i].id == id) {
                this.selectedTable = this.tables[i];
                break;
            }
        }
    };
    RestaurantTableComponent.prototype.onNewTable = function () {
        this.sharedMemory.appErrors = [];
        this.selectedTable = new IDto_1.RestaurantTable(null);
    };
    RestaurantTableComponent.prototype.onSaveTable = function () {
        this.sharedMemory.appErrors = [];
        if (this.selectedTable.id == 0) {
            this.tableService.createNewTable(this.selectedTable);
        }
        else {
            this.tableService.updateTable(this.selectedTable);
        }
    };
    RestaurantTableComponent.prototype.handleOnTableSave = function () {
        this.getAllTables();
    };
    RestaurantTableComponent.prototype.handleTablesArray = function (tables) {
        this.tables = tables;
        this.mapToRows();
        this.chooseTableToShow();
    };
    RestaurantTableComponent.prototype.registerHandlers = function () {
        var _this = this;
        var errorsHandler = {
            handle: function (errors) { return _this.sharedMemory.appErrors = errors; }
        };
        var voidHandler = {
            handle: function () { return _this.handleOnTableSave(); }
        };
        var positionsHandler = {
            handle: function (tables) { return _this.handleTablesArray(tables); }
        };
        this.tableService.registerArrayHandler(positionsHandler);
        this.tableService.registerErrorsHandler(errorsHandler);
        this.tableService.registerVoidHandler(voidHandler);
    };
    RestaurantTableComponent.prototype.chooseTableToShow = function () {
        var id = this.selectedTable.id;
        if (id != 0) {
            this.setSelectedTableById(id);
            if (this.selectedTable.id == 0 && this.tables.length > 0) {
                this.selectedTable = this.tables.pop();
            }
        }
        else {
            this.setNewestTable();
        }
    };
    RestaurantTableComponent.prototype.setNewestTable = function () {
        if (this.tables.length) {
            this.tables.sort(function (first, second) {
                if (first.id > second.id)
                    return 1;
                else if (first.id < second.id)
                    return -1;
                else
                    return 0;
            });
            this.selectedTable = this.tables[0];
        }
    };
    RestaurantTableComponent.prototype.mapToRows = function () {
        this.rows = new Array();
        for (var i = 0; i < this.tables.length; i++) {
            var row = new Row_1.Row();
            row.addCell("id", this.tables[i].id.toString());
            row.addCell("tableNumber", this.tables[i].tableNumber.toString());
            row.addCell("tableSeats", this.tables[i].seatsNumber.toString());
            row.addCell("status", this.tables[i].status == "OCCUPIED" ? "Zajęty" : "Wolny");
            this.rows.push(row);
        }
    };
    RestaurantTableComponent = __decorate([
        angular2_1.Component({
            selector: 'tables',
            providers: [TablesService_1.TablesService]
        }),
        angular2_1.View({
            templateUrl: './app/view/RestaurantTables.html',
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, CustomTable_1.CustomTable]
        }), 
        __metadata('design:paramtypes', [TablesService_1.TablesService, SharedMemory_1.SharedMemory])
    ], RestaurantTableComponent);
    return RestaurantTableComponent;
})();
exports.RestaurantTableComponent = RestaurantTableComponent;
//# sourceMappingURL=RestaurantTableComponent.js.map
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
 * Created by test on 2015-11-24.
 */
var angular2_1 = require('angular2/angular2');
var sorter_1 = require('./sorter');
var SortingTable = (function () {
    function SortingTable() {
        this.sorter = new sorter_1.Sorter();
        this.select = new angular2_1.EventEmitter();
        console.log(this.columns);
    }
    SortingTable.prototype.sort = function (column) {
        this.sorter.sort(column, this.rows);
    };
    SortingTable.prototype.onSelectedRow = function (selectedRow) {
        this.select.next(selectedRow);
    };
    __decorate([
        angular2_1.Input, 
        __metadata('design:type', Array)
    ], SortingTable.prototype, "columns");
    __decorate([
        angular2_1.Input, 
        __metadata('design:type', Array)
    ], SortingTable.prototype, "rows");
    SortingTable = __decorate([
        angular2_1.Component({
            selector: 'sortingtable',
            events: ['select']
        }),
        angular2_1.View({
            templateUrl: './app/view/table.html',
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [])
    ], SortingTable);
    return SortingTable;
})();
exports.SortingTable = SortingTable;
//# sourceMappingURL=SortingTable.js.map
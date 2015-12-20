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
var CustomTable = (function () {
    function CustomTable() {
        this.select = new angular2_1.EventEmitter();
    }
    CustomTable.prototype.onSelectedRow = function (selectedRow) {
        this.select.next(selectedRow);
    };
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], CustomTable.prototype, "select");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Array)
    ], CustomTable.prototype, "columns");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Array)
    ], CustomTable.prototype, "rows");
    CustomTable = __decorate([
        angular2_1.Component({
            selector: 'customtable',
        }),
        angular2_1.View({
            templateUrl: './app/view/table.html',
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [])
    ], CustomTable);
    return CustomTable;
})();
exports.CustomTable = CustomTable;
//# sourceMappingURL=CustomTable.js.map
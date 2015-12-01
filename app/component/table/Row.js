/**
 * Created by test on 2015-11-27.
 */
var Row = (function () {
    function Row() {
        this.cells = new Array();
    }
    Row.prototype.addCell = function (id, name) {
        this.cells.push(new Cell(id, name));
    };
    Row.prototype.getElementId = function () {
        return new Number(this.cells[0].value).valueOf();
    };
    return Row;
})();
exports.Row = Row;
var Cell = (function () {
    function Cell(id, name) {
        this.id = id;
        this.value = name;
    }
    return Cell;
})();
exports.Cell = Cell;
//# sourceMappingURL=Row.js.map
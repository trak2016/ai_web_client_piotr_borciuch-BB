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
var CustomTable_1 = require("../table/CustomTable");
var SharedMemory_1 = require("../../shared/SharedMemory");
var ReportService_1 = require("../../service/reports/ReportService");
var Row_1 = require("../table/Row");
var Column_1 = require("../table/Column");
var IDto_1 = require("../../DTO/IDto");
var ReportComponent = (function () {
    function ReportComponent(reportService, sharedMemory) {
        this.reportsRows = [];
        this.reportsColumns = [];
        this.paymentsRows = [];
        this.paymentsColumns = [];
        this.startDate = "";
        this.endDate = "";
        this.sharedMemory = sharedMemory;
        this.reportService = reportService;
        this.reports = [];
        this.registerHandlers();
        this.reportsColumns = this.prepareReportsColumns();
        this.paymentsColumns = this.preparePaymentsColumns();
        this.selectedReport = new IDto_1.DailyReportDTO(null);
    }
    ReportComponent.prototype.prepareReportsColumns = function () {
        return [
            new Column_1.Column("id", "ID"),
            new Column_1.Column("reportDate", "Data raportu"),
            new Column_1.Column("totalAmount", "Kwota całkowita")
        ];
    };
    ReportComponent.prototype.preparePaymentsColumns = function () {
        return [
            new Column_1.Column("id", "ID"),
            new Column_1.Column("orderID", "Id zamówienia"),
            new Column_1.Column("totalAmount", "Kwota całkowita"),
            new Column_1.Column("creationDate", "Data płatności"),
            new Column_1.Column("status", "Status")
        ];
    };
    ReportComponent.prototype.closeDay = function () {
        this.sharedMemory.appErrors = [];
        this.reportService.closeDay();
    };
    ReportComponent.prototype.findReports = function () {
        this.sharedMemory.appErrors = [];
        this.reportService.getByDates(this.startDate, this.endDate);
    };
    ReportComponent.prototype.onSelectReport = function (row) {
        this.selectedReport = this.findReportById(row.getElementId());
        if (this.selectedReport == null) {
            this.mapPayments(this.selectedReport.payments);
        }
    };
    ReportComponent.prototype.findReportById = function (id) {
        for (var i = 0; i < this.reports.length; i++) {
            if (this.reports[i].id == id) {
                return this.reports[i];
            }
        }
    };
    ReportComponent.prototype.handleSingleReport = function (report) {
        this.selectedReport = report;
        this.mapReports([report]);
        this.mapPayments(report.payments);
        this.reports = [report];
    };
    ReportComponent.prototype.handleReportsArray = function (reports) {
        this.reports = reports;
        this.mapReports(reports);
        if (reports.length > 0) {
            this.selectedReport = reports[0];
            this.mapPayments(this.selectedReport.payments);
        }
        else {
            this.paymentsRows = [];
        }
    };
    ReportComponent.prototype.registerHandlers = function () {
        var _this = this;
        var errorsHandler = {
            handle: function (errors) { return _this.sharedMemory.appErrors = errors; }
        };
        var objectHandler = {
            handle: function (report) { return _this.handleSingleReport(report); }
        };
        var reportsHandler = {
            handle: function (reports) { return _this.handleReportsArray(reports); }
        };
        this.reportService.registerArrayHandler(reportsHandler);
        this.reportService.registerErrorsHandler(errorsHandler);
        this.reportService.registerObjectHandler(objectHandler);
    };
    ReportComponent.prototype.mapPayments = function (payments) {
        this.paymentsRows = [];
        for (var i = 0; i < payments.length; i++) {
            var row = new Row_1.Row();
            row.addCell("id", payments[i].id.toString());
            row.addCell("orderID", payments[i].orderID.toString());
            row.addCell("totalAmount", payments[i].totalAmount);
            row.addCell("creationDate", payments[i].creationDate);
            row.addCell("status", payments[i].status);
            this.paymentsRows.push(row);
        }
    };
    ReportComponent.prototype.mapReports = function (reports) {
        this.reportsRows = [];
        for (var i = 0; i < reports.length; i++) {
            var row = new Row_1.Row();
            row.addCell("id", reports[i].id.toString());
            row.addCell("reportDate", reports[i].reportDate);
            row.addCell("totalAmount", reports[i].totalAmount);
            this.reportsRows.push(row);
        }
    };
    ReportComponent.prototype.doNothing = function (event) { };
    ReportComponent = __decorate([
        angular2_1.Component({
            selector: 'reports',
            providers: [ReportService_1.ReportService]
        }),
        angular2_1.View({
            templateUrl: './app/view/reports.html',
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, CustomTable_1.CustomTable]
        }), 
        __metadata('design:paramtypes', [ReportService_1.ReportService, SharedMemory_1.SharedMemory])
    ], ReportComponent);
    return ReportComponent;
})();
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=ReportComponent.js.map
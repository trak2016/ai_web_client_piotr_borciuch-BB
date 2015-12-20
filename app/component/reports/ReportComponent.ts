import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/angular2";
import {CustomTable} from "../table/CustomTable";
import {SharedMemory} from "../../shared/SharedMemory";
import {ErrorsHandler, ObjectHandler, ArrayHandler} from "../../handler/Handler";
import {ReportService} from "../../service/reports/ReportService";
import {Row} from "../table/Row";
import {Column} from "../table/Column";
import {DailyReportDTO} from "../../DTO/IDto";
import {PaymentDTO, Error} from "../../DTO/IDto";

@Component({
    selector: 'reports',
    providers: [ReportService]
})
@View({
    templateUrl: './app/view/reports.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, CustomTable]
})
export class ReportComponent{

    private reportService: ReportService;
    private sharedMemory: SharedMemory;
    private reports: Array<DailyReportDTO>;
    private reportsRows: Array<Row> = [];
    private reportsColumns: Array<Column> = [];
    private paymentsRows: Array<Row> = [];
    private paymentsColumns: Array<Column> = [];
    private startDate: string = "";
    private endDate: string = "";
    private selectedReport: DailyReportDTO;

    constructor(reportService: ReportService, sharedMemory: SharedMemory){
        this.sharedMemory = sharedMemory;
        this.reportService = reportService;
        this.reports = [];
        this.registerHandlers();
        this.reportsColumns = this.prepareReportsColumns();
        this.paymentsColumns = this.preparePaymentsColumns();
        this.selectedReport = new DailyReportDTO(null);
    }

    private prepareReportsColumns(){
        return [
            new Column("id", "ID"),
            new Column("reportDate", "Data raportu"),
            new Column("totalAmount", "Kwota całkowita")
        ]
    }

    private preparePaymentsColumns(){
        return [
            new Column("id", "ID"),
            new Column("orderID", "Id zamówienia"),
            new Column("totalAmount", "Kwota całkowita"),
            new Column("creationDate", "Data płatności"),
            new Column("status", "Status")
        ]
    }

    private closeDay(){
        this.sharedMemory.appErrors = [];
        this.reportService.closeDay();
    }

    private findReports(){
        this.sharedMemory.appErrors = [];
        this.reportService.getByDates(this.startDate, this.endDate);
    }

     onSelectReport(row: Row){
        this.selectedReport = this.findReportById(row.getElementId());
         if(this.selectedReport == null){
             this.mapPayments(this.selectedReport.payments);
         }

    }

    private findReportById(id: number): DailyReportDTO{
        for(let i = 0; i < this.reports.length; i++){
            if(this.reports[i].id == id){
                return this.reports[i];
            }
        }
    }

    private handleSingleReport(report: DailyReportDTO){
        this.selectedReport = report;
        this.mapReports([report]);
        this.mapPayments(report.payments);

        this.reports = [report];
    }

    private handleReportsArray(reports: Array<DailyReportDTO>){
        this.reports = reports;
        this.mapReports(reports);
        if(reports.length > 0){
            this.selectedReport = reports[0];
            this.mapPayments(this.selectedReport.payments);
        }else{
            this.paymentsRows = [];
        }

    }

    private registerHandlers(){
        let errorsHandler: ErrorsHandler =  {
            handle: (errors: Array<Error>) => this.sharedMemory.appErrors = errors
        }
        let objectHandler: ObjectHandler =  {
            handle: (report: DailyReportDTO) => this.handleSingleReport(report)
        }
        let reportsHandler: ArrayHandler =  {
            handle: (reports: Array<DailyReportDTO>) => this.handleReportsArray(reports)
        }
        this.reportService.registerArrayHandler(reportsHandler);
        this.reportService.registerErrorsHandler(errorsHandler);
        this.reportService.registerObjectHandler(objectHandler);
    }

    private mapPayments(payments: Array<PaymentDTO>){
        this.paymentsRows = [];
        for(let i=0; i < payments.length; i++){
            let row: Row = new Row();
            row.addCell("id", payments[i].id.toString());
            row.addCell("orderID", payments[i].orderID.toString());
            row.addCell("totalAmount", payments[i].totalAmount);
            row.addCell("creationDate", payments[i].creationDate);
            row.addCell("status", payments[i].status);
            this.paymentsRows.push(row);
        }
    }

    private mapReports(reports: Array<DailyReportDTO>){
        this.reportsRows = [];
        for(let i=0; i < reports.length; i++){
            let row: Row = new Row();
            row.addCell("id", reports[i].id.toString());
            row.addCell("reportDate", reports[i].reportDate);
            row.addCell("totalAmount", reports[i].totalAmount);
            this.reportsRows.push(row);
        }
    }

    doNothing(event: any){}
}

import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, bootstrap, Inject} from 'angular2/angular2';
import {SortingTable} from "../table/SortingTable";
import {EmployeeService} from "../../service/employees/EmployeeService";
import {EmployeeDTO} from "../../DTO/IDto";
import {Handler} from "../../handler/Handler";
import {Error} from "../../DTO/IDto";
import {Column} from "../table/Column";
import {Row, Cell} from "../table/Row";
import {Row} from "../table/Row";

@Component({
    selector: 'table-demo',
    providers: [EmployeeService]
})
@View({
    templateUrl: './app/view/employees.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, SortingTable]
})
export class EmployeesComponent implements Handler{

    private employeeService: EmployeeService;
    private selectedEmployee: EmployeeDTO;
    private employees: Array<EmployeeDTO>;
    private columns: Array<Column>;
    private errors: Array<Error>;
    private rows: Array<Row>;

    constructor(@Inject (EmployeeService) employeeService: EmployeeService){
        this.employees = [];
        this.rows = [];
        this.getColumns();
        this.employeeService = employeeService;
        this.selectedEmployee = new EmployeeDTO(null);
        this.employeeService.registerHandler(this);
        employeeService.getAllEmployees();
    }

    getColumns(): Array<Column>{
        return [
            new Column("id","ID"),
            new Column("name","Imię"),
            new Column("surname", "Nazwisko"),
            new Column("position", "Stanowisko"),
            new Column("status", "Status")

        ];
    }

    private mapToRows(){
        let rows: Array<Row> = new Array()
        for(let employee: EmployeeDTO in this.employees){
            let row: Row = new Row();
            row.addCell("id", employee.id.toString());
            row.addCell("name", employee.name);
            row.addCell("surname", employee.surname);
            row.addCell("position", employee.getPosition());
            row.addCell("status", employee.status == "EMPLOYEED" ? "Zatrudniony" : "Zwolniony");
        }
    }


    handleVoid() {
    }

    handleError(errors:Array<Error>) {
        this.errors = errors;
    }

    handleObject(dto:EmployeeDTO) {
    }

    handleArray(dtos:Array<EmployeeDTO>) {
        this.employees = dtos;
        this.mapToRows();
    }
}
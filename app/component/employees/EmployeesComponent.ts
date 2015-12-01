import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, bootstrap, Inject, EventEmitter} from 'angular2/angular2';
import {SortingTable} from "../table/SortingTable";
import {EmployeeService} from "../../service/employees/EmployeeService";
import {PositionService} from "../../service/positions/PositionService";
import {EmployeeDTO, PositionDTO} from "../../DTO/IDto";
import {ArrayHandler, ErrorsHandler} from "../../handler/Handler";
import {Error} from "../../DTO/IDto";
import {Column} from "../table/Column";
import {Row} from "../table/Row";
import {SelectionListener} from "../table/SelectionListener";

@Component({
    selector: 'employees',
    providers: [EmployeeService, PositionService]
})
@View({
    templateUrl: './app/view/employees.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, SortingTable]
})
export class EmployeesComponent implements SelectionListener{

    private employeeService: EmployeeService;
    private positionService: PositionService;
    private selectedEmployee: EmployeeDTO;
    private employees: Array<EmployeeDTO>;
    private columns: Array<Column>;
    private errors: Array<Error>;
    private rows: Array<Row>;
    private statusButtonDescription: string;
    private positions: Array<PositionDTO>;

    //Varaibles below are used to manage view

    //if true, then new employee is created, status button is blocked
    private isNew:boolean = true;

    //If true then employee is employeed, used in input tag with type: radio
    private employed:string = "EMPLOYEED";

    //if true then employee has or will have role, used in inputs with type = "checkbox"
    private waiter:boolean = false;
    private cook:boolean = false;
    private manager:boolean = false;
    private owner:boolean = false;

    //new employee's ogin and passwords
    private login:string;
    private password: string;
    private confirm: string;
    private passwordMismatch = false;

    constructor(employeeService: EmployeeService,
                positionService: PositionService){

        this.employees = [];
        this.rows = [];
        this.positions =[];
        this.columns = this.getColumns();
        this.employeeService = employeeService;
        this.positionService = positionService;
        this.selectedEmployee = new EmployeeDTO(null);
        this.registerHandlers();
        this.statusButtonDescription = "Zwolnij";
        this.employeeService.getAllEmployees();
        this.positionService.getAllPositions();
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
        this.rows = new Array();
        for(let i = 0; i < this.employees.length; i++){
            let row: Row = new Row();
            row.addCell("id", this.employees[i].id.toString());
            row.addCell("name", this.employees[i].name);
            row.addCell("surname", this.employees[i].surname);
            row.addCell("position", this.employees[i].getPosition());
            row.addCell("status", this.employees[i].status == "EMPLOYED" ? "Zatrudniony" : "Zwolniony");
            this.rows.push(row);
        }
    }

    private handleError(errors:Array<Error>) {
        this.errors = errors;
    }


    private handleEmployeesArray(dtos:Array<EmployeeDTO>) {
        this.employees = dtos;
        console.log(this.employees);
        this.mapToRows();
        this.refreshSelected();
        console.log(this.rows);
    }

    private handlePositionsArray(positions: Array<PositionDTO>){
        console.log(positions);
        this.positions = positions;
    }

    onSaveEmployee(){
        this.passwordMismatch = false;
        if(this.selectedEmployee.id == 0){
            if(this.password == this.confirm){
                this.selectedEmployee.setAuthenticationData(this.login, this.password);
                this.employeeService.addNewEmployee(this.selectedEmployee);
            }else{
                this.passwordMismatch = true;
            }

        }else{
            this.employeeService.editEmployee(this.selectedEmployee);
        }
    }

    onChangeStatus(){
        if(this.selectedEmployee.id != 0)
            this.employeeService.changeEmployeeStatus(this.selectedEmployee);
    }

    onNewEmployee(){
        this.selectedEmployee = new EmployeeDTO(null);
        this.isNew = true;
        this.login = "";
        this.password = "";
        this.confirm = "";
    }

    onSelected(event: Row) {
        this.setSelectedEmployeeById(event.getElementId());
        console.log(this.selectedEmployee);
        this.isNew = false;
        //sets checkboxs with employee's roles
        this.employed = this.selectedEmployee.status;
        this.managePrivileges();
    }

    private managePrivileges(){
        let privileges: Array<string> = this.selectedEmployee.getPrivileges();
        this.waiter = this.cook = this.manager = this.owner = false;
        for(let i = 0; i < privileges.length; i++){
            if(privileges[i] == "WAITER") {
                this.waiter = true;
            }
            else if(privileges[i] == "COOK") {
                this.cook = true;
            }else if(privileges[i] == "MANAGER"){
                this.manager = true;
            }else if(privileges[i] = "OWNER"){
                this.owner = true;
            }
        }
    }
    private prepareEmployeeToSave(){
        this.selectedEmployee.status =  this.employed;

        let privileges: Array<string> = new Array();
        if(this.waiter)
            privileges.push("WAITER");
        if(this.cook)
            privileges.push("COOK");
        if(this.manager)
            privileges.push("MANAGER");
        if(this.owner)
            privileges.push("OWNER");
        this.selectedEmployee.createRoleFromPrivileges(privileges);

    }

    private setSelectedEmployeeById(id: number){
        for(let i = 0; i < this.employees.length; i++){
            if(this.employees[i].id == id){
                this.selectedEmployee = this.employees[i];
                this.statusButtonDescription = this.selectedEmployee.status == "EMPLOYED" ? "Zwolnij" : "Przywróć";
                break;
            }
        }
    }

    private refreshSelected(){
        if(this.selectedEmployee.id != 0){
            this.setSelectedEmployeeById(this.selectedEmployee.id);
        }
    }

    private registerHandlers(){
        let errorsHandler: ErrorsHandler =  {
            handle: (errors: Array<Error>) => this.handleError(errors)
        }
        let employeeHandler: ArrayHandler =  {
            handle: (employees: Array<EmployeeDTO>) => this.handleEmployeesArray(employees)
        }
        let positionsHandler: ArrayHandler =  {
            handle: (positions: Array<PositionDTO>) => this.handlePositionsArray(positions)
        }

        this.employeeService.registerArrayHandler(employeeHandler);
        this.employeeService.registerErrorsHandler(errorsHandler);
        this.positionService.registerErrorsHandler(errorsHandler);
        this.positionService.registerArrayHandler(positionsHandler);
    }


}
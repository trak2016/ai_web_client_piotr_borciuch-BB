import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, OnChanges, SimpleChange,
    bootstrap, Inject, EventEmitter, Input} from 'angular2/angular2';
import {SortingTable} from "../table/SortingTable";
import {EmployeeService} from "../../service/employees/EmployeeService";
import {EmployeeDTO, PositionDTO} from "../../DTO/IDto";
import {ArrayHandler, ErrorsHandler} from "../../handler/Handler";
import {Error} from "../../DTO/IDto";
import {Column} from "../table/Column";
import {Row} from "../table/Row";
import {SelectionListener} from "../table/SelectionListener";
import {VoidHandler} from "../../handler/Handler";
import {SharedMemory} from "../../shared/SharedMemory";



@Component({
    selector: 'employees',
    providers: [EmployeeService],
    events: ['changed']
})
@View({
    templateUrl: './app/view/employees.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, SortingTable]
})
export class EmployeesComponent implements OnChanges{

    private employeeService: EmployeeService;
    private sharedMemory: SharedMemory;
    private changed: EventEmitter;

    private selectedEmployee: EmployeeDTO;
    @Input() private employees: Array<EmployeeDTO>;
    @Input() private positions: Array<PositionDTO>;
    @Input() private position: string = "";
    private columns: Array<Column>;
    private rows: Array<Row>;
    private statusButtonDescription: string;



    //Varaibles below are used to manage view

    //if true, then new employee is created, status button is blocked
    private isNew:boolean = false;
    private isEmployed: boolean = true;
    private isFired: boolean = false;


    //if true then employee has or will have role, used in inputs with type = "checkbox"
    private waiter:boolean = false;
    private cook:boolean = false;
    private manager:boolean = false;
    private owner:boolean = false;

    //new employee's login and passwords
    private login:string;
    private password: string;
    private confirm: string;
    private passwordMismatch = false;

    constructor(employeeService: EmployeeService,
                sharedMemory: SharedMemory){

        this.selectedEmployee = new EmployeeDTO(null);
        this.sharedMemory = sharedMemory;
        this.changed = new EventEmitter();
        this.employees = [];
        this.rows = [];
        this.positions =[];
        this.columns = this.getColumns();
        this.employeeService = employeeService;
        this.registerHandlers();
        this.statusButtonDescription = "Zwolnij";
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
        console.log(errors)
        this.sharedMemory.appErrors = errors;
    }

    onSaveEmployee(){
        this.sharedMemory.appErrors = [];
        console.log(this.selectedEmployee.status);
        this.prepareEmployeeToSave();
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

    changeEmployeeStatus(event: any){
        if(this.selectedEmployee.status == "EMPLOYED"){
            this.selectedEmployee.status = "FIRED";
            this.isEmployed = false;
            this.isFired = true;
        }else{
            this.selectedEmployee.status = "EMPLOYED";
            this.isEmployed = true;
            this.isFired = false;
        }
    }

    onChangeStatus(){
        this.sharedMemory.appErrors = [];
        if(this.selectedEmployee.id != 0){
            this.employeeService.changeEmployeeStatus(this.selectedEmployee);
        }

    }

    onNewEmployee(){
        this.selectedEmployee = new EmployeeDTO(null);
        this.selectedEmployee.position.name = this.position;
        this.isNew = true;
        this.login = "";
        this.password = "";
        this.confirm = "";
        this.isEmployed = this.selectedEmployee.status == "EMPLOYED" ? true : false;
        this.waiter = this.cook = this.manager = this.owner = false;
    }

    onSelected(event: Row) {
        this.setSelectedEmployeeById(event.getElementId());
        this.isNew = false;
        //sets checkboxs with employee's roles
        this.isEmployed = this.selectedEmployee.status == "EMPLOYED" ? true : false;
        this.managePrivileges();
    }

    private managePrivileges(){
        let privileges: Array<string> = this.selectedEmployee.getPrivileges();
        for(let i = 0; i < privileges.length; i++){

            if(privileges[i] == "WAITER") {
                this.waiter = true;
            }else if(privileges[i] == "COOK") {
                this.cook = true;
            }else if(privileges[i] == "MANAGER"){
                this.manager = true;
            }else if(privileges[i] = "OWNER"){
                this.owner = true;
            }
        }

    }
    private prepareEmployeeToSave(){

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

    private handleOnSaveEmployee(){
        this.changed.next(null);

    }

    private setSelectedEmployeeById(id: number){

        for(let i = 0; i < this.employees.length; i++){
            if(this.employees[i].id == id){
                this.selectedEmployee = this.employees[i];
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
        let voidHandler: VoidHandler =  {
            handle: () => this.handleOnSaveEmployee()
        }
        let savePositionHandler: VoidHandler = {
            handle: () => this.onSaveEmployee()
        }


        this.employeeService.registerErrorsHandler(errorsHandler);
        this.employeeService.registerVoidHandler(voidHandler);
    }


    onChanges(changes:{[propName: string]: SimpleChange}):any {
        this.chooseEmployeeToShow();
        this.mapToRows();
        this.managePrivileges();
        this.isEmployed = this.selectedEmployee.status == "EMPLOYED" ? true : false;

    }

    private chooseEmployeeToShow(){
        if(this.employees.length == 0){
            this.onNewEmployee();
        }else{
            this.setNewestEmployee();
            this.isNew = false;
        }
        this.statusButtonDescription = this.selectedEmployee.status == "EMPLOYED" ? "Zwolnij" : "Przywróć";

    }
    private setNewestEmployee(){
        if(this.employees.length > 0){
            this.employees.sort((first: EmployeeDTO, second: EmployeeDTO) => {
                if(first.id > second.id) return 1;
                else if(first.id < second.id) return -1;
                else return 0;
            });
            this.selectedEmployee = this.employees[0];
        }

    }

    private changeEmployeePosition(event: string){
        this.selectedEmployee.position.name = event;
    }
}
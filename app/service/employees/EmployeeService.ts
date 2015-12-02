import {Service} from "./../Service";
import {RestApi} from "../../api/RestApi";
import {Inject, Injectable} from "angular2/angular2";
import {Response} from "angular2/http"
import {IDto, EmployeeDTO} from "../../DTO/IDto"

export class EmployeeService extends Service{

    private restApi: RestApi;

    constructor(@Inject(RestApi)restApi: RestApi){
        super();
        this.restApi = restApi;
    }

    public getAllEmployees(){
        this.restApi.getRequest("employees/", this);
    }

    public addNewEmployee(employee: EmployeeDTO){
        this.restApi.postRequest("employees/employee", employee, this);
    }

    public editEmployee(employee: EmployeeDTO){
        this.restApi.putRequest("employees/employee", employee, this);
    }

    public changeEmployeeStatus(employee: EmployeeDTO){
        this.restApi.putRequest("employees/employee" + employee.getLogin(), null, this);
    }

    handle(response:Response) {
        if(response.status == 200){
            if(response.json() != null){
                this.arrayHandler.handle(this.mapObjects(JSON.parse(response.text())));
            }else{
                this.voidHandler.handle();
            }
        }else if(response.status == 201){
            this.voidHandler.handle();
        }else{
            this.errorHandler.handle(this.mapError(JSON.parse(response.text())));
        }

    }

    private mapObjects(json: Array<any>): Array<EmployeeDTO>{
        let objects: Array<EmployeeDTO> = new Array();

        for(let i = 0; i < json.length; i++){
            objects.push(new EmployeeDTO(json[i]));
        }
        return objects;
    }

}
import {Service} from "./../Service";
import {RestApi} from "../../api/RestApi";
import {Inject, Injectable} from "angular2/angular2";
import {Response} from "angular2/http"
import {IDto, EmployeeDTO} from "../../dto/IDto"

@Injectable()
export class EmployeeService extends Service{

    private restApi: RestApi;

    constructor(@Inject (RestApi) restApi: RestApi){
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
        this.restApi.putRequest("employees/employee" + employee.login, null, this);
    }

    handle(response:Response) {
        if(response.status == 200){
            if(response.json() != null){
                return this.actionHandler.handleArray(this.mapObjects(response.json()));
            }else{
                this.getAllEmployees();
            }
        }else if(response.status == 201){
            this.getAllEmployees();
        }else{
            this.actionHandler.handleError(this.mapError(response.json()));
        }

    }

    private mapObjects(json: Object): Array<EmployeeDTO>{
        let objects: Array<EmployeeDTO> = new Array();
        for(let object in json){
            objects.push(new EmployeeDTO(object));
        }
        return objects;
    }

}
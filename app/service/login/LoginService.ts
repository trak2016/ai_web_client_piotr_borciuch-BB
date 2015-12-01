import {Injectable, Inject} from 'angular2/angular2'
import {RestApi} from "../../api/RestApi";
import {IDto, AuthDTO, EmployeeDTO} from "../../DTO/IDto";
import {Response} from 'angular2/http'
import {Service} from "../Service";
import {SharedMemory} from "../../shared/SharedMemory";


export class LoginService extends Service{

    private restApi: RestApi;
    private sharedMemory: SharedMemory;

    constructor(@Inject(RestApi)restApi: RestApi,@Inject(SharedMemory) sharedMemeory: SharedMemory){
        super();
        this.sharedMemory = sharedMemeory;
        this.restApi = restApi;

    }
    public login(login:string, password: string){
        let auth: AuthDTO  = new AuthDTO(login, password);
        this.restApi.postRequest("auth/login", auth, this);

    }


    handle(response:Response) {
        console.log(response.text());
       if(response.status == 200){
           let employeeData: EmployeeDTO = new EmployeeDTO(response.json());
           this.putUserDataInMemory(employeeData);
           this.objectHandler.handle(employeeData);
       }else{
           this.errorHandler.handle(this.mapError(JSON.parse(response.text())));
       }
    }

    private putUserDataInMemory(employeeData: EmployeeDTO){
        sessionStorage.setItem("userLogin", employeeData.getLogin());
        let privileges: Array<string> = employeeData.getPrivileges();
        let cook: string = privileges.indexOf("COOK") >= 0 ? '0001' : '0000';
        let waiter: string = privileges.indexOf("WAITER") >= 0 ? '0010' : '0000';
        let manager: string = privileges.indexOf("MANAGER") >= 0 ? '0100' : '0000';
        let owner: string = privileges.indexOf("OWNER") >= 0 ? '1000' : '0000';
        let privilegesValue: string = (parseInt(cook, 2) | parseInt(waiter, 2) |
                parseInt(manager, 2) | parseInt(owner, 2)).toString();

        sessionStorage.setItem("userPrivileges", privilegesValue);

    }
}



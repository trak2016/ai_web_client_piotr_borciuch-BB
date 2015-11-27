import {Injectable, Inject} from 'angular2/angular2'
import {RestApi} from "../../api/RestApi";
import {IDto, AuthDTO, EmployeeDTO} from "../../DTO/IDto";
import {Response} from 'angular2/http'
import {Service} from "../Service";


@Injectable()
export class LoginService extends Service{

    private restApi: RestApi


    constructor(@Inject(RestApi) restApi: RestApi){
        super();
        this.restApi = restApi;

    }
    public login(login:string, password: string){
        let auth: AuthDTO  = new AuthDTO(login, password);
        this.restApi.postRequest("auth/login", auth, this);

    }


    handle(response:Response) {
       if(response.status == 200){
           let employeeData: EmployeeDTO = new EmployeeDTO(response.json());
           localStorage.setItem('userLogin', employeeData.login);
           localStorage.setItem('userPrivileges', employeeData.getPrivileges().toString());
           this.actionHandler.handleObject(employeeData);
       }else{
           this.actionHandler.handleError(this.mapError(response.json()));
       }
    }
}



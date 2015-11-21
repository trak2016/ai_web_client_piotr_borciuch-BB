import {Injectable, Inject} from 'angular2/angular2'
import {RestApi} from "../../api/RestApi";
import {IDto} from "../../DTO/IDto";
import {Response} from 'angular2/http'
import {ActionHandler} from "../ActionHandler";
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


}


class AuthDTO implements IDto {
    private login: string;
    private password: string;

    constructor(login: string, password: string){
        this.login = login;
        this.password = password;
    }


    toJson():string {
        return JSON.stringify(this);
    }
}
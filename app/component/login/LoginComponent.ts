import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, bootstrap, Inject} from 'angular2/angular2';
import {Router, Route, RouteConfig} from 'angular2/router';
import {LoginService} from '../../service/login/LoginService';
import {Error} from "../../DTO/IDto";
import {MainMenu} from "../main/MainMenu";
import {RestApi} from "../../api/RestApi";
import {ActionHandler} from "../../service/ActionHandler";





@Component({
    selector: 'logincomponent',
    providers: [LoginService],

})
@View(
    {
        templateUrl: './app/view/login.html',
        directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
    }
)


export class LoginComponent implements ActionHandler{

    private router: Router;
    private loginService: LoginService;
    public login: string;
    public password: string;
    private error: Object;

    constructor(@Inject(LoginService)loginService: LoginService, router: Router){
        this.error = [];
        this.loginService = loginService;
        this.login = "";
        this.password = "";
        this.loginService.registerHandler(this);
        this.router = router;

    }

    public onLogin(){
        this.error = [];
        this.loginService.login(this.login, this.password);

    }


    onSuccess(json: Object) {
        let employeeData: EmployeeData = new EmployeeData(json);
        localStorage.setItem('userLogin', employeeData.login);
        localStorage.setItem('userPrivileges', employeeData.getPrivileges().toString());
        this.router.parent.navigateByUrl('/main');
    }

    onFailed(error: Object) {
        this.error = error;
    }
}

class EmployeeData{
    public login: string;
    private roles: Array<Object>;

    constructor(json: Object){
        this.login = json['authenticationData']['login'];
        this.roles = json['roles'];
    }

    getPrivileges(): string[]{
        let privileges: string[] = new Array(this.roles.length);
        for(let role in this.roles){
            privileges.push(role["name"]);
        }
        return privileges;
    }


}


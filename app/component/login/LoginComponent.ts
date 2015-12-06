import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, bootstrap, Inject, Host, EventEmitter} from 'angular2/angular2';
import {Router, Route, RouteConfig} from 'angular2/router';
import {LoginService} from '../../service/login/LoginService';
import {MainMenu} from "../main/MainMenu";
import {RestApi} from "../../api/RestApi";
import {IDto, Error} from "../../DTO/IDto";
import {App} from "../app";
import {ErrorsHandler, ObjectHandler} from "../../handler/Handler";
import {EmployeeDTO} from "../../DTO/IDto";
import {SharedMemory} from "../../shared/SharedMemory"



@Component({
    selector: 'login',
    providers: [LoginService],

})
@View(
    {
        templateUrl: './app/view/login.html',
        directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
    }
)

export class LoginComponent{

    private sharedMemory: SharedMemory;

    private router: Router;
    private loginService: LoginService;
    public login: string;
    public password: string;

    constructor(loginService: LoginService, router: Router, sharedMemory: SharedMemory){
        this.sharedMemory = sharedMemory;
        this.loginService = loginService;

        this.login = "";
        this.password = "";
        this.registerHandlers();
        this.router = router;
    }

    public onLogin(){
        this.sharedMemory.appErrors = [];
        this.loginService.login(this.login, this.password);

    }

    handleError(errors:Array<Error>) {

        for(let item in errors)
        this.sharedMemory.appErrors = errors;
    }

    handleObject(dto:EmployeeDTO) {
        this.sharedMemory.userLogin = sessionStorage.getItem("userLogin");
        this.sharedMemory.userPrivileges = sessionStorage.getItem("userPrivileges");
        this.router.navigate(['/Main']);
    }


    private registerHandlers(){

        let objectHandler: ObjectHandler =  {
            handle: (object: EmployeeDTO) => this.handleObject(object)
        }
        let errorsHandler: ErrorsHandler =  {
            handle: (errors: Array<Error>) => this.handleError(errors)
        }
        this.loginService.registerErrorsHandler(errorsHandler);
        this.loginService.registerObjectHandler(objectHandler);

    }

}




import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, bootstrap, Inject} from 'angular2/angular2';
import {Router, Route, RouteConfig} from 'angular2/router';
import {LoginService} from '../../service/login/LoginService';
import {MainMenu} from "../main/MainMenu";
import {RestApi} from "../../api/RestApi";
import {IDto, Error} from "../../dto/IDto";
import {App} from "../app";
import {Handler} from "../../handler/Handler";
import {EmployeeDTO} from "../../DTO/IDto";





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


export class LoginComponent implements Handler{


    private router: Router;
    private loginService: LoginService;
    public login: string;
    public password: string;
    private errors: Array<Error>;
    private app: App;

    constructor(app: App,@Inject(LoginService)loginService: LoginService, router: Router){
        this.app = app;
        this.errors = [];
        this.loginService = loginService;
        this.login = "";
        this.password = "";
        this.loginService.registerHandler(this);
        this.router = router;

    }

    public onLogin(){
        this.errors = [];
        this.loginService.login(this.login, this.password);

    }

    handleVoid() {
    }

    handleError(errors:Array<Error>) {
        this.errors = errors;
    }

    handleObject(dto:EmployeeDTO) {
        this.app.setSalutation("Witaj " + dto.login);
        this.router.parent.navigateByUrl('/main');
    }

    handleArray(dtos:Array<IDto>) {
    }

}




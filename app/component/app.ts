import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http'
import {APP_BASE_HREF, Location,Router, RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {MainMenu} from './main/MainMenu'
import {LoginService} from "../service/login/LoginService";
import {RestApi} from "../api/RestApi";
import {LoginComponent} from "./login/LoginComponent";
import {AuthRouting} from './routing/AuthRouting'
import {EmployeesComponent} from "./employees/EmployeesComponent";

@Component({
    selector: 'app'
})
@View(
    {
        templateUrl: './app/view/app.html',
        directives: [ROUTER_DIRECTIVES, MainMenu, AuthRouting],
    }
)

@RouteConfig(
    [

        {path: '/main', component: MainMenu, as: 'MainMenu'},
        {path: '/login', component: LoginComponent, as: 'LoginComponent'},
        {path: '/employees', component: EmployeesComponent, as: 'EmployeesComponent'}

    ]
)
export class App {

    private salutation: string;

    constructor(public router: Router) {
        this.salutation = "";
        router.navigateByUrl('/login');
    }

    public setSalutation(salutation: string) {
        this.salutation = salutation;
    }

    public back(){
        this.router.renavigate();
    }

}
bootstrap(App, [bind(APP_BASE_HREF).toValue('/'), RestApi, HTTP_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PROVIDERS]);


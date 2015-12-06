import {Component, View, bootstrap, bind,provide, Inject, Injectable, CORE_DIRECTIVES} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http'
import {APP_BASE_HREF, Location, LocationStrategy, HashLocationStrategy,
    Router, RouteConfig, RouterLink, RouterOutlet, ROUTER_PRIMARY_COMPONENT,
    ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Route} from 'angular2/router';
import {MainMenu} from './main/MainMenu'
import {LoginService} from "../service/login/LoginService";
import {RestApi} from "../api/RestApi";
import {LoginComponent} from "./login/LoginComponent";
import {AuthRouting} from './routing/AuthRouting'
import {PositionComponent} from "./position/PositionComponent";
import {Error} from "../DTO/IDto";
import {SharedMemory} from "../shared/SharedMemory"
import {RestaurantTableComponent} from "./restaurantTable/RestaurantTableComponent";

@Component({
    selector: 'app'
})
@View(
    {
        templateUrl: './app/view/app.html',
        directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, MainMenu, AuthRouting],
    }
)

@RouteConfig(
    [
        new Route({path: '/', component: MainMenu, as: 'Main'}),
        new Route({path: '/main', component: MainMenu, as: 'Main'}),
        new Route({path: '/login', component: LoginComponent, as: 'Login'}),
        new Route({path: '/room', component: RestaurantTableComponent, as: 'Room'}),
        new Route({path: '/employees', component: PositionComponent, as: 'Employees'})

    ]
)
export class App {

    sharedMemory: SharedMemory;

    constructor(public router: Router, sharedMemory: SharedMemory) {
        this.sharedMemory = sharedMemory;
        this.router.navigate(['/Main']);
    }

    public back(){
        this.router.renavigate();

    }

    public logout(){
        sessionStorage.clear();
        this.sharedMemory.clear();
        this.router.navigate(['/Login']);
    }

}


bootstrap(App, [provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    provide(APP_BASE_HREF,{useValue: '/#/'}),
    RestApi, HTTP_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, SharedMemory]);


/**
 * Created by test on 2015-11-15.
 */
import {Component, View, bootstrap, NgIf,} from 'angular2/angular2';
import {Router, RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {SharedMemory} from "../../shared/SharedMemory";
import {LoginComponent} from "../login/LoginComponent";
@Component({
    selector: 'mainmenu'
})
@View(
    {
        templateUrl: './app/view/main.html',
        directives: [ROUTER_DIRECTIVES, NgIf],
    }
)


export class MainMenu{
    private hasAdminRole: boolean;
    private isLogged: boolean;
    private sharedMemory: SharedMemory;

    constructor(sharedMemory: SharedMemory) {
        this.sharedMemory = sharedMemory;
        this.hasAdminRole = (parseInt(this.sharedMemory.userPrivileges) & parseInt("1100", 2)) > 3;
        this.isLogged = this.sharedMemory.userLogin != null;
    }

    onLogin(event: any){
        this.hasAdminRole = (parseInt(this.sharedMemory.userPrivileges) & parseInt("1100", 2)) > 3;
        this.isLogged = this.sharedMemory.userLogin != null;
    }

}


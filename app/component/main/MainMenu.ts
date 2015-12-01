/**
 * Created by test on 2015-11-15.
 */
import {Component, View, bootstrap, NgIf,} from 'angular2/angular2';
import {Router, RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {SharedMemory} from "../../shared/SharedMemory";
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


    constructor(sharedMemory: SharedMemory) {
        this.hasAdminRole = (parseInt(sharedMemory.userPrivileges) & parseInt("1100", 2)) > 3;
    }

}


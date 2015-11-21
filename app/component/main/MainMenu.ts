/**
 * Created by test on 2015-11-15.
 */
import {Component, View, bootstrap, NgIf} from 'angular2/angular2';
import {Router, RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
@Component({
    selector: 'mainmenu'
})
@View(
    {
        templateUrl: './app/view/main.html',
        directives: [ROUTER_DIRECTIVES],
    }
)


export class MainMenu{
    public login: string;

    constructor() {
        this.login = this.getLogin();
    }

    public getLogin():string{
        return localStorage.getItem('userLogin');
    }

    public isLogged():boolean{
        return localStorage.getItem("userData") != null;
    }
}


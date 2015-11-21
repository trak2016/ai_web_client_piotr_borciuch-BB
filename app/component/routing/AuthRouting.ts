/**
 * Created by test on 2015-11-21.
 */
import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {LoginComponent} from "../login/LoginComponent";

@Directive({selector: 'auth-routing'})
export class AuthRouting extends RouterOutlet {

    publicRoutes:any;
    private parentRouter:Router;

    constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader,
                _parentRouter:Router, @Attribute('name') nameAttr:string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true,
            '/signup': true
        };
    }

    activate(instruction: ComponentInstruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && localStorage.getItem('userLogin') == null) {
            this.parentRouter.navigateByUrl('/login');
        }
        return super.activate(instruction);
    }

}
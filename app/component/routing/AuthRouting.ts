/**
 * Created by test on 2015-11-21.
 */
import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {LoginComponent} from "../login/LoginComponent";
import {SharedMemory} from "../../shared/SharedMemory";

@Directive({selector: 'auth-routing'})
export class AuthRouting extends RouterOutlet {

    publicRoutes:any;
    private parentRouter:Router;

    constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader,
                _parentRouter:Router, @Attribute('name') nameAttr:string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/main': true,
        };
    }

    activate(instruction: ComponentInstruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && sessionStorage.getItem("userLogin") == null) {
            this.parentRouter.navigate(['/Main']);
        }
        return super.activate(instruction);
    }

}
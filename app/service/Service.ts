/**
 * Created by test on 2015-11-21.
 */
    import  {Response} from 'angular2/http';
import {Error} from "../DTO/IDto";
import {VoidHandler, ObjectHandler, ErrorsHandler, ArrayHandler} from "../handler/Handler";
import {IDto} from "../DTO/IDto";
export class Service{

    protected voidHandler: VoidHandler;
    protected errorHandler: ErrorsHandler;
    protected objectHandler: ObjectHandler;
    protected arrayHandler: ArrayHandler;

    handle(response: Response){}

    registerVoidHandler(handler: VoidHandler){
        this.voidHandler = handler;
    }

    registerErrorsHandler(handler: ErrorsHandler){
        this.errorHandler = handler;
    }

    registerObjectHandler(handler: ObjectHandler){
        this.objectHandler = handler;
    }

    registerArrayHandler(handler: ArrayHandler){
        this.arrayHandler = handler;
    }

    protected mapError(json: Array<any>): Array<Error>{
        let errors: Array<Error> = new Array();
        for(let i = 0; i < json.length; i++){
            errors.push(new Error(json[i]));
            console.log("element " + json[i]["message"]);
        }
        console.log(errors);
        return errors;

    }



}
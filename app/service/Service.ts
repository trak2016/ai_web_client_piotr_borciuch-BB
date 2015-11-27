/**
 * Created by test on 2015-11-21.
 */
    import  {Response} from 'angular2/http';
import {Error} from "../DTO/IDto";
import {Handler} from "../handler/Handler";
import {IDto} from "../DTO/IDto";
import {Array} from "../../../../../../Program Files (x86)/JetBrains/WebStorm 11.0/plugins/JavaScriptLanguage/typescriptCompiler/external/lib";
export class Service{
    protected actionHandler: Handler;

    handle(response: Response){}

    registerHandler(handler: Handler){
        this.actionHandler = handler;
    }

    protected mapError(json: Object): Array<Error>{
        let errors: Array<Error> = new Array();
        for(let object in json){
            errors.push(new Error(object));
        }
        return errors;

    }



}
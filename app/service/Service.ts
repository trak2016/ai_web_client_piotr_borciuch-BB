/**
 * Created by test on 2015-11-21.
 */
    import  {Response} from 'angular2/http';
import {ActionHandler} from "./ActionHandler";
import {Error} from "../DTO/IDto";
export class Service{
    protected actionHandler: ActionHandler;

    handle(response: Response){
            if(response.status == 200 || response.status == 201){
                this.actionHandler.onSuccess(response.json());
            }else{
                this.actionHandler.onFailed(response.json());
            }

    }

    registerHandler(handler: ActionHandler){
        this.actionHandler = handler;
    }

}
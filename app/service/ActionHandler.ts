import {Error} from "../DTO/IDto";
/**
 * Created by test on 2015-11-20.
 */
export interface ActionHandler{
    onSuccess(json: Object);
    onFailed(errors: Object);
}
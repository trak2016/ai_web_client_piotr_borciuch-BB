import {IDto,Error} from "../DTO/IDto";
/**
 * Created by test on 2015-11-27.
 */

export interface VoidHandler{
    handle();
}

export interface ErrorsHandler{
    handle(errors: Array<Error>);
}

export interface ObjectHandler{
    handle(object: IDto)
}

export interface ArrayHandler{
    handle(objects: Array<IDto>)
}
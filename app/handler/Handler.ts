import {IDto} from "../DTO/IDto";
/**
 * Created by test on 2015-11-27.
 */

export interface Handler{
    handleVoid();
    handleError(errors: Array<Error>);
    handleObject(dto: IDto);
    handleArray(dtos: Array<IDto>);
}
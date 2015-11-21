
export interface IDto {
    toJson(): string;
}

export class Error implements  IDto{

    private _errors: string[];

    constructor(json: Object){
        this._errors = [];
        if(json != null){
            this.setErrors(json);
        }
    }

    private setErrors(json: Object){

        this._errors = new Array()
    }

    get errors():string[] {
        return this._errors;
    }

    clearErrors(){
        this._errors = [];
    }

    toJson():string {
        return null;
    }
}
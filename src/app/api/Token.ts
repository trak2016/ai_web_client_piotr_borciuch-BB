import 'zone.js';
import 'reflect-metadata';
export class Token{
    private _name: string;
    private _value: string;
    private static instance: Token;


    constructor(){
        this._value  = "Restaurant-Auth-Token";
    }

    static getInstance(): Token{
        if(this.instance == null){
            this.instance = new Token();
        }
        return this.instance;
    }

    get name():string {
        return this._name;
    }

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
    }
}
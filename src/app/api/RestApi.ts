/// <reference path="../../../typings/tsd.d.ts" />
import 'zone.js';
import 'reflect-metadata';
import {Http, Headers, Response} from 'angular2/http';
import {IDto} from '../DTO/IDto';
import {Token} from './Token'
import {ResponseHandler} from './ResponseHandler';

export class RestApi {
    private http: Http;
    private headers: Headers;
    private responseHandler: ResponseHandler;
    private token: Token;

    constructor(http: Http){
        this.http = http;
        this.prepareDefaultHeaders();
    }

    postRequest(url: string, object: IDto){
        this.token = Token.getInstance();
        this.addHeader(this.token.name, this.token.value);
        return this.http.post(url, object.toJson(), {
            headers: this.headers
        })
        .subscribe((response: Response) => {
            this.doAction(response);
        })

    }

    putRequest(url: string, object: IDto){
        this.token = Token.getInstance();
        this.addHeader(this.token.name, this.token.value);
        return this.http.put(url, object.toJson(), {
            headers: this.headers
        })
            .subscribe((response: Response) => {
                this.doAction(response);
            })
    }

    getRequest(url: string, onSuccess) {
        this.token = Token.getInstance();
        this.addHeader(this.token.name, this.token.value);
        return this.http.get(url, {
            headers: this.headers
        })
            .subscribe((response: Response) => {
                this.doAction(response);
            })
    }

    public registerHandler(handler: ResponseHandler){
        this.responseHandler = handler;
    }

    private prepareDefaultHeaders(){
        this.headers = new Headers();
    }

    private addHeader(name: string, value: string){
        this.headers.append(name, value);
    }

    private doAction(response: Response){
        this.token.value = response.headers.get(this.token.name);
        this.responseHandler.handleResponse(response);
    }

}

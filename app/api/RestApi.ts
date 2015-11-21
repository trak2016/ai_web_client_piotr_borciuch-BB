import {Headers, Response, Http, HTTP_BINDINGS, RequestMethods} from 'angular2/http';
import {IDto} from '../DTO/IDto';
import {Inject, Injectable} from 'angular2/angular2';
import {Service as ResponseHandler} from "../service/service";

@Injectable()
export class RestApi {
    private http: Http;
    private SERVLET_CONTEXT: string = "http://localhost:8333/Restaurant/";

    constructor(@Inject (Http)http: Http){

        this.http = http;
    }

    postRequest(url: string, object: IDto, handler: ResponseHandler){

        this.http.post(this.SERVLET_CONTEXT + url, object.toJson(), {headers: this.prepareDefaultHeaders()})
        .subscribe((response: Response) => {
            handler.handle(response);
            this.doAction(response);
        })


    }

    putRequest(url: string, object: IDto, handler: ResponseHandler){
        this.http.put(url, object.toJson(), {headers: this.prepareDefaultHeaders()})
            .subscribe((response: Response) => {
                handler.handle(response);
                this.doAction(response);
            })

    }

    getRequest(url: string, handler: ResponseHandler) {

        this.http.get(url, {headers: this.prepareDefaultHeaders()})
            .subscribe((response: Response) => {
                handler.handle(response);
                this.doAction(response);
            })

    }


    private prepareDefaultHeaders(): Headers{
        let headers: Headers = new Headers();
        headers.set("Content-Type", "application/text");
        let tokenValue = this.getAuthToken()
        if(tokenValue != "null")
            headers.set("Restaurant-Auth-Token", tokenValue)
        return headers;
    }



    private doAction(response: Response){
        this.setAuthToken(response.headers.get("Restaurant-Auth-Token"))
    }

    private getAuthToken(){
        return localStorage.getItem("authToken");
    }

    private setAuthToken(token: string){
        localStorage.setItem("authToken", token);
    }

}

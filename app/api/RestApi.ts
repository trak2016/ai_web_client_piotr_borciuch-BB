import {Headers, Response, Http, HTTP_BINDINGS, RequestMethods} from 'angular2/http';
import {IDto} from '../DTO/IDto';
import {Inject, Injectable } from 'angular2/angular2';
import {Service as ResponseHandler} from "../service/service";

@Injectable()
export class RestApi {
    private http: Http;
    private SERVLET_CONTEXT: string = "http://localhost:8333/Restaurant/";
    //Response object, returned by http request, does not contain headers,
    // so auth token is set manual
    //
    private TOKEN = "603A3F30B2BD585E11BA757719F3FF717CB6F9F29580C8A2990C3BB3761E344C3C807E84139BD15E1963AA5A87F31DE37AAE" +
    "4FCA64682DF8";

    constructor(@Inject (Http)http: Http){

        this.http = http;
    }

    postRequest(url: string, object: IDto, handler: ResponseHandler){
        let headers: Headers = this.prepareDefaultHeaders();
        this.http.post(this.SERVLET_CONTEXT + url, object.toJson(), {headers: headers})
        .subscribe((response: Response) => {
            handler.handle(response);
            this.doAction(response);
        })
    }

    putRequest(url: string, object: IDto, handler: ResponseHandler){
        this.http.put(this.SERVLET_CONTEXT + url, object.toJson(), {headers: this.prepareDefaultHeaders()})
            .subscribe((response: Response) => {
                handler.handle(response);
                this.doAction(response);
            })

    }

    getRequest(url: string, handler: ResponseHandler) {

        this.http.get(this.SERVLET_CONTEXT + url, {headers: this.prepareDefaultHeaders()})
            .subscribe((response: Response) => {
                handler.handle(response);
                this.doAction(response);
            })

    }


    private prepareDefaultHeaders(): Headers{
        let headers: Headers = new Headers();
        headers.set("Content-Type", "application/text");
        let tokenValue = this.getAuthToken();
        if(tokenValue != "null")
            headers.set("Restaurant-Auth-Token", tokenValue);
        return headers;
    }



    private doAction(response: Response){
        this.setAuthToken(response.headers.get("Restaurant-Auth-Token"));
    }

    private getAuthToken(){
        return sessionStorage.getItem("authToken");
    }

    private setAuthToken(token: string){
        sessionStorage.setItem("authToken", token);
    }

}


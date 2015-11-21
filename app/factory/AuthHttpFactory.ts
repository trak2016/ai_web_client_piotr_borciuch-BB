import {AuthHttp} from 'angular2-jwt/angular2-jwt';

export class AuthHttpFactory{

    http: AuthHttp;

    create(){
        if(this.http == null){
            this.http = new AuthHttp({
                headerName: "Restaurant-Auth-Token",
                headerPrefix: "",
                tokenName: "userToken",
                noJwtError: true
            })
        }
        return this.http;
    }
}
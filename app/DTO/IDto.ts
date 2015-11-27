
import {Array} from "../../../../../../Program Files (x86)/JetBrains/WebStorm 11.0/plugins/JavaScriptLanguage/typescriptCompiler/external/lib";
export interface IDto {
    toJson(): string;
}

export class Error implements  IDto{


    public message: string;

    constructor(json: Object){
        if(json != null){
            this.message = json["message"];
        }
    }

    toJson():string {
        return null;
    }


}

export class AuthDTO implements IDto {
    private login:string;
    private password:string;

    constructor(login:string, password:string) {
        this.login = login;
        this.password = password;
    }


    toJson():string {
        return JSON.stringify(this);
    }
}

export class EmployeeDTO implements  IDto{
    public id: number;
    public login: string;
    private roles: Array<RoleDTO>;
    public name: string;
    public surname: string;
    public position: PositionDTO;
    public status: string;


    constructor(json: Object){
        if(json != null){
            this.login = json['authenticationData']['login'];
            this.createRoles(json["roles"]);
            this.name = json['name'];
            this.surname = json['surname'];
            this. position = new PositionDTO(json['position']);
        }

    }

    createRoles(rolesJson: Object){
        this.roles = new Array();
        for(let role in rolesJson){
            this.roles.push(new RoleDTO(role));
        }
    }

    getPosition(): string{
        return this.position.name;
    }

    getPrivileges(): string[]{
        let privileges: string[] = new Array(this.roles.length);
        for(let role: RoleDTO in this.roles){
            privileges.push(role.name);
        }
        return privileges;
    }

    toJson():string {
        return JSON.stringify(this);
    }



}

export class PositionDTO implements IDto{

    private id: number;
    public name: string;

    constructor(json: Object){
        if(json != null){
            this.id = json["id"];
            this.name = json["name"];
        }
    }

    toJson():string {
        return JSON.stringify(this);
    }
}

class RoleDTO implements IDto{

    public name: string;
    private id: number;
    private employeeId: number;

    constructor(json:Object){
        this.name = json["name"];
        this.id = json["id"];
        this.employeeId = json["employeeId"];
    }

    toJson():string {
        return JSON.stringify(this);
    }
}
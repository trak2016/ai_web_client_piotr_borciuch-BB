
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

    getLogin(): string{
        return this.login;
    }


    toJson():string {
        return JSON.stringify(this);
    }
}

export class EmployeeDTO implements  IDto{
    public id: number = 0;
    private authenticationData: AuthDTO;
    private roles: Array<RoleDTO>;
    public name: string = "";
    public surname: string = "";
    public position: PositionDTO;
    public status: string = "";


    constructor(json: Object){
        if(json != null){
            this.id = json["id"];
            this.authenticationData = new AuthDTO(json['authenticationData']['login'],"");
            this.createRoles(json['roles']);
            this.name = json['name'];
            this.surname = json['surname'];
            this. position = new PositionDTO(json['position']);
            this.status = json["status"];
        }else{
            this.roles = [];
            this.position = new PositionDTO(null);
        }

    }

    createRoles(rolesJson: Array<string>){
        this.roles = new Array();
        for(let  i = 0; i < rolesJson.length; i++){
            this.roles.push(new RoleDTO(rolesJson[i]));
        }
    }

    getPosition(): string{
        return this.position.name;
    }

    getLogin():string {
        return this.authenticationData.getLogin();
    }

    setAuthenticationData(login: string, password: string){
        this.authenticationData = new AuthDTO(login, password);
    }
    getPrivileges(): string[]{
        let privileges: string[] = new Array(this.roles.length);
        for(let i = 0; i < this.roles.length; i++){
            privileges.push(this.roles[i].name);
        }
        return privileges;
    }

    createRoleFromPrivileges(privileges){
        this.roles = new Array();
        for(let i = 0; i < privileges.length; i++){
            let role: RoleDTO = new RoleDTO(null);
            role.name = privileges[i];
            this.roles.push(role);
        }
    }

    toJson():string {
        return JSON.stringify(this);
    }



}

export class PositionDTO implements IDto{

    public id: number = 0;
    public name: string = "";
    public employees: Array<EmployeeDTO> = new Array();

    constructor(json: Object){
        if(json != null){
            this.id = json["id"];
            this.name = json["name"];

        }
    }

    private prepareEmployees(json: Array<any>){
        for(let i = 0; i < json.length; i++){
            this.employees.push(new EmployeeDTO(json[i]))
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
        if(json != null){
            this.name = json["name"];
            this.id = json["id"];
            this.employeeId = json["employeeId"];
        }
    }


    toJson():string {
        return JSON.stringify(this);
    }
}

export class RestaurantTable implements IDto{

    public id: number = 0;
    public tableNumber: number = 0;
    public seatsNumber: number = 0;
    public status: string = "UNOCCUPIED";

    constructor(json: Object){
        if(json != null){
            this.id = json["id"];
            this.tableNumber = json["tableNumber"];
            this.seatsNumber = json["seatsNumber"];
            this.status = json["status"];
        }
    }

    toJson():string {
        return JSON.stringify(this);
    }
}
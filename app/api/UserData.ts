/**
 * Created by test on 2015-11-18.
 */
export class UserData{
    private authenticationData: AuthenticationData;
    private _id: number;
    private roles: RoleDTO[];



    get login():string {
        return this.authenticationData.login;
    }

    get id():number {
        return this._id;
    }

    get privileges():string[] {
        let privileges: string [] = new String[this.roles.length];
        let i: number = 0;
        this.roles.forEach((role) =>{
            privileges.push(role.name)
        })
        return privileges;
    }
}

class AuthenticationData{
    public login: string;
    public password: string;

}

class RoleDTO{
    public id: number;
    public name: string;
    public employeeId: number;
}

/**
 * Created by test on 2015-11-28.
 */

import {Error} from "../DTO/IDto"
export class SharedMemory{
    public appErrors: Array<Error> = [];
    public userLogin: string = null;
    //Employee privileges stored as binary
    //OWNER | MANAGER | WAITER | COOK
    // 0/1      0/1       0/1     0/1
    public userPrivileges: string ;
    constructor(){
        this.userLogin = sessionStorage.getItem("userLogin");
        this.userPrivileges = sessionStorage.getItem("userPrivileges") != null ?
            sessionStorage.getItem("userPrivileges") : '0000';
    }

    clear(){
        this.userLogin = null;
        this.userPrivileges = '0000';
    }

}
import {Service} from "../Service";
import {Inject} from "angular2/angular2";
import {Response} from "angular2/http";
import {RestApi} from "../../api/RestApi";
import {RestaurantTable} from "../../DTO/IDto";


export class TablesService extends Service{

    private restApi: RestApi;

    constructor(@Inject(RestApi)restApi: RestApi){
        super();
        this.restApi = restApi;
    }

    getAllTables(){
        this.restApi.getRequest("/tables", this);
    }

    updateTable(table: RestaurantTable){
        this.restApi.putRequest("/tables/table", table, this);
    }

    createNewTable(table: RestaurantTable){
        this.restApi.postRequest("/tables/table", table, this);
    }


    handle(response:Response) {
       if(response.status == 200){
           if(response.json() != null){
               this.arrayHandler.handle(this.mapObject(JSON.parse(response.text())));
           }else{
               this.voidHandler.handle();
           }
       }else if(response.status == 201){
           this.voidHandler.handle();
       }else{
           this.errorHandler.handle(this.mapError(JSON.parse(response.text())));
       }
    }

    mapObject(json: Array<any>): Array<RestaurantTable>{
        let objects: Array<RestaurantTable> = new Array();
        for(let i = 0; i < json.length; i++){
            objects.push(new RestaurantTable(json[i]));
        }

        return objects;
    }
}
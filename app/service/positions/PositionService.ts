import {Inject, Injectable} from "angular2/angular2";
import {Response} from "angular2/http";
import {Service} from "../Service";
import {RestApi} from "../../api/RestApi";
import {PositionDTO} from "../../DTO/IDto";
/**
 * Created by test on 2015-11-28.
 */

export class PositionService extends  Service{

    private restApi: RestApi;

    constructor(@Inject(RestApi)restApi: RestApi){
        super();
        this.restApi = restApi;
    }

    getAllPositions(){
        this.restApi.getRequest("positions/", this);
    }

    savePosition(positionDTO: PositionDTO){
        this.restApi.postRequest("positions/position/" + positionDTO.name, positionDTO, this);
    }

    editPosition(positionDTO: PositionDTO){
        this.restApi.putRequest("positions/position/", positionDTO, this);
    }


    handle(response:Response) {
        if(response.status == 201){
            this.voidHandler.handle();
        }else if(response.status == 200){
            if(response.text() != ""){
                this.arrayHandler.handle(this.mapObjects(JSON.parse(response.text())));
            }else{
                this.voidHandler.handle();
            }
        }else{
            this.errorHandler.handle(this.mapError(JSON.parse(response.text())));
        }
    }

    private mapObjects(json: Array<any>): Array<PositionDTO>{
        let objects: Array<PositionDTO> = new Array();
        for(let i = 0; i < json.length; i++){
            objects.push(new PositionDTO(json[i]));
        }
        return objects;
    }
}
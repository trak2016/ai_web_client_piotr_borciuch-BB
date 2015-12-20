import {Service} from "../Service";
import {Inject} from "angular2/angular2";
import {RestApi} from "../../api/RestApi";
import {Response} from "angular2/http";
import {DailyReportDTO} from "../../DTO/IDto";

export class ReportService extends Service{

    private restApi: RestApi;

    constructor(@Inject(RestApi)restApi: RestApi){
        super();
        this.restApi = restApi;
    }

    public closeDay(){
        this.restApi.postRequest("reports/report", null, this);
    }

    public getByDates(startDate: string, endDate: string){
        this.restApi.getRequest("reports/" + startDate + "/" + endDate, this);
    }

    handle(response:Response) {
        if(response.status == 201){
            this.objectHandler.handle(new DailyReportDTO(JSON.parse(response.text())));
        }else if(response.status == 200){
                this.arrayHandler.handle(this.mapObjects(JSON.parse(response.text())));

        }else{
            this.errorHandler.handle(this.mapError(JSON.parse(response.text())));
        }
    }

    private mapObjects(json: Array<any>): Array<DailyReportDTO>{
        let objects: Array<DailyReportDTO> = new Array();
        for(let i = 0; i < json.length; i++){
            objects.push(new DailyReportDTO(json[i]));
        }
        return objects;
    }


}

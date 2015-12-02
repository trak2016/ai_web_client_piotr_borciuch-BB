import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/angular2";
import {PositionService} from "../../service/positions/PositionService";
import {SortingTable} from "../table/SortingTable";
import {Column} from "../table/Column";
import {Row} from "../table/Row";
import {PositionDTO} from "../../DTO/IDto";
import {ErrorsHandler, ArrayHandler, VoidHandler} from "../../handler/Handler";
import {SharedMemory} from "../../shared/SharedMemory";
import {SharedMemory} from "../../shared/SharedMemory";
import {PositionDTO} from "../../DTO/IDto";

@Component({
    selector: 'positions',
    providers: [ PositionService]
})
@View({
    templateUrl: './app/view/employees.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, SortingTable]
})
export class Position{

    private positionService: PositionService;
    private sharedMemory: SharedMemory;
    private columns: Array<Column>;
    private rows: Array<Row>;
    private positions: Array<PositionDTO>;
    private selectedPosition: PositionDTO;

    constructor(positionService: PositionService, sharedMemory: SharedMemory){
        this.positionService = positionService;
        this.registerHandlers();
        this.rows = [];
        this.columns = this.prepareColumns();
        this.selectedPosition = new PositionDTO(null);
        this.getAllPositions();
    }

    private prepareColumns(): Array<Column>{
        return [
            new Column("id","ID"),
            new Column("name","Nazwa"),

        ];
    }

    private getAllPositions(){
        this.positionService.getAllPositions();
    }

    private handleOnPositionSave(){
        this.getAllPositions();
    }

    private handlePositionsArray(positions: Array<PositionDTO>){
        this.positions = positions;
    }

    private onEmployeeChange(event){
        this.getAllPositions();
    }

    private onSelectedPosition(event: Row){
        this.setSelectedPositionById(event.getElementId());
    }

    private onNewPosition(){
        this.selectedPosition = new PositionDTO(null);
    }

    private onSavePosition(){
        if(this.selectedPosition.id == 0)
            this.positionService.savePosition(this.selectedPosition);
        else
            this.positionService.editPosition(this.selectedPosition);
    }

    private setSelectedPositionById(id: number){
        this.selectedPosition = new PositionDTO(null);
        for(let i = 0; i < this.positions.length; i++){
            if(this.positions[i].id == id){
                this.selectedPosition = this.positions[i];
                break;
            }
        }
    }

    private registerHandlers(){
        let errorsHandler: ErrorsHandler =  {
            handle: (errors: Array<Error>) => this.sharedMemory.appErrors = errors
        }
        let voidHandler: VoidHandler =  {
            handle: () => this.handleOnPositionSave()
        }
        let positionsHandler: ArrayHandler =  {
            handle: (positions: Array<PositionDTO>) => this.handlePositionsArray(positions)
        }
        this.positionService.registerArrayHandler(positionsHandler);
        this.positionService.registerErrorsHandler(errorsHandler);
        this.positionService.registerVoidHandler(voidHandler);
    }
}


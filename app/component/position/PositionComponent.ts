import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/angular2";
import {PositionService} from "../../service/positions/PositionService";
import {SortingTable} from "../table/SortingTable";
import {Column} from "../table/Column";
import {Row} from "../table/Row";
import {PositionDTO, Error} from "../../DTO/IDto";
import {ErrorsHandler, ArrayHandler, VoidHandler} from "../../handler/Handler";
import {SharedMemory} from "../../shared/SharedMemory";
import {EmployeesComponent} from "../employees/EmployeesComponent";


@Component({
    selector: 'positions',
    providers: [ PositionService]
})
@View({
    templateUrl: './app/view/positions.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, SortingTable, EmployeesComponent]
})
export class PositionComponent{

    private positionService: PositionService;
    private sharedMemory: SharedMemory;
    private columns: Array<Column>;
    private rows: Array<Row>;
    private positions: Array<PositionDTO>;
    private selectedPosition: PositionDTO;
    private isDisabled: boolean = false;

    constructor(positionService: PositionService, sharedMemory: SharedMemory){
        this.positionService = positionService;
        this.registerHandlers();
        this.rows = [];
        this.sharedMemory = sharedMemory;
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
        this.mapToRows()
        this.choosePositionToShow();
    }

    private mapToRows(){
        this.rows = new Array();
        for(let i = 0; i < this.positions.length; i++){
            let row: Row = new Row();
            row.addCell("id", this.positions[i].id.toString());
            row.addCell("name", this.positions[i].name);
            this.rows.push(row);
        }
    }

    private onEmployeeChange(event){
        this.getAllPositions();
    }

    private onSelectedPosition(event: Row){
        this.setSelectedPositionById(event.getElementId());
        this.isDisabled = false;
    }

    private onNewPosition(){
        this.selectedPosition = new PositionDTO(null);
        this.isDisabled = true;
    }

    private onSavePosition(){
        this.sharedMemory.appErrors = [];
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
                this.isDisabled = false;
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

    private choosePositionToShow(){
        let id: number = this.selectedPosition.id;
        if(id != 0){
            this.setSelectedPositionById(id);
            if(this.selectedPosition.id == 0 && this.positions.length > 0){
                this.selectedPosition = this.positions.pop();
            }
        }else{
            this.setNewestPosition();
        }
    }


    private setNewestPosition(){
        if(this.positions.length > 0){
            this.positions.sort((first: PositionDTO, second: PositionDTO) => {
                if(first.id > second.id) return 1;
                else if(first.id < second.id) return -1;
                else return 0;
            });
            this.selectedPosition = this.positions[0];
        }

    }

}


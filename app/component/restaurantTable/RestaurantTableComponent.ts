import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/angular2";
import {TablesService} from "../../service/tables/TablesService";
import {SortingTable} from "../table/SortingTable";
import {TablesService} from "../../service/tables/TablesService";
import {Row} from "../table/Row";
import {Column} from "../table/Column";
import {RestaurantTable} from "../../DTO/IDto";
import {SharedMemory} from "../../shared/SharedMemory";
import {SharedMemory} from "../../shared/SharedMemory";
import {ErrorsHandler, VoidHandler, ArrayHandler} from "../../handler/Handler";

@Component({
    selector: 'positions',
    providers: [TablesService]
})
@View({
    templateUrl: './app/view/employees.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, SortingTable]
})
export class RestaurantTableComponent{
    private tableService: TablesService;
    private rows: Array<Row>;
    private columns: Array<Column>;
    private tables: Array<RestaurantTable>;
    private selectedTable: RestaurantTable;
    private sharedMemory: SharedMemory;

    constructor(tableService: TablesService, sharedMemory: SharedMemory){
        this.sharedMemory = sharedMemory;
        this.tableService = tableService;
        this.registerHandlers();
        this.rows = [];
        this.columns = this.prepareColumns();
        this.selectedTable = new RestaurantTable(null);
    }

    private prepareColumns(): Array<Column>{
        return [
            new Column("id", "ID"),
            new Column("tableNumber", "Numer stolika"),
            new Column("tableSeats", "Ilość miejsc"),
            new Column("status", "Status")
        ]
    }

    private getAllTables(){
        this.tableService.getAllTables();
    }

    private onSelectedTable(event: Row){
        this.setSelectedTableById(event.getElementId());
    }

    private setSelectedTableById(id: number){
        this.selectedTable = new RestaurantTable(null);
        for(let i = 0; i < this.tables.length; i++){
            if(this.tables[i].id == id){
                this.selectedTable = this.tables[i];
                break;
            }
        }
    }

    private onNewTable(){
        this.selectedTable = new RestaurantTable(null);
    }

    private onSaveTable(){
        if(this.selectedTable.id == 0)
            this.tableService.createNewTable(this.selectedTable);
        else
            this.tableService.updateTable(this.selectedTable);
    }

    private handleOnTableSave(){
        this.getAllTables();
    }

    private handleTablesArray(tables: Array<RestaurantTable>){
        this.tables = tables;
    }

    private registerHandlers(){
        let errorsHandler: ErrorsHandler =  {
            handle: (errors: Array<Error>) => this.sharedMemory.appErrors = errors
        }
        let voidHandler: VoidHandler =  {
            handle: () => this.handleOnTableSave()
        }
        let positionsHandler: ArrayHandler =  {
            handle: (tables: Array<RestaurantTable>) => this.handleTablesArray(tables)
        }
        this.tableService.registerArrayHandler(positionsHandler);
        this.tableService.registerErrorsHandler(errorsHandler);
        this.tableService.registerVoidHandler(voidHandler);
    }
}

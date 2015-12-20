import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/angular2";
import {TablesService} from "../../service/tables/TablesService";
import {CustomTable} from "../table/CustomTable";
import {Row} from "../table/Row";
import {Column} from "../table/Column";
import {RestaurantTable, Error} from "../../DTO/IDto";
import {SharedMemory} from "../../shared/SharedMemory";

import {ErrorsHandler, VoidHandler, ArrayHandler} from "../../handler/Handler";

@Component({
    selector: 'tables',
    providers: [TablesService]
})
@View({
    templateUrl: './app/view/RestaurantTables.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, CustomTable]
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
        this.tableService.getAllTables()
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
        this.sharedMemory.appErrors = [];
        this.tableService.getAllTables();
    }

    onSelected(event: Row){
        this.sharedMemory.appErrors = [];
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
        this.sharedMemory.appErrors = [];
        this.selectedTable = new RestaurantTable(null);
    }

    private onSaveTable(){
        this.sharedMemory.appErrors = [];
        if(this.selectedTable.id == 0){
            this.tableService.createNewTable(this.selectedTable);
        }else {
            this.tableService.updateTable(this.selectedTable);
        }
    }

    private handleOnTableSave(){
        this.getAllTables();
    }

    private handleTablesArray(tables: Array<RestaurantTable>){
        this.tables = tables;
        this.mapToRows();
        this.chooseTableToShow();
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

    private chooseTableToShow(){
        let id: number = this.selectedTable.id;
        if(id != 0){
            this.setSelectedTableById(id);
            if(this.selectedTable.id == 0 && this.tables.length > 0){
                this.selectedTable = this.tables.pop();
            }
        }else{
            this.setNewestTable();
        }
    }

    private setNewestTable(){
        if(this.tables.length){
            this.tables.sort((first: RestaurantTable, second: RestaurantTable) => {
                if(first.id > second.id) return 1;
                else if(first.id < second.id) return -1;
                else return 0;
            });
            this.selectedTable = this.tables[0];
        }
    }

    private mapToRows(){
        this.rows = new Array();
        for(let i = 0; i < this.tables.length; i++){
            let row: Row = new Row();
            row.addCell("id", this.tables[i].id.toString());
            row.addCell("tableNumber", this.tables[i].tableNumber.toString());
            row.addCell("tableSeats", this.tables[i].seatsNumber.toString());
            row.addCell("status", this.tables[i].status == "OCCUPIED" ? "Zajęty" : "Wolny");
            this.rows.push(row);
        }
    }
}


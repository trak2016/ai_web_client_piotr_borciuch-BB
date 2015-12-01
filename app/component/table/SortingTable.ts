/**
 * Created by test on 2015-11-24.
 */
import {Component, View, NgFor, EventEmitter} from 'angular2/angular2';
import {Column} from './column';
import {Sorter} from './sorter';
import {SelectionListener} from "./SelectionListener";
import {Row} from "./Row";
@Component({
    selector: 'sortingtable',
    inputs: ['rows: rows','columns: columns'],
    events: ['select']
})

@View({
    templateUrl: './app/view/table.html',
    directives: [NgFor]
})

export class SortingTable{
    private select: EventEmitter<Row>;
    private columns: Array<Column>;
    private rows: Array<Row>;
    private selectionListener: SelectionListener;
    private sorter: Sorter = new Sorter();

    constructor(){
        this.select = new EventEmitter();
        console.log(this.columns);
    }

    public sort(column:string){
        this.sorter.sort(column, this.rows);
    }

    public onSelectedRow(selectedRow){
        this.select.next(selectedRow);
    }
}

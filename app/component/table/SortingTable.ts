/**
 * Created by test on 2015-11-24.
 */
import {Component, View, NgFor, EventEmitter, Input} from 'angular2/angular2';
import {Column} from './column';
import {Sorter} from './sorter';
import {SelectionListener} from "./SelectionListener";
import {Row} from "./Row";
@Component({
    selector: 'sortingtable',
    events: ['select']
})

@View({
    templateUrl: './app/view/table.html',
    directives: [NgFor]
})

export class SortingTable{
    private select: EventEmitter;
    @Input() private columns: Array<Column>;
    @Input() private rows: Array<Row>;
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

/**
 * Created by test on 2015-11-24.
 */
import {Component, View, NgFor, EventEmitter, Input, Output} from 'angular2/angular2';
import {Column} from './column';
import {SelectionListener} from "./SelectionListener";
import {Row} from "./Row";
@Component({
    selector: 'customtable',
})

@View({
    templateUrl: './app/view/table.html',
    directives: [NgFor]
})

export class CustomTable{
    @Output() private select: EventEmitter;
    @Input() private columns: Array<Column>;
    @Input() private rows: Array<Row>;
    private selectionListener: SelectionListener;

    constructor(){
        this.select = new EventEmitter();
    }


    public onSelectedRow(selectedRow){
        this.select.next(selectedRow);
    }
}

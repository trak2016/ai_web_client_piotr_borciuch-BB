/**
 * Created by test on 2015-11-24.
 */
import {Component, View, NgFor} from 'angular2/angular2';
import {Column} from './column';
import {Sorter} from './sorter';
import {Row} from "./Row";
@Component({
    selector: 'sorting-table',
    inputs: ['rows: rows','columns: columns']
})

@View({
    templateUrl: './components/grid/grid.html',
    directives: [NgFor]
})

export class SortingTable{
    private columns: Array<Column>;
    private rows: Array<Row>;
    private sorter: Sorter = new Sorter();

    public sort(column:string){
        this.sorter.sort(column, this.rows);
    }
}

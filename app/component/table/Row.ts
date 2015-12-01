/**
 * Created by test on 2015-11-27.
 */
export class Row{
    public cells: Array<Cell>;

    constructor(){
        this.cells = new Array();
    }

    addCell(id:string, name:string) {
        this.cells.push(new Cell(id, name));
    }

    getElementId(): number{
        return new Number(this.cells[0].value).valueOf();
    }
}

export class Cell{
    public id:string;
    public value:string;

    constructor(id:string, name:string){
        this.id = id;
        this.value = name;
    }
}
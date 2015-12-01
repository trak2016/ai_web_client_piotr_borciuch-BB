import {Row} from "./Row";
/**
 * Created by test on 2015-11-28.
 */
export interface SelectionListener{
    onSelected(selectedRow: Row);
}

import { AbstractControl } from '../model';
export declare abstract class AbstractControlDirective {
    control: AbstractControl;
    value: any;
    valid: boolean;
    errors: {
        [key: string]: any;
    };
    controlsErrors: any;
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    path: string[];
}

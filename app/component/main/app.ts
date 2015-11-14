import {Component, View, bootstrap} from 'angular2/angular2';
import {Router, RouteConfig, RouterLink, RouterOutlet} from 'angular2/router';

@Component({
    selector: 'app'
})
@View({
    template: '<p>{{"pleple" + " wreszcie działa"}}</p>',
})
export class App {
    constructor() {

    }
}
bootstrap(App);


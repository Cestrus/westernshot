import {modelWestern} from './modelWestern.js';
import {viewWestern} from './viewWestern.js';

export class controllerWestern{
	constructor() {
		this.model = new modelWestern();
		this.view = new viewWestern(this.model.bank, this.model.bulletsQuantity, this.randomHole.bind(this) );
	}
	randomHole(){
		return this.model.randomHole();
	}
}
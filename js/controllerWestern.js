import {modelWestern} from './modelWestern.js';
import {viewWestern} from './viewWestern.js';
import {audioPlayer} from './audioPlayer.js';



export class controllerWestern{
	constructor() {
		this.model = new modelWestern();
		this.view = new viewWestern(this.model.bank,
									this.model.bulletsQuantity,
									this.randomHole.bind(this),
									this.randomBandit(this));
		this.audio = new audioPlayer();
	}
	randomHole(){
		return this.model.randomHole();
	}
	randomBandit(){
		return this.model.randomBandit();
	}
}
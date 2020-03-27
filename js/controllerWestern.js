import {modelWestern} from './modelWestern.js';
import {viewWestern} from './viewWestern.js';
import {audioPlayer} from './audioPlayer.js';
import {startModal} from "./startModal.js";

export class controllerWestern{
	constructor() {		
		this.model = new modelWestern();
		this.view = new viewWestern(this.model.money,
									this.model.bulletsRevolver,
									this.model.bulletsQuantity,
									this.randomHole.bind(this),
									this.randomBandit.bind(this),
									this.randomWoodPlank.bind(this));
		this.audio = new audioPlayer();		
		this.startModal = new startModal(this.view.p,
										 this.startAudio.bind(this),
										 this.enterGame.bind(this));
	}
	randomHole(){
		return this.model.randomHole();
	}
	randomBandit(){
		return this.model.randomBandit();
	}
	randomWoodPlank(){
		return this.model.randomWoodPlank();
	}
	startAudio(){
		return this.audio.startAudio();
	}
	startGame(){
		return this.view.startGame();
	}
	enterGame(){
		return this.view.enterGame();
	}
}
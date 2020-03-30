import {modelWestern} from './modelWestern.js';
import {viewWestern} from './viewWestern.js';
import {audioPlayer} from '../otherModules/audioPlayer.js';
import {startModal} from "../modalWindows/startModal.js";
import {recordModal} from "../modalWindows/recordModal.js";
import {timer} from '../otherModules/timer.js';

export class controllerWestern{
	constructor() {		
		this.model = new modelWestern(this.renderBestShooters.bind(this));

		this.view = new viewWestern(this.model.gamer,
									this.model.money,
									this.model.bulletsRevolver,
									this.model.bulletsQuantity,
									this.randomHole.bind(this),
									this.randomBandit.bind(this),
									this.randomWoodPlank.bind(this),
									this.activeRecordModal.bind(this),
									this.startTimer.bind(this));

		this.audio = new audioPlayer();

		this.startModal = new startModal(this.view.namePlace,
										 this.startAudio.bind(this),
										 this.enterGame.bind(this),
										 this.model.gamer);

		this.recordModal = new recordModal(this.model.records);

		this.timer = new timer(this.renderTimer.bind(this), this.model.gamer, this.view.isStart);

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
	activeRecordModal(){
		return this.recordModal.activeModal();
	}
	enterGame(){
		return this.view.enterGame();
	}
	renderBestShooters(arr){
		return this.view.renderBestShooters(arr);
	}
	renderTimer(str){
		return this.view.renderTiming(str);
	}
	startTimer(){
		return this.timer.timeCount();
	}

}

//TODO авторизация игрока (создание объекта и запись в него данных, при повторном старте игры обнуление ряда свойств
// объекта)
//TODO тайминг при старте
//++ TODO загрузка рекордов в боковую панель при входе в игру
//++ TODO кнопкa рекордов
//TODO кнопка старта игры
//TODO создание модального окна рекордов
//TODO окончание игры (с проверкой и записью рекорда, остановкой таймера)
//TODO ?измененние курсора мыши
//TODO рихтовка верстки (проверка размера блоков, шрифтов )
//TODO
//TODO
//TODO
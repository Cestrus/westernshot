import {ModelWestern} from './modelWestern.js';
import {ViewWestern} from './viewWestern.js';
import {AudioPlayer} from '../components/audioPlayer/audioPlayer.js';
import {RecordsWindow} from "../components/recordsWindow/recordsWindow.js";
import {ControllerTimer} from '../components/timer/controllerTimer.js'
import {ResultWindow} from "../components/resultWindow/resultWindow.js";

export class ControllerWestern{
	constructor(gamerName, dataFromFirebase) {
		this.audio = new AudioPlayer();
		this.timer = new ControllerTimer();
		this.model = new ModelWestern(gamerName, dataFromFirebase);
		this.view = new ViewWestern(this.model.gamer,
									this.model.bulletsRevolver,
									this.model.bulletsQuantity,
									this.audio.audioTracks,
									this.randomHole.bind(this),
									this.randomBandit.bind(this),
									this.randomWoodPlank.bind(this),
									this.activeRecordsWindow.bind(this),
									this.renderTimer.bind(this),
									this.startTimer.bind(this),
									this.resultGame.bind(this),
									this.loadResultWindow.bind(this));

		this.recordsWindow = new RecordsWindow(this.model.records);
		this.resultWindow = new ResultWindow(this.model.gamer, this.reloadGamer.bind(this));
		this.sendData();
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
	activeRecordsWindow(){
		return this.recordsWindow.activeWindow();
	}
	renderTimer(){
		return this.timer.renderTimer();
	}
	startTimer(){
		return this.timer.startTimer(this.model.gamer, this.view.isStartObj);
	}
	resultGame(){
		return this.model.resultGame();
	}
	loadResultWindow(){
		return this.resultWindow.loadResultWindow();
	}
	sendData(){
		this.model.loadData()
			.then(arr => this.view.renderBestShooters(arr));
	}
	reloadGamer(){
		this.model.reloadGamer();
		this.view.againGame();		
	}

}

//+ TODO авторизация игрока (создание объекта и запись в него данных, при повторном старте игры обнуление ряда свойств объекта)
//++ TODO тайминг при старте
//++ TODO загрузка рекордов в боковую панель при входе в игру
//++ TODO кнопкa рекордов
//++ TODO кнопка старта игры
//++ TODO создание модального окна результа игры 
//TODO создание модального окна рекордов
//+ TODO окончание игры (с проверкой и записью рекорда, остановкой таймера)
//TODO переписать промисы использовав async 
//TODO ? измененние курсора мыши
//TODO рихтовка верстки (проверка размера блоков, шрифтов )

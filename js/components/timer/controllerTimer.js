import {ModelTimer} from "./modelTimer.js";
import {ViewTimer} from "./viewTimer.js";

export class ControllerTimer {
	constructor() {
		this.model = new ModelTimer(this.renderTiming.bind(this));
		this.view = new ViewTimer();
	}
	renderTimer(){
		return this.view.renderTimer();
	}
	renderTiming(str){
		return this.view.renderTiming(str);
	}
	startTimer(gamer, isStartObj){
		return this.model.startTimer(gamer, isStartObj);
	}
}
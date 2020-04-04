export class ModelTimer {
	constructor(renderTiming) {
		this.renderTiming = renderTiming;
	}
	startTimer(gamer, isStartObj){
		let sec = 1, min = 0;
		let id = setInterval(()=>{
			if(isStartObj.isStart){
				this.renderTiming(`:   ${min}:${sec}`);
				if(sec === 59){
					sec = 0;
					min++;
				}
				else sec++;
				gamer.gameTime++;
			}
			else clearInterval(id);
		}, 1000);
	}
}
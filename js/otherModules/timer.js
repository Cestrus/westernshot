export class timer {
	constructor(renderTiming, gamer) {
		this.timer = {
			sec: 1,
			min: 0,
			id: null
		};
		this.renderTiming = renderTiming;
		this.gamer = gamer;
		this.isStart = true;

	}
	timeCount(){
		console.log('into timer ', this.isStart);
		this.timer.id = setInterval(()=>{
			if(this.isStart){
				this.renderTiming(`${this.timer.min}:${this.timer.sec}`);
				if(this.timer.sec === 59){
					this.timer.sec = 0;
					this.timer.min++;
					this.gamer.gameTime++;
				}
				else this.timer.sec++;
			}
			else clearInterval(this.timer.id);
		}, 1000);
	}
}
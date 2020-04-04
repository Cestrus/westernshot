export class ViewTimer {
	constructor() {
		this.timer = document.querySelector('.timer');
	}
	renderTimer(){
		this.timer.innerHTML = '<p>Timer</p><p></p>';
	}
	renderTiming(str){
		document.querySelector('.timer :nth-child(2)').innerText = `${str}`;
	}
}
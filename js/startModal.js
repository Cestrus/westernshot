
export class startModal{
	constructor(namePlace, startAudio, startGame) {
		this.modalWindow = document.querySelector('.myModal');
		this.btn = document.querySelector('.btnModal');
		this.input = document.querySelector('.inputModal');
		this.overlay = document.querySelector('.overlayModal');
		this.namePlace = namePlace;
		this.startAudio = startAudio;
		this.startGame = startGame;
		
		document.addEventListener('DOMContentLoaded', this.loadModalWindow.bind(this));
		this.btn.addEventListener('click', this.enterName.bind(this));
	}
	loadModalWindow(){
		this.modalWindow.classList.add('activeModal');
	}
	checkName(name){
		const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-1234567890';
		let arrSingName = name.split('');
		for(let i = 0; i < arrSingName.length; i++) {
			let a = symbols.match(arrSingName[i]);
			if (!a) return false;
		}
		return true;
	}
	enterName(){
		if(this.checkName(this.input.value)){
			this.namePlace.innerText = this.input.value;
			this.overlay.style.visibility = 'hidden';
			this.modalWindow.classList.remove('activeModal');
			this.startAudio();
			this.startGame();
		}
	}


}
//import {audioPlayer} from '../otherModules/audioPlayer.js';

export class startModal{
	constructor(enterGame) {
		this.modalWindow = document.querySelector('.startModal');
		this.enterGame = enterGame;
		document.addEventListener('DOMContentLoaded',() => {		
			this.renderModal();
			this.btn = document.querySelector('.btnModal-modalStart');
			this.input = document.querySelector('.inputModal');
			this.overlay = document.querySelector('.overlayModal');
			this.btn.addEventListener('click', this.enterName.bind(this));
		});		
	}
	renderModal(){
		this.modalWindow.innerHTML = 
		`<div class="row row-modal-1">
			<div class="col-md-3 corner-modal"></div>
			<div class="col-md-6"><p>enter you name</p></div>
			<div class="col-md-3 corner-modal corner-modal--r-t"></div>
		</div>
		<div class="row row-modal-1">
			<div class="col latinFont"><p>(only latin)</p></div>
		</div>
		<div class="row row-modal-2 no-gutters">
			<div class="col-md-8 align-self-center ">
				<input class="inputModal" type="text" placeholder="shooter">
			</div>
			<div class="col-md-4 input-group-append align-self-center">
				<button class="btnModal btnModal-modalStart"></button>
			</div>
		</div>
		<div class="row row-modal-1">
			<div class="col-md-3 corner-modal corner-modal--l-b"></div>
			<div class="col-md-6"></div>
			<div class="col-md-3 corner-modal corner-modal--r-b"></div>
		</div>`;
		this.modalWindow.classList.add('activeStartModal');
	}
	checkName(name){
		const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-1234567890{}[],.;:' ";
		let arrSingName = name.trim().split('');
		for(let i = 0; i < arrSingName.length; i++) {
			let a = symbols.match(arrSingName[i]);
			if (!a) return false;
		}
		return arrSingName.length !== 0;
	}
	enterName(){
		if(this.checkName(this.input.value)){;
			this.overlay.style.visibility = 'hidden';
			this.modalWindow.classList.remove('activeStartModal');
			this.enterGame(this.input.value);
		}
	}
}
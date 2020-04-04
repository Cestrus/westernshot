export class ViewStart {
	constructor(enterGame, checkName) {
		this.modalWindow = document.querySelector('.startModal');
		this.checkName = checkName;
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
			<div class="col-md-6"></div>
			<div class="col-md-3 corner-modal corner-modal--r-t"></div>
		</div>
		<div class="row row-modal-1">
			<div class="col"><p>enter you name</p><p class="latinFont">(only latin)</p></div>
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
	enterName(){
		if(this.checkName(this.input.value)){
			this.overlay.style.visibility = 'hidden';
			this.modalWindow.classList.remove('activeStartModal');
			this.enterGame(this.input.value);
		}
	}
}
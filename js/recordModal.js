export class recordModal{
	constructor(results) {
		this.recordModal = document.querySelector('.recordModal');
		this.recordTable = document.querySelector('.recordTable');
		this.btnLeft = document.querySelector('.btnModal__modalRecord-left');
		this.btnRight = document.querySelector('.btnModal__modalRecord-right');
		this.overlay = document.querySelector('.overlayModal');
		this.reults = results;
		document.querySelector('.btnModal__modalRecord-close').addEventListener('click', this.close.bind(this));
		this.btnLeft.addEventListener('click', this.left.bind(this));
		this.btnRight.addEventListener('click', this.right.bind(this));

	}
	renderTable(){

	}
	activeModal(){
		this.recordModal.classList.add('activeRecordModal');
		this.overlay.style.visibility = 'visible';
	}
	left(){
		console.log('left')
	}
	right(){
		console.log('right')
	}
	close(){
		this.overlay.style.visibility = 'hidden';
		this.recordModal.classList.remove('activeRecordModal');
	}
}
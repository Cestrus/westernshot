export class RecordsWindow{
	constructor(records) {
		this.recordsWindow = document.querySelector('.recordsWindow');
		this.recordTable = document.querySelector('.recordTable');
		this.btnLeft = document.querySelector('.btnModal__modalRecord-left');
		this.btnRight = document.querySelector('.btnModal__modalRecord-right');
		this.overlay = document.querySelector('.overlayModal');
		this.records = records;
		document.querySelector('.btnModal__modalRecord-close').addEventListener('click', this.close.bind(this));
		this.btnLeft.addEventListener('click', this.left.bind(this));
		this.btnRight.addEventListener('click', this.right.bind(this));

	}
	renderWindow(){
		this.recordsWindow.innerHTML = `
			
		`
	}
	renderTable(){

	}
	activeWindow(){
		this.renderTable();
		this.overlay.style.visibility = 'visible';
		this.recordsWindow.classList.toggle('activeRecordModal');
	}
	left(){

	}
	right(){

	}
	close(){
		this.recordsWindow.classList.toggle('activeRecordModal');
		setTimeout(()=>this.overlay.style.visibility = 'hidden', 500);
	}
}
export class RecordsWindow{
    constructor(records, audioTracks) {
        this.recordsWindow = document.querySelector('.recordsWindow');
        this.renderWindow();
		this.btnLeft = document.querySelector('.btnModal__modalRecord-left');
		this.btnRight = document.querySelector('.btnModal__modalRecord-right');
		this.overlay = document.querySelector('.overlayModal');       
        this.recordTable = document.querySelector('.recordTable');
        this.renderTableHead();
		this.records = records;
		this.audioTracks = audioTracks;
        this.page = 1;
        this.recordsBody = document.querySelector('.recordTableBody tbody');		

		document.querySelector('.btnModal__modalRecord-close').addEventListener('click', this.close.bind(this));
		this.btnLeft.addEventListener('click', this.left.bind(this));
		this.btnRight.addEventListener('click', this.right.bind(this));

    }
    renderWindow(){
		this.recordsWindow.innerHTML = `
            <div class="row row-recordModal-1">
                <div class="col-md-3 corner-modal_start"></div>
                <div class="col-md-6"><p class="recordTitle">Record table</p></div>
                <div class="col-md-3 corner-modal_start corner-modal_start--r-t"></div>
            </div>
            <div class="row row-recordModal-2 align-items-start">
                <div class="col-md-1"></div>
                <div class="col-md-10 recordTable"></div>
                <div class="col-md-1"></div>
            </div>
            <div class="row row-recordModal-1">
                <div class="col-md-3 corner-modal_start corner-modal_start--l-b"></div>
                <div class="col-md-6">
                    <div class="row justify-content-md-center">
                        <button class="btnModal btnModal__modalRecord btnModal__modalRecord-left"></button>
                        <button class="btnModal btnModal__modalRecord btnModal__modalRecord-right"></button>
                    </div>
                    <div class="row justify-content-md-center">
                        <button class="btnModal btnModal__modalRecord btnModal__modalRecord-close"></button>
                    </div>
                </div>
                <div class="col-md-3 corner-modal_start corner-modal_start--r-b"></div>
            </div>`
	}
	renderTableHead(){
        this.recordTable.innerHTML = `
            <div class="recordTableHead">
                <table class="">
                    <tbody>
                        <tr class="table-row"><td></td><td>name</td><td>bank</td><td>target</td><td>rating</td><td>date</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="recordTableBody">
                <table class="">
                    <tbody></tbody>
                </table>
            </div>`;
    }
    renderTableBody(page = 1){
		let str = '';
        for (let i = (page-1) * 7; i < ((page-1) * 7 + 7); i ++){
            if(!this.records[i]) break;
			str += `<tr class="table-row"><td>${i+1}</td><td>${this.records[i].name}</td><td>${this.records[i].bank}</td><td>${this.records[i].inTarget}</td><td>${this.records[i].rating}</td><td>${this.records[i].date}</td></tr>`;
		}
        this.recordsBody.innerHTML = str;
    }
	activeWindow(){
		this.renderTableBody();
		this.overlay.style.visibility = 'visible';
		this.recordsWindow.classList.toggle('activeRecordModal');
		this.audioTracks.wind.play();
	}
	left(){
        this.page = (--this.page) < 1? 1 : this.page; 
        this.renderTableBody(this.page);
	}
	right(){
        this.page = (this.records[this.page*7])? ++this.page : this.page;
        this.renderTableBody(this.page);
	}
	close(){
		this.recordsWindow.classList.toggle('activeRecordModal');
		setTimeout(()=>this.audioTracks.wind.play(), 200);
		setTimeout(()=>this.overlay.style.visibility = 'hidden', 700);
	}
}
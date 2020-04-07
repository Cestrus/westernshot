export class ResultWindow{
	constructor(gamer, nextGame) {
		this.resultModal = document.querySelector('.resultModal');
		this.renderWindow();
		this.resultTable = document.querySelector('.resultTable');
		this.btnYes = document.querySelector('.btnModal-result-yes');
		this.btnNot = document.querySelector('.btnModal-result-not');
		this.overlay = document.querySelector('.overlayModal');
		
		this.btnNot.addEventListener('click', this.endGame.bind(this));
		this.btnYes.addEventListener('click', this.loadNextGame.bind(this));
		this.gamer = gamer;
		this.nextGame = nextGame;
	}
	renderWindow(){
		this.resultModal.innerHTML =  `
			<div class="row row-resultModal-1">
                <div class="col-md-3 corner-modal"></div>
                <div class="col-md-6"><p class="resultTitle">result</p></div>
                <div class="col-md-3 corner-modal corner-modal--r-t"></div>
            </div>
	        <div class="row row-resultModal-2 ">
	            <div class="col-md-3"></div>
	            <div class="col-md-6 ">
	                <table class="resultTable"></table>
	                <p class="questionAgain">want again?</p>
	            </div>
	            <div class="col-md-3"></div>
	        </div>
	        <div class="row row-resultModal-1">
	            <div class="col-md-3 corner-modal corner-modal--l-b"></div>
	            <div class="col-md-6">
	                <button class="btnModal btnModal-result btnModal-result-yes">yes</button>
	                <button class="btnModal btnModal-result btnModal-result-not">not</button>
	            </div>
	            <div class="col-md-3 corner-modal corner-modal--r-b"></div>
	        </div>
		`;
	}
	renderResultTable(){
		this.resultTable.innerHTML = `<tbody><tr><td>bank:</td><td>${this.gamer.bank}$</td></tr><tr><td>time:</td><td>${Math.floor(this.gamer.gameTime/60)}<span>m</span> ${this.gamer.gameTime%60}<span>s</span></td></tr><tr><td>in target:</td><td>${this.gamer.inTarget}</td></tr><tr><td>percent:</td><td>${this.gamer.percent}%</td></tr><tr><td>rating:</td><td>${this.gamer.rating}</td></tr></tbody>`;
	}
	loadResultWindow(){	
		this.renderResultTable();
		this.overlay.style.visibility = 'visible';
		this.resultModal.classList.toggle('activeResultModal');
	}
	endGame(){
		window.location.reload();
		this.resultModal.classList.remove('activeResultModal');
		this.overlay.style.visibility = 'hidden';
	}
	loadNextGame(){
		this.nextGame();
		this.resultModal.classList.toggle('activeResultModal');
		setTimeout(()=>this.overlay.style.visibility = 'hidden', 500);
	}
	
}
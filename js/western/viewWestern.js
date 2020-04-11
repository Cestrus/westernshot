export class ViewWestern {
	constructor(gamer, bulletsRevolver, bulletsQuantity, audio, randomHole, randomBandit, randomWoodPlank, activeRecordModal, renderTimer, startTimer, resultGame, loadResultWindow) {
		this.gamePlate = document.querySelector('.game-plate');
		this.wantedList = function (){this.renderGamePlate(); return document.querySelectorAll('.wanted')}.bind(this)();
		this.bank = document.querySelector('.bank p');
		this.gun = document.querySelector('.gun');
		this.bullets = document.querySelector('.bullets');
		this.gamerName = document.querySelector('.gamerName');
		this.bestShooters = document.querySelector('.bestShooters');
		this.btnStart = document.querySelector('.btnStart');

		this.gamePlate.addEventListener('click', ev=>this.shot(ev));
		this.btnStart.addEventListener('click', this.startGame.bind(this));

		this.gamer = gamer;
		this.bulletsRevolver = bulletsRevolver;
		this.bulletsQuantity = bulletsQuantity;
		this.audio = audio;
		this.randomHole = randomHole;
		this.randomBandit = randomBandit;
		this.randomWoodPlank = randomWoodPlank;
		this.activeRecordModal = activeRecordModal;
		this.renderTimer = renderTimer;
		this.startTimer = startTimer;
		this.resultGame = resultGame;
		this.loadResultWindow = loadResultWindow;
		this.isReloadGun = false;
		this.isStartObj = {isStart: false};
		this.idBanditTurnIntervals = [];
		
		this.enterGame();
	}
	// рендер игрового поля
	renderGamePlate(){
		let str='';
		for(let i=0; i<3; i++){
			str += '<div class="row bandit-row">';
			for(let j=0; j<6; j++){
				str += '<div class="col-md-2 px-0"><div class="wanted"></div></div>';
			}
			str+='</div>';
		}
		this.gamePlate.innerHTML = str;
	}

	// ====== ВХОД В ИГРУ ======

	// рендер банка
	renderBank(money){
		let bank = this.gamer.bank;
		this.gamer.bank += money;
		let interval = setInterval(()=>{
			this.bank.innerText = `BANK: ${bank}$`;
			if(!money) clearInterval(interval);
			else{
				money--;
				bank++;
			}
		}, 20);
	}
	// рендер патронов
	renderBullets(){
		for (let i =0; i<this.bulletsQuantity; i++){
			this.bullets.innerHTML += '<div class="bullet"></div>';
		}
	}
	// рендер имени игрока
	renderGamerName(){
		this.gamerName.innerHTML = `<p>${this.gamer.name}</p>`;
	}
	// рендер семёрки лучших игроков
	renderBestShooters(arr) {	
		let str = '';
		for (let i = 0; i < 7; i++) {
			if(arr[i]) {
				str += `<div class="shooter d-flex" style="background-image: url${this.randomWoodPlank()};"><p> ${i + 1}.</p><p>${arr[i].name}</p><p> ${arr[i].bank}$ </p><p> ${arr[i].inTarget}✚</p></div>`;
			}
			else {str += `<div class="shooter d-flex" style="background-image: url${this.randomWoodPlank()};"><p> ${i + 1}.</p><p>vacancy</p></div>`;}
		}
		str+=`<div class="shooter btnRecordTable" data-toggle="modal" data-target="#staticBackdrop" style="background-image: url${this.randomWoodPlank()};">all result</div>`;
		this.bestShooters.innerHTML = '<div class="shootersTitle"><p>The</p><p> Magnificent </p><p>seven</p></div>' + str;
		document.querySelector('.btnRecordTable').addEventListener('click', this.activeRecordModal);
	}
	// рендер кнопки старта
	renderBtnStart(){
		this.btnStart.innerHTML = `
			<div class="btnStart-t corner-modal"></div>
			<div class="btnStart-t "></div>
			<div class="btnStart-t corner-modal corner-modal--r-t"></div>
			<div class="btnStart-c"></div>
			<div class="btnStart-b corner-modal corner-modal--l-b"></div>
			<div class="btnStart-b "></div>
			<div class="btnStart-b corner-modal corner-modal--r-b"></div>
			<div class="titleStart">start</div>	
		`
	}	
	//вход в игру
	enterGame(){
		this.gun.style.visibility = 'visible';
		this.renderBtnStart()
		this.btnStart.classList.remove('btnStart-hidden');
		this.renderGamerName();
		this.renderBank(this.gamer.bank);
		this.renderBullets();
		this.renderTimer();
	}
	//повторный запуск игры
	nextGame(){
		this.bulletsRevolver = 6;
		this.bullets.style.visibility = 'hidden';	
		this.gun.style.backgroundImage = `url("./img/bullet/gun_${this.bulletsRevolver}.svg")`;
		this.enterGame();
	}
	// ====== РЕНДЕР БАНДИТОВ И ВЫСТРЕЛОВ ======

	//добавление бандитов
	addBandit(el){
		return new Promise(function (resolve) {
			el.classList.add('wanted-move');
			setTimeout(()=>resolve(), 250); // половина от css transition
		});
	}
	//удаление бандитов
	removeBandit(el){
		return new Promise(function (resolve) {
			el.classList.remove('wanted-move');
			setTimeout(()=>resolve(), 250);
		});
	}
	//рендер бандитов
	renderBandit(el){
		let bandit = this.randomBandit();
		if(Math.random() <= 0.2){
			if(bandit.isBandit){
				el.innerHTML = `<div class="paper" style="transform: scaleX(-1);">
							<img src="${bandit.img}" alt="bandit"/><p>cost: ${bandit.cost}$</p>
						</div>`;
			}
			else{
				el.innerHTML = `<div class="paper" style="transform: scaleX(-1);">
							<img src="${bandit.img}" alt="not bandit"/><p style="display: none">cost: ${bandit.cost}$</p>
						</div>`;
			}
		}
	}
	//запуск бандитов
	goBandits(){
		this.wantedList.forEach(el => {
			let time = Math.floor(Math.random()*4000+2000);// интервал частоты поворота картинки
			this.idBanditTurnIntervals.push(setInterval(()=>{
				this.addBandit(el)
				.then(()=>{
					this.renderBandit(el);
					let interval = setTimeout(()=>{
						this.removeBandit(el)
						.then(()=>{
							el.innerHTML = '';
							clearInterval(interval);
						});
					}, 1500); //задержка на экране
				});
			},time));
		});
	}
	// выстрел
	shot(ev){
		if(this.isStartObj.isStart){
			if(!this.isReloadGun){
				this.bulletsRevolver--;
				this.gun.style.backgroundImage = `url("./img/bullet/gun_${this.bulletsRevolver}.svg")`;
				this.audio.shot.play();
				this.renderHoleShot(ev);
				this.bullets.lastChild.remove();
				if(!this.bullets.children.length){
					this.endGame();
				}
				else if(!this.bulletsRevolver){
					this.isReloadGun = true;
					this.bulletsRevolver = 6;
					this.reloadGun();
				}
			}
		}
	}
	// рендер пулевых отверстий
	renderHoleShot(ev){
		let hole = document.createElement('div');
		if(ev.target.tagName === 'IMG'){
			hole.classList.add('hole', 'hole-kill');
			this.renderBank(+ev.target.nextSibling.outerHTML.match(/\d{2}\d?/)); // определение суммы
			this.gamer.inTarget++;
		}
		else {
			hole.classList.add('hole');
		}
		hole.style.top = ev.clientY - 15 + 'px';
		hole.style.left = ev.clientX - 15 +'px';
		hole.style.backgroundImage = this.randomHole();
		document.body.appendChild(hole);
		let interval = setTimeout(()=>{
			hole.remove();
			clearInterval(interval);
		}, 300);
	}
	// рендер перезарядки
	reloadGun(){
		let a = 1;
		let interval = setInterval(()=>{
			if(a===6) {
				this.isReloadGun = false;
				clearInterval(interval);
			}
			this.audio.reload.play();
			this.gun.style.backgroundImage = `url("./img/bullet/gun_${a}.svg")`;
			a++;
		}, 400);
	}

	// ====== СТАРТ ИГРЫ ======

	//старт игры
	startGame(){
		this.isStartObj.isStart = true;
		this.btnStart.classList.add('btnStart-hidden');
		this.bullets.style.visibility = 'visible';
		setTimeout(this.startTimer, 1000);
		this.goBandits();
	}

	// ====== КОНЕЦ ИГРЫ ======

	//удаление таймеров
	timersOff(){
		this.isStartObj.isStart = false; // удаляем таймер тайминга
		this.idBanditTurnIntervals.forEach(el => clearInterval(el)); // удаляем таймеры повротов 
	}
	// конец игры
	endGame(){
		this.timersOff();
		this.resultGame();
		this.loadResultWindow();
	}
}
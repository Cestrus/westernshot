export class viewWestern {
	constructor(gamer, money, bulletsRevolver, bulletsQuantity, randomHole, randomBandit, randomWoodPlank, activeRecordModal) {
		this.gamePlate = document.querySelector('.game-plate');
		this.wantedList = function (){this.renderGamePlate(); return document.querySelectorAll('.wanted')}.bind(this)();
		this.bank = document.querySelector('.bank p');
		this.gun = document.querySelector('.gun');
		this.bullets = document.querySelector('.bullets');
		this.namePlace = document.querySelector('.gamerName p');
		this.bestShooters = document.querySelector('.bestShooters');
		this.btnStart = document.querySelector('.btnStart');


		this.gamePlate.addEventListener('click', ev=>this.shot(ev));
		this.btnStart.addEventListener('click', this.startGame.bind(this));

		this.gamer = gamer;
		this.money = money;
		this.bulletsRevolver = bulletsRevolver;
		this.bulletsQuantity = bulletsQuantity;
		this.randomHole = randomHole;
		this.randomBandit = randomBandit;
		this.randomWoodPlank = randomWoodPlank;
		this.activeRecordModal = activeRecordModal;
		this.isReloadGun = false;
		this.isStart = false;




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

	// рендер анимации банка
	renderBank(money){
		let interval = setInterval(()=>{
			this.bank.innerText = `BANK: ${this.money}$`;
			if(!money) clearInterval(interval);
			else{
				money--;
				this.money++;
			}
		}, 20)
	}
	// рендер патронов
	renderBullets(){
		for (let i =0; i<this.bulletsQuantity; i++){
			this.bullets.innerHTML += '<div class="bullet"></div>';
		}
	}
	// рендер семёрки лучших игроков
	renderBestShooters(arrRecords) {
		let str = '';
		for (let i = 0; i < 7; i++) {
			if (arrRecords[i]) {
				str += `<div class="recordResult" style="background-image: url${this.randomWoodPlank()};"><span> ${i + 1}.</span><span>${arrRecords[i].name}</span><span> ${arrRecords[i].bank} </span><span> ${arrRecords[i].percent} </span><span> ${arrRecords[i].rating} </span></div>`;
			} else break;
		}
		str+=`<div class="recordResult btnRecordTable" data-toggle="modal" data-target="#staticBackdrop" style="background-image: url${this.randomWoodPlank()};">all result</div>`;
		this.bestShooters.innerHTML = '<div class="recordResultTitle">The Magnificent seven</div>' + str;
		document.querySelector('.btnRecordTable').addEventListener('click', this.activeRecordModal);
	}
	//вход в игру
	enterGame(){
		this.renderBank(this.money);
		this.renderBullets();
		// this.renderBestShooters();
		//this.startGame();
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
		this.wantedList.forEach(el=>{
			let time = Math.floor(Math.random()*4000+2000);// интервал частоты поворота картинки
			setInterval(()=>{
				this.addBandit(el).
				then(()=>{
					this.renderBandit(el);
					let interval = setTimeout(()=>{
						this.removeBandit(el).
						then(()=>{
							el.innerHTML = '';
							clearInterval(interval);
						});
					}, 1500); //задержка на экране
				});
			},time);
		});
	}
	// выстрел
	shot(ev){
		if(!this.isReloadGun){
			this.bulletsRevolver--;
			this.gun.style.backgroundImage = `url("./img/bullet/gun_${this.bulletsRevolver}.svg")`;
			new Audio('./media/sounds/shot.wav').play();
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
	// рендер пулевых отверстий
	renderHoleShot(ev){
		let hole = document.createElement('div');
		if(ev.target.tagName === 'IMG'){
			hole.classList.add('hole-kill');
			this.renderBank(ev.target.nextSibling.outerHTML.match(/\d{2}\d?/)); // определение суммы
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
			new Audio('./media/sounds/reload_bullet.wav').play();
			this.gun.style.backgroundImage = `url("./img/bullet/gun_${a}.svg")`;
			a++;
		}, 400);
	}

	// ====== СТАРТ ИГРЫ ======

	//старт игры
	startGame(){
		this.btnStart.classList.add('btnStart-hidden');
		this.bullets.style.visibility = 'visible';
		this.goBandits();
	}




	//
	checkRecords(){

	}
	//
	endGame(){
		this.checkRecords();
		this.renderBullets();
	}
}
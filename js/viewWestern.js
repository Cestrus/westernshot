export class viewWestern {
	constructor(bank, bulletsRevolver, bulletsQuantity, randomHole, randomBandit, randomWoodPlank) {
		this.gamePlate = document.querySelector('.game-plate');
		this.wantedList = function (){this.renderGamePlate(); return document.querySelectorAll('.wanted')}.bind(this)();
		this.money = document.querySelector('.money');
		this.gun = document.querySelector('.gun');
		this.bullets = document.querySelector('.bullets');
		this.p = document.querySelector('.gamerName p');
		this.recordTable = document.querySelector('.recordTable');
		this.gamerName = document.querySelector('.gamerName');

		this.gamePlate.addEventListener('click', ev=>this.shot(ev));

		this.bank = bank;
		this.bulletsQuantity = bulletsQuantity;
		this.randomHole = randomHole;
		this.randomBandit = randomBandit;
		this.randomWoodPlank = randomWoodPlank;
		this.bulletsRevolver = bulletsRevolver;
		this.isReloadGun = false;


		this.renderBank(bank);
		this.renderBullets();
		this.renderRecordTable();
	}

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
	renderBank(money){
		let interval = setInterval(()=>{
			this.money.innerText = `BANK: ${this.bank}$`;
			if(!money) clearInterval(interval);
			else{
				if(money > 0) {
					money--;
					this.bank++;
				}
				else{
					money++;
					this.bank--;
				}
			}
		}, 20)

	}
	renderBullets(){
		for (let i =0; i<this.bulletsQuantity; i++){
			this.bullets.innerHTML += '<div class="bullet"></div>';
		}
	}
	renderRecordTable(record){
		let str = '';
		for(let i=0; i<5; i++){
			str += `<div class="recordResult" style="background-image: url${this.randomWoodPlank()};"><span> ${i+1}.</span><span class="shooterName">artem</span><span> 1120$
		</span></div>`;
		}
		this.recordTable.innerHTML = '<div class="recordResultTitle">The best shooters</div>' + str;
	}
	renderHoleShot(ev){
		let hole = document.createElement('div');
		if(ev.target.tagName === 'IMG'){
			hole.classList.add('hole-kill');
			this.getMoney(ev.target.nextSibling);
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
	getMoney(el){
		let money = -100;
		if(el.outerHTML) money = el.outerHTML.match(/\d{2}/);
		this.renderBank(money);
	}
	shot(ev){
		if(!this.isReloadGun){
			this.bulletsRevolver--;
			this.gun.style.backgroundImage = `url("./img/bullet/gun_${this.bulletsRevolver}.svg")`;
			new Audio('./media/sounds/shot.wav').play();
			this.renderHoleShot(ev);
			if(!this.bullets.children.length){
				this.endGame();
			}
			else if(!this.bulletsRevolver){
				this.isReloadGun = true;
				this.bulletsRevolver = 6;
				this.reload();
			}
		}
	}
	startGame(){
		this.wantedList.forEach(el=>{
			let time = Math.floor(Math.random()*4000+2000);
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
	reload(){
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

	addBandit(el){
		return new Promise(function (resolve) {
			el.classList.add('wanted-move');
			setTimeout(()=>resolve(), 250); // половина от css transition
		});
	}
	removeBandit(el){
		return new Promise(function (resolve) {
			el.classList.remove('wanted-move');
			setTimeout(()=>resolve(), 250);
		});
	}
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
							<img src="${bandit.img}" alt="bandit"/>
						</div>`;
			}
		}
	}
	checkRecords(){

	}
	endGame(){
		this.checkRecords();
		console.log('game over');
	}
}
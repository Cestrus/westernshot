export class viewWestern {
	constructor(bank, bulletsQuantity, randomHole, randomBandit) {
		this.gamePlate = document.querySelector('.game-plate');
		this.wantedList = function (){this.renderGamePlate(); return document.querySelectorAll('.wanted')}.bind(this)();
		this.money = document.querySelector('.money');
		this.gun = document.querySelector('.gun');
		this.bullets = document.querySelector('.bullets');
		this.gamePlate.addEventListener('click', ev=>{
			this.goMoney(50);
			this.shot(ev);
		});

		this.bank = bank;
		this.bulletsQuantity = bulletsQuantity;
		this.randomHole = randomHole;
		this.randomBandit = randomBandit;

		this.isClick = false;
		this.idInterval = true;
		this.bulletsRevolver = 6;
		this.isReloadGun = false;

		this.renderBank();
		this.renderBullets();
		// this.renderGamePlate()
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
	renderBank(){
		this.money.innerText = `BANK: ${this.bank}$`;
	}
	renderBullets(){
		for (let i =0; i<this.bulletsQuantity; i++){
			this.bullets.innerHTML += '<div class="bullet"></div>';
		}
	}

	goMoney(coins) { //TODO начисление денег
		if(!this.isClick){
			this.isClick = true;
			this.idInterval = setInterval(()=>{
				if(!coins) {
					clearInterval(this.idInterval);
					this.isClick = false;
				}
				this.money.innerText = `BANK: ${this.bank++}$`;
				coins--;
			}, 30);
		}
	}
	shot(ev){
		if(!this.isReloadGun){
			this.bulletsRevolver--;
			this.gun.style.backgroundImage = `url("./img/bullet/gun_${this.bulletsRevolver}.svg")`;
			this.bullets.children[this.bullets.children.length-1].remove();
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
	renderHoleShot(ev){
		let hole = document.createElement('div');
		hole.classList.add('hole');
		hole.style.top = ev.clientY - 15 + 'px';
		hole.style.left = ev.clientX - 15 +'px';
		hole.style.backgroundImage = this.randomHole();
		document.body.appendChild(hole);
		let interval = setTimeout(()=>{
			hole.remove();
			clearInterval(interval);
		}, 2000);
	}
	endGame(){
		console.log('game over');
	}
}
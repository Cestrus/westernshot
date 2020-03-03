export class viewWestern {
	constructor(bank, bulletsQuantity, randomHole) {
		this.gamePlate = document.querySelector('.game-plate');
		this.money = document.querySelector('.money');
		this.gun = document.querySelector('.gun');
		this.gamePlate.addEventListener('click', ev=>{
			this.goMoney(50);
			this.shot(ev);
		});

		this.bank = bank;
		this.isClick = false;
		this.idInterval = true;
		this.bullet = 6;
		this.isReloadGun = false;
		this.randomHole = randomHole;
		this.renderBank();
	}
	renderBank(){
		this.money.innerText = `BANK: ${this.bank}$`;
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
			this.bullet--;
			this.gun.style.backgroundImage = `url("./img/bullet/gun_${this.bullet}.svg")`;
			new Audio('./media/sounds/shot.wav').play();
			this.renderHoleShot(ev);
			if(!this.bullet){
				this.isReloadGun = true;
				this.bullet = 6;
				this.reload();
			}
		}
	}
	reload(){
		let a = 1;
		let interval = setInterval(()=>{
			if(a==6) {
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
}
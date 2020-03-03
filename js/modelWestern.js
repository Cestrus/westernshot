export class modelWestern{
	constructor() {
		this.bank = 100;
		this.bulletsQuantity = 60;
		this.coins = 20;
		this.idInterval = true;
		this.isClick = false;
		this.arrHoleShot = [
			'url("./img/holes/bullet-hole-1.png")',
			'url("./img/holes/bullet-hole-2.png")',
			'url("./img/holes/bullet-hole-3.png")',
			'url("./img/holes/bullet-hole-4.png")',
		]
		this.arrBandits = [
			'<img src="./img/bandit/pig.png" alt="bandit">',
			'<img src="./img/bandit/shooter_3.png" alt="bandit"><p>cost: 50$</p>',
		]

	}
	randomHole(){
		return this.arrHoleShot[Math.floor(Math.random() * this.arrHoleShot.length)];
	}
	randomBandit(){
		return this.arrBandits[Math.floor(Math.random() * this.arrBandits.length)];
	}
}
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

	}
	randomHole(){
		return this.arrHoleShot[Math.floor(Math.random() * this.arrHoleShot.length)];
	}
}
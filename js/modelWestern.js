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
		];
		this.arrBandits = [
			{isBandit: true, img: './img/bandit/shooter_1.png', cost:'60$',  },
			{isBandit: true, img: './img/bandit/shooter_2.png', cost:'70$',  },
			{isBandit: true, img: './img/bandit/shooter_3.png', cost:'50$',  },
			{isBandit: false, img: './img/bandit/pig_3.png', cost:'',  },
			{isBandit: false, img: './img/bandit/funt.png', cost:'',  }
		]

	}
	randomHole(){
		return this.arrHoleShot[Math.floor(Math.random() * this.arrHoleShot.length)];
	}
	randomBandit(){
		return this.arrBandits[Math.floor(Math.random() * this.arrBandits.length)];
	}
}
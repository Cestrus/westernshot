export class modelWestern{
	constructor() {
		this.bank = 0;
		this.bulletsRevolver = 6;
		this.bulletsQuantity = 60;
		this.arrHoleShot = [
			'url("./img/holes/bullet-hole-1.png")',
			'url("./img/holes/bullet-hole-2.png")',
			'url("./img/holes/bullet-hole-3.png")',
			'url("./img/holes/bullet-hole-4.png")',
		];
		this.arrBandits = [
			{isBandit: true, img: './img/bandit/shooter_1.png', cost:'70$',  },
			{isBandit: true, img: './img/bandit/shooter_2.png', cost:'60$',  },
			{isBandit: true, img: './img/bandit/shooter_3.png', cost:'50$',  },
			{isBandit: false, img: './img/bandit/funt.png', cost:'',  },
			{isBandit: false, img: './img/bandit/pig_3.png', cost:'',  },
		];
		this.arrWoodPlanks = [
			'(./img/background/wood-plank_1.png)',
			'(./img/background/wood-plank_2.png)',
			'(./img/background/wood-plank_3.png)',
			'(./img/background/wood-plank_4.png)',
			'(./img/background/wood-plank_5.png)',
		]

	}
	randomHole(){
		return this.arrHoleShot[Math.floor(Math.random() * this.arrHoleShot.length)];
	}
	randomBandit(){
			let a = Math.random();
			if(a < 0.025) return this.arrBandits[3];
			if(a >= 0.025 && a < 0.05) return this.arrBandits[4];
			if(a >= 0.05 && a <= 0.15) return this.arrBandits[0];
			if(a > 0.15 && a < 0.45) return this.arrBandits[1];
			else return this.arrBandits[2];
	}
	randomWoodPlank(){
		return this.arrWoodPlanks[Math.floor(Math.random() * this.arrWoodPlanks.length)];
	}
}
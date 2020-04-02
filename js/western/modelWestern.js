export class modelWestern{
	constructor(gamerName, dataFromFirebase) {
		this.money = 0;
		this.bulletsRevolver = 6;
		this.bulletsQuantity = 60;
		this.arrHoleShot = [
			'url("./img/holes/bullet-hole-1.png")',
			'url("./img/holes/bullet-hole-2.png")',
			'url("./img/holes/bullet-hole-3.png")',
			'url("./img/holes/bullet-hole-4.png")',
		];
		this.arrBandits = [
			{isBandit: true, img: './img/bandit/shooter_1.png', cost:70, },
			{isBandit: true, img: './img/bandit/shooter_2.png', cost:60, },
			{isBandit: true, img: './img/bandit/shooter_3.png', cost:50, },
			{isBandit: false, img: './img/bandit/funt.png', cost:100, }
		];
		this.arrWoodPlanks = [
			'(./img/background/wood-plank_1.png)',
			'(./img/background/wood-plank_2.png)',
			'(./img/background/wood-plank_3.png)',
			'(./img/background/wood-plank_4.png)',
			'(./img/background/wood-plank_5.png)',
		];
		this.gamer = {
			name: gamerName,
			bank: this.money,
			gameTime: 0,
			inTarget: 0,
			percent: 0,
			rating: 0,
			date: '',
		};
		this.db = dataFromFirebase;
		this.records = [];
		//this.loadData(sendData);
	}
	randomHole(){
		return this.arrHoleShot[Math.floor(Math.random() * this.arrHoleShot.length)];
	}
	randomBandit(){
			let a = Math.random();
			if(a < 0.01) return this.arrBandits[3];
			if(a >= 0.01 && a <= 0.15) return this.arrBandits[0];
			if(a > 0.15 && a < 0.45) return this.arrBandits[1];
			else return this.arrBandits[2];
	}
	randomWoodPlank(){
		return this.arrWoodPlanks[Math.floor(Math.random() * this.arrWoodPlanks.length)];
	}
	loadData(){
		return (this.db.collection("shooters")
			.get()
			.then(query => {
				query.forEach(shooter => {
					if(shooter.exists){
						this.records.push(shooter.data());
					}
				});
				return this.records;
			})
		)
	}
	checkRecord(name, money){

	}

}
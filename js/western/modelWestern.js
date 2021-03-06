export class ModelWestern{
	constructor(gamerName, dataFromFirebase) {
		this.money = 0;
		this.bulletsRevolver = 6;
		this.bulletsQuantity = 12;
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
	// зарузка данных из Firebase
	loadFromDatabase(){
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
	//
	loadData(){
		return this.loadFromDatabase().then(records => records.sort((a, b) => a.rating > b.rating ? -1 : 1));
	}
	// сохранение результата игры в Firebase
	saveData(){
		this.db.collection("shooters").add(this.gamer);
		this.records.push(Object.assign({}, this.gamer));
		this.records.sort((a, b) => a.rating > b.rating ? -1 : 1);
	}
	//подсчёт результата игры 
	resultGame(){
		this.gamer.percent = +(this.gamer.inTarget * 100 / this.bulletsQuantity).toFixed(1);
		this.gamer.rating = +(this.gamer.bank * this.gamer.inTarget / (this.gamer.gameTime *100)).toFixed(3);
		this.gamer.date = this.getDateNow();
		this.saveData();
	}
	getDateNow(){
		const d = new Date();
		return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}`;
	}
	reloadGamer(){
		this.gamer.bank = this.money;
		this.gamer.gameTime = this.gamer.inTarget = this.gamer.percent = this.gamer.rating = 0;
		this.gamer.date = '';
	}

}
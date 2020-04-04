export class ModelStart {
	checkName(name){
		const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-1234567890{}[],.;:' ";
		let arrSingName = name.trim().split('');
		for(let i = 0; i < arrSingName.length; i++) {
			let a = symbols.match(arrSingName[i]);
			if (!a) return false;
		}
		return arrSingName.length !== 0;
	}
}
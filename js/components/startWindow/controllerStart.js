import {ModelStart} from './modelStart.js';
import {ViewStart} from './viewStart.js';

export class ControllerStart {
	constructor(enterGame) {
		this.model = new ModelStart();
		this.view = new ViewStart(enterGame, this.model.checkName);
	}
}
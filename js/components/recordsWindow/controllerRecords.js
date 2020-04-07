import {ViewRecords} from './viewRecords.js';
import {ModelRecords} from './modelRecords.js';

export class ControllerRecords{
    constructor(records){
        this.model = new ModelRecords();
        this.view = new ViewRecords(records);
        
    }
}
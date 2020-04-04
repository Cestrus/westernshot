import {ControllerWestern} from "./western/controllerWestern.js";
import {ControllerStart} from "./components/startWindow/controllerStart.js";
import {dataFromFirebase} from "./firebase/init-firebase.js"

new ControllerStart(gamerName => new ControllerWestern(gamerName, dataFromFirebase));






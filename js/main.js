import {controllerWestern} from "./western/controllerWestern.js";
import {startModal} from "./modalWindows/startModal.js";
import {dataFromFirebase} from "./firebase/init-firebase.js"

new startModal(gamerName => new controllerWestern(gamerName, dataFromFirebase));






import {controllerWestern} from "./western/controllerWestern.js";
import {startModal} from "./modalWindows/startModal.js";


new startModal(gamerName => new controllerWestern(gamerName));






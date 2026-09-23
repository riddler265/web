import { STATE } from "../state/state.js";

export function syncInputs() {

    const inputX = document.getElementById('parametrX');
    const inputY = document.getElementById(`${STATE.parametrY}Y`);
    const inputR = document.getElementById(`${STATE.parametrR}R`);

    inputX.setAttribute('value', STATE.parametrX.toString());
    inputY.checked = true;
    inputR.checked = true;
}
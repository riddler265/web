import { STATE } from "../state/state.js";

export function syncInputs() {

    const inputX = document.getElementById('parametrX');
    const inputY = document.getElementById(`SelectParametrY`);
    const inputR = document.getElementById(`${STATE.parametrR}R`);

    inputX.setAttribute('value', STATE.parametrX.toString());
    inputY.value = STATE.parametrY.toString();
    inputR.checked = true;
}
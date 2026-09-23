export function syncInputs(parametrX, parametrY, parametrR) {

    const inputX = document.getElementById('parametrX');
    const inputY = document.getElementById(`${parametrY}Y`);
    const inputR = document.getElementById(`${parametrR}R`);

    inputX.setAttribute('value', parametrX.toString());
}
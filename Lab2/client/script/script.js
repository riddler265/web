import { drawPlane } from './methods/draw.js';
import { syncInputs } from './methods/syncInputs.js';
import { STATE, saveParametrR, saveParametrX, saveParametrY } from './state/state.js';

const form = document.getElementById('form');
const submitButton = document.getElementById('shootButton');

init();

form.addEventListener('submit', async function(event) {

    try {
        event.preventDefault();

        const formData = new FormData(this);
        const parametres = new URLSearchParams(formData).toString();
        const url = `/fcgi-bin/server.jar?${parametres}`;

        const responce = await fetch(url);
        console.log(`Получен ответ от сервера. ${responce.status}.`);

        if (!responce.ok) {
            console.log('ошибка.');
        }

        const data = await responce.json();
        console.log(`Валидация проведена. \nX: $${data.x} \nY: ${data.y} \nR: ${data.r}`);

        drawPlane(data.r);
        saveParametrR(data.r);
        saveParametrX(data.x);
        saveParametrY(data.y);

    } catch (error) {

    }
})

function init() {
    drawPlane(STATE.parametrR);
}
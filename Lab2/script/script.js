import { drawPlane } from './methods/draw.js';

const form = document.getElementById('form');
const submitButton = document.getElementById('shootButton');

drawPlane(1);

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = new FormData(this);

    const r = data.get('ParametrR');
    console.log(r);

    drawPlane(r);
})

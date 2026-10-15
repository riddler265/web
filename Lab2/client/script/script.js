import { drawPlane } from './methods/draw.js';

const form = document.getElementById('form');
const submitButton = document.getElementById('shootButton');

drawPlane(1);

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const parametres = new URLSearchParams(formData).toString();
    const url = `/submit/shoot?${parametres}`;

    console.log(formData, parametres, url);

    fetch(url)
        .then(responce => responce.json())
        .then(data => {
            drawPlane(data.r)
        })
        .catch(error => {
            console.log(parametres)
        });
})

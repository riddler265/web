import Decimal from 'https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/+esm';

import { applyActionMode, toggleActionMode } from './methods/toggleActionMode.js';
import { drawDots, drawPlane, drawExplosions } from './methods/draw.js';
import { validateY, validateR, validateX } from './methods/validators.js';
import { HitRecord } from './classes/hitRecord.js';
import { Dot } from './classes/dot.js';
import { STATE, saveParametrX, saveParametrY, saveParametrR } from './state/state.js';
import { syncInputs } from './methods/syncInputs.js';


const hitRecordSet = new Set();

const hitRecordTable = document.getElementById('hitRecordTable');

const shootForm = document.getElementById('shootForm');
const clearButton = document.querySelector('.clearButton');
const toggleButton = document.querySelector('.toggleButton');

const inputX = document.querySelector('.parametrXInput');

loadHitRecords();
init();

shootForm.addEventListener('submit', function(event) {
    event.preventDefault();
    try {

        const formData = new FormData(this);

        const parametrR = saveParametrR(validateR(formData.get('ParametrR')));
        const parametrX = saveParametrX(validateX(formData.get('ParametrX')));
        const parametrY = saveParametrY(validateY(formData.get('ParametrY')));

        console.log(`Получены параметры.\nX: ${parametrX}\nY: ${parametrY}\nRadius: ${parametrR}`);

        const dot = new Dot(parametrX, parametrY);
        const hitRecord = new HitRecord(dot, parametrR, Date.now());
        hitRecordSet.add(hitRecord);

        console.log(`Произошел выстрел.\nПопадание: ${hitRecord.hit}\nВремя: ${hitRecord.timestamp}`)

        createHitRecord(hitRecord);
        saveData(parametrR);

        drawPlane(parametrR);
        drawDots(hitRecordSet);


        
        inputX.classList.remove('error');
        inputX.setAttribute('placeholder', 'Введите X');
    } catch (error) {
        inputX.value = '';
        inputX.classList.add('error');
        inputX.setAttribute('placeholder', 'Неподходящее значение!');
    }
})

clearButton.addEventListener('click', function() {
    hitRecordSet.clear();
    localStorage.removeItem('hitRecordSet');
    hitRecordTable.innerHTML = `
    <thead id="HitRecordThead">
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Попадание</th>
                            <th>Время</th>
                        </tr>
                    </thead>
                    `;
    drawPlane(STATE.parametrR);
});

toggleButton.addEventListener('click', function() {
    toggleActionMode();

    if(STATE.actionMode) {
        const boom = drawExplosions(
            STATE.parametrR, 
            hitRecordSet, 
            {count: 100}
        );
        boom.start();
    } else {
        drawPlane(STATE.parametrR);
        drawDots(hitRecordSet);
    }
});

function init() {
    applyActionMode();
    drawPlane(STATE.parametrR);
    drawDots(hitRecordSet);
    syncInputs();
}

function loadHitRecords() {
    let hitRecordArray = [];
    let hitRecordSetString = localStorage.getItem('hitRecordSet');

    if (hitRecordSetString) {
        hitRecordArray = JSON.parse(hitRecordSetString);
    }

    if (Array.isArray(hitRecordArray)) {
        for (const rawRecord of hitRecordArray) {
            const dot = new Dot(new Decimal(rawRecord.dot.x), rawRecord.dot.y);
            
            const hitRecord = new HitRecord(
                dot, 
                rawRecord.radius,  
                rawRecord.timestamp
            );

            createHitRecord(hitRecord);
            hitRecordSet.add(hitRecord);
        }
    }

}

function createHitRecord(hitRecord) {
    const tr = document.createElement('tr');
    const tdX = document.createElement('td');
    tdX.textContent = hitRecord.dot.x;
    const tdY = document.createElement('td');
    tdY.textContent = hitRecord.dot.y;
    const tdR = document.createElement('td');
    tdR.textContent = hitRecord.radius;
    const tdHit = document.createElement('td');
    tdHit.textContent = hitRecord.hit ? 'Попадание' : 'Промах';
    const tdTimestamp = document.createElement('td');
    tdTimestamp.textContent = new Date(hitRecord.timestamp).toLocaleString('ru-RU');

    tr.appendChild(tdX);
    tr.appendChild(tdY);
    tr.appendChild(tdR);
    tr.appendChild(tdHit);
    tr.appendChild(tdTimestamp);

    hitRecordTable.prepend(tr);
}

function saveData(parametrR) {
    localStorage.setItem('hitRecordSet', JSON.stringify(Array.from(hitRecordSet)));
}

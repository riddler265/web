import { drawPlane, drawDots } from './methods/draw.js';
import { syncInputs } from './methods/syncInputs.js';
import { STATE, saveParametrR, saveParametrX, saveParametrY, saveLog } from './state/state.js';
import { Dot } from './classes/dot.js';
import { HitRecord } from './classes/hitRecord.js';

const hitRecordSet = new Set();
const form = document.getElementById('form');
const clearButton = document.getElementById('clearButton');
const logger = document.querySelector('#logger p');
const hitRecordTable = document.getElementById('hitRecordTable');

loadHitRecords();
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
            const data = await responce.json();
            throw new Error(data.error);
        }

        const data = await responce.json();
        console.log(`Валидация проведена. \nX: $${data.x} \nY: ${data.y} \nR: ${data.r}`);

        saveParametrR(data.r);
        saveParametrX(data.x);
        saveParametrY(data.y);

        const dot = new Dot(data.x, data.y);
        const hitRecord = new HitRecord(dot, data.r, data.is_hit, data.current_time);
        createHitRecord(hitRecord);

        drawPlane(data.r);
        drawDots(hitRecordSet);
        log('Succes!');

    } catch (error) {
        log(error.message);
    }
})

clearButton.addEventListener('clicl', function(event) {
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
})

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
    hitRecordSet.add(hitRecord);
    localStorage.setItem('hitRecordSet', JSON.stringify(Array.from(hitRecordSet)));
}

function log(log) {
    logger.textContent = saveLog(log);
}

function init() {
    drawPlane(STATE.parametrR);
    drawDots(hitRecordSet);
    syncInputs();
}
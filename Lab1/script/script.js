import Decimal from 'https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/+esm';

import { toggleActionMode } from './toggleActionMode.js';
import { drawDots, drawPlane } from './draw.js';
import { validateY, validateR, validateX } from './validators.js';
import { HitRecord } from './classes/hitRecord.js';
import { Dot } from './classes/dot.js';


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

        const parametrR = validateR(formData.get('ParametrR'));
        const parametrX = validateX(formData.get('ParametrX'));
        const parametrY = validateY(formData.get('ParametrY'));

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
    hitRecordTable.innerHTML = `<table width="100%" border="1" cellspacing="0" cellpadding="10" id="hitRecordTable" class="hitRecordTable">
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Попадание</th>
                            <th>Время</th>
                        </tr>
                    </thead>
                    <tbody id="resultsTableBody">
                    </tbody>`;
    drawPlane(JSON.parse(localStorage.getItem('lastParametrR')));
});

toggleButton.addEventListener('click', function() {
    toggleActionMode();
    drawPlane(JSON.parse(localStorage.getItem('lastParametrR')));
    drawDots(hitRecordSet);
});

function init() {
    toggleActionMode();
    toggleActionMode();
    drawPlane(JSON.parse(localStorage.getItem('lastParametrR') ?? '1'));

    drawDots(hitRecordSet);
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
    localStorage.setItem('lastParametrR', JSON.stringify(parametrR));
}

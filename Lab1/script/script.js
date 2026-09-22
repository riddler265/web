import Decimal from 'https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/+esm';

//import { calculateColors } from './calculateColors.js';

const availableR = [1, 1.5, 2, 2.5, 3];
const availableY = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
const hitRecordSet = new Set();

const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let lastParametrR;

const hitRecordTable = document.getElementById('hitRecordTable');

const shootForm = document.getElementById('shootForm');
const clearButton = document.querySelector('.clearButton');

const inputX = document.querySelector('.parametrXInput');

class Dot {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(division) {
        ctx.beginPath();
        ctx.moveTo(centerX + division * this.x, centerY - division * this.y);
        ctx.arc(centerX + division * this.x, centerY - division * this.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#ad3b3b';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 2;
        ctx.closePath;
        ctx.stroke();
        ctx.fill();
        ctx.lineWidth = 1;
    }
}

class HitRecord {

    constructor(dot, radius, timestamp) {
        this.dot = dot;
        this.radius = radius;
        this.hit = isHit(dot, radius);
        this.timestamp = timestamp;
    }
}

loadHitRecords();
drawPlane(getLastParametrR());

shootForm.addEventListener('submit', function(event) {
    event.preventDefault();


    try {
        const formData = new FormData(this);

        const parametrR = validateR(formData.get('ParametrR'));
        const parametrX = validateX(formData.get('ParametrX'));
        const parametrY = validateY(formData.get('ParametrY')); 

        const hitRecord = new HitRecord(new Dot(parametrX, parametrY), parametrR, Date.now())

        hitRecordSet.add(hitRecord);
        createHitRecord(hitRecord);
        saveData(parametrR);
        drawPlane(parametrR);
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
    drawPlane(lastParametrR);
});

function validateX(x) {
    const lowBound = new Decimal(-5);
    const upBound = new Decimal(3);

    try {
        const validX = new Decimal(x);

        if (validX.gt(lowBound) && validX.lt(upBound)) return validX;
        else throw new Error('Неподходящее значение параметра X!');
    } catch (error) {
        throw new Error('Неподходящее значение параметра X!');
    }
}

function validateY(y) {
    for (let i = 0; i < availableY.length; i++) {
        if (y == availableY[i]) return Number(y);
    } throw new Error('Неподходящее значение параметра Y!');
}

function validateR(multiplier) {
    for (let i = 0; i < availableR.length; i++) {
        if (multiplier == availableR[i]) return Number(multiplier);
    } throw new Error('Неподходящее значениие параметра R!');
}

function isHit(dot, parametrR) {
    const r = new Decimal(parametrR);
    let x = dot.x;
    let y = dot.y;

    console.log(typeof x);

    return (x >= 0 && y >= 0 && x + y <= r) ||
    (x <= 0 && x >= -r && y >= 0 && y <= r) ||
    (x <= 0 && y <= 0 && x * x + y * y <= r * r);
}

function drawPlane(parametrR) {
    lastParametrR = parametrR;

    const margin = 10;
    const division = 75;
    const radius = division * parametrR;

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX, centerY - radius);
    ctx.lineTo(centerX - radius, centerY - radius);
    ctx.lineTo(centerX - radius, centerY);
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, Math.PI, 0.5 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = 'rgb(33, 104, 23)';
    ctx.strokeStyle = 'rgb(104, 253, 81)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fill();

    ctx.strokeStyle = "rgb(104, 253, 81)";
    ctx.font = "14px Arial";
    ctx.fillStyle = 'rgb(104, 253, 81)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(centerX, margin);
    ctx.lineTo(centerX, canvas.height - margin);
    ctx.moveTo(centerX - 5, margin + 5);
    ctx.lineTo(centerX, margin);
    ctx.lineTo(centerX + 5, margin + 5);
    ctx.fillText('Y', centerX + 10, margin + 7);

    ctx.moveTo(margin, centerY);
    ctx.lineTo(canvas.width - margin, centerY);
    ctx.lineTo(canvas.width - margin - 5, centerY + 5);
    ctx.moveTo(canvas.width - margin, centerY);
    ctx.lineTo(canvas.width - 5 - margin, centerY - 5);
    ctx.fillText('X', canvas.width - margin - 5, centerY + 20)
    ctx.stroke();   

    ctx.beginPath();
    ctx.font = "10px Arial";


    for (let i = -10; i < 11; i++) {

        if (i != 0) {
            ctx.moveTo(centerX + i * division / 2, centerY + 3);
            ctx.lineTo(centerX + i * division / 2, centerY - 3);
            
        }
        
        if (i != 0) {
            ctx.fillText(i * 0.5, centerX + i * division / 2, centerY - 5);
        }
    }

    for (let i = -6; i < 7; i++) {

        if (i != 0) {
            ctx.moveTo(centerX + 3, centerY + i * division / 2);
            ctx.lineTo(centerX - 3, centerY + i * division / 2);
        }
        
        if (i != 0) {
            ctx.fillText(-i * 0.5, centerX + 5, centerY + i*division / 2 + 3);
        }
    }

    ctx.stroke();
    ctx.beginPath();

    for (const hitRecord of hitRecordSet) {
        hitRecord.dot.draw(division);
    }

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

function getLastParametrR() {
    return lastParametrR = JSON.parse(localStorage.getItem('lastParametrR'));
}

function saveData(parametrR) {
    localStorage.setItem('hitRecordSet', JSON.stringify(Array.from(hitRecordSet)));
    localStorage.setItem('lastParametrR', JSON.stringify(parametrR));
}

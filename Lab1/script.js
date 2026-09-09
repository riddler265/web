const availableRadiusMultipliers = [1, 1.5, 2, 2.5, 3];
const availableY = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
const hitRecordSet = new Set();

const division = 100;
const unitCount = 10;
const margin = 10;
let radius = division * 2;

const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const hitRecordTable = document.getElementById('hitRecordTable');

const shootForm = document.getElementById('shootForm');

drawPlane();

shootForm.addEventListener('submit', function(event) {
    event.preventDefault();


    try {
        const formData = new FormData(this);

        const parametrR = setRadius(formData.get('ParametrR'));
        const parametrX = validateX(formData.get('ParametrX'));
        const parametrY = validateY(formData.get('ParametrY'));

        const dot = new Dot(parametrX, parametrY);

        console.log(parametrR);

        const hitRecord = new HitRecord(dot, parametrR, 
            isHit(dot),
            new Date().toLocaleTimeString('ru-RU'))

        hitRecordSet.add(hitRecord);

        createHitRecord(hitRecord);
        drawPlane();
    } catch (error) {
        alert(error.message);
    }
})

function setRadius(multiplier) {
    for (let i = 0; i < availableRadiusMultipliers.length; i++) {
        if (multiplier == availableRadiusMultipliers[i]) {
            radius = division * Number(multiplier);
            return Number(multiplier);
        }
    } throw new Error('Неподходящее значениие параметра R!');
}

function validateX(x) {
    if (x > -5 || x < 3) return Number(x);
    throw new Error('Неподходящее значение параметра X!')
}

function validateY(y) {
    for (let i = 0; i < availableY.length; i++) {
        if (y == availableY[i]) return Number(y);
    } throw new Error('Неподходящее значение параметра Y!');
}

function isHit(dot) {
    let x = dot.x;
    let y = dot.y;

    if (x > 0 && y >= 0 && y <= -x + 1) return true;
    if (x <= 0 && x >= -1 && y <= 1) return true;
}

function drawPlane() {
    ctx.fillStyle = "rgb(1, 8, 0)";
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
    ctx.fillText('Y', centerX + 10, margin + 15);

    ctx.moveTo(margin, centerY);
    ctx.lineTo(canvas.width - margin, centerY);
    ctx.lineTo(canvas.width - margin - 5, centerY + 5);
    ctx.moveTo(canvas.width - margin, centerY);
    ctx.lineTo(canvas.width - 5 - margin, centerY - 5);
    ctx.fillText('X', canvas.width - margin - 15, centerY - 10)
    ctx.stroke();   

    ctx.beginPath();
    ctx.font = "10px Arial";


    for (let i = -unitCount; i < unitCount + 1; i++) {

        if (i != 0) {
            ctx.moveTo(centerX + i * division / 2, centerY + 3);
            ctx.lineTo(centerX + i * division / 2, centerY - 3);
            
        }
        
        if (i != 0) {
            ctx.fillText(i * 0.5, centerX + i * division / 2, centerY - 5);
        }
    }

    for (let i = -7; i < 8; i++) {

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
        hitRecord.dot.draw();
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
    tdTimestamp.textContent = hitRecord.timestamp;

    tr.appendChild(tdX);
    tr.appendChild(tdY);
    tr.appendChild(tdR);
    tr.appendChild(tdHit);
    tr.appendChild(tdTimestamp);

    hitRecordTable.prepend(tr);
}

class Dot {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(centerX + division * this.x, centerY - division * this.y);
        ctx.arc(centerX + division * this.x, centerY - division * this.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(145, 0, 0)';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 2;
        ctx.closePath;
        ctx.stroke();
        ctx.fill();
        ctx.lineWidth = 1;
    }
}

class HitRecord {

    constructor(dot, radius, hit, timestamp) {
        this.dot = dot;
        this.radius = radius;
        this.hit = hit;
        this.timestamp = timestamp;
    }
}
const shootForm = document.getElementById('ShootForm');

shootForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const X = document.getElementById('x').value;

    console.log(X);
})

const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let R = 35*3;

//Фон
ctx.fillStyle = "rgb(1, 8, 0)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//Фигуры
ctx.beginPath();
// ctx.moveTo(centerX, centerY);
ctx.moveTo(centerX + R, centerY);
ctx.lineTo(centerX, centerY - R);
ctx.lineTo(centerX - R, centerY - R);
ctx.lineTo(centerX - R, centerY);
ctx.moveTo(centerX, centerY);
ctx.arc(centerX, centerY, R, Math.PI, 0.5 * Math.PI, true);
ctx.closePath();
ctx.fillStyle = 'rgb(33, 104, 23)';
ctx.strokeStyle = 'rgb(104, 253, 81)';
ctx.lineWidth = 2;
ctx.stroke();
ctx.fill();

//Оси
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(0, centerY);
ctx.lineTo(canvas.width, centerY);
ctx.lineTo(canvas.width - 5, centerY + 5);
ctx.moveTo(canvas.width, centerY);
ctx.lineTo(canvas.width - 5, centerY - 5);
ctx.moveTo(centerX - 5, 5);
ctx.lineTo(centerX, 0);
ctx.lineTo(centerX + 5, 5);
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX, canvas.height);
ctx.closePath();
ctx.strokeStyle = "rgb(104, 253, 81)";
ctx.stroke();



//Засечки
const division = 35;

ctx.beginPath();
ctx.font = "14px Arial";
ctx.fillStyle = 'rgb(104, 253, 81)';

for (let i = -5; i < 6; i++) {

    if (i != 0) {
        ctx.moveTo(centerX + i*division, centerY + 3);
        ctx.lineTo(centerX + i*division, centerY - 3);
    }

    let sign = String(i * 0.5);
    
    if (i != 0) ctx.fillText(sign, centerX + i*division, centerY - 5); 
}

for (let i = -5; i < 6; i++) {

    if (i != 0) {
        ctx.moveTo(centerX + 3, centerY + i * division);
        ctx.lineTo(centerX - 3, centerY + i * division);
    }

    let sign = String(-i * 0.5);
    
    if (i != 0) ctx.fillText(sign, centerX + 5, centerY + i*division + 3);
}

ctx.stroke();

ctx.beginPath();





const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');

const margin = 10;
const division = 75;    
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

export function drawPlane(parametrR) {

    const fillColor = localStorage.getItem('fillColor') ?? '#216817';
    const strokeColor = localStorage.getItem('strokeColor') ?? '#68fd51';
    const radius = parametrR * division;

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = '14px Arial';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX, centerY - radius);
    ctx.lineTo(centerX - radius, centerY - radius);
    ctx.lineTo(centerX - radius, centerY);
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, Math.PI, 0.5 * Math.PI, true);
    ctx.moveTo(centerX, centerY + radius);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = strokeColor;
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
}

export function drawDots(hitRecordSet) {

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    for(const hitRecord of hitRecordSet) {
        const x = hitRecord.dot.x;
        const y = hitRecord.dot.y;
        ctx.fillStyle = hitRecord.hit ? '#ad3b3b' : '#000';

        ctx.beginPath();
        ctx.arc(centerX + division * x, centerY - division * y, 4, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        
    }

    ctx.lineWidth = 1;
}
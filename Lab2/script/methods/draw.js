import { STATE } from "../state/state.js";

const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');

const margin = 10;
const division = 85;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

export function drawPlane(parametrR) {

    const fillColor = '#216817';
    const strokeColor = '#68fd51';
    const radius = parametrR * division;

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = '14px Arial';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + radius);
    ctx.lineTo(centerX + radius, centerY);
    ctx.lineTo(centerX + radius / 2, centerY);
    ctx.lineTo(centerX + radius / 2, centerY - radius);
    ctx.lineTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY - radius / 2);
    ctx.arc(centerX, centerY, radius / 2, Math.PI * 1.5, Math.PI, true);
    ctx.lineTo(centerX, centerY);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fill();

    // ctx.moveTo(centerX + radius / 2, centerY);
    // ctx.lineTo(centerX + radius / 2, centerY - radius);
    // ctx.lineTo(centerX, centerY - radius);
    // ctx.moveTo(centerX, centerY + radius);
    // ctx.arc(centerX, centerY, radius / 2, Math.PI * 1.5, Math.PI, true);
    // ctx.moveTo(centerX, centerY);
    // ctx.moveTo(centerX, centerY + radius);
    // ctx.closePath();
    // ctx.stroke();
    // ctx.fill();

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
    ctx.font = "15px Arial";

    for (let i = -5; i < 6; i++) {
        if (i != 0) {
            ctx.moveTo(centerX + i * division , centerY + 3);
            ctx.lineTo(centerX + i * division , centerY - 3);
            ctx.fillText(i, centerX + i * division, centerY - 5);
        }
    }

    for (let i = -5; i < 6; i++) {
        if (i != 0) {
            ctx.moveTo(centerX + 3, centerY + i * division);
            ctx.lineTo(centerX - 3, centerY + i * division);
            ctx.fillText(-i, centerX + 5, centerY + i * division + 3);
        }
    }
    ctx.stroke();
}
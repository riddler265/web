import { STATE } from "../state/state.js";

const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');

const margin = 10;
const division = 75;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

export function drawPlane(parametrR) {

    const fillColor = STATE.fillColor;
    const strokeColor = STATE.strokeColor;
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
            ctx.fillText(i * 0.5, centerX + i * division / 2, centerY - 5);
        }
    }

    for (let i = -6; i < 7; i++) {
        if (i != 0) {
            ctx.moveTo(centerX + 3, centerY + i * division / 2);
            ctx.lineTo(centerX - 3, centerY + i * division / 2);
            ctx.fillText(-i * 0.5, centerX + 5, centerY + i * division / 2 + 3);
        }
    }
    ctx.stroke();
}

export function drawDots(hitRecordSet) {

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    for (const hitRecord of hitRecordSet) {
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

export function drawExplosions(parametrR, hitRecordSet, options = {}) {

    const {
        count = 10,
        particlesPerBoom = 25,
        minSize = 1,
        maxSize = 3,
        minSpeed = 1,
        maxSpeed = 4,
        duration = 900,
        pad = 40
    } = options;

    const W = canvas.width;
    const H = canvas.height;

    const particles = [];
    let rafId = null;
    let running = false;

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randomPoint() {
        return { x: rand(pad, W - pad), y: rand(pad, H - pad) };
    }

    function spawnExplosion(x, y) {
        for (let i = 0; i < particlesPerBoom; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = rand(minSpeed, maxSpeed);

            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 1 / (duration / 16.67) * rand(0.7, 1.3),
                size: rand(minSize, maxSize),
                hue: rand(0, 60)
            });
        }
    }

    function loop() {
        drawPlane(parametrR);
        drawDots(hitRecordSet);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.vx *= 0.97;
            p.vy *= 0.97;
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.fillStyle = `hsla(${p.hue}, 100%, ${50 + p.life * 30}%, ${p.life})`;
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
        }

        if (particles.length > 0) {
            rafId = requestAnimationFrame(loop);
        } else {
            running = false;
            rafId = null;
        }
    }

    function start() {
        for (let i = 0; i < count; i++) {
            const { x, y } = randomPoint();
            spawnExplosion(x, y);
        }

        if (!running) {
            running = true;
            loop();
        }
    }

    function stop() {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        particles.length = 0;
        drawPlane(parametrR);
        drawDots(hitRecordSet);
    }

    return { start, stop, particles };
}
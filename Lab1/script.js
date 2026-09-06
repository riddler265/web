const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const step = 30; // Размер одной клетки в пикселях

// 1. Смещаем начало координат в центр canvas
const centerX = width / 2;
const centerY = height / 2;

// 2. Рисуем сетку
ctx.beginPath();
ctx.strokeStyle = '#e0e0e0';
ctx.lineWidth = 1;

// 3. Рисуем оси X и Y
ctx.beginPath();
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;

// Ось X
ctx.moveTo(0, centerY);
ctx.lineTo(width, centerY);

// Ось Y
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX, height);
ctx.stroke();

// 4. Рисуем стрелки на концах осей
ctx.fillStyle = '#000';

// Стрелка X
ctx.beginPath();
ctx.moveTo(width, centerY);
ctx.lineTo(width - 10, centerY - 5);
ctx.lineTo(width - 10, centerY + 5);
ctx.fill();

// Стрелка Y
ctx.beginPath();
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX - 5, 10);
ctx.lineTo(centerX + 5, 10);
ctx.fill();

// 5. Разметка и подписи (засечки)
ctx.font = '12px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Подписи по оси X
for (let x = centerX + step, val = 1; x < width - 10; x += step, val++) {
    ctx.fillText(val, x, centerY + 15); // Справа от центра
}
for (let x = centerX - step, val = -1; x > 10; x -= step, val--) {
    ctx.fillText(val, x, centerY + 15); // Слева от центра
}

// Подписи по оси Y (обратите внимание, что Y в Canvas идет сверху вниз)
for (let y = centerY - step, val = 1; y > 10; y -= step, val++) {
    ctx.fillText(val, centerX - 15, y); // Выше центра
}
for (let y = centerY + step, val = -1; y < height - 10; y += step, val--) {
    ctx.fillText(val, centerX - 15, y); // Ниже центра
}

// Ноль в центре
ctx.fillText('0', centerX - 10, centerY + 15);

import Decimal from 'https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/+esm';

const availableR = [1, 1.5, 2, 2.5, 3];
const availableY = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

export function validateY(y) {
    for (let i = 0; i < availableY.length; i++) {
        if (y == availableY[i]) return Number(y);
    } throw new Error('Неподходящее значение параметра Y!');
}

export function validateR(parametrR) {
    for (let i = 0; i < availableR.length; i++) {
        if (parametrR == availableR[i]) return Number(parametrR);
    } throw new Error('Неподходящее значениие параметра R!');
}

export function validateX(x) {
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
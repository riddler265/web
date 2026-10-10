const DEFAULTS = {
    //script.js
    parametrX: 1,
    parametrY: 1,
    parametrR: 1,

    //toggleActionMode.js
    actionMode: false,

    //draw.js
    fillColor: '#216817',
    strokeColor: '#68fd51'
}

export const STATE = {
    ...DEFAULTS, ...JSON.parse(localStorage.getItem('STATE') ?? '{}')
}

export function saveParametrX(parametrX) {
    STATE.parametrX = parametrX;
    save();

    return parametrX;
}

export function saveParametrY(parametrY) {
    STATE.parametrY = parametrY;
    save();

    return parametrY;
}

export function saveParametrR(parametrR) {
    STATE.parametrR = parametrR;
    save();

    return parametrR;
}

export function toggleStateActionMode() {
    STATE.actionMode = !STATE.actionMode;
    save()
}

export function saveFillColor(fillColor) {
    STATE.fillColor = fillColor;
    save();

    return fillColor;
}

export function saveStrokeColor(strokeColor) {
    STATE.strokeColor = strokeColor;
    save();

    return strokeColor;
}

function save() {
    localStorage.setItem('STATE', JSON.stringify(STATE));
}
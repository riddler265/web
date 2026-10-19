const DEFAULTS = {
    //script.js
    parametrX: 1,
    parametrY: '1',
    parametrR: 1,

    //logger
    log: '...',
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

export function saveLog(log) {
    STATE.log = log;
    save()

    return log;
}


function save() {
    localStorage.setItem('STATE', JSON.stringify(STATE));
}
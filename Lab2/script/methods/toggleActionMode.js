import { STATE, toggleStateActionMode, saveFillColor, saveStrokeColor } from "../state/state.js";

const style = document.documentElement.style;

export function applyActionMode() {
    const actionMode = STATE.actionMode;
    if (actionMode) {
        style.setProperty('--fillColor', saveFillColor('#3124c7'));
        style.setProperty('--strokeColor', saveStrokeColor('#38aef2'));
    } else {
        style.setProperty('--fillColor', saveFillColor('#216817'));
        style.setProperty('--strokeColor', saveStrokeColor('#68fd51'));
    }
    return !actionMode;
}

export function toggleActionMode() {
    toggleStateActionMode();
    applyActionMode();

    console.log(`Движуха ${STATE.actionMode ? 'начата' : 'закончена'}.`)
}
export function toggleActionMode() {
    const isActionMode = JSON.parse(localStorage.getItem('isActionMode') ?? 'false');

    if (isActionMode) {
        localStorage.setItem('fillColor', '#3124c7');
        localStorage.setItem('strokeColor', '#38aef2');
        document.documentElement.style.setProperty('--fill-color', '#3124c7');
        document.documentElement.style.setProperty('--stroke-color', '#38aef2');
    } else {
        localStorage.setItem('fillColor', '#216817');
        localStorage.setItem('strokeColor', '#68fd51');
        document.documentElement.style.setProperty('--fill-color', '#216817');
        document.documentElement.style.setProperty('--stroke-color', '#68fd51');
    }
    localStorage.setItem('isActionMode', JSON.stringify(!isActionMode));
}
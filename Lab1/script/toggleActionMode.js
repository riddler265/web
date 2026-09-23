export function toogleActionMode() {
    let isActionMode = localStorage.getItem('isActionMode') ?? false;

    if (isActionMode) {
        localStorage.setItem('fillColor', '#3124c7');
        localStorage.setItem('borderColor', '#38aef2');
    } else {
        localStorage.setItem('fillColor', '#216817');
        localStorage.setItem('borderColor', '#68fd51');
    }
    localStorage.setItem('isActionMode', `${!isActionMode}`);
}
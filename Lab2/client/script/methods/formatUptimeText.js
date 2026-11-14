export function formatUptimeText(ms) {
    const s = Math.floor(ms / 1000);
    const parts = [];
    const d = Math.floor(s / 86400);
    const h = Math.floor(s / 3600) % 24;
    const m = Math.floor(s / 60) % 60;
    const sec = s % 60;

    if (d) parts.push(`${d} d`);
    if (h) parts.push(`${h} h`);
    if (m) parts.push(`${m} min`);
    parts.push(`${sec} s`);
    return parts.join(" ");
}
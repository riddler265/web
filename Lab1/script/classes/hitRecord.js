import Decimal from 'https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/+esm';

export class HitRecord {

    constructor(dot, radius, timestamp) {
        this.dot = dot;
        this.radius = radius;
        this.hit = isHit(dot, radius);
        this.timestamp = timestamp;
    }
}

function isHit(dot, radius) {
    let x = dot.x;
    let y = dot.y;

    return (x.gte(0) && y>= 0 && x.plus(y).lte(radius)) ||
    (x.lte(0) && x.gte(-radius) && y >= 0 && y <= radius) ||
    (x.lte(0) && y <= 0 && x.times(x).plus(y**2).lte(radius**2));
}
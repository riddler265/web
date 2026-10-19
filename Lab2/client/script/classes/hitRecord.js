export class HitRecord {

    constructor(dot, radius, isHit, currentTime) {
        this.dot = dot;
        this.radius = radius;
        this.hit = isHit;
        this.currentTime = new Date(currentTime).toLocaleTimeString();
    }
}
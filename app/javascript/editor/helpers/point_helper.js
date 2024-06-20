class PointHelper{
    static samePoint(point, otherPoint) {
        return (Math.abs(point.x - otherPoint.x) + Math.abs(point.y - otherPoint.y)) < 1E-6
    }
}
export {PointHelper}

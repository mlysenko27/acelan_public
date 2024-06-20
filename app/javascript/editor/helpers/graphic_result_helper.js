class GraphicResultHelper {

    buildFigures(n, w, h, r) {
        const result = []

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = w/2 + i*w
                const y = -h/2 - j*h

                result.push(this.getRect(w,h,x,y))
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = w/2 + i*w
                const y = -h/2 - j*h

                result.push(this.getCircle(r,x,y))
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = w/2 + i*w
                const y = -h/2 - j*h

                result.push(this.getRhombus(r,x,y))
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = i*w
                const y = -j*h

                result.push(this.getDots(w, h, r, x ,y))
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = i*w
                const y = -j*h

                result.push(this.getLines(w, h, r, x ,y))
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = w/2 + i*w
                const y = -h/2 - j*h

                result.push(this.getArcs(w, h, r, x ,y))
            }
        }

        return result
    }

    getCircle(r, x, y) {
        return {
            type: 'circle',
            x: x,
            y: y,
            radius: r
        }
    }

    getRect(w, h, x, y) {
        return {
            type: 'rect',
            x: x,
            y: y,
            width: w,
            height: h
        }
    }

    getRhombus(r, x, y) {
        return {
            type: 'rhombus',
            side: r,
            x: x,
            y: y
        }
    }

    getDots(w, h, r, x, y) {
        return {
            type: 'nodes',
            w: w,
            h: h,
            r: r,
            x: x,
            y: y
        }
    }

    getLines(w, h, r, x, y) {
        return {
            type: 'edges',
            w: w,
            h: h,
            r: r,
            x: x,
            y: y
        }
    }

    getArcs(w, h, r, x, y, startAngle, endAngle) {
        return {
            type: 'arcs',
            w: w,
            h: h,
            r: r,
            x: x,
            y: y,
            startAngle: startAngle,
            endAngle: endAngle
        }
    }

}
export {GraphicResultHelper}
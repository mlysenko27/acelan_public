import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {Point} from "../helpers/point";
import {PointHelper} from "../helpers/point_helper";
import _ from 'lodash'
import {GraphicResultHelper} from "../helpers/graphic_result_helper";

class GraphicResult {

    constructor({data}) {
        const graphicResultHelper = new GraphicResultHelper()
        this.data = {}
        this.data.figures = graphicResultHelper.buildFigures(data.n,data.w,data.h,data.r);
        this.data.labelsType = data.type
        this.points = [];
        this.rayPoints = [];
        this.elementLabelPoints = [];
        this.elementPoints = [];
    }

    render() {
        const width = 740
        const height = 700;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 500 );

        const renderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls( camera, renderer.domElement );
        renderer.setSize( width, height );

        controls.update()

        this.index = 0

        this.data.figures.forEach((f)=>{
            switch (f.type){
                case 'rect':
                    let rect = this.drawRect(f);
                    scene.add(rect);
                    break
                case 'circle':
                    let circle = this.drawCircle(f);
                    scene.add(circle);
                    break
                case 'rhombus':
                    let rhombus = this.drawRhombus(f);
                    scene.add(rhombus);
                    break
                case 'nodes':
                    const sVertices = this.getSquareVertices(f);
                    const cVertices = this.getCircleVertices(f);
                    const rVertices = this.getRhombusVertices(f);

                    this.fillPointsArray(f);

                    let squareDots = this.drawPoints(sVertices);
                    scene.add(squareDots);
                    let circleDots = this.drawPoints(cVertices);
                    scene.add(circleDots);
                    let rhombusDots = this.drawPoints(rVertices);
                    scene.add(rhombusDots);
                    break
                case 'edges':
                    let lines = this.drawLines(f);
                    lines.forEach( element =>
                        scene.add(element)
                    )
                    break
                case 'arcs':
                    let arcs = this.drawArc(f);
                    arcs.forEach( element =>
                        scene.add(element)
                    )
                    break
            }
        })

        switch (this.data.labelsType) {
            case 'nodes':
                const uniquePoints = _.uniqWith(this.points, PointHelper.samePoint);
                this.drawLabels(scene, uniquePoints);
                break
            case 'edges':
                const uniqueEdgePoints = _.uniqWith(this.createEdgesPoints(), PointHelper.samePoint);
                this.drawLabels(scene, uniqueEdgePoints);
                break
            case 'elements':
                this.drawLabels(scene, this.createElementsPoints());
                break
        }

        camera.position.z = 30;

        function animate() {
            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        }
        animate();

        return renderer.domElement;
    }

    save(blockContent){
        return this.data
    }

    // MARK: - Draw figures
    drawCircle(figure) {
        const geometry = new THREE.CircleGeometry( figure.radius, 200 );
        const material = new THREE.MeshBasicMaterial( { color: 0xad0f03 } );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.x = figure.x;
        circle.position.y = figure.y;
        return circle
    }

    drawRect(figure) {
        const geometry = new THREE.PlaneGeometry( figure.width, figure.height );
        const material = new THREE.MeshBasicMaterial( {color: 0x0080a3, side: THREE.DoubleSide, wireframe : false});
        const rect = new THREE.Mesh( geometry, material );
        rect.position.x = figure.x;
        rect.position.y = figure.y;
        return rect
    }

    drawRhombus(figure) {
        const geometry = new THREE.PlaneGeometry( figure.side, figure.side );
        const material = new THREE.MeshBasicMaterial( {color: 0xad0f03, side: THREE.DoubleSide, wireframe : false});
        const rect = new THREE.Mesh( geometry, material );
        rect.position.x = figure.x;
        rect.position.y = figure.y;
        rect.rotateZ((45 * Math.PI) / 180);
        return rect
    }

    // MARK: - Points coordinates via 'vertices' (x, y, z)
    getSquareVertices(figure) {
        return [
            figure.x, figure.y, 0,
            figure.w/2 + figure.x, figure.y, 0,
            figure.w + figure.x, figure.y, 0,
            figure.x + figure.w, -figure.h/2 + figure.y, 0,
            figure.w + figure.x, -figure.h + figure.y, 0,
            figure.w/2 + figure.x, figure.y - figure.h, 0,
            figure.x, -figure.h + figure.y, 0,
            figure.x, -figure.h/2 + figure.y, 0
        ]
    }

    getRhombusVertices(figure) {
        return [
            figure.w/2 - figure.r/(Math.sqrt(2)*2) + figure.x, -figure.h/2 + figure.r/(Math.sqrt(2)*2) + figure.y, 0,
            figure.w/2 + figure.x, -figure.h/2 + figure.y + figure.r/Math.sqrt(2), 0,
            figure.w/2 + figure.r/(Math.sqrt(2)*2) + figure.x, -figure.h/2 + figure.r/(Math.sqrt(2)*2) + figure.y, 0,
            figure.w/2 + figure.r/Math.sqrt(2) + figure.x, -figure.h/2 + figure.y, 0,
            figure.w/2 + figure.r/(Math.sqrt(2)*2) + figure.x, -figure.h/2 - figure.r/(Math.sqrt(2)*2) + figure.y, 0,

            figure.w/2 + figure.x, -figure.h/2 + figure.y - figure.r/Math.sqrt(2), 0,
            figure.w/2 - figure.r/(Math.sqrt(2)*2) + figure.x, -figure.h/2 - figure.r/(Math.sqrt(2)*2) + figure.y, 0,
            figure.w/2 - figure.r/Math.sqrt(2) + figure.x, -figure.h/2 + figure.y, 0

        ]
    }

    getCircleVertices(figure) {
        return [
            figure.w/2 + figure.r*Math.cos(135*Math.PI/180) + figure.x, -figure.h/2 + figure.r*Math.sin(135*Math.PI/180) + figure.y, 0,
            figure.w/2 + figure.x, -figure.h/2 + figure.y + figure.r, 0,
            figure.w/2 + figure.r*Math.cos(45*Math.PI/180) + figure.x, -figure.h/2 + figure.r*Math.sin(45*Math.PI/180) + figure.y, 0,
            figure.w/2 + figure.r + figure.x, -figure.h/2 + figure.y, 0,
            figure.w/2 + figure.r*Math.cos(315*Math.PI/180) + figure.x, -figure.h/2 + figure.r*Math.sin(315*Math.PI/180) + figure.y, 0,
            figure.w/2 + figure.x, -figure.h/2 + figure.y - figure.r, 0,
            figure.w/2 + figure.r*Math.cos(225*Math.PI/180) + figure.x, -figure.h/2 + figure.r*Math.sin(225*Math.PI/180) + figure.y, 0,
            figure.w/2 - figure.r + figure.x, -figure.h/2 + figure.y, 0
        ]
    }

    // MARK: - Nodes
    createNodesPoints(vertices) {
        const vArray = [];
        for (let i = 0; i < vertices.length; i+=3) {
            vArray.push(new Point(vertices[i], vertices[i+1]));
        }
        return vArray
    }

    // MARK: - Edges
    getExternalRayPoints(figure) {
        let externalRayVertices = [];
        const sVertices = this.getSquareVertices(figure);
        const cVertices = this.getCircleVertices(figure);
        for (let i = 0; i < sVertices.length; i+=3) {
            let x = (sVertices[i] + cVertices[i])/2;
            let y = (sVertices[i+1] + cVertices[i+1])/2;
            externalRayVertices.push(new Point(x, y));
        }

        return externalRayVertices
    }

    getInternalRayPoints(figure) {
        let internalRayVertices = [];
        const cVertices = this.getCircleVertices(figure);
        const rVertices = this.getRhombusVertices(figure);
        for (let i = 0; i < cVertices.length; i+=3) {
            let x = (cVertices[i] + rVertices[i])/2;
            let y = (cVertices[i+1] + rVertices[i+1])/2;
            internalRayVertices.push(new Point(x, y));
        }

        return internalRayVertices
    }

    createEdgesPoints() {
        const edgesPoints = [];

        let x = 0;
        let y = 0;

        for (let i = 0; i < this.points.length; i++) {

            if ((i+1)%8 === 0) {
                x = (this.points[i].x + this.points[i+1-8].x)/ 2;
                y = (this.points[i].y + this.points[i+1-8].y)/ 2;

                edgesPoints.push(new Point(x, y));

                if (i+1 === this.points.length) { break }

                continue
            }
            x = (this.points[i].x + this.points[i+1].x)/ 2;
            y = (this.points[i].y + this.points[i+1].y)/ 2;

            edgesPoints.push(new Point(x, y));
        }

        for (let i = 0; i < this.rayPoints.length; i++) {
            edgesPoints.push(new Point(this.rayPoints[i].x, this.rayPoints[i].y));
        }

        return edgesPoints
    }

    // MARK: - Elements
    getExternalElementsPoints(figure) {
        let points = [];
        const sVertices = this.getSquareVertices(figure);
        const cVertices = this.getCircleVertices(figure);

        for (let i = 0; i < sVertices.length-3; i+=3) {
            let firstX = sVertices[i]
            let firstY = sVertices[i+1]

            let secondX = cVertices[i]
            let secondY = cVertices[i+1]

            let thirdX = sVertices[i+3]
            let thirdY = sVertices[i+3+1]

            let fourthX = cVertices[i+3]
            let fourthY = cVertices[i+3+1]

            let elementPoints = [
                firstX, firstY, 0,
                secondX, secondY, 0,
                thirdX,thirdY, 0,
                fourthX,fourthY, 0
            ]
            this.elementPoints.push(...elementPoints);

            let x = (firstX + secondX + thirdX + fourthX)/4;
            let y = (firstY + secondY + thirdY + fourthY)/4;
            points.push(new Point(x, y));
        }

        // MARK: - Add last point
        let lastX = (sVertices[sVertices.length-3] + cVertices[cVertices.length-3] + sVertices[0] + cVertices[3])/4;
        let lastY = (sVertices[sVertices.length-2] + cVertices[cVertices.length-2] + sVertices[1] + cVertices[4])/4;
        points.push(new Point(lastX, lastY));

        return points
    }

    getInternalElementsPoints(figure) {
        let points = [];
        const cVertices = this.getCircleVertices(figure);
        const rVertices = this.getRhombusVertices(figure);
        for (let i = 0; i < cVertices.length-3; i+=3) {
            let x = (cVertices[i] + rVertices[i] + cVertices[i+3] + rVertices[i+3])/4;
            let y = (cVertices[i+1] + rVertices[i+1] + cVertices[i+1+3] + rVertices[i+1+3])/4;
            points.push(new Point(x, y));
        }
        // MARK: - Add last point
        let lastX = (cVertices[cVertices.length-3] + rVertices[rVertices.length-3] + cVertices[0] + rVertices[3])/4;
        let lastY = (cVertices[cVertices.length-2] + rVertices[rVertices.length-2] + cVertices[1] + rVertices[4])/4;
        points.push(new Point(lastX, lastY));

        // MARK: - Center point
        let sPoints = this.createNodesPoints(this.getSquareVertices(figure));
        let centerX = 0;
        let centerY = 0;
        for (let i = 0; i < sPoints.length; i++) {
            centerX += sPoints[i].x;
            centerY += sPoints[i].y;
        }
        points.push(new Point(centerX/sPoints.length, centerY/sPoints.length));

        return points
    }

    createElementsPoints() {
        let points = [];
        for (let i = 0; i < this.elementLabelPoints.length; i++) {
            points.push(new Point(this.elementLabelPoints[i].x, this.elementLabelPoints[i].y));
        }

        return points
    }

    // MARK: - Labels creation
    drawLabels(scene, points) {
        for (let i = 0; i < points.length; i++) {
            this.createLabel(scene, points[i].x, points[i].y, i+1);
        }
    }

    createLabel(scene, x, y, name) {
        let canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 216;
        let ctx = canvas.getContext("2d");
        ctx.font = "48pt Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(name, 128, 48);
        let tex = new THREE.Texture(canvas);
        tex.needsUpdate = true;
        let spriteMat = new THREE.SpriteMaterial({
            map: tex
        });
        let sprite = new THREE.Sprite(spriteMat);
        switch (this.data.labelsType) {
            case 'nodes':
                sprite.position.x = x - 0.1;
                sprite.position.y = y - 0.2;
                break
            case 'edges':
                sprite.position.x = x;
                sprite.position.y = y - 0.25;
                break
            case 'elements':
                sprite.position.x = x;
                sprite.position.y = y - 0.25;
                break
        }
        scene.add(sprite);
    }

    fillPointsArray(figure) {
        this.points.push(...this.createNodesPoints(this.getSquareVertices(figure)));
        this.points.push(...this.createNodesPoints(this.getCircleVertices(figure)));
        this.points.push(...this.createNodesPoints(this.getRhombusVertices(figure)));

        this.rayPoints.push(...this.getExternalRayPoints(figure));
        this.rayPoints.push(...this.getInternalRayPoints(figure));

        this.elementLabelPoints.push(...this.getExternalElementsPoints(figure));
        this.elementLabelPoints.push(...this.getInternalElementsPoints(figure));
    }

    drawPoints(vertices) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const points = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                size: .25
            }));
        return points
    }

    drawLines(figure) {
        const lines = [];

        const sVertices = this.getSquareVertices(figure);
        const cVertices = this.getCircleVertices(figure);
        const rVertices = this.getRhombusVertices(figure);

        // MARK: - Square edges
        lines.push(this.drawLine(new THREE.Vector2(sVertices[0], sVertices[1]), new THREE.Vector2(sVertices[3], sVertices[4])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[3], sVertices[4]), new THREE.Vector2(sVertices[6], sVertices[7])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[6], sVertices[7]), new THREE.Vector2(sVertices[9], sVertices[10])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[9], sVertices[10]), new THREE.Vector2(sVertices[12], sVertices[13])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[12], sVertices[13]), new THREE.Vector2(sVertices[15], sVertices[16])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[15], sVertices[16]), new THREE.Vector2(sVertices[18], sVertices[19])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[18], sVertices[19]), new THREE.Vector2(sVertices[21], sVertices[22])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[21], sVertices[22]), new THREE.Vector2(sVertices[0], sVertices[1])))

        // MARK: - Rhombus edges
        lines.push(this.drawLine(new THREE.Vector2(rVertices[0], rVertices[1]), new THREE.Vector2(rVertices[3], rVertices[4])))
        lines.push(this.drawLine(new THREE.Vector2(rVertices[3], rVertices[4]), new THREE.Vector2(rVertices[6], rVertices[7])))
        lines.push(this.drawLine(new THREE.Vector2(rVertices[6], rVertices[7]), new THREE.Vector2(rVertices[9], rVertices[10])))
        lines.push(this.drawLine(new THREE.Vector2(rVertices[9], rVertices[10]), new THREE.Vector2(rVertices[12], rVertices[13])))
        lines.push(this.drawLine(new THREE.Vector2(rVertices[12], rVertices[13]), new THREE.Vector2(rVertices[15], rVertices[16])))
        lines.push(this.drawLine(new THREE.Vector2(rVertices[15], rVertices[16]), new THREE.Vector2(rVertices[18], rVertices[19])))
        lines.push(this.drawLine(new THREE.Vector2(rVertices[18], rVertices[19]), new THREE.Vector2(rVertices[21], rVertices[22])))
        lines.push(this.drawLine(new THREE.Vector2(rVertices[21], rVertices[22]), new THREE.Vector2(rVertices[0], rVertices[1])))

        // MARK: - Lines from Square to Circle
        lines.push(this.drawLine(new THREE.Vector2(sVertices[0], sVertices[1]), new THREE.Vector2(cVertices[0], cVertices[1])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[3], sVertices[4]), new THREE.Vector2(cVertices[3], cVertices[4])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[6], sVertices[7]), new THREE.Vector2(cVertices[6], cVertices[7])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[9], sVertices[10]), new THREE.Vector2(cVertices[9], cVertices[10])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[12], sVertices[13]), new THREE.Vector2(cVertices[12], cVertices[13])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[15], sVertices[16]), new THREE.Vector2(cVertices[15], cVertices[16])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[18], sVertices[19]), new THREE.Vector2(cVertices[18], cVertices[19])))
        lines.push(this.drawLine(new THREE.Vector2(sVertices[21], sVertices[22]), new THREE.Vector2(cVertices[21], cVertices[22])))

        // MARK: - Lines from Circle to Rhombus
        lines.push(this.drawLine(new THREE.Vector2(cVertices[0], cVertices[1]), new THREE.Vector2(rVertices[0], rVertices[1])))
        lines.push(this.drawLine(new THREE.Vector2(cVertices[3], cVertices[4]), new THREE.Vector2(rVertices[3], rVertices[4])))
        lines.push(this.drawLine(new THREE.Vector2(cVertices[6], cVertices[7]), new THREE.Vector2(rVertices[6], rVertices[7])))
        lines.push(this.drawLine(new THREE.Vector2(cVertices[9], cVertices[10]), new THREE.Vector2(rVertices[9], rVertices[10])))
        lines.push(this.drawLine(new THREE.Vector2(cVertices[12], cVertices[13]), new THREE.Vector2(rVertices[12], rVertices[13])))
        lines.push(this.drawLine(new THREE.Vector2(cVertices[15], cVertices[16]), new THREE.Vector2(rVertices[15], rVertices[16])))
        lines.push(this.drawLine(new THREE.Vector2(cVertices[18], cVertices[19]), new THREE.Vector2(rVertices[18], rVertices[19])))
        lines.push(this.drawLine(new THREE.Vector2(cVertices[21], cVertices[22]), new THREE.Vector2(rVertices[21], rVertices[22])))
        return lines
    }

    drawLine(startPoint, endPoint) {
        const points = [];
        points.push(startPoint);
        points.push(endPoint);

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const material = new THREE.LineBasicMaterial( { color: 0xffffff } );

        const line = new THREE.Line( geometry, material );
        return line
    }

    drawArc(figure) {
        let ellipses = [];
        for (let i = 0; i < 9; i++) {
            const curve = new THREE.EllipseCurve(
                figure.x, figure.y,            // ax, aY
                figure.r, figure.r,           // xRadius, yRadius
                i*Math.PI/4,  (i+1)*Math.PI/4,  // aStartAngle, aEndAngle
                false,            // aClockwise
                0               // aRotation
            );

            const points = curve.getPoints( 50 );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );

            const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
            ellipses.push(new THREE.Line( geometry, material ));
        }

        return ellipses
    }

    // MARK: - These things draw shapes as you ask.
    getPlane(N, a, b, wireframe) {
        const geometry = new THREE.PlaneGeometry( 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, wireframe : wireframe});

        const plane = new THREE.Mesh(geometry, material );

        plane.position.x = (- N / 2 + 1 / 2) + b
        plane.position.y = (N / 2 - 1 / 2) - a

        return plane
    }

    getItem(N, a, b) {
        let plane = this.getPlane(N, a, b, false)
        let index = this.index
        if (this.data.rects[index] !== undefined) {
            plane.add(this.getRect(index))
            if (this.data.circles[index] !== undefined) {
                plane.add(this.getCircle(index))
            }
        } else {
            if (this.data.circles[index] !== undefined) {
                plane.add(this.getCircle(index))
            }
        }
        this.index++
        return plane
    }

    getCircle(index) {
        const geometry = new THREE.CircleGeometry( this.data.circles[index].radius, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffd700 } );
        const circle = new THREE.Mesh( geometry, material );
        return circle
    }

    getRect(index) {
        const geometry = new THREE.PlaneGeometry( this.data.rects[index].width, this.data.rects[index].height );
        const material = new THREE.MeshBasicMaterial( {color: 0x00bfff, side: THREE.DoubleSide, wireframe : false});
        const rect = new THREE.Mesh( geometry, material );
        return rect
    }

}
export {GraphicResult}
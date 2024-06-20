import {Delaunay} from "d3-delaunay";
import {UIHelper} from "../helpers/ui_helper";
import {MeshQuality} from "./mesh_quality";
class MeshDelaunay{

    constructor({data}){
        this.points = data?.points.flat()
    }

    render(){
        const container = document.createElement("div");
        const canvas = document.createElement("canvas");
        let [widthCanvas, heightCanvas] = this.calculateSizeCanvas(this.points)
        console.log(this.points)
        canvas.setAttribute('width', `${widthCanvas}`);
        canvas.setAttribute('height',`${heightCanvas}`);
        container.appendChild(canvas)
        const points = this.triangulationDelaunay(this.points, canvas)

        //Расчёт качества сетки
        const meshQuality = new MeshQuality()
        container.appendChild(meshQuality.renderStatistics(points))
        return container;
    }

    calculateSizeCanvas(arr){
        let widthCanvas = 0;
        let heightCanvas = 0;
        const flatArr = arr.flat()
        for (let i = 0; i < flatArr.length; i++) {
            if (widthCanvas < flatArr[i][0]) {
                widthCanvas = flatArr[i][0]
            }
            if (heightCanvas < flatArr[i][1]) {
                heightCanvas = flatArr[i][1]
            }
        }
        return [widthCanvas,heightCanvas];
    }

    triangulationDelaunay(arr, canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        const uiHelper2 = new UIHelper()
        const delaunay = Delaunay.from(arr);
        let triangles = delaunay.triangles
        let arrCoordinatesVerticesTriangle = []; // массив координат вершин треугольников

        // arr.forEach((p) => {
        //     drawCircle(p[0], p[1], 4)
        // })

        for (let i = 0; i < triangles.length / 3; i++) {
            const uiHelper = new UIHelper()
            const {points, triangles} = delaunay;
            const t0 = triangles[i * 3 + 0];
            const t1 = triangles[i * 3 + 1];
            const t2 = triangles[i * 3 + 2];
            arrCoordinatesVerticesTriangle.push(
                [
                    points[t0 * 2], points[t0 * 2 + 1],
                    points[t1 * 2], points[t1 * 2 + 1],
                    points[t2 * 2], points[t2 * 2 + 1]
                ]
            );
            context.beginPath();
            context.moveTo(points[t0 * 2], points[t0 * 2 + 1]);
            context.lineTo(points[t1 * 2], points[t1 * 2 + 1]);
            context.lineTo(points[t2 * 2], points[t2 * 2 + 1]);
            // Рандомный цвет треугольников
            context.fillStyle = uiHelper2.randomColor();
            context.fill();
            context.closePath();
            context.stroke();
        }
        return arrCoordinatesVerticesTriangle;
    }

    save(blockContent){
        return {
            data: {
                points: this.points
            }
        }
    }

}
export {MeshDelaunay}
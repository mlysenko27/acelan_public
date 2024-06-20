import earcut from "earcut";
import {UIHelper} from "../helpers/ui_helper";
import {MeshQuality} from "./mesh_quality";
class MeshEarcut {

    constructor({data}){
        this.points = [data?.points]
            //[
            //[[0, 0], [150, 0], [150, 150], [0, 150]], //outer polygon
            // [[200,100],[200,200],[400,200],[400,100],] //hole
        //];

    }

    render(){
        const container = document.createElement("div");
        const canvas = document.createElement("canvas");
        let [widthCanvas, heightCanvas] = this.calculateSizeCanvas(this.points)
        console.log(this.points)
        canvas.setAttribute('width', `${widthCanvas}`);
        canvas.setAttribute('height',`${heightCanvas}`);
        container.appendChild(canvas)
        const points = this.triangulationEarcut(this.points, canvas)

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

    triangulationEarcut(array, canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        const toProcess = earcut.flatten(array);
        const result = earcut(toProcess.vertices, toProcess.holes, toProcess.dimensions);
        const v = toProcess.vertices
        const uiHelper = new UIHelper()
        const arrCoordinatesVerticesTriangle = [];
        for (let i = 0; i < result.length; i += 3) {
               arrCoordinatesVerticesTriangle.push(
                   [
                       v[result[i] * 2], v[result[i] * 2 + 1],
                       v[result[i + 1] * 2], v[result[i + 1] * 2 + 1],
                       v[result[i + 2] * 2], v[result[i + 2] * 2 + 1]
                   ]
               );
            context.beginPath();
            context.moveTo(v[result[i] * 2], v[result[i] * 2 + 1]);
            context.lineTo(v[result[i + 1] * 2], v[result[i + 1] * 2 + 1]);
            context.lineTo(v[result[i + 2] * 2], v[result[i + 2] * 2 + 1]);
            context.fillStyle = uiHelper.randomColor();
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
export {MeshEarcut}
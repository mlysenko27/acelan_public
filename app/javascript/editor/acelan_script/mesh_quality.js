class MeshQuality {
    renderStatistics(points) {
        const container = document.createElement("div");
        // Подсчёт длин сторон треугольника по трём вершинам
        function calcLengthSidesTriangles(arrCoordinatesVerticesTriangle) {
            let a, b, c;
            // Создаём новый массив с результатами вычислений длин сторон по координатам его вершин
            let arrLengthSidesTriangles = arrCoordinatesVerticesTriangle.map(elementArr => {
                a = Math.round(Math.abs(Math.sqrt(Math.pow((elementArr[2] - elementArr[0]), 2) + Math.pow((elementArr[3] - elementArr[1]), 2))));
                b = Math.round(Math.abs(Math.sqrt(Math.pow((elementArr[4] - elementArr[0]), 2) + Math.pow((elementArr[5] - elementArr[1]), 2))));
                c = Math.round(Math.abs(Math.sqrt(Math.pow((elementArr[4] - elementArr[2]), 2) + Math.pow((elementArr[5] - elementArr[3]), 2))));
                return [a, b, c];
            })
            calсQualityMesh(arrLengthSidesTriangles)
        }

        function calсQualityMesh(arr) {
            // Создаём новый массив с результатами вычисления по формуле - ((maxSide - minSide) / maxSide) * 100
            let newArr = arr.map(elementArr =>
                Math.round(((Math.max.apply(null, elementArr) - Math.min.apply(null, elementArr)) / Math.max.apply(null, elementArr)) * 100)
            )
            const initialValue = 0;
            // сумма всех элементов в массиве
            const sumElementsArr = newArr.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);

            // считаем среднее
            let mean = sumElementsArr / newArr.length;
            if (mean <= 10) {
                container.innerText =`Триангуляция отличная - ${mean}%`;
            } else if (mean > 10 && mean <= 20) {
                container.innerText =`Триангуляция хорошая - ${mean}%`;
            } else if (mean > 20 && mean <= 40) {
                container.innerText =`Триангуляция нормальная - ${mean}%`;
            } else {
                container.innerText =`Триангуляция плохая - ${mean}%`;
            }
        }
        calcLengthSidesTriangles(points)
        return container;
    }
}

export {MeshQuality}
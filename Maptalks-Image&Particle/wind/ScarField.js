export default class ScarField {

    constructor({ xMin, xMax, yMin, yMax, cols,rows,scars,deltaX,deltaY }) {
        this.grid = [];
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
        this.cols = cols; // 列数
        this.rows = rows; // 行数
        this.scars = scars;
        this.deltaX = deltaX; // x 方向增量
        this.deltaY = deltaY; // y方向增量
        if (deltaY < 0 && yMin < yMax) {
            console.error('[wind-core]: The data is flipY');
        }else {
            this.yMin = Math.min(yMax, yMin);
            this.yMax = Math.max(yMax, yMin);
        }
        var cols = Math.ceil((this.xMax - this.xMin) / deltaX); // 列
        var rows = Math.ceil((this.yMax - this.yMin) / deltaY); // 行
        if (cols !== this.cols || rows !== this.rows) {
            this.cols = cols;
            this.rows = rows;
            // console.warn('[wind-core]: The data grid not equal');
        }
        this.grid = this.buildGrid()

    }

    floorMod(a, n) {
        return a - n * Math.floor(a / n);
    }

    clampColumnIndex(ii) {
        var i = ii;
        if (ii < 0) {
            i = 0;
        }
        var maxCol = this.cols - 1;
        if (ii > maxCol) {
            i = maxCol;
        }
        return i;
    };
    clampRowIndex(jj) {
        var j = jj;
        if (jj < 0) {
            j = 0;
        }
        var maxRow = this.rows - 1;
        if (jj > maxRow) {
            j = maxRow;
        }
        return j;
    };

    getDecimalIndexes(lon, lat) {
        var i = this.floorMod(lon - this.xMin, 360) / this.deltaX; // calculate longitude index in wrapped range [0, 360)
        var j = (this.yMax - lat) / this.deltaY; // calculate latitude index in direction +90 to -90
        return [i, j];
    };

    valueAtIndexes(i, j) {
        return this.grid[j][i]; // <-- j,i !!
    };

    buildGrid() {
        var grid = [];
        var p = 0;
        var _a = this, rows = _a.rows, cols = _a.cols, scars = _a.scars;
        for (var j = 0; j < rows; j++) {
            var row = [];
            for (var i = 0; i < cols; i++, p++) {
                row[i] = scars[p];
            }
            grid[j] = row;
        }
        return grid;
    }

    release() {
        this.grid = [];
    };

    pointData(lon,lat){
        let indexes = this.getDecimalIndexes(lon,lat)
        var ii = Math.floor(indexes[0]);
        var jj = Math.floor(indexes[1]);
        var ci = this.clampColumnIndex(ii);
        var cj = this.clampRowIndex(jj);
        return this.valueAtIndexes(ci, cj)
    }
}

/*!
 * author: sakitam-fdd <smilefdd@gmail.com>
 * @sakitam-gis/maptalks-wind v1.0.0-alpha.9
 * build-time: 2020-7-5 23:35
 * LICENSE: MIT
 * (c) 2017-2020 https://github.com/sakitam-fdd/wind-layer#readme
 */
import {Coordinate, renderer, CanvasLayer, Point} from 'maptalks/dist/maptalks.es.js';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf ||
    ({__proto__: []} instanceof Array && function (d, b) {
      d.__proto__ = b;
    }) ||
    function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) {
          d[p] = b[p];
        }
      }
    };
  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/*!
 * author: sakitam-fdd <smilefdd@gmail.com>
 * wind-core v1.0.0-alpha.9
 * build-time: 2020-7-5 23:35
 * LICENSE: MIT
 * (c) 2017-2020 https://github.com/sakitam-fdd/wind-layer#readme
 */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
  var arguments$1 = arguments;

  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments$1[i].length;
  }
  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }
  return r;
}

if (!Array.isArray) {
  // @ts-ignore
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      var arguments$1 = arguments;

      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments$1[index];
        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
var symToStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;

function baseGetTag(value) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value);
  }
  var isOwn = hasOwnProperty.call(value, symToStringTag);
  var tag = value[symToStringTag];
  var unmasked = false;
  try {
    value[symToStringTag] = undefined;
    unmasked = true;
  } catch (e) {
  }
  var result = Object.prototype.toString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * 判断是否为函数
 * @param value
 * @returns {boolean}
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag === '[object Function]' || tag === '[object AsyncFunction]' ||
    tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
}

/**
 * 判断是否为对象
 * @param value
 * @returns {boolean}
 */
function isObject(value) {
  var type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

/**
 * 判断是否为合法字符串
 * @param value
 * @returns {boolean}
 */
function isString(value) {
  if (value == null) {
    return false;
  }
  return typeof value === 'string' || (value.constructor !== null && value.constructor === String);
}

/**
 * 判断是否为数字
 * @param value
 * @returns {boolean}
 */
function isNumber(value) {
  return Object.prototype.toString.call(value) === '[object Number]' && !isNaN(value);
}

/**
 * check is array
 * @param arr
 */
function isArray(arr) {
  return Array.isArray(arr);
}

/**
 * assign object
 * @param target
 * @param sources
 */
function assign(target) {
  var arguments$1 = arguments;

  var sources = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    sources[_i - 1] = arguments$1[_i];
  }
  return Object.assign.apply(Object, __spreadArrays([target], sources));
}

function warnLog(msg) {
  // console.warn("wind-layer: " + msg);
}

/**
 * Get floored division
 * @param a
 * @param n
 * @returns {Number} returns remainder of floored division,
 * i.e., floor(a / n). Useful for consistent modulo of negative numbers.
 * See http://en.wikipedia.org/wiki/Modulo_operation.
 */
function floorMod(a, n) {
  return a - n * Math.floor(a / n);
}

/**
 * 检查值是否合法
 * @param val
 * @returns {boolean}
 */
function isValide(val) {
  return val !== undefined && val !== null && !isNaN(val);
}

/**
 * format gfs json to vector
 * @param data
 */
function formatData(data) {
  var uComp;
  var vComp;
  {
    // console.time('format-data');
  }
  data.forEach(function (record) {
    switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
      case "1,2":
      case "2,2":
        uComp = record;
        break;
      case "1,3":
      case "2,3":
        vComp = record;
        break;
    }
  });
  // @ts-ignore
  if (!vComp || !uComp) {
    return;
  }
  var header = uComp.header;
  var vectorField = new Field({
    xmin: header.lo1,
    ymin: header.la1,
    xmax: header.lo2,
    ymax: header.la2,
    deltaX: header.dx,
    deltaY: header.dy,
    cols: header.nx,
    rows: header.ny,
    us: uComp.data,
    vs: vComp.data
  });
  {
    // console.timeEnd('format-data');
  }
  return vectorField;
}

// from: https://sourcegraph.com/github.com/IHCantabria/Leaflet.CanvasLayer.Field/-/blob/src/Vector.js?utm_source=share
var Vector = /** @class */ (function () {
  function Vector(u, v) {
    this.u = u;
    this.v = v;
    this.m = this.magnitude();
  }

  /**
   * the vector value
   * 向量值（流体强度）
   * @returns {Number}
   */
  Vector.prototype.magnitude = function () {
    // Math.pow(u, 2)
    // Math.pow(v, 2)
    return Math.sqrt(this.u * this.u + this.v * this.v);
  };
  /**
   * Angle in degrees (0 to 360º) --> Towards
   * 流体方向
   * N is 0º and E is 90º
   * @returns {Number}
   */
  Vector.prototype.directionTo = function () {
    var verticalAngle = Math.atan2(this.u, this.v);
    var inDegrees = verticalAngle * (180.0 / Math.PI);
    if (inDegrees < 0) {
      inDegrees += 360.0;
    }
    return inDegrees;
  };
  /**
   * Angle in degrees (0 to 360º) From x-->
   * N is 0º and E is 90º
   * @returns {Number}
   */
  Vector.prototype.directionFrom = function () {
    var a = this.directionTo();
    return (a + 180.0) % 360.0;
  };
  return Vector;
}());

var Field = /** @class */ (function () {
  function Field(params) {
    this.grid = [];
    this.xmin = params.xmin;
    this.xmax = params.xmax;
    this.ymin = params.ymin;
    this.ymax = params.ymax;
    this.cols = params.cols; // 列数
    this.rows = params.rows; // 行数
    this.us = params.us; //
    this.vs = params.vs;
    this.deltaX = params.deltaX; // x 方向增量
    this.deltaY = params.deltaY; // y方向增量
    if (this.deltaY < 0 && this.ymin < this.ymax) {
      // console.warn('[wind-core]: The data is flipY');
    } else {
      this.ymin = Math.min(params.ymax, params.ymin);
      this.ymax = Math.max(params.ymax, params.ymin);
    }
    this.isFields = true;
    var cols = Math.ceil((this.xmax - this.xmin) / params.deltaX); // 列
    var rows = Math.ceil((this.ymax - this.ymin) / params.deltaY); // 行
    if (cols !== this.cols || rows !== this.rows) {
      // console.warn('[wind-core]: The data grid not equal');
    }
    // Math.floor(ni * Δλ) >= 360;
    // lon lat 经度 纬度
    this.isContinuous = Math.floor(this.cols * params.deltaX) >= 360;
    this.wrappedX = 'wrappedX' in params ? params.wrappedX : this.xmax > 180; // [0, 360] --> [-180, 180];
    this.grid = this.buildGrid();
    this.range = this.calculateRange();
  }

  // from https://github.com/sakitam-fdd/wind-layer/blob/95368f9433/src/windy/windy.js#L110
  Field.prototype.buildGrid = function () {
    var grid = [];
    var p = 0;
    var _a = this, rows = _a.rows, cols = _a.cols, us = _a.us, vs = _a.vs;
    for (var j = 0; j < rows; j++) {
      var row = [];
      for (var i = 0; i < cols; i++, p++) {
        var u = us[p];
        var v = vs[p];
        var valid = this.isValid(u) && this.isValid(v);
        row[i] = valid ? new Vector(u, v) : null;
      }
      if (this.isContinuous) {
        row.push(row[0]);
      }
      grid[j] = row;
    }
    return grid;
  };
  Field.prototype.release = function () {
    this.grid = [];
  };
  /**
   * grib data extent
   * 格点数据范围
   */
  Field.prototype.extent = function () {
    return [
      this.xmin,
      this.ymin,
      this.xmax,
      this.ymax];
  };
  /**
   * Bilinear interpolation for Vector
   * 针对向量进行双线性插值
   * https://en.wikipedia.org/wiki/Bilinear_interpolation
   * @param   {Number} x
   * @param   {Number} y
   * @param   {Number[]} g00
   * @param   {Number[]} g10
   * @param   {Number[]} g01
   * @param   {Number[]} g11
   * @returns {Vector}
   */
  Field.prototype.bilinearInterpolateVector = function (x, y, g00, g10, g01, g11) {
    var rx = 1 - x;
    var ry = 1 - y;
    var a = rx * ry;
    var b = x * ry;
    var c = rx * y;
    var d = x * y;
    var u = g00.u * a + g10.u * b + g01.u * c + g11.u * d;
    var v = g00.v * a + g10.v * b + g01.v * c + g11.v * d;
    return new Vector(u, v);
  };
  /**
   * calculate vector value range
   */
  Field.prototype.calculateRange = function () {
    if (!this.grid || !this.grid[0]) {
      return;
    }
    var rows = this.grid.length;
    var cols = this.grid[0].length;
    // const vectors = [];
    var min;
    var max;
    // @from: https://stackoverflow.com/questions/13544476/how-to-find-max-and-min-in-array-using-minimum-comparisons
    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
        var vec = this.grid[j][i];
        if (vec !== null) {
          var val = vec.m || vec.magnitude();
          // vectors.push();
          if (min === undefined) {
            min = val;
          } else if (max === undefined) {
            max = val;
            // update min max
            // 1. Pick 2 elements(a, b), compare them. (say a > b)
            min = Math.min(min, max);
            max = Math.max(min, max);
          } else {
            // 2. Update min by comparing (min, b)
            // 3. Update max by comparing (max, a)
            min = Math.min(val, min);
            max = Math.max(val, max);
          }
        }
      }
    }
    return [min, max];
  };
  /**
   * 检查 uv是否合法
   * @param x
   * @private
   */
  Field.prototype.isValid = function (x) {
    return x !== null && x !== undefined;
  };
  Field.prototype.getWrappedLongitudes = function () {
    var xmin = this.xmin;
    var xmax = this.xmax;
    if (this.wrappedX) {
      if (this.isContinuous) {
        xmin = -180;
        xmax = 180;
      } else {
        // not sure about this (just one particular case, but others...?)
        xmax = this.xmax - 360;
        xmin = this.xmin - 360;
        /* eslint-disable no-console */
        // console.warn(`are these xmin: ${xmin} & xmax: ${xmax} OK?`);
        // TODO: Better throw an exception on no-controlled situations.
        /* eslint-enable no-console */
      }
    }
    return [xmin, xmax];
  };
  Field.prototype.contains = function (lon, lat) {
    var _a = this.getWrappedLongitudes(), xmin = _a[0], xmax = _a[1];
    var longitudeIn = lon >= xmin && lon <= xmax;
    var latitudeIn;
    if (this.deltaY >= 0) {
      latitudeIn = lat >= this.ymin && lat <= this.ymax;
    } else {
      latitudeIn = lat >= this.ymax && lat <= this.ymin;
    }
    return longitudeIn && latitudeIn;
  };
  /**
   * 获取经纬度所在的位置索引
   * @param lon
   * @param lat
   */
  Field.prototype.getDecimalIndexes = function (lon, lat) {
    var i = floorMod(lon - this.xmin, 360) / this.deltaX; // calculate longitude index in wrapped range [0, 360)
    var j = (this.ymax - lat) / this.deltaY; // calculate latitude index in direction +90 to -90
    return [i, j];
  };
  /**
   * Nearest value at lon-lat coordinates
   * 线性插值
   * @param lon
   * @param lat
   */
  Field.prototype.valueAt = function (lon, lat) {
    if (!this.contains(lon, lat)) {
      return null;
    }
    var indexes = this.getDecimalIndexes(lon, lat);
    var ii = Math.floor(indexes[0]);
    var jj = Math.floor(indexes[1]);
    var ci = this.clampColumnIndex(ii);
    var cj = this.clampRowIndex(jj);
    return this.valueAtIndexes(ci, cj);
  };
  /**
   * Get interpolated grid value lon-lat coordinates
   * 双线性插值
   * @param lon
   * @param lat
   */
  Field.prototype.interpolatedValueAt = function (lon, lat) {
    if (!this.contains(lon, lat)) {
      return null;
    }
    var _a = this.getDecimalIndexes(lon, lat), i = _a[0], j = _a[1];
    return this.interpolatePoint(i, j);
  };
  Field.prototype.hasValueAt = function (lon, lat) {
    var value = this.valueAt(lon, lat);
    return value !== null;
  };
  /**
   * 基于向量的双线性插值
   * @param i
   * @param j
   */
  Field.prototype.interpolatePoint = function (i, j) {
    //         1      2           After converting λ and φ to fractional grid indexes i and j, we find the
    //        fi  i   ci          four points 'G' that enclose point (i, j). These points are at the four
    //         | =1.4 |           corners specified by the floor and ceiling of i and j. For example, given
    //      ---G--|---G--- fj 8   i = 1.4 and j = 8.3, the four surrounding grid points are (1, 8), (2, 8),
    //    j ___|_ .   |           (1, 9) and (2, 9).
    //  =8.3   |      |
    //      ---G------G--- cj 9   Note that for wrapped grids, the first column is duplicated as the last
    //         |      |           column, so the index ci can be used without taking a modulo.
    var indexes = this.getFourSurroundingIndexes(i, j);
    var fi = indexes[0], ci = indexes[1], fj = indexes[2], cj = indexes[3];
    var values = this.getFourSurroundingValues(fi, ci, fj, cj);
    if (values) {
      var g00 = values[0], g10 = values[1], g01 = values[2], g11 = values[3];
      // @ts-ignore
      return this.bilinearInterpolateVector(i - fi, j - fj, g00, g10, g01, g11);
    }
    return null;
  };
  /**
   * Check the column index is inside the field,
   * adjusting to min or max when needed
   * @private
   * @param   {Number} ii - index
   * @returns {Number} i - inside the allowed indexes
   */
  Field.prototype.clampColumnIndex = function (ii) {
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
  /**
   * Check the row index is inside the field,
   * adjusting to min or max when needed
   * @private
   * @param   {Number} jj index
   * @returns {Number} j - inside the allowed indexes
   */
  Field.prototype.clampRowIndex = function (jj) {
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
  /**
   * from: https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/blob/master/src/Field.js#L252
   * 计算索引位置周围的数据
   * @private
   * @param   {Number} i - decimal index
   * @param   {Number} j - decimal index
   * @returns {Array} [fi, ci, fj, cj]
   */
  Field.prototype.getFourSurroundingIndexes = function (i, j) {
    var fi = Math.floor(i); // 左
    var ci = fi + 1; // 右
    // duplicate colum to simplify interpolation logic (wrapped value)
    if (this.isContinuous && ci >= this.cols) {
      ci = 0;
    }
    ci = this.clampColumnIndex(ci);
    var fj = this.clampRowIndex(Math.floor(j)); // 上 纬度方向索引（取整）
    var cj = this.clampRowIndex(fj + 1); // 下
    return [fi, ci, fj, cj];
  };
  /**
   * from https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/blob/master/src/Field.js#L277
   * Get four surrounding values or null if not available,
   * from 4 integer indexes
   * @private
   * @param   {Number} fi
   * @param   {Number} ci
   * @param   {Number} fj
   * @param   {Number} cj
   * @returns {Array}
   */
  Field.prototype.getFourSurroundingValues = function (fi, ci, fj, cj) {
    var row;
    if ((row = this.grid[fj])) {
      var g00 = row[fi]; // << left
      var g10 = row[ci]; // right >>
      if (this.isValid(g00) &&
        this.isValid(g10) &&
        (row = this.grid[cj])) {
        // lower row vv
        var g01 = row[fi]; // << left
        var g11 = row[ci]; // right >>
        if (this.isValid(g01) && this.isValid(g11)) {
          return [g00, g10, g01, g11]; // 4 values found!
        }
      }
    }
    return null;
  };
  /**
   * Value for grid indexes
   * @param   {Number} i - column index (integer)
   * @param   {Number} j - row index (integer)
   * @returns {Vector|Number}
   */
  Field.prototype.valueAtIndexes = function (i, j) {
    return this.grid[j][i]; // <-- j,i !!
  };
  /**
   * Lon-Lat for grid indexes
   * @param   {Number} i - column index (integer)
   * @param   {Number} j - row index (integer)
   * @returns {Number[]} [lon, lat]
   */
  Field.prototype.lonLatAtIndexes = function (i, j) {
    var lon = this.longitudeAtX(i);
    var lat = this.latitudeAtY(j);
    return [lon, lat];
  };
  /**
   * Longitude for grid-index
   * @param   {Number} i - column index (integer)
   * @returns {Number} longitude at the center of the cell
   */
  Field.prototype.longitudeAtX = function (i) {
    var halfXPixel = this.deltaX / 2.0;
    var lon = this.xmin + halfXPixel + i * this.deltaX;
    if (this.wrappedX) {
      lon = lon > 180 ? lon - 360 : lon;
    }
    return lon;
  };
  /**
   * Latitude for grid-index
   * @param   {Number} j - row index (integer)
   * @returns {Number} latitude at the center of the cell
   */
  Field.prototype.latitudeAtY = function (j) {
    var halfYPixel = this.deltaY / 2.0;
    return this.ymax - halfYPixel - j * this.deltaY;
  };
  /**
   * 生成粒子位置
   * @param o
   * @param width
   * @param height
   * @param unproject
   */
  Field.prototype.randomize = function (o, width, height, unproject) {
    if (o === void 0) {
      o = {};
    }
    var i = (Math.random() * (width || this.cols)) | 0;
    var j = (Math.random() * (height || this.rows)) | 0;
    var coords = unproject([i, j]);
    if (coords !== null) {
      o.x = coords[0];
      o.y = coords[1];
    } else {
      o.x = this.longitudeAtX(i);
      o.y = this.latitudeAtY(j);
    }
    return o;
  };
  /**
   * check is custom field
   */
  Field.prototype.checkFields = function () {
    return this.isFields;
  };
  Field.prototype.startBatchInterpolate = function (width, height, unproject) {
  };
  return Field;
}());

var defaultOptions = {
  globalAlpha: 0.9,
  lineWidth: 1,
  colorScale: '#fff',
  velocityScale: 1 / 25,
  // particleAge: 90, // 粒子在重新生成之前绘制的最大帧数
  maxAge: 90,
  // particleMultiplier: 1 / 300, // TODO: PATHS = Math.round(width * height * particleMultiplier);
  paths: 800,
  frameRate: 20,
  useCoordsDraw: true,
  gpet: true
};

function indexFor(m, min, max, colorScale) {
  return Math.max(0, Math.min((colorScale.length - 1), Math.round((m - min) / (max - min) * (colorScale.length - 1))));
}

var BaseLayer = /** @class */ (function () {
  function BaseLayer(ctx, options, field) {
    this.particles = [];
    this.generated = false;
    this.ctx = ctx;
    if (!this.ctx) {
      throw new Error('ctx error');
    }
    this.animate = this.animate.bind(this);
    this.setOptions(options);
    if (field) {
      this.updateData(field);
    }
  }

  BaseLayer.prototype.setOptions = function (options) {
    this.options = Object.assign({}, defaultOptions, options);
    var _a = this.ctx.canvas, width = _a.width, height = _a.height;
    if (('particleAge' in options) && !('maxAge' in options) && isNumber(this.options.particleAge)) {
      // @ts-ignore
      this.options.maxAge = this.options.particleAge;
    }
    if (('particleMultiplier' in options) && !('paths' in options) && isNumber(this.options.particleMultiplier)) {
      // @ts-ignore
      this.options.paths = Math.round(width * height * this.options.particleMultiplier);
    }
    this.prerender();
  };
  BaseLayer.prototype.getOptions = function () {
    return this.options;
  };
  BaseLayer.prototype.updateData = function (field) {
    this.field = field;
    if (!this.generated) {
      return;
    }
    this.particles = this.prepareParticlePaths();
  };
  BaseLayer.prototype.moveParticles = function () {
    var _a = this.ctx.canvas, width = _a.width, height = _a.height;
    var particles = this.particles;
    // 清空组
    var maxAge = this.options.maxAge;
    var optVelocityScale = isFunction(this.options.velocityScale)
      // @ts-ignore
      ? this.options.velocityScale()
      : this.options.velocityScale;
    var velocityScale = optVelocityScale;
    var i = 0;
    var len = particles.length;
    for (; i < len; i++) {
      var particle = particles[i];
      if (particle.age > maxAge) {
        particle.age = 0;
        // restart, on a random x,y
        this.field.randomize(particle, width, height, this.unproject);
      }
      var x = particle.x;
      var y = particle.y;
      var vector = this.field.interpolatedValueAt(x, y);
      if (vector === null) {
        particle.age = maxAge;
      } else {
        var xt = x + vector.u * velocityScale;
        var yt = y + vector.v * velocityScale;
        if (this.field.hasValueAt(xt, yt)) {
          // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
          particle.xt = xt;
          particle.yt = yt;
          particle.m = vector.m;
        } else {
          // Particle isn't visible, but it still moves through the field.
          particle.x = xt;
          particle.y = yt;
          particle.age = maxAge;
        }
      }
      particle.age++;
    }
  };
  BaseLayer.prototype.fadeIn = function () {
    var prev = this.ctx.globalCompositeOperation; // lighter
    this.ctx.globalCompositeOperation = 'destination-in';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.globalCompositeOperation = prev;
  };
  BaseLayer.prototype.drawParticles = function () {
    var _a;
    var particles = this.particles;
    this.fadeIn();
    this.ctx.globalAlpha = this.options.globalAlpha;
    this.ctx.fillStyle = "rgba(0, 0, 0, " + this.options.globalAlpha + ")";
    this.ctx.lineWidth = (isNumber(this.options.lineWidth) ? this.options.lineWidth : 1);
    this.ctx.strokeStyle = (isString(this.options.colorScale) ? this.options.colorScale : '#fff');
    var i = 0;
    var len = particles.length;
    if (this.field && len > 0) {
      var min = void 0;
      var max = void 0;
      // 如果配置了风速范围
      if (isValide(this.options.minVelocity) && isValide(this.options.maxVelocity)) {
        min = this.options.minVelocity;
        max = this.options.maxVelocity;
      } else { // 未配置风速范围取格点数据中的最大风速和最小风速
        _a = this.field.range, min = _a[0], max = _a[1];
      }
      for (; i < len; i++) {
        this[this.options.useCoordsDraw ? 'drawCoordsParticle' : 'drawPixelParticle'](particles[i], min, max);
      }
    }
  };
  /**
   * 用于绘制像素粒子
   * @param particle
   * @param min
   * @param max
   */
  BaseLayer.prototype.drawPixelParticle = function (particle, min, max) {
    // TODO 需要判断粒子是否超出视野
    // this.ctx.strokeStyle = color;
    var pointPrev = [particle.x, particle.y];
    // when xt isn't exit
    var pointNext = [particle.xt, particle.yt];
    if (pointNext && pointPrev && isValide(pointNext[0]) &&
      isValide(pointNext[1]) && isValide(pointPrev[0]) &&
      isValide(pointPrev[1])
      && particle.age <= this.options.maxAge) {
      this.ctx.beginPath();
      this.ctx.moveTo(pointPrev[0], pointPrev[1]);
      this.ctx.lineTo(pointNext[0], pointNext[1]);
      if (isFunction(this.options.colorScale)) {
        // @ts-ignore
        this.ctx.strokeStyle = this.options.colorScale(particle.m);
      } else if (Array.isArray(this.options.colorScale)) {
        var colorIdx = indexFor(particle.m, min, max, this.options.colorScale);
        this.ctx.strokeStyle = this.options.colorScale[colorIdx];
      }
      if (isFunction(this.options.lineWidth)) {
        // @ts-ignore
        this.ctx.lineWidth = this.options.lineWidth(particle.m);
      }
      particle.x = particle.xt;
      particle.y = particle.yt;
      this.ctx.stroke();
    }
  };
  /**
   * 用于绘制坐标粒子
   * @param particle
   * @param min
   * @param max
   */
  BaseLayer.prototype.drawCoordsParticle = function (particle, min, max) {
    // TODO 需要判断粒子是否超出视野
    // this.ctx.strokeStyle = color;
    var source = [particle.x, particle.y];
    // when xt isn't exit
    var target = [particle.xt, particle.yt];
    if (target && source && isValide(target[0]) &&
      isValide(target[1]) && isValide(source[0]) &&
      isValide(source[1]) &&
      this.intersectsCoordinate(target)
      && particle.age <= this.options.maxAge) {
      var pointPrev = this.project(source);
      var pointNext = this.project(target);
      if (pointPrev && pointNext) {
        this.ctx.beginPath();
        this.ctx.moveTo(pointPrev[0], pointPrev[1]);
        this.ctx.lineTo(pointNext[0], pointNext[1]);
        particle.x = particle.xt;
        particle.y = particle.yt;
        if (isFunction(this.options.colorScale)) {
          // @ts-ignore
          this.ctx.strokeStyle = this.options.colorScale(particle.m);
        } else if (Array.isArray(this.options.colorScale)) {
          var colorIdx = indexFor(particle.m, min, max, this.options.colorScale);
          this.ctx.strokeStyle = this.options.colorScale[colorIdx];
        }
        if (isFunction(this.options.lineWidth)) {
          // @ts-ignore
          this.ctx.lineWidth = this.options.lineWidth(particle.m);
        }
        this.ctx.stroke();
      }
    }
  };
  BaseLayer.prototype.prepareParticlePaths = function () {
    var _a = this.ctx.canvas, width = _a.width, height = _a.height;
    var particleCount = typeof this.options.paths === 'function' ? this.options.paths(this) : this.options.paths;
    var particles = [];
    if (!this.field) {
      return [];
    }
    if ('startBatchInterpolate' in this.field) {
      this.field.startBatchInterpolate(width, height, this.unproject);
    }
    var i = 0;
    for (; i < particleCount; i++) {
      particles.push(this.field.randomize({
        age: this.randomize()
      }, width, height, this.unproject));
    }
    return particles;
  };
  BaseLayer.prototype.randomize = function () {
    return Math.floor(Math.random() * this.options.maxAge); // 例如最大生成90帧插值粒子路径
  };
  // @ts-ignore
  BaseLayer.prototype.project = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    throw new Error('project must be overriden');
  };
  // @ts-ignore
  BaseLayer.prototype.unproject = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    throw new Error('unproject must be overriden');
  };
  BaseLayer.prototype.intersectsCoordinate = function (coordinates) {
    throw new Error('must be overriden');
  };
  BaseLayer.prototype.clearCanvas = function () {
    this.stop();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.forceStop = false;
  };
  BaseLayer.prototype.start = function () {
    this.starting = true;
    this.forceStop = false;
    this._then = Date.now();
    this.animate();
  };
  BaseLayer.prototype.stop = function () {
    cancelAnimationFrame(this.animationLoop);
    this.starting = false;
    this.forceStop = true;
  };
  BaseLayer.prototype.animate = function () {
    if (this.animationLoop) {
      cancelAnimationFrame(this.animationLoop);
    }
    this.animationLoop = requestAnimationFrame(this.animate);
    var now = Date.now();
    var delta = now - this._then;
    if (delta > this.options.frameRate) {
      this._then = now - (delta % this.options.frameRate);
      this.render();
    }
  };
  /**
   * 渲染前处理
   */
  BaseLayer.prototype.prerender = function () {
    this.generated = false;
    if (!this.field) {
      return;
    }
    this.particles = this.prepareParticlePaths();
    this.generated = true;
    if (!this.starting && !this.forceStop) {
      this.starting = true;
      this._then = Date.now();
      this.animate();
    }
  };
  /**
   * 开始渲染
   */
  BaseLayer.prototype.render = function () {
    this.moveParticles();
    this.drawParticles();
    this.postrender();
  };
  /**
   * each frame render end
   */
  BaseLayer.prototype.postrender = function () {
  };
  BaseLayer.Field = Field;
  return BaseLayer;
}());

/*!
 * author: sakitam-fdd <smilefdd@gmail.com>
 * wind-gl-core v1.0.0-alpha.9
 * build-time: 2020-7-5 23:35
 * LICENSE: MIT
 * (c) 2017-2020 https://github.com/sakitam-fdd/wind-layer#readme
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics$1 = function (d, b) {
  extendStatics$1 = Object.setPrototypeOf ||
    ({__proto__: []} instanceof Array && function (d, b) {
      d.__proto__ = b;
    }) ||
    function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) {
          d[p] = b[p];
        }
      }
    };
  return extendStatics$1(d, b);
};

function __extends$1(d, b) {
  extendStatics$1(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __spreadArrays$1() {
  var arguments$1 = arguments;

  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments$1[i].length;
  }
  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }
  return r;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire() {
  throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
  return module = {exports: {}}, fn(module, module.exports), module.exports;
}

var punycode = createCommonjsModule(function (module, exports) {
  (function (root) {

    /** Detect free variables */
    var freeExports = exports &&
      !exports.nodeType && exports;
    var freeModule = module &&
      !module.nodeType && module;
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
    if (
      freeGlobal.global === freeGlobal ||
      freeGlobal.window === freeGlobal ||
      freeGlobal.self === freeGlobal
    ) {
      root = freeGlobal;
    }

    /**
     * The `punycode` object.
     * @name punycode
     * @type Object
     */
    var punycode,

      /** Highest positive signed 32-bit float value */
      maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

      /** Bootstring parameters */
      base = 36,
      tMin = 1,
      tMax = 26,
      skew = 38,
      damp = 700,
      initialBias = 72,
      initialN = 128, // 0x80
      delimiter = '-', // '\x2D'

      /** Regular expressions */
      regexPunycode = /^xn--/,
      regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
      regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

      /** Error messages */
      errors = {
        'overflow': 'Overflow: input needs wider integers to process',
        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
        'invalid-input': 'Invalid input'
      },

      /** Convenience shortcuts */
      baseMinusTMin = base - tMin,
      floor = Math.floor,
      stringFromCharCode = String.fromCharCode,

      /** Temporary variable */
      key;

    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error(type) {
      throw RangeError(errors[type]);
    }

    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
    function map(array, fn) {
      var length = array.length;
      var result = [];
      while (length--) {
        result[length] = fn(array[length]);
      }
      return result;
    }

    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */
    function mapDomain(string, fn) {
      var parts = string.split('@');
      var result = '';
      if (parts.length > 1) {
        // In email addresses, only the domain name should be punycoded. Leave
        // the local part (i.e. everything up to `@`) intact.
        result = parts[0] + '@';
        string = parts[1];
      }
      // Avoid `split(regex)` for IE8 compatibility. See #17.
      string = string.replace(regexSeparators, '\x2E');
      var labels = string.split('.');
      var encoded = map(labels, fn).join('.');
      return result + encoded;
    }

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(string) {
      var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;
      while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
          // high surrogate, and there is a next character
          extra = string.charCodeAt(counter++);
          if ((extra & 0xFC00) == 0xDC00) { // low surrogate
            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
          } else {
            // unmatched surrogate; only append this code unit, in case the next
            // code unit is the high surrogate of a surrogate pair
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }

    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
    function ucs2encode(array) {
      return map(array, function (value) {
        var output = '';
        if (value > 0xFFFF) {
          value -= 0x10000;
          output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
          value = 0xDC00 | value & 0x3FF;
        }
        output += stringFromCharCode(value);
        return output;
      }).join('');
    }

    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    function basicToDigit(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
      return base;
    }

    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    function digitToBasic(digit, flag) {
      //  0..25 map to ASCII a..z or A..Z
      // 26..35 map to ASCII 0..9
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * http://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    function adapt(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }

    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    function decode(input) {
      // Don't use UCS-2
      var output = [],
        inputLength = input.length,
        out,
        i = 0,
        n = initialN,
        bias = initialBias,
        basic,
        j,
        index,
        oldi,
        w,
        k,
        digit,
        t,
        /** Cached calculation results */
        baseMinusT;

      // Handle the basic code points: let `basic` be the number of input code
      // points before the last delimiter, or `0` if there is none, then copy
      // the first basic code points to the output.

      basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }

      for (j = 0; j < basic; ++j) {
        // if it's not a basic code point
        if (input.charCodeAt(j) >= 0x80) {
          error('not-basic');
        }
        output.push(input.charCodeAt(j));
      }

      // Main decoding loop: start just after the last delimiter if any basic code
      // points were copied; start at the beginning otherwise.

      for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

        // `index` is the index of the next character to be consumed.
        // Decode a generalized variable-length integer into `delta`,
        // which gets added to `i`. The overflow checking is easier
        // if we increase `i` as we go, then subtract off its starting
        // value at the end to obtain `delta`.
        for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

          if (index >= inputLength) {
            error('invalid-input');
          }

          digit = basicToDigit(input.charCodeAt(index++));

          if (digit >= base || digit > floor((maxInt - i) / w)) {
            error('overflow');
          }

          i += digit * w;
          t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

          if (digit < t) {
            break;
          }

          baseMinusT = base - t;
          if (w > floor(maxInt / baseMinusT)) {
            error('overflow');
          }

          w *= baseMinusT;

        }

        out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);

        // `i` was supposed to wrap around from `out` to `0`,
        // incrementing `n` each time, so we'll fix that now:
        if (floor(i / out) > maxInt - n) {
          error('overflow');
        }

        n += floor(i / out);
        i %= out;

        // Insert `n` at position `i` of the output
        output.splice(i++, 0, n);

      }

      return ucs2encode(output);
    }

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    function encode(input) {
      var n,
        delta,
        handledCPCount,
        basicLength,
        bias,
        j,
        m,
        q,
        k,
        t,
        currentValue,
        output = [],
        /** `inputLength` will hold the number of code points in `input`. */
        inputLength,
        /** Cached calculation results */
        handledCPCountPlusOne,
        baseMinusT,
        qMinusT;

      // Convert the input in UCS-2 to Unicode
      input = ucs2decode(input);

      // Cache the length
      inputLength = input.length;

      // Initialize the state
      n = initialN;
      delta = 0;
      bias = initialBias;

      // Handle the basic code points
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < 0x80) {
          output.push(stringFromCharCode(currentValue));
        }
      }

      handledCPCount = basicLength = output.length;

      // `handledCPCount` is the number of code points that have been handled;
      // `basicLength` is the number of basic code points.

      // Finish the basic string - if it is not empty - with a delimiter
      if (basicLength) {
        output.push(delimiter);
      }

      // Main encoding loop:
      while (handledCPCount < inputLength) {

        // All non-basic code points < n have been handled already. Find the next
        // larger one:
        for (m = maxInt, j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }

        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
        // but guard against overflow
        handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error('overflow');
        }

        delta += (m - n) * handledCPCountPlusOne;
        n = m;

        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];

          if (currentValue < n && ++delta > maxInt) {
            error('overflow');
          }

          if (currentValue == n) {
            // Represent delta as a generalized variable-length integer
            for (q = delta, k = base; /* no condition */; k += base) {
              t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
              if (q < t) {
                break;
              }
              qMinusT = q - t;
              baseMinusT = base - t;
              output.push(
                stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
              );
              q = floor(qMinusT / baseMinusT);
            }

            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }

        ++delta;
        ++n;

      }
      return output.join('');
    }

    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
    function toUnicode(input) {
      return mapDomain(input, function (string) {
        return regexPunycode.test(string)
          ? decode(string.slice(4).toLowerCase())
          : string;
      });
    }

    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
    function toASCII(input) {
      return mapDomain(input, function (string) {
        return regexNonASCII.test(string)
          ? 'xn--' + encode(string)
          : string;
      });
    }

    /*--------------------------------------------------------------------------*/

    /** Define the public API */
    punycode = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      'version': '1.3.2',
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      'ucs2': {
        'decode': ucs2decode,
        'encode': ucs2encode
      },
      'decode': decode,
      'encode': encode,
      'toASCII': toASCII,
      'toUnicode': toUnicode
    };

    /** Expose `punycode` */
    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (freeExports && freeModule) {
      if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
        freeModule.exports = punycode;
      } else { // in Narwhal or RingoJS v0.7.0-
        for (key in punycode) {
          punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
        }
      }
    } else { // in Rhino or a web browser
      root.punycode = punycode;
    }

  }(commonjsGlobal));
});

// Copyright Joyent, Inc. and other Node contributors.

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty$1(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var decode = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
      idx = x.indexOf(eq),
      kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty$1(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

// Copyright Joyent, Inc. and other Node contributors.

var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

var encode = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) {
    return '';
  }
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
    encodeURIComponent(stringifyPrimitive(obj));
};

var querystring = createCommonjsModule(function (module, exports) {

  exports.decode = exports.parse = decode;
  exports.encode = exports.stringify = encode;
});
var querystring_1 = querystring.decode;
var querystring_2 = querystring.parse;
var querystring_3 = querystring.encode;
var querystring_4 = querystring.stringify;

function extend(output) {
  var arguments$1 = arguments;

  var inputs = [], len = arguments.length - 1;
  while (len-- > 0) {
    inputs[len] = arguments$1[len + 1];
  }
  for (var i = 0, list = inputs; i < list.length; i += 1) {
    var input = list[i];
    for (var k in input) {
      output[k] = input[k];
    }
  }
  return output;
}

var ParsingError = function (Error) {
  function ParsingError(key, message) {
    Error.call(this, message);
    this.message = message;
    this.key = key;
  }

  if (Error) {
    ParsingError.__proto__ = Error;
  }
  ParsingError.prototype = Object.create(Error && Error.prototype);
  ParsingError.prototype.constructor = ParsingError;
  return ParsingError;
}(Error);

var Scope = function Scope(parent, bindings) {
  if (bindings === void 0) {
    bindings = [];
  }
  this.parent = parent;
  this.bindings = {};
  for (var i = 0, list = bindings; i < list.length; i += 1) {
    var ref = list[i];
    var name = ref[0];
    var expression = ref[1];
    this.bindings[name] = expression;
  }
};
Scope.prototype.concat = function concat(bindings) {
  return new Scope(this, bindings);
};
Scope.prototype.get = function get(name) {
  if (this.bindings[name]) {
    return this.bindings[name];
  }
  if (this.parent) {
    return this.parent.get(name);
  }
  throw new Error(name + ' not found in scope.');
};
Scope.prototype.has = function has(name) {
  if (this.bindings[name]) {
    return true;
  }
  return this.parent ? this.parent.has(name) : false;
};

var NullType = {kind: 'null'};
var NumberType = {kind: 'number'};
var StringType = {kind: 'string'};
var BooleanType = {kind: 'boolean'};
var ColorType = {kind: 'color'};
var ObjectType = {kind: 'object'};
var ValueType = {kind: 'value'};
var ErrorType = {kind: 'error'};
var CollatorType = {kind: 'collator'};
var FormattedType = {kind: 'formatted'};
var ResolvedImageType = {kind: 'resolvedImage'};

function array(itemType, N) {
  return {
    kind: 'array',
    itemType: itemType,
    N: N
  };
}

function toString$1(type) {
  if (type.kind === 'array') {
    var itemType = toString$1(type.itemType);
    return typeof type.N === 'number' ? 'array<' + itemType + ', ' + type.N + '>' : type.itemType.kind === 'value' ? 'array' : 'array<' + itemType + '>';
  } else {
    return type.kind;
  }
}

var valueMemberTypes = [
  NullType,
  NumberType,
  StringType,
  BooleanType,
  ColorType,
  FormattedType,
  ObjectType,
  array(ValueType),
  ResolvedImageType
];

function checkSubtype(expected, t) {
  if (t.kind === 'error') {
    return null;
  } else if (expected.kind === 'array') {
    if (t.kind === 'array' && (t.N === 0 && t.itemType.kind === 'value' || !checkSubtype(expected.itemType, t.itemType)) && (typeof expected.N !== 'number' || expected.N === t.N)) {
      return null;
    }
  } else if (expected.kind === t.kind) {
    return null;
  } else if (expected.kind === 'value') {
    for (var i = 0, list = valueMemberTypes; i < list.length; i += 1) {
      var memberType = list[i];
      if (!checkSubtype(memberType, t)) {
        return null;
      }
    }
  }
  return 'Expected ' + toString$1(expected) + ' but found ' + toString$1(t) + ' instead.';
}

function isValidType(provided, allowedTypes) {
  return allowedTypes.some(function (t) {
    return t.kind === provided.kind;
  });
}

function isValidNativeType(provided, allowedTypes) {
  return allowedTypes.some(function (t) {
    if (t === 'null') {
      return provided === null;
    } else if (t === 'array') {
      return Array.isArray(provided);
    } else if (t === 'object') {
      return provided && !Array.isArray(provided) && typeof provided === 'object';
    } else {
      return t === typeof provided;
    }
  });
}

var csscolorparser = createCommonjsModule(function (module, exports) {
// (c) Dean McNamee <dean@gmail.com>, 2012.
//
// https://github.com/deanm/css-color-parser-js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

// http://www.w3.org/TR/css3-color/
  var kCSSColorTable = {
    "transparent": [0, 0, 0, 0], "aliceblue": [240, 248, 255, 1],
    "antiquewhite": [250, 235, 215, 1], "aqua": [0, 255, 255, 1],
    "aquamarine": [127, 255, 212, 1], "azure": [240, 255, 255, 1],
    "beige": [245, 245, 220, 1], "bisque": [255, 228, 196, 1],
    "black": [0, 0, 0, 1], "blanchedalmond": [255, 235, 205, 1],
    "blue": [0, 0, 255, 1], "blueviolet": [138, 43, 226, 1],
    "brown": [165, 42, 42, 1], "burlywood": [222, 184, 135, 1],
    "cadetblue": [95, 158, 160, 1], "chartreuse": [127, 255, 0, 1],
    "chocolate": [210, 105, 30, 1], "coral": [255, 127, 80, 1],
    "cornflowerblue": [100, 149, 237, 1], "cornsilk": [255, 248, 220, 1],
    "crimson": [220, 20, 60, 1], "cyan": [0, 255, 255, 1],
    "darkblue": [0, 0, 139, 1], "darkcyan": [0, 139, 139, 1],
    "darkgoldenrod": [184, 134, 11, 1], "darkgray": [169, 169, 169, 1],
    "darkgreen": [0, 100, 0, 1], "darkgrey": [169, 169, 169, 1],
    "darkkhaki": [189, 183, 107, 1], "darkmagenta": [139, 0, 139, 1],
    "darkolivegreen": [85, 107, 47, 1], "darkorange": [255, 140, 0, 1],
    "darkorchid": [153, 50, 204, 1], "darkred": [139, 0, 0, 1],
    "darksalmon": [233, 150, 122, 1], "darkseagreen": [143, 188, 143, 1],
    "darkslateblue": [72, 61, 139, 1], "darkslategray": [47, 79, 79, 1],
    "darkslategrey": [47, 79, 79, 1], "darkturquoise": [0, 206, 209, 1],
    "darkviolet": [148, 0, 211, 1], "deeppink": [255, 20, 147, 1],
    "deepskyblue": [0, 191, 255, 1], "dimgray": [105, 105, 105, 1],
    "dimgrey": [105, 105, 105, 1], "dodgerblue": [30, 144, 255, 1],
    "firebrick": [178, 34, 34, 1], "floralwhite": [255, 250, 240, 1],
    "forestgreen": [34, 139, 34, 1], "fuchsia": [255, 0, 255, 1],
    "gainsboro": [220, 220, 220, 1], "ghostwhite": [248, 248, 255, 1],
    "gold": [255, 215, 0, 1], "goldenrod": [218, 165, 32, 1],
    "gray": [128, 128, 128, 1], "green": [0, 128, 0, 1],
    "greenyellow": [173, 255, 47, 1], "grey": [128, 128, 128, 1],
    "honeydew": [240, 255, 240, 1], "hotpink": [255, 105, 180, 1],
    "indianred": [205, 92, 92, 1], "indigo": [75, 0, 130, 1],
    "ivory": [255, 255, 240, 1], "khaki": [240, 230, 140, 1],
    "lavender": [230, 230, 250, 1], "lavenderblush": [255, 240, 245, 1],
    "lawngreen": [124, 252, 0, 1], "lemonchiffon": [255, 250, 205, 1],
    "lightblue": [173, 216, 230, 1], "lightcoral": [240, 128, 128, 1],
    "lightcyan": [224, 255, 255, 1], "lightgoldenrodyellow": [250, 250, 210, 1],
    "lightgray": [211, 211, 211, 1], "lightgreen": [144, 238, 144, 1],
    "lightgrey": [211, 211, 211, 1], "lightpink": [255, 182, 193, 1],
    "lightsalmon": [255, 160, 122, 1], "lightseagreen": [32, 178, 170, 1],
    "lightskyblue": [135, 206, 250, 1], "lightslategray": [119, 136, 153, 1],
    "lightslategrey": [119, 136, 153, 1], "lightsteelblue": [176, 196, 222, 1],
    "lightyellow": [255, 255, 224, 1], "lime": [0, 255, 0, 1],
    "limegreen": [50, 205, 50, 1], "linen": [250, 240, 230, 1],
    "magenta": [255, 0, 255, 1], "maroon": [128, 0, 0, 1],
    "mediumaquamarine": [102, 205, 170, 1], "mediumblue": [0, 0, 205, 1],
    "mediumorchid": [186, 85, 211, 1], "mediumpurple": [147, 112, 219, 1],
    "mediumseagreen": [60, 179, 113, 1], "mediumslateblue": [123, 104, 238, 1],
    "mediumspringgreen": [0, 250, 154, 1], "mediumturquoise": [72, 209, 204, 1],
    "mediumvioletred": [199, 21, 133, 1], "midnightblue": [25, 25, 112, 1],
    "mintcream": [245, 255, 250, 1], "mistyrose": [255, 228, 225, 1],
    "moccasin": [255, 228, 181, 1], "navajowhite": [255, 222, 173, 1],
    "navy": [0, 0, 128, 1], "oldlace": [253, 245, 230, 1],
    "olive": [128, 128, 0, 1], "olivedrab": [107, 142, 35, 1],
    "orange": [255, 165, 0, 1], "orangered": [255, 69, 0, 1],
    "orchid": [218, 112, 214, 1], "palegoldenrod": [238, 232, 170, 1],
    "palegreen": [152, 251, 152, 1], "paleturquoise": [175, 238, 238, 1],
    "palevioletred": [219, 112, 147, 1], "papayawhip": [255, 239, 213, 1],
    "peachpuff": [255, 218, 185, 1], "peru": [205, 133, 63, 1],
    "pink": [255, 192, 203, 1], "plum": [221, 160, 221, 1],
    "powderblue": [176, 224, 230, 1], "purple": [128, 0, 128, 1],
    "rebeccapurple": [102, 51, 153, 1],
    "red": [255, 0, 0, 1], "rosybrown": [188, 143, 143, 1],
    "royalblue": [65, 105, 225, 1], "saddlebrown": [139, 69, 19, 1],
    "salmon": [250, 128, 114, 1], "sandybrown": [244, 164, 96, 1],
    "seagreen": [46, 139, 87, 1], "seashell": [255, 245, 238, 1],
    "sienna": [160, 82, 45, 1], "silver": [192, 192, 192, 1],
    "skyblue": [135, 206, 235, 1], "slateblue": [106, 90, 205, 1],
    "slategray": [112, 128, 144, 1], "slategrey": [112, 128, 144, 1],
    "snow": [255, 250, 250, 1], "springgreen": [0, 255, 127, 1],
    "steelblue": [70, 130, 180, 1], "tan": [210, 180, 140, 1],
    "teal": [0, 128, 128, 1], "thistle": [216, 191, 216, 1],
    "tomato": [255, 99, 71, 1], "turquoise": [64, 224, 208, 1],
    "violet": [238, 130, 238, 1], "wheat": [245, 222, 179, 1],
    "white": [255, 255, 255, 1], "whitesmoke": [245, 245, 245, 1],
    "yellow": [255, 255, 0, 1], "yellowgreen": [154, 205, 50, 1]
  };

  function clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
  }

  function clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
  }

  function parse_css_int(str) {  // int or percentage.
    if (str[str.length - 1] === '%') {
      return clamp_css_byte(parseFloat(str) / 100 * 255);
    }
    return clamp_css_byte(parseInt(str));
  }

  function parse_css_float(str) {  // float or percentage.
    if (str[str.length - 1] === '%') {
      return clamp_css_float(parseFloat(str) / 100);
    }
    return clamp_css_float(parseFloat(str));
  }

  function css_hue_to_rgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }

    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
      return m2;
    }
    if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  }

  function parseCSSColor(css_str) {
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = css_str.replace(/ /g, '').toLowerCase();

    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable) {
      return kCSSColorTable[str].slice();
    }  // dup.

    // #abc and #abc123 syntax.
    if (str[0] === '#') {
      if (str.length === 4) {
        var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
        if (!(iv >= 0 && iv <= 0xfff)) {
          return null;
        }  // Covers NaN.
        return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
          (iv & 0xf0) | ((iv & 0xf0) >> 4),
          (iv & 0xf) | ((iv & 0xf) << 4),
          1];
      } else if (str.length === 7) {
        var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
        if (!(iv >= 0 && iv <= 0xffffff)) {
          return null;
        }  // Covers NaN.
        return [(iv & 0xff0000) >> 16,
          (iv & 0xff00) >> 8,
          iv & 0xff,
          1];
      }

      return null;
    }

    var op = str.indexOf('('), ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === str.length) {
      var fname = str.substr(0, op);
      var params = str.substr(op + 1, ep - (op + 1)).split(',');
      var alpha = 1;  // To allow case fallthrough.
      switch (fname) {
        case 'rgba':
          if (params.length !== 4) {
            return null;
          }
          alpha = parse_css_float(params.pop());
        // Fall through.
        case 'rgb':
          if (params.length !== 3) {
            return null;
          }
          return [parse_css_int(params[0]),
            parse_css_int(params[1]),
            parse_css_int(params[2]),
            alpha];
        case 'hsla':
          if (params.length !== 4) {
            return null;
          }
          alpha = parse_css_float(params.pop());
        // Fall through.
        case 'hsl':
          if (params.length !== 3) {
            return null;
          }
          var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
          // NOTE(deanm): According to the CSS spec s/l should only be
          // percentages, but we don't bother and let float or percentage.
          var s = parse_css_float(params[1]);
          var l = parse_css_float(params[2]);
          var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          var m1 = l * 2 - m2;
          return [clamp_css_byte(css_hue_to_rgb(m1, m2, h + 1 / 3) * 255),
            clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
            clamp_css_byte(css_hue_to_rgb(m1, m2, h - 1 / 3) * 255),
            alpha];
        default:
          return null;
      }
    }

    return null;
  }

  try {
    exports.parseCSSColor = parseCSSColor;
  } catch (e) {
  }
});
var csscolorparser_1 = csscolorparser.parseCSSColor;

var Color = function Color(r, g, b, a) {
  if (a === void 0) {
    a = 1;
  }
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};
Color.parse = function parse(input) {
  if (!input) {
    return undefined;
  }
  if (input instanceof Color) {
    return input;
  }
  if (typeof input !== 'string') {
    return undefined;
  }
  var rgba = csscolorparser_1(input);
  if (!rgba) {
    return undefined;
  }
  return new Color(rgba[0] / 255 * rgba[3], rgba[1] / 255 * rgba[3], rgba[2] / 255 * rgba[3], rgba[3]);
};
Color.prototype.toString = function toString() {
  var ref = this.toArray();
  var r = ref[0];
  var g = ref[1];
  var b = ref[2];
  var a = ref[3];
  return 'rgba(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ',' + a + ')';
};
Color.prototype.toArray = function toArray() {
  var ref = this;
  var r = ref.r;
  var g = ref.g;
  var b = ref.b;
  var a = ref.a;
  return a === 0 ? [
    0,
    0,
    0,
    0
  ] : [
    r * 255 / a,
    g * 255 / a,
    b * 255 / a,
    a
  ];
};
Color.black = new Color(0, 0, 0, 1);
Color.white = new Color(1, 1, 1, 1);
Color.transparent = new Color(0, 0, 0, 0);
Color.red = new Color(1, 0, 0, 1);

var Collator = function Collator(caseSensitive, diacriticSensitive, locale) {
  if (caseSensitive) {
    this.sensitivity = diacriticSensitive ? 'variant' : 'case';
  } else {
    this.sensitivity = diacriticSensitive ? 'accent' : 'base';
  }
  this.locale = locale;
  this.collator = new Intl.Collator(this.locale ? this.locale : [], {
    sensitivity: this.sensitivity,
    usage: 'search'
  });
};
Collator.prototype.compare = function compare(lhs, rhs) {
  return this.collator.compare(lhs, rhs);
};
Collator.prototype.resolvedLocale = function resolvedLocale() {
  return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
};

var FormattedSection = function FormattedSection(text, image, scale, fontStack, textColor) {
  this.text = text;
  this.image = image;
  this.scale = scale;
  this.fontStack = fontStack;
  this.textColor = textColor;
};
var Formatted = function Formatted(sections) {
  this.sections = sections;
};
Formatted.fromString = function fromString(unformatted) {
  return new Formatted([new FormattedSection(unformatted, null, null, null, null)]);
};
Formatted.prototype.isEmpty = function isEmpty() {
  if (this.sections.length === 0) {
    return true;
  }
  return !this.sections.some(function (section) {
    return section.text.length !== 0 || section.image && section.image.name.length !== 0;
  });
};
Formatted.factory = function factory(text) {
  if (text instanceof Formatted) {
    return text;
  } else {
    return Formatted.fromString(text);
  }
};
Formatted.prototype.toString = function toString() {
  if (this.sections.length === 0) {
    return '';
  }
  return this.sections.map(function (section) {
    return section.text;
  }).join('');
};
Formatted.prototype.serialize = function serialize() {
  var serialized = ['format'];
  for (var i = 0, list = this.sections; i < list.length; i += 1) {
    var section = list[i];
    if (section.image) {
      serialized.push([
        'image',
        section.image.name
      ]);
      continue;
    }
    serialized.push(section.text);
    var options = {};
    if (section.fontStack) {
      options['text-font'] = [
        'literal',
        section.fontStack.split(',')
      ];
    }
    if (section.scale) {
      options['font-scale'] = section.scale;
    }
    if (section.textColor) {
      options['text-color'] = ['rgba'].concat(section.textColor.toArray());
    }
    serialized.push(options);
  }
  return serialized;
};

var ResolvedImage = function ResolvedImage(options) {
  this.name = options.name;
  this.available = options.available;
};
ResolvedImage.prototype.toString = function toString() {
  return this.name;
};
ResolvedImage.fromString = function fromString(name) {
  if (!name) {
    return null;
  }
  return new ResolvedImage({
    name: name,
    available: false
  });
};
ResolvedImage.prototype.serialize = function serialize() {
  return [
    'image',
    this.name
  ];
};

function validateRGBA(r, g, b, a) {
  if (!(typeof r === 'number' && r >= 0 && r <= 255 && typeof g === 'number' && g >= 0 && g <= 255 && typeof b === 'number' && b >= 0 && b <= 255)) {
    var value = typeof a === 'number' ? [
      r,
      g,
      b,
      a
    ] : [
      r,
      g,
      b
    ];
    return 'Invalid rgba value [' + value.join(', ') + ']: \'r\', \'g\', and \'b\' must be between 0 and 255.';
  }
  if (!(typeof a === 'undefined' || typeof a === 'number' && a >= 0 && a <= 1)) {
    return 'Invalid rgba value [' + [
      r,
      g,
      b,
      a
    ].join(', ') + ']: \'a\' must be between 0 and 1.';
  }
  return null;
}

function isValue(mixed) {
  if (mixed === null) {
    return true;
  } else if (typeof mixed === 'string') {
    return true;
  } else if (typeof mixed === 'boolean') {
    return true;
  } else if (typeof mixed === 'number') {
    return true;
  } else if (mixed instanceof Color) {
    return true;
  } else if (mixed instanceof Collator) {
    return true;
  } else if (mixed instanceof Formatted) {
    return true;
  } else if (mixed instanceof ResolvedImage) {
    return true;
  } else if (Array.isArray(mixed)) {
    for (var i = 0, list = mixed; i < list.length; i += 1) {
      var item = list[i];
      if (!isValue(item)) {
        return false;
      }
    }
    return true;
  } else if (typeof mixed === 'object') {
    for (var key in mixed) {
      if (!isValue(mixed[key])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

function typeOf(value) {
  if (value === null) {
    return NullType;
  } else if (typeof value === 'string') {
    return StringType;
  } else if (typeof value === 'boolean') {
    return BooleanType;
  } else if (typeof value === 'number') {
    return NumberType;
  } else if (value instanceof Color) {
    return ColorType;
  } else if (value instanceof Collator) {
    return CollatorType;
  } else if (value instanceof Formatted) {
    return FormattedType;
  } else if (value instanceof ResolvedImage) {
    return ResolvedImageType;
  } else if (Array.isArray(value)) {
    var length = value.length;
    var itemType;
    for (var i = 0, list = value; i < list.length; i += 1) {
      var item = list[i];
      var t = typeOf(item);
      if (!itemType) {
        itemType = t;
      } else if (itemType === t) {
        continue;
      } else {
        itemType = ValueType;
        break;
      }
    }
    return array(itemType || ValueType, length);
  } else {
    return ObjectType;
  }
}

function toString$1$1(value) {
  var type = typeof value;
  if (value === null) {
    return '';
  } else if (type === 'string' || type === 'number' || type === 'boolean') {
    return String(value);
  } else if (value instanceof Color || value instanceof Formatted || value instanceof ResolvedImage) {
    return value.toString();
  } else {
    return JSON.stringify(value);
  }
}

var Literal = function Literal(type, value) {
  this.type = type;
  this.value = value;
};
Literal.parse = function parse(args, context) {
  if (args.length !== 2) {
    return context.error('\'literal\' expression requires exactly one argument, but found ' + (args.length - 1) + ' instead.');
  }
  if (!isValue(args[1])) {
    return context.error('invalid value');
  }
  var value = args[1];
  var type = typeOf(value);
  var expected = context.expectedType;
  if (type.kind === 'array' && type.N === 0 && expected && expected.kind === 'array' && (typeof expected.N !== 'number' || expected.N === 0)) {
    type = expected;
  }
  return new Literal(type, value);
};
Literal.prototype.evaluate = function evaluate() {
  return this.value;
};
Literal.prototype.eachChild = function eachChild() {
};
Literal.prototype.outputDefined = function outputDefined() {
  return true;
};
Literal.prototype.serialize = function serialize() {
  if (this.type.kind === 'array' || this.type.kind === 'object') {
    return [
      'literal',
      this.value
    ];
  } else if (this.value instanceof Color) {
    return ['rgba'].concat(this.value.toArray());
  } else if (this.value instanceof Formatted) {
    return this.value.serialize();
  } else {
    return this.value;
  }
};

var RuntimeError = function RuntimeError(message) {
  this.name = 'ExpressionEvaluationError';
  this.message = message;
};
RuntimeError.prototype.toJSON = function toJSON() {
  return this.message;
};

var types = {
  string: StringType,
  number: NumberType,
  boolean: BooleanType,
  object: ObjectType
};
var Assertion = function Assertion(type, args) {
  this.type = type;
  this.args = args;
};
Assertion.parse = function parse(args, context) {
  if (args.length < 2) {
    return context.error('Expected at least one argument.');
  }
  var i = 1;
  var type;
  var name = args[0];
  if (name === 'array') {
    var itemType;
    if (args.length > 2) {
      var type$1 = args[1];
      if (typeof type$1 !== 'string' || !(type$1 in types) || type$1 === 'object') {
        return context.error('The item type argument of "array" must be one of string, number, boolean', 1);
      }
      itemType = types[type$1];
      i++;
    } else {
      itemType = ValueType;
    }
    var N;
    if (args.length > 3) {
      if (args[2] !== null && (typeof args[2] !== 'number' || args[2] < 0 || args[2] !== Math.floor(args[2]))) {
        return context.error('The length argument to "array" must be a positive integer literal', 2);
      }
      N = args[2];
      i++;
    }
    type = array(itemType, N);
  } else {
    type = types[name];
  }
  var parsed = [];
  for (; i < args.length; i++) {
    var input = context.parse(args[i], i, ValueType);
    if (!input) {
      return null;
    }
    parsed.push(input);
  }
  return new Assertion(type, parsed);
};
Assertion.prototype.evaluate = function evaluate(ctx) {
  for (var i = 0; i < this.args.length; i++) {
    var value = this.args[i].evaluate(ctx);
    var error = checkSubtype(this.type, typeOf(value));
    if (!error) {
      return value;
    } else if (i === this.args.length - 1) {
      throw new RuntimeError('Expected value to be of type ' + toString$1(this.type) + ', but found ' + toString$1(typeOf(value)) + ' instead.');
    }
  }
  return null;
};
Assertion.prototype.eachChild = function eachChild(fn) {
  this.args.forEach(fn);
};
Assertion.prototype.outputDefined = function outputDefined() {
  return this.args.every(function (arg) {
    return arg.outputDefined();
  });
};
Assertion.prototype.serialize = function serialize() {
  var type = this.type;
  var serialized = [type.kind];
  if (type.kind === 'array') {
    var itemType = type.itemType;
    if (itemType.kind === 'string' || itemType.kind === 'number' || itemType.kind === 'boolean') {
      serialized.push(itemType.kind);
      var N = type.N;
      if (typeof N === 'number' || this.args.length > 1) {
        serialized.push(N);
      }
    }
  }
  return serialized.concat(this.args.map(function (arg) {
    return arg.serialize();
  }));
};

var FormatExpression = function FormatExpression(sections) {
  this.type = FormattedType;
  this.sections = sections;
};
FormatExpression.parse = function parse(args, context) {
  if (args.length < 2) {
    return context.error('Expected at least one argument.');
  }
  var firstArg = args[1];
  if (!Array.isArray(firstArg) && typeof firstArg === 'object') {
    return context.error('First argument must be an image or text section.');
  }
  var sections = [];
  var nextTokenMayBeObject = false;
  for (var i = 1; i <= args.length - 1; ++i) {
    var arg = args[i];
    if (nextTokenMayBeObject && typeof arg === 'object' && !Array.isArray(arg)) {
      nextTokenMayBeObject = false;
      var scale = null;
      if (arg['font-scale']) {
        scale = context.parse(arg['font-scale'], 1, NumberType);
        if (!scale) {
          return null;
        }
      }
      var font = null;
      if (arg['text-font']) {
        font = context.parse(arg['text-font'], 1, array(StringType));
        if (!font) {
          return null;
        }
      }
      var textColor = null;
      if (arg['text-color']) {
        textColor = context.parse(arg['text-color'], 1, ColorType);
        if (!textColor) {
          return null;
        }
      }
      var lastExpression = sections[sections.length - 1];
      lastExpression.scale = scale;
      lastExpression.font = font;
      lastExpression.textColor = textColor;
    } else {
      var content = context.parse(args[i], 1, ValueType);
      if (!content) {
        return null;
      }
      var kind = content.type.kind;
      if (kind !== 'string' && kind !== 'value' && kind !== 'null' && kind !== 'resolvedImage') {
        return context.error('Formatted text type must be \'string\', \'value\', \'image\' or \'null\'.');
      }
      nextTokenMayBeObject = true;
      sections.push({
        content: content,
        scale: null,
        font: null,
        textColor: null
      });
    }
  }
  return new FormatExpression(sections);
};
FormatExpression.prototype.evaluate = function evaluate(ctx) {
  var evaluateSection = function (section) {
    var evaluatedContent = section.content.evaluate(ctx);
    if (typeOf(evaluatedContent) === ResolvedImageType) {
      return new FormattedSection('', evaluatedContent, null, null, null);
    }
    return new FormattedSection(toString$1$1(evaluatedContent), null, section.scale ? section.scale.evaluate(ctx) : null, section.font ? section.font.evaluate(ctx).join(',') : null, section.textColor ? section.textColor.evaluate(ctx) : null);
  };
  return new Formatted(this.sections.map(evaluateSection));
};
FormatExpression.prototype.eachChild = function eachChild(fn) {
  for (var i = 0, list = this.sections; i < list.length; i += 1) {
    var section = list[i];
    fn(section.content);
    if (section.scale) {
      fn(section.scale);
    }
    if (section.font) {
      fn(section.font);
    }
    if (section.textColor) {
      fn(section.textColor);
    }
  }
};
FormatExpression.prototype.outputDefined = function outputDefined() {
  return false;
};
FormatExpression.prototype.serialize = function serialize() {
  var serialized = ['format'];
  for (var i = 0, list = this.sections; i < list.length; i += 1) {
    var section = list[i];
    serialized.push(section.content.serialize());
    var options = {};
    if (section.scale) {
      options['font-scale'] = section.scale.serialize();
    }
    if (section.font) {
      options['text-font'] = section.font.serialize();
    }
    if (section.textColor) {
      options['text-color'] = section.textColor.serialize();
    }
    serialized.push(options);
  }
  return serialized;
};

var ImageExpression = function ImageExpression(input) {
  this.type = ResolvedImageType;
  this.input = input;
};
ImageExpression.parse = function parse(args, context) {
  if (args.length !== 2) {
    return context.error('Expected two arguments.');
  }
  var name = context.parse(args[1], 1, StringType);
  if (!name) {
    return context.error('No image name provided.');
  }
  return new ImageExpression(name);
};
ImageExpression.prototype.evaluate = function evaluate(ctx) {
  var evaluatedImageName = this.input.evaluate(ctx);
  var value = ResolvedImage.fromString(evaluatedImageName);
  if (value && ctx.availableImages) {
    value.available = ctx.availableImages.indexOf(evaluatedImageName) > -1;
  }
  return value;
};
ImageExpression.prototype.eachChild = function eachChild(fn) {
  fn(this.input);
};
ImageExpression.prototype.outputDefined = function outputDefined() {
  return false;
};
ImageExpression.prototype.serialize = function serialize() {
  return [
    'image',
    this.input.serialize()
  ];
};

var types$1 = {
  'to-boolean': BooleanType,
  'to-color': ColorType,
  'to-number': NumberType,
  'to-string': StringType
};
var Coercion = function Coercion(type, args) {
  this.type = type;
  this.args = args;
};
Coercion.parse = function parse(args, context) {
  if (args.length < 2) {
    return context.error('Expected at least one argument.');
  }
  var name = args[0];
  if ((name === 'to-boolean' || name === 'to-string') && args.length !== 2) {
    return context.error('Expected one argument.');
  }
  var type = types$1[name];
  var parsed = [];
  for (var i = 1; i < args.length; i++) {
    var input = context.parse(args[i], i, ValueType);
    if (!input) {
      return null;
    }
    parsed.push(input);
  }
  return new Coercion(type, parsed);
};
Coercion.prototype.evaluate = function evaluate(ctx) {
  if (this.type.kind === 'boolean') {
    return Boolean(this.args[0].evaluate(ctx));
  } else if (this.type.kind === 'color') {
    var input;
    var error;
    for (var i = 0, list = this.args; i < list.length; i += 1) {
      var arg = list[i];
      input = arg.evaluate(ctx);
      error = null;
      if (input instanceof Color) {
        return input;
      } else if (typeof input === 'string') {
        var c = ctx.parseColor(input);
        if (c) {
          return c;
        }
      } else if (Array.isArray(input)) {
        if (input.length < 3 || input.length > 4) {
          error = 'Invalid rbga value ' + JSON.stringify(input) + ': expected an array containing either three or four numeric values.';
        } else {
          error = validateRGBA(input[0], input[1], input[2], input[3]);
        }
        if (!error) {
          return new Color(input[0] / 255, input[1] / 255, input[2] / 255, input[3]);
        }
      }
    }
    throw new RuntimeError(error || 'Could not parse color from value \'' + (typeof input === 'string' ? input : String(JSON.stringify(input))) + '\'');
  } else if (this.type.kind === 'number') {
    var value = null;
    for (var i$1 = 0, list$1 = this.args; i$1 < list$1.length; i$1 += 1) {
      var arg$1 = list$1[i$1];
      value = arg$1.evaluate(ctx);
      if (value === null) {
        return 0;
      }
      var num = Number(value);
      if (isNaN(num)) {
        continue;
      }
      return num;
    }
    throw new RuntimeError('Could not convert ' + JSON.stringify(value) + ' to number.');
  } else if (this.type.kind === 'formatted') {
    return Formatted.fromString(toString$1$1(this.args[0].evaluate(ctx)));
  } else if (this.type.kind === 'resolvedImage') {
    return ResolvedImage.fromString(toString$1$1(this.args[0].evaluate(ctx)));
  } else {
    return toString$1$1(this.args[0].evaluate(ctx));
  }
};
Coercion.prototype.eachChild = function eachChild(fn) {
  this.args.forEach(fn);
};
Coercion.prototype.outputDefined = function outputDefined() {
  return this.args.every(function (arg) {
    return arg.outputDefined();
  });
};
Coercion.prototype.serialize = function serialize() {
  if (this.type.kind === 'formatted') {
    return new FormatExpression([{
      content: this.args[0],
      scale: null,
      font: null,
      textColor: null
    }]).serialize();
  }
  if (this.type.kind === 'resolvedImage') {
    return new ImageExpression(this.args[0]).serialize();
  }
  var serialized = ['to-' + this.type.kind];
  this.eachChild(function (child) {
    serialized.push(child.serialize());
  });
  return serialized;
};

var geometryTypes = [
  'Unknown',
  'Point',
  'LineString',
  'Polygon'
];
var EvaluationContext = function EvaluationContext() {
  this.globals = null;
  this.feature = null;
  this.featureState = null;
  this.formattedSection = null;
  this._parseColorCache = {};
  this.availableImages = null;
  this.canonical = null;
};
EvaluationContext.prototype.id = function id() {
  return this.feature && 'id' in this.feature ? this.feature.id : null;
};
EvaluationContext.prototype.geometryType = function geometryType() {
  return this.feature ? typeof this.feature.type === 'number' ? geometryTypes[this.feature.type] : this.feature.type : null;
};
EvaluationContext.prototype.geometry = function geometry() {
  return this.feature && 'geometry' in this.feature ? this.feature.geometry : null;
};
EvaluationContext.prototype.canonicalID = function canonicalID() {
  return this.canonical;
};
EvaluationContext.prototype.properties = function properties() {
  return this.feature && this.feature.properties || {};
};
EvaluationContext.prototype.parseColor = function parseColor(input) {
  var cached = this._parseColorCache[input];
  if (!cached) {
    cached = this._parseColorCache[input] = Color.parse(input);
  }
  return cached;
};

var CompoundExpression = function CompoundExpression(name, type, evaluate, args) {
  this.name = name;
  this.type = type;
  this._evaluate = evaluate;
  this.args = args;
};
CompoundExpression.prototype.evaluate = function evaluate(ctx) {
  return this._evaluate(ctx, this.args);
};
CompoundExpression.prototype.eachChild = function eachChild(fn) {
  this.args.forEach(fn);
};
CompoundExpression.prototype.outputDefined = function outputDefined() {
  return false;
};
CompoundExpression.prototype.serialize = function serialize() {
  return [this.name].concat(this.args.map(function (arg) {
    return arg.serialize();
  }));
};
CompoundExpression.parse = function parse(args, context) {
  var ref$1;
  var op = args[0];
  var definition = CompoundExpression.definitions[op];
  if (!definition) {
    return context.error('Unknown expression "' + op + '". If you wanted a literal array, use ["literal", [...]].', 0);
  }
  var type = Array.isArray(definition) ? definition[0] : definition.type;
  var availableOverloads = Array.isArray(definition) ? [[
    definition[1],
    definition[2]
  ]] : definition.overloads;
  var overloads = availableOverloads.filter(function (ref) {
    var signature = ref[0];
    return !Array.isArray(signature) || signature.length === args.length - 1;
  });
  var signatureContext = null;
  for (var i$3 = 0, list = overloads; i$3 < list.length; i$3 += 1) {
    var ref = list[i$3];
    var params = ref[0];
    var evaluate = ref[1];
    signatureContext = new ParsingContext(context.registry, context.path, null, context.scope);
    var parsedArgs = [];
    var argParseFailed = false;
    for (var i = 1; i < args.length; i++) {
      var arg = args[i];
      var expectedType = Array.isArray(params) ? params[i - 1] : params.type;
      var parsed = signatureContext.parse(arg, 1 + parsedArgs.length, expectedType);
      if (!parsed) {
        argParseFailed = true;
        break;
      }
      parsedArgs.push(parsed);
    }
    if (argParseFailed) {
      continue;
    }
    if (Array.isArray(params)) {
      if (params.length !== parsedArgs.length) {
        signatureContext.error('Expected ' + params.length + ' arguments, but found ' + parsedArgs.length + ' instead.');
        continue;
      }
    }
    for (var i$1 = 0; i$1 < parsedArgs.length; i$1++) {
      var expected = Array.isArray(params) ? params[i$1] : params.type;
      var arg$1 = parsedArgs[i$1];
      signatureContext.concat(i$1 + 1).checkSubtype(expected, arg$1.type);
    }
    if (signatureContext.errors.length === 0) {
      return new CompoundExpression(op, type, evaluate, parsedArgs);
    }
  }
  if (overloads.length === 1) {
    (ref$1 = context.errors).push.apply(ref$1, signatureContext.errors);
  } else {
    var expected$1 = overloads.length ? overloads : availableOverloads;
    var signatures = expected$1.map(function (ref) {
      var params = ref[0];
      return stringifySignature(params);
    }).join(' | ');
    var actualTypes = [];
    for (var i$2 = 1; i$2 < args.length; i$2++) {
      var parsed$1 = context.parse(args[i$2], 1 + actualTypes.length);
      if (!parsed$1) {
        return null;
      }
      actualTypes.push(toString$1(parsed$1.type));
    }
    context.error('Expected arguments of type ' + signatures + ', but found (' + actualTypes.join(', ') + ') instead.');
  }
  return null;
};
CompoundExpression.register = function register(registry, definitions) {
  CompoundExpression.definitions = definitions;
  for (var name in definitions) {
    registry[name] = CompoundExpression;
  }
};

function stringifySignature(signature) {
  if (Array.isArray(signature)) {
    return '(' + signature.map(toString$1).join(', ') + ')';
  } else {
    return '(' + toString$1(signature.type) + '...)';
  }
}

var CollatorExpression = function CollatorExpression(caseSensitive, diacriticSensitive, locale) {
  this.type = CollatorType;
  this.locale = locale;
  this.caseSensitive = caseSensitive;
  this.diacriticSensitive = diacriticSensitive;
};
CollatorExpression.parse = function parse(args, context) {
  if (args.length !== 2) {
    return context.error('Expected one argument.');
  }
  var options = args[1];
  if (typeof options !== 'object' || Array.isArray(options)) {
    return context.error('Collator options argument must be an object.');
  }
  var caseSensitive = context.parse(options['case-sensitive'] === undefined ? false : options['case-sensitive'], 1, BooleanType);
  if (!caseSensitive) {
    return null;
  }
  var diacriticSensitive = context.parse(options['diacritic-sensitive'] === undefined ? false : options['diacritic-sensitive'], 1, BooleanType);
  if (!diacriticSensitive) {
    return null;
  }
  var locale = null;
  if (options['locale']) {
    locale = context.parse(options['locale'], 1, StringType);
    if (!locale) {
      return null;
    }
  }
  return new CollatorExpression(caseSensitive, diacriticSensitive, locale);
};
CollatorExpression.prototype.evaluate = function evaluate(ctx) {
  return new Collator(this.caseSensitive.evaluate(ctx), this.diacriticSensitive.evaluate(ctx), this.locale ? this.locale.evaluate(ctx) : null);
};
CollatorExpression.prototype.eachChild = function eachChild(fn) {
  fn(this.caseSensitive);
  fn(this.diacriticSensitive);
  if (this.locale) {
    fn(this.locale);
  }
};
CollatorExpression.prototype.outputDefined = function outputDefined() {
  return false;
};
CollatorExpression.prototype.serialize = function serialize() {
  var options = {};
  options['case-sensitive'] = this.caseSensitive.serialize();
  options['diacritic-sensitive'] = this.diacriticSensitive.serialize();
  if (this.locale) {
    options['locale'] = this.locale.serialize();
  }
  return [
    'collator',
    options
  ];
};

var EXTENT = 8192;

function updateBBox(bbox, coord) {
  bbox[0] = Math.min(bbox[0], coord[0]);
  bbox[1] = Math.min(bbox[1], coord[1]);
  bbox[2] = Math.max(bbox[2], coord[0]);
  bbox[3] = Math.max(bbox[3], coord[1]);
}

function mercatorXfromLng(lng) {
  return (180 + lng) / 360;
}

function mercatorYfromLat(lat) {
  return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))) / 360;
}

function boxWithinBox(bbox1, bbox2) {
  if (bbox1[0] <= bbox2[0]) {
    return false;
  }
  if (bbox1[2] >= bbox2[2]) {
    return false;
  }
  if (bbox1[1] <= bbox2[1]) {
    return false;
  }
  if (bbox1[3] >= bbox2[3]) {
    return false;
  }
  return true;
}

function getTileCoordinates(p, canonical) {
  var x = mercatorXfromLng(p[0]);
  var y = mercatorYfromLat(p[1]);
  var tilesAtZoom = Math.pow(2, canonical.z);
  return [
    Math.round(x * tilesAtZoom * EXTENT),
    Math.round(y * tilesAtZoom * EXTENT)
  ];
}

function onBoundary(p, p1, p2) {
  var x1 = p[0] - p1[0];
  var y1 = p[1] - p1[1];
  var x2 = p[0] - p2[0];
  var y2 = p[1] - p2[1];
  return x1 * y2 - x2 * y1 === 0 && x1 * x2 <= 0 && y1 * y2 <= 0;
}

function rayIntersect(p, p1, p2) {
  return p1[1] > p[1] !== p2[1] > p[1] && p[0] < (p2[0] - p1[0]) * (p[1] - p1[1]) / (p2[1] - p1[1]) + p1[0];
}

function pointWithinPolygon(point, rings) {
  var inside = false;
  for (var i = 0, len = rings.length; i < len; i++) {
    var ring = rings[i];
    for (var j = 0, len2 = ring.length; j < len2 - 1; j++) {
      if (onBoundary(point, ring[j], ring[j + 1])) {
        return false;
      }
      if (rayIntersect(point, ring[j], ring[j + 1])) {
        inside = !inside;
      }
    }
  }
  return inside;
}

function pointWithinPolygons(point, polygons) {
  for (var i = 0; i < polygons.length; i++) {
    if (pointWithinPolygon(point, polygons[i])) {
      return true;
    }
  }
  return false;
}

function perp(v1, v2) {
  return v1[0] * v2[1] - v1[1] * v2[0];
}

function twoSided(p1, p2, q1, q2) {
  var x1 = p1[0] - q1[0];
  var y1 = p1[1] - q1[1];
  var x2 = p2[0] - q1[0];
  var y2 = p2[1] - q1[1];
  var x3 = q2[0] - q1[0];
  var y3 = q2[1] - q1[1];
  var det1 = x1 * y3 - x3 * y1;
  var det2 = x2 * y3 - x3 * y2;
  if (det1 > 0 && det2 < 0 || det1 < 0 && det2 > 0) {
    return true;
  }
  return false;
}

function lineIntersectLine(a, b, c, d) {
  var vectorP = [
    b[0] - a[0],
    b[1] - a[1]
  ];
  var vectorQ = [
    d[0] - c[0],
    d[1] - c[1]
  ];
  if (perp(vectorQ, vectorP) === 0) {
    return false;
  }
  if (twoSided(a, b, c, d) && twoSided(c, d, a, b)) {
    return true;
  }
  return false;
}

function lineIntersectPolygon(p1, p2, polygon) {
  for (var i = 0, list = polygon; i < list.length; i += 1) {
    var ring = list[i];
    for (var j = 0; j < ring.length - 1; ++j) {
      if (lineIntersectLine(p1, p2, ring[j], ring[j + 1])) {
        return true;
      }
    }
  }
  return false;
}

function lineStringWithinPolygon(line, polygon) {
  for (var i = 0; i < line.length; ++i) {
    if (!pointWithinPolygon(line[i], polygon)) {
      return false;
    }
  }
  for (var i$1 = 0; i$1 < line.length - 1; ++i$1) {
    if (lineIntersectPolygon(line[i$1], line[i$1 + 1], polygon)) {
      return false;
    }
  }
  return true;
}

function lineStringWithinPolygons(line, polygons) {
  for (var i = 0; i < polygons.length; i++) {
    if (lineStringWithinPolygon(line, polygons[i])) {
      return true;
    }
  }
  return false;
}

function getTilePolygon(coordinates, bbox, canonical) {
  var polygon = [];
  for (var i = 0; i < coordinates.length; i++) {
    var ring = [];
    for (var j = 0; j < coordinates[i].length; j++) {
      var coord = getTileCoordinates(coordinates[i][j], canonical);
      updateBBox(bbox, coord);
      ring.push(coord);
    }
    polygon.push(ring);
  }
  return polygon;
}

function getTilePolygons(coordinates, bbox, canonical) {
  var polygons = [];
  for (var i = 0; i < coordinates.length; i++) {
    var polygon = getTilePolygon(coordinates[i], bbox, canonical);
    polygons.push(polygon);
  }
  return polygons;
}

function updatePoint(p, bbox, polyBBox, worldSize) {
  if (p[0] < polyBBox[0] || p[0] > polyBBox[2]) {
    var halfWorldSize = worldSize * 0.5;
    var shift = p[0] - polyBBox[0] > halfWorldSize ? -worldSize : polyBBox[0] - p[0] > halfWorldSize ? worldSize : 0;
    if (shift === 0) {
      shift = p[0] - polyBBox[2] > halfWorldSize ? -worldSize : polyBBox[2] - p[0] > halfWorldSize ? worldSize : 0;
    }
    p[0] += shift;
  }
  updateBBox(bbox, p);
}

function resetBBox(bbox) {
  bbox[0] = bbox[1] = Infinity;
  bbox[2] = bbox[3] = -Infinity;
}

function getTilePoints(geometry, pointBBox, polyBBox, canonical) {
  var worldSize = Math.pow(2, canonical.z) * EXTENT;
  var shifts = [
    canonical.x * EXTENT,
    canonical.y * EXTENT
  ];
  var tilePoints = [];
  for (var i$1 = 0, list$1 = geometry; i$1 < list$1.length; i$1 += 1) {
    var points = list$1[i$1];
    for (var i = 0, list = points; i < list.length; i += 1) {
      var point = list[i];
      var p = [
        point.x + shifts[0],
        point.y + shifts[1]
      ];
      updatePoint(p, pointBBox, polyBBox, worldSize);
      tilePoints.push(p);
    }
  }
  return tilePoints;
}

function getTileLines(geometry, lineBBox, polyBBox, canonical) {
  var worldSize = Math.pow(2, canonical.z) * EXTENT;
  var shifts = [
    canonical.x * EXTENT,
    canonical.y * EXTENT
  ];
  var tileLines = [];
  for (var i$1 = 0, list$1 = geometry; i$1 < list$1.length; i$1 += 1) {
    var line = list$1[i$1];
    var tileLine = [];
    for (var i = 0, list = line; i < list.length; i += 1) {
      var point = list[i];
      var p = [
        point.x + shifts[0],
        point.y + shifts[1]
      ];
      updateBBox(lineBBox, p);
      tileLine.push(p);
    }
    tileLines.push(tileLine);
  }
  if (lineBBox[2] - lineBBox[0] <= worldSize / 2) {
    resetBBox(lineBBox);
    for (var i$3 = 0, list$3 = tileLines; i$3 < list$3.length; i$3 += 1) {
      var line$1 = list$3[i$3];
      for (var i$2 = 0, list$2 = line$1; i$2 < list$2.length; i$2 += 1) {
        var p$1 = list$2[i$2];
        updatePoint(p$1, lineBBox, polyBBox, worldSize);
      }
    }
  }
  return tileLines;
}

function pointsWithinPolygons(ctx, polygonGeometry) {
  var pointBBox = [
    Infinity,
    Infinity,
    -Infinity,
    -Infinity
  ];
  var polyBBox = [
    Infinity,
    Infinity,
    -Infinity,
    -Infinity
  ];
  var canonical = ctx.canonicalID();
  if (polygonGeometry.type === 'Polygon') {
    var tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
    var tilePoints = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
    if (!boxWithinBox(pointBBox, polyBBox)) {
      return false;
    }
    for (var i = 0, list = tilePoints; i < list.length; i += 1) {
      var point = list[i];
      if (!pointWithinPolygon(point, tilePolygon)) {
        return false;
      }
    }
  }
  if (polygonGeometry.type === 'MultiPolygon') {
    var tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
    var tilePoints$1 = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
    if (!boxWithinBox(pointBBox, polyBBox)) {
      return false;
    }
    for (var i$1 = 0, list$1 = tilePoints$1; i$1 < list$1.length; i$1 += 1) {
      var point$1 = list$1[i$1];
      if (!pointWithinPolygons(point$1, tilePolygons)) {
        return false;
      }
    }
  }
  return true;
}

function linesWithinPolygons(ctx, polygonGeometry) {
  var lineBBox = [
    Infinity,
    Infinity,
    -Infinity,
    -Infinity
  ];
  var polyBBox = [
    Infinity,
    Infinity,
    -Infinity,
    -Infinity
  ];
  var canonical = ctx.canonicalID();
  if (polygonGeometry.type === 'Polygon') {
    var tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
    var tileLines = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
    if (!boxWithinBox(lineBBox, polyBBox)) {
      return false;
    }
    for (var i = 0, list = tileLines; i < list.length; i += 1) {
      var line = list[i];
      if (!lineStringWithinPolygon(line, tilePolygon)) {
        return false;
      }
    }
  }
  if (polygonGeometry.type === 'MultiPolygon') {
    var tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
    var tileLines$1 = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
    if (!boxWithinBox(lineBBox, polyBBox)) {
      return false;
    }
    for (var i$1 = 0, list$1 = tileLines$1; i$1 < list$1.length; i$1 += 1) {
      var line$1 = list$1[i$1];
      if (!lineStringWithinPolygons(line$1, tilePolygons)) {
        return false;
      }
    }
  }
  return true;
}

var Within = function Within(geojson, geometries) {
  this.type = BooleanType;
  this.geojson = geojson;
  this.geometries = geometries;
};
Within.parse = function parse(args, context) {
  if (args.length !== 2) {
    return context.error('\'within\' expression requires exactly one argument, but found ' + (args.length - 1) + ' instead.');
  }
  if (isValue(args[1])) {
    var geojson = args[1];
    if (geojson.type === 'FeatureCollection') {
      for (var i = 0; i < geojson.features.length; ++i) {
        var type = geojson.features[i].geometry.type;
        if (type === 'Polygon' || type === 'MultiPolygon') {
          return new Within(geojson, geojson.features[i].geometry);
        }
      }
    } else if (geojson.type === 'Feature') {
      var type$1 = geojson.geometry.type;
      if (type$1 === 'Polygon' || type$1 === 'MultiPolygon') {
        return new Within(geojson, geojson.geometry);
      }
    } else if (geojson.type === 'Polygon' || geojson.type === 'MultiPolygon') {
      return new Within(geojson, geojson);
    }
  }
  return context.error('\'within\' expression requires valid geojson object that contains polygon geometry type.');
};
Within.prototype.evaluate = function evaluate(ctx) {
  if (ctx.geometry() != null && ctx.canonicalID() != null) {
    if (ctx.geometryType() === 'Point') {
      return pointsWithinPolygons(ctx, this.geometries);
    } else if (ctx.geometryType() === 'LineString') {
      return linesWithinPolygons(ctx, this.geometries);
    }
  }
  return false;
};
Within.prototype.eachChild = function eachChild() {
};
Within.prototype.outputDefined = function outputDefined() {
  return true;
};
Within.prototype.serialize = function serialize() {
  return [
    'within',
    this.geojson
  ];
};

function isFeatureConstant(e) {
  if (e instanceof CompoundExpression) {
    if (e.name === 'get' && e.args.length === 1) {
      return false;
    } else if (e.name === 'feature-state') {
      return false;
    } else if (e.name === 'has' && e.args.length === 1) {
      return false;
    } else if (e.name === 'properties' || e.name === 'geometry-type' || e.name === 'id') {
      return false;
    } else if (/^filter-/.test(e.name)) {
      return false;
    }
  }
  if (e instanceof Within) {
    return false;
  }
  var result = true;
  e.eachChild(function (arg) {
    if (result && !isFeatureConstant(arg)) {
      result = false;
    }
  });
  return result;
}

function isStateConstant(e) {
  if (e instanceof CompoundExpression) {
    if (e.name === 'feature-state') {
      return false;
    }
  }
  var result = true;
  e.eachChild(function (arg) {
    if (result && !isStateConstant(arg)) {
      result = false;
    }
  });
  return result;
}

function isGlobalPropertyConstant(e, properties) {
  if (e instanceof CompoundExpression && properties.indexOf(e.name) >= 0) {
    return false;
  }
  var result = true;
  e.eachChild(function (arg) {
    if (result && !isGlobalPropertyConstant(arg, properties)) {
      result = false;
    }
  });
  return result;
}

var Var = function Var(name, boundExpression) {
  this.type = boundExpression.type;
  this.name = name;
  this.boundExpression = boundExpression;
};
Var.parse = function parse(args, context) {
  if (args.length !== 2 || typeof args[1] !== 'string') {
    return context.error('\'var\' expression requires exactly one string literal argument.');
  }
  var name = args[1];
  if (!context.scope.has(name)) {
    return context.error('Unknown variable "' + name + '". Make sure "' + name + '" has been bound in an enclosing "let" expression before using it.', 1);
  }
  return new Var(name, context.scope.get(name));
};
Var.prototype.evaluate = function evaluate(ctx) {
  return this.boundExpression.evaluate(ctx);
};
Var.prototype.eachChild = function eachChild() {
};
Var.prototype.outputDefined = function outputDefined() {
  return false;
};
Var.prototype.serialize = function serialize() {
  return [
    'var',
    this.name
  ];
};

var ParsingContext = function ParsingContext(registry, path, expectedType, scope, errors) {
  if (path === void 0) {
    path = [];
  }
  if (scope === void 0) {
    scope = new Scope();
  }
  if (errors === void 0) {
    errors = [];
  }
  this.registry = registry;
  this.path = path;
  this.key = path.map(function (part) {
    return '[' + part + ']';
  }).join('');
  this.scope = scope;
  this.errors = errors;
  this.expectedType = expectedType;
};
ParsingContext.prototype.parse = function parse(expr, index, expectedType, bindings, options) {
  if (options === void 0) {
    options = {};
  }
  if (index) {
    return this.concat(index, expectedType, bindings)._parse(expr, options);
  }
  return this._parse(expr, options);
};
ParsingContext.prototype._parse = function _parse(expr, options) {
  if (expr === null || typeof expr === 'string' || typeof expr === 'boolean' || typeof expr === 'number') {
    expr = [
      'literal',
      expr
    ];
  }

  function annotate(parsed, type, typeAnnotation) {
    if (typeAnnotation === 'assert') {
      return new Assertion(type, [parsed]);
    } else if (typeAnnotation === 'coerce') {
      return new Coercion(type, [parsed]);
    } else {
      return parsed;
    }
  }

  if (Array.isArray(expr)) {
    if (expr.length === 0) {
      return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
    }
    var op = expr[0];
    if (typeof op !== 'string') {
      this.error('Expression name must be a string, but found ' + typeof op + ' instead. If you wanted a literal array, use ["literal", [...]].', 0);
      return null;
    }
    var Expr = this.registry[op];
    if (Expr) {
      var parsed = Expr.parse(expr, this);
      if (!parsed) {
        return null;
      }
      if (this.expectedType) {
        var expected = this.expectedType;
        var actual = parsed.type;
        if ((expected.kind === 'string' || expected.kind === 'number' || expected.kind === 'boolean' || expected.kind === 'object' || expected.kind === 'array') && actual.kind === 'value') {
          parsed = annotate(parsed, expected, options.typeAnnotation || 'assert');
        } else if ((expected.kind === 'color' || expected.kind === 'formatted' || expected.kind === 'resolvedImage') && (actual.kind === 'value' || actual.kind === 'string')) {
          parsed = annotate(parsed, expected, options.typeAnnotation || 'coerce');
        } else if (this.checkSubtype(expected, actual)) {
          return null;
        }
      }
      if (!(parsed instanceof Literal) && parsed.type.kind !== 'resolvedImage' && isConstant(parsed)) {
        var ec = new EvaluationContext();
        try {
          parsed = new Literal(parsed.type, parsed.evaluate(ec));
        } catch (e) {
          this.error(e.message);
          return null;
        }
      }
      return parsed;
    }
    return this.error('Unknown expression "' + op + '". If you wanted a literal array, use ["literal", [...]].', 0);
  } else if (typeof expr === 'undefined') {
    return this.error('\'undefined\' value invalid. Use null instead.');
  } else if (typeof expr === 'object') {
    return this.error('Bare objects invalid. Use ["literal", {...}] instead.');
  } else {
    return this.error('Expected an array, but found ' + typeof expr + ' instead.');
  }
};
ParsingContext.prototype.concat = function concat(index, expectedType, bindings) {
  var path = typeof index === 'number' ? this.path.concat(index) : this.path;
  var scope = bindings ? this.scope.concat(bindings) : this.scope;
  return new ParsingContext(this.registry, path, expectedType || null, scope, this.errors);
};
ParsingContext.prototype.error = function error(error$1) {
  var arguments$1 = arguments;

  var keys = [], len = arguments.length - 1;
  while (len-- > 0) {
    keys[len] = arguments$1[len + 1];
  }
  var key = '' + this.key + keys.map(function (k) {
    return '[' + k + ']';
  }).join('');
  this.errors.push(new ParsingError(key, error$1));
};
ParsingContext.prototype.checkSubtype = function checkSubtype$1(expected, t) {
  var error = checkSubtype(expected, t);
  if (error) {
    this.error(error);
  }
  return error;
};

function isConstant(expression) {
  if (expression instanceof Var) {
    return isConstant(expression.boundExpression);
  } else if (expression instanceof CompoundExpression && expression.name === 'error') {
    return false;
  } else if (expression instanceof CollatorExpression) {
    return false;
  } else if (expression instanceof Within) {
    return false;
  }
  var isTypeAnnotation = expression instanceof Coercion || expression instanceof Assertion;
  var childrenConstant = true;
  expression.eachChild(function (child) {
    if (isTypeAnnotation) {
      childrenConstant = childrenConstant && isConstant(child);
    } else {
      childrenConstant = childrenConstant && child instanceof Literal;
    }
  });
  if (!childrenConstant) {
    return false;
  }
  return isFeatureConstant(expression) && isGlobalPropertyConstant(expression, [
    'zoom',
    'heatmap-density',
    'line-progress',
    'accumulated',
    'is-supported-script'
  ]);
}

function findStopLessThanOrEqualTo(stops, input) {
  var lastIndex = stops.length - 1;
  var lowerIndex = 0;
  var upperIndex = lastIndex;
  var currentIndex = 0;
  var currentValue, nextValue;
  while (lowerIndex <= upperIndex) {
    currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
    currentValue = stops[currentIndex];
    nextValue = stops[currentIndex + 1];
    if (currentValue <= input) {
      if (currentIndex === lastIndex || input < nextValue) {
        return currentIndex;
      }
      lowerIndex = currentIndex + 1;
    } else if (currentValue > input) {
      upperIndex = currentIndex - 1;
    } else {
      throw new RuntimeError('Input is not a number.');
    }
  }
  return 0;
}

var Step = function Step(type, input, stops) {
  this.type = type;
  this.input = input;
  this.labels = [];
  this.outputs = [];
  for (var i = 0, list = stops; i < list.length; i += 1) {
    var ref = list[i];
    var label = ref[0];
    var expression = ref[1];
    this.labels.push(label);
    this.outputs.push(expression);
  }
};
Step.parse = function parse(args, context) {
  if (args.length - 1 < 4) {
    return context.error('Expected at least 4 arguments, but found only ' + (args.length - 1) + '.');
  }
  if ((args.length - 1) % 2 !== 0) {
    return context.error('Expected an even number of arguments.');
  }
  var input = context.parse(args[1], 1, NumberType);
  if (!input) {
    return null;
  }
  var stops = [];
  var outputType = null;
  if (context.expectedType && context.expectedType.kind !== 'value') {
    outputType = context.expectedType;
  }
  for (var i = 1; i < args.length; i += 2) {
    var label = i === 1 ? -Infinity : args[i];
    var value = args[i + 1];
    var labelKey = i;
    var valueKey = i + 1;
    if (typeof label !== 'number') {
      return context.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
    }
    if (stops.length && stops[stops.length - 1][0] >= label) {
      return context.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', labelKey);
    }
    var parsed = context.parse(value, valueKey, outputType);
    if (!parsed) {
      return null;
    }
    outputType = outputType || parsed.type;
    stops.push([
      label,
      parsed
    ]);
  }
  return new Step(outputType, input, stops);
};
Step.prototype.evaluate = function evaluate(ctx) {
  var labels = this.labels;
  var outputs = this.outputs;
  if (labels.length === 1) {
    return outputs[0].evaluate(ctx);
  }
  var value = this.input.evaluate(ctx);
  if (value <= labels[0]) {
    return outputs[0].evaluate(ctx);
  }
  var stopCount = labels.length;
  if (value >= labels[stopCount - 1]) {
    return outputs[stopCount - 1].evaluate(ctx);
  }
  var index = findStopLessThanOrEqualTo(labels, value);
  return outputs[index].evaluate(ctx);
};
Step.prototype.eachChild = function eachChild(fn) {
  fn(this.input);
  for (var i = 0, list = this.outputs; i < list.length; i += 1) {
    var expression = list[i];
    fn(expression);
  }
};
Step.prototype.outputDefined = function outputDefined() {
  return this.outputs.every(function (out) {
    return out.outputDefined();
  });
};
Step.prototype.serialize = function serialize() {
  var serialized = [
    'step',
    this.input.serialize()
  ];
  for (var i = 0; i < this.labels.length; i++) {
    if (i > 0) {
      serialized.push(this.labels[i]);
    }
    serialized.push(this.outputs[i].serialize());
  }
  return serialized;
};

/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Ported from Webkit
 * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
 */

var unitbezier = UnitBezier;

function UnitBezier(p1x, p1y, p2x, p2y) {
  // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
  this.cx = 3.0 * p1x;
  this.bx = 3.0 * (p2x - p1x) - this.cx;
  this.ax = 1.0 - this.cx - this.bx;

  this.cy = 3.0 * p1y;
  this.by = 3.0 * (p2y - p1y) - this.cy;
  this.ay = 1.0 - this.cy - this.by;

  this.p1x = p1x;
  this.p1y = p2y;
  this.p2x = p2x;
  this.p2y = p2y;
}

UnitBezier.prototype.sampleCurveX = function (t) {
  // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
  return ((this.ax * t + this.bx) * t + this.cx) * t;
};

UnitBezier.prototype.sampleCurveY = function (t) {
  return ((this.ay * t + this.by) * t + this.cy) * t;
};

UnitBezier.prototype.sampleCurveDerivativeX = function (t) {
  return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
};

UnitBezier.prototype.solveCurveX = function (x, epsilon) {
  if (typeof epsilon === 'undefined') {
    epsilon = 1e-6;
  }

  var t0, t1, t2, x2, i;

  // First try a few iterations of Newton's method -- normally very fast.
  for (t2 = x, i = 0; i < 8; i++) {

    x2 = this.sampleCurveX(t2) - x;
    if (Math.abs(x2) < epsilon) {
      return t2;
    }

    var d2 = this.sampleCurveDerivativeX(t2);
    if (Math.abs(d2) < 1e-6) {
      break;
    }

    t2 = t2 - x2 / d2;
  }

  // Fall back to the bisection method for reliability.
  t0 = 0.0;
  t1 = 1.0;
  t2 = x;

  if (t2 < t0) {
    return t0;
  }
  if (t2 > t1) {
    return t1;
  }

  while (t0 < t1) {

    x2 = this.sampleCurveX(t2);
    if (Math.abs(x2 - x) < epsilon) {
      return t2;
    }

    if (x > x2) {
      t0 = t2;
    } else {
      t1 = t2;
    }

    t2 = (t1 - t0) * 0.5 + t0;
  }

  // Failure.
  return t2;
};

UnitBezier.prototype.solve = function (x, epsilon) {
  return this.sampleCurveY(this.solveCurveX(x, epsilon));
};

function number(a, b, t) {
  return a * (1 - t) + b * t;
}

function color(from, to, t) {
  return new Color(number(from.r, to.r, t), number(from.g, to.g, t), number(from.b, to.b, t), number(from.a, to.a, t));
}

function array$1(from, to, t) {
  return from.map(function (d, i) {
    return number(d, to[i], t);
  });
}

var interpolate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  number: number,
  color: color,
  array: array$1
});

var Xn = 0.95047, Yn = 1, Zn = 1.08883, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1,
  deg2rad = Math.PI / 180, rad2deg = 180 / Math.PI;

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function xyz2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2xyz(x) {
  x /= 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function rgbToLab(rgbColor) {
  var b = rgb2xyz(rgbColor.r), a = rgb2xyz(rgbColor.g), l = rgb2xyz(rgbColor.b),
    x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
    y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.072175 * l) / Yn),
    z = xyz2lab((0.0193339 * b + 0.119192 * a + 0.9503041 * l) / Zn);
  return {
    l: 116 * y - 16,
    a: 500 * (x - y),
    b: 200 * (y - z),
    alpha: rgbColor.a
  };
}

function labToRgb(labColor) {
  var y = (labColor.l + 16) / 116, x = isNaN(labColor.a) ? y : y + labColor.a / 500,
    z = isNaN(labColor.b) ? y : y - labColor.b / 200;
  y = Yn * lab2xyz(y);
  x = Xn * lab2xyz(x);
  z = Zn * lab2xyz(z);
  return new Color(xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), xyz2rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z), xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z), labColor.alpha);
}

function interpolateLab(from, to, t) {
  return {
    l: number(from.l, to.l, t),
    a: number(from.a, to.a, t),
    b: number(from.b, to.b, t),
    alpha: number(from.alpha, to.alpha, t)
  };
}

function rgbToHcl(rgbColor) {
  var ref = rgbToLab(rgbColor);
  var l = ref.l;
  var a = ref.a;
  var b = ref.b;
  var h = Math.atan2(b, a) * rad2deg;
  return {
    h: h < 0 ? h + 360 : h,
    c: Math.sqrt(a * a + b * b),
    l: l,
    alpha: rgbColor.a
  };
}

function hclToRgb(hclColor) {
  var h = hclColor.h * deg2rad, c = hclColor.c, l = hclColor.l;
  return labToRgb({
    l: l,
    a: Math.cos(h) * c,
    b: Math.sin(h) * c,
    alpha: hclColor.alpha
  });
}

function interpolateHue(a, b, t) {
  var d = b - a;
  return a + t * (d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d);
}

function interpolateHcl(from, to, t) {
  return {
    h: interpolateHue(from.h, to.h, t),
    c: number(from.c, to.c, t),
    l: number(from.l, to.l, t),
    alpha: number(from.alpha, to.alpha, t)
  };
}

var lab = {
  forward: rgbToLab,
  reverse: labToRgb,
  interpolate: interpolateLab
};
var hcl = {
  forward: rgbToHcl,
  reverse: hclToRgb,
  interpolate: interpolateHcl
};

var colorSpaces = /*#__PURE__*/Object.freeze({
  __proto__: null,
  lab: lab,
  hcl: hcl
});

var Interpolate = function Interpolate(type, operator, interpolation, input, stops) {
  this.type = type;
  this.operator = operator;
  this.interpolation = interpolation;
  this.input = input;
  this.labels = [];
  this.outputs = [];
  for (var i = 0, list = stops; i < list.length; i += 1) {
    var ref = list[i];
    var label = ref[0];
    var expression = ref[1];
    this.labels.push(label);
    this.outputs.push(expression);
  }
};
Interpolate.interpolationFactor = function interpolationFactor(interpolation, input, lower, upper) {
  var t = 0;
  if (interpolation.name === 'exponential') {
    t = exponentialInterpolation(input, interpolation.base, lower, upper);
  } else if (interpolation.name === 'linear') {
    t = exponentialInterpolation(input, 1, lower, upper);
  } else if (interpolation.name === 'cubic-bezier') {
    var c = interpolation.controlPoints;
    var ub = new unitbezier(c[0], c[1], c[2], c[3]);
    t = ub.solve(exponentialInterpolation(input, 1, lower, upper));
  }
  return t;
};
Interpolate.parse = function parse(args, context) {
  var operator = args[0];
  var interpolation = args[1];
  var input = args[2];
  var rest = args.slice(3);
  if (!Array.isArray(interpolation) || interpolation.length === 0) {
    return context.error('Expected an interpolation type expression.', 1);
  }
  if (interpolation[0] === 'linear') {
    interpolation = {name: 'linear'};
  } else if (interpolation[0] === 'exponential') {
    var base = interpolation[1];
    if (typeof base !== 'number') {
      return context.error('Exponential interpolation requires a numeric base.', 1, 1);
    }
    interpolation = {
      name: 'exponential',
      base: base
    };
  } else if (interpolation[0] === 'cubic-bezier') {
    var controlPoints = interpolation.slice(1);
    if (controlPoints.length !== 4 || controlPoints.some(function (t) {
      return typeof t !== 'number' || t < 0 || t > 1;
    })) {
      return context.error('Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.', 1);
    }
    interpolation = {
      name: 'cubic-bezier',
      controlPoints: controlPoints
    };
  } else {
    return context.error('Unknown interpolation type ' + String(interpolation[0]), 1, 0);
  }
  if (args.length - 1 < 4) {
    return context.error('Expected at least 4 arguments, but found only ' + (args.length - 1) + '.');
  }
  if ((args.length - 1) % 2 !== 0) {
    return context.error('Expected an even number of arguments.');
  }
  input = context.parse(input, 2, NumberType);
  if (!input) {
    return null;
  }
  var stops = [];
  var outputType = null;
  if (operator === 'interpolate-hcl' || operator === 'interpolate-lab') {
    outputType = ColorType;
  } else if (context.expectedType && context.expectedType.kind !== 'value') {
    outputType = context.expectedType;
  }
  for (var i = 0; i < rest.length; i += 2) {
    var label = rest[i];
    var value = rest[i + 1];
    var labelKey = i + 3;
    var valueKey = i + 4;
    if (typeof label !== 'number') {
      return context.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
    }
    if (stops.length && stops[stops.length - 1][0] >= label) {
      return context.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', labelKey);
    }
    var parsed = context.parse(value, valueKey, outputType);
    if (!parsed) {
      return null;
    }
    outputType = outputType || parsed.type;
    stops.push([
      label,
      parsed
    ]);
  }
  if (outputType.kind !== 'number' && outputType.kind !== 'color' && !(outputType.kind === 'array' && outputType.itemType.kind === 'number' && typeof outputType.N === 'number')) {
    return context.error('Type ' + toString$1(outputType) + ' is not interpolatable.');
  }
  return new Interpolate(outputType, operator, interpolation, input, stops);
};
Interpolate.prototype.evaluate = function evaluate(ctx) {
  var labels = this.labels;
  var outputs = this.outputs;
  if (labels.length === 1) {
    return outputs[0].evaluate(ctx);
  }
  var value = this.input.evaluate(ctx);
  if (value <= labels[0]) {
    return outputs[0].evaluate(ctx);
  }
  var stopCount = labels.length;
  if (value >= labels[stopCount - 1]) {
    return outputs[stopCount - 1].evaluate(ctx);
  }
  var index = findStopLessThanOrEqualTo(labels, value);
  var lower = labels[index];
  var upper = labels[index + 1];
  var t = Interpolate.interpolationFactor(this.interpolation, value, lower, upper);
  var outputLower = outputs[index].evaluate(ctx);
  var outputUpper = outputs[index + 1].evaluate(ctx);
  if (this.operator === 'interpolate') {
    return interpolate[this.type.kind.toLowerCase()](outputLower, outputUpper, t);
  } else if (this.operator === 'interpolate-hcl') {
    return hcl.reverse(hcl.interpolate(hcl.forward(outputLower), hcl.forward(outputUpper), t));
  } else {
    return lab.reverse(lab.interpolate(lab.forward(outputLower), lab.forward(outputUpper), t));
  }
};
Interpolate.prototype.eachChild = function eachChild(fn) {
  fn(this.input);
  for (var i = 0, list = this.outputs; i < list.length; i += 1) {
    var expression = list[i];
    fn(expression);
  }
};
Interpolate.prototype.outputDefined = function outputDefined() {
  return this.outputs.every(function (out) {
    return out.outputDefined();
  });
};
Interpolate.prototype.serialize = function serialize() {
  var interpolation;
  if (this.interpolation.name === 'linear') {
    interpolation = ['linear'];
  } else if (this.interpolation.name === 'exponential') {
    if (this.interpolation.base === 1) {
      interpolation = ['linear'];
    } else {
      interpolation = [
        'exponential',
        this.interpolation.base
      ];
    }
  } else {
    interpolation = ['cubic-bezier'].concat(this.interpolation.controlPoints);
  }
  var serialized = [
    this.operator,
    interpolation,
    this.input.serialize()
  ];
  for (var i = 0; i < this.labels.length; i++) {
    serialized.push(this.labels[i], this.outputs[i].serialize());
  }
  return serialized;
};

function exponentialInterpolation(input, base, lowerValue, upperValue) {
  var difference = upperValue - lowerValue;
  var progress = input - lowerValue;
  if (difference === 0) {
    return 0;
  } else if (base === 1) {
    return progress / difference;
  } else {
    return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
  }
}

var Coalesce = function Coalesce(type, args) {
  this.type = type;
  this.args = args;
};
Coalesce.parse = function parse(args, context) {
  if (args.length < 2) {
    return context.error('Expectected at least one argument.');
  }
  var outputType = null;
  var expectedType = context.expectedType;
  if (expectedType && expectedType.kind !== 'value') {
    outputType = expectedType;
  }
  var parsedArgs = [];
  for (var i = 0, list = args.slice(1); i < list.length; i += 1) {
    var arg = list[i];
    var parsed = context.parse(arg, 1 + parsedArgs.length, outputType, undefined, {typeAnnotation: 'omit'});
    if (!parsed) {
      return null;
    }
    outputType = outputType || parsed.type;
    parsedArgs.push(parsed);
  }
  var needsAnnotation = expectedType && parsedArgs.some(function (arg) {
    return checkSubtype(expectedType, arg.type);
  });
  return needsAnnotation ? new Coalesce(ValueType, parsedArgs) : new Coalesce(outputType, parsedArgs);
};
Coalesce.prototype.evaluate = function evaluate(ctx) {
  var result = null;
  var argCount = 0;
  var requestedImageName;
  for (var i = 0, list = this.args; i < list.length; i += 1) {
    var arg = list[i];
    argCount++;
    result = arg.evaluate(ctx);
    if (result && result instanceof ResolvedImage && !result.available) {
      if (!requestedImageName) {
        requestedImageName = result.name;
      }
      result = null;
      if (argCount === this.args.length) {
        result = requestedImageName;
      }
    }
    if (result !== null) {
      break;
    }
  }
  return result;
};
Coalesce.prototype.eachChild = function eachChild(fn) {
  this.args.forEach(fn);
};
Coalesce.prototype.outputDefined = function outputDefined() {
  return this.args.every(function (arg) {
    return arg.outputDefined();
  });
};
Coalesce.prototype.serialize = function serialize() {
  var serialized = ['coalesce'];
  this.eachChild(function (child) {
    serialized.push(child.serialize());
  });
  return serialized;
};

var Let = function Let(bindings, result) {
  this.type = result.type;
  this.bindings = [].concat(bindings);
  this.result = result;
};
Let.prototype.evaluate = function evaluate(ctx) {
  return this.result.evaluate(ctx);
};
Let.prototype.eachChild = function eachChild(fn) {
  for (var i = 0, list = this.bindings; i < list.length; i += 1) {
    var binding = list[i];
    fn(binding[1]);
  }
  fn(this.result);
};
Let.parse = function parse(args, context) {
  if (args.length < 4) {
    return context.error('Expected at least 3 arguments, but found ' + (args.length - 1) + ' instead.');
  }
  var bindings = [];
  for (var i = 1; i < args.length - 1; i += 2) {
    var name = args[i];
    if (typeof name !== 'string') {
      return context.error('Expected string, but found ' + typeof name + ' instead.', i);
    }
    if (/[^a-zA-Z0-9_]/.test(name)) {
      return context.error('Variable names must contain only alphanumeric characters or \'_\'.', i);
    }
    var value = context.parse(args[i + 1], i + 1);
    if (!value) {
      return null;
    }
    bindings.push([
      name,
      value
    ]);
  }
  var result = context.parse(args[args.length - 1], args.length - 1, context.expectedType, bindings);
  if (!result) {
    return null;
  }
  return new Let(bindings, result);
};
Let.prototype.outputDefined = function outputDefined() {
  return this.result.outputDefined();
};
Let.prototype.serialize = function serialize() {
  var serialized = ['let'];
  for (var i = 0, list = this.bindings; i < list.length; i += 1) {
    var ref = list[i];
    var name = ref[0];
    var expr = ref[1];
    serialized.push(name, expr.serialize());
  }
  serialized.push(this.result.serialize());
  return serialized;
};

var At = function At(type, index, input) {
  this.type = type;
  this.index = index;
  this.input = input;
};
At.parse = function parse(args, context) {
  if (args.length !== 3) {
    return context.error('Expected 2 arguments, but found ' + (args.length - 1) + ' instead.');
  }
  var index = context.parse(args[1], 1, NumberType);
  var input = context.parse(args[2], 2, array(context.expectedType || ValueType));
  if (!index || !input) {
    return null;
  }
  var t = input.type;
  return new At(t.itemType, index, input);
};
At.prototype.evaluate = function evaluate(ctx) {
  var index = this.index.evaluate(ctx);
  var array = this.input.evaluate(ctx);
  if (index < 0) {
    throw new RuntimeError('Array index out of bounds: ' + index + ' < 0.');
  }
  if (index >= array.length) {
    throw new RuntimeError('Array index out of bounds: ' + index + ' > ' + (array.length - 1) + '.');
  }
  if (index !== Math.floor(index)) {
    throw new RuntimeError('Array index must be an integer, but found ' + index + ' instead.');
  }
  return array[index];
};
At.prototype.eachChild = function eachChild(fn) {
  fn(this.index);
  fn(this.input);
};
At.prototype.outputDefined = function outputDefined() {
  return false;
};
At.prototype.serialize = function serialize() {
  return [
    'at',
    this.index.serialize(),
    this.input.serialize()
  ];
};

var In = function In(needle, haystack) {
  this.type = BooleanType;
  this.needle = needle;
  this.haystack = haystack;
};
In.parse = function parse(args, context) {
  if (args.length !== 3) {
    return context.error('Expected 2 arguments, but found ' + (args.length - 1) + ' instead.');
  }
  var needle = context.parse(args[1], 1, ValueType);
  var haystack = context.parse(args[2], 2, ValueType);
  if (!needle || !haystack) {
    return null;
  }
  if (!isValidType(needle.type, [
    BooleanType,
    StringType,
    NumberType,
    NullType,
    ValueType
  ])) {
    return context.error('Expected first argument to be of type boolean, string, number or null, but found ' + toString$1(needle.type) + ' instead');
  }
  return new In(needle, haystack);
};
In.prototype.evaluate = function evaluate(ctx) {
  var needle = this.needle.evaluate(ctx);
  var haystack = this.haystack.evaluate(ctx);
  if (!haystack) {
    return false;
  }
  if (!isValidNativeType(needle, [
    'boolean',
    'string',
    'number',
    'null'
  ])) {
    throw new RuntimeError('Expected first argument to be of type boolean, string, number or null, but found ' + toString$1(typeOf(needle)) + ' instead.');
  }
  if (!isValidNativeType(haystack, [
    'string',
    'array'
  ])) {
    throw new RuntimeError('Expected second argument to be of type array or string, but found ' + toString$1(typeOf(haystack)) + ' instead.');
  }
  return haystack.indexOf(needle) >= 0;
};
In.prototype.eachChild = function eachChild(fn) {
  fn(this.needle);
  fn(this.haystack);
};
In.prototype.outputDefined = function outputDefined() {
  return true;
};
In.prototype.serialize = function serialize() {
  return [
    'in',
    this.needle.serialize(),
    this.haystack.serialize()
  ];
};

var IndexOf = function IndexOf(needle, haystack, fromIndex) {
  this.type = NumberType;
  this.needle = needle;
  this.haystack = haystack;
  this.fromIndex = fromIndex;
};
IndexOf.parse = function parse(args, context) {
  if (args.length <= 2 || args.length >= 5) {
    return context.error('Expected 3 or 4 arguments, but found ' + (args.length - 1) + ' instead.');
  }
  var needle = context.parse(args[1], 1, ValueType);
  var haystack = context.parse(args[2], 2, ValueType);
  if (!needle || !haystack) {
    return null;
  }
  if (!isValidType(needle.type, [
    BooleanType,
    StringType,
    NumberType,
    NullType,
    ValueType
  ])) {
    return context.error('Expected first argument to be of type boolean, string, number or null, but found ' + toString$1(needle.type) + ' instead');
  }
  if (args.length === 4) {
    var fromIndex = context.parse(args[3], 3, NumberType);
    if (!fromIndex) {
      return null;
    }
    return new IndexOf(needle, haystack, fromIndex);
  } else {
    return new IndexOf(needle, haystack);
  }
};
IndexOf.prototype.evaluate = function evaluate(ctx) {
  var needle = this.needle.evaluate(ctx);
  var haystack = this.haystack.evaluate(ctx);
  if (!isValidNativeType(needle, [
    'boolean',
    'string',
    'number',
    'null'
  ])) {
    throw new RuntimeError('Expected first argument to be of type boolean, string, number or null, but found ' + toString$1(typeOf(needle)) + ' instead.');
  }
  if (!isValidNativeType(haystack, [
    'string',
    'array'
  ])) {
    throw new RuntimeError('Expected second argument to be of type array or string, but found ' + toString$1(typeOf(haystack)) + ' instead.');
  }
  if (this.fromIndex) {
    var fromIndex = this.fromIndex.evaluate(ctx);
    return haystack.indexOf(needle, fromIndex);
  }
  return haystack.indexOf(needle);
};
IndexOf.prototype.eachChild = function eachChild(fn) {
  fn(this.needle);
  fn(this.haystack);
  if (this.fromIndex) {
    fn(this.fromIndex);
  }
};
IndexOf.prototype.outputDefined = function outputDefined() {
  return false;
};
IndexOf.prototype.serialize = function serialize() {
  if (this.fromIndex != null && this.fromIndex !== undefined) {
    var fromIndex = this.fromIndex.serialize();
    return [
      'index-of',
      this.needle.serialize(),
      this.haystack.serialize(),
      fromIndex
    ];
  }
  return [
    'index-of',
    this.needle.serialize(),
    this.haystack.serialize()
  ];
};

var Match = function Match(inputType, outputType, input, cases, outputs, otherwise) {
  this.inputType = inputType;
  this.type = outputType;
  this.input = input;
  this.cases = cases;
  this.outputs = outputs;
  this.otherwise = otherwise;
};
Match.parse = function parse(args, context) {
  if (args.length < 5) {
    return context.error('Expected at least 4 arguments, but found only ' + (args.length - 1) + '.');
  }
  if (args.length % 2 !== 1) {
    return context.error('Expected an even number of arguments.');
  }
  var inputType;
  var outputType;
  if (context.expectedType && context.expectedType.kind !== 'value') {
    outputType = context.expectedType;
  }
  var cases = {};
  var outputs = [];
  for (var i = 2; i < args.length - 1; i += 2) {
    var labels = args[i];
    var value = args[i + 1];
    if (!Array.isArray(labels)) {
      labels = [labels];
    }
    var labelContext = context.concat(i);
    if (labels.length === 0) {
      return labelContext.error('Expected at least one branch label.');
    }
    for (var i$1 = 0, list = labels; i$1 < list.length; i$1 += 1) {
      var label = list[i$1];
      if (typeof label !== 'number' && typeof label !== 'string') {
        return labelContext.error('Branch labels must be numbers or strings.');
      } else if (typeof label === 'number' && Math.abs(label) > Number.MAX_SAFE_INTEGER) {
        return labelContext.error('Branch labels must be integers no larger than ' + Number.MAX_SAFE_INTEGER + '.');
      } else if (typeof label === 'number' && Math.floor(label) !== label) {
        return labelContext.error('Numeric branch labels must be integer values.');
      } else if (!inputType) {
        inputType = typeOf(label);
      } else if (labelContext.checkSubtype(inputType, typeOf(label))) {
        return null;
      }
      if (typeof cases[String(label)] !== 'undefined') {
        return labelContext.error('Branch labels must be unique.');
      }
      cases[String(label)] = outputs.length;
    }
    var result = context.parse(value, i, outputType);
    if (!result) {
      return null;
    }
    outputType = outputType || result.type;
    outputs.push(result);
  }
  var input = context.parse(args[1], 1, ValueType);
  if (!input) {
    return null;
  }
  var otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
  if (!otherwise) {
    return null;
  }
  if (input.type.kind !== 'value' && context.concat(1).checkSubtype(inputType, input.type)) {
    return null;
  }
  return new Match(inputType, outputType, input, cases, outputs, otherwise);
};
Match.prototype.evaluate = function evaluate(ctx) {
  var input = this.input.evaluate(ctx);
  var output = typeOf(input) === this.inputType && this.outputs[this.cases[input]] || this.otherwise;
  return output.evaluate(ctx);
};
Match.prototype.eachChild = function eachChild(fn) {
  fn(this.input);
  this.outputs.forEach(fn);
  fn(this.otherwise);
};
Match.prototype.outputDefined = function outputDefined() {
  return this.outputs.every(function (out) {
    return out.outputDefined();
  }) && this.otherwise.outputDefined();
};
Match.prototype.serialize = function serialize() {
  var this$1 = this;
  var serialized = [
    'match',
    this.input.serialize()
  ];
  var sortedLabels = Object.keys(this.cases).sort();
  var groupedByOutput = [];
  var outputLookup = {};
  for (var i = 0, list = sortedLabels; i < list.length; i += 1) {
    var label = list[i];
    var outputIndex = outputLookup[this.cases[label]];
    if (outputIndex === undefined) {
      outputLookup[this.cases[label]] = groupedByOutput.length;
      groupedByOutput.push([
        this.cases[label],
        [label]
      ]);
    } else {
      groupedByOutput[outputIndex][1].push(label);
    }
  }
  var coerceLabel = function (label) {
    return this$1.inputType.kind === 'number' ? Number(label) : label;
  };
  for (var i$1 = 0, list$1 = groupedByOutput; i$1 < list$1.length; i$1 += 1) {
    var ref = list$1[i$1];
    var outputIndex = ref[0];
    var labels = ref[1];
    if (labels.length === 1) {
      serialized.push(coerceLabel(labels[0]));
    } else {
      serialized.push(labels.map(coerceLabel));
    }
    serialized.push(this.outputs[outputIndex$1].serialize());
  }
  serialized.push(this.otherwise.serialize());
  return serialized;
};

var Case = function Case(type, branches, otherwise) {
  this.type = type;
  this.branches = branches;
  this.otherwise = otherwise;
};
Case.parse = function parse(args, context) {
  if (args.length < 4) {
    return context.error('Expected at least 3 arguments, but found only ' + (args.length - 1) + '.');
  }
  if (args.length % 2 !== 0) {
    return context.error('Expected an odd number of arguments.');
  }
  var outputType;
  if (context.expectedType && context.expectedType.kind !== 'value') {
    outputType = context.expectedType;
  }
  var branches = [];
  for (var i = 1; i < args.length - 1; i += 2) {
    var test = context.parse(args[i], i, BooleanType);
    if (!test) {
      return null;
    }
    var result = context.parse(args[i + 1], i + 1, outputType);
    if (!result) {
      return null;
    }
    branches.push([
      test,
      result
    ]);
    outputType = outputType || result.type;
  }
  var otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
  if (!otherwise) {
    return null;
  }
  return new Case(outputType, branches, otherwise);
};
Case.prototype.evaluate = function evaluate(ctx) {
  for (var i = 0, list = this.branches; i < list.length; i += 1) {
    var ref = list[i];
    var test = ref[0];
    var expression = ref[1];
    if (test.evaluate(ctx)) {
      return expression.evaluate(ctx);
    }
  }
  return this.otherwise.evaluate(ctx);
};
Case.prototype.eachChild = function eachChild(fn) {
  for (var i = 0, list = this.branches; i < list.length; i += 1) {
    var ref = list[i];
    var test = ref[0];
    var expression = ref[1];
    fn(test);
    fn(expression);
  }
  fn(this.otherwise);
};
Case.prototype.outputDefined = function outputDefined() {
  return this.branches.every(function (ref) {
    var _ = ref[0];
    var out = ref[1];
    return out.outputDefined();
  }) && this.otherwise.outputDefined();
};
Case.prototype.serialize = function serialize() {
  var serialized = ['case'];
  this.eachChild(function (child) {
    serialized.push(child.serialize());
  });
  return serialized;
};

var Slice = function Slice(type, input, beginIndex, endIndex) {
  this.type = type;
  this.input = input;
  this.beginIndex = beginIndex;
  this.endIndex = endIndex;
};
Slice.parse = function parse(args, context) {
  if (args.length <= 2 || args.length >= 5) {
    return context.error('Expected 3 or 4 arguments, but found ' + (args.length - 1) + ' instead.');
  }
  var input = context.parse(args[1], 1, ValueType);
  var beginIndex = context.parse(args[2], 2, NumberType);
  if (!input || !beginIndex) {
    return null;
  }
  if (!isValidType(input.type, [
    array(ValueType),
    StringType,
    ValueType
  ])) {
    return context.error('Expected first argument to be of type array or string, but found ' + toString$1(input.type) + ' instead');
  }
  if (args.length === 4) {
    var endIndex = context.parse(args[3], 3, NumberType);
    if (!endIndex) {
      return null;
    }
    return new Slice(input.type, input, beginIndex, endIndex);
  } else {
    return new Slice(input.type, input, beginIndex);
  }
};
Slice.prototype.evaluate = function evaluate(ctx) {
  var input = this.input.evaluate(ctx);
  var beginIndex = this.beginIndex.evaluate(ctx);
  if (!isValidNativeType(input, [
    'string',
    'array'
  ])) {
    throw new RuntimeError('Expected first argument to be of type array or string, but found ' + toString$1(typeOf(input)) + ' instead.');
  }
  if (this.endIndex) {
    var endIndex = this.endIndex.evaluate(ctx);
    return input.slice(beginIndex, endIndex);
  }
  return input.slice(beginIndex);
};
Slice.prototype.eachChild = function eachChild(fn) {
  fn(this.input);
  fn(this.beginIndex);
  if (this.endIndex) {
    fn(this.endIndex);
  }
};
Slice.prototype.outputDefined = function outputDefined() {
  return false;
};
Slice.prototype.serialize = function serialize() {
  if (this.endIndex != null && this.endIndex !== undefined) {
    var endIndex = this.endIndex.serialize();
    return [
      'slice',
      this.input.serialize(),
      this.beginIndex.serialize(),
      endIndex
    ];
  }
  return [
    'slice',
    this.input.serialize(),
    this.beginIndex.serialize()
  ];
};

function isComparableType(op, type) {
  if (op === '==' || op === '!=') {
    return type.kind === 'boolean' || type.kind === 'string' || type.kind === 'number' || type.kind === 'null' || type.kind === 'value';
  } else {
    return type.kind === 'string' || type.kind === 'number' || type.kind === 'value';
  }
}

function eq(ctx, a, b) {
  return a === b;
}

function neq(ctx, a, b) {
  return a !== b;
}

function lt(ctx, a, b) {
  return a < b;
}

function gt(ctx, a, b) {
  return a > b;
}

function lteq(ctx, a, b) {
  return a <= b;
}

function gteq(ctx, a, b) {
  return a >= b;
}

function eqCollate(ctx, a, b, c) {
  return c.compare(a, b) === 0;
}

function neqCollate(ctx, a, b, c) {
  return !eqCollate(ctx, a, b, c);
}

function ltCollate(ctx, a, b, c) {
  return c.compare(a, b) < 0;
}

function gtCollate(ctx, a, b, c) {
  return c.compare(a, b) > 0;
}

function lteqCollate(ctx, a, b, c) {
  return c.compare(a, b) <= 0;
}

function gteqCollate(ctx, a, b, c) {
  return c.compare(a, b) >= 0;
}

function makeComparison(op, compareBasic, compareWithCollator) {
  var isOrderComparison = op !== '==' && op !== '!=';
  return function () {
    function Comparison(lhs, rhs, collator) {
      this.type = BooleanType;
      this.lhs = lhs;
      this.rhs = rhs;
      this.collator = collator;
      this.hasUntypedArgument = lhs.type.kind === 'value' || rhs.type.kind === 'value';
    }

    Comparison.parse = function parse(args, context) {
      if (args.length !== 3 && args.length !== 4) {
        return context.error('Expected two or three arguments.');
      }
      var op = args[0];
      var lhs = context.parse(args[1], 1, ValueType);
      if (!lhs) {
        return null;
      }
      if (!isComparableType(op, lhs.type)) {
        return context.concat(1).error('"' + op + '" comparisons are not supported for type \'' + toString$1(lhs.type) + '\'.');
      }
      var rhs = context.parse(args[2], 2, ValueType);
      if (!rhs) {
        return null;
      }
      if (!isComparableType(op, rhs.type)) {
        return context.concat(2).error('"' + op + '" comparisons are not supported for type \'' + toString$1(rhs.type) + '\'.');
      }
      if (lhs.type.kind !== rhs.type.kind && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
        return context.error('Cannot compare types \'' + toString$1(lhs.type) + '\' and \'' + toString$1(rhs.type) + '\'.');
      }
      if (isOrderComparison) {
        if (lhs.type.kind === 'value' && rhs.type.kind !== 'value') {
          lhs = new Assertion(rhs.type, [lhs]);
        } else if (lhs.type.kind !== 'value' && rhs.type.kind === 'value') {
          rhs = new Assertion(lhs.type, [rhs]);
        }
      }
      var collator = null;
      if (args.length === 4) {
        if (lhs.type.kind !== 'string' && rhs.type.kind !== 'string' && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
          return context.error('Cannot use collator to compare non-string types.');
        }
        collator = context.parse(args[3], 3, CollatorType);
        if (!collator) {
          return null;
        }
      }
      return new Comparison(lhs, rhs, collator);
    };
    Comparison.prototype.evaluate = function evaluate(ctx) {
      var lhs = this.lhs.evaluate(ctx);
      var rhs = this.rhs.evaluate(ctx);
      if (isOrderComparison && this.hasUntypedArgument) {
        var lt = typeOf(lhs);
        var rt = typeOf(rhs);
        if (lt.kind !== rt.kind || !(lt.kind === 'string' || lt.kind === 'number')) {
          throw new RuntimeError('Expected arguments for "' + op + '" to be (string, string) or (number, number), but found (' + lt.kind + ', ' + rt.kind + ') instead.');
        }
      }
      if (this.collator && !isOrderComparison && this.hasUntypedArgument) {
        var lt$1 = typeOf(lhs);
        var rt$1 = typeOf(rhs);
        if (lt$1.kind !== 'string' || rt$1.kind !== 'string') {
          return compareBasic(ctx, lhs, rhs);
        }
      }
      return this.collator ? compareWithCollator(ctx, lhs, rhs, this.collator.evaluate(ctx)) : compareBasic(ctx, lhs, rhs);
    };
    Comparison.prototype.eachChild = function eachChild(fn) {
      fn(this.lhs);
      fn(this.rhs);
      if (this.collator) {
        fn(this.collator);
      }
    };
    Comparison.prototype.outputDefined = function outputDefined() {
      return true;
    };
    Comparison.prototype.serialize = function serialize() {
      var serialized = [op];
      this.eachChild(function (child) {
        serialized.push(child.serialize());
      });
      return serialized;
    };
    return Comparison;
  }();
}

var Equals = makeComparison('==', eq, eqCollate);
var NotEquals = makeComparison('!=', neq, neqCollate);
var LessThan = makeComparison('<', lt, ltCollate);
var GreaterThan = makeComparison('>', gt, gtCollate);
var LessThanOrEqual = makeComparison('<=', lteq, lteqCollate);
var GreaterThanOrEqual = makeComparison('>=', gteq, gteqCollate);

var NumberFormat = function NumberFormat(number, locale, currency, minFractionDigits, maxFractionDigits) {
  this.type = StringType;
  this.number = number;
  this.locale = locale;
  this.currency = currency;
  this.minFractionDigits = minFractionDigits;
  this.maxFractionDigits = maxFractionDigits;
};
NumberFormat.parse = function parse(args, context) {
  if (args.length !== 3) {
    return context.error('Expected two arguments.');
  }
  var number = context.parse(args[1], 1, NumberType);
  if (!number) {
    return null;
  }
  var options = args[2];
  if (typeof options !== 'object' || Array.isArray(options)) {
    return context.error('NumberFormat options argument must be an object.');
  }
  var locale = null;
  if (options['locale']) {
    locale = context.parse(options['locale'], 1, StringType);
    if (!locale) {
      return null;
    }
  }
  var currency = null;
  if (options['currency']) {
    currency = context.parse(options['currency'], 1, StringType);
    if (!currency) {
      return null;
    }
  }
  var minFractionDigits = null;
  if (options['min-fraction-digits']) {
    minFractionDigits = context.parse(options['min-fraction-digits'], 1, NumberType);
    if (!minFractionDigits) {
      return null;
    }
  }
  var maxFractionDigits = null;
  if (options['max-fraction-digits']) {
    maxFractionDigits = context.parse(options['max-fraction-digits'], 1, NumberType);
    if (!maxFractionDigits) {
      return null;
    }
  }
  return new NumberFormat(number, locale, currency, minFractionDigits, maxFractionDigits);
};
NumberFormat.prototype.evaluate = function evaluate(ctx) {
  return new Intl.NumberFormat(this.locale ? this.locale.evaluate(ctx) : [], {
    style: this.currency ? 'currency' : 'decimal',
    currency: this.currency ? this.currency.evaluate(ctx) : undefined,
    minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(ctx) : undefined,
    maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(ctx) : undefined
  }).format(this.number.evaluate(ctx));
};
NumberFormat.prototype.eachChild = function eachChild(fn) {
  fn(this.number);
  if (this.locale) {
    fn(this.locale);
  }
  if (this.currency) {
    fn(this.currency);
  }
  if (this.minFractionDigits) {
    fn(this.minFractionDigits);
  }
  if (this.maxFractionDigits) {
    fn(this.maxFractionDigits);
  }
};
NumberFormat.prototype.outputDefined = function outputDefined() {
  return false;
};
NumberFormat.prototype.serialize = function serialize() {
  var options = {};
  if (this.locale) {
    options['locale'] = this.locale.serialize();
  }
  if (this.currency) {
    options['currency'] = this.currency.serialize();
  }
  if (this.minFractionDigits) {
    options['min-fraction-digits'] = this.minFractionDigits.serialize();
  }
  if (this.maxFractionDigits) {
    options['max-fraction-digits'] = this.maxFractionDigits.serialize();
  }
  return [
    'number-format',
    this.number.serialize(),
    options
  ];
};

var Length = function Length(input) {
  this.type = NumberType;
  this.input = input;
};
Length.parse = function parse(args, context) {
  if (args.length !== 2) {
    return context.error('Expected 1 argument, but found ' + (args.length - 1) + ' instead.');
  }
  var input = context.parse(args[1], 1);
  if (!input) {
    return null;
  }
  if (input.type.kind !== 'array' && input.type.kind !== 'string' && input.type.kind !== 'value') {
    return context.error('Expected argument of type string or array, but found ' + toString$1(input.type) + ' instead.');
  }
  return new Length(input);
};
Length.prototype.evaluate = function evaluate(ctx) {
  var input = this.input.evaluate(ctx);
  if (typeof input === 'string') {
    return input.length;
  } else if (Array.isArray(input)) {
    return input.length;
  } else {
    throw new RuntimeError('Expected value to be of type string or array, but found ' + toString$1(typeOf(input)) + ' instead.');
  }
};
Length.prototype.eachChild = function eachChild(fn) {
  fn(this.input);
};
Length.prototype.outputDefined = function outputDefined() {
  return false;
};
Length.prototype.serialize = function serialize() {
  var serialized = ['length'];
  this.eachChild(function (child) {
    serialized.push(child.serialize());
  });
  return serialized;
};

var expressions = {
  '==': Equals,
  '!=': NotEquals,
  '>': GreaterThan,
  '<': LessThan,
  '>=': GreaterThanOrEqual,
  '<=': LessThanOrEqual,
  'array': Assertion,
  'at': At,
  'boolean': Assertion,
  'case': Case,
  'coalesce': Coalesce,
  'collator': CollatorExpression,
  'format': FormatExpression,
  'image': ImageExpression,
  'in': In,
  'index-of': IndexOf,
  'interpolate': Interpolate,
  'interpolate-hcl': Interpolate,
  'interpolate-lab': Interpolate,
  'length': Length,
  'let': Let,
  'literal': Literal,
  'match': Match,
  'number': Assertion,
  'number-format': NumberFormat,
  'object': Assertion,
  'slice': Slice,
  'step': Step,
  'string': Assertion,
  'to-boolean': Coercion,
  'to-color': Coercion,
  'to-number': Coercion,
  'to-string': Coercion,
  'var': Var,
  'within': Within
};

function rgba(ctx, ref) {
  var r = ref[0];
  var g = ref[1];
  var b = ref[2];
  var a = ref[3];
  r = r.evaluate(ctx);
  g = g.evaluate(ctx);
  b = b.evaluate(ctx);
  var alpha = a ? a.evaluate(ctx) : 1;
  var error = validateRGBA(r, g, b, alpha);
  if (error) {
    throw new RuntimeError(error);
  }
  return new Color(r / 255 * alpha, g / 255 * alpha, b / 255 * alpha, alpha);
}

function has(key, obj) {
  return key in obj;
}

function get(key, obj) {
  var v = obj[key];
  return typeof v === 'undefined' ? null : v;
}

function binarySearch(v, a, i, j) {
  while (i <= j) {
    var m = i + j >> 1;
    if (a[m] === v) {
      return true;
    }
    if (a[m] > v) {
      j = m - 1;
    } else {
      i = m + 1;
    }
  }
  return false;
}

function varargs(type) {
  return {type: type};
}

CompoundExpression.register(expressions, {
  'error': [
    ErrorType,
    [StringType],
    function (ctx, ref) {
      var v = ref[0];
      throw new RuntimeError(v.evaluate(ctx));
    }
  ],
  'typeof': [
    StringType,
    [ValueType],
    function (ctx, ref) {
      var v = ref[0];
      return toString$1(typeOf(v.evaluate(ctx)));
    }
  ],
  'to-rgba': [
    array(NumberType, 4),
    [ColorType],
    function (ctx, ref) {
      var v = ref[0];
      return v.evaluate(ctx).toArray();
    }
  ],
  'rgb': [
    ColorType,
    [
      NumberType,
      NumberType,
      NumberType
    ],
    rgba
  ],
  'rgba': [
    ColorType,
    [
      NumberType,
      NumberType,
      NumberType,
      NumberType
    ],
    rgba
  ],
  'has': {
    type: BooleanType,
    overloads: [
      [
        [StringType],
        function (ctx, ref) {
          var key = ref[0];
          return has(key.evaluate(ctx), ctx.properties());
        }
      ],
      [
        [
          StringType,
          ObjectType
        ],
        function (ctx, ref) {
          var key = ref[0];
          var obj = ref[1];
          return has(key.evaluate(ctx), obj.evaluate(ctx));
        }
      ]
    ]
  },
  'get': {
    type: ValueType,
    overloads: [
      [
        [StringType],
        function (ctx, ref) {
          var key = ref[0];
          return get(key.evaluate(ctx), ctx.properties());
        }
      ],
      [
        [
          StringType,
          ObjectType
        ],
        function (ctx, ref) {
          var key = ref[0];
          var obj = ref[1];
          return get(key.evaluate(ctx), obj.evaluate(ctx));
        }
      ]
    ]
  },
  'feature-state': [
    ValueType,
    [StringType],
    function (ctx, ref) {
      var key = ref[0];
      return get(key.evaluate(ctx), ctx.featureState || {});
    }
  ],
  'properties': [
    ObjectType,
    [],
    function (ctx) {
      return ctx.properties();
    }
  ],
  'geometry-type': [
    StringType,
    [],
    function (ctx) {
      return ctx.geometryType();
    }
  ],
  'id': [
    ValueType,
    [],
    function (ctx) {
      return ctx.id();
    }
  ],
  'zoom': [
    NumberType,
    [],
    function (ctx) {
      return ctx.globals.zoom;
    }
  ],
  'heatmap-density': [
    NumberType,
    [],
    function (ctx) {
      return ctx.globals.heatmapDensity || 0;
    }
  ],
  'line-progress': [
    NumberType,
    [],
    function (ctx) {
      return ctx.globals.lineProgress || 0;
    }
  ],
  'accumulated': [
    ValueType,
    [],
    function (ctx) {
      return ctx.globals.accumulated === undefined ? null : ctx.globals.accumulated;
    }
  ],
  '+': [
    NumberType,
    varargs(NumberType),
    function (ctx, args) {
      var result = 0;
      for (var i = 0, list = args; i < list.length; i += 1) {
        var arg = list[i];
        result += arg.evaluate(ctx);
      }
      return result;
    }
  ],
  '*': [
    NumberType,
    varargs(NumberType),
    function (ctx, args) {
      var result = 1;
      for (var i = 0, list = args; i < list.length; i += 1) {
        var arg = list[i];
        result *= arg.evaluate(ctx);
      }
      return result;
    }
  ],
  '-': {
    type: NumberType,
    overloads: [
      [
        [
          NumberType,
          NumberType
        ],
        function (ctx, ref) {
          var a = ref[0];
          var b = ref[1];
          return a.evaluate(ctx) - b.evaluate(ctx);
        }
      ],
      [
        [NumberType],
        function (ctx, ref) {
          var a = ref[0];
          return -a.evaluate(ctx);
        }
      ]
    ]
  },
  '/': [
    NumberType,
    [
      NumberType,
      NumberType
    ],
    function (ctx, ref) {
      var a = ref[0];
      var b = ref[1];
      return a.evaluate(ctx) / b.evaluate(ctx);
    }
  ],
  '%': [
    NumberType,
    [
      NumberType,
      NumberType
    ],
    function (ctx, ref) {
      var a = ref[0];
      var b = ref[1];
      return a.evaluate(ctx) % b.evaluate(ctx);
    }
  ],
  'ln2': [
    NumberType,
    [],
    function () {
      return Math.LN2;
    }
  ],
  'pi': [
    NumberType,
    [],
    function () {
      return Math.PI;
    }
  ],
  'e': [
    NumberType,
    [],
    function () {
      return Math.E;
    }
  ],
  '^': [
    NumberType,
    [
      NumberType,
      NumberType
    ],
    function (ctx, ref) {
      var b = ref[0];
      var e = ref[1];
      return Math.pow(b.evaluate(ctx), e.evaluate(ctx));
    }
  ],
  'sqrt': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var x = ref[0];
      return Math.sqrt(x.evaluate(ctx));
    }
  ],
  'log10': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.log(n.evaluate(ctx)) / Math.LN10;
    }
  ],
  'ln': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.log(n.evaluate(ctx));
    }
  ],
  'log2': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.log(n.evaluate(ctx)) / Math.LN2;
    }
  ],
  'sin': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.sin(n.evaluate(ctx));
    }
  ],
  'cos': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.cos(n.evaluate(ctx));
    }
  ],
  'tan': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.tan(n.evaluate(ctx));
    }
  ],
  'asin': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.asin(n.evaluate(ctx));
    }
  ],
  'acos': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.acos(n.evaluate(ctx));
    }
  ],
  'atan': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.atan(n.evaluate(ctx));
    }
  ],
  'min': [
    NumberType,
    varargs(NumberType),
    function (ctx, args) {
      return Math.min.apply(Math, args.map(function (arg) {
        return arg.evaluate(ctx);
      }));
    }
  ],
  'max': [
    NumberType,
    varargs(NumberType),
    function (ctx, args) {
      return Math.max.apply(Math, args.map(function (arg) {
        return arg.evaluate(ctx);
      }));
    }
  ],
  'abs': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.abs(n.evaluate(ctx));
    }
  ],
  'round': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      var v = n.evaluate(ctx);
      return v < 0 ? -Math.round(-v) : Math.round(v);
    }
  ],
  'floor': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.floor(n.evaluate(ctx));
    }
  ],
  'ceil': [
    NumberType,
    [NumberType],
    function (ctx, ref) {
      var n = ref[0];
      return Math.ceil(n.evaluate(ctx));
    }
  ],
  'filter-==': [
    BooleanType,
    [
      StringType,
      ValueType
    ],
    function (ctx, ref) {
      var k = ref[0];
      var v = ref[1];
      return ctx.properties()[k.value] === v.value;
    }
  ],
  'filter-id-==': [
    BooleanType,
    [ValueType],
    function (ctx, ref) {
      var v = ref[0];
      return ctx.id() === v.value;
    }
  ],
  'filter-type-==': [
    BooleanType,
    [StringType],
    function (ctx, ref) {
      var v = ref[0];
      return ctx.geometryType() === v.value;
    }
  ],
  'filter-<': [
    BooleanType,
    [
      StringType,
      ValueType
    ],
    function (ctx, ref) {
      var k = ref[0];
      var v = ref[1];
      var a = ctx.properties()[k.value];
      var b = v.value;
      return typeof a === typeof b && a < b;
    }
  ],
  'filter-id-<': [
    BooleanType,
    [ValueType],
    function (ctx, ref) {
      var v = ref[0];
      var a = ctx.id();
      var b = v.value;
      return typeof a === typeof b && a < b;
    }
  ],
  'filter->': [
    BooleanType,
    [
      StringType,
      ValueType
    ],
    function (ctx, ref) {
      var k = ref[0];
      var v = ref[1];
      var a = ctx.properties()[k.value];
      var b = v.value;
      return typeof a === typeof b && a > b;
    }
  ],
  'filter-id->': [
    BooleanType,
    [ValueType],
    function (ctx, ref) {
      var v = ref[0];
      var a = ctx.id();
      var b = v.value;
      return typeof a === typeof b && a > b;
    }
  ],
  'filter-<=': [
    BooleanType,
    [
      StringType,
      ValueType
    ],
    function (ctx, ref) {
      var k = ref[0];
      var v = ref[1];
      var a = ctx.properties()[k.value];
      var b = v.value;
      return typeof a === typeof b && a <= b;
    }
  ],
  'filter-id-<=': [
    BooleanType,
    [ValueType],
    function (ctx, ref) {
      var v = ref[0];
      var a = ctx.id();
      var b = v.value;
      return typeof a === typeof b && a <= b;
    }
  ],
  'filter->=': [
    BooleanType,
    [
      StringType,
      ValueType
    ],
    function (ctx, ref) {
      var k = ref[0];
      var v = ref[1];
      var a = ctx.properties()[k.value];
      var b = v.value;
      return typeof a === typeof b && a >= b;
    }
  ],
  'filter-id->=': [
    BooleanType,
    [ValueType],
    function (ctx, ref) {
      var v = ref[0];
      var a = ctx.id();
      var b = v.value;
      return typeof a === typeof b && a >= b;
    }
  ],
  'filter-has': [
    BooleanType,
    [ValueType],
    function (ctx, ref) {
      var k = ref[0];
      return k.value in ctx.properties();
    }
  ],
  'filter-has-id': [
    BooleanType,
    [],
    function (ctx) {
      return ctx.id() !== null && ctx.id() !== undefined;
    }
  ],
  'filter-type-in': [
    BooleanType,
    [array(StringType)],
    function (ctx, ref) {
      var v = ref[0];
      return v.value.indexOf(ctx.geometryType()) >= 0;
    }
  ],
  'filter-id-in': [
    BooleanType,
    [array(ValueType)],
    function (ctx, ref) {
      var v = ref[0];
      return v.value.indexOf(ctx.id()) >= 0;
    }
  ],
  'filter-in-small': [
    BooleanType,
    [
      StringType,
      array(ValueType)
    ],
    function (ctx, ref) {
      var k = ref[0];
      var v = ref[1];
      return v.value.indexOf(ctx.properties()[k.value]) >= 0;
    }
  ],
  'filter-in-large': [
    BooleanType,
    [
      StringType,
      array(ValueType)
    ],
    function (ctx, ref) {
      var k = ref[0];
      var v = ref[1];
      return binarySearch(ctx.properties()[k.value], v.value, 0, v.value.length - 1);
    }
  ],
  'all': {
    type: BooleanType,
    overloads: [
      [
        [
          BooleanType,
          BooleanType
        ],
        function (ctx, ref) {
          var a = ref[0];
          var b = ref[1];
          return a.evaluate(ctx) && b.evaluate(ctx);
        }
      ],
      [
        varargs(BooleanType),
        function (ctx, args) {
          for (var i = 0, list = args; i < list.length; i += 1) {
            var arg = list[i];
            if (!arg.evaluate(ctx)) {
              return false;
            }
          }
          return true;
        }
      ]
    ]
  },
  'any': {
    type: BooleanType,
    overloads: [
      [
        [
          BooleanType,
          BooleanType
        ],
        function (ctx, ref) {
          var a = ref[0];
          var b = ref[1];
          return a.evaluate(ctx) || b.evaluate(ctx);
        }
      ],
      [
        varargs(BooleanType),
        function (ctx, args) {
          for (var i = 0, list = args; i < list.length; i += 1) {
            var arg = list[i];
            if (arg.evaluate(ctx)) {
              return true;
            }
          }
          return false;
        }
      ]
    ]
  },
  '!': [
    BooleanType,
    [BooleanType],
    function (ctx, ref) {
      var b = ref[0];
      return !b.evaluate(ctx);
    }
  ],
  'is-supported-script': [
    BooleanType,
    [StringType],
    function (ctx, ref) {
      var s = ref[0];
      var isSupportedScript = ctx.globals && ctx.globals.isSupportedScript;
      if (isSupportedScript) {
        return isSupportedScript(s.evaluate(ctx));
      }
      return true;
    }
  ],
  'upcase': [
    StringType,
    [StringType],
    function (ctx, ref) {
      var s = ref[0];
      return s.evaluate(ctx).toUpperCase();
    }
  ],
  'downcase': [
    StringType,
    [StringType],
    function (ctx, ref) {
      var s = ref[0];
      return s.evaluate(ctx).toLowerCase();
    }
  ],
  'concat': [
    StringType,
    varargs(ValueType),
    function (ctx, args) {
      return args.map(function (arg) {
        return toString$1$1(arg.evaluate(ctx));
      }).join('');
    }
  ],
  'resolved-locale': [
    StringType,
    [CollatorType],
    function (ctx, ref) {
      var collator = ref[0];
      return collator.evaluate(ctx).resolvedLocale();
    }
  ]
});

function success(value) {
  return {
    result: 'success',
    value: value
  };
}

function error(value) {
  return {
    result: 'error',
    value: value
  };
}

function supportsPropertyExpression(spec) {
  return spec['property-type'] === 'data-driven' || spec['property-type'] === 'cross-faded-data-driven';
}

function supportsZoomExpression(spec) {
  return !!spec.expression && spec.expression.parameters.indexOf('zoom') > -1;
}

function supportsInterpolation(spec) {
  return !!spec.expression && spec.expression.interpolated;
}

function getType(val) {
  if (val instanceof Number) {
    return 'number';
  } else if (val instanceof String) {
    return 'string';
  } else if (val instanceof Boolean) {
    return 'boolean';
  } else if (Array.isArray(val)) {
    return 'array';
  } else if (val === null) {
    return 'null';
  } else {
    return typeof val;
  }
}

function isFunction$1(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function identityFunction(x) {
  return x;
}

function createFunction(parameters, propertySpec) {
  var isColor = propertySpec.type === 'color';
  var zoomAndFeatureDependent = parameters.stops && typeof parameters.stops[0][0] === 'object';
  var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
  var zoomDependent = zoomAndFeatureDependent || !featureDependent;
  var type = parameters.type || (supportsInterpolation(propertySpec) ? 'exponential' : 'interval');
  if (isColor) {
    parameters = extend({}, parameters);
    if (parameters.stops) {
      parameters.stops = parameters.stops.map(function (stop) {
        return [
          stop[0],
          Color.parse(stop[1])
        ];
      });
    }
    if (parameters.default) {
      parameters.default = Color.parse(parameters.default);
    } else {
      parameters.default = Color.parse(propertySpec.default);
    }
  }
  if (parameters.colorSpace && parameters.colorSpace !== 'rgb' && !colorSpaces[parameters.colorSpace]) {
    throw new Error('Unknown color space: ' + parameters.colorSpace);
  }
  var innerFun;
  var hashedStops;
  var categoricalKeyType;
  if (type === 'exponential') {
    innerFun = evaluateExponentialFunction;
  } else if (type === 'interval') {
    innerFun = evaluateIntervalFunction;
  } else if (type === 'categorical') {
    innerFun = evaluateCategoricalFunction;
    hashedStops = Object.create(null);
    for (var i = 0, list = parameters.stops; i < list.length; i += 1) {
      var stop = list[i];
      hashedStops[stop[0]] = stop[1];
    }
    categoricalKeyType = typeof parameters.stops[0][0];
  } else if (type === 'identity') {
    innerFun = evaluateIdentityFunction;
  } else {
    throw new Error('Unknown function type "' + type + '"');
  }
  if (zoomAndFeatureDependent) {
    var featureFunctions = {};
    var zoomStops = [];
    for (var s = 0; s < parameters.stops.length; s++) {
      var stop$1 = parameters.stops[s];
      var zoom = stop$1[0].zoom;
      if (featureFunctions[zoom] === undefined) {
        featureFunctions[zoom] = {
          zoom: zoom,
          type: parameters.type,
          property: parameters.property,
          default: parameters.default,
          stops: []
        };
        zoomStops.push(zoom);
      }
      featureFunctions[zoom].stops.push([
        stop$1[0].value,
        stop$1[1]
      ]);
    }
    var featureFunctionStops = [];
    for (var i$1 = 0, list$1 = zoomStops; i$1 < list$1.length; i$1 += 1) {
      var z = list$1[i$1];
      featureFunctionStops.push([
        featureFunctions[z].zoom,
        createFunction(featureFunctions[z], propertySpec)
      ]);
    }
    var interpolationType = {name: 'linear'};
    return {
      kind: 'composite',
      interpolationType: interpolationType,
      interpolationFactor: Interpolate.interpolationFactor.bind(undefined, interpolationType),
      zoomStops: featureFunctionStops.map(function (s) {
        return s[0];
      }),
      evaluate: function evaluate(ref, properties) {
        var zoom = ref.zoom;
        return evaluateExponentialFunction({
          stops: featureFunctionStops,
          base: parameters.base
        }, propertySpec, zoom).evaluate(zoom, properties);
      }
    };
  } else if (zoomDependent) {
    var interpolationType$1 = type === 'exponential' ? {
      name: 'exponential',
      base: parameters.base !== undefined ? parameters.base : 1
    } : null;
    return {
      kind: 'camera',
      interpolationType: interpolationType$1,
      interpolationFactor: Interpolate.interpolationFactor.bind(undefined, interpolationType$1),
      zoomStops: parameters.stops.map(function (s) {
        return s[0];
      }),
      evaluate: function (ref) {
        var zoom = ref.zoom;
        return innerFun(parameters, propertySpec, zoom, hashedStops, categoricalKeyType);
      }
    };
  } else {
    return {
      kind: 'source',
      evaluate: function evaluate(_, feature) {
        var value = feature && feature.properties ? feature.properties[parameters.property] : undefined;
        if (value === undefined) {
          return coalesce(parameters.default, propertySpec.default);
        }
        return innerFun(parameters, propertySpec, value, hashedStops, categoricalKeyType);
      }
    };
  }
}

function coalesce(a, b, c) {
  if (a !== undefined) {
    return a;
  }
  if (b !== undefined) {
    return b;
  }
  if (c !== undefined) {
    return c;
  }
}

function evaluateCategoricalFunction(parameters, propertySpec, input, hashedStops, keyType) {
  var evaluated = typeof input === keyType ? hashedStops[input] : undefined;
  return coalesce(evaluated, parameters.default, propertySpec.default);
}

function evaluateIntervalFunction(parameters, propertySpec, input) {
  if (getType(input) !== 'number') {
    return coalesce(parameters.default, propertySpec.default);
  }
  var n = parameters.stops.length;
  if (n === 1) {
    return parameters.stops[0][1];
  }
  if (input <= parameters.stops[0][0]) {
    return parameters.stops[0][1];
  }
  if (input >= parameters.stops[n - 1][0]) {
    return parameters.stops[n - 1][1];
  }
  var index = findStopLessThanOrEqualTo(parameters.stops.map(function (stop) {
    return stop[0];
  }), input);
  return parameters.stops[index][1];
}

function evaluateExponentialFunction(parameters, propertySpec, input) {
  var base = parameters.base !== undefined ? parameters.base : 1;
  if (getType(input) !== 'number') {
    return coalesce(parameters.default, propertySpec.default);
  }
  var n = parameters.stops.length;
  if (n === 1) {
    return parameters.stops[0][1];
  }
  if (input <= parameters.stops[0][0]) {
    return parameters.stops[0][1];
  }
  if (input >= parameters.stops[n - 1][0]) {
    return parameters.stops[n - 1][1];
  }
  var index = findStopLessThanOrEqualTo(parameters.stops.map(function (stop) {
    return stop[0];
  }), input);
  var t = interpolationFactor(input, base, parameters.stops[index][0], parameters.stops[index + 1][0]);
  var outputLower = parameters.stops[index][1];
  var outputUpper = parameters.stops[index + 1][1];
  var interp = interpolate[propertySpec.type] || identityFunction;
  if (parameters.colorSpace && parameters.colorSpace !== 'rgb') {
    var colorspace = colorSpaces[parameters.colorSpace];
    interp = function (a, b) {
      return colorspace.reverse(colorspace.interpolate(colorspace.forward(a), colorspace.forward(b), t));
    };
  }
  if (typeof outputLower.evaluate === 'function') {
    return {
      evaluate: function evaluate() {
        var arguments$1 = arguments;

        var args = [], len = arguments.length;
        while (len--) {
          args[len] = arguments$1[len];
        }
        var evaluatedLower = outputLower.evaluate.apply(undefined, args);
        var evaluatedUpper = outputUpper.evaluate.apply(undefined, args);
        if (evaluatedLower === undefined || evaluatedUpper === undefined) {
          return undefined;
        }
        return interp(evaluatedLower, evaluatedUpper, t);
      }
    };
  }
  return interp(outputLower, outputUpper, t);
}

function evaluateIdentityFunction(parameters, propertySpec, input) {
  if (propertySpec.type === 'color') {
    input = Color.parse(input);
  } else if (propertySpec.type === 'formatted') {
    input = Formatted.fromString(input.toString());
  } else if (propertySpec.type === 'resolvedImage') {
    input = ResolvedImage.fromString(input.toString());
  } else if (getType(input) !== propertySpec.type && (propertySpec.type !== 'enum' || !propertySpec.values[input])) {
    input = undefined;
  }
  return coalesce(input, parameters.default, propertySpec.default);
}

function interpolationFactor(input, base, lowerValue, upperValue) {
  var difference = upperValue - lowerValue;
  var progress = input - lowerValue;
  if (difference === 0) {
    return 0;
  } else if (base === 1) {
    return progress / difference;
  } else {
    return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
  }
}

var StyleExpression = function StyleExpression(expression, propertySpec) {
  this.expression = expression;
  this._warningHistory = {};
  this._evaluator = new EvaluationContext();
  this._defaultValue = propertySpec ? getDefaultValue(propertySpec) : null;
  this._enumValues = propertySpec && propertySpec.type === 'enum' ? propertySpec.values : null;
};
StyleExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
  this._evaluator.globals = globals;
  this._evaluator.feature = feature;
  this._evaluator.featureState = featureState;
  this._evaluator.canonical = canonical;
  this._evaluator.availableImages = availableImages || null;
  this._evaluator.formattedSection = formattedSection;
  return this.expression.evaluate(this._evaluator);
};
StyleExpression.prototype.evaluate = function evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
  this._evaluator.globals = globals;
  this._evaluator.feature = feature || null;
  this._evaluator.featureState = featureState || null;
  this._evaluator.canonical = canonical;
  this._evaluator.availableImages = availableImages || null;
  this._evaluator.formattedSection = formattedSection || null;
  try {
    var val = this.expression.evaluate(this._evaluator);
    if (val === null || val === undefined || typeof val === 'number' && val !== val) {
      return this._defaultValue;
    }
    if (this._enumValues && !(val in this._enumValues)) {
      throw new RuntimeError('Expected value to be one of ' + Object.keys(this._enumValues).map(function (v) {
        return JSON.stringify(v);
      }).join(', ') + ', but found ' + JSON.stringify(val) + ' instead.');
    }
    return val;
  } catch (e) {
    if (!this._warningHistory[e.message]) {
      this._warningHistory[e.message] = true;
      if (typeof console !== 'undefined') {
        // console.warn(e.message);
      }
    }
    return this._defaultValue;
  }
};

function isExpression(expression) {
  return Array.isArray(expression) && expression.length > 0 && typeof expression[0] === 'string' && expression[0] in expressions;
}

function createExpression(expression, propertySpec) {
  var parser = new ParsingContext(expressions, [], propertySpec ? getExpectedType(propertySpec) : undefined);
  var parsed = parser.parse(expression, undefined, undefined, undefined, propertySpec && propertySpec.type === 'string' ? {typeAnnotation: 'coerce'} : undefined);
  if (!parsed) {
    return error(parser.errors);
  }
  return success(new StyleExpression(parsed, propertySpec));
}

var ZoomConstantExpression = function ZoomConstantExpression(kind, expression) {
  this.kind = kind;
  this._styleExpression = expression;
  this.isStateDependent = kind !== 'constant' && !isStateConstant(expression.expression);
};
ZoomConstantExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
  return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
};
ZoomConstantExpression.prototype.evaluate = function evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
  return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
};
var ZoomDependentExpression = function ZoomDependentExpression(kind, expression, zoomStops, interpolationType) {
  this.kind = kind;
  this.zoomStops = zoomStops;
  this._styleExpression = expression;
  this.isStateDependent = kind !== 'camera' && !isStateConstant(expression.expression);
  this.interpolationType = interpolationType;
};
ZoomDependentExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
  return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
};
ZoomDependentExpression.prototype.evaluate = function evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
  return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
};
ZoomDependentExpression.prototype.interpolationFactor = function interpolationFactor(input, lower, upper) {
  if (this.interpolationType) {
    return Interpolate.interpolationFactor(this.interpolationType, input, lower, upper);
  } else {
    return 0;
  }
};

function createPropertyExpression(expression, propertySpec) {
  expression = createExpression(expression, propertySpec);
  if (expression.result === 'error') {
    return expression;
  }
  var parsed = expression.value.expression;
  var isFeatureConstant$1 = isFeatureConstant(parsed);
  if (!isFeatureConstant$1 && !supportsPropertyExpression(propertySpec)) {
    return error([new ParsingError('', 'data expressions not supported')]);
  }
  var isZoomConstant = isGlobalPropertyConstant(parsed, ['zoom']);
  if (!isZoomConstant && !supportsZoomExpression(propertySpec)) {
    return error([new ParsingError('', 'zoom expressions not supported')]);
  }
  var zoomCurve = findZoomCurve(parsed);
  if (!zoomCurve && !isZoomConstant) {
    return error([new ParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
  } else if (zoomCurve instanceof ParsingError) {
    return error([zoomCurve]);
  } else if (zoomCurve instanceof Interpolate && !supportsInterpolation(propertySpec)) {
    return error([new ParsingError('', '"interpolate" expressions cannot be used with this property')]);
  }
  if (!zoomCurve) {
    return success(isFeatureConstant$1 ? new ZoomConstantExpression('constant', expression.value) : new ZoomConstantExpression('source', expression.value));
  }
  var interpolationType = zoomCurve instanceof Interpolate ? zoomCurve.interpolation : undefined;
  return success(isFeatureConstant$1 ? new ZoomDependentExpression('camera', expression.value, zoomCurve.labels, interpolationType) : new ZoomDependentExpression('composite', expression.value, zoomCurve.labels, interpolationType));
}

var StylePropertyFunction = function StylePropertyFunction(parameters, specification) {
  this._parameters = parameters;
  this._specification = specification;
  extend(this, createFunction(this._parameters, this._specification));
};
StylePropertyFunction.deserialize = function deserialize(serialized) {
  return new StylePropertyFunction(serialized._parameters, serialized._specification);
};
StylePropertyFunction.serialize = function serialize(input) {
  return {
    _parameters: input._parameters,
    _specification: input._specification
  };
};

function normalizePropertyExpression(value, specification) {
  if (isFunction$1(value)) {
    return new StylePropertyFunction(value, specification);
  } else if (isExpression(value)) {
    var expression = createPropertyExpression(value, specification);
    if (expression.result === 'error') {
      throw new Error(expression.value.map(function (err) {
        return err.key + ': ' + err.message;
      }).join(', '));
    }
    return expression.value;
  } else {
    var constant = value;
    if (typeof value === 'string' && specification.type === 'color') {
      constant = Color.parse(value);
    }
    return {
      kind: 'constant',
      evaluate: function () {
        return constant;
      }
    };
  }
}

function findZoomCurve(expression) {
  var result = null;
  if (expression instanceof Let) {
    result = findZoomCurve(expression.result);
  } else if (expression instanceof Coalesce) {
    for (var i = 0, list = expression.args; i < list.length; i += 1) {
      var arg = list[i];
      result = findZoomCurve(arg);
      if (result) {
        break;
      }
    }
  } else if ((expression instanceof Step || expression instanceof Interpolate) && expression.input instanceof CompoundExpression && expression.input.name === 'zoom') {
    result = expression;
  }
  if (result instanceof ParsingError) {
    return result;
  }
  expression.eachChild(function (child) {
    var childResult = findZoomCurve(child);
    if (childResult instanceof ParsingError) {
      result = childResult;
    } else if (!result && childResult) {
      result = new ParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.');
    } else if (result && childResult && result !== childResult) {
      result = new ParsingError('', 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.');
    }
  });
  return result;
}

function getExpectedType(spec) {
  var types = {
    color: ColorType,
    string: StringType,
    number: NumberType,
    enum: StringType,
    boolean: BooleanType,
    formatted: FormattedType,
    resolvedImage: ResolvedImageType
  };
  if (spec.type === 'array') {
    return array(types[spec.value] || ValueType, spec.length);
  }
  return types[spec.type];
}

function getDefaultValue(spec) {
  if (spec.type === 'color' && isFunction$1(spec.default)) {
    return new Color(0, 0, 0, 0);
  } else if (spec.type === 'color') {
    return Color.parse(spec.default) || null;
  } else if (spec.default === undefined) {
    return null;
  } else {
    return spec.default;
  }
}

function isExpressionFilter(filter) {
  if (filter === true || filter === false) {
    return true;
  }
  if (!Array.isArray(filter) || filter.length === 0) {
    return false;
  }
  switch (filter[0]) {
    case 'has':
      return filter.length >= 2 && filter[1] !== '$id' && filter[1] !== '$type';
    case 'in':
      return filter.length >= 3 && (typeof filter[1] !== 'string' || Array.isArray(filter[2]));
    case '!in':
    case '!has':
    case 'none':
      return false;
    case '==':
    case '!=':
    case '>':
    case '>=':
    case '<':
    case '<=':
      return filter.length !== 3 || (Array.isArray(filter[1]) || Array.isArray(filter[2]));
    case 'any':
    case 'all':
      for (var i = 0, list = filter.slice(1); i < list.length; i += 1) {
        var f = list[i];
        if (!isExpressionFilter(f) && typeof f !== 'boolean') {
          return false;
        }
      }
      return true;
    default:
      return true;
  }
}

var jsonlint = createCommonjsModule(function (module, exports) {
  /* parser generated by jison 0.4.15 */
  /*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
  var parser = (function () {
    var o = function (k, v, o, l) {
        for (o = o || {}, l = k.length; l--; o[k[l]] = v) {
        }
        return o
      }, $V0 = [1, 12], $V1 = [1, 13], $V2 = [1, 9], $V3 = [1, 10], $V4 = [1, 11], $V5 = [1, 14], $V6 = [1, 15],
      $V7 = [14, 18, 22, 24], $V8 = [18, 22], $V9 = [22, 24];
    var parser = {
      trace: function trace() {
      },
      yy: {},
      symbols_: {
        "error": 2,
        "JSONString": 3,
        "STRING": 4,
        "JSONNumber": 5,
        "NUMBER": 6,
        "JSONNullLiteral": 7,
        "NULL": 8,
        "JSONBooleanLiteral": 9,
        "TRUE": 10,
        "FALSE": 11,
        "JSONText": 12,
        "JSONValue": 13,
        "EOF": 14,
        "JSONObject": 15,
        "JSONArray": 16,
        "{": 17,
        "}": 18,
        "JSONMemberList": 19,
        "JSONMember": 20,
        ":": 21,
        ",": 22,
        "[": 23,
        "]": 24,
        "JSONElementList": 25,
        "$accept": 0,
        "$end": 1
      },
      terminals_: {
        2: "error",
        4: "STRING",
        6: "NUMBER",
        8: "NULL",
        10: "TRUE",
        11: "FALSE",
        14: "EOF",
        17: "{",
        18: "}",
        21: ":",
        22: ",",
        23: "[",
        24: "]"
      },
      productions_: [0, [3, 1], [5, 1], [7, 1], [9, 1], [9, 1], [12, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [15, 2], [15, 3], [20, 3], [19, 1], [19, 3], [16, 2], [16, 3], [25, 1], [25, 3]],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
        /* this == yyval */

        var $0 = $$.length - 1;
        switch (yystate) {
          case 1:
            // replace escaped characters with actual character
            this.$ = new String(yytext.replace(/\\(\\|")/g, "$" + "1")
              .replace(/\\n/g, '\n')
              .replace(/\\r/g, '\r')
              .replace(/\\t/g, '\t')
              .replace(/\\v/g, '\v')
              .replace(/\\f/g, '\f')
              .replace(/\\b/g, '\b'));
            this.$.__line__ = this._$.first_line;

            break;
          case 2:

            this.$ = new Number(yytext);
            this.$.__line__ = this._$.first_line;

            break;
          case 3:

            this.$ = null;

            break;
          case 4:

            this.$ = new Boolean(true);
            this.$.__line__ = this._$.first_line;

            break;
          case 5:

            this.$ = new Boolean(false);
            this.$.__line__ = this._$.first_line;

            break;
          case 6:
            return this.$ = $$[$0 - 1];
          case 13:
            this.$ = {};
            Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
            });
            break;
          case 14:
          case 19:
            this.$ = $$[$0 - 1];
            Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
            });
            break;
          case 15:
            this.$ = [$$[$0 - 2], $$[$0]];
            break;
          case 16:
            this.$ = {};
            this.$[$$[$0][0]] = $$[$0][1];
            break;
          case 17:
            this.$ = $$[$0 - 2];
            $$[$0 - 2][$$[$0][0]] = $$[$0][1];
            break;
          case 18:
            this.$ = [];
            Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
            });
            break;
          case 20:
            this.$ = [$$[$0]];
            break;
          case 21:
            this.$ = $$[$0 - 2];
            $$[$0 - 2].push($$[$0]);
            break;
        }
      },
      table: [{
        3: 5,
        4: $V0,
        5: 6,
        6: $V1,
        7: 3,
        8: $V2,
        9: 4,
        10: $V3,
        11: $V4,
        12: 1,
        13: 2,
        15: 7,
        16: 8,
        17: $V5,
        23: $V6
      }, {1: [3]}, {14: [1, 16]}, o($V7, [2, 7]), o($V7, [2, 8]), o($V7, [2, 9]), o($V7, [2, 10]), o($V7, [2, 11]), o($V7, [2, 12]), o($V7, [2, 3]), o($V7, [2, 4]), o($V7, [2, 5]), o([14, 18, 21, 22, 24], [2, 1]), o($V7, [2, 2]), {
        3: 20,
        4: $V0,
        18: [1, 17],
        19: 18,
        20: 19
      }, {
        3: 5,
        4: $V0,
        5: 6,
        6: $V1,
        7: 3,
        8: $V2,
        9: 4,
        10: $V3,
        11: $V4,
        13: 23,
        15: 7,
        16: 8,
        17: $V5,
        23: $V6,
        24: [1, 21],
        25: 22
      }, {1: [2, 6]}, o($V7, [2, 13]), {
        18: [1, 24],
        22: [1, 25]
      }, o($V8, [2, 16]), {21: [1, 26]}, o($V7, [2, 18]), {
        22: [1, 28],
        24: [1, 27]
      }, o($V9, [2, 20]), o($V7, [2, 14]), {3: 20, 4: $V0, 20: 29}, {
        3: 5,
        4: $V0,
        5: 6,
        6: $V1,
        7: 3,
        8: $V2,
        9: 4,
        10: $V3,
        11: $V4,
        13: 30,
        15: 7,
        16: 8,
        17: $V5,
        23: $V6
      }, o($V7, [2, 19]), {
        3: 5,
        4: $V0,
        5: 6,
        6: $V1,
        7: 3,
        8: $V2,
        9: 4,
        10: $V3,
        11: $V4,
        13: 31,
        15: 7,
        16: 8,
        17: $V5,
        23: $V6
      }, o($V8, [2, 17]), o($V8, [2, 15]), o($V9, [2, 21])],
      defaultActions: {16: [2, 6]},
      parseError: function parseError(str, hash) {
        if (hash.recoverable) {
          this.trace(str);
        } else {
          throw new Error(str);
        }
      },
      parse: function parse(input) {
        var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0,
          yyleng = 0, TERROR = 2, EOF = 1;
        var args = lstack.slice.call(arguments, 1);
        var lexer = Object.create(this.lexer);
        var sharedState = {yy: {}};
        for (var k in this.yy) {
          if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
          }
        }
        lexer.setInput(input, sharedState.yy);
        sharedState.yy.lexer = lexer;
        sharedState.yy.parser = this;
        if (typeof lexer.yylloc == 'undefined') {
          lexer.yylloc = {};
        }
        var yyloc = lexer.yylloc;
        lstack.push(yyloc);
        var ranges = lexer.options && lexer.options.ranges;
        if (typeof sharedState.yy.parseError === 'function') {
          this.parseError = sharedState.yy.parseError;
        } else {
          this.parseError = Object.getPrototypeOf(this).parseError;
        }

        function lex() {
          var token;
          token = lexer.lex() || EOF;
          if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
          }
          return token;
        }

        var symbol, state, action, r, yyval = {}, p, len, newState, expected;
        while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
            action = this.defaultActions[state];
          } else {
            if (symbol === null || typeof symbol == 'undefined') {
              symbol = lex();
            }
            action = table[state] && table[state][symbol];
          }
          if (typeof action === 'undefined' || !action.length || !action[0]) {
            var errStr = '';
            expected = [];
            for (p in table[state]) {
              if (this.terminals_[p] && p > TERROR) {
                expected.push('\'' + this.terminals_[p] + '\'');
              }
            }
            if (lexer.showPosition) {
              errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
            } else {
              errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
            }
            this.parseError(errStr, {
              text: lexer.match,
              token: this.terminals_[symbol] || symbol,
              line: lexer.yylineno,
              loc: yyloc,
              expected: expected
            });
          }
          if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
          }
          switch (action[0]) {
            case 1:
              stack.push(symbol);
              vstack.push(lexer.yytext);
              lstack.push(lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
            {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
            }
              break;
            case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
              };
              if (ranges) {
                yyval._$.range = [
                  lstack[lstack.length - (len || 1)].range[0],
                  lstack[lstack.length - 1].range[1]
                ];
              }
              r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
              ].concat(args));
              if (typeof r !== 'undefined') {
                return r;
              }
              if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
            case 3:
              return true;
          }
        }
        return true;
      }
    };
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
      var lexer = ({

        EOF: 1,

        parseError: function parseError(str, hash) {
          if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
          } else {
            throw new Error(str);
          }
        },

// resets the lexer, sets new input
        setInput: function (input, yy) {
          this.yy = yy || this.yy || {};
          this._input = input;
          this._more = this._backtrack = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
          };
          if (this.options.ranges) {
            this.yylloc.range = [0, 0];
          }
          this.offset = 0;
          return this;
        },

// consumes and returns one char from the input
        input: function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
          } else {
            this.yylloc.last_column++;
          }
          if (this.options.ranges) {
            this.yylloc.range[1]++;
          }

          this._input = this._input.slice(1);
          return ch;
        },

// unshifts one char (or a string) into the input
        unput: function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length - len);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1);
          this.matched = this.matched.substr(0, this.matched.length - 1);

          if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
          }
          var r = this.yylloc.range;

          this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0)
              + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
          };

          if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          this.yyleng = this.yytext.length;
          return this;
        },

// When called from action, caches matched text and appends it on next action
        more: function () {
          this._more = true;
          return this;
        },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
        reject: function () {
          if (this.options.backtrack_lexer) {
            this._backtrack = true;
          } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
              text: "",
              token: null,
              line: this.yylineno
            });

          }
          return this;
        },

// retain first n characters of the match
        less: function (n) {
          this.unput(this.match.slice(n));
        },

// displays already matched input, i.e. for error messages
        pastInput: function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
        },

// displays upcoming input, i.e. for error messages
        upcomingInput: function () {
          var next = this.match;
          if (next.length < 20) {
            next += this._input.substr(0, 20 - next.length);
          }
          return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
        },

// displays the character position where the lexing error occurred, i.e. for error messages
        showPosition: function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
        },

// test the lexed token: return FALSE when not a match, otherwise return token
        test_match: function (match, indexed_rule) {
          var token,
            lines,
            backup;

          if (this.options.backtrack_lexer) {
            // save context
            backup = {
              yylineno: this.yylineno,
              yylloc: {
                first_line: this.yylloc.first_line,
                last_line: this.last_line,
                first_column: this.yylloc.first_column,
                last_column: this.yylloc.last_column
              },
              yytext: this.yytext,
              match: this.match,
              matches: this.matches,
              matched: this.matched,
              yyleng: this.yyleng,
              offset: this.offset,
              _more: this._more,
              _input: this._input,
              yy: this.yy,
              conditionStack: this.conditionStack.slice(0),
              done: this.done
            };
            if (this.options.ranges) {
              backup.yylloc.range = this.yylloc.range.slice(0);
            }
          }

          lines = match[0].match(/(?:\r\n?|\n).*/g);
          if (lines) {
            this.yylineno += lines.length;
          }
          this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
              lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
              this.yylloc.last_column + match[0].length
          };
          this.yytext += match[0];
          this.match += match[0];
          this.matches = match;
          this.yyleng = this.yytext.length;
          if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
          }
          this._more = false;
          this._backtrack = false;
          this._input = this._input.slice(match[0].length);
          this.matched += match[0];
          token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
          if (this.done && this._input) {
            this.done = false;
          }
          if (token) {
            return token;
          } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
              this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
          }
          return false;
        },

// return next match in input
        next: function () {
          if (this.done) {
            return this.EOF;
          }
          if (!this._input) {
            this.done = true;
          }

          var token,
            match,
            tempMatch,
            index;
          if (!this._more) {
            this.yytext = '';
            this.match = '';
          }
          var rules = this._currentRules();
          for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
              match = tempMatch;
              index = i;
              if (this.options.backtrack_lexer) {
                token = this.test_match(tempMatch, rules[i]);
                if (token !== false) {
                  return token;
                } else if (this._backtrack) {
                  match = false;
                  continue; // rule action called reject() implying a rule MISmatch.
                } else {
                  // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                  return false;
                }
              } else if (!this.options.flex) {
                break;
              }
            }
          }
          if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
              return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
          }
          if (this._input === "") {
            return this.EOF;
          } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
              text: "",
              token: null,
              line: this.yylineno
            });
          }
        },

// return next match that has a token
        lex: function lex() {
          var r = this.next();
          if (r) {
            return r;
          } else {
            return this.lex();
          }
        },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
        begin: function begin(condition) {
          this.conditionStack.push(condition);
        },

// pop the previously active lexer condition state off the condition stack
        popState: function popState() {
          var n = this.conditionStack.length - 1;
          if (n > 0) {
            return this.conditionStack.pop();
          } else {
            return this.conditionStack[0];
          }
        },

// produce the lexer rule set which is active for the currently active lexer condition state
        _currentRules: function _currentRules() {
          if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
          } else {
            return this.conditions["INITIAL"].rules;
          }
        },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
        topState: function topState(n) {
          n = this.conditionStack.length - 1 - Math.abs(n || 0);
          if (n >= 0) {
            return this.conditionStack[n];
          } else {
            return "INITIAL";
          }
        },

// alias for begin(condition)
        pushState: function pushState(condition) {
          this.begin(condition);
        },

// return the number of states currently on the stack
        stateStackSize: function stateStackSize() {
          return this.conditionStack.length;
        },
        options: {},
        performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
          switch ($avoiding_name_collisions) {
            case 0:/* skip whitespace */
              break;
            case 1:
              return 6
            case 2:
              yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
              return 4
            case 3:
              return 17
            case 4:
              return 18
            case 5:
              return 23
            case 6:
              return 24
            case 7:
              return 22
            case 8:
              return 21
            case 9:
              return 10
            case 10:
              return 11
            case 11:
              return 8
            case 12:
              return 14
            case 13:
              return 'INVALID'
          }
        },
        rules: [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/],
        conditions: {"INITIAL": {"rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], "inclusive": true}}
      });
      return lexer;
    })();
    parser.lexer = lexer;

    function Parser() {
      this.yy = {};
    }

    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
  })();


  if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () {
      return parser.parse.apply(parser, arguments);
    };
  }
});
var jsonlint_1 = jsonlint.parser;
var jsonlint_2 = jsonlint.Parser;
var jsonlint_3 = jsonlint.parse;

var expression$1 = {
  StyleExpression: StyleExpression,
  isExpression: isExpression,
  isExpressionFilter: isExpressionFilter,
  createExpression: createExpression,
  createPropertyExpression: createPropertyExpression,
  normalizePropertyExpression: normalizePropertyExpression,
  ZoomConstantExpression: ZoomConstantExpression,
  ZoomDependentExpression: ZoomDependentExpression,
  StylePropertyFunction: StylePropertyFunction
};

// 大量代码来自于 [webgl-utils](https://github.com/gfxfundamentals/webgl-fundamentals/blob/master/webgl/resources/webgl-utils.js)
function getDevicePixelRatio() {
  return devicePixelRatio || 1;
}

/**
 * resize gl context
 * @link https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
 * @link https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-anti-patterns.html
 * @param canvas
 * @param pixelRatio
 * @returns {boolean}
 */
function resizeCanvasSize(canvas, pixelRatio) {
  if (!canvas) {
    return false;
  }
  pixelRatio = pixelRatio || getDevicePixelRatio();
  if (!(canvas instanceof OffscreenCanvas)) {
    var width = canvas.clientWidth * pixelRatio;
    var height = canvas.clientHeight * pixelRatio;
    if (width <= 0 || height <= 0) {
      return false;
    } else if (canvas.width !== width ||
      canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
  }
  return false;
}

/**
 * get gl context
 * @param canvas
 * @param glOptions
 * @returns {null}
 */
function getGlContext(canvas, glOptions) {
  if (glOptions === void 0) {
    glOptions = {};
  }
  var names = ['webgl', 'experimental-webgl'];
  var context = null;

  function onContextCreationError(error) {
    // console.error(error.statusMessage);
  }

  canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], glOptions);
    } catch (e) {
    } // eslint-disable-line
    if (context) {
      break;
    }
  }
  canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
  if (!context || !context.getExtension('OES_texture_float')) {
    return null;
  }
  return context;
}

/**
 * create shader and compile shader
 * @param gl
 * @param type
 * @param source
 * @returns {WebGLShader}
 */
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error(gl.getShaderInfoLog(shader) || '');
  }
  return shader;
}

/**
 * create program from vertex and frag
 * @param gl
 * @param vertexShaderSource
 * @param fragmentShaderSource
 * @returns {WebGLProgram}
 */
function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
  // create the shader program
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  var program = gl.createProgram();
  if (program !== null) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || '');
    }
  }
  return program;
}

/**
 * create 2d texture
 * @param gl
 * @param filter
 * @param data
 * @param width
 * @param height
 * @returns {WebGLTexture}
 */
function createTexture(gl, filter, data, width, height) {
  // 创建纹理对象
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // 指定水平方向填充算法
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  // 指定垂直方向填充算法
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // 指定缩小算法
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  // 指定放大算法
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  if (data instanceof Uint8Array) {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
  }
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

/**
 * create data buffer
 * @param gl
 * @param data
 * @returns {AudioBuffer | WebGLBuffer}
 */
function createBuffer(gl, data) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  if (data) {
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }
  return buffer;
}

/**
 * clear scene
 * @param gl
 * @param color
 */
function clearScene(gl, color) {
  var r = color[0], g = color[1], b = color[2], a = color[3];
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(r, g, b, a);
  gl.clearDepth(1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
}

/**
 * load image by url
 * @param src
 * @returns {Promise<Image>}
 */
function loadImage(src) {
  return new Promise((function (resolve, reject) {
    if (!src) {
      reject(new Event('url is null'));
    }
    var image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = function () {
      return resolve(image);
    };
    image.onerror = reject;
    image.src = src;
    if (image.complete) {
      resolve(image);
    }
  }));
}

//
// // This is really just a guess. Though I can't really imagine using
// // anything else? Maybe for some compression?
// function getNormalizationForTypedArray(typedArray: any) {
//   if (typedArray instanceof Int8Array)    { return true; }  // eslint-disable-line
//   if (typedArray instanceof Uint8Array)   { return true; }  // eslint-disable-line
//   return false;
// }
//
// function isArrayBuffer(a) {
//   return a.buffer && a.buffer instanceof ArrayBuffer;
// }
//
// function allButIndices(name) {
//   return name !== 'indices';
// }
//
// function createMapping(obj) {
//   const mapping = {};
//   Object.keys(obj).filter(allButIndices).forEach(function(key) {
//     mapping['a_' + key] = key;
//   });
//   return mapping;
// }
//
// function getGLTypeForTypedArray(gl: WebGLRenderingContext, typedArray: any) {
//   if (typedArray instanceof Int8Array)    { return gl.BYTE; }            // eslint-disable-line
//   if (typedArray instanceof Uint8Array)   { return gl.UNSIGNED_BYTE; }   // eslint-disable-line
//   if (typedArray instanceof Int16Array)   { return gl.SHORT; }           // eslint-disable-line
//   if (typedArray instanceof Uint16Array)  { return gl.UNSIGNED_SHORT; }  // eslint-disable-line
//   if (typedArray instanceof Int32Array)   { return gl.INT; }             // eslint-disable-line
//   if (typedArray instanceof Uint32Array)  { return gl.UNSIGNED_INT; }    // eslint-disable-line
//   if (typedArray instanceof Float32Array) { return gl.FLOAT; }           // eslint-disable-line
//   throw 'unsupported typed array type';
// }
//
// /**
//  * instead createBuffer function
//  * @param gl
//  * @param array
//  * @param type
//  * @param drawType
//  * @returns {AudioBuffer | WebGLBuffer}
//  */
// export function createBufferFromTypedArray(gl: WebGLRenderingContext, array, type: GLenum, drawType: GLenum) {
//   type = type || gl.ARRAY_BUFFER;
//   const buffer = gl.createBuffer();
//   gl.bindBuffer(type, buffer);
//   if (array) {
//     gl.bufferData(type, array, drawType || gl.STATIC_DRAW);
//   }
//   return buffer;
// }
//
// // Add `push` to a typed array. It just keeps a 'cursor'
// // and allows use to `push` values into the array so we
// // don't have to manually compute offsets
// function augmentTypedArray(typedArray: Float32Array | ArrayLike<any>, numComponents: number) {
//   let cursor = 0;
//   typedArray.push = function() {
//     for (let ii = 0; ii < arguments.length; ++ii) {
//       const value = arguments[ii];
//       if (value instanceof Array || (value.buffer && value.buffer instanceof ArrayBuffer)) {
//         for (let jj = 0; jj < value.length; ++jj) {
//           typedArray[cursor++] = value[jj];
//         }
//       } else {
//         typedArray[cursor++] = value;
//       }
//     }
//   };
//   typedArray.reset = function(opt_index) {
//     cursor = opt_index || 0;
//   };
//   typedArray.numComponents = numComponents;
//   Object.defineProperty(typedArray, 'numElements', {
//     get: function() {
//       return this.length / this.numComponents | 0;
//     },
//   });
//   return typedArray;
// }
//
// function createAugmentedTypedArray(numComponents: number, numElements: number, opt_type: ArrayBufferConstructor) {
//   const Type = opt_type || Float32Array;
//   return augmentTypedArray(new Type(numComponents * numElements), numComponents);
// }
//
// function guessNumComponentsFromName(name: string, length: number) {
//   let numComponents;
//   if (name.indexOf('coord') >= 0) {
//     numComponents = 2;
//   } else if (name.indexOf('color') >= 0) {
//     numComponents = 4;
//   } else {
//     numComponents = 3;  // position, normals, indices ...
//   }
//
//   if (length % numComponents > 0) {
//     throw 'can not guess numComponents. You should specify it.';
//   }
//
//   return numComponents;
// }
//
// function makeTypedArray(array: any, name) {
//   if (isArrayBuffer(array)) {
//     return array;
//   }
//
//   if (array.data && isArrayBuffer(array.data)) {
//     return array.data;
//   }
//
//   if (Array.isArray(array)) {
//     array = {
//       data: array,
//     };
//   }
//
//   if (!array.numComponents) {
//     array.numComponents = guessNumComponentsFromName(name, array.length);
//   }
//
//   let type = array.type;
//   if (!type) {
//     if (name === 'indices') {
//       type = Uint16Array;
//     }
//   }
//   const typedArray = createAugmentedTypedArray(array.numComponents, array.data.length / array.numComponents | 0, type);
//   typedArray.push(array.data);
//   return typedArray;
// }
//
// function createAttribsFromArrays (gl: WebGLRenderingContext, arrays, opt_mapping) {
//   const mapping = opt_mapping || createMapping(arrays);
//   const attribs = {};
//   Object.keys(mapping).forEach(function(attribName) {
//     const bufferName = mapping[attribName];
//     const origArray = arrays[bufferName];
//     const array = makeTypedArray(origArray, bufferName);
//     attribs[attribName] = {
//       buffer: createBufferFromTypedArray(gl, array),
//       numComponents: origArray.numComponents || array.numComponents || guessNumComponentsFromName(bufferName),
//       type: getGLTypeForTypedArray(gl, array),
//       normalize: getNormalizationForTypedArray(array),
//     };
//   });
//   return attribs;
// }
//
// /**
//  * tries to get the number of elements from a set of arrays.
//  */
// function getNumElementsFromNonIndexedArrays(arrays) {
//   const key = Object.keys(arrays)[0];
//   const array = arrays[key];
//   if (isArrayBuffer(array)) {
//     return array.numElements;
//   } else {
//     return array.data.length / array.numComponents;
//   }
// }
//
// /**
//  * 创建buffer
//  * @param gl
//  * @param arrays
//  * @param opt_mapping
//  * @returns {{attribs: *}}
//  */
// export function createBufferInfoFromArrays(gl: WebGLRenderingContext, arrays, opt_mapping) {
//   const bufferInfo = {
//     attribs: createAttribsFromArrays(gl, arrays, opt_mapping),
//   };
//   let indices = arrays.indices;
//   if (indices) {
//     indices = makeTypedArray(indices, 'indices');
//     bufferInfo.indices = createBufferFromTypedArray(gl, indices, gl.ELEMENT_ARRAY_BUFFER);
//     bufferInfo.numElements = indices.length;
//   } else {
//     bufferInfo.numElements = getNumElementsFromNonIndexedArrays(arrays);
//   }
//
//   return bufferInfo;
// }

var Base = /** @class */ (function () {
  function Base(gl, vShader, fShader) {
    this.vertShader = '';
    this.fragShader = '';
    if (vShader) {
      this.vertShader = vShader;
    }
    if (fShader) {
      this.fragShader = fShader;
    }
    this.program = createProgram(gl, this.vertShader, this.fragShader);
    this.gl = gl;
    this.textureUnit = 0;
    this.uniformSetters = this.createUniformSetters();
    this.attribSetters = this.createAttributeSetters();
    this.transfromStack = []; // 矩阵变换调用栈
  }

  Base.prototype.active = function () {
    this.gl.useProgram(this.program);
    return this;
  };
  Base.prototype.deactive = function () {
    this.gl.deleteProgram(this.program);
    return this;
  };
  /**
   * from webgl-utils
   * @param gl
   * @param type
   * @returns {GLenum|undefined}
   */
  Base.prototype.getBindPointForSamplerType = function (gl, type) {
    if (type === gl.SAMPLER_2D) {
      return gl.TEXTURE_2D;
    } // eslint-disable-line
    if (type === gl.SAMPLER_CUBE) {
      return gl.TEXTURE_CUBE_MAP;
    } // eslint-disable-line
    return undefined;
  };
  /**
   * from webgl-utils
   * @param program
   * @param uniformInfo
   * @returns {function(...[*]=)}
   */
  Base.prototype.createUniformSetter = function (program, uniformInfo) {
    var gl = this.gl;
    var location = gl.getUniformLocation(program, uniformInfo.name);
    var type = uniformInfo.type;
    // Check if this uniform is an array
    var isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]');
    if (type === gl.FLOAT && isArray) {
      return function (v) {
        gl.uniform1fv(location, v);
      };
    }
    if (type === gl.FLOAT) {
      return function (v) {
        gl.uniform1f(location, v);
      };
    }
    if (type === gl.FLOAT_VEC2) {
      return function (v) {
        gl.uniform2fv(location, v);
      };
    }
    if (type === gl.FLOAT_VEC3) {
      return function (v) {
        gl.uniform3fv(location, v);
      };
    }
    if (type === gl.FLOAT_VEC4) {
      return function (v) {
        gl.uniform4fv(location, v);
      };
    }
    if (type === gl.INT && isArray) {
      return function (v) {
        gl.uniform1iv(location, v);
      };
    }
    if (type === gl.INT) {
      return function (v) {
        gl.uniform1i(location, v);
      };
    }
    if (type === gl.INT_VEC2) {
      return function (v) {
        gl.uniform2iv(location, v);
      };
    }
    if (type === gl.INT_VEC3) {
      return function (v) {
        gl.uniform3iv(location, v);
      };
    }
    if (type === gl.INT_VEC4) {
      return function (v) {
        gl.uniform4iv(location, v);
      };
    }
    if (type === gl.BOOL) {
      return function (v) {
        gl.uniform1iv(location, v);
      };
    }
    if (type === gl.BOOL_VEC2) {
      return function (v) {
        gl.uniform2iv(location, v);
      };
    }
    if (type === gl.BOOL_VEC3) {
      return function (v) {
        gl.uniform3iv(location, v);
      };
    }
    if (type === gl.BOOL_VEC4) {
      return function (v) {
        gl.uniform4iv(location, v);
      };
    }
    if (type === gl.FLOAT_MAT2) {
      return function (v) {
        gl.uniformMatrix2fv(location, false, v);
      };
    }
    if (type === gl.FLOAT_MAT3) {
      return function (v) {
        gl.uniformMatrix3fv(location, false, v);
      };
    }
    if (type === gl.FLOAT_MAT4) {
      return function (v) {
        gl.uniformMatrix4fv(location, false, v);
      };
    }
    if ((type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) && isArray) {
      var units = [];
      for (var ii = 0; ii < uniformInfo.size; ++ii) {
        units.push(this.textureUnit++);
      }
      return function (bindPoint, units) {
        return function (textures) {
          gl.uniform1iv(location, units);
          textures.forEach(function (texture, index) {
            gl.activeTexture(gl.TEXTURE0 + units[index]);
            if (bindPoint !== undefined) {
              gl.bindTexture(bindPoint, texture);
            }
          });
        };
      }(this.getBindPointForSamplerType(gl, type), units);
    }
    if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
      return function (bindPoint, unit) {
        return function (texture) {
          gl.uniform1i(location, unit);
          gl.activeTexture(gl.TEXTURE0 + unit);
          if (bindPoint !== undefined) {
            gl.bindTexture(bindPoint, texture);
          }
        };
      }(this.getBindPointForSamplerType(gl, type), this.textureUnit++);
    }
    throw ('unknown type: 0x' + type.toString(16)); // we should never get here.
  };
  /**
   * from webgl-utils
   * @returns {{}}
   */
  Base.prototype.createUniformSetters = function () {
    var gl = this.gl;
    this.textureUnit = 0;
    var uniformSetters = {};
    if (this.program !== null) {
      var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
      for (var ii = 0; ii < numUniforms; ++ii) {
        var uniformInfo = gl.getActiveUniform(this.program, ii);
        if (!uniformInfo) {
          break;
        }
        var name_1 = uniformInfo.name;
        // remove the array suffix.
        if (name_1.substr(-3) === '[0]') {
          name_1 = name_1.substr(0, name_1.length - 3);
        }
        var setter = this.createUniformSetter(this.program, uniformInfo);
        uniformSetters[name_1] = setter;
      }
    }
    return uniformSetters;
  };
  /**
   * from webgl-utils
   * @returns {function(...[*]=)}
   */
  Base.prototype.createAttribSetter = function (index) {
    var gl = this.gl;
    return function (b) {
      gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
      gl.enableVertexAttribArray(index);
      if (b.numComponents !== undefined || b.size !== undefined) {
        gl.vertexAttribPointer(index, (b.numComponents || b.size), b.type || gl.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
      }
    };
  };
  Base.prototype.createAttributeSetters = function () {
    var gl = this.gl;
    var attribSetters = {};
    if (this.program !== null) {
      var numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
      for (var ii = 0; ii < numAttribs; ++ii) {
        var attribInfo = gl.getActiveAttrib(this.program, ii);
        if (!attribInfo) {
          break;
        }
        var index = gl.getAttribLocation(this.program, attribInfo.name);
        attribSetters[attribInfo.name] = this.createAttribSetter(index);
      }
    }
    return attribSetters;
  };
  Base.prototype.setAttributes = function (attribs, setters) {
    if (setters) {
      setters = setters.attribSetters || setters;
    } else {
      setters = this.attribSetters;
    }
    Object.keys(attribs).forEach(function (name) {
      var setter = setters[name];
      if (setter) {
        setter(attribs[name]);
      }
    });
    return this;
  };
  Base.prototype.setUniforms = function (values, setters) {
    if (setters) {
      setters = setters.uniformSetters || setters;
    } else {
      setters = this.uniformSetters;
    }
    Object.keys(values).forEach(function (name) {
      var setter = setters[name];
      if (setter) {
        setter(values[name]);
      }
    });
    return this;
  };
  /**
   * 可以override，默认使用此种方式清空画布
   * @param color
   * @returns {Base}
   */
  Base.prototype.clear = function (color) {
    clearScene(this.gl, color);
    this.transfromStack = [];
    return this;
  };
  /**
   * 运行次数
   * TODO: 目前没有好的方式去绑定顶点数量的关系
   * @param count
   */
  Base.prototype.runTimes = function (count) {
    this.count = count || 0;
    return this;
  };
  Base.prototype.resize = function () {
    resizeCanvasSize(this.gl.canvas);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    return this;
  };
  Base.prototype.draw = function () {
    throw new Error('should override');
  };
  Base.prototype.translate = function () {
    throw new Error('should override');
  };
  Base.prototype.rotate = function () {
    throw new Error('should override');
  };
  Base.prototype.scale = function () {
    throw new Error('should override');
  };
  return Base;
}());

var FillFrag = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_wind;uniform sampler2D u_color_ramp;uniform vec2 u_image_res;uniform vec2 u_wind_min;uniform vec2 u_wind_max;uniform float u_opacity;varying vec2 v_tex_pos;vec2 windTexture(const vec2 uv){return texture2D(u_wind,uv).rg;}vec2 bilinearWind(const vec2 uv){vec2 px=1.0/u_image_res;vec2 vc=(floor(uv*u_image_res))*px;vec2 f=fract(uv*u_image_res);vec2 tl=windTexture(vc);vec2 tr=windTexture(vc+vec2(px.x,0));vec2 bl=windTexture(vc+vec2(0,px.y));vec2 br=windTexture(vc+px);return mix(mix(tl,tr,f.x),mix(bl,br,f.x),f.y);}vec2 windSpeed(const vec2 uv){return mix(u_wind_min,u_wind_max,bilinearWind(uv));}float windSpeedMagnitude(const vec2 uv){return length(windSpeed(uv))/length(u_wind_max);}const float PI=3.14159265359;/***Converts mapbox style pseudo-mercator coordinates(this is just like mercator,but the unit isn't a meter,but 0..1*spans the entire world)into texture like WGS84 coordinates(this is just like WGS84,but instead of angles,it uses*intervals of 0..1).*/vec2 mercatorToWGS84(vec2 xy){float y=radians(180.0-xy.y*360.0);y=360.0/PI*atan(exp(y))-90.0;y=y/-180.0+0.5;return vec2(xy.x,y);}void main(){vec2 globalWGS84=mercatorToWGS84(v_tex_pos);float speed_t=windSpeedMagnitude(globalWGS84);vec2 ramp_pos=vec2(fract(16.0*speed_t),floor(16.0*speed_t)/16.0);vec4 color=texture2D(u_color_ramp,ramp_pos);gl_FragColor=vec4(floor(255.0*color*u_opacity)/255.0);}"; // eslint-disable-line

var FillVert = "#define GLSLIFY 1\nuniform mat4 u_matrix;attribute vec2 a_position;attribute vec2 a_texCoord;uniform float u_dateline_offset;varying vec2 v_tex_pos;void main(){gl_Position=u_matrix*vec4(a_position.xy+vec2(u_dateline_offset,0),0.0,1.0);v_tex_pos=a_texCoord;}"; // eslint-disable-line

var WindFill = /** @class */ (function (_super) {
  __extends$1(WindFill, _super);

  function WindFill(gl, vShader, fShader) {
    var _this = _super.call(this, gl, vShader || FillVert, fShader || FillFrag) || this;
    _this.vertShader = FillVert;
    _this.fragShader = FillFrag;
    return _this;
  }

  WindFill.prototype.draw = function () {
    // draw
    var primitiveType = this.gl.TRIANGLES;
    this.gl.drawArrays(primitiveType, 0, this.count);
    return this;
  };
  WindFill.prototype.translate = function () {
    return this;
  };
  WindFill.prototype.rotate = function () {
    return this;
  };
  WindFill.prototype.scale = function () {
    return this;
  };
  return WindFill;
}(Base));

var FillFrag$1 = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform sampler2D u_color_ramp;uniform vec2 u_image_res;uniform vec2 u_range;uniform float u_opacity;varying vec2 v_tex_pos;float calcTexture(const vec2 uv){return texture2D(u_image,uv).r;}float windSpeedRelative(const vec2 uv){return texture2D(u_image,uv).r;}float bilinear(const vec2 uv){vec2 px=1.0/u_image_res;vec2 vc=(floor(uv*u_image_res))*px;vec2 f=fract(uv*u_image_res);float tl=calcTexture(vc);float tr=calcTexture(vc+vec2(px.x,0));float bl=calcTexture(vc+vec2(0,px.y));float br=calcTexture(vc+px);return mix(mix(tl,tr,f.x),mix(bl,br,f.x),f.y);}float getValue(const vec2 uv){return mix(u_range.x,u_range.y,bilinear(uv));}const float PI=3.14159265359;/***Converts mapbox style pseudo-mercator coordinates(this is just like mercator,but the unit isn't a meter,but 0..1*spans the entire world)into texture like WGS84 coordinates(this is just like WGS84,but instead of angles,it uses*intervals of 0..1).*/vec2 mercatorToWGS84(vec2 xy){float y=radians(180.0-xy.y*360.0);y=360.0/PI*atan(exp(y))-90.0;y=y/-180.0+0.5;return vec2(xy.x,y);}void main(){vec2 globalWGS84=mercatorToWGS84(v_tex_pos);float value_t=length(getValue(globalWGS84))/length(u_range);vec2 ramp_pos=vec2(fract(16.0*value_t),floor(16.0*value_t)/16.0);vec4 color=texture2D(u_color_ramp,ramp_pos);gl_FragColor=vec4(floor(255.0*color*u_opacity)/255.0);}"; // eslint-disable-line

var FillVert$1 = "#define GLSLIFY 1\nuniform mat4 u_matrix;attribute vec2 a_position;attribute vec2 a_texCoord;uniform float u_dateline_offset;varying vec2 v_tex_pos;void main(){gl_Position=u_matrix*vec4(a_position.xy+vec2(u_dateline_offset,0),0.0,1.0);v_tex_pos=a_texCoord;}"; // eslint-disable-line

var Fill = /** @class */ (function (_super) {
  __extends$1(Fill, _super);

  function Fill(gl, vShader, fShader) {
    var _this = _super.call(this, gl, vShader || FillVert$1, fShader || FillFrag$1) || this;
    _this.vertShader = FillVert$1;
    _this.fragShader = FillFrag$1;
    return _this;
  }

  Fill.prototype.draw = function () {
    // draw
    var primitiveType = this.gl.TRIANGLES;
    this.gl.drawArrays(primitiveType, 0, this.count);
    return this;
  };
  Fill.prototype.translate = function () {
    return this;
  };
  Fill.prototype.rotate = function () {
    return this;
  };
  Fill.prototype.scale = function () {
    return this;
  };
  return Fill;
}(Base));

function isNumber$1(val) {
  return typeof val === 'number' && !isNaN(val);
}

var WorkerClass = null;

try {
  var WorkerThreads =
    typeof module !== 'undefined' && typeof module.require === 'function' && module.require('worker_threads') ||
    typeof __non_webpack_require__ === 'function' && __non_webpack_require__('worker_threads') ||
    typeof require === 'function' && require('worker_threads');
  WorkerClass = WorkerThreads.Worker;
} catch (e) {
} // eslint-disable-line

function decodeBase64(base64, enableUnicode) {
  return Buffer.from(base64, 'base64').toString(enableUnicode ? 'utf16' : 'utf8');
}

function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
  var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
  var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
  var source = decodeBase64(base64, enableUnicode);
  var start = source.indexOf('\n', 10) + 1;
  var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
  return function WorkerFactory(options) {
    return new WorkerClass(body, Object.assign({}, options, {eval: true}));
  };
}

function decodeBase64$1(base64, enableUnicode) {
  var binaryString = atob(base64);
  if (enableUnicode) {
    var binaryView = new Uint8Array(binaryString.length);
    for (var i = 0, n = binaryString.length; i < n; ++i) {
      binaryView[i] = binaryString.charCodeAt(i);
    }
    return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
  }
  return binaryString;
}

function createURL(base64, sourcemapArg, enableUnicodeArg) {
  var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
  var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
  var source = decodeBase64$1(base64, enableUnicode);
  var start = source.indexOf('\n', 10) + 1;
  var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
  var blob = new Blob([body], {type: 'application/javascript'});
  return URL.createObjectURL(blob);
}

function createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg) {
  var url;
  return function WorkerFactory(options) {
    url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
    return new Worker(url, options);
  };
}

var kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

function isNodeJS() {
  return kIsNodeJS;
}

function createBase64WorkerFactory$2(base64, sourcemapArg, enableUnicodeArg) {
  if (isNodeJS()) {
    return createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg);
  }
  return createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg);
}

var WorkerFactory = createBase64WorkerFactory$2('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgeyB0aHJvdyB0WzFdOyB9IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnOw0KICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCAidGhyb3ciOiB2ZXJiKDEpLCAicmV0dXJuIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSAiZnVuY3Rpb24iICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnOw0KICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfQ0KICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHsNCiAgICAgICAgaWYgKGYpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOyB9DQogICAgICAgIHdoaWxlIChfKSB7IHRyeSB7DQogICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5WyJyZXR1cm4iXSA6IG9wWzBdID8geVsidGhyb3ciXSB8fCAoKHQgPSB5WyJyZXR1cm4iXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgeyByZXR1cm4gdDsgfQ0KICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSB7IG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07IH0NCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSB7IF8ub3BzLnBvcCgpOyB9DQogICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTsNCiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfSB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHsgdGhyb3cgb3BbMV07IH0gcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTsNCiAgICB9DQp9CgpmdW5jdGlvbiBjYWxjTWluTWF4KGFycmF5KSB7CiAgICB2YXIgbWluID0gSW5maW5pdHk7CiAgICB2YXIgbWF4ID0gSW5maW5pdHk7CiAgICAvLyBAZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTM1NDQ0NzYvaG93LXRvLWZpbmQtbWF4LWFuZC1taW4taW4tYXJyYXktdXNpbmctbWluaW11bS1jb21wYXJpc29ucwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykgewogICAgICAgIHZhciB2YWwgPSBhcnJheVtpXTsKICAgICAgICBpZiAobWluID09PSBJbmZpbml0eSkgewogICAgICAgICAgICBtaW4gPSB2YWw7CiAgICAgICAgfQogICAgICAgIGVsc2UgaWYgKG1heCA9PT0gSW5maW5pdHkpIHsKICAgICAgICAgICAgbWF4ID0gdmFsOwogICAgICAgICAgICAvLyB1cGRhdGUgbWluIG1heAogICAgICAgICAgICAvLyAxLiBQaWNrIDIgZWxlbWVudHMoYSwgYiksIGNvbXBhcmUgdGhlbS4gKHNheSBhID4gYikKICAgICAgICAgICAgbWluID0gTWF0aC5taW4obWluLCBtYXgpOwogICAgICAgICAgICBtYXggPSBNYXRoLm1heChtaW4sIG1heCk7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICAvLyAyLiBVcGRhdGUgbWluIGJ5IGNvbXBhcmluZyAobWluLCBiKQogICAgICAgICAgICAvLyAzLiBVcGRhdGUgbWF4IGJ5IGNvbXBhcmluZyAobWF4LCBhKQogICAgICAgICAgICBtaW4gPSBNYXRoLm1pbih2YWwsIG1pbik7CiAgICAgICAgICAgIG1heCA9IE1hdGgubWF4KHZhbCwgbWF4KTsKICAgICAgICB9CiAgICB9CiAgICByZXR1cm4gW21pbiwgbWF4XTsKfQoKdmFyIGN0eCA9IHNlbGY7CmN0eC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKF9hKSB7CiAgICB2YXIgcGF5bG9hZCA9IF9hLmRhdGE7CiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgcmVuZGVyRm9ybSwgdURhdGEsIHZEYXRhLCBfYiwgdU1pbiwgdU1heCwgX2MsIHZNaW4sIHZNYXgsIHZlbG9jaXR5RGF0YSwgaSwgciwgZywgc2luZ2xlRGF0YSwgX2QsIG1pbiwgbWF4LCB2ZWxvY2l0eURhdGEsIGksIHI7CiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZSkgewogICAgICAgICAgICByZW5kZXJGb3JtID0gcGF5bG9hZFswXTsKICAgICAgICAgICAgaWYgKHJlbmRlckZvcm0gPT09ICdyZycpIHsKICAgICAgICAgICAgICAgIHVEYXRhID0gcGF5bG9hZFsxXTsKICAgICAgICAgICAgICAgIHZEYXRhID0gcGF5bG9hZFsyXTsKICAgICAgICAgICAgICAgIF9iID0gY2FsY01pbk1heCh1RGF0YSksIHVNaW4gPSBfYlswXSwgdU1heCA9IF9iWzFdOwogICAgICAgICAgICAgICAgX2MgPSBjYWxjTWluTWF4KHZEYXRhKSwgdk1pbiA9IF9jWzBdLCB2TWF4ID0gX2NbMV07CiAgICAgICAgICAgICAgICB2ZWxvY2l0eURhdGEgPSBuZXcgVWludDhBcnJheSh1RGF0YS5sZW5ndGggKiA0KTsKICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB1RGF0YS5sZW5ndGg7IGkrKykgewogICAgICAgICAgICAgICAgICAgIHIgPSAyNTUgKiAodURhdGFbaV0gLSB1TWluKSAvICh1TWF4IC0gdU1pbik7CiAgICAgICAgICAgICAgICAgICAgZyA9IDI1NSAqICh2RGF0YVtpXSAtIHZNaW4pIC8gKHZNYXggLSB2TWluKTsKICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eURhdGEuc2V0KFtyLCBnLCAwLCAyNTVdLCBpICogNCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoW3ZlbG9jaXR5RGF0YS5idWZmZXIsIHVNaW4sIHVNYXgsIHZNaW4sIHZNYXhdLCBbdmVsb2NpdHlEYXRhLmJ1ZmZlcl0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgc2luZ2xlRGF0YSA9IHBheWxvYWRbMV07CiAgICAgICAgICAgICAgICBfZCA9IGNhbGNNaW5NYXgoc2luZ2xlRGF0YSksIG1pbiA9IF9kWzBdLCBtYXggPSBfZFsxXTsKICAgICAgICAgICAgICAgIHZlbG9jaXR5RGF0YSA9IG5ldyBVaW50OEFycmF5KHNpbmdsZURhdGEubGVuZ3RoICogNCk7CiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2luZ2xlRGF0YS5sZW5ndGg7IGkrKykgewogICAgICAgICAgICAgICAgICAgIHIgPSAyNTUgKiAoc2luZ2xlRGF0YVtpXSAtIG1pbikgLyAobWF4IC0gbWluKTsKICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eURhdGEuc2V0KFtyLCAwLCAwLCAyNTVdLCBpICogNCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoW3ZlbG9jaXR5RGF0YS5idWZmZXIsIG1pbiwgbWF4XSwgW3ZlbG9jaXR5RGF0YS5idWZmZXJdKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgfSk7CiAgICB9KTsKfSk7Cgo=', 'data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YVByb2Nlc3NlLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwic3JjL3V0aWxzL2NvbW1vbi50cyIsInNyYy93b3JrZXJzL0RhdGFQcm9jZXNzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gY2FsY01pbk1heChhcnJheTogbnVtYmVyW10pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgbGV0IG1pbiA9IEluZmluaXR5O1xuICBsZXQgbWF4ID0gSW5maW5pdHk7XG4gIC8vIEBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMzU0NDQ3Ni9ob3ctdG8tZmluZC1tYXgtYW5kLW1pbi1pbi1hcnJheS11c2luZy1taW5pbXVtLWNvbXBhcmlzb25zXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB2YWwgPSBhcnJheVtpXTtcblxuICAgIGlmIChtaW4gPT09IEluZmluaXR5KSB7XG4gICAgICBtaW4gPSB2YWw7XG4gICAgfSBlbHNlIGlmIChtYXggPT09IEluZmluaXR5KSB7XG4gICAgICBtYXggPSB2YWw7XG4gICAgICAvLyB1cGRhdGUgbWluIG1heFxuICAgICAgLy8gMS4gUGljayAyIGVsZW1lbnRzKGEsIGIpLCBjb21wYXJlIHRoZW0uIChzYXkgYSA+IGIpXG4gICAgICBtaW4gPSBNYXRoLm1pbihtaW4sIG1heCk7XG4gICAgICBtYXggPSBNYXRoLm1heChtaW4sIG1heCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIDIuIFVwZGF0ZSBtaW4gYnkgY29tcGFyaW5nIChtaW4sIGIpXG4gICAgICAvLyAzLiBVcGRhdGUgbWF4IGJ5IGNvbXBhcmluZyAobWF4LCBhKVxuICAgICAgbWluID0gTWF0aC5taW4odmFsLCBtaW4pO1xuICAgICAgbWF4ID0gTWF0aC5tYXgodmFsLCBtYXgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW21pbiwgbWF4XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRlKHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCAmJiB2YWwgIT09IG51bGwgJiYgIWlzTmFOKHZhbCk7XG59XG4iLCJpbXBvcnQgeyBjYWxjTWluTWF4IH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJztcblxuY29uc3QgY3R4OiBXb3JrZXIgPSBzZWxmIGFzIGFueTtcblxuY3R4LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBhc3luYyAoeyBkYXRhOiBwYXlsb2FkIH0pID0+IHtcbiAgY29uc3QgcmVuZGVyRm9ybSA9IHBheWxvYWRbMF07XG4gIGlmIChyZW5kZXJGb3JtID09PSAncmcnKSB7XG4gICAgY29uc3QgdURhdGEgPSBwYXlsb2FkWzFdO1xuICAgIGNvbnN0IHZEYXRhID0gcGF5bG9hZFsyXTtcbiAgICBjb25zdCBbdU1pbiwgdU1heF0gPSBjYWxjTWluTWF4KHVEYXRhKTtcbiAgICBjb25zdCBbdk1pbiwgdk1heF0gPSBjYWxjTWluTWF4KHZEYXRhKTtcbiAgICBjb25zdCB2ZWxvY2l0eURhdGEgPSBuZXcgVWludDhBcnJheSh1RGF0YS5sZW5ndGggKiA0KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByID0gMjU1ICogKHVEYXRhW2ldIC0gdU1pbikgLyAodU1heCAtIHVNaW4pO1xuICAgICAgY29uc3QgZyA9IDI1NSAqICh2RGF0YVtpXSAtIHZNaW4pIC8gKHZNYXggLSB2TWluKTtcbiAgICAgIHZlbG9jaXR5RGF0YS5zZXQoW3IsIGcsIDAsIDI1NV0sIGkgKiA0KTtcbiAgICB9XG5cbiAgICBjdHgucG9zdE1lc3NhZ2UoW3ZlbG9jaXR5RGF0YS5idWZmZXIsIHVNaW4sIHVNYXgsIHZNaW4sIHZNYXhdLCBbdmVsb2NpdHlEYXRhLmJ1ZmZlcl0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNpbmdsZURhdGEgPSBwYXlsb2FkWzFdO1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBjYWxjTWluTWF4KHNpbmdsZURhdGEpO1xuICAgIGNvbnN0IHZlbG9jaXR5RGF0YSA9IG5ldyBVaW50OEFycmF5KHNpbmdsZURhdGEubGVuZ3RoICogNCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaW5nbGVEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByID0gMjU1ICogKHNpbmdsZURhdGFbaV0gLSBtaW4pIC8gKG1heCAtIG1pbik7XG4gICAgICB2ZWxvY2l0eURhdGEuc2V0KFtyLCAwLCAwLCAyNTVdLCBpICogNCk7XG4gICAgfVxuXG4gICAgY3R4LnBvc3RNZXNzYWdlKFt2ZWxvY2l0eURhdGEuYnVmZmVyLCBtaW4sIG1heF0sIFt2ZWxvY2l0eURhdGEuYnVmZmVyXSk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLEFBb0RBO0FBQ0EsQUFBTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7SUFDekQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO1FBQ3ZELFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDM0YsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzlGLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO1FBQy9JLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN6RSxDQUFDLENBQUM7Q0FDTjs7QUFFRCxBQUFPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDdkMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqSCxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6SixTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNsRSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDZCxJQUFJLENBQUMsSUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLEdBQUM7UUFDOUQsT0FBTyxDQUFDLElBQUUsSUFBSTtZQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFFLE9BQU8sQ0FBQyxHQUFDO1lBQzdKLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUM7WUFDeEMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNULEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07Z0JBQzlCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFDeEQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDakQsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztnQkFDakQ7b0JBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtvQkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7b0JBQ25FLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUM7b0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO2FBQzlCO1lBQ0QsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUU7UUFDMUQsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNwRjtDQUNKOztTQ3RHZSxVQUFVLENBQUMsS0FBZTtJQUN4QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUM7SUFDbkIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDOztJQUVuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckIsSUFBSSxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ3BCLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDWDthQUFNLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixHQUFHLEdBQUcsR0FBRyxDQUFDOzs7WUFHVixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO2FBQU07OztZQUdMLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDRjtJQUNELE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDbkI7O0FDckJELElBQU0sR0FBRyxHQUFXLElBQVcsQ0FBQztBQUVoQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQU8sRUFBaUI7UUFBZixpQkFBYTs7OztZQUM5QyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDakIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBZSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQS9CLElBQUksUUFBQSxFQUFFLElBQUksUUFBQSxDQUFzQjtnQkFDakMsS0FBZSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQS9CLElBQUksUUFBQSxFQUFFLElBQUksUUFBQSxDQUFzQjtnQkFDakMsWUFBWSxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0IsQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUM1QyxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ2xELFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDO2dCQUVELEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDdkY7aUJBQU07Z0JBQ0MsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBYSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQWxDLEdBQUcsUUFBQSxFQUFFLEdBQUcsUUFBQSxDQUEyQjtnQkFDcEMsWUFBWSxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDcEMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN6QztnQkFFRCxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN6RTs7OztDQUNGLENBQUMsQ0FBQyJ9', false);

/* eslint-enable */

function checkUVData(data) {
  return isNumber$1(data.uMin) && isNumber$1(data.uMax) && isNumber$1(data.vMin) && isNumber$1(data.vMax);
}

function checkData(data) {
  return isNumber$1(data.min) && isNumber$1(data.max);
}

var ScalarFill = /** @class */ (function () {
  function ScalarFill(gl, options) {
    if (options === void 0) {
      options = {};
    }
    this.gl = gl;
    if (!this.gl) {
      throw new Error('initialize error');
    }
    this.styleSpec = {
      'fill-color': {
        type: 'color',
        "default": [
          'interpolate',
          ['linear'],
          ['get', 'value'],
          0.0,
          '#3288bd',
          10,
          '#66c2a5',
          20,
          '#abdda4',
          30,
          '#e6f598',
          40,
          '#fee08b',
          50,
          '#fdae61',
          60,
          '#f46d43',
          100.0,
          '#d53e4f'],
        doc: 'The color of each pixel of this layer',
        expression: {
          interpolated: true,
          parameters: ['zoom', 'feature']
        },
        'property-type': 'data-driven'
      },
      'opacity': {
        type: 'number',
        "default": 1,
        minimum: 0,
        maximum: 1,
        transition: true,
        expression: {
          interpolated: true,
          parameters: ['zoom']
        },
        'property-type': 'data-constant'
      }
    };
    this.zoomUpdatable = {};
    this.options = options;
    this.opacity = this.options.opacity || 1;
  }

  ScalarFill.prototype.updateOptions = function (options) {
    var _this = this;
    if (options === void 0) {
      options = {};
    }
    this.options = Object.assign({}, this.options, options);
    Object.keys(this.styleSpec).forEach(function (spec) {
      _this.setProperty(spec, _this.options.styleSpec[spec] || _this.styleSpec[spec]["default"]);
    });
  };
  ScalarFill.prototype.setProperty = function (prop, value) {
    var spec = this.styleSpec[prop];
    if (!spec) {
      return;
    }
    var expr = expression$1.createPropertyExpression(value, spec);
    if (expr.result === 'success') {
      switch (expr.value.kind) {
        case 'camera':
        case 'composite':
          // eslint-disable-next-line no-return-assign
          return (this.zoomUpdatable[prop] = expr.value);
        default:
          return this.setPropertyValue(prop, expr.value);
      }
    } else {
      throw new Error(expr.value);
    }
  };
  ScalarFill.prototype.setPropertyValue = function (prop, value) {
    var name = prop
      .split('-')
      .map(function (a) {
        return a[0].toUpperCase() + a.slice(1);
      })
      .join('');
    var setterName = "set" + name;
    if (this[setterName]) {
      this[setterName](value);
    } else if (typeof this.options.getZoom === 'function') {
      this[name[0].toLowerCase() + name.slice(1)] = value.evaluate({
        zoom: this.options.getZoom()
      });
    }
  };
  ScalarFill.prototype.setFillColor = function (expr) {
    this.buildColorRamp(expr);
  };
  ScalarFill.prototype.handleZoom = function () {
    var _this = this;
    Object.entries(this.zoomUpdatable).forEach(function (_a) {
      var k = _a[0], v = _a[1];
      _this.setPropertyValue(k, v);
    });
  };
  ScalarFill.prototype.buildColorRamp = function (expr) {
    var colors = new Uint8Array(256 * 4);
    var range = 1;
    if (expr.kind === 'source' || expr.kind === 'composite') {
      if (this.options.renderForm === 'rg' && checkUVData(this.data)) {
        // @ts-ignore
        var u = this.data.uMax - this.data.uMin;
        // @ts-ignore
        var v = this.data.vMax - this.data.vMin;
        range = Math.sqrt(u * u + v * v);
      } else if (this.options.renderForm === 'r' && checkData(this.data)) {
        // @ts-ignore
        range = this.data.max - this.data.min;
      } else {
        // console.warn('This type is not supported temporarily');
      }
    }
    for (var i = 0; i < 256; i++) {
      var expression_1 = expr.kind === 'constant' || expr.kind === 'source' ? {} : (typeof this.options.getZoom === 'function' ? {
        zoom: this.options.getZoom()
      } : {});
      var color = expr.evaluate(expression_1, {properties: {value: (i / 255) * range}});
      colors[i * 4 + 0] = color.r * 255;
      colors[i * 4 + 1] = color.g * 255;
      colors[i * 4 + 2] = color.b * 255;
      colors[i * 4 + 3] = color.a * 255;
    }
    this.colorRampTexture = createTexture(this.gl, this.gl.LINEAR, colors, 16, 16);
  };
  ScalarFill.prototype.initialize = function (gl) {
    var _this = this;
    if (!this.drawCommand) {
      if (this.options.renderForm === 'rg') {
        this.drawCommand = new WindFill(gl);
      } else if (this.options.renderForm === 'r') {
        this.drawCommand = new Fill(gl);
      } else {
        // console.warn('This type is not supported temporarily');
      }
    }
    // This will initialize the default values
    Object.keys(this.styleSpec).forEach(function (spec) {
      _this.setProperty(spec, _this.options.styleSpec[spec] || _this.styleSpec[spec]["default"]);
    });
  };
  ScalarFill.prototype.getTextureData = function (data) {
    var _this = this;
    return new Promise((function (resolve, reject) {
      if (data.type === 'image' && data.url) {
        loadImage(data.url)
          .then(function (image) {
            var pos = __spreadArrays$1(
              _this.getMercatorCoordinate(data.extent[0]),
              _this.getMercatorCoordinate(data.extent[1]),
              _this.getMercatorCoordinate(data.extent[2]),
              _this.getMercatorCoordinate(data.extent[2]),
              _this.getMercatorCoordinate(data.extent[1]),
              _this.getMercatorCoordinate(data.extent[3]));
            var processedData = {
              width: image.width,
              height: image.height,
              quadBuffer: createBuffer(_this.gl, new Float32Array(pos)),
              texCoordBuffer: createBuffer(_this.gl, new Float32Array([
                0.0, 0.0,
                0.0, 1.0,
                1.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0])),
              // texture: this.regl.texture({
              //   mag: 'linear',
              //   min: 'linear',
              //   data: new Uint8Array(velocityData),
              //   width: uData.header.nx,
              //   height: uData.header.ny,
              //   wrapS: 'clamp',
              //   wrapT: 'clamp',
              //   format: 'rgba',
              //   type: 'uint8',
              // }),
              texture: createTexture(_this.gl, _this.gl.LINEAR, image, image.width, image.height)
            };
            if (_this.options.renderForm === 'rg') {
              processedData.uMin = data.uMin;
              processedData.uMax = data.uMax;
              processedData.vMin = data.vMin;
              processedData.vMax = data.vMax;
            } else if (_this.options.renderForm === 'r') {
              processedData.min = data.min;
              processedData.max = data.max;
            } else {
              // console.warn('This type is not supported temporarily');
            }
            resolve(processedData);
          })["catch"](function (error) {
          return reject(error);
        });
      } else if (data.type === 'jsonArray' && data.data) {
        var gfsData = data.data;
        var pos = void 0;
        if (data.extent) { // tip: fix extent
          pos = __spreadArrays$1(_this.getMercatorCoordinate(data.extent[0]), _this.getMercatorCoordinate(data.extent[1]), _this.getMercatorCoordinate(data.extent[2]), _this.getMercatorCoordinate(data.extent[2]), _this.getMercatorCoordinate(data.extent[1]), _this.getMercatorCoordinate(data.extent[3]));
        } else {
          pos = __spreadArrays$1(_this.getMercatorCoordinate([gfsData[0].header.lo1, gfsData[0].header.la1]), _this.getMercatorCoordinate([gfsData[0].header.lo1, gfsData[0].header.la2]), _this.getMercatorCoordinate([gfsData[0].header.lo2, gfsData[0].header.la1]), _this.getMercatorCoordinate([gfsData[0].header.lo2, gfsData[0].header.la1]), _this.getMercatorCoordinate([gfsData[0].header.lo1, gfsData[0].header.la2]), _this.getMercatorCoordinate([gfsData[0].header.lo2, gfsData[0].header.la2]));
        }
        var processedData_1 = {
          width: gfsData[0].header.nx,
          height: gfsData[0].header.ny,
          quadBuffer: createBuffer(_this.gl, new Float32Array(pos)),
          texCoordBuffer: createBuffer(_this.gl, new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0]))
        };
        // const velocityData = new Uint8Array(gfsData[0].data.length * 4);
        if (!_this.worker) {
          _this.worker = new WorkerFactory();
          _this.worker.addEventListener('message', function (_a) {
            var payload = _a.data;
            if (_this.options.renderForm === 'rg') {
              processedData_1.uMin = payload[1];
              processedData_1.uMax = payload[2];
              processedData_1.vMin = payload[3];
              processedData_1.vMax = payload[4];
              processedData_1.texture = createTexture(_this.gl, _this.gl.LINEAR, new Uint8Array(payload[0]), processedData_1.width, processedData_1.height);
            } else if (_this.options.renderForm === 'r') {
              processedData_1.min = payload[1];
              processedData_1.max = payload[2];
              processedData_1.texture = createTexture(_this.gl, _this.gl.LINEAR, new Uint8Array(payload[0]), processedData_1.width, processedData_1.height);
            } else {
              // console.warn('This type is not supported temporarily');
            }
            resolve(processedData_1);
          });
        }
        if (_this.options.renderForm === 'rg') {
          var uComp_1;
          var vComp_1;
          // if (("development" as string) === ('development' as string)) {
          //   console.time('format-data');
          // }
          gfsData.forEach(function (record) {
            switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
              case "1,2":
              case "2,2":
                uComp_1 = record;
                break;
              case "1,3":
              case "2,3":
                vComp_1 = record;
                break;
            }
          });
          // @ts-ignore
          var u = new Float32Array(uComp_1.data);
          // @ts-ignore
          var v = new Float32Array(vComp_1.data);
          _this.worker.postMessage(['rg', u, v]); // TIP: 需要确定transfer是否支持多个
        } else if (_this.options.renderForm === 'r') {
          // processedData.min = data.min;
          // processedData.max = data.max;
          var singleData = new Float32Array(gfsData[0].data);
          _this.worker.postMessage(['r', singleData]);
        } else {
          // console.warn('This type is not supported temporarily');
        }
      }
    }));
  };
  ScalarFill.prototype.setData = function (data, cb) {
    var _this = this;
    if (this.gl && data) { // Error Prevention
      this.getTextureData(data)
        .then(function (data) {
          _this.data = data;
          cb && cb(true);
          if (_this.data) {
            _this.initialize(_this.gl);
          }
          if (_this.options.triggerRepaint) {
            _this.handleZoom();
            _this.options.triggerRepaint();
          }
        })["catch"](function (error) {
        cb && cb(false);
        console.error(error);
      });
    }
  };
  ScalarFill.prototype.getData = function () {
    return this.data;
  };
  ScalarFill.prototype.getMercatorCoordinate = function (_a) {
    var lng = _a[0], lat = _a[1];
    return [lng, lat];
  };
  ScalarFill.prototype.prerender = function () {
  };
  ScalarFill.prototype.render = function (matrix, offset) {
    if (this.data && this.drawCommand && this.data.texture && this.colorRampTexture) {
      var opacity = this.opacity;
      var uniforms = {
        u_opacity: isNumber$1(opacity) ? opacity : 1,
        u_image_res: [this.data.width, this.data.height],
        u_matrix: matrix,
        u_dateline_offset: isNumber$1(offset) ? offset : 0,
        u_color_ramp: this.colorRampTexture
      };
      if (this.options.renderForm === 'rg') {
        uniforms.u_wind_min = [this.data.uMin, this.data.vMin];
        uniforms.u_wind_max = [this.data.uMax, this.data.vMax];
        uniforms.u_wind = this.data.texture;
      } else if (this.options.renderForm === 'r') {
        uniforms.u_range = [this.data.min, this.data.max];
        uniforms.u_image = this.data.texture;
      } else {
        // console.warn('This type is not supported temporarily');
      }
      this.drawCommand
        .active()
        // .resize()
        .setUniforms(uniforms)
        .setAttributes({
          a_position: {
            buffer: this.data.quadBuffer,
            numComponents: 2
          },
          a_texCoord: {
            buffer: this.data.texCoordBuffer,
            numComponents: 2
          }
        })
        .runTimes(6)
        .draw();
    }
  };
  ScalarFill.prototype.postrender = function () {
  };
  return ScalarFill;
}());

// form: https://github.com/openlayers/openlayers/blob/master/src/ol/extent.js
function containsCoordinate(extent, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}

function getWidth(extent) {
  return extent[2] - extent[0];
}

// function calcWhichView(map: any) {
//   const projObject = map.getProjection().fullExtent;
//   const projectionExtent = [projObject.left, projObject.bottom, projObject.right, projObject.top] as Extent;
//   const projExtent = map.getProjExtent();
//   const extent = [projExtent.xmin, projExtent.ymin, projExtent.xmax, projExtent.ymax];
//   let startX = extent[0];
//   const worldWidth = getWidth(projectionExtent);
//   let world = 0;
//   let offsetX;
//   while (startX < projectionExtent[0]) {
//     --world;
//     offsetX = worldWidth * world;
//     console.log('-', world);
//     startX += worldWidth;
//   }
//   world = 0;
//   startX = extent[2];
//   while (startX > projectionExtent[2]) {
//     ++world;
//     offsetX = worldWidth * world;
//     console.log('+', world);
//     startX -= worldWidth;
//   }
// }
function transform(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;
  if (output === undefined) {
    if (dimension > 2) {
      // preserve values beyond second dimension
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (var i = 0; i < length; i += dimension) {
    output[i] = (180 * input[i]) / 20037508.342789244;
    output[i + 1] =
      (360 * Math.atan(Math.exp(input[i + 1] / 6378137))) / Math.PI - 90;
  }
  return output;
}

function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = minX;
    opt_extent[1] = minY;
    opt_extent[2] = maxX;
    opt_extent[3] = maxY;
    return opt_extent;
  } else {
    return [minX, minY, maxX, maxY];
  }
}

function boundingExtentXYs(xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}

function applyTransform(extent, transformFn, opt_extent, opt_stops) {
  var coordinates = [];
  if (opt_stops > 1) {
    var width = extent[2] - extent[0];
    var height = extent[3] - extent[1];
    for (var i = 0; i < opt_stops; ++i) {
      coordinates.push(extent[0] + (width * i) / opt_stops, extent[1], extent[2], extent[1] + (height * i) / opt_stops, extent[2] - (width * i) / opt_stops, extent[3], extent[0], extent[3] - (height * i) / opt_stops);
    }
  } else {
    coordinates = [
      extent[0],
      extent[1],
      extent[2],
      extent[1],
      extent[2],
      extent[3],
      extent[0],
      extent[3]];
  }
  transformFn(coordinates, coordinates, 2);
  var xs = [];
  var ys = [];
  for (var i = 0, l = coordinates.length; i < l; i += 2) {
    xs.push(coordinates[i]);
    ys.push(coordinates[i + 1]);
  }
  return boundingExtentXYs(xs, ys, opt_extent);
}

function transformExtent(extent, opt_stops) {
  return applyTransform(extent, transform, undefined, opt_stops);
}

//# sourceMappingURL=utils.js.map

var _options = {
  renderer: 'gl',
  doubleBuffer: false,
  animation: false,
  glOptions: {
    antialias: true,
    depth: true,
    stencil: true,
    alpha: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: true
  }
};
var ScalarLayerRenderer = /** @class */ (function (_super) {
  __extends(ScalarLayerRenderer, _super);

  function ScalarLayerRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ScalarLayerRenderer.prototype.checkResources = function () {
    return [];
  };
  ScalarLayerRenderer.prototype.getDrawParams = function () {
    return [];
  };
  ScalarLayerRenderer.prototype.hitDetect = function () {
    return false;
  };
  ScalarLayerRenderer.prototype.draw = function () {
    this.prepareCanvas();
    this.prepareDrawContext();
    this.drawWind();
  };
  ScalarLayerRenderer.prototype._redraw = function () {
    this.prepareRender();
    this.draw();
  };
  ScalarLayerRenderer.prototype.clearCanvas = function () {
    if (this.gl) {
      clearScene(this.gl, [0, 0, 0, 0]);
    }
  };
  ScalarLayerRenderer.prototype.createContext = function () {
    if (this.gl && this.gl.canvas === this.canvas) {
      return;
    }
    // @ts-ignore
    this.gl = getGlContext(this.canvas, this.layer.options.glOptions);
  };
  ScalarLayerRenderer.prototype.resizeCanvas = function (canvasSize) {
    if (this.canvas && this.gl) {
      var map = this.getMap();
      var retina = map.getDevicePixelRatio();
      var size = canvasSize || map.getSize();
      this.canvas.height = retina * size.height;
      this.canvas.width = retina * size.width;
      if (this.gl) {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  };
  ScalarLayerRenderer.prototype.getMatrix = function () {
    var map = this.getMap();
    // const extent = map._get2DExtent(map.getGLZoom());
    // const uMatrix = mat4.identity(new Float32Array(16));
    // mat4.translate(uMatrix, uMatrix, [extent.xmin, extent.ymax, 0]);
    // mat4.scale(uMatrix, uMatrix, [1, 1, 1]);
    // mat4.multiply(uMatrix, map.projViewMatrix, uMatrix);
    return map.projViewMatrix;
  };
  ScalarLayerRenderer.prototype.handleZoom = function () {
    if (this.scalarRender) {
      this.scalarRender.handleZoom();
    }
  };
  ScalarLayerRenderer.prototype.drawWind = function () {
    var _this = this;
    var map = this.getMap();
    if (this.gl !== null) {
      var layer = this.layer;
      var opt = layer.getOptions();
      var data = layer.getData();
      if (!this.scalarRender && map) {
        this.scalarRender = new ScalarFill(this.gl, {
          opacity: opt.opacity,
          renderForm: opt.renderForm,
          styleSpec: opt.styleSpec,
          getZoom: function () {
            return map.getZoom();
          },
          triggerRepaint: function () {
            _this._redraw();
          }
        });
        this.scalarRender.getMercatorCoordinate = function (_a) {
          var lng = _a[0], lat = _a[1];
          var coords = map.coordToPoint(new Coordinate(lng, lat), map.getSpatialReference() ? map.getSpatialReference().getMaxZoom() / 2 : null);
          return [
            coords.x,
            coords.y];
        };
        this.getMap().on('zoom', this.handleZoom, this);
        this.scalarRender.setData(data);
      }
      if (this.scalarRender) {
        var projObject = map.getProjection().fullExtent;
        var projectionExtent = [projObject.left, projObject.bottom, projObject.right, projObject.top];
        var projExtent = map.getProjExtent();
        var extent = [projExtent.xmin, projExtent.ymin, projExtent.xmax, projExtent.ymax];
        var startX = extent[0];
        var worldWidth = getWidth(projectionExtent);
        var world = 0;
        this.scalarRender.render(this.getMatrix(), 0);
        while (startX < projectionExtent[0]) {
          --world;
          this.scalarRender.render(this.getMatrix(), world);
          startX += worldWidth;
        }
        world = 0;
        startX = extent[2];
        while (startX > projectionExtent[2]) {
          ++world;
          this.scalarRender.render(this.getMatrix(), world);
          startX -= worldWidth;
        }
      }
    }
    this.completeRender();
  };
  ScalarLayerRenderer.prototype.drawOnInteracting = function () {
    this.draw();
  };
  ScalarLayerRenderer.prototype.onZoomStart = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    _super.prototype.onZoomStart.apply(this, args);
  };
  ScalarLayerRenderer.prototype.onZoomEnd = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    _super.prototype.onZoomEnd.apply(this, args);
  };
  ScalarLayerRenderer.prototype.onDragRotateStart = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    _super.prototype.onDragRotateStart.apply(this, args);
  };
  ScalarLayerRenderer.prototype.onDragRotateEnd = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    _super.prototype.onDragRotateEnd.apply(this, args);
  };
  ScalarLayerRenderer.prototype.onMoveStart = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    _super.prototype.onMoveStart.apply(this, args);
  };
  ScalarLayerRenderer.prototype.onMoveEnd = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    _super.prototype.onMoveEnd.apply(this, args);
  };
  // onResize() {}
  ScalarLayerRenderer.prototype.remove = function () {
    delete this._drawContext;
    _super.prototype.remove.call(this);
  };
  ScalarLayerRenderer.prototype.getMap = function () {
    return _super.prototype.getMap.call(this);
  };
  ScalarLayerRenderer.prototype.prepareCanvas = function () {
    return _super.prototype.prepareCanvas.call(this);
  };
  ScalarLayerRenderer.prototype.prepareDrawContext = function () {
    _super.prototype.prepareDrawContext.call(this);
  };
  ScalarLayerRenderer.prototype.prepareRender = function () {
    return _super.prototype.prepareRender.call(this);
  };
  ScalarLayerRenderer.prototype.completeRender = function () {
    return _super.prototype.completeRender.call(this);
  };
  return ScalarLayerRenderer;
}(renderer.CanvasLayerRenderer));
var ScalarLayer = /** @class */ (function (_super) {
  __extends(ScalarLayer, _super);

  function ScalarLayer(id, data, options) {
    var _this = _super.call(this, id, Object.assign({}, _options, options)) || this;
    _this.data = null;
    _this._map = null;
    if (data) {
      _this.setData(data);
    }
    return _this;
  }

  /**
   * get wind layer data
   */
  ScalarLayer.prototype.getData = function () {
    return this.data;
  };
  /**
   * set layer data
   * @param data
   * @returns {Promise<any>>}
   */
  ScalarLayer.prototype.setData = function (data) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      _this.data = data;
      var renderer = _this._getRenderer();
      if (_this.data && renderer && renderer.scalarRender) {
        renderer.scalarRender.setData(_this.data, function (status) {
          if (status) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        resolve(false);
      }
    });
  };
  ScalarLayer.prototype.setOptions = function (options) {
    this.options = Object.assign({}, this.options, options || {});
    var renderer = this._getRenderer();
    if (renderer && renderer.scalarRender) {
      renderer.scalarRender.updateOptions(this.options);
    }
  };
  ScalarLayer.prototype.getOptions = function () {
    return this.options || {};
  };
  ScalarLayer.prototype.draw = function () {
    if (this._getRenderer()) {
      this._getRenderer()._redraw();
    }
    return this;
  };
  ScalarLayer.prototype.prepareToDraw = function () {
    return [];
  };
  ScalarLayer.prototype.drawOnInteracting = function () {
    this.draw();
  };
  ScalarLayer.prototype._getRenderer = function () {
    return _super.prototype._getRenderer.call(this);
  };
  return ScalarLayer;
}(CanvasLayer));
// @ts-ignore
ScalarLayer.registerRenderer('gl', ScalarLayerRenderer);
//# sourceMappingURL=ScalarLayer.js.map

var _options$1 = {
  renderer: 'canvas',
  doubleBuffer: false,
  animation: false,
  windOptions: {}
};
var WindLayerRenderer = /** @class */ (function (_super) {
  __extends(WindLayerRenderer, _super);

  function WindLayerRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  WindLayerRenderer.prototype.checkResources = function () {
    return [];
  };
  WindLayerRenderer.prototype.getDrawParams = function () {
    return [];
  };
  WindLayerRenderer.prototype.hitDetect = function () {
    return false;
  };
  WindLayerRenderer.prototype.draw = function () {
    this.prepareCanvas();
    this.prepareDrawContext();
    this.drawWind();
  };
  WindLayerRenderer.prototype._redraw = function () {
    this.prepareRender();
    this.draw();
  };
  WindLayerRenderer.prototype.drawWind = function () {
    var _this = this;
    var map = this.getMap();
    if (this.context) {
      var layer = this.layer;
      var opt = layer.getWindOptions();
      if (!this.wind && map) {
        var data = layer.getData();
        this.wind = new BaseLayer(this.context, opt, data);
        this.wind.project = this.project.bind(this);
        this.wind.unproject = this.unproject.bind(this);
        this.wind.intersectsCoordinate = this.intersectsCoordinate.bind(this);
        this.wind.postrender = function () {
          // @ts-ignore
          _this.setCanvasUpdated();
        };
        this.wind.prerender();
      }
      if (this.wind) {
        this.wind.prerender();
        this.wind.render();
      }
    }
    this.completeRender();
  };
  WindLayerRenderer.prototype.project = function (coordinate) {
    var map = this.getMap();
    var pixel = map.coordinateToContainerPoint(new Coordinate(coordinate[0], coordinate[1]));
    return [
      pixel.x,
      pixel.y];
  };
  WindLayerRenderer.prototype.unproject = function (pixel) {
    var map = this.getMap();
    var coordinates = map.containerPointToCoordinate(new Point(pixel[0], pixel[1]));
    return coordinates.toArray();
  };
  WindLayerRenderer.prototype.intersectsCoordinate = function (coordinate) {
    var _a;
    // FIXME: 临时处理
    if (!this.layer) {
      return false;
    }
    var proj = (_a = this.layer) === null || _a === void 0 ? void 0 : _a.getProjection();
    if (proj && proj.code !== 'EPSG:3857') {
      return true;
    }
    var map = this.getMap();
    var projExtent = map.getProjExtent();
    var extent = [projExtent.xmin, projExtent.ymin, projExtent.xmax, projExtent.ymax];
    var mapExtent = transformExtent(extent, 0);
    return containsCoordinate(mapExtent, [coordinate[0], coordinate[1]]);
    // return true;
  };
  WindLayerRenderer.prototype.drawOnInteracting = function () {
    // this.draw();
  };
  WindLayerRenderer.prototype.onZoomStart = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    if (this.wind) {
      this.wind.stop();
    }
    _super.prototype.onZoomStart.apply(this, args);
  };
  WindLayerRenderer.prototype.onZoomEnd = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    if (this.wind) {
      this.wind.start();
    }
    _super.prototype.onZoomEnd.apply(this, args);
  };
  WindLayerRenderer.prototype.onDragRotateStart = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    if (this.wind) {
      this.wind.stop();
    }
    _super.prototype.onDragRotateStart.apply(this, args);
  };
  WindLayerRenderer.prototype.onDragRotateEnd = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    if (this.wind) {
      this.wind.start();
    }
    _super.prototype.onDragRotateEnd.apply(this, args);
  };
  WindLayerRenderer.prototype.onMoveStart = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    if (this.wind) {
      this.wind.stop();
    }
    _super.prototype.onMoveStart.apply(this, args);
  };
  WindLayerRenderer.prototype.onMoveEnd = function () {
    var arguments$1 = arguments;

    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    if (this.wind) {
      this.wind.start();
    }
    _super.prototype.onMoveEnd.apply(this, args);
  };
  // onResize() {}
  WindLayerRenderer.prototype.remove = function () {
    if (this.wind) {
      this.wind.stop();
    }
    delete this._drawContext;
    _super.prototype.remove.call(this);
  };
  WindLayerRenderer.prototype.getMap = function () {
    return _super.prototype.getMap.call(this);
  };
  WindLayerRenderer.prototype.prepareCanvas = function () {
    return _super.prototype.prepareCanvas.call(this);
  };
  WindLayerRenderer.prototype.prepareDrawContext = function () {
    _super.prototype.prepareDrawContext.call(this);
  };
  WindLayerRenderer.prototype.prepareRender = function () {
    return _super.prototype.prepareRender.call(this);
  };
  WindLayerRenderer.prototype.completeRender = function () {
    return _super.prototype.completeRender.call(this);
  };
  return WindLayerRenderer;
}(renderer.CanvasLayerRenderer));
var MaptalksWind = /** @class */ (function (_super) {
  __extends(MaptalksWind, _super);

  function MaptalksWind(id, data, options) {
    var _this = _super.call(this, id, assign({}, _options$1, options)) || this;
    _this.field = null;
    _this._map = null;
    _this.pickWindOptions();
    if (data) {
      _this.setData(data);
    }
    return _this;
  }

  // onAdd() {}
  // onRemove() {}
  MaptalksWind.prototype.pickWindOptions = function () {
    var _this = this;
    Object.keys(defaultOptions).forEach(function (key) {
      if (key in _this.options) {
        if (_this.options.windOptions === undefined) {
          _this.options.windOptions = {};
        }
        // @ts-ignore
        _this.options.windOptions[key] = _this.options[key];
      }
    });
  };
  /**
   * get wind layer data
   */
  MaptalksWind.prototype.getData = function () {
    return this.field;
  };

  /**
   * get wind layer point data
   */
  MaptalksWind.prototype.pointData = function (lon, lat) {
    return this.field.interpolatedValueAt(lon, lat);
  };

  /**
   * set layer data
   * @param data
   * @returns {WindLayer}
   */
  MaptalksWind.prototype.setData = function (data) {
    if (data && data.checkFields && data.checkFields()) {
      this.field = data;
    } else if (isArray(data)) {
      this.field = formatData(data);
    } else {
      console.error('Illegal data');
    }
    var renderer = this._getRenderer();
    if (renderer && renderer.wind) {
      renderer.wind.updateData(this.field);
    }
    return this;
  };
  MaptalksWind.prototype.updateParams = function (options) {
    if (options === void 0) {
      options = {};
    }
    warnLog('will move to setWindOptions');
    this.setWindOptions(options);
    return this;
  };
  MaptalksWind.prototype.getParams = function () {
    warnLog('will move to getWindOptions');
    return this.getWindOptions();
  };
  MaptalksWind.prototype.setWindOptions = function (options) {
    var beforeOptions = this.options.windOptions || {};
    this.options = assign(this.options, {
      windOptions: assign(beforeOptions, options || {})
    });
    var renderer = this._getRenderer();
    if (renderer && renderer.wind) {
      var windOptions = this.options.windOptions;
      renderer.wind.setOptions(windOptions);
    }
  };
  MaptalksWind.prototype.getWindOptions = function () {
    return this.options.windOptions || {};
  };
  MaptalksWind.prototype.draw = function () {
    if (this._getRenderer()) {
      this._getRenderer()._redraw();
    }
    return this;
  };
  MaptalksWind.prototype.prepareToDraw = function () {
    return [];
  };
  MaptalksWind.prototype.drawOnInteracting = function () {
    this.draw();
  };
  MaptalksWind.prototype._getRenderer = function () {
    return _super.prototype._getRenderer.call(this);
  };
  return MaptalksWind;
}(CanvasLayer));
// @ts-ignore
MaptalksWind.registerRenderer('canvas', WindLayerRenderer);
var WindLayer = MaptalksWind;
//# sourceMappingURL=index.js.map

export default MaptalksWind;
export {Field, ScalarLayer, ScalarLayerRenderer, WindLayer, WindLayerRenderer};
//# sourceMappingURL=maptalks-wind.esm.js.map

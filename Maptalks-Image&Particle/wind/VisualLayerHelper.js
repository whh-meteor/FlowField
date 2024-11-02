/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||j|| -q- ||h||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑                 永无BUG
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
/**
 *  最后修改时间：2023-04-23
 *  确保有  maptalks-wind.esm和ScarField两个类
 */
import { WindLayer,ScalarLayer } from "./maptalks-wind.esm";
import ScarField from "./ScarField";
// import {particlesColorScale, imageColors} from "@/components/map/lib/colorOptions" //因为其他地方也要用，所以单独引用了，如果只有这里用，直接注掉这个引用，把末尾的两个声明放开即可


export default class VisualLayerHelper {
    constructor(map) {
        this.map = map;
    }
    
    /**
     * 添加粒子图层操作
     * 只会用4通道中的两个值r g，请保证数据在 rg通道，暂时不想支持指定通道 QHQ
     * layer 必传参数 url||particleUrl(和热力图同时加载的时候可以用particleUrl代替url，不用也没问题，后面把两个都分开了) valueRange
     * @param layerOpt pixelRange：像素值默认[0-255]；
     *                 valueRange：实际值范围，必填；
     *                 extent：经纬度范围，默认全球[-180,180，-90，90]；
     *                 url：请求地址；
     *                 zIndex：图层的z-index，控制图层顺序；
     *                 name:图层名；
     *                 type：类型，如wind、wave等;
     *                 opacity:图层透明度||1
     *                 rgbaFactor:[-0.0125,-0.0125,1,1]rgba权重，用来调整rgba参数，默认[1,1,1,1]。
     *                            想动态计算就传func，例子[{func:(val)=>{return val*2}},1,1,1]
     *                 particleOptions:{base:"",windOptions:{}} base:"row"、"col" 两种，一横一竖（分别代表海浪和风场）
     *                                                           windOptions:想改自己写了往里面传，想改哪个属性你就传哪一个，
     *                                                                     要不就根据类型匹配对应的，提供两种类型供选择
     * @param cb
     */
    async _addParticleByImage(layerOpt,cb = () => {
    }) {
        let _this = this;
        let {r,g,b,a,base} = await this._getValuesFromImage(
            layerOpt["particleUrl"] || layerOpt.url,
            layerOpt["pixelRange"] || [0,255],
            layerOpt.valueRange
        );
        // 确定rgba值
        let realRGBA = [r,g,b,a];
        if (layerOpt["rgbaFactor"]) {
            const rgbaFactor = layerOpt["rgbaFactor"];
            [r,g,b,a].forEach((value,index) => {
                realRGBA[index] =
                    typeof rgbaFactor[index] === "object"
                        ? value.map((item,i) => rgbaFactor[index].func(value[i],a[i]))
                        : value.map((item) => item * rgbaFactor[index]);
            });
        }
        [r,g,b,a] = realRGBA;
        // 确定精度
        let [precisionX,precisionY] = this._getPrecisionByImage(
            base,
            layerOpt["extent"]
        );
        // 参数 extent width  height precisionX precisionY min max
        let dataConfig = {
            extent: layerOpt["extent"] || [-180,-90,180,90],
            width: base[0],
            height: base[1],
            precisionY,
            precisionX,
        };
        // 配置风粒子场
        // console.log( "_getDataFromPng",_this._getDataFromPng(dataConfig, [r, g]))
        const layer = new WindLayer(
            layerOpt["name"] || `WindLayer_${Date.parse(new Date())}`,
            _this._getDataFromPng(dataConfig,[r,g]),
            {
                zIndex: layerOpt["zIndex"] || _this.map.getLayers().length + 1,
                windOptions: _this._getWindOptions(layerOpt["particleOptions"]),
            }
        );
        layer.setOpacity(layerOpt["opacity"] || 1).addTo(_this.map);
        this._handelCall(cb);
        return {
            particle: layer,
        };
    }
    
    /**
     * 颜色插值
     * 只支持RGB和RGBA，字母大小写无所谓，需保证start和end格式一致
     * @param start String  开始颜色  RGB(255,255,255)||RGBA(255,255,255,255)
     * @param end   String  结束颜色  RGB(0,0,0)||RGBA(0,0,0,0)
     * @param num   Integer 颜色数量（不含起始颜色），默认3
     */
    interpolationColors = (start,end,num = 3) => {
        const isRgba = start.includes('a') || start.includes('A')
        // 获取括号里面的数字
        const regex = /\((.+?)\)/g;
        const matchResults = [];
        [start,end].forEach(item => {
            const result = item.match(regex)[0]
            matchResults.push(result.substring(1,result.length - 1))
        })
        // 获取rgba值
        const rgbaList = []
        matchResults.forEach(item => {
            const temp = item.split(",").map(item => parseInt(item))
            rgbaList.push(temp)
        })
        // 计算r、g、b、a差
        let diffList = [
            rgbaList[1][0] - rgbaList[0][0],
            rgbaList[1][1] - rgbaList[0][1],
            rgbaList[1][2] - rgbaList[0][2]
        ]
        if (isRgba)
            diffList = [...diffList,...[rgbaList[1][3] - rgbaList[0][3]]]
        // 计算r、g、b、a插值步长
        const stepList = diffList.map(item => item / (num - 1))
        // 计算插值结果
        const result = [start]
        for (let i = 1; i < num - 1; i++) {
            const temp = stepList.map((item,index) =>
                Math.round(parseFloat(rgbaList[0][index]) + (item * i)))
            const color = `RGB${isRgba ? "A" : ""}(${temp.join()})`
            result.push(color)
        }
        result.push(end)
        return result
    }
    
    
    /**
     * 加载热力图 单通道
     * 重复的参数用途参考 _addParticleByImage
     * @param layerOpt  必传参数 url
     *                  type:类型，目前适配 wind、wave、prec、temp，默认wind。如果想自定义，
     *                  colors:[[值，[r,g,b,a]],[同上],[同上]]
     * @param cb
     * @private
     */
    async _addImage(layerOpt,cb = () => {
    }) {
        let colorList = [];
        const cs = [
            // "rgba(159,185,191,125)", // 0 0
            "rgba(159,185,191,255)", // 0.3  50
            "rgba(159,185,191,255)", // 0.3  50
            "rgba(100,185,191,255)", // 0.6 100
            "rgba(48,157,185,255)", // 0.6 100
            "rgba(48,98,141,255)", // 0.9
            "rgba(56,104,191,255)", // 1.2
            "rgba(57,60,142,255)", // 1.5
            "rgba(187,90,191,255)", // 1.5
            "rgba(154,48,151,255)", // 1.5
            "rgba(133,48,48,255)", // 1.5
            "rgba(191,51,95,255)", // 1.5
            "rgba(191,103,191,255)", // 1.5
            "rgba(191,191,191,255)", // 1.5
            "rgba(154,127,155,255)", // 1.5          
        ]

        for (let i = 1; i < cs.length; i++) {
            colorList = [...colorList,...this.interpolationColors(cs[i - 1],cs[i],10)]
        }
        const getColors = (type,min = 0,max = 1) => {
            // const step = (max - min) / color[type].length
            // return color[type].reduce((result, item, index) => result.concat(step * index, item), [])
            const step = (max - min) / colorList.length
            return colorList.reduce((result,item,index) => result.concat(step * index,item),[])
        }
        // console.log(getColors("water",0,1))
        if (layerOpt.extent) {
            const [x1,x2,y1,y2] = layerOpt.extent
            if (!layerOpt['rangeConfig']) layerOpt['rangeConfig'] = {}
            layerOpt.rangeConfig["extent"] = [[x1,y2],[x1,y1],[x2,y2],[x2,y1]]
        }
        if (layerOpt.valueRange) {
            const [min,max] = layerOpt.valueRange
            layerOpt.rangeConfig = {...layerOpt.rangeConfig,...{min,max}}
        }
        console.log("layerOpt",layerOpt.rangeConfig)
        const scalarLayer = new ScalarLayer(
            layerOpt["name"] || `ScalarLayer_${Date.parse(new Date())}`,
            this._getScalarConf(layerOpt.url,layerOpt["rangeConfig"] || {}),
            {
                zIndex: layerOpt["zIndex"] || this.map.getLayers().length + 1, //加载顺序
                // wrapX: true,
                renderForm: 'r',
                // widthSegments: 1920,
                // heightSegments: 1080,
                displayRange: [0,255],
                mappingRange: [1,255],//垂直拉伸
                wireframe: false,
                styleSpec: {
                    "fill-color": [
                        "interpolate",
                        ["linear"],
                        ["get","value"],
                        // ...this._getImageColorScale(
                        //   layerOpt["colors"] || layerOpt["type"] || "wind",
                        //   layerOpt["valueRange"]
                        // ),
                        ...getColors("water",0,1)
                    ],
                    opacity: [
                        "interpolate",
                        ["exponential",0.7],
                        ["zoom"],
                        5,
                        0.9,
                        8,
                        0.9,
                    ],
                },
                renderForm: layerOpt["dataFromRGBA"] || "r", //渲染通道默认为r
            }
        );
        scalarLayer.setOpacity(layerOpt["opacity"] || 1).addTo(this.map);
        // 添加field数据
        // 因为有缓存，所有连续请求两次也无伤打野
        let {r,g,b,a,base} = await this._getValuesFromImage(
            layerOpt.url,
            layerOpt["pixelRange"],
            layerOpt.valueRange
        );
        const extent = layerOpt["extent"] || [-180,180,-90,90];
        const [deltaX,deltaY] = this._getPrecisionByImage(base,extent);
        
        let obj = {
            xMin: extent[0],
            xMax: extent[1],
            yMin: extent[2],
            yMax: extent[3],
            scars: r,
            deltaX: deltaX,
            deltaY: deltaY,
        };
        console.log("kk",obj)
        this._handelCall(layerOpt["cb"] || cb);
        return {
            image: new ScarField(obj),
        };
    }
    
    /**
     * @description:  根据倍数锐化展示效果
     * @param sharpenOpt
     * @param cb
     */
    addCustomWindValToMap(sharpenOpt,cb = () => ({})) {
        const url = this.source.wind.replace(/wind/,"swind");
        // 获取节点长度
        const startNum = sharpenOpt["startNum"];
        const endNum = sharpenOpt["endNum"];
        const length = endNum - startNum;
        // 颜色等值线
        const differs = [
            0,
            102 / 3601,
            307 / 3601,
            515 / 3601,
            720 / 3601,
            875 / 3601,
            1080 / 3601,
            1286 / 3601,
            1492 / 3601,
            1698 / 3601,
            1903 / 3601,
            2109 / 3601,
            2418 / 3601,
            2675 / 3601,
            2881 / 3601,
            1,
        ];
        let colorsA = [];
        const colorsB = [
            [0,[98,113,183,255]],
            [1.02,[57,97,159,255]],
            [3.07,[74,148,169,255]],
            [5.15,[77,141,123,255]],
            [7.2,[83,165,83,255]],
            [8.75,[53,159,53,255]],
            [10.8,[167,157,81,255]],
            [12.86,[159,127,58,255]],
            [14.92,[161,108,92,255]],
            [16.98,[129,58,78,255]],
            [19.03,[175,80,136,255]],
            [21.09,[117,74,147,255]],
            [24.18,[109,97,163,255]],
            [26.75,[68,105,141,255]],
            [28.81,[92,144,152,255]],
            [36.01,[125,68,165,255]],
        ];
        if (!startNum || !endNum) {
            colorsA = colorsB;
        } else {
            // 根据起始点获取对应颜色集合colorsB
            for (let i = 0; i < differs.length; i++) {
                colorsA.push([startNum + differs[i] * length,colorsB[i][1]]);
            }
        }
        const color = {
            temp: colorsA,
        };
        // 颜色插值
        const tempInterpolateColor = color.temp.reduce(
            (result,item,key) =>
                result.concat(
                    ((item[0] + 30) * 255) / 60,
                    "rgba(" + item[1].join(",") + ")"
                ),
            []
        );
        const tempLayer = new ScalarLayer(
            "风场锐化",
            scalarConf(this.sourceType,url,0,255),
            {
                zIndex: 0,
                styleSpec: {
                    "fill-color": [
                        "interpolate",
                        ["linear"],
                        ["get","value"],
                        ...tempInterpolateColor,
                    ],
                    opacity: [
                        "interpolate",
                        ["exponential",0.9],
                        ["zoom"],
                        5,
                        0.9,
                        8,
                        0.9,
                    ],
                },
                renderForm: "r",
            }
        );
        tempLayer.setOpacity(1); //设置透明度
        tempLayer.addTo(this.map); //加载至地图
        cb();
    }
    
    /**
     * 获取风场参数
     * 默认返回风场的竖向粒子效果配置
     * @param opt base: row/col  windOptions:参考windLayer的windOptions配置，想改那个就配置哪个，没写的就参考base的属性
     * @returns {{frameRate: number, velocityScale: function(): *, maxAge: number, globalAlpha: number, paths: function(): *, colorScale: [string], lineWidth: number}|{frameRate: number, velocityScale: ((function(): *)|*), maxAge: number, globalAlpha: number, paths: (function()), colorScale: *}}
     * @private
     */
    _getWindOptions(opt) {
        // 返回默认值
        if (!opt) return this._getParticleOpt("col");
        // 如果采用基础配置,直接返回基础类型
        if (
            opt.hasOwnProperty("base") &&
            this._getParticleOpt(opt.base) &&
            !opt.hasOwnProperty("windOptions")
        )
            return this._getParticleOpt(opt.base);
        // 如果没有指定参考配置，则默认采用竖粒子配置（wind）
        let baseOpt = {...this._getParticleOpt(opt["base"] || "col")};
        if (!opt.hasOwnProperty("windOptions")) return baseOpt;
        // 根据配置修改对应属性
        Object.keys(opt.windOptions).forEach((key) => {
            if (baseOpt.hasOwnProperty(key)) baseOpt[key] = opt.windOptions[key];
        });
        return baseOpt;
    }
    
    _getValuesFromImage(src,initialRange = [0,255],mappingRange = [0,255]) {
        const mapped = initialRange && mappingRange;
        const mapping = (x,initialRange,mappingRange) => {
            return (
                ((mappingRange[1] - mappingRange[0]) * (x - initialRange[0])) /
                (initialRange[1] - initialRange[0]) +
                mappingRange[0]
            );
        };
        
        const parse = (image) => {
            let canvas = document.createElement("canvas");
            [canvas.width,canvas.height] = [image.width,image.height];
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image,0,0);
            let data = ctx.getImageData(0,0,image.width,image.height).data;
            
            let [r,g,b,a,base] = [[],[],[],[],[image.width,image.height]];
            for (let i = 0,len = data.length; i < len; i += 4) {
                let red = mapped
                        ? mapping(data[i],initialRange,mappingRange)
                        : data[i], //红色色深
                    green = mapped
                        ? mapping(data[i + 1],initialRange,mappingRange)
                        : data[i + 1], //绿色色深
                    blue = mapped
                        ? mapping(data[i + 2],initialRange,mappingRange)
                        : data[i + 2], //蓝色色深
                    alpha = mapped
                        ? mapping(data[i + 3],initialRange,mappingRange)
                        : data[i + 3]; //透明度
                r.push(red);
                g.push(green);
                b.push(blue);
                a.push(alpha);
            }
            return {r,g,b,a,base};
        };
        
        return new Promise(function (resolve,reject) {
            if (!src) reject("getRGBAFromImage error!url is null");
            let image = new Image();
            [image.crossOrigin,image.onload,image.onerror,image.src] = [
                "anonymous",
                () => {
                    return resolve(parse(image));
                },
                reject,
                src,
            ];
            if (image.complete) resolve(parse(image));
        });
    }
    
    _getScalarConf(url,rangeConfig) {
        if (!url) {
            console.error("url cant be Null!");
            return null;
        }
        return {
            type: rangeConfig["loadType"] || "image",
            url: url,
            extent: rangeConfig["extent"] || [
                [-180,90],
                [-180,-90],
                [180,90],
                [180,-90],
            ],
            width: rangeConfig["width"] || 360,
            height: rangeConfig["height"] || 180,
            min: rangeConfig["min"] || 0,
            max: rangeConfig["max"] || 255,
        };
    }
    
    /**
     * 获取插值参数
     * @param config 配置信息
     * @param singleChannelValues 单通道值
     * @returns {*}
     * @private
     */
    _getScarFieldConf(config,singleChannelValues) {
        let obj = {};
        // 处理通道数据
        if (!singleChannelValues) {
            console.error("通道数不能为空");
            return;
        } else obj["scars"] = singleChannelValues;
        // 处理数据范围
        obj["xMin"] = singleChannelValues["xMin"] || -180;
        obj["xMax"] = singleChannelValues["xMax"] || 180;
        obj["yMin"] = singleChannelValues["yMin"] || -90;
        obj["yMax"] = singleChannelValues["yMax"] || 90;
        // 处理精度
        // 默认经纬间隔是相同的，即为精度：维度=360:180=2:1
        let [precisionX,precisionY] = [1,1]; //默认为360*180 所以xy精度为1°
        try {
            if (config.hasOwnProperty("precision")) {
                [precisionX,precisionY] = [config.precision.x,config.precision.y];
            } else {
                // 求出精度
                const precision = this._getPrecisionByValues(singleChannelValues,[
                    obj["xMin"],
                    obj["xMax"],
                    obj["yMin"],
                    obj["yMax"],
                ]);
                [precisionX,precisionY] = [precision,precision];
            }
        } catch (e) {
            console.error("精度设置有误，请检查后重试！",e);
        }
        obj["deltaX"] = precisionX;
        obj["deltaY"] = precisionY;
        return obj;
    }
    
    /**
     * 通过单童集合和经纬度范围确定精度
     * @param values 单通道集合
     * @param xMin -180
     * @param xMax 180
     * @param yMin -90
     * @param yMax 90
     * @returns {number}
     * @private
     */
    _getPrecisionByValues(values,[xMin,xMax,yMin,yMax]) {
        return 1 / Math.sqrt(values.length / (yMax - yMin) / (xMax - xMin));
    }
    
    /**
     * 通过image确定精度
     * @param width image 宽度
     * @param height image 高度
     * @param extent [-180,180,-90,90]
     * @returns {number[]}
     * @private
     */
    _getPrecisionByImage([width,height],extent = null) {
        if (extent)
            return [
                (extent[1] - extent[0]) / width,
                (extent[3] - extent[2]) / height,
            ];
        else return [width / 360,height / 180];
    }
    
    /**
     *
     * @param params extent width  height precisionX precisionY min max
     * @param data1
     * @param data2
     * @returns {({data: *[], header: {}}|{data: [*], header: {}})[]}
     * @private
     */
    _getDataFromPng(params,[data1,data2]) {
        let rangeConfig = {};
        // 确定范围
        let extent = params["extent"];
        if (!params) extent = [-180,-90,180,90];
        [
            rangeConfig["lo1"],
            rangeConfig["lo2"],
            rangeConfig["la1"],
            rangeConfig["la2"],
        ] = extent;
        rangeConfig["extent"] = extent;
        //确定图片大小
        rangeConfig["nx"] = params["width"] || 360;
        rangeConfig["ny"] = params["height"] || 180;
        // 确定精度
        rangeConfig["dx"] = params["precisionX"] || 1;
        rangeConfig["dy"] = params["precisionY"] || 1;
        // 确定值的范围
        rangeConfig["min"] = params["min"] || -20;
        rangeConfig["max"] = params["max"] || 20;
        // 确定参数变量
        rangeConfig["parameterCategory"] = 1;
        rangeConfig["parameterNumber"] = 2; //data1 2 data2 是3
        const tempObj = {
            header: {...rangeConfig},
            data: [...data1],
        };
        
        let [obj1,obj2] = [tempObj,JSON.parse(JSON.stringify(tempObj))];
        obj2.header.parameterNumber = 3;
        obj2.data = [...data2];
        return [obj1,obj2]
    }
    
    /**
     * 获取颜色集合
     * @param type
     * @param min
     * @param max
     * @returns {null|*}
     * @private
     */
    _getImageColorScale(type,[min,max] = [0,255]) {
        if (type instanceof Array) {
            return type.reduce(
                (result,item) =>
                    result.concat(
                        ((item[0] - min) * 255) / (max - min),
                        "rgba(" + item[1].join(",") + ")"
                    ),
                []
            );
        } else {
            if (imageColors.hasOwnProperty(type)) {
                return imageColors[type].reduce(
                    (result,item) =>
                        result.concat(
                            ((item[0] - min) * 255) / (max - min),
                            "rgba(" + item[1].join(",") + ")"
                        ),
                    []
                );
            } else {
                console.error("色带配置有误！");
                return null;
            }
        }
    }
    
    /**
     * 处理回调
     * @param cb
     * @private
     */
    _handelCall(cb) {
        if (typeof cb === "function") cb();
    }
    
    /**
     * 添加所有至图层-私有
     * @param layerOpts
     * @private
     */
    async _addAllToMap(layerOpts) {
        let obj = {};
        if (layerOpts.hasOwnProperty("image")) {
            obj = {
                ...(await this._addImage(
                    {...layerOpts.image,...layerOpts["common"]},
                    layerOpts["cb"]
                )),
            };
        }
        if (layerOpts.hasOwnProperty("particle")) {
            return {
                ...obj,
                ...(await this._addParticleByImage(
                    {...layerOpts.particle,...layerOpts["common"]},
                    layerOpts["cb"]
                )),
            };
        }
        return obj;
    }
    
    /**
     * 添加所有至图层
     * @param layerOpts,{image:{ cb:()=>{}},particle:{cb:()=>{}},common:{}}  image 独有属性   particle 独有属性 common共有属性
     */
    addAllToMap(layerOpts) {
        return this._addAllToMap(layerOpts);
    }
    
    /**
     *
     * @param layerOpt
     * @param cb
     */
    async addParticleToMap(layerOpt,cb = null) {
        await this._addParticleByImage(layerOpt,cb);
    }
    
    /**
     *
     * @param layerOpt
     * @param cb
     */
    async addImageToMap(layerOpt,cb = null) {
        await this._addImage(layerOpt,cb);
    }
    
    /**
     * 获取粒子配置
     * @param type row 横着的 通常用在浪上面  col 竖着的 ，常用粒子
     * @returns {*}
     * @private
     */
    _getParticleOpt(type) {
        const types = {
            col: {
                colorScale: particlesColorScale["wind"],
                velocityScale: () => {
                    if (this.map.getZoom() < 5)
                        return 1 / (200 - 60 * (5 - this.map.getZoom()));
                    else if (this.map.getZoom() >= 5 && this.map.getZoom() < 14)
                        return Math.pow(2,18 - this.map.getZoom()) / 1628400;
                    else return Math.pow(2,19 - this.map.getZoom()) / 1800000;
                },
                // velocityScale: () => {
                //   if (this.map.getZoom() < 5)
                //     return 1 / (200 - 60 * (5 - this.map.getZoom()));
                //   else if (this.map.getZoom() >= 5 && this.map.getZoom() < 14)
                //     return Math.pow(2, 18 - this.map.getZoom()) / 1400;
                //   else return Math.pow(2, 19 - this.map.getZoom()) / 1600000;
                // },
                frameRate: 40,
                maxAge: 60,
                globalAlpha: 0.86,
                paths: () => {
                    return 40000 / (Math.pow(this.map.getZoom(),2) / 4);
                },
            },
            row: {
                colorScale: ["rgb(255,255,255)"],
                velocityScale: () => {
                    const zoom = this.map.getZoom();
                    let val = zoom < 5 ? zoom * 10 - 10 : 360000 / Math.pow(2,18 - zoom);
                    return 5 / val || 0.002;
                },
                frameRate: 30,
                maxAge: 20,
                lineWidth: 6,
                globalAlpha: 0.9,
                paths: () => {
                    return 16000 / (Math.pow(this.map.getZoom(),2) / 4);
                },
            },
        };
        return types[type];
    }
    
    /**
     * 获取颜色
     * @param type String 气象类型   wind  temp.....
     * @param valueRange ArrayList [min,max] 数值范围，用于将颜色匹配值数值范围内，默认为空，不处理
     */
    getColors(type,valueRange = null) {
        if (!valueRange) return imageColors[type];
        const [min,max] = valueRange;
        const length = max - min;
        const colorsTemp = imageColors[type];
        let colors = [];
        const [dataMin,dataMax] = [
            colorsTemp[0][0],
            colorsTemp[colorsTemp.length - 1][0],
        ];
        const dataLength = dataMax - dataMin;
        // 根据起始点获取对应颜色集合colorsB
        colorsTemp.forEach((item,index) => {
            colors.push([min + (item[0] * length) / dataLength,item[1]]);
        });
        return colors;
    }
}
const particlesColorScale = {
    wind: [
        "rgb(36,104, 180)",
        "rgb(60,157, 194)",
        "rgb(128,205,193 )",
        "rgb(151,218,168 )",
        "rgb(198,231,181)",
        "rgb(238,247,217)",
        "rgb(255,238,159)",
        "rgb(252,217,125)",
        "rgb(255,182,100)",
        "rgb(252,150,75)",
        "rgb(250,112,52)",
        "rgb(245,64,32)",
        "rgb(237,45,28)",
        "rgb(220,24,32)",
        "rgb(180,0,35)",
    ],
};
const imageColors = {
    wind: [
        [0,[98,113,183,255]],
        [1.02,[57,97,159,255]],
        [3.07,[74,148,169,255]],
        [5.15,[77,141,123,255]],
        [7.2,[83,165,83,255]],
        [8.75,[53,159,53,255]],
        [10.8,[167,157,81,255]],
        [12.86,[159,127,58,255]],
        [14.92,[161,108,92,255]],
        [16.98,[129,58,78,255]],
        [19.03,[175,80,136,255]],
        [21.09,[117,74,147,255]],
        [24.18,[109,97,163,255]],
        [26.75,[68,105,141,255]],
        [28.81,[92,144,152,255]],
        [36.01,[125,68,165,255]],
    ],
    temp: [
        [3.15,[115,70,105,255]],
        [18.15,[202,172,195,255]],
        [33.15,[162,70,195,255]],
        [48.15,[143,89,169,255]],
        [58.15,[157,219,217,255]],
        [65.15,[106,191,181,255]],
        [69.15,[100,166,189,255]],
        [73.15,[93,133,198,255]],
        [74.15,[68,125,99,255]],
        [83.15,[128,147,24,255]],
        [94.15,[243,183,4,255]],
        [103.15,[232,83,25,255]],
        [120.15,[71,14,0,255]],
    ],
    wave: [
        [0,[159,185,191,0]],
        [0.1,[159,185,191,255]],
        [0.5,[48,157,185,255]],
        [1,[48,98,141,255]],
        [1.5,[56,104,191,255]],
        [2,[57,60,142,255]],
        [2.5,[187,90,191,255]],
        [3,[154,48,151,255]],
        [4,[133,48,48,255]],
        [5,[191,51,95,255]],
        [7,[191,103,191,255]],
        [10,[191,191,191,255]],
        [12,[154,127,155,255]],
    ],
    prec: [
        [0,[231,34,34,0]],
        [127,[231,34,34,0]],
        [203,[231,34,34,255]],
        [218,[214,71,39,255]],
        [233,[208,118,30,255]],
        [248,[206,102,0,255]],
        [258,[217,164,18,255]],
        [265,[217,184,2,255]],
        [269,[217,204,0,255]],
        [273.15,[181,204,37,255]],
        [274,[107,204,111,255]],
        [283,[0,200,218,255]],
        [294,[88,177,224,255]],
        [303,[62,120,224,255]],
        [320,[0,93,224,255]],
    ],
    water: [
        [0,[159,185,191,0]],
        [0.01,[159,185,191,255]],
        [0.02,[48,157,185,255]],
        [0.03,[48,98,141,255]],
        [0.04,[56,104,191,255]],
        [0.05,[57,60,142,255]],
        [0.06,[187,90,191,255]],
        [0.07,[154,48,151,255]],
        [0.08,[133,48,48,255]],
        [0.09,[191,51,95,255]],
        [0.1,[191,103,191,255]],
        [1.5,[191,191,191,255]],
        [2,[154,127,155,255]]]
};

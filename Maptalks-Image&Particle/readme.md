# 图片生成热力图层和流场

## 调用

```javascript
 // 添加遮罩层

 var layerOpt = {

  particle: {

   name: 'wave',

   url: url,

   zIndex: -1,

   particleOptions: {

​    base: 'row',

​    windOptions: {

​     maxAge: 60

​    }

   }, // rgbaFactor: [{

   //   func: (r, a) => {

   //     return (a === -1 ? 0 : r)

   //   }

   // }, {

   //   func: (g, a) => {

   //     return (a === -1 ? 0 : g)

   //   }

   // }, 1, 1],

   // FIXME:后端有增减需要根据配置定义大小

   valueRange: [-1, 1]

  },

  image: {

   name: 'img',

   url: url,

   // url:'',

   zIndex: -2,

   // FIXME:后端有增减需要根据配置定义大小，后端有所增加需要根据增加变动

   valueRange: [0, 1] //[0,1]

  },

  common: {

   type: 'wave',

   extent: extent

   // extent: [

   //  117.59608771103133, 122.66046993411108, 37.100887583105624,

   //  40.88449613105921

   // ]

  }

 }
```

## new

```javascript
 var vas = new VisualLayerHelper(window.mapRes)
  vas.addAllToMap(layerOpt).then((res) => {
    const { particle, image } = res

    console.log(particle, image)
    weather.flow = particle //改
    window.mapRes.on('click', (e) => {
      updateWeatherPopup(e)
    })
    if (!vector.weather) {
      vector.weather = new maptalks.VectorLayer(
        '洋流弹窗'
        // $configs.layerConfig()
      ).addTo(window.mapRes)
    }
    // var meshjson = turf.dissolve(meshJson)
    // console.log(meshjson)
    // const [feature] = meshjson.features
    // particle.setMask(maptalks.GeoJSON.toGeometry(feature))
    // addMaskLayer(meshjson) //加入遮罩
  })
```


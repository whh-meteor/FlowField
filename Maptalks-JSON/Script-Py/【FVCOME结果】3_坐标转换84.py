import json
from pyproj import Proj, transform

# 定义高斯-克吕格投影（这里假设带号为30）
zone_number = 40
central_meridian = zone_number * 3  # 对于3度带，每个带的中央经线是带号乘以3

gauss_kruger = Proj(proj='tmerc', lat_0=0, lon_0=central_meridian, k=1, x_0=500000, y_0=0, ellps='WGS84', datum='WGS84')
wgs84 = Proj(proj='latlong', datum='WGS84')

# 读取GeoJSON文件
with open("./[HYYS]Data/PointJson.json", 'r') as f:
    geojson = json.load(f)

for feature in geojson["features"]:
    if feature["geometry"]["type"] == "Point":
        coordinates = feature["geometry"]["coordinates"]
      
                # 仅提取x和y坐标进行转换，忽略其他值（如z坐标）
        x, y = coordinates[:2]  # 只取前两个元素
        
        lon, lat = transform(gauss_kruger, wgs84, x, y)
        feature["geometry"]["coordinates"] = [lon, lat]


# 保存修改后的GeoJSON到文件
with open("./[HYYS]Data/PointJson_84.json", 'w') as f:
    json.dump(geojson, f, indent=2)

print("转换后的GeoJSON已保存为converted_geojson.json")

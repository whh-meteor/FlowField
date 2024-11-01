import numpy as np
import json
from osgeo import gdal
import os
import geopandas as gpd

# def generate_idw_raster_from_geojson(geojson_path, field, output_tif):
#     """从GeoJSON文件生成IDW插值的栅格文件。"""
#     gdf = gpd.read_file(geojson_path)
#     shapefile_path = os.path.join(os.path.dirname(output_tif), 'temp_shapefile.shp')
#     gdf.to_file(shapefile_path)
#     opts = gdal.GridOptions(
#         format="GTiff",
#         outputType=gdal.GDT_Float32,
#         algorithm=f"invdist:power=3.5:smoothing=0.0:radius=0.1:max_points=12:min_points=0:nodata=0.0",
#         zfield=field
#     )
#     gdal.Grid(destName=output_tif, srcDS=shapefile_path, options=opts)
#     for ext in ['.shp', '.shx', '.dbf', '.prj', '.cpg']:
#         os.remove(os.path.splitext(shapefile_path)[0] + ext)
#     print(f"IDW插值生成的GeoTIFF文件已保存到: {output_tif}")

def read_tif_data(tif_file):
    """读取TIF文件并返回其数据。"""
    dataset = gdal.Open(tif_file)
    band = dataset.GetRasterBand(1)
    data = band.ReadAsArray()
    geotransform = dataset.GetGeoTransform()
    return data, geotransform

def create_gdal_header(lat, lon, min_val, max_val, var_name, geotransform):
    """创建GDAL风格的JSON头部。"""
    header = {
        "la1": float(lat.min()),
        "la2": float(lat.max()),
        "lo1": float(lon.min()),
        "lo2": float(lon.max()),
        "extent": [float(lon.min()), float(lat.min()), float(lon.max()), float(lat.max())],
        "nx": len(lon),
        "ny": len(lat),
        "dx": float(geotransform[1]),
        "dy": float(-geotransform[5]),
        "min": float(min_val),
        "max": float(max_val),
        "GRIB_COMMENT": f"{var_name}-component of wind [m/s]",
        "GRIB_ELEMENT": f"{var_name}GRD",
        "GRIB_UNIT": "[m/s]",
        "GRIB_VALID_TIME": "1592611200 sec UTC"
    }
    return header

def save_to_json(u_tif, v_tif, lat, lon, output_file):
    """将TIF文件中的数据保存到JSON文件中。"""
    u_data, u_geotransform = read_tif_data(u_tif)
    v_data, v_geotransform = read_tif_data(v_tif)

    u_header = create_gdal_header(lat, lon, np.nanmin(u_data), np.nanmax(u_data), 'U', u_geotransform)
    v_header = create_gdal_header(lat, lon, np.nanmin(v_data), np.nanmax(v_data), 'V', v_geotransform)

    combined_data = [
        {
            "header": u_header,
            "data": u_data.flatten().tolist()
        },
        {
            "header": v_header,
            "data": v_data.flatten().tolist()
        }
    ]

    with open(output_file, 'w') as json_file:
        json.dump(combined_data, json_file, indent=4)

    print(f"U和V栅格数据已保存到 {output_file}")

# 使用示例
geojson_file = "./[HYYS]Data/PointJson_84.json"

# generate_idw_raster_from_geojson(geojson_file, "u", 'u_.tif')
# generate_idw_raster_from_geojson(geojson_file, "v", 'v_.tif')

# 从TIF文件获取经纬度范围和分辨率
u_data, u_geotransform = read_tif_data('u_.tif')
v_data, v_geotransform = read_tif_data('v_.tif')

# 创建适当的经纬度范围（这里只是示例）
lat = np.linspace(u_geotransform[3], u_geotransform[3] + u_geotransform[5] * u_data.shape[0], u_data.shape[0])
lon = np.linspace(u_geotransform[0], u_geotransform[0] + u_geotransform[1] * u_data.shape[1], u_data.shape[1])

# 保存到JSON
save_to_json('u_.tif', 'v_.tif', lat, lon, 'output.json')

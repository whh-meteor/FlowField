import netCDF4 as nc
import numpy as np
import geopandas as gpd
from shapely.geometry import Point
import json

# 打开 netCDF 文件
file_path = "F:/Desktop/NC_Process/[HYYS]Data/pltf_0001.nc"
dataset = nc.Dataset(file_path, mode='r')
print(dataset)
# 选择时间点，比如第一个时间点
time_index = 100

# 提取 u, v, hs 数据
u = dataset.variables['u'][time_index, :, :].filled(np.nan)  # 使用 .filled(np.nan) 来处理缺失数据
v = dataset.variables['v'][time_index, :, :].filled(np.nan)
h = dataset.variables['h'][:].filled(np.nan)
partition = dataset.variables['partition'][:].filled(np.nan)
tauc = dataset.variables['tauc'][time_index, :].filled(np.nan)
wet_cells = dataset.variables['wet_cells'][time_index, :].filled(np.nan)
wet_cells_prev_ext = dataset.variables['wet_cells_prev_ext'][time_index, :].filled(np.nan)
wet_cells_prev_int = dataset.variables['wet_cells_prev_int'][time_index, :].filled(np.nan)
wet_nodes = dataset.variables['wet_nodes'][time_index, :].filled(np.nan)
wet_nodes_prev_int = dataset.variables['wet_nodes_prev_int'][time_index, :].filled(np.nan)
zeta = dataset.variables['zeta'][time_index, :].filled(np.nan)
 # 提取 DYE 数据
DYE = dataset.variables['DYE'][time_index, :, :].filled(np.nan)

# 提取节点的经纬度信息
lon = dataset.variables['x'][:].tolist()
lat = dataset.variables['y'][:].tolist()

# 提取三角网格中心点的经纬度信息
lonc = dataset.variables['xc'][:].tolist()
latc = dataset.variables['yc'][:].tolist()


# 确保 u, v, hs 数据的形状与中心点数据一致
# 假设 u 和 v 的第一个维度是层数(siglay)，我们选择其中一层进行处理

siglay_index = 2  # 使用第一个siglay层

DYE_layer = DYE[siglay_index, :].tolist()
u_layer = u[siglay_index, :].tolist()
v_layer = v[siglay_index, :].tolist()
tauc_layer = tauc.tolist()
wet_cells_layer = wet_cells.tolist()
wet_cells_prev_ext_layer = wet_cells_prev_ext.tolist()
wet_cells_prev_int_layer = wet_cells_prev_int.tolist()
wet_nodes_layer = wet_nodes.tolist()
wet_nodes_prev_int_layer = wet_nodes_prev_int.tolist()
zeta_layer = zeta.tolist()
 
 # 对 h 和 partition 进行插值
if len(h) != len(lonc):
    h = np.interp(lonc, np.linspace(min(lonc), max(lonc), len(h)), h).tolist()
if len(partition) != len(lonc):
    partition = np.interp(lonc, np.linspace(min(lonc), max(lonc), len(partition)), partition).tolist()
if len(wet_nodes_layer) != len(lonc):
    wet_nodes_layer = np.interp(lonc, np.linspace(min(lonc), max(lonc), len(wet_nodes_layer)), wet_nodes_layer).tolist()
if len(wet_nodes_prev_int_layer) != len(lonc):
    wet_nodes_prev_int_layer = np.interp(lonc, np.linspace(min(lonc), max(lonc), len(wet_nodes_prev_int_layer)), wet_nodes_prev_int_layer).tolist()
if len(DYE_layer) != len(lonc):
    DYE_layer = np.interp(lonc, np.linspace(min(lonc), max(lonc), len(DYE_layer)), DYE_layer).tolist()

 
# 检查各个数据的形状
# print(f"lonc shape: {len(lonc)}")
# print(f"v shape: {v.shape}")
# print(f"u shape: {u.shape}")
# print(f"h shape: {len(h)}")
# print(f"partition shape: {len(partition)}")

# print(f"tauc_layer shape: {len(tauc_layer)}")
# print(f"wet_cells shape: {len(wet_cells)}")
# print(f"wet_cells_prev_ext shape: {len(wet_cells_prev_ext)}")
# print(f"wet_nodes shape: {len(wet_nodes)}")
# print(f"wet_nodes_prev_int shape: {len(wet_nodes_prev_int)}")
# print(f"wet_cells_prev_int shape: {len(wet_cells_prev_int)}")
print(f"DYE shape: {DYE.shape}")
print(f"lonc length: {len(lonc)}")
print(f"latc length: {len(latc)}")
print(f"u_layer length: {len(u_layer)}")
print(f"v_layer length: {len(v_layer)}")
print(f"tauc_layer length: {len(tauc_layer)}")
print(f"wet_cells_layer length: {len(wet_cells_layer)}")
print(f"wet_cells_prev_ext_layer length: {len(wet_cells_prev_ext_layer)}")
print(f"wet_cells_prev_int_layer length: {len(wet_cells_prev_int_layer)}")
print(f"wet_nodes_layer length: {len(wet_nodes_layer)}")
print(f"wet_nodes_prev_int_layer length: {len(wet_nodes_prev_int_layer)}")
print(f"h length: {len(h)}")
print(f"partition length: {len(partition)}")
 


# 创建 GeoDataFrame
gdf = gpd.GeoDataFrame()

# 将中心点数据存储为 GeoDataFrame
gdf = gpd.GeoDataFrame({
    'geometry': [Point(lon, lat) for lon, lat in zip(lonc, latc)],
    'u': u_layer,
    'v': v_layer,
    'DYE': DYE_layer,  # 添加 DYE 数据
    'tauc': tauc_layer,
    'wet_cells': wet_cells_layer,
    'wet_cells_prev_ext': wet_cells_prev_ext_layer,
    'wet_cells_prev_int': wet_cells_prev_int_layer,
    'wet_nodes': wet_nodes_layer,
    'wet_nodes_prev_int': wet_nodes_prev_int_layer,
    'h': h,
    'partition': partition
})

# 将 GeoDataFrame 转换为 GeoJSON 格式
geojson_data = gdf.to_json()

# 保存 GeoJSON 文件
with open("./[HYYS]Data/PointJson.json", 'w') as f:
    f.write(geojson_data)

print("GeoJSON 文件已保存。")

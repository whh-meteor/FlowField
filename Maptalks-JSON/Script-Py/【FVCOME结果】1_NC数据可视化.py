import netCDF4 as nc
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.tri as tri

# 打开 netCDF 文件
file_path = "F:/Desktop/NC_Process/[HYYS]Data/fvcom/pltf_0001.nc"
dataset = nc.Dataset(file_path, mode='r')
print(dataset)
# 选择时间点，比如第一个时间点
time_index = 100

# 提取变量
u = dataset.variables['u'][time_index, :, :]  # u 分量
v = dataset.variables['v'][time_index, :, :]  # v 分量
hs = dataset.variables['zeta'][time_index, :]  # zeta 作为水位高度

# 提取节点的经纬度信息
lon = dataset.variables['x'][:]
lat = dataset.variables['y'][:]

# 提取三角网格中心点的经纬度信息
lonc = dataset.variables['xc'][:]
latc = dataset.variables['yc'][:]

# 关闭文件
dataset.close()

# 创建三角网格
triang = tri.Triangulation(lon, lat)  # nv 需要减1以转换为从0开始的索引

# 绘制 hs (zeta) 的热力图
plt.figure(figsize=(10, 8))
plt.tricontourf(triang, hs, cmap='viridis')
plt.colorbar(label='Significant Wave Height (zeta)')
plt.title('Significant Wave Height at time index {}'.format(time_index))
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.show()

# 绘制 u, v 的矢量场，使用中心点的经纬度
plt.figure(figsize=(10, 8))
plt.quiver(lonc, latc, u[2], v[2], scale=10)  # 选择 siglay 层的第一个层
plt.title('Velocity Field at time index {}'.format(time_index))
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.show()

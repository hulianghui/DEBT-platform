import { useState } from 'react'
import { Search, Filter, Thermometer, Activity, Eye } from 'lucide-react'
import { Device } from '../types'

const DeviceMonitor = () => {
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const deviceTypes = [
    { key: 'all', label: '全部设备', count: 256 },
    { key: 'fuel', label: '燃料设备', count: 32 },
    { key: 'conveyor', label: '输煤设备', count: 64 },
    { key: 'production', label: '生产设备', count: 88 },
    { key: 'electrical', label: '电力设备', count: 72 },
  ]

  const devices: Device[] = [
    { id: '1', name: '#1输煤皮带电机', type: 'conveyor', status: 'online', temperature: 45, vibration: 2.3, health: 95, position: '输煤廊道A区', lastUpdate: '10:45:00' },
    { id: '2', name: '#2引风机轴承', type: 'production', status: 'warning', temperature: 72, vibration: 5.8, health: 78, position: '主机房#2', lastUpdate: '10:45:00' },
    { id: '3', name: '煤场A区测温点', type: 'fuel', status: 'online', temperature: 38, vibration: 0, health: 100, position: '煤场A区', lastUpdate: '10:45:00' },
    { id: '4', name: '#1主变压器', type: 'electrical', status: 'online', temperature: 58, vibration: 0.5, health: 92, position: '升压站', lastUpdate: '10:45:00' },
    { id: '5', name: '碎煤机A', type: 'conveyor', status: 'error', temperature: 85, vibration: 8.2, health: 45, position: '碎煤机室', lastUpdate: '10:45:00' },
    { id: '6', name: '#3给水泵', type: 'production', status: 'online', temperature: 52, vibration: 1.8, health: 88, position: '汽机房', lastUpdate: '10:45:00' },
    { id: '7', name: '高压柜#12', type: 'electrical', status: 'warning', temperature: 65, vibration: 0, health: 82, position: '高压室', lastUpdate: '10:45:00' },
    { id: '8', name: '斗轮机行走机构', type: 'fuel', status: 'online', temperature: 42, vibration: 3.2, health: 90, position: '煤场', lastUpdate: '10:45:00' },
  ]

  const filteredDevices = devices.filter(device => {
    const matchesType = selectedType === 'all' || device.type === selectedType
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.position.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-macos-success/10 text-macos-success border-macos-success/30'
      case 'warning':
        return 'bg-macos-warning/10 text-macos-warning border-macos-warning/30'
      case 'error':
        return 'bg-macos-error/10 text-macos-error border-macos-error/30'
      default:
        return 'bg-macos-text-secondary/10 text-macos-text-secondary border-macos-text-secondary/30'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return '正常'
      case 'warning':
        return '预警'
      case 'error':
        return '异常'
      default:
        return '离线'
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-macos-success'
    if (health >= 70) return 'text-macos-warning'
    if (health >= 50) return 'text-orange-400'
    return 'text-macos-error'
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-macos-text">设备监测</h1>
        <p className="text-macos-text-secondary mt-1">实时监控各类设备运行状态</p>
      </div>

      {/* 设备类型筛选 */}
      <div className="flex items-center space-x-4">
        {deviceTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => setSelectedType(type.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              selectedType === type.key
                ? 'bg-macos-accent text-white shadow-lg'
                : 'bg-macos-card text-macos-text-secondary hover:bg-macos-card/80 border border-macos-border'
            }`}
          >
            {type.label}
            <span className="ml-2 opacity-70">({type.count})</span>
          </button>
        ))}
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-macos-text-secondary" size={18} />
          <input
            type="text"
            placeholder="搜索设备名称或位置..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 pl-10 pr-4 py-2.5 bg-macos-card border border-macos-border rounded-lg text-macos-text placeholder-macos-text-secondary focus:outline-none focus:border-macos-accent transition-smooth"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-macos-card border border-macos-border rounded-lg text-macos-text hover:bg-macos-card/80 transition-smooth">
          <Filter size={16} />
          <span>高级筛选</span>
        </button>
      </div>

      {/* 设备列表 */}
      <div className="bg-macos-card rounded-xl border border-macos-border shadow-macos overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-macos-border">
              <th className="px-6 py-4 text-left text-xs font-medium text-macos-text-secondary uppercase tracking-wider">设备名称</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-macos-text-secondary uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-macos-text-secondary uppercase tracking-wider">温度</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-macos-text-secondary uppercase tracking-wider">振动</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-macos-text-secondary uppercase tracking-wider">健康度</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-macos-text-secondary uppercase tracking-wider">位置</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-macos-text-secondary uppercase tracking-wider">更新时间</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-macos-text-secondary uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-macos-border">
            {filteredDevices.map((device) => (
              <tr key={device.id} className="hover:bg-macos-bg/50 transition-smooth cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-macos-accent/10 flex items-center justify-center">
                      <Activity className="text-macos-accent" size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-macos-text">{device.name}</p>
                      <p className="text-xs text-macos-text-secondary">ID: {device.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(device.status)}`}>
                    {getStatusLabel(device.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Thermometer size={14} className={device.temperature > 60 ? 'text-macos-error' : 'text-macos-text-secondary'} />
                    <span className={`text-sm font-medium ${device.temperature > 60 ? 'text-macos-error' : 'text-macos-text'}`}>
                      {device.temperature}°C
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${device.vibration > 5 ? 'text-macos-error' : 'text-macos-text'}`}>
                    {device.vibration} mm/s
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-macos-bg rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          device.health >= 90 ? 'bg-macos-success' :
                          device.health >= 70 ? 'bg-macos-warning' :
                          device.health >= 50 ? 'bg-orange-500' : 'bg-macos-error'
                        }`}
                        style={{ width: `${device.health}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getHealthColor(device.health)}`}>
                      {device.health}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-macos-text-secondary">{device.position}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-macos-text-secondary">{device.lastUpdate}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 rounded-lg hover:bg-macos-accent/10 text-macos-text-secondary hover:text-macos-accent transition-smooth">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-macos-text-secondary">
          显示 1-8 条，共 {filteredDevices.length} 条记录
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 rounded-lg bg-macos-card border border-macos-border text-macos-text-secondary hover:bg-macos-card/80 transition-smooth">
            上一页
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-macos-accent text-white">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-macos-card border border-macos-border text-macos-text hover:bg-macos-card/80 transition-smooth">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-macos-card border border-macos-border text-macos-text hover:bg-macos-card/80 transition-smooth">
            3
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-macos-card border border-macos-border text-macos-text-secondary hover:bg-macos-card/80 transition-smooth">
            下一页
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeviceMonitor
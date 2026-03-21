import { useState } from 'react'
import { Search, Filter, Bell, AlertTriangle, Clock, User, CheckCircle, XCircle } from 'lucide-react'
import { Alarm } from '../types'

const AlarmCenter = () => {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const levels = [
    { key: 'all', label: '全部告警', count: 156 },
    { key: 'emergency', label: '紧急告警', count: 3, color: 'text-macos-error' },
    { key: 'alert', label: '告警', count: 28, color: 'text-macos-warning' },
    { key: 'warning', label: '预警', count: 125, color: 'text-yellow-400' },
  ]

  const alarms: Alarm[] = [
    { id: '1', level: 'emergency', deviceId: 'D001', deviceName: '#2引风机轴承', type: '振动严重超标', value: 8.5, threshold: 6.0, position: '主机房#2', time: '2024-01-15 10:28:42', status: 'pending' },
    { id: '2', level: 'alert', deviceId: 'D002', deviceName: '煤场A区', type: 'CO浓度超标', value: 85, threshold: 50, position: '煤场A区', time: '2024-01-15 10:15:33', status: 'processing' },
    { id: '3', level: 'warning', deviceId: 'D003', deviceName: '#1输煤皮带', type: '温度异常', value: 65, threshold: 60, position: '输煤廊道A区', time: '2024-01-15 10:32:15', status: 'pending' },
    { id: '4', level: 'warning', deviceId: 'D004', deviceName: '#3变压器', type: '油温偏高', value: 78, threshold: 70, position: '升压站', time: '2024-01-15 09:58:21', status: 'resolved' },
    { id: '5', level: 'alert', deviceId: 'D005', deviceName: '碎煤机A', type: '电机温度过高', value: 92, threshold: 80, position: '碎煤机室', time: '2024-01-15 09:45:10', status: 'processing' },
    { id: '6', level: 'emergency', deviceId: 'D006', deviceName: '#4给水泵', type: '轴承温度异常', value: 95, threshold: 75, position: '汽机房', time: '2024-01-15 09:30:55', status: 'pending' },
  ]

  const filteredAlarms = alarms.filter(alarm => {
    const matchesLevel = selectedLevel === 'all' || alarm.level === selectedLevel
    const matchesSearch = alarm.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alarm.type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesLevel && matchesSearch
  })

  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'emergency':
        return 'bg-macos-error/10 border-macos-error/30 text-macos-error'
      case 'alert':
        return 'bg-macos-warning/10 border-macos-warning/30 text-macos-warning'
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
      default:
        return 'bg-macos-accent/10 border-macos-accent/30 text-macos-accent'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'emergency':
        return <XCircle size={16} />
      case 'alert':
        return <AlertTriangle size={16} />
      default:
        return <Bell size={16} />
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-macos-error/10 text-macos-error'
      case 'processing':
        return 'bg-macos-warning/10 text-macos-warning'
      case 'resolved':
        return 'bg-macos-success/10 text-macos-success'
      default:
        return 'bg-macos-text-secondary/10 text-macos-text-secondary'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return '待处理'
      case 'processing':
        return '处理中'
      case 'resolved':
        return '已解决'
      default:
        return '未知'
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和统计 */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-macos-text">告警中心</h1>
          <p className="text-macos-text-secondary mt-1">集中管理所有设备告警信息</p>
        </div>
        <div className="flex items-center space-x-4">
          {levels.slice(1).map((level) => (
            <div key={level.key} className="text-center">
              <div className={`text-2xl font-bold ${level.color}`}>{level.count}</div>
              <div className="text-xs text-macos-text-secondary">{level.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 告警级别筛选 */}
      <div className="flex items-center space-x-4">
        {levels.map((level) => (
          <button
            key={level.key}
            onClick={() => setSelectedLevel(level.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              selectedLevel === level.key
                ? 'bg-macos-accent text-white shadow-lg'
                : 'bg-macos-card text-macos-text-secondary hover:bg-macos-card/80 border border-macos-border'
            }`}
          >
            {level.label}
            <span className="ml-2 opacity-70">({level.count})</span>
          </button>
        ))}
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-macos-text-secondary" size={18} />
          <input
            type="text"
            placeholder="搜索设备名称或告警类型..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 pl-10 pr-4 py-2.5 bg-macos-card border border-macos-border rounded-lg text-macos-text placeholder-macos-text-secondary focus:outline-none focus:border-macos-accent transition-smooth"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-macos-card border border-macos-border rounded-lg text-macos-text hover:bg-macos-card/80 transition-smooth">
            <Filter size={16} />
            <span>筛选</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-macos-accent text-white rounded-lg hover:bg-macos-accent-hover transition-smooth">
            <CheckCircle size={16} />
            <span>批量处理</span>
          </button>
        </div>
      </div>

      {/* 告警列表 */}
      <div className="space-y-4">
        {filteredAlarms.map((alarm) => (
          <div
            key={alarm.id}
            className="bg-macos-card rounded-xl p-5 border border-macos-border shadow-macos-light hover:shadow-macos transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {/* 告警级别图标 */}
                <div className={`p-3 rounded-xl border ${getLevelStyle(alarm.level)}`}>
                  {getLevelIcon(alarm.level)}
                </div>
                
                {/* 告警内容 */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-macos-text">{alarm.deviceName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getLevelStyle(alarm.level)}`}>
                      {alarm.level === 'emergency' ? '紧急' : alarm.level === 'alert' ? '告警' : '预警'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(alarm.status)}`}>
                      {getStatusLabel(alarm.status)}
                    </span>
                  </div>
                  
                  <p className="text-macos-text-secondary mb-3">{alarm.type}</p>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle size={14} className="text-macos-text-secondary" />
                      <span className="text-macos-text-secondary">当前值：</span>
                      <span className="font-semibold text-macos-error">{alarm.value}</span>
                      <span className="text-macos-text-secondary">/ 阈值：{alarm.threshold}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-macos-text-secondary" />
                      <span className="text-macos-text-secondary">{alarm.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={14} className="text-macos-text-secondary" />
                      <span className="text-macos-text-secondary">位置：{alarm.position}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center space-x-2">
                {alarm.status === 'pending' && (
                  <button className="px-4 py-2 bg-macos-accent text-white rounded-lg text-sm font-medium hover:bg-macos-accent-hover transition-smooth">
                    接单处理
                  </button>
                )}
                {alarm.status === 'processing' && (
                  <button className="px-4 py-2 bg-macos-success text-white rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                    标记完成
                  </button>
                )}
                <button className="p-2 rounded-lg hover:bg-macos-bg text-macos-text-secondary hover:text-macos-text transition-smooth">
                  <Clock size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-macos-text-secondary">
          显示 1-{filteredAlarms.length} 条，共 {alarms.length} 条记录
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

export default AlarmCenter
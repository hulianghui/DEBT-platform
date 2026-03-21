import { useState, useEffect } from 'react'
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Thermometer,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import { StatCard } from '../types'
import StatCardComponent from '../components/StatCardComponent'
import AlarmList from '../components/AlarmList'
import DeviceStatusChart from '../components/DeviceStatusChart'
import HealthDistribution from '../components/HealthDistribution'

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const statCards: StatCard[] = [
    {
      title: '设备总数',
      value: 256,
      unit: '台',
      trend: 'stable',
      icon: '📟',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '在线率',
      value: 99.2,
      unit: '%',
      trend: 'up',
      trendValue: '+0.5%',
      icon: '🌐',
      color: 'from-green-500 to-green-600'
    },
    {
      title: '活跃告警',
      value: 12,
      trend: 'down',
      trendValue: '-3',
      icon: '⚠️',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: '待处理工单',
      value: 5,
      trend: 'up',
      trendValue: '+2',
      icon: '📋',
      color: 'from-red-500 to-red-600'
    },
    {
      title: '平均健康度',
      value: 92.5,
      unit: '%',
      trend: 'stable',
      icon: '💚',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: '本月运维次数',
      value: 48,
      trend: 'down',
      trendValue: '-8',
      icon: '🔧',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const recentAlarms = [
    { id: '1', level: 'warning', deviceName: '#1输煤皮带', type: '温度异常', value: 65, threshold: 60, time: '10:32:15' },
    { id: '2', level: 'emergency', deviceName: '#2引风机轴承', type: '振动超标', value: 8.5, threshold: 6.0, time: '10:28:42' },
    { id: '3', level: 'alert', deviceName: '煤场A区', type: 'CO浓度', value: 85, threshold: 50, time: '10:15:33' },
    { id: '4', level: 'warning', deviceName: '#3变压器', type: '油温偏高', value: 78, threshold: 70, time: '09:58:21' },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-macos-text">驾驶舱</h1>
          <p className="text-macos-text-secondary mt-1">实时监控全厂设备运行状态</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-macos-text">
            {currentTime.toLocaleTimeString('zh-CN')}
          </div>
          <div className="text-sm text-macos-text-secondary">
            {currentTime.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <StatCardComponent key={index} stat={stat} />
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 设备状态分布 */}
        <div className="col-span-2 bg-macos-card rounded-xl p-6 border border-macos-border shadow-macos">
          <h3 className="text-lg font-semibold text-macos-text mb-4">设备状态趋势</h3>
          <DeviceStatusChart />
        </div>

        {/* 健康度分布 */}
        <div className="bg-macos-card rounded-xl p-6 border border-macos-border shadow-macos">
          <h3 className="text-lg font-semibold text-macos-text mb-4">健康度分布</h3>
          <HealthDistribution />
        </div>
      </div>

      {/* 最近告警和快捷操作 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 最近告警 */}
        <div className="col-span-2 bg-macos-card rounded-xl p-6 border border-macos-border shadow-macos">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-macos-text">最近告警</h3>
            <button className="text-sm text-macos-accent hover:underline">查看全部 →</button>
          </div>
          <AlarmList alarms={recentAlarms} />
        </div>

        {/* 快捷操作 */}
        <div className="bg-macos-card rounded-xl p-6 border border-macos-border shadow-macos">
          <h3 className="text-lg font-semibold text-macos-text mb-4">快捷操作</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Activity size={20} />, label: '实时监控' },
              { icon: <AlertTriangle size={20} />, label: '告警确认' },
              { icon: <CheckCircle size={20} />, label: '工单处理' },
              { icon: <Clock size={20} />, label: '历史查询' },
              { icon: <Thermometer size={20} />, label: '温度报表' },
              { icon: '📊', label: '数据分析', isText: true },
            ].map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-macos-bg hover:bg-macos-accent/10 border border-macos-border hover:border-macos-accent transition-smooth btn-hover"
              >
                <span className="text-macos-accent mb-2">
                  {item.isText ? item.icon : item.icon}
                </span>
                <span className="text-sm text-macos-text">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
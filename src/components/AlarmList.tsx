import { Alarm } from '../types'

interface AlarmListProps {
  alarms: Partial<Alarm>[]
}

const AlarmList = ({ alarms }: AlarmListProps) => {
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

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'emergency':
        return '紧急'
      case 'alert':
        return '告警'
      case 'warning':
        return '预警'
      default:
        return '通知'
    }
  }

  return (
    <div className="space-y-3">
      {alarms.map((alarm) => (
        <div
          key={alarm.id}
          className="flex items-center justify-between p-4 rounded-lg bg-macos-bg border border-macos-border hover:border-macos-accent/50 transition-smooth cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 rounded text-xs font-medium border ${getLevelStyle(alarm.level || '')}`}>
              {getLevelLabel(alarm.level || '')}
            </span>
            <div>
              <p className="text-sm font-medium text-macos-text">{alarm.deviceName}</p>
              <p className="text-xs text-macos-text-secondary">{alarm.type}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-medium text-macos-text">
                {alarm.value} <span className="text-macos-text-secondary">/ {alarm.threshold}</span>
              </p>
              <p className="text-xs text-macos-text-secondary">{alarm.time}</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-macos-accent text-white text-xs font-medium hover:bg-macos-accent-hover transition-smooth">
              处理
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AlarmList
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { StatCard } from '../types'

interface StatCardComponentProps {
  stat: StatCard
}

const StatCardComponent = ({ stat }: StatCardComponentProps) => {
  const getTrendIcon = () => {
    switch (stat.trend) {
      case 'up':
        return <ArrowUp size={14} className="text-macos-error" />
      case 'down':
        return <ArrowDown size={14} className="text-macos-success" />
      default:
        return <Minus size={14} className="text-macos-text-secondary" />
    }
  }

  const getTrendColor = () => {
    switch (stat.trend) {
      case 'up':
        return 'text-macos-error'
      case 'down':
        return 'text-macos-success'
      default:
        return 'text-macos-text-secondary'
    }
  }

  return (
    <div className="bg-macos-card rounded-xl p-5 border border-macos-border shadow-macos-light hover:shadow-macos transition-all duration-300 btn-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-macos-text-secondary mb-1">{stat.title}</p>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-macos-text">{stat.value}</span>
            {stat.unit && <span className="text-sm text-macos-text-secondary">{stat.unit}</span>}
          </div>
          {stat.trendValue && (
            <div className="flex items-center space-x-1 mt-2">
              {getTrendIcon()}
              <span className={`text-xs ${getTrendColor()}`}>
                {stat.trendValue} 较昨日
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
          {stat.icon}
        </div>
      </div>
    </div>
  )
}

export default StatCardComponent
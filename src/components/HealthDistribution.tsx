const HealthDistribution = () => {
  const distribution = [
    { label: '健康', value: 72, color: 'bg-macos-success' },
    { label: '亚健康', value: 18, color: 'bg-macos-warning' },
    { label: '异常', value: 8, color: 'bg-orange-500' },
    { label: '故障', value: 2, color: 'bg-macos-error' },
  ]

  const total = distribution.reduce((sum, item) => sum + item.value, 0)
  const cumulativeValues = distribution.reduce((acc, item, index) => {
    acc.push((acc[index - 1] || 0) + item.value)
    return acc
  }, [] as number[])

  return (
    <div className="h-64 flex flex-col">
      {/* 环形图 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {distribution.map((item, index) => {
              const startAngle = index === 0 ? 0 : (cumulativeValues[index - 1] / total) * 360
              const endAngle = (cumulativeValues[index] / total) * 360
              const angle = endAngle - startAngle
              
              const startRad = (startAngle * Math.PI) / 180
              const endRad = (endAngle * Math.PI) / 180
              
              const x1 = 50 + 40 * Math.cos(startRad)
              const y1 = 50 + 40 * Math.sin(startRad)
              const x2 = 50 + 40 * Math.cos(endRad)
              const y2 = 50 + 40 * Math.sin(endRad)
              
              const largeArcFlag = angle > 180 ? 1 : 0
              
              return (
                <path
                  key={item.label}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  className={`${item.color} transition-all duration-300 hover:opacity-80`}
                  fill="currentColor"
                  style={{ color: 'currentColor' }}
                />
              )
            })}
            <circle cx="50" cy="50" r="25" fill="#2C2C2E" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-macos-text">256</span>
            <span className="text-xs text-macos-text-secondary">设备总数</span>
          </div>
        </div>
      </div>

      {/* 图例 */}
      <div className="grid grid-cols-2 gap-3">
        {distribution.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
              <span className="text-sm text-macos-text-secondary">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-macos-text">{item.value}台</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HealthDistribution
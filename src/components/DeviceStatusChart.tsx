const DeviceStatusChart = () => {
  // 模拟数据 - 24小时设备状态
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
  const onlineData = [98, 98.5, 99, 99.2, 99, 98.8, 99, 99.5, 99.3, 99, 99.2, 99.5, 99.3, 99, 99.2, 99.4, 99.5, 99.3, 99, 99.2, 99.4, 99.5, 99.3, 99.2]
  const warningData = [2, 1.5, 1, 0.8, 1, 1.2, 1, 0.5, 0.7, 1, 0.8, 0.5, 0.7, 1, 0.8, 0.6, 0.5, 0.7, 1, 0.8, 0.6, 0.5, 0.7, 0.8]

  const maxHeight = 80
  const chartWidth = 100 / hours.length

  return (
    <div className="h-64">
      {/* 图例 */}
      <div className="flex items-center space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-macos-success"></span>
          <span className="text-sm text-macos-text-secondary">在线率 (%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-macos-warning"></span>
          <span className="text-sm text-macos-text-secondary">异常率 (%)</span>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="relative h-48 flex items-end justify-between px-2">
        {/* Y轴刻度 */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-macos-text-secondary">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* 柱状图 */}
        <div className="flex-1 flex items-end justify-between ml-12 space-x-1">
          {hours.map((hour, index) => (
            <div
              key={hour}
              className="flex flex-col items-center"
              style={{ width: `${chartWidth}%` }}
            >
              <div className="w-full flex flex-col items-center justify-end h-40">
                {/* 在线率柱 */}
                <div
                  className="w-full bg-macos-success/80 rounded-t-sm transition-all duration-300 hover:bg-macos-success"
                  style={{ height: `${(onlineData[index] / 100) * maxHeight}%` }}
                  title={`${hour}: ${onlineData[index]}%`}
                ></div>
                {/* 异常率柱 */}
                <div
                  className="w-full bg-macos-warning/80 rounded-b-sm transition-all duration-300 hover:bg-macos-warning"
                  style={{ height: `${(warningData[index] / 100) * maxHeight}%` }}
                  title={`${hour}: ${warningData[index]}%`}
                ></div>
              </div>
              {/* X轴标签 */}
              <span className="text-xs text-macos-text-secondary mt-2 transform -rotate-45 origin-top">
                {index % 4 === 0 ? hour : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DeviceStatusChart
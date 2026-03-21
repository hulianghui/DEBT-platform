import { Search, Bell, Maximize2, HelpCircle, RefreshCw } from 'lucide-react'

const Header = () => {
  const currentTime = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <header className="h-16 bg-macos-sidebar border-b border-macos-border flex items-center justify-between px-6">
      {/* 左侧：搜索和刷新 */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-macos-text-secondary" size={18} />
          <input
            type="text"
            placeholder="搜索设备、告警、资产..."
            className="w-80 pl-10 pr-4 py-2 bg-macos-card border border-macos-border rounded-lg text-macos-text placeholder-macos-text-secondary focus:outline-none focus:border-macos-accent transition-smooth"
          />
        </div>
        <button className="p-2 rounded-lg hover:bg-macos-card transition-smooth text-macos-text-secondary hover:text-macos-text">
          <RefreshCw size={18} />
        </button>
      </div>

      {/* 中间：系统状态和时间 */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-macos-success animate-pulse"></span>
          <span className="text-sm text-macos-text-secondary">系统运行正常</span>
        </div>
        <div className="text-sm text-macos-text">
          {currentTime}
        </div>
      </div>

      {/* 右侧：操作按钮 */}
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-lg hover:bg-macos-card transition-smooth text-macos-text-secondary hover:text-macos-text relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-macos-error"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-macos-card transition-smooth text-macos-text-secondary hover:text-macos-text">
          <HelpCircle size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-macos-card transition-smooth text-macos-text-secondary hover:text-macos-text">
          <Maximize2 size={18} />
        </button>
      </div>
    </header>
  )
}

export default Header
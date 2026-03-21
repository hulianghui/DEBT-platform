import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import DeviceMonitor from './pages/DeviceMonitor'
import AlarmCenter from './pages/AlarmCenter'
import AssetManagement from './pages/AssetManagement'
import { MenuItem } from './types'

const App = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />
      case 'devices':
        return <DeviceMonitor />
      case 'alarms':
        return <AlarmCenter />
      case 'assets':
        return <AssetManagement />
      case 'workorders':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🔧</div>
              <h2 className="text-2xl font-semibold text-macos-text mb-2">工单管理</h2>
              <p className="text-macos-text-secondary">该模块正在开发中...</p>
            </div>
          </div>
        )
      case 'reports':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-semibold text-macos-text mb-2">报表中心</h2>
              <p className="text-macos-text-secondary">该模块正在开发中...</p>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <h2 className="text-2xl font-semibold text-macos-text mb-2">系统设置</h2>
              <p className="text-macos-text-secondary">该模块正在开发中...</p>
            </div>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-macos-bg overflow-hidden">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
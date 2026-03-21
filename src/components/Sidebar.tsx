import { 
  LayoutDashboard, 
  Activity, 
  Bell, 
  ClipboardList, 
  Box, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { MenuItem } from '../types'

interface SidebarProps {
  activeMenu: MenuItem
  setActiveMenu: (menu: MenuItem) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const menuItems: { key: MenuItem; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard', label: '驾驶舱', icon: <LayoutDashboard size={20} /> },
  { key: 'devices', label: '设备监测', icon: <Activity size={20} /> },
  { key: 'alarms', label: '告警中心', icon: <Bell size={20} /> },
  { key: 'workorders', label: '工单管理', icon: <ClipboardList size={20} /> },
  { key: 'assets', label: '资产管理', icon: <Box size={20} /> },
  { key: 'reports', label: '报表中心', icon: <BarChart3 size={20} /> },
  { key: 'settings', label: '系统设置', icon: <Settings size={20} /> },
]

const Sidebar = ({ activeMenu, setActiveMenu, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <aside 
      className={`bg-macos-sidebar border-r border-macos-border flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo区域 */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-macos-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-macos-accent to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">热电</span>
            </div>
            <span className="font-semibold text-macos-text">数字化平台</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-macos-card transition-smooth text-macos-text-secondary hover:text-macos-text"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveMenu(item.key)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-smooth ${
              activeMenu === item.key
                ? 'bg-macos-accent text-white shadow-lg'
                : 'text-macos-text-secondary hover:bg-macos-card hover:text-macos-text'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* 用户信息 */}
      <div className="p-4 border-t border-macos-border">
        <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-macos-accent to-purple-500 flex items-center justify-center">
            <span className="text-white font-semibold">管</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-macos-text truncate">管理员</p>
              <p className="text-xs text-macos-text-secondary truncate">admin@debt.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
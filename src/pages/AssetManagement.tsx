import { useState } from 'react'
import { Search, Filter, Box, Calendar, Wrench, BarChart3, Eye, Download, QrCode } from 'lucide-react'
import { Asset } from '../types'

const AssetManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const statuses = [
    { key: 'all', label: '全部资产', count: 256 },
    { key: 'healthy', label: '健康', count: 184, color: 'text-macos-success' },
    { key: 'subhealthy', label: '亚健康', count: 46, color: 'text-macos-warning' },
    { key: 'abnormal', label: '异常', count: 20, color: 'text-orange-400' },
    { key: 'fault', label: '故障', count: 6, color: 'text-macos-error' },
  ]

  const assets: Asset[] = [
    { id: 'A001', name: '#1汽轮机', model: 'N300-16.7/537/537', factory: '上海电气', installTime: '2018-06-15', lifeTime: 30, maintainCount: 24, healthScore: 92, status: 'healthy' },
    { id: 'A002', name: '#2引风机', model: 'Y4-2*73-14', factory: '沈阳鼓风机', installTime: '2019-03-20', lifeTime: 20, maintainCount: 18, healthScore: 78, status: 'subhealthy' },
    { id: 'A003', name: '#1主变压器', model: 'SFP10-360000', factory: '西安西电', installTime: '2018-08-10', lifeTime: 30, maintainCount: 12, healthScore: 95, status: 'healthy' },
    { id: 'A004', name: '碎煤机A', model: 'HCSC-8', factory: '上海建设路桥', installTime: '2020-01-05', lifeTime: 15, maintainCount: 36, healthScore: 45, status: 'fault' },
    { id: 'A005', name: '#3给水泵', model: 'DG85-80*12', factory: '沈阳水泵厂', installTime: '2019-07-22', lifeTime: 20, maintainCount: 28, healthScore: 85, status: 'healthy' },
    { id: 'A006', name: '#1输煤皮带', model: 'DTII(A)-B1400', factory: '青岛橡六', installTime: '2021-04-18', lifeTime: 10, maintainCount: 8, healthScore: 68, status: 'abnormal' },
  ]

  const filteredAssets = assets.filter(asset => {
    const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.model.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-macos-success/10 text-macos-success border-macos-success/30'
      case 'subhealthy':
        return 'bg-macos-warning/10 text-macos-warning border-macos-warning/30'
      case 'abnormal':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30'
      case 'fault':
        return 'bg-macos-error/10 text-macos-error border-macos-error/30'
      default:
        return 'bg-macos-text-secondary/10 text-macos-text-secondary border-macos-text-secondary/30'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'healthy':
        return '健康'
      case 'subhealthy':
        return '亚健康'
      case 'abnormal':
        return '异常'
      case 'fault':
        return '故障'
      default:
        return '未知'
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-macos-success'
    if (score >= 70) return 'text-macos-warning'
    if (score >= 50) return 'text-orange-400'
    return 'text-macos-error'
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-macos-text">资产管理</h1>
        <p className="text-macos-text-secondary mt-1">全生命周期资产管理与健康度评估</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        {statuses.slice(1).map((status) => (
          <div key={status.key} className="bg-macos-card rounded-xl p-5 border border-macos-border shadow-macos-light">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-macos-text-secondary mb-1">{status.label}</p>
                <p className={`text-3xl font-bold ${status.color}`}>{status.count}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-macos-bg flex items-center justify-center">
                <Box className={status.color} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 状态筛选 */}
      <div className="flex items-center space-x-4">
        {statuses.map((status) => (
          <button
            key={status.key}
            onClick={() => setSelectedStatus(status.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              selectedStatus === status.key
                ? 'bg-macos-accent text-white shadow-lg'
                : 'bg-macos-card text-macos-text-secondary hover:bg-macos-card/80 border border-macos-border'
            }`}
          >
            {status.label}
            <span className="ml-2 opacity-70">({status.count})</span>
          </button>
        ))}
      </div>

      {/* 搜索和操作 */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-macos-text-secondary" size={18} />
          <input
            type="text"
            placeholder="搜索资产名称、型号..."
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
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-macos-card border border-macos-border rounded-lg text-macos-text hover:bg-macos-card/80 transition-smooth">
            <Download size={16} />
            <span>导出</span>
          </button>
        </div>
      </div>

      {/* 资产卡片列表 */}
      <div className="grid grid-cols-2 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-macos-card rounded-xl p-6 border border-macos-border shadow-macos-light hover:shadow-macos transition-all duration-300"
          >
            {/* 卡片头部 */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-macos-accent to-blue-600 flex items-center justify-center">
                  <Box className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-macos-text text-lg">{asset.name}</h3>
                  <p className="text-sm text-macos-text-secondary">型号：{asset.model}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(asset.status)}`}>
                {getStatusLabel(asset.status)}
              </span>
            </div>

            {/* 资产信息 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-3">
                <Calendar className="text-macos-text-secondary" size={16} />
                <div>
                  <p className="text-xs text-macos-text-secondary">安装日期</p>
                  <p className="text-sm font-medium text-macos-text">{asset.installTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BarChart3 className="text-macos-text-secondary" size={16} />
                <div>
                  <p className="text-xs text-macos-text-secondary">设计寿命</p>
                  <p className="text-sm font-medium text-macos-text">{asset.lifeTime}年</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Wrench className="text-macos-text-secondary" size={16} />
                <div>
                  <p className="text-xs text-macos-text-secondary">维保次数</p>
                  <p className="text-sm font-medium text-macos-text">{asset.maintainCount}次</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  asset.healthScore >= 90 ? 'bg-macos-success/20' :
                  asset.healthScore >= 70 ? 'bg-macos-warning/20' :
                  asset.healthScore >= 50 ? 'bg-orange-500/20' : 'bg-macos-error/20'
                }`}>
                  <span className={`text-sm font-bold ${getHealthColor(asset.healthScore)}`}>
                    {asset.healthScore}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-macos-text-secondary">健康评分</p>
                  <p className={`text-sm font-medium ${getHealthColor(asset.healthScore)}`}>
                    {asset.healthScore}/100
                  </p>
                </div>
              </div>
            </div>

            {/* 生产厂家 */}
            <div className="pt-4 border-t border-macos-border">
              <p className="text-xs text-macos-text-secondary mb-1">生产厂家</p>
              <p className="text-sm text-macos-text">{asset.factory}</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-macos-border">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-macos-text-secondary">资产编号：</span>
                <span className="text-xs font-mono text-macos-text">{asset.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-macos-bg text-macos-text-secondary hover:text-macos-text transition-smooth text-sm">
                  <QrCode size={14} />
                  <span>二维码</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-macos-accent text-white text-sm hover:bg-macos-accent-hover transition-smooth">
                  <Eye size={14} />
                  <span>查看详情</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-macos-text-secondary">
          显示 1-{filteredAssets.length} 条，共 {assets.length} 条记录
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
          <button className="px-3 py-1.5 rounded-lg bg-macos-card border border-macos-border text-macos-text-secondary hover:bg-macos-card/80 transition-smooth">
            下一页
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssetManagement
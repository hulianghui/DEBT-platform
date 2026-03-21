export type MenuItem = 
  | 'dashboard' 
  | 'devices' 
  | 'alarms' 
  | 'workorders' 
  | 'assets' 
  | 'reports' 
  | 'settings'

export interface Device {
  id: string
  name: string
  type: string
  status: 'online' | 'offline' | 'warning' | 'error'
  temperature: number
  vibration: number
  health: number
  position: string
  lastUpdate: string
}

export interface Alarm {
  id: string
  level: 'warning' | 'alert' | 'emergency'
  deviceId: string
  deviceName: string
  type: string
  value: number
  threshold: number
  position: string
  time: string
  status: 'pending' | 'processing' | 'resolved'
}

export interface Asset {
  id: string
  name: string
  model: string
  factory: string
  installTime: string
  lifeTime: number
  maintainCount: number
  healthScore: number
  status: 'healthy' | 'subhealthy' | 'abnormal' | 'fault'
}

export interface StatCard {
  title: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
  icon: string
  color: string
}
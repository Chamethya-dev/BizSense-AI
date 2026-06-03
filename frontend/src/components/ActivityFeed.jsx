import { ShoppingCart, Users, Package, TrendingUp, AlertTriangle } from 'lucide-react'

const ICON_MAP = {
  sale: ShoppingCart,
  customer: Users,
  product: Package,
  analytics: TrendingUp,
  alert: AlertTriangle,
}
const COLOR_MAP = {
  sale: 'text-jade bg-jade/10 border-jade/20',
  customer: 'text-electric bg-electric/10 border-electric/20',
  product: 'text-amber-alert bg-amber-alert/10 border-amber-alert/20',
  alert: 'text-rose-alert bg-rose-alert/10 border-rose-alert/20',
  default: 'text-white/50 bg-white/5 border-white/10',
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function ActivityFeed({ activities = [], loading = false }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="shimmer w-8 h-8 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="shimmer h-3 w-3/4 rounded" />
              <div className="shimmer h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!activities.length) {
    return <p className="text-white/30 text-sm text-center py-6">No recent activity</p>
  }

  return (
    <div className="space-y-3">
      {activities.map((item, i) => {
        const type = item.type || 'default'
        const Icon = ICON_MAP[type] || ShoppingCart
        const colors = COLOR_MAP[type] || COLOR_MAP.default
        return (
          <div key={i} className="flex gap-3 items-start group">
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${colors}`}>
              <Icon size={13} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/80 font-body leading-snug">{item.message || item.description}</p>
              {item.amount && (
                <p className="text-xs text-jade font-mono mt-0.5">+${Number(item.amount).toLocaleString()}</p>
              )}
            </div>
            <span className="text-xs text-white/25 font-mono flex-shrink-0 mt-0.5">
              {timeAgo(item.createdAt || item.date)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
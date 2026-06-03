import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  accent = 'electric',
  loading = false,
}) {
  const accentMap = {
    electric: { bg: 'bg-electric/10', border: 'border-electric/20', text: 'text-electric', icon: 'text-electric' },
    jade: { bg: 'bg-jade/10', border: 'border-jade/20', text: 'text-jade', icon: 'text-jade' },
    amber: { bg: 'bg-amber-alert/10', border: 'border-amber-alert/20', text: 'text-amber-alert', icon: 'text-amber-alert' },
    rose: { bg: 'bg-rose-alert/10', border: 'border-rose-alert/20', text: 'text-rose-alert', icon: 'text-rose-alert' },
  }
  const colors = accentMap[accent] || accentMap.electric

  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus
  const trendColor = trend > 0 ? 'text-jade' : trend < 0 ? 'text-rose-alert' : 'text-white/40'

  if (loading) {
    return (
      <div className="card p-5">
        <div className="shimmer h-4 w-24 rounded mb-4" />
        <div className="shimmer h-8 w-32 rounded mb-2" />
        <div className="shimmer h-3 w-20 rounded" />
      </div>
    )
  }

  return (
    <div className={`card card-hover p-5 group`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-display font-600 text-white/45 uppercase tracking-widest">{title}</p>
        {Icon && (
          <div className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}>
            <Icon size={15} className={colors.icon} />
          </div>
        )}
      </div>
      <p className="stat-number mb-1">{value ?? '—'}</p>
      {subtitle && <p className="text-xs text-white/40">{subtitle}</p>}
      {trendLabel && (
        <div className={`flex items-center gap-1 mt-3 ${trendColor}`}>
          <TrendIcon size={12} />
          <span className="text-xs font-mono">{trendLabel}</span>
        </div>
      )}
    </div>
  )
}
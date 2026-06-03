import { useLocation } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Business overview' },
  '/products': { title: 'Products', subtitle: 'Inventory management' },
  '/customers': { title: 'Customers', subtitle: 'Customer relationships' },
  '/sales': { title: 'Sales', subtitle: 'Transaction records' },
  '/analytics': { title: 'Analytics', subtitle: 'Performance insights' },
  '/ai-insights': { title: 'AI Insights', subtitle: 'Intelligent recommendations' },
}

export default function Navbar({ onMenuClick }) {
  const location = useLocation()
  const { user } = useAuth()
  const page = PAGE_TITLES[location.pathname] || { title: 'BizSense AI', subtitle: '' }

  return (
    <header className="sticky top-0 z-10 bg-ink-950/80 backdrop-blur-md border-b border-surface-border px-4 md:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-surface-overlay transition-colors"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="font-display text-base font-700 text-white leading-tight">{page.title}</h1>
            {page.subtitle && (
              <p className="text-xs text-white/40 font-body">{page.subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-surface-overlay transition-colors">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-electric rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center">
            <span className="text-xs font-display font-700 text-electric">
              {(user?.name || user?.email || 'U')[0].toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
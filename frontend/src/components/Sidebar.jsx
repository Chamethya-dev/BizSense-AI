import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, Package, Users, ShoppingCart,
  BarChart3, Sparkles, LogOut, X, Zap
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/sales', icon: ShoppingCart, label: 'Sales' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/ai-insights', icon: Sparkles, label: 'AI Insights' },
]

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 z-30 flex flex-col
        bg-surface border-r border-surface-border
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-surface-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-electric/15 border border-electric/30 flex items-center justify-center">
            <Zap size={16} className="text-electric" />
          </div>
          <div>
            <p className="font-display font-700 text-sm text-white tracking-tight">BizSense</p>
            <p className="text-xs text-electric font-mono">AI Platform</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md text-white/40 hover:text-white hover:bg-surface-overlay transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-display font-600 text-white/25 uppercase tracking-widest px-3 pb-2">Navigation</p>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-150
              ${isActive
                ? 'bg-electric/10 text-electric border border-electric/20'
                : 'text-white/50 hover:text-white/80 hover:bg-surface-overlay'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-surface-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-display font-700 text-electric">
              {(user?.name || user?.email || 'U')[0].toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-display font-600 text-white truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-white/40 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-rose-alert hover:bg-rose-alert/10 transition-all duration-150"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
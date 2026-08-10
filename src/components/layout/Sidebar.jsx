import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  ChevronsLeft,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
  Warehouse,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/sales', label: 'Sales', icon: ShoppingCart },
  { to: '/app/customers', label: 'Customers', icon: Users },
  { to: '/app/distributors', label: 'Distributors', icon: Truck },
  { to: '/app/products', label: 'Products', icon: Package },
  { to: '/app/inventory', label: 'Inventory', icon: Warehouse },
  { to: '/app/finance', label: 'Finance', icon: Wallet },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
];

export default function Sidebar({ collapsed = false, onToggleCollapse, onNavigate, className }) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-neutral-200 dark:border-neutral-800',
          collapsed ? 'justify-center px-2' : 'justify-between px-5'
        )}
      >
        {collapsed ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            T
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
              T
            </span>
            <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Tijarat
            </span>
          </span>
        )}

        {!collapsed && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 lg:block dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          >
            <ChevronsLeft size={16} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
              )
            }
          >
            <item.icon size={18} className="shrink-0" />
            {!collapsed && item.label}
          </NavLink>
        ))}

        <div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />

        <NavLink
          to="/app/settings"
          onClick={onNavigate}
          title={collapsed ? 'Settings' : undefined}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              collapsed && 'justify-center px-0',
              isActive
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
            )
          }
        >
          <Settings size={18} className="shrink-0" />
          {!collapsed && 'Settings'}
        </NavLink>
      </nav>

      {collapsed && onToggleCollapse && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="m-3 flex items-center justify-center rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        >
          <ChevronsLeft size={16} className="rotate-180" />
        </button>
      )}
    </aside>
  );
}

import { Link, useLocation } from 'react-router-dom';
import {
  Wrench,
  Box,
  Kanban,
  Calendar,
  BarChart3,
  Settings,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Equipment', href: '/equipment', icon: Box },
  { name: 'Maintenance', href: '/maintenance', icon: Kanban },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">GearGuard</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}

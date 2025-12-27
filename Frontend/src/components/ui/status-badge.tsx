import { cn } from '@/lib/utils';
import { MaintenanceStatus } from '@/types/maintenance';

interface StatusBadgeProps {
  status: MaintenanceStatus;
  className?: string;
}

const statusConfig: Record<MaintenanceStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'status-new' },
  in_progress: { label: 'In Progress', className: 'status-progress' },
  repaired: { label: 'Repaired', className: 'status-repaired' },
  scrap: { label: 'Scrap', className: 'status-scrap' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn('status-badge', config.className, className)}>
      {config.label}
    </span>
  );
}

interface WarrantyBadgeProps {
  status: 'active' | 'expired' | 'none';
  className?: string;
}

const warrantyConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'status-repaired' },
  expired: { label: 'Expired', className: 'status-scrap' },
  none: { label: 'No Warranty', className: 'bg-muted text-muted-foreground' },
};

export function WarrantyBadge({ status, className }: WarrantyBadgeProps) {
  const config = warrantyConfig[status];
  return (
    <span className={cn('status-badge', config.className, className)}>
      {config.label}
    </span>
  );
}

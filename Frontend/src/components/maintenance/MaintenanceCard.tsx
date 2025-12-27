import { Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MaintenanceRequest } from '@/types/maintenance';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MaintenanceCardProps {
  request: MaintenanceRequest;
  onDragStart: (e: React.DragEvent) => void;
}

export function MaintenanceCard({ request, onDragStart }: MaintenanceCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/maintenance/${request.id}`);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={handleClick}
      className={cn(
        'kanban-card animate-fade-in cursor-pointer',
        request.isOverdue && 'kanban-card-overdue'
      )}
    >
      <div className="space-y-3">
        {/* Subject */}
        <div>
          <p className="font-medium text-foreground leading-tight">
            {request.subject}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {request.equipmentName}
          </p>
        </div>

        {/* Type badge */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded font-medium',
              request.type === 'preventive'
                ? 'bg-status-new-bg text-status-new'
                : 'bg-status-progress-bg text-status-progress'
            )}
          >
            {request.type === 'preventive' ? 'Preventive' : 'Corrective'}
          </span>
          {request.isOverdue && (
            <span className="text-xs text-status-scrap font-medium">Overdue</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(request.scheduledDate), 'MMM d')}
          </div>
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
              {request.assignedTechnician.avatar}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

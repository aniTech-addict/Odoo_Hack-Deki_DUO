import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MaintenanceCard } from './MaintenanceCard';
import { MaintenanceFormDialog } from './MaintenanceFormDialog';
import { MaintenanceRequest, MaintenanceStatus } from '@/types/maintenance';
import { maintenanceRequests as mockRequests } from '@/data/mockData';

const columns: { id: MaintenanceStatus; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'repaired', label: 'Repaired' },
  { id: 'scrap', label: 'Scrap' },
];

export function KanbanBoard() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, requestId: string) => {
    setDraggedItem(requestId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: MaintenanceStatus) => {
    e.preventDefault();
    if (!draggedItem) return;

    setRequests((prev) =>
      prev.map((req) =>
        req.id === draggedItem ? { ...req, status: newStatus } : req
      )
    );
    setDraggedItem(null);
  };

  const getColumnRequests = (status: MaintenanceStatus) =>
    requests.filter((r) => r.status === status);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="kanban-column min-w-[300px] flex-1"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground">{column.label}</h3>
                <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full">
                  {getColumnRequests(column.id).length}
                </span>
              </div>
              {column.id === 'new' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {getColumnRequests(column.id).map((request) => (
                <MaintenanceCard
                  key={request.id}
                  request={request}
                  onDragStart={(e) => handleDragStart(e, request.id)}
                />
              ))}
              {getColumnRequests(column.id).length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                  No requests
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <MaintenanceFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
    </>
  );
}

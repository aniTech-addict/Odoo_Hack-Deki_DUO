import { MainLayout } from '@/components/layout/MainLayout.jsx';
import { PageHeader } from '@/components/layout/PageHeader.jsx';
import { KanbanBoard } from '@/components/maintenance/KanbanBoard.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Plus, Filter } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <MainLayout>
      <PageHeader
        title="Maintenance Requests"
        description="Track and manage all maintenance activities"
        actions={
          <>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </>
        }
      />
      <KanbanBoard />
    </MainLayout>
  );
}
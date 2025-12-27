import { MainLayout } from '@/components/layout/MainLayout.jsx';
import { PageHeader } from '@/components/layout/PageHeader.jsx';
import { EquipmentTable } from '@/components/equipment/EquipmentTable.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Plus } from 'lucide-react';

export default function EquipmentPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Equipment"
        description="Manage and monitor all equipment across your organization"
        actions={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Equipment
          </Button>
        }
      />
      <EquipmentTable />
    </MainLayout>
  );
}
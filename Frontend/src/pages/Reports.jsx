import { MainLayout } from '@/components/layout/MainLayout.jsx';
import { PageHeader } from '@/components/layout/PageHeader.jsx';
import { ReportsOverview } from '@/components/reports/ReportsOverview.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Download } from 'lucide-react';

export default function ReportsPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Reports"
        description="Analytics and insights for maintenance operations"
        actions={
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        }
      />
      <ReportsOverview />
    </MainLayout>
  );
}
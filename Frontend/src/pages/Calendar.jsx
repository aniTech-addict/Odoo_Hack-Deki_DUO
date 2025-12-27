import { MainLayout } from '@/components/layout/MainLayout.jsx';
import { PageHeader } from '@/components/layout/PageHeader.jsx';
import { MaintenanceCalendar } from '@/components/calendar/MaintenanceCalendar.jsx';

export default function CalendarPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Maintenance Calendar"
        description="View and schedule preventive maintenance tasks"
      />
      <MaintenanceCalendar />
    </MainLayout>
  );
}
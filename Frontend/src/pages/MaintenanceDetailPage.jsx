import { useParams, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout.jsx";
import { MaintenanceRequestDetail } from "@/components/maintenance/MaintenanceRequestDetail.jsx";
import { maintenanceRequests } from "@/data/mockData.js";

const MaintenanceDetailPage = () => {
  const { id } = useParams();
  const request = maintenanceRequests.find((r) => r.id === id);

  if (!request) {
    return <Navigate to="/maintenance" replace />;
  }

  return (
    <MainLayout>
      <div className="p-6">
        <MaintenanceRequestDetail request={request} />
      </div>
    </MainLayout>
  );
};

export default MaintenanceDetailPage;
import { MainLayout } from "@/components/layout/MainLayout.jsx";
import { PageHeader } from "@/components/layout/PageHeader.jsx";
import { ProfileSettings } from "@/components/settings/ProfileSettings.jsx";

const Settings = () => {
  return (
    <MainLayout>
      <PageHeader title="Settings" />
      <div className="p-6">
        <ProfileSettings />
      </div>
    </MainLayout>
  );
};

export default Settings;
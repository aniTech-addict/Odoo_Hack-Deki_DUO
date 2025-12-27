import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Shield,
  Wrench,
  User,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WarrantyBadge } from '@/components/ui/status-badge';
import { equipment as mockEquipment, maintenanceRequests } from '@/data/mockData';
import { format } from 'date-fns';

export function EquipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const eq = mockEquipment.find((e) => e.id === id);

  if (!eq) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Equipment not found.</p>
        <Link to="/equipment">
          <Button variant="ghost" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Equipment
          </Button>
        </Link>
      </div>
    );
  }

  const openRequests = maintenanceRequests.filter(
    (r) => r.equipmentId === id && r.status !== 'repaired' && r.status !== 'scrap'
  ).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button */}
      <Link to="/equipment">
        <Button variant="ghost" size="sm" className="-ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Equipment
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{eq.name}</h1>
          <p className="mt-1 text-muted-foreground font-mono">{eq.serialNumber}</p>
        </div>
        <Link to={`/maintenance?equipment=${id}`}>
          <button className="smart-button">
            <Wrench className="w-4 h-4" />
            Maintenance
            {openRequests > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                {openRequests}
              </span>
            )}
          </button>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard
          icon={Calendar}
          label="Purchase Date"
          value={format(new Date(eq.purchaseDate), 'MMM d, yyyy')}
        />
        <InfoCard
          icon={Shield}
          label="Warranty Status"
          value={<WarrantyBadge status={eq.warrantyStatus} />}
          subValue={
            eq.warrantyExpiry
              ? `Expires ${format(new Date(eq.warrantyExpiry), 'MMM d, yyyy')}`
              : undefined
          }
        />
        <InfoCard icon={MapPin} label="Location" value={eq.location} />
        <InfoCard icon={User} label="Assigned To" value={eq.assignedEmployee} />
      </div>

      {/* Additional Details */}
      <div className="card-interactive p-6">
        <h2 className="text-lg font-medium mb-4">Details</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailRow label="Category" value={eq.category} />
          <DetailRow label="Department" value={eq.department} />
          <DetailRow label="Maintenance Team" value={eq.maintenanceTeam} />
          <DetailRow label="Serial Number" value={eq.serialNumber} />
        </dl>
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  subValue?: string;
}

function InfoCard({ icon: Icon, label, value, subValue }: InfoCardProps) {
  return (
    <div className="card-interactive p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="mt-1 font-medium text-foreground">{value}</div>
          {subValue && (
            <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

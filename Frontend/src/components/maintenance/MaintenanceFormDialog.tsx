import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { equipment as mockEquipment, maintenanceTeams } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface MaintenanceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MaintenanceFormDialog({
  open,
  onOpenChange,
}: MaintenanceFormDialogProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [requestType, setRequestType] = useState<string>('corrective');
  const [status, setStatus] = useState<string>('new');

  const selectedEq = mockEquipment.find((e) => e.id === selectedEquipment);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Maintenance Request</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-4">
          {/* Request Type */}
          <div className="space-y-2">
            <Label>Request Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={requestType === 'corrective' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRequestType('corrective')}
              >
                Corrective
              </Button>
              <Button
                type="button"
                variant={requestType === 'preventive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRequestType('preventive')}
              >
                Preventive
              </Button>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Describe the issue or task..." />
          </div>

          {/* Equipment */}
          <div className="space-y-2">
            <Label>Equipment</Label>
            <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
              <SelectTrigger>
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                {mockEquipment.map((eq) => (
                  <SelectItem key={eq.id} value={eq.id}>
                    {eq.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Auto-filled fields */}
          {selectedEq && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Maintenance Team</Label>
                <Input
                  value={selectedEq.maintenanceTeam}
                  readOnly
                  className="input-autofilled"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={selectedEq.category}
                  readOnly
                  className="input-autofilled"
                />
              </div>
            </div>
          )}

          {/* Scheduled Date */}
          {requestType === 'preventive' && (
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input id="scheduledDate" type="date" />
            </div>
          )}

          {/* Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration (hours)</Label>
              <Input id="duration" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hoursSpent">Hours Spent</Label>
              <Input id="hoursSpent" type="number" placeholder="0" />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="repaired">Repaired</SelectItem>
                <SelectItem value="scrap">
                  <span className="text-destructive">Scrap</span>
                </SelectItem>
              </SelectContent>
            </Select>
            {status === 'scrap' && (
              <p className="text-xs text-destructive">
                Warning: This will mark the equipment as unusable.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

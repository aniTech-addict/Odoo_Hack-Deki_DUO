import { useState } from 'react';
import axios from 'axios';
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
import { useToast } from '@/hooks/use-toast';

interface MaintenanceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MaintenanceFormDialog({
  open,
  onOpenChange,
}: MaintenanceFormDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    status: 'New Request',
    equipment: {
      id: '',
      serialNumber: '',
      category: ''
    },
    maintenanceType: 'Corrective',
    duration: 0,
    scheduledDate: null
  });

  const selectedEq = mockEquipment.find((e) => e.id === formData.equipment.id);

  const handleInputChange = (name: string, value: any) => {
    if (name.startsWith('equipment.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        equipment: {
          ...prev.equipment,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEquipmentChange = (equipmentId: string) => {
    const eq = mockEquipment.find(e => e.id === equipmentId);
    if (eq) {
      setFormData(prev => ({
        ...prev,
        equipment: {
          id: equipmentId,
          serialNumber: eq.serialNumber,
          category: eq.category
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      duration: Number(formData.duration),
      scheduledDate: formData.scheduledDate ? new Date(formData.scheduledDate) : null
    };

    try {
      await axios.post('/api/maintenance', payload);
      toast({
        title: 'Success',
        description: 'Maintenance request created successfully'
      });
      onOpenChange(false);
      // Reset form
      setFormData({
        subject: '',
        status: 'New Request',
        equipment: {
          id: '',
          serialNumber: '',
          category: ''
        },
        maintenanceType: 'Corrective',
        duration: 0,
        scheduledDate: null
      });
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Maintenance Request</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          {/* Request Type */}
          <div className="space-y-2">
            <Label>Request Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={formData.maintenanceType === 'Corrective' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('maintenanceType', 'Corrective')}
              >
                Corrective
              </Button>
              <Button
                type="button"
                variant={formData.maintenanceType === 'Preventive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('maintenanceType', 'Preventive')}
              >
                Preventive
              </Button>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Describe the issue or task..."
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />
          </div>

          {/* Equipment */}
          <div className="space-y-2">
            <Label>Equipment</Label>
            <Select value={formData.equipment.id} onValueChange={handleEquipmentChange}>
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
                <Label>Serial Number</Label>
                <Input
                  value={selectedEq.serialNumber}
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
          {formData.maintenanceType === 'Preventive' && (
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate || ''}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
              />
            </div>
          )}

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Estimated Duration (hours)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="0"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', Number(e.target.value))}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New Request">New Request</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Repaired">Repaired</SelectItem>
                <SelectItem value="Scrap">Scrap</SelectItem>
              </SelectContent>
            </Select>
            {formData.status === 'Scrap' && (
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

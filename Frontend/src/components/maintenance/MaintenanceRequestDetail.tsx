import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MaintenanceRequest, MaintenanceStatus, RequestType } from "@/types/maintenance";
import { equipment, maintenanceTeams } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MaintenanceRequestDetailProps {
  request: MaintenanceRequest;
}

const technicians = [
  { id: "t1", name: "Alex Thompson", avatar: "AT" },
  { id: "t2", name: "Maria Garcia", avatar: "MG" },
  { id: "t3", name: "James Lee", avatar: "JL" },
  { id: "t4", name: "David Kim", avatar: "DK" },
  { id: "t5", name: "Aka Foster", avatar: "AF" },
];

const statusSteps: { status: MaintenanceStatus; label: string }[] = [
  { status: "new", label: "New Request" },
  { status: "in_progress", label: "In Progress" },
  { status: "repaired", label: "Repaired" },
  { status: "scrap", label: "Scrap" },
];

export const MaintenanceRequestDetail = ({ request }: MaintenanceRequestDetailProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: request.subject,
    type: request.type as RequestType,
    equipmentId: request.equipmentId,
    status: request.status,
    technicianId: request.assignedTechnician.id,
    maintenanceTeam: request.maintenanceTeam,
    category: request.category,
    scheduledDate: request.scheduledDate,
    duration: request.duration || 0,
    hoursSpent: request.hoursSpent || 0,
    priority: "normal",
    notes: "",
    instructions: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const selectedEquipment = equipment.find((e) => e.id === formData.equipmentId);
  const selectedTechnician = technicians.find((t) => t.id === formData.technicianId);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-fill team and category when equipment changes
    if (field === "equipmentId") {
      const eq = equipment.find((e) => e.id === value);
      if (eq) {
        setFormData((prev) => ({
          ...prev,
          equipmentId: value as string,
          maintenanceTeam: eq.maintenanceTeam,
          category: eq.category,
        }));
      }
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Maintenance request updated successfully");
  };

  const handleStatusChange = (newStatus: MaintenanceStatus) => {
    setFormData((prev) => ({ ...prev, status: newStatus }));
    toast.success(`Status changed to ${newStatus.replace("_", " ")}`);
  };

  const currentStatusIndex = statusSteps.findIndex((s) => s.status === formData.status);

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb and status tracker */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/maintenance")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Maintenance Requests</span>
              <span>/</span>
              <span>{formData.subject}</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground mt-1">{formData.subject}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>

      {/* Status Progress Bar */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => (
              <div key={step.status} className="flex items-center flex-1">
                <button
                  onClick={() => handleStatusChange(step.status)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    formData.status === step.status
                      ? "bg-primary text-primary-foreground"
                      : index <= currentStatusIndex
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <span className="text-sm font-medium">{step.label}</span>
                </button>
                {index < statusSteps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2",
                      index < currentStatusIndex ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <Card>
          <CardContent className="pt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label>Created by</Label>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    MA
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">Mitchell Admin</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment">Equipment</Label>
              <Select
                value={formData.equipmentId}
                onValueChange={(value) => handleInputChange("equipmentId", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  {equipment.map((eq) => (
                    <SelectItem key={eq.id} value={eq.id}>
                      {eq.name} / {eq.serialNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedEquipment && (
                <p className="text-xs text-muted-foreground mt-1">
                  Serial: {selectedEquipment.serialNumber}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={formData.category}
                disabled
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground">Auto-filled from equipment</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requestDate">Request Date</Label>
              <Input
                id="requestDate"
                type="date"
                value={request.createdAt}
                disabled
                className="bg-muted/50"
              />
            </div>

            <div className="space-y-3">
              <Label>Maintenance Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
                disabled={!isEditing}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corrective" id="corrective" />
                  <Label htmlFor="corrective" className="font-normal cursor-pointer">
                    Corrective
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="preventive" id="preventive" />
                  <Label htmlFor="preventive" className="font-normal cursor-pointer">
                    Preventive
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card>
          <CardContent className="pt-6 space-y-5">
            <div className="space-y-2">
              <Label>Team</Label>
              <Select
                value={formData.maintenanceTeam}
                onValueChange={(value) => handleInputChange("maintenanceTeam", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceTeams.map((team) => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Technician</Label>
              <Select
                value={formData.technicianId}
                onValueChange={(value) => handleInputChange("technicianId", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {technicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {tech.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {tech.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input
                id="scheduledDate"
                type="datetime-local"
                value={formData.scheduledDate ? `${formData.scheduledDate}T14:30` : ""}
                onChange={(e) =>
                  handleInputChange("scheduledDate", e.target.value.split("T")[0])
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                step="0.5"
                min="0"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", parseFloat(e.target.value) || 0)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Company</Label>
              <Input value="My Company (San Francisco)" disabled className="bg-muted/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes and Instructions Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="notes">
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-4">
              <Textarea
                placeholder="Add notes about this maintenance request..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                disabled={!isEditing}
                className="min-h-[120px]"
              />
            </TabsContent>
            <TabsContent value="instructions" className="mt-4">
              <Textarea
                placeholder="Add maintenance instructions..."
                value={formData.instructions}
                onChange={(e) => handleInputChange("instructions", e.target.value)}
                disabled={!isEditing}
                className="min-h-[120px]"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      {formData.status === "scrap" && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-destructive">Equipment Marked as Scrap</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This equipment has been marked as unusable and scheduled for disposal.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Confirm Scrap
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

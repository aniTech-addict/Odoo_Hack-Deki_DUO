import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User } from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  avatar: string | null;
}

export const ProfileSettings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "Maintenance",
    jobTitle: "Lead Technician",
    avatar: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }));
        toast.success("Profile image updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal details and profile picture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar || undefined} alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Profile Photo</h3>
              <p className="text-sm text-muted-foreground">
                JPG, PNG or GIF. Max size 5MB
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profile.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={profile.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {isEditing ? (
              <>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

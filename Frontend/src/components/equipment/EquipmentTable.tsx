import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { WarrantyBadge } from '@/components/ui/status-badge';
import { Equipment } from '@/types/maintenance';
import { equipment as mockEquipment, maintenanceTeams } from '@/data/mockData';

export function EquipmentTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');

  const departments = [...new Set(mockEquipment.map((e) => e.department))];

  const filteredEquipment = mockEquipment.filter((eq) => {
    const matchesSearch =
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.assignedEmployee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === 'all' || eq.department === departmentFilter;
    const matchesTeam =
      teamFilter === 'all' || eq.maintenanceTeam === teamFilter;
    return matchesSearch && matchesDepartment && matchesTeam;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={teamFilter} onValueChange={setTeamFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Maintenance Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {maintenanceTeams.map((team) => (
              <SelectItem key={team.id} value={team.name}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="card-interactive overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Equipment Name</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Assigned Employee</TableHead>
              <TableHead>Maintenance Team</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Warranty</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.map((eq) => (
              <TableRow key={eq.id} className="group">
                <TableCell className="font-medium">{eq.name}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">
                  {eq.serialNumber}
                </TableCell>
                <TableCell>{eq.department}</TableCell>
                <TableCell>{eq.assignedEmployee}</TableCell>
                <TableCell>{eq.maintenanceTeam}</TableCell>
                <TableCell className="text-muted-foreground">
                  {eq.location}
                </TableCell>
                <TableCell>
                  <WarrantyBadge status={eq.warrantyStatus} />
                </TableCell>
                <TableCell>
                  <Link to={`/equipment/${eq.id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredEquipment.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No equipment found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

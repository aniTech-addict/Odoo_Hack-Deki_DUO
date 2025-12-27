import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { maintenanceRequests, maintenanceTeams, equipment } from '@/data/mockData';

export function ReportsOverview() {
  // Requests per team
  const requestsByTeam = maintenanceTeams.map((team) => ({
    name: team.name.replace(' Team', ''),
    value: maintenanceRequests.filter((r) => r.maintenanceTeam === team.name).length,
    color: team.color,
  }));

  // Requests per category
  const categories = [...new Set(equipment.map((e) => e.category))];
  const requestsByCategory = categories.map((cat) => ({
    name: cat.split(' ')[0],
    value: maintenanceRequests.filter((r) => r.category === cat).length,
  }));

  // Status distribution
  const statusData = [
    {
      name: 'New',
      value: maintenanceRequests.filter((r) => r.status === 'new').length,
      color: 'hsl(220, 90%, 56%)',
    },
    {
      name: 'In Progress',
      value: maintenanceRequests.filter((r) => r.status === 'in_progress').length,
      color: 'hsl(38, 92%, 50%)',
    },
    {
      name: 'Repaired',
      value: maintenanceRequests.filter((r) => r.status === 'repaired').length,
      color: 'hsl(142, 71%, 45%)',
    },
    {
      name: 'Scrap',
      value: maintenanceRequests.filter((r) => r.status === 'scrap').length,
      color: 'hsl(0, 72%, 51%)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Requests"
          value={maintenanceRequests.length}
          trend="+12%"
        />
        <StatCard
          label="Open Requests"
          value={
            maintenanceRequests.filter(
              (r) => r.status === 'new' || r.status === 'in_progress'
            ).length
          }
          trend="-3%"
        />
        <StatCard
          label="Overdue"
          value={maintenanceRequests.filter((r) => r.isOverdue).length}
          trend="+2"
          negative
        />
        <StatCard
          label="Equipment"
          value={equipment.length}
          trend="Active"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests by Team */}
        <div className="card-interactive p-6">
          <h3 className="font-medium text-foreground mb-4">Requests per Team</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={requestsByTeam}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {requestsByTeam.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="card-interactive p-6">
          <h3 className="font-medium text-foreground mb-4">Status Distribution</h3>
          <div className="h-[250px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 pr-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requests by Category */}
        <div className="card-interactive p-6 lg:col-span-2">
          <h3 className="font-medium text-foreground mb-4">
            Requests per Equipment Category
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={requestsByCategory}
                layout="vertical"
                margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  trend: string;
  negative?: boolean;
}

function StatCard({ label, value, trend, negative }: StatCardProps) {
  return (
    <div className="card-interactive p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <span className="text-3xl font-semibold text-foreground">{value}</span>
        <span
          className={`text-sm font-medium ${
            negative ? 'text-destructive' : 'text-status-repaired'
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

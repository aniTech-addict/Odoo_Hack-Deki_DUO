import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { maintenanceRequests } from '@/data/mockData';
import { cn } from '@/lib/utils';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function MaintenanceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const preventiveRequests = maintenanceRequests.filter(
    (r) => r.type === 'preventive'
  );

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDay = (date: Date) =>
    preventiveRequests.filter((r) =>
      isSameDay(new Date(r.scheduledDate), date)
    );

  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card-interactive overflow-hidden">
        {/* Week days header */}
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const events = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, today);

            return (
              <div
                key={idx}
                className={cn(
                  'min-h-[120px] border-b border-r border-border p-2 transition-colors hover:bg-muted/50',
                  !isCurrentMonth && 'bg-muted/30'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      'text-sm font-medium',
                      !isCurrentMonth && 'text-muted-foreground',
                      isToday &&
                        'w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  {isCurrentMonth && events.length === 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  )}
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        'text-xs px-2 py-1 rounded truncate cursor-pointer transition-colors',
                        event.status === 'new' && 'bg-status-new-bg text-status-new',
                        event.status === 'in_progress' &&
                          'bg-status-progress-bg text-status-progress',
                        event.status === 'repaired' &&
                          'bg-status-repaired-bg text-status-repaired'
                      )}
                    >
                      {event.subject}
                    </div>
                  ))}
                  {events.length > 2 && (
                    <div className="text-xs text-muted-foreground px-2">
                      +{events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-status-new" />
          <span className="text-muted-foreground">New</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-status-progress" />
          <span className="text-muted-foreground">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-status-repaired" />
          <span className="text-muted-foreground">Completed</span>
        </div>
      </div>
    </div>
  );
}

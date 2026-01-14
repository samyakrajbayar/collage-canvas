import { Deadline } from '@/types/deadline';
import { getUrgencyLevel } from '@/utils/dateUtils';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, Clock, Target } from 'lucide-react';

interface StatsOverviewProps {
  deadlines: Deadline[];
}

export function StatsOverview({ deadlines }: StatsOverviewProps) {
  const total = deadlines.length;
  const completed = deadlines.filter((d) => d.completed).length;
  const pending = deadlines.filter((d) => !d.completed);
  const urgent = pending.filter((d) => getUrgencyLevel(d.dueDate) === 'urgent').length;
  const upcoming = pending.filter((d) => getUrgencyLevel(d.dueDate) === 'soon').length;

  const stats = [
    {
      label: 'Total Deadlines',
      value: total,
      icon: Target,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'Urgent',
      value: urgent,
      icon: AlertTriangle,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    {
      label: 'Coming Soon',
      value: upcoming,
      icon: Clock,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

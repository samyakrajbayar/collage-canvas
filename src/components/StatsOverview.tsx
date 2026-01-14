import { Deadline } from '@/types/deadline';
import { getUrgencyLevel } from '@/utils/dateUtils';
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
      label: 'Total',
      value: total,
      icon: Target,
      gradient: 'from-primary to-accent',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      gradient: 'from-success to-emerald-400',
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      label: 'Urgent',
      value: urgent,
      icon: AlertTriangle,
      gradient: 'from-destructive to-rose-400',
      iconBg: 'bg-destructive/10',
      iconColor: 'text-destructive',
    },
    {
      label: 'Coming Soon',
      value: upcoming,
      icon: Clock,
      gradient: 'from-warning to-amber-400',
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl bg-card p-5 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          {/* Gradient accent line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-80`} />
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground font-display">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                {stat.label}
              </p>
            </div>
            
            <div className={`p-3 rounded-xl ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

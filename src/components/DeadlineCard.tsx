import { Deadline } from '@/types/deadline';
import { CategoryBadge } from './CategoryBadge';
import { PriorityIndicator } from './PriorityIndicator';
import { formatDueDate, getTimeUntilDeadline, getUrgencyLevel, getDaysRemaining } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Clock, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

interface DeadlineCardProps {
  deadline: Deadline;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (deadline: Deadline) => void;
  index: number;
}

export function DeadlineCard({ deadline, onToggleComplete, onDelete, onEdit, index }: DeadlineCardProps) {
  const urgency = getUrgencyLevel(deadline.dueDate);
  const timeUntil = getTimeUntilDeadline(deadline.dueDate);
  const daysRemaining = getDaysRemaining(deadline.dueDate);
  
  const urgencyConfig = {
    urgent: {
      border: 'border-l-destructive',
      badge: 'bg-destructive/10 text-destructive',
      glow: 'shadow-[inset_0_0_0_1px_hsl(var(--destructive)/0.1)]',
    },
    soon: {
      border: 'border-l-warning',
      badge: 'bg-warning/10 text-warning',
      glow: 'shadow-[inset_0_0_0_1px_hsl(var(--warning)/0.1)]',
    },
    normal: {
      border: 'border-l-success',
      badge: 'bg-success/10 text-success',
      glow: '',
    },
  };

  const config = urgencyConfig[urgency];
  
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-card border-l-4 transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-0.5 shadow-card',
        config.border,
        config.glow,
        deadline.completed && 'opacity-60'
      )}
      style={{ 
        animationDelay: `${index * 60}ms`,
        opacity: 0,
        animation: 'fade-in 0.5s ease-out forwards'
      }}
    >
      {/* Progress bar for days remaining */}
      {!deadline.completed && daysRemaining <= 7 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted">
          <div 
            className={cn(
              'h-full transition-all duration-500',
              urgency === 'urgent' ? 'bg-destructive' : urgency === 'soon' ? 'bg-warning' : 'bg-success'
            )}
            style={{ width: `${Math.max(5, ((7 - daysRemaining) / 7) * 100)}%` }}
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Custom checkbox */}
          <button
            onClick={() => onToggleComplete(deadline.id)}
            className={cn(
              'mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
              deadline.completed 
                ? 'bg-success border-success text-success-foreground' 
                : 'border-muted-foreground/30 hover:border-primary hover:bg-primary/5'
            )}
          >
            {deadline.completed && <CheckCircle2 className="w-4 h-4" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={cn(
                  'font-semibold text-foreground text-lg leading-tight transition-all',
                  deadline.completed && 'line-through text-muted-foreground'
                )}>
                  {deadline.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                  {deadline.course}
                </p>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl hover:bg-muted"
                  onClick={() => onEdit(deadline)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(deadline.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {deadline.description && (
              <p className="text-sm text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">
                {deadline.description}
              </p>
            )}
            
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              <CategoryBadge category={deadline.category} />
              <PriorityIndicator priority={deadline.priority} showLabel />
              
              <div className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                config.badge
              )}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeUntil}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3 font-medium">
              📅 {formatDueDate(deadline.dueDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

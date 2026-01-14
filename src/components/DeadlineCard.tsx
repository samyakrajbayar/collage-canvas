import { Deadline } from '@/types/deadline';
import { CategoryBadge } from './CategoryBadge';
import { PriorityIndicator } from './PriorityIndicator';
import { formatDueDate, getTimeUntilDeadline, getUrgencyLevel } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Clock, Trash2, Edit2 } from 'lucide-react';

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
  
  const urgencyColors = {
    urgent: 'border-l-destructive',
    soon: 'border-l-warning',
    normal: 'border-l-success',
  };
  
  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-l-4 transition-all duration-300',
        'hover:shadow-card hover:-translate-y-0.5',
        urgencyColors[urgency],
        deadline.completed && 'opacity-60',
        'animate-fade-in'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="pt-1">
            <Checkbox
              checked={deadline.completed}
              onCheckedChange={() => onToggleComplete(deadline.id)}
              className="h-5 w-5"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className={cn(
                  'font-semibold text-foreground leading-tight',
                  deadline.completed && 'line-through text-muted-foreground'
                )}>
                  {deadline.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {deadline.course}
                </p>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit(deadline)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onDelete(deadline.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {deadline.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {deadline.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <CategoryBadge category={deadline.category} />
              <PriorityIndicator priority={deadline.priority} showLabel />
              
              <div className={cn(
                'flex items-center gap-1 text-xs font-medium',
                urgency === 'urgent' && 'text-destructive',
                urgency === 'soon' && 'text-warning',
                urgency === 'normal' && 'text-muted-foreground'
              )}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeUntil}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              {formatDueDate(deadline.dueDate)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

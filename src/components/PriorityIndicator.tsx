import { Priority, priorityLabels } from '@/types/deadline';
import { cn } from '@/lib/utils';
import { AlertCircle, ArrowUp, Minus } from 'lucide-react';

interface PriorityIndicatorProps {
  priority: Priority;
  showLabel?: boolean;
  className?: string;
}

const priorityConfig: Record<Priority, { icon: typeof AlertCircle; className: string }> = {
  high: {
    icon: AlertCircle,
    className: 'text-destructive',
  },
  medium: {
    icon: ArrowUp,
    className: 'text-warning',
  },
  low: {
    icon: Minus,
    className: 'text-muted-foreground',
  },
};

export function PriorityIndicator({ priority, showLabel = false, className }: PriorityIndicatorProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  
  return (
    <span className={cn('inline-flex items-center gap-1', config.className, className)}>
      <Icon className="w-4 h-4" />
      {showLabel && <span className="text-xs font-medium">{priorityLabels[priority]}</span>}
    </span>
  );
}

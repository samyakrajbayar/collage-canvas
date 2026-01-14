import { differenceInDays, differenceInHours, format, isToday, isTomorrow, isPast } from 'date-fns';

export function getTimeUntilDeadline(dueDate: string): string {
  const due = new Date(dueDate);
  const now = new Date();
  
  if (isPast(due)) {
    return 'Overdue';
  }
  
  const days = differenceInDays(due, now);
  const hours = differenceInHours(due, now) % 24;
  
  if (days === 0) {
    if (hours <= 1) return 'Due in 1 hour';
    return `Due in ${hours} hours`;
  }
  
  if (days === 1) {
    return 'Due tomorrow';
  }
  
  if (days < 7) {
    return `Due in ${days} days`;
  }
  
  return `Due in ${Math.ceil(days / 7)} weeks`;
}

export function getUrgencyLevel(dueDate: string): 'urgent' | 'soon' | 'normal' {
  const due = new Date(dueDate);
  const now = new Date();
  
  if (isPast(due)) return 'urgent';
  
  const days = differenceInDays(due, now);
  
  if (days <= 1) return 'urgent';
  if (days <= 3) return 'soon';
  return 'normal';
}

export function formatDueDate(dueDate: string): string {
  const date = new Date(dueDate);
  
  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  }
  
  if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'h:mm a')}`;
  }
  
  return format(date, 'MMM d, yyyy');
}

export function getDaysRemaining(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  return Math.max(0, differenceInDays(due, now));
}

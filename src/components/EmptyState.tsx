import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddClick: () => void;
  isFiltered: boolean;
}

export function EmptyState({ onAddClick, isFiltered }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Calendar className="w-8 h-8 text-muted-foreground" />
      </div>
      
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        {isFiltered ? 'No matching deadlines' : 'No deadlines yet'}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        {isFiltered
          ? 'Try adjusting your filters to see more deadlines.'
          : 'Start tracking your academic deadlines by adding your first one.'}
      </p>
      
      {!isFiltered && (
        <Button onClick={onAddClick}>
          <Plus className="w-4 h-4 mr-2" />
          Add Your First Deadline
        </Button>
      )}
    </div>
  );
}

import { CalendarDays, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddClick: () => void;
  isFiltered: boolean;
}

export function EmptyState({ onAddClick, isFiltered }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center shadow-glow animate-float">
          <CalendarDays className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-lg">
          <Sparkles className="w-4 h-4 text-secondary-foreground" />
        </div>
      </div>
      
      <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
        {isFiltered ? 'No matching deadlines' : 'Start your journey'}
      </h3>
      
      <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
        {isFiltered
          ? 'Try adjusting your filters to see more deadlines.'
          : 'Track your academic deadlines and never miss an important date again.'}
      </p>
      
      {!isFiltered && (
        <Button 
          onClick={onAddClick}
          size="lg"
          className="rounded-xl px-6 gradient-primary border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Your First Deadline
        </Button>
      )}
    </div>
  );
}

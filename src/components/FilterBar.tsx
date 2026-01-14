import { Category, categoryLabels } from '@/types/deadline';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, LayoutGrid } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  showCompleted: boolean;
  onShowCompletedChange: (show: boolean) => void;
}

export function FilterBar({
  selectedCategory,
  onCategoryChange,
  showCompleted,
  onShowCompletedChange,
}: FilterBarProps) {
  const categories: (Category | 'all')[] = ['all', 'assignment', 'exam', 'project', 'quiz', 'other'];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 glass rounded-2xl animate-fade-in">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 flex-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
              selectedCategory === cat
                ? 'gradient-primary text-white shadow-md shadow-primary/25'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {cat === 'all' ? (
              <span className="flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                All
              </span>
            ) : (
              categoryLabels[cat]
            )}
          </button>
        ))}
      </div>

      {/* Toggle completed */}
      <button
        onClick={() => onShowCompletedChange(!showCompleted)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
          showCompleted 
            ? 'bg-success/10 text-success' 
            : 'bg-muted/50 text-muted-foreground hover:bg-muted'
        )}
      >
        {showCompleted ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <Circle className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">{showCompleted ? 'Showing Completed' : 'Hide Completed'}</span>
        <span className="sm:hidden">{showCompleted ? 'Done' : 'Hidden'}</span>
      </button>
    </div>
  );
}

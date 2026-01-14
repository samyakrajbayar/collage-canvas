import { Category, categoryLabels } from '@/types/deadline';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Filter, CheckCircle, Circle, LayoutGrid } from 'lucide-react';

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
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filter:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(cat)}
            className={cn(
              'transition-all',
              selectedCategory === cat && 'shadow-sm'
            )}
          >
            {cat === 'all' ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5 mr-1.5" />
                All
              </>
            ) : (
              categoryLabels[cat]
            )}
          </Button>
        ))}
      </div>

      <div className="ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onShowCompletedChange(!showCompleted)}
          className={cn(
            'text-muted-foreground',
            showCompleted && 'text-success'
          )}
        >
          {showCompleted ? (
            <CheckCircle className="w-4 h-4 mr-1.5" />
          ) : (
            <Circle className="w-4 h-4 mr-1.5" />
          )}
          {showCompleted ? 'Showing Completed' : 'Hide Completed'}
        </Button>
      </div>
    </div>
  );
}

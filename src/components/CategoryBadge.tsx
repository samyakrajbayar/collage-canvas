import { Category, categoryLabels } from '@/types/deadline';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, FolderKanban, HelpCircle, FileText } from 'lucide-react';

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

const categoryConfig: Record<Category, { icon: typeof BookOpen; className: string }> = {
  assignment: {
    icon: FileText,
    className: 'bg-[hsl(var(--category-assignment))]/10 text-[hsl(var(--category-assignment))] ring-[hsl(var(--category-assignment))]/20',
  },
  exam: {
    icon: GraduationCap,
    className: 'bg-[hsl(var(--category-exam))]/10 text-[hsl(var(--category-exam))] ring-[hsl(var(--category-exam))]/20',
  },
  project: {
    icon: FolderKanban,
    className: 'bg-[hsl(var(--category-project))]/10 text-[hsl(var(--category-project))] ring-[hsl(var(--category-project))]/20',
  },
  quiz: {
    icon: BookOpen,
    className: 'bg-[hsl(var(--category-quiz))]/10 text-[hsl(var(--category-quiz))] ring-[hsl(var(--category-quiz))]/20',
  },
  other: {
    icon: HelpCircle,
    className: 'bg-[hsl(var(--category-other))]/10 text-[hsl(var(--category-other))] ring-[hsl(var(--category-other))]/20',
  },
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset transition-all',
        config.className,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {categoryLabels[category]}
    </span>
  );
}

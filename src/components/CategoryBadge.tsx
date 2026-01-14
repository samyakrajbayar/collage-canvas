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
    className: 'bg-category-assignment/10 text-category-assignment border-category-assignment/20',
  },
  exam: {
    icon: GraduationCap,
    className: 'bg-category-exam/10 text-category-exam border-category-exam/20',
  },
  project: {
    icon: FolderKanban,
    className: 'bg-category-project/10 text-category-project border-category-project/20',
  },
  quiz: {
    icon: BookOpen,
    className: 'bg-category-quiz/10 text-category-quiz border-category-quiz/20',
  },
  other: {
    icon: HelpCircle,
    className: 'bg-category-other/10 text-category-other border-category-other/20',
  },
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {categoryLabels[category]}
    </span>
  );
}

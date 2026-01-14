export type Category = 'assignment' | 'exam' | 'project' | 'quiz' | 'other';
export type Priority = 'high' | 'medium' | 'low';

export interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: Category;
  priority: Priority;
  course: string;
  completed: boolean;
  createdAt: string;
}

export const categoryLabels: Record<Category, string> = {
  assignment: 'Assignment',
  exam: 'Exam',
  project: 'Project',
  quiz: 'Quiz',
  other: 'Other',
};

export const priorityLabels: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

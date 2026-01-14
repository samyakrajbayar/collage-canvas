import { useState, useMemo } from 'react';
import { useDeadlines } from '@/hooks/useDeadlines';
import { Deadline, Category } from '@/types/deadline';
import { DeadlineCard } from '@/components/DeadlineCard';
import { AddDeadlineDialog } from '@/components/AddDeadlineDialog';
import { StatsOverview } from '@/components/StatsOverview';
import { FilterBar } from '@/components/FilterBar';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const { deadlines, isLoading, addDeadline, updateDeadline, deleteDeadline, toggleComplete } = useDeadlines();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredDeadlines = useMemo(() => {
    return deadlines
      .filter((d) => {
        if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
        if (!showCompleted && d.completed) return false;
        return true;
      })
      .sort((a, b) => {
        // Completed items go to the bottom
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        // Sort by due date
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [deadlines, selectedCategory, showCompleted]);

  const handleSave = (data: Omit<Deadline, 'id' | 'createdAt'>) => {
    if (editingDeadline) {
      updateDeadline(editingDeadline.id, data);
      toast.success('Deadline updated successfully!');
    } else {
      addDeadline(data);
      toast.success('Deadline added successfully!');
    }
    setEditingDeadline(null);
  };

  const handleEdit = (deadline: Deadline) => {
    setEditingDeadline(deadline);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteDeadline(id);
    toast.success('Deadline deleted');
  };

  const handleToggleComplete = (id: string) => {
    toggleComplete(id);
    const deadline = deadlines.find((d) => d.id === id);
    if (deadline) {
      toast.success(deadline.completed ? 'Marked as pending' : 'Marked as complete! 🎉');
    }
  };

  const isFiltered = selectedCategory !== 'all' || !showCompleted;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Deadline Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Stay on top of your academic goals
                </p>
              </div>
            </div>
            
            <Button onClick={() => setDialogOpen(true)} className="shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Deadline
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Stats */}
        <StatsOverview deadlines={deadlines} />

        {/* Filters */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showCompleted={showCompleted}
          onShowCompletedChange={setShowCompleted}
        />

        {/* Deadline List */}
        {filteredDeadlines.length > 0 ? (
          <div className="space-y-3">
            {filteredDeadlines.map((deadline, index) => (
              <DeadlineCard
                key={deadline.id}
                deadline={deadline}
                index={index}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            onAddClick={() => setDialogOpen(true)}
            isFiltered={isFiltered}
          />
        )}
      </main>

      {/* Add/Edit Dialog */}
      <AddDeadlineDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingDeadline(null);
        }}
        onSave={handleSave}
        editingDeadline={editingDeadline}
      />
    </div>
  );
};

export default Index;

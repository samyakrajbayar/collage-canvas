import { useState, useMemo } from 'react';
import { useDeadlines } from '@/hooks/useDeadlines';
import { Deadline, Category } from '@/types/deadline';
import { DeadlineCard } from '@/components/DeadlineCard';
import { AddDeadlineDialog } from '@/components/AddDeadlineDialog';
import { StatsOverview } from '@/components/StatsOverview';
import { FilterBar } from '@/components/FilterBar';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus, GraduationCap, Sparkles } from 'lucide-react';
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
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
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
      toast.success(deadline.completed ? 'Marked as pending' : 'Completed! Great work! 🎉');
    }
  };

  const isFiltered = selectedCategory !== 'all' || !showCompleted;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center animate-pulse">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-strong">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 rounded-2xl gradient-primary shadow-glow">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="font-display text-2xl font-semibold text-foreground">
                  Deadline Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Stay on top of your academic goals
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => setDialogOpen(true)} 
              size="lg"
              className="rounded-xl gradient-primary border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Add Deadline</span>
              <span className="sm:hidden">Add</span>
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

        {/* Section header */}
        {filteredDeadlines.length > 0 && (
          <div className="flex items-center justify-between animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground">
              Upcoming Deadlines
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredDeadlines.filter(d => !d.completed).length} pending
            </span>
          </div>
        )}

        {/* Deadline List */}
        {filteredDeadlines.length > 0 ? (
          <div className="space-y-4">
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

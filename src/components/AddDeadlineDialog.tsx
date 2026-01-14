import { useState, useEffect } from 'react';
import { Deadline, Category, Priority, categoryLabels, priorityLabels } from '@/types/deadline';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddDeadlineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (deadline: Omit<Deadline, 'id' | 'createdAt'>) => void;
  editingDeadline?: Deadline | null;
}

export function AddDeadlineDialog({ open, onOpenChange, onSave, editingDeadline }: AddDeadlineDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [category, setCategory] = useState<Category>('assignment');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [dueTime, setDueTime] = useState('23:59');

  useEffect(() => {
    if (editingDeadline) {
      setTitle(editingDeadline.title);
      setDescription(editingDeadline.description);
      setCourse(editingDeadline.course);
      setCategory(editingDeadline.category);
      setPriority(editingDeadline.priority);
      const date = new Date(editingDeadline.dueDate);
      setDueDate(date);
      setDueTime(format(date, 'HH:mm'));
    } else {
      resetForm();
    }
  }, [editingDeadline, open]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCourse('');
    setCategory('assignment');
    setPriority('medium');
    setDueDate(undefined);
    setDueTime('23:59');
  };

  const handleSave = () => {
    if (!title || !dueDate || !course) return;

    const [hours, minutes] = dueTime.split(':').map(Number);
    const finalDate = new Date(dueDate);
    finalDate.setHours(hours, minutes);

    onSave({
      title,
      description,
      course,
      category,
      priority,
      dueDate: finalDate.toISOString(),
      completed: editingDeadline?.completed ?? false,
    });

    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <div className="p-2 rounded-xl gradient-primary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {editingDeadline ? 'Edit Deadline' : 'New Deadline'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Final Exam, Research Paper"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border-muted bg-muted/30 focus:bg-card transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course" className="text-sm font-semibold">Course *</Label>
            <Input
              id="course"
              placeholder="e.g., CS 101, MATH 201"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="rounded-xl border-muted bg-muted/30 focus:bg-card transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
            <Textarea
              id="description"
              placeholder="Add any notes or details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-xl border-muted bg-muted/30 focus:bg-card transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger className="rounded-xl border-muted bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="rounded-lg">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger className="rounded-xl border-muted bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="rounded-lg">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Due Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal rounded-xl border-muted bg-muted/30',
                      !dueDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, 'MMM d, yyyy') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="rounded-xl"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-semibold">Due Time</Label>
              <Input
                id="time"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="rounded-xl border-muted bg-muted/30"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!title || !dueDate || !course}
            className="rounded-xl gradient-primary border-0 shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
          >
            {editingDeadline ? 'Save Changes' : 'Add Deadline'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

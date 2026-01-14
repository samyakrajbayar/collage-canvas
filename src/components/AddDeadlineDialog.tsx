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
import { CalendarIcon } from 'lucide-react';
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {editingDeadline ? 'Edit Deadline' : 'Add New Deadline'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Final Exam, Research Paper"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course *</Label>
            <Input
              id="course"
              placeholder="e.g., CS 101, MATH 201"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add any notes or details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dueDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, 'MMM d, yyyy') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Due Time</Label>
              <Input
                id="time"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title || !dueDate || !course}>
            {editingDeadline ? 'Save Changes' : 'Add Deadline'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

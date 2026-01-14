import { useState, useEffect, useCallback } from 'react';
import { Deadline } from '@/types/deadline';

const STORAGE_KEY = 'college-deadlines';

const sampleDeadlines: Deadline[] = [
  {
    id: '1',
    title: 'Calculus Final Exam',
    description: 'Chapters 1-12, bring calculator',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'exam',
    priority: 'high',
    course: 'MATH 201',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Research Paper Draft',
    description: 'First draft of research paper on AI ethics',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'assignment',
    priority: 'high',
    course: 'CS 450',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Group Project Presentation',
    description: 'Prepare slides and practice presentation',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'project',
    priority: 'medium',
    course: 'BUS 301',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Physics Quiz',
    description: 'Chapters 5-6: Thermodynamics',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'quiz',
    priority: 'medium',
    course: 'PHYS 101',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export function useDeadlines() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setDeadlines(JSON.parse(stored));
    } else {
      setDeadlines(sampleDeadlines);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleDeadlines));
    }
    setIsLoading(false);
  }, []);

  const saveDeadlines = useCallback((newDeadlines: Deadline[]) => {
    setDeadlines(newDeadlines);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDeadlines));
  }, []);

  const addDeadline = useCallback((deadline: Omit<Deadline, 'id' | 'createdAt'>) => {
    const newDeadline: Deadline = {
      ...deadline,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveDeadlines([...deadlines, newDeadline]);
    return newDeadline;
  }, [deadlines, saveDeadlines]);

  const updateDeadline = useCallback((id: string, updates: Partial<Deadline>) => {
    const updated = deadlines.map((d) =>
      d.id === id ? { ...d, ...updates } : d
    );
    saveDeadlines(updated);
  }, [deadlines, saveDeadlines]);

  const deleteDeadline = useCallback((id: string) => {
    saveDeadlines(deadlines.filter((d) => d.id !== id));
  }, [deadlines, saveDeadlines]);

  const toggleComplete = useCallback((id: string) => {
    const updated = deadlines.map((d) =>
      d.id === id ? { ...d, completed: !d.completed } : d
    );
    saveDeadlines(updated);
  }, [deadlines, saveDeadlines]);

  return {
    deadlines,
    isLoading,
    addDeadline,
    updateDeadline,
    deleteDeadline,
    toggleComplete,
  };
}

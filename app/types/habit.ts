export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface Habit {
  _id: string;
  userId: string;
  name: string;
  frequency: HabitFrequency;
  targetDays: number;
  currentProgress: number;
  completedDates: string[];
  streak: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
} 
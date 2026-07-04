/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  instructorImage?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g., "12 Weeks"
  durationCategory: 'Short' | 'Medium' | 'Intensive';
  price: number;
  rating: number;
  image: string;
  isBestseller?: boolean;
  isNew?: boolean;
  lessonsCount: number;
  description: string;
}

export interface ActiveCourse {
  id: string;
  courseId: string;
  title: string;
  progress: number;
  instructor: string;
  category: string;
  image: string;
  currentModule: string;
  currentLesson: string;
}

export interface RecentActivity {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'download';
  time: string;
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  month: string;
  daysLeft: number;
}

export interface SyllabusLesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  isCompleted: boolean;
  isCurrent?: boolean;
  content?: string;
}

export interface SyllabusModule {
  id: string;
  title: string;
  isLocked: boolean;
  lessons: SyllabusLesson[];
}

export type AppView = 'home' | 'catalog' | 'portal' | 'player';

export const QUIZ_DIFFICULTIES = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export type QuizDifficulty = (typeof QUIZ_DIFFICULTIES)[number];

export interface QuizParams {
  topic: string;
  language: string;
  numQuestions: number;
  hardness: string;
  specialRequests?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizData {
  id: string;
  topic: string;
  questions: QuizQuestion[];
  language?: string;
  hardness?: string;
  createdAt?: string;
}

export type StoredQuiz = QuizData & {
  language?: string;
  hardness?: string;
  createdAt?: string;
};

export type QuizAttempt = {
  quizId: string;
  selectedAnswers: string[];
  score: number;
  totalQuestions: number;
  completedAt: string;
};

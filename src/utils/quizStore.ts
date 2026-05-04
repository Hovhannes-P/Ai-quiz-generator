import { type QuizData } from "./FetchAiApi";

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

const QUIZZES_STORAGE_KEY = "quizzes";
const QUIZ_ATTEMPTS_STORAGE_KEY = "quiz-attempts";
const DEFAULT_LANGUAGE = "English";
const DEFAULT_DIFFICULTY = "Intermediate";

export const normalizeDifficulty = (value?: string) =>
  value === "Medium" || !value ? DEFAULT_DIFFICULTY : value;

const readStoredQuizzes = (): StoredQuiz[] => {
  try {
    return JSON.parse(localStorage.getItem(QUIZZES_STORAGE_KEY) || "[]") as StoredQuiz[];
  } catch (error) {
    console.error("Failed to read local quizzes:", error);
    return [];
  }
};

export const saveQuiz = (quiz: StoredQuiz) => {
  const existingQuizzes = readStoredQuizzes();
  localStorage.setItem(
    QUIZZES_STORAGE_KEY,
    JSON.stringify([...existingQuizzes, quiz])
  );
};

const normalizeQuiz = (quiz: StoredQuiz): StoredQuiz => ({
  ...quiz,
  language: quiz.language || DEFAULT_LANGUAGE,
  hardness: normalizeDifficulty(quiz.hardness),
  createdAt: quiz.createdAt || new Date().toISOString(),
});

export const loadQuizzes = async (): Promise<StoredQuiz[]> => {
  const response = await fetch("/quizzes.json");
  const seededQuizzes = response.ok ? ((await response.json()) as StoredQuiz[]) : [];
  const localQuizzes = readStoredQuizzes();

  return [...seededQuizzes, ...localQuizzes].reduce<StoredQuiz[]>((acc, quiz) => {
    if (!acc.some((item) => item.id === quiz.id)) {
      acc.push(normalizeQuiz(quiz));
    }

    return acc;
  }, []);
};

export const loadQuizById = async (quizId: string): Promise<StoredQuiz | null> => {
  const quizzes = await loadQuizzes();
  return quizzes.find((quiz) => quiz.id === quizId) || null;
};

const readAttempts = (): Record<string, QuizAttempt> => {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_ATTEMPTS_STORAGE_KEY) || "{}") as Record<
      string,
      QuizAttempt
    >;
  } catch (error) {
    console.error("Failed to read quiz attempts:", error);
    return {};
  }
};

export const saveQuizAttempt = (attempt: QuizAttempt) => {
  const attempts = readAttempts();
  attempts[attempt.quizId] = attempt;
  localStorage.setItem(QUIZ_ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
};

export const getQuizAttempt = (quizId: string) => readAttempts()[quizId];

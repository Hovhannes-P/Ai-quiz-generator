import { useState } from 'react';
import {
  fetchQuiz,
  isAiQuizConfigured,
  QuizGenerationError,
} from '../utils/FetchAiApi';
import { type QuizData, type QuizParams } from '../types/quiz';

interface UseQuizReturn {
  createQuiz: (formData: QuizParams) => Promise<QuizData | null>;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
}

export const useQuiz = (): UseQuizReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isConfigured = isAiQuizConfigured();

  const createQuiz = async (formData: QuizParams): Promise<QuizData | null> => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchQuiz(formData);
      setLoading(false);
      return data;
    } catch (error) {
      if (error instanceof QuizGenerationError) {
        if (error.code === "missing_api_key") {
          setError(
            "AI quiz generation is disabled here because `VITE_GROQ_API_KEY` is missing. You can still browse the seeded quizzes in the app."
          );
        } else if (error.code === "invalid_response") {
          setError(
            "The AI service returned an unexpected response. Please try again."
          );
        } else {
          setError(
            "The AI request failed. Please try again in a moment."
          );
        }
      } else {
        setError("Failed to generate quiz. Please try again.");
      }

      setLoading(false);
      return null;
    }
  };

  return { createQuiz, loading, error, isConfigured };
};

import { useState } from 'react';
import { fetchQuiz, type QuizData, type QuizParams, } from '../utils/FetchAiApi';

interface UseQuizReturn {
  createQuiz: (formData: QuizParams) => Promise<QuizData | null>;
  loading: boolean;
  error: string | null;
}

export const useQuiz = (): UseQuizReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createQuiz = async (formData: QuizParams): Promise<QuizData | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchQuiz(formData);
      setLoading(false);
      return data; 
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
      setLoading(false);
      throw err;
    }
  };

  return { createQuiz, loading, error };
};
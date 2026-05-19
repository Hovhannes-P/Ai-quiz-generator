import { type StoredQuiz } from "../types/quiz";
import { normalizeDifficulty } from "./quizStore";

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "hardness-asc"
  | "hardness-desc";

export const difficultyClass: Record<string, string> = {
  Beginner: "badge-beginner",
  Intermediate: "badge-medium",
  Advanced: "badge-advanced",
};

const hardnessRank: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export const filterAndSortQuizzes = ({
  quizzes,
  searchTerm,
  difficultyFilter,
  sortBy,
}: {
  quizzes: StoredQuiz[];
  searchTerm: string;
  difficultyFilter: string;
  sortBy: SortOption;
}) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return [...quizzes]
    .filter((quiz) => {
      const matchesSearch =
        !normalizedSearch ||
        quiz.topic.toLowerCase().includes(normalizedSearch) ||
        quiz.questions.some((question) =>
          question.question.toLowerCase().includes(normalizedSearch)
        );

      const matchesDifficulty =
        difficultyFilter === "all" ||
        normalizeDifficulty(quiz.hardness) === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }

      if (sortBy === "date-asc") {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }

      if (sortBy === "hardness-asc") {
        return (
          (hardnessRank[normalizeDifficulty(a.hardness)] || 99) -
          (hardnessRank[normalizeDifficulty(b.hardness)] || 99)
        );
      }

      return (
        (hardnessRank[normalizeDifficulty(b.hardness)] || 0) -
        (hardnessRank[normalizeDifficulty(a.hardness)] || 0)
      );
    });
};

export const formatQuizDate = (createdAt?: string) =>
  new Date(createdAt || 0).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

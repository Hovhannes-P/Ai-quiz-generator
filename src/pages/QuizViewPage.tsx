import { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { type QuizData } from "../utils/FetchAiApi";
import BackLink from "../components/BackLink";

type StoredQuiz = QuizData & {
  language?: string;
  hardness?: string;
  createdAt?: string;
};

type QuizAttempt = {
  quizId: string;
  selectedAnswers: string[];
  score: number;
  totalQuestions: number;
  completedAt: string;
};

const QuizViewPage = () => {
  const { isLoggedIn } = useUserStore();
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("id");
  const [quiz, setQuiz] = useState<StoredQuiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/quizzes.json");
        const seededQuizzes = response.ok ? ((await response.json()) as StoredQuiz[]) : [];
        const localQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]") as StoredQuiz[];
        const allQuizzes = [...seededQuizzes, ...localQuizzes];
        const foundQuiz = allQuizzes.find((item) => item.id === quizId) || null;
        setQuiz(foundQuiz);
      } catch (error) {
        console.error("Failed to load quiz view:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!quizId) {
    return <Navigate to="/browse" replace />;
  }

  if (loading) {
    return (
      <section className="quiz-preview-section">
        <div className="container quiz-page">
          <p className="result-summary">Loading quiz details...</p>
        </div>
      </section>
    );
  }

  if (!quiz) {
    return (
      <section className="quiz-preview-section">
        <div className="container quiz-page">
          <h2>Quiz not found</h2>
          <p className="result-summary">The quiz you selected could not be found.</p>
          <Link className="primary-button" to="/browse">
            Back to Search
          </Link>
        </div>
      </section>
    );
  }

  const savedAttempts = JSON.parse(localStorage.getItem("quiz-attempts") || "{}") as Record<string, QuizAttempt>;
  const previousAttempt = savedAttempts[quiz.id];
  const percentage = previousAttempt
    ? Math.round((previousAttempt.score / previousAttempt.totalQuestions) * 100)
    : null;

  return (
    <section className="quiz-preview-section">
      <div className="container quiz-page">
        <BackLink to="/browse" label="Back to Search" />

        <header className="quiz-intro quiz-view-intro">
          <p className="eyebrow">Quiz View</p>
          <h2>{quiz.topic}</h2>
          <p>
            {quiz.language || "English"} • {quiz.hardness || "Medium"} • {quiz.questions.length} questions
          </p>
        </header>

        <div className="quiz-view-actions">
          <Link className="primary-button" to={`/passquiz?id=${quiz.id}`}>
            Take Quiz
          </Link>
        </div>

        {previousAttempt && (
          <section className="view-attempt-summary">
            <div className="view-attempt-card">
              <h3>Previous Attempt</h3>
              <p className="view-attempt-score">{percentage}%</p>
              <p>
                {previousAttempt.score} out of {previousAttempt.totalQuestions} correct
              </p>
              <p>
                Completed on{" "}
                {new Date(previousAttempt.completedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </section>
        )}

        <section className="review-list" aria-label="Quiz questions and answers">
          {quiz.questions.map((question, index) => {
            const selectedAnswer = previousAttempt?.selectedAnswers[index];

            return (
              <article className="review-card" key={`${quiz.id}-question-${index}`}>
                <div className="review-card-head">
                  <span className="review-question-number">Question {index + 1}</span>
                  {previousAttempt && (
                    <span
                      className={`review-badge ${
                        selectedAnswer === question.correctAnswer
                          ? "review-badge-correct"
                          : "review-badge-incorrect"
                      }`}
                    >
                      {selectedAnswer === question.correctAnswer ? "Correct" : "Incorrect"}
                    </span>
                  )}
                </div>

                <h4>{question.question}</h4>

                <div className="quiz-view-options">
                  {question.options.map((option) => {
                    const isCorrect = option === question.correctAnswer;
                    const isSelected = selectedAnswer === option;

                    return (
                      <div
                        className={`quiz-view-option ${
                          isCorrect ? "quiz-view-option-correct" : ""
                        } ${isSelected && !isCorrect ? "quiz-view-option-selected-wrong" : ""}`}
                        key={`${question.question}-${option}`}
                      >
                        <span>{option}</span>
                        <div className="quiz-view-option-tags">
                          {isCorrect && <span className="option-tag option-tag-correct">Correct answer</span>}
                          {isSelected && <span className="option-tag option-tag-selected">Your choice</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </section>
  );
};

export default QuizViewPage;

import { Link, Navigate, useSearchParams } from "react-router-dom";
import { type QuizData } from "../utils/FetchAiApi";

type QuizAttempt = {
  quizId: string;
  selectedAnswers: string[];
  score: number;
  totalQuestions: number;
  completedAt: string;
};

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("id");

  if (!quizId) {
    return <Navigate to="/" replace />;
  }

  const savedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  const savedAttempts = JSON.parse(localStorage.getItem("quiz-attempts") || "{}");

  const quiz = savedQuizzes.find((item: QuizData) => item.id === quizId) as QuizData | undefined;
  const attempt = savedAttempts[quizId] as QuizAttempt | undefined;

  if (!quiz || !attempt) {
    return (
      <section className="results-preview-section" aria-labelledby="results-title">
        <div className="container results-card">
          <h2 id="results-title">Result not found</h2>
          <p className="result-summary">
            We could not find a completed attempt for this quiz yet.
          </p>
          <div className="result-actions">
            <Link to="/" className="dark-button">
              Return Home
            </Link>
            <Link to={`/passquiz?id=${quizId}`} className="light-button">
              Take Quiz
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

  return (
    <section className="results-preview-section" aria-labelledby="results-title">
      <div className="container quiz-page">
        <Link className="back-link" to="/">
          <span>Back to Home</span>
        </Link>

        <div className="results-card">
          <div className="result-mark" aria-hidden="true"></div>

          <h2 id="results-title">{quiz.topic} Results</h2>

          <div className="result-score">{percentage}%</div>

          <p className="result-summary">
            {attempt.score} out of {attempt.totalQuestions} correct
          </p>

          <div className="result-stats">
            <div>
              <strong>{attempt.score}</strong>
              <span>Correct</span>
            </div>

            <div>
              <strong>{attempt.totalQuestions - attempt.score}</strong>
              <span>Incorrect</span>
            </div>

            <div>
              <strong>{attempt.totalQuestions}</strong>
              <span>Total Questions</span>
            </div>
          </div>

          <div className="result-actions">
            <Link to="/" className="dark-button">
              Return Home
            </Link>
            <Link to={`/passquiz?id=${quiz.id}`} className="light-button">
              Retake Quiz
            </Link>
          </div>
        </div>

        <section className="result-review" aria-labelledby="review-title">
          <div className="review-header">
            <h3 id="review-title">Answer Review</h3>
            <p>See exactly which questions were answered correctly and incorrectly.</p>
          </div>

          <div className="review-list">
            {quiz.questions.map((question, index) => {
              const selectedAnswer = attempt.selectedAnswers[index];
              const isCorrect = selectedAnswer === question.correctAnswer;

              return (
                <article
                  className={`review-card ${isCorrect ? "review-card-correct" : "review-card-incorrect"}`}
                  key={`${quiz.id}-${index}`}
                >
                  <div className="review-card-head">
                    <span className={`review-badge ${isCorrect ? "review-badge-correct" : "review-badge-incorrect"}`}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                    <span className="review-question-number">Question {index + 1}</span>
                  </div>

                  <h4>{question.question}</h4>

                  <div className="review-answer-group">
                    <p>
                      <strong>Your answer:</strong> {selectedAnswer || "No answer selected"}
                    </p>
                    <p>
                      <strong>Correct answer:</strong> {question.correctAnswer}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ResultPage;

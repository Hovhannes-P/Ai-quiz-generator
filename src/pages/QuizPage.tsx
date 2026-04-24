import { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate, useNavigate } from "react-router-dom";
import { type QuizData } from "../utils/FetchAiApi";

type QuizAttempt = {
  quizId: string;
  selectedAnswers: string[];
  score: number;
  totalQuestions: number;
  completedAt: string;
};

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("id");

  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  // Load quiz data from localStorage on mount
  useEffect(() => {
    if (!quizId) return;
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const foundQuiz = savedQuizzes.find((q: QuizData) => q.id === quizId);
    if (foundQuiz) setQuiz(foundQuiz);
  }, [quizId]);

  if (!quizId) {
    return <Navigate to="/browse" replace />;
  }

  if (!quiz) {
    return (
      <div className="container">
        <h2>Quiz not found</h2>
        <p>The requested quiz could not be located.</p>
        <Link to="/browse" className="primary-button">Browse Quizzes</Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const score = selectedAnswers.reduce(
        (acc, ans, idx) => (ans === quiz.questions[idx].correctAnswer ? acc + 1 : acc),
        0
      );

      const attempt: QuizAttempt = {
        quizId: quiz.id,
        selectedAnswers,
        score,
        totalQuestions: quiz.questions.length,
        completedAt: new Date().toISOString(),
      };

      const savedAttempts = JSON.parse(localStorage.getItem("quiz-attempts") || "{}");
      savedAttempts[quiz.id] = attempt;
      localStorage.setItem("quiz-attempts", JSON.stringify(savedAttempts));

      navigate(`/result?id=${quiz.id}`);
    }
  };

  return (
    <section className="quiz-preview-section">
      <div className="container quiz-page">
        <Link className="back-link" to="/"><span>Back to Home</span></Link>

        <header className="quiz-intro">
          <h2>{quiz.topic}</h2>
          <p>Question {currentIndex + 1} of {quiz.questions.length}</p>
        </header>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <section className="question-card">
          <h3>{currentQuestion.question}</h3>
          <div className="answer-list">
            {currentQuestion.options.map((option) => (
              <button
                className={`answer-option ${selectedAnswers[currentIndex] === option ? 'selected' : ''}`}
                type="button"
                key={option}
                onClick={() => handleAnswer(option)}
              >
                <span>{option}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="quiz-controls">
          <button 
            className="secondary-button" 
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            Previous
          </button>

          <button 
            className="primary-button"
            onClick={handleNext}
            disabled={!selectedAnswers[currentIndex]}
          >
            {currentIndex === quiz.questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizPage;

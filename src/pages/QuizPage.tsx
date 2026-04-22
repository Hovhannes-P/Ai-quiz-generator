import { Link } from "react-router-dom";

type AnswerOption = {
  label: string;
};

const options: AnswerOption[] = [
  { label: "Basic fundamentals" },

  { label: "Advanced techniques" },

  { label: "Core principles" },

  { label: "Practical applications" },
];

const QuizPage: React.FC = () => {
  return (
    <section className="quiz-preview-section" aria-labelledby="quiz-title">
      <div className="container quiz-page">
        <Link className="back-link" to="/">
          <span>Back to Home</span> 
        </Link>

        <header className="quiz-intro">
          <h2 id="quiz-title">math Assessment</h2>

          <p>A medium level quiz covering math concepts in English.</p>
        </header>

        <div className="quiz-progress">
          <div>
            <span className="quiz-progress-label">Question 1 of 5</span>
          </div>

          <div>
            <span className="quiz-progress-label quiz-progress-right">
              20% Complete
            </span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
        </div>

        <section className="question-card">
          <h3>What is the primary concept in math? (Question 1)</h3>

          <div className="answer-list">
            {options.map((option) => (
              <button
                className="answer-option"
                type="button"
                key={option.label}>
                <span className="radio-shell" aria-hidden="true">
                  <span className="radio-dot" />
                </span>

                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="quiz-controls">
          <button className="secondary-button" type="button" disabled>

            <span>Previous</span>
          </button>

          <button className="secondary-button" type="button">
            <span>Next</span>

          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizPage;

const ResultPage = () => {
  return (
    <section
      className="results-preview-section"
      aria-labelledby="results-title">
      <div className="container results-card">
        <div className="result-mark" aria-hidden="true">
        </div>

        <h2 id="results-title">Quiz Complete!</h2>

        <div className="result-score">20%</div>

        <p className="result-summary">1 out of 5 correct</p>

        <div className="result-stats">
          <div>
            <strong>1</strong>

            <span>Correct</span>
          </div>

          <div>
            <strong>4</strong>

            <span>Incorrect</span>
          </div>

          <div>
            <strong>Medium</strong>

            <span>Difficulty</span>
          </div>
        </div>

        <div className="result-actions">
          <button className="dark-button" type="button">
            Return Home
          </button>

          <button className="light-button" type="button">
            Review Answers
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultPage;
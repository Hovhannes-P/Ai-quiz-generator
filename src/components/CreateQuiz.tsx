const CreateQuiz = () => {
  return (
    <section className="modal-preview-section" aria-labelledby="modal-title">
      <div className="modal-backdrop" aria-hidden="true" />

      <div className="container modal-wrap">
        <div className="quiz-modal">
          <button
            className="modal-close"
            type="button"
            aria-label="Close modal"></button>

          <div className="modal-header">
            <h2 id="modal-title">Create New Quiz</h2>

            <p>Configure your AI-generated quiz parameters</p>
          </div>

          <form className="quiz-form">
            <label className="field field-full">
              <span>Topic</span>

              <input placeholder="e.g. JavaScript Fundamentals, World History, Biology" />
            </label>

            <div className="field-row">
              <label className="field">
                <span>Language</span>

                <select defaultValue="English">
                  <option>English</option>

                  <option>Spanish</option>

                  <option>French</option>
                </select>
              </label>

              <label className="field">
                <span>Number of Questions</span>

                <select defaultValue="5 Questions">
                  <option>5 Questions</option>

                  <option>10 Questions</option>

                  <option>15 Questions</option>
                </select>
              </label>

              <label className="field">
                <span>Difficulty</span>

                <select defaultValue="Medium">
                  <option>Beginner</option>

                  <option>Medium</option>

                  <option>Advanced</option>
                </select>
              </label>
            </div>

            <label className="field field-full">
              <span>Special Requirements (Optional)</span>

              <textarea placeholder="Any specific focus areas, question types, or requirements..." />
            </label>

            <button
              className="primary-button primary-button-full"
              type="button">
              Generate Quiz
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateQuiz;

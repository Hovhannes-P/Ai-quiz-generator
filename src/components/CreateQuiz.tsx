interface CreateQuizProps {
  onClose: () => void;
}

const CreateQuiz = ({ onClose }: CreateQuizProps) => {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" aria-label="Close modal" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

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
              <select defaultValue="5">
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
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

          <button className="primary-button primary-button-full" type="button">
            Generate Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
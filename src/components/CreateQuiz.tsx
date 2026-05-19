import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import { type QuizParams } from '../types/quiz';
import { saveQuiz } from '../utils/quizStore';

interface CreateQuizProps {
  onClose: () => void;
}

type CreateQuizFormData = QuizParams;

const CreateQuiz = ({ onClose }: CreateQuizProps) => {
  const navigate = useNavigate();
  const { createQuiz, loading, error, isConfigured } = useQuiz();

  const [formData, setFormData] = useState<CreateQuizFormData>({
    topic: '',
    language: 'English',
    numQuestions: 5,
    hardness: 'Intermediate',
    specialRequests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const quizData = await createQuiz({
      ...formData,
      numQuestions: Number(formData.numQuestions)
    });

    if (quizData) {
      const quizToStore = {
        ...quizData,
        language: formData.language,
        hardness: formData.hardness,
        createdAt: new Date().toISOString(),
      };

      saveQuiz(quizToStore);
      onClose();
      navigate(`/passquiz?id=${quizToStore.id}`);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-quiz-title"
    >
      <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-header">
          <h2 id="create-quiz-title">Create a New Quiz</h2>
          <p>Choose the topic, difficulty, and language, then let AI generate a polished question set.</p>
        </div>

        <form className="quiz-form" onSubmit={handleSubmit}>
          {!isConfigured && (
            <div className="form-note" role="status" aria-live="polite">
              <strong>Demo mode:</strong> AI generation is unavailable until
              `VITE_GROQ_API_KEY` is configured. You can still explore the app by
              browsing the seeded quizzes from the library.
            </div>
          )}

          <label className="field field-full">
            <span>Topic</span>
            <input 
              required
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              placeholder="e.g. JavaScript Fundamentals" 
            />
            <small className="field-help">A specific topic usually gives you better and more focused questions.</small>
          </label>

          <div className="field-row">
            <label className="field">
              <span>Language</span>
              <div className="select-shell">
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Italian</option>
                  <option>Portuguese</option>
                  <option>Arabic</option>
                  <option>Armenian</option>
                </select>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </label>

            <label className="field">
              <span>Questions</span>
              <div className="select-shell">
                <select
                  value={formData.numQuestions}
                  onChange={(e) => setFormData({...formData, numQuestions: parseInt(e.target.value)})}
                >
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </label>

            <label className="field">
              <span>Difficulty</span>
              <div className="select-shell">
                <select
                  value={formData.hardness}
                  onChange={(e) => setFormData({...formData, hardness: e.target.value})}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </label>
          </div>

          <label className="field field-full">
            <span>Special Requirements</span>
            <textarea 
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              placeholder="Any specific focus areas..." 
            />
            <small className="field-help">Optional: ask for scenarios, theory-only questions, or concepts you want emphasized.</small>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button 
            className="primary-button primary-button-full" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "AI is generating..." : isConfigured ? "Generate Quiz" : "Try AI Generation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;

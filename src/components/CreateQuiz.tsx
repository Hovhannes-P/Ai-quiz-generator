import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';

interface CreateQuizProps {
  onClose: () => void;
}

const CreateQuiz = ({ onClose }: CreateQuizProps) => {
  const navigate = useNavigate();
  const { createQuiz, loading, error } = useQuiz();

  // 1. Local state for form fields
  const [formData, setFormData] = useState({
    topic: '',
    language: 'English',
    numQuestions: 5,
    hardness: 'Medium',
    specialRequests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 2. Call the AI via our hook
    const quizData = await createQuiz({
      ...formData,
      numQuestions: Number(formData.numQuestions) // Ensure it's a number
    });

    if (quizData) {
      // 3. Persist the quiz (Requirement: Data must persist)
      const existingQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
      const updatedQuizzes = [...existingQuizzes, quizData];
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));

      // 4. Redirect to /passquiz with the new ID
      onClose();
      navigate(`/quiz?id=${quizData.id}`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
        {/* ... Header stays the same ... */}

        <form className="quiz-form" onSubmit={handleSubmit}>
          <label className="field field-full">
            <span>Topic</span>
            <input 
              required
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              placeholder="e.g. JavaScript Fundamentals" 
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span>Language</span>
              <select 
                value={formData.language} 
                onChange={(e) => setFormData({...formData, language: e.target.value})}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </label>

            <label className="field">
              <span>Questions</span>
              <select 
                value={formData.numQuestions}
                onChange={(e) => setFormData({...formData, numQuestions: parseInt(e.target.value)})}
              >
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </label>

            <label className="field">
              <span>Difficulty</span>
              <select 
                value={formData.hardness}
                onChange={(e) => setFormData({...formData, hardness: e.target.value})}
              >
                <option>Beginner</option>
                <option>Medium</option>
                <option>Advanced</option>
              </select>
            </label>
          </div>

          <label className="field field-full">
            <span>Special Requirements</span>
            <textarea 
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              placeholder="Any specific focus areas..." 
            />
          </label>

          {error && <p style={{color: 'red'}}>{error}</p>}

          <button 
            className="primary-button primary-button-full" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "AI is generating..." : "Generate Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
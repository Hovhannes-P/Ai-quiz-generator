import { useState } from "react";
import { useUserStore } from "../store/userStore";

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginModal = ({ onClose, onSuccess }: LoginModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const login = useUserStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login({
      name: name.trim(),
      email: email.trim() || null,
    });
    onClose();
    onSuccess?.();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title">
      <div
        className="quiz-modal login-modal"
        onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-header">
          <h2 id="login-modal-title">Start Local Session</h2>
          <p>
            This project uses a local browser-only profile so you can create quizzes,
            save attempts, and explore the app flow without real authentication.
          </p>
        </div>

        <form className="quiz-form login-form" onSubmit={handleSubmit}>
          <label className="field field-full">
            <span>Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="field field-full">
            <span>Email (optional)</span>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <p className="field-help">
            Your profile stays in this browser only. Signing out will end the session
            but will not remove saved quizzes or results.
          </p>

          <button className="primary-button primary-button-full" type="submit">
            Continue to App
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

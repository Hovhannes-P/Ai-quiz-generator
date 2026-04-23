import { useState } from "react";
import { useUserStore } from "../store/userStore";

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginModal = ({ onClose, onSuccess }: LoginModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useUserStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username.trim());
    onClose();
    onSuccess?.();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <div className="quiz-modal login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" aria-label="Close modal" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-header">
          <h2 id="login-modal-title">Welcome Back</h2>
          <p>Sign in to create and manage your quizzes</p>
        </div>

        <form className="quiz-form login-form" onSubmit={handleLogin}>
          <label className="field field-full">
            <span>Username</span>
            <input
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="field field-full">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="primary-button primary-button-full" type="submit">
            Sign In
          </button>
        </form>

        <p className="login-hint">Demo: use any username &amp; password to log in</p>
      </div>
    </div>
  );
};

export default LoginModal;
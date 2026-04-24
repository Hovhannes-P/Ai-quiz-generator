import { useState } from "react";
import { useUserStore } from "../store/userStore";

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginModal = ({ onClose, onSuccess }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useUserStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!isLogin && !name.trim()) return;
    login(email.trim(), isLogin ? null : name.trim());
    onClose();
    onSuccess?.();
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
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
          <h2 id="login-modal-title">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p>
            {isLogin
              ? "Sign in to create and manage your quizzes"
              : "Sign up to start creating your own AI quizzes"}
          </p>
        </div>

        <form className="quiz-form login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label className="field field-full">
              <span>Name</span>
              <input
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}

          <label className="field field-full">
            <span>Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="field field-full">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className="primary-button primary-button-full" type="submit">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="login-toggle-container">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={toggleView}>
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

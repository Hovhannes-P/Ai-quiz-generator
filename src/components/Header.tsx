import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useState } from "react";
import LoginModal from "./LoginModal";

interface HeaderProps {
  onLoginSuccess?: () => void; 
}

const Header = ({ onLoginSuccess }: HeaderProps) => {
  const { isLoggedIn, username, logout } = useUserStore();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <Link className="brand" to="/" aria-label="QuizMaster Pro home">
            <span className="brand-text">QuizMaster Pro</span>
          </Link>

          <nav className="topbar-actions" aria-label="Primary">
            <Link className="nav-link" to="/browse">
              <span>Browse Quizzes</span>
            </Link>

            {isLoggedIn ? (
              <>
                <span className="session-pill">Welcome, {username}</span>
                <button className="ghost-button" type="button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="ghost-button" type="button" onClick={() => setShowLogin(true)}>
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            onLoginSuccess?.();
          }}
        />
      )}
    </>
  );
};

export default Header;
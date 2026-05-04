import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useState } from "react";
import LoginModal from "./LoginModal";

interface HeaderProps {
  onLoginSuccess?: () => void;
}

const Header = ({ onLoginSuccess }: HeaderProps) => {
  const { isLoggedIn, name, email, logout } = useUserStore();
  const [showLogin, setShowLogin] = useState(false);
  const displayName = name || email;

  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <Link className="brand" to="/" aria-label="AI Quiz Lab home">
            <span className="brand-text">AI Quiz Lab</span>
          </Link>

          <nav className="topbar-actions" aria-label="Primary">
            {isLoggedIn ? (
              <>
                <Link className="nav-link" to="/browse">
                  <span>Browse Quizzes</span>
                </Link>

                <span className="session-pill">Welcome, {displayName}</span>
                <button className="ghost-button" type="button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className="ghost-button"
                type="button"
                onClick={() => setShowLogin(true)}>
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

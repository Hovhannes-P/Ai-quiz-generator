import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link className="brand" to="/" aria-label="QuizMaster Pro home">
          <span className="brand-text">QuizMaster Pro</span>
        </Link>

        <nav className="topbar-actions" aria-label="Primary">
          <Link className="nav-link" to="/browse">
            <span>Browse Quizzes</span>
          </Link>

          <span className="session-pill">Welcome, user</span>

          <Link to="/login">
            <button className="ghost-button" type="button">
              Logout
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
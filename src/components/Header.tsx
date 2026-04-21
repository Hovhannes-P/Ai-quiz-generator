
const Header = () => {
  return (
    <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#home" aria-label="QuizMaster Pro home">
            <span className="brand-text">QuizMaster Pro</span>
          </a>

          <nav className="topbar-actions" aria-label="Primary">
            <a className="nav-link" href="#browse">
              <span>Browse Quizzes</span>
            </a>

            <span className="session-pill">Welcome, sd</span>

            <button className="ghost-button" type="button">
              Logout
            </button>
          </nav>
        </div>
      </header>
  );
};

export default Header;
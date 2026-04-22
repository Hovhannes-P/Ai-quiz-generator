const LoginModal = () => {
  return (
    <section className="modal-preview-section" aria-labelledby="login-modal-title">
      <div className="modal-backdrop" aria-hidden="true" />

      <div className="container modal-wrap">
        <div className="quiz-modal login-modal">
          <button
            className="modal-close"
            type="button"
            aria-label="Close modal">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="modal-header">

            <h2 id="login-modal-title">Welcome Back</h2>
            <p>Sign in to create and manage your quizzes</p>
          </div>

          <form className="quiz-form login-form">
            <label className="field field-full">
              <span>Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </label>

            <label className="field field-full">
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>

            <button
              className="primary-button primary-button-full"
              type="button">
              Sign In
            </button>
          </form>

          <p className="login-hint">
            Demo: use any username &amp; password to log in
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginModal;
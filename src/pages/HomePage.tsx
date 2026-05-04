import { useState } from "react";
import { useUserStore } from "../store/userStore";
import LoginModal from "../components/LoginModal";
import CreateQuiz from "../components/CreateQuiz";
import Header from "../components/Header";

type Feature = {
  title: string;
  description: string;
  icon: "brain" | "users" | "trophy" | "trend";
};

const features: Feature[] = [
  {
    title: "AI Quiz Generation",
    description:
      "Generate topic-based quizzes with configurable language, difficulty, and question count.",
    icon: "brain",
  },
  {
    title: "Saved Quiz Library",
    description: "Browse seeded quizzes and revisit quizzes created during your practice session.",
    icon: "users",
  },
  {
    title: "Answer Review",
    description:
      "Finish a quiz and review which answers were correct, incorrect, or skipped.",
    icon: "trophy",
  },
  {
    title: "Frontend Practice Focus",
    description: "Built to practice routing, state, async UI, local persistence, and custom styling.",
    icon: "trend",
  },
];

const FeatureIcon = ({ icon }: { icon: Feature["icon"] }) => {
  if (icon === "brain") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.82V10a3 3 0 0 0 2 2.82V14a3 3 0 0 0 3 3h1v2" />
        <path d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.82V10a3 3 0 0 1-2 2.82V14a3 3 0 0 1-3 3h-1v2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M12 17v4" />
      </svg>
    );
  }

  if (icon === "users") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 21v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
        <circle cx="9.5" cy="8" r="3" />
        <path d="M22 21v-1a4 4 0 0 0-3-3.87" />
        <path d="M16.5 5.13a3 3 0 0 1 0 5.75" />
      </svg>
    );
  }

  if (icon === "trophy") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
        <path d="M17 6h2a2 2 0 0 1 0 4h-2" />
        <path d="M7 6H5a2 2 0 0 0 0 4h2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 16 10 10l4 4 6-7" />
      <path d="M20 7v6h-6" />
    </svg>
  );
};

const HomePage = () => {
  const { isLoggedIn } = useUserStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  const handleCreateQuizClick = () => {
    if (isLoggedIn) {
      setShowCreateQuiz(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <main>
        <Header />

        <section className="hero-section" id="home">
          <div className="container hero-copy">
            <p className="eyebrow">React + TypeScript practice project</p>
            <h1>Build and take AI-generated quizzes</h1>
            <p className="hero-description">
              A portfolio-focused frontend app for generating quizzes, browsing saved sets,
              completing attempts, and reviewing results. This project highlights practical
              React skills rather than pretending to be a full business product.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                type="button"
                onClick={handleCreateQuizClick}>
                <span>Generate a Quiz</span>
              </button>
            </div>
          </div>
        </section>

        <section className="features-section" aria-labelledby="features-title">
          <div className="container">
            <h2 id="features-title">What This Project Shows</h2>

            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon" aria-hidden="true">
                    <FeatureIcon icon={feature.icon} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            setShowCreateQuiz(true);
          }}
        />
      )}

      {showCreateQuiz && (
        <CreateQuiz onClose={() => setShowCreateQuiz(false)} />
      )}
    </>
  );
};

export default HomePage;

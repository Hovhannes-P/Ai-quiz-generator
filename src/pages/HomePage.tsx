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
    title: "AI-Powered",
    description:
      "Advanced AI generates contextual questions based on your specifications.",
    icon: "brain",
  },
  {
    title: "Multi-Language",
    description: "Create quizzes in multiple languages for global teams.",
    icon: "users",
  },
  {
    title: "Performance Analytics",
    description:
      "Detailed insights and performance tracking for all assessments.",
    icon: "trophy",
  },
  {
    title: "Scalable Platform",
    description: "Enterprise-grade infrastructure supporting unlimited users.",
    icon: "trend",
  },
];

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
            <p className="eyebrow">Enterprise AI assessment studio</p>
            <h1>Enterprise AI Quiz Platform</h1>
            <p className="hero-description">
              Harness the power of artificial intelligence to create, manage,
              and analyze professional quizzes. Built for enterprise-scale
              learning and assessment.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                type="button"
                onClick={handleCreateQuizClick}>
                <span>Create Quiz</span>
              </button>
            </div>
          </div>
        </section>

        <section className="features-section" aria-labelledby="features-title">
          <div className="container">
            <h2 id="features-title">Enterprise Features</h2>

            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon" aria-hidden="true"></div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {showCreateQuiz && (
        <CreateQuiz onClose={() => setShowCreateQuiz(false)} />
      )}
    </>
  );
};

export default HomePage;

import { Link } from "react-router-dom";

type Quiz = {
  id: string;
  title: string;
  topic: string;
  difficulty: "Beginner" | "Medium" | "Advanced";
  language: string;
  questionCount: number;
  createdAt: string;
  takenBy?: number;
};

const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    topic: "JavaScript",
    difficulty: "Beginner",
    language: "English",
    questionCount: 10,
    createdAt: "2025-06-01",
    takenBy: 142,
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    topic: "React",
    difficulty: "Advanced",
    language: "English",
    questionCount: 15,
    createdAt: "2025-06-10",
    takenBy: 89,
  },
  {
    id: "3",
    title: "World History: Cold War Era",
    topic: "History",
    difficulty: "Medium",
    language: "English",
    questionCount: 10,
    createdAt: "2025-05-28",
    takenBy: 207,
  },
  {
    id: "4",
    title: "Python Data Structures",
    topic: "Python",
    difficulty: "Medium",
    language: "English",
    questionCount: 10,
    createdAt: "2025-06-15",
    takenBy: 61,
  },
  {
    id: "5",
    title: "Biología Celular Básica",
    topic: "Biology",
    difficulty: "Beginner",
    language: "Spanish",
    questionCount: 5,
    createdAt: "2025-06-12",
    takenBy: 34,
  },
  {
    id: "6",
    title: "Machine Learning Concepts",
    topic: "AI & ML",
    difficulty: "Advanced",
    language: "English",
    questionCount: 15,
    createdAt: "2025-06-18",
    takenBy: 55,
  },
];

const difficultyClass: Record<Quiz["difficulty"], string> = {
  Beginner: "badge-beginner",
  Medium: "badge-medium",
  Advanced: "badge-advanced",
};

const BrowsePage = () => {
  return (
    <div className="search-page">
      <Link className="back-link" to="/">
        <span>Back to Home</span>
      </Link>

      <main className="search-main">
        <div className="container">
          <div className="search-heading">
            <p className="eyebrow">Quiz Library</p>
            <h1 className="search-title">Browse Quizzes</h1>
            <p className="search-subtitle">
              Explore the collection of AI-generated assessments. Filter by
              topic, difficulty, or language.
            </p>
          </div>

          <div className="search-controls">
            <div className="search-input-wrap">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M16.5 16.5 21 21" />
              </svg>
              <input
                className="search-input"
                type="search"
                placeholder="Search by topic or keyword…"
                aria-label="Search quizzes"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="sort-select">
                Sort by
              </label>
              <select
                className="filter-select"
                id="sort-select"
                defaultValue="date-desc">
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
                <option value="difficulty-asc">Easiest first</option>
                <option value="difficulty-desc">Hardest first</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="difficulty-filter">
                Difficulty
              </label>
              <select
                className="filter-select"
                id="difficulty-filter"
                defaultValue="all">
                <option value="all">All levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <p className="results-count">
            Showing <strong>{mockQuizzes.length}</strong> quizzes
          </p>

          <div className="quiz-grid">
            {mockQuizzes.map((quiz) => (
              <Link
                className="quiz-card"
                to={`/quiz?id=${quiz.id}`}
                key={quiz.id}
                aria-label={`View quiz: ${quiz.title}`}>
                <div className="quiz-card-top">
                  <span
                    className={`difficulty-badge ${difficultyClass[quiz.difficulty]}`}>
                    {quiz.difficulty}
                  </span>
                  <span className="quiz-lang">{quiz.language}</span>
                </div>

                <h3 className="quiz-card-title">{quiz.title}</h3>
                <p className="quiz-card-topic">{quiz.topic}</p>

                <div className="quiz-card-meta">
                  <span className="meta-item">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                    {quiz.questionCount} questions
                  </span>
                  <span className="meta-item">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {quiz.takenBy} taken
                  </span>
                  <span className="meta-item">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {new Date(quiz.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="quiz-card-footer">
                  <span className="card-cta">View Quiz →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowsePage;

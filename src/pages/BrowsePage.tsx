import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import BackLink from "../components/BackLink";
import { type StoredQuiz } from "../types/quiz";
import {
  loadQuizzes as fetchAllQuizzes,
  normalizeDifficulty,
} from "../utils/quizStore";
import {
  difficultyClass,
  filterAndSortQuizzes,
  formatQuizDate,
  type SortOption,
} from "../utils/browseQuizUtils";

const BrowsePage = () => {
  const { isLoggedIn } = useUserStore();
  const [quizzes, setQuizzes] = useState<StoredQuiz[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setQuizzes(await fetchAllQuizzes());
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = useMemo(() => {
    return filterAndSortQuizzes({ quizzes, searchTerm, difficultyFilter, sortBy });
  }, [difficultyFilter, quizzes, searchTerm, sortBy]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="search-page">
      <main className="search-main">
        <div className="container quiz-page">
          <BackLink className="browse-back-link" to="/" label="Back to Home" />

          <div className="search-heading">
            <p className="eyebrow">Quiz Library</p>
            <h1 className="search-title">Search and Explore Quizzes</h1>
            <p className="search-subtitle">
              Browse pre-generated quizzes and your own AI-created quizzes by topic,
              keyword, difficulty, and date.
            </p>
          </div>

          <div className="search-controls">
            <div className="search-input-wrap">
              <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M16.5 16.5 21 21" />
              </svg>
              <input
                className="search-input"
                type="search"
                placeholder="Search by topic or question keyword..."
                aria-label="Search quizzes"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="sort-select">
                Sort by
              </label>
              <div className="select-shell">
                <select
                  className="filter-select"
                  id="sort-select"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortOption)}
                >
                  <option value="date-desc">Newest first</option>
                  <option value="date-asc">Oldest first</option>
                  <option value="hardness-asc">Easiest first</option>
                  <option value="hardness-desc">Hardest first</option>
                </select>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="difficulty-filter">
                Difficulty
              </label>
              <div className="select-shell">
                <select
                  className="filter-select"
                  id="difficulty-filter"
                  value={difficultyFilter}
                  onChange={(event) => setDifficultyFilter(event.target.value)}
                >
                  <option value="all">All levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <p className="results-count">
            {loading ? "Loading quizzes..." : <>Showing <strong>{filteredQuizzes.length}</strong> quizzes</>}
          </p>

          {!loading && filteredQuizzes.length === 0 ? (
            <div className="empty-state-card">
              <h2>No quizzes found</h2>
              <p>Try another keyword or create a new quiz from the homepage.</p>
            </div>
          ) : (
            <div className="quiz-grid">
              {filteredQuizzes.map((quiz) => {
                const difficulty = normalizeDifficulty(quiz.hardness);

                return (
                  <Link
                    className="quiz-card"
                    to={`/quiz?id=${quiz.id}`}
                    key={quiz.id}
                    aria-label={`View quiz: ${quiz.topic}`}
                  >
                    <div className="quiz-card-top">
                      <span className={`difficulty-badge ${difficultyClass[difficulty] || "badge-medium"}`}>
                        {difficulty}
                      </span>
                      <span className="quiz-lang">{quiz.language || "English"}</span>
                    </div>

                    <h3 className="quiz-card-title">{quiz.topic}</h3>
                    <p className="quiz-card-topic">
                      {quiz.questions.length} questions ready to review or take
                    </p>

                    <div className="quiz-card-meta">
                      <span className="meta-item">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 3" />
                        </svg>
                        {quiz.questions.length} questions
                      </span>
                      <span className="meta-item">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        {quiz.language || "English"}
                      </span>
                      <span className="meta-item">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {formatQuizDate(quiz.createdAt)}
                      </span>
                    </div>

                    <div className="quiz-card-footer">
                      <span className="card-cta">Open Quiz View</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BrowsePage;

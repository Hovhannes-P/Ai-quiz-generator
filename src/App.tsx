import "./App.css";
import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const ResultPage = lazy(() => import("./pages/ResultPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SearchPage = lazy(() => import("./pages/BrowsePage"));
const QuizViewPage = lazy(() => import("./pages/QuizViewPage"));

const RouteFallback = () => (
  <main className="search-main">
    <div className="container quiz-page">
      <p className="result-summary">Loading page...</p>
    </div>
  </main>
);

const withSuspense = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<RouteFallback />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: withSuspense(HomePage),
    path: "/",
  },
  {
    element: withSuspense(QuizPage),
    path: "/passquiz",
  },
  {
    element: withSuspense(QuizViewPage),
    path: "/quiz",
  },
  {
    element: withSuspense(ResultPage),
    path: "/result",
  },
  {
    element: withSuspense(SearchPage),
    path: "/browse",
  },
  {
    element: withSuspense(NotFoundPage),
    path: "*",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/BrowsePage';
import QuizViewPage from './pages/QuizViewPage';


const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
  },
  {
    element: <QuizPage />,
    path: "/passquiz",
  },
  {
    element: <QuizViewPage />,
    path: "/quiz",
  },
  {
    element: <ResultPage />,
    path: "/result",
  },
  {
    element: <SearchPage />,  
    path: "/browse",
  }, 
  {
    element: <NotFoundPage />,
    path: "*",
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

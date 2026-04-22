import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginModal from './components/LoginModal';
import SearchPage from './pages/SearchPage';


const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
  },
  {
    element: <QuizPage />,
    path: "/quiz",
  },
  {
    element: <ResultPage />,
    path: "/result",
  },
  {
    element: <LoginModal />,
    path: "/login",
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

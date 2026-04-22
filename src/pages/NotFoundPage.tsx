import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>This is not the page you are looking for.</p>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <p>Page not found</p>
      <p>
        <Link to="/">Click </Link>
        to go back to Home Page
      </p>
    </div>
  );
}

export default NotFound;

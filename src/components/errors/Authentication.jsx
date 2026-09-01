import { Link } from "react-router-dom";
import "./errors.css";
import PageTransition from "../PageTransition";
function Authentication() {
  return (
    <PageTransition>
      <div className="container error-container">
        <img src="/error.svg" alt="Error" />
        <div className="info">
          <h3>Authentication Required</h3>
          <p>Please log in to your account to access this page.</p>
        </div>
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
      </div>
    </PageTransition>
  );
}
export default Authentication;

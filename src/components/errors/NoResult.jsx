import PageTransition from "../PageTransition";
import "./errors.css";
function NoResult() {
  return (
    <PageTransition>
      <div className="container error-container">
        <img src="/error.svg" alt="Error" />
        <div className="info">
          <h3>No items found</h3>
          <p>
            We couldn't find any items that matched your search in the given
            time period
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
export default NoResult;

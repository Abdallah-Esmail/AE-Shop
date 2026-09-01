import PageTransition from "../../components/PageTransition";

function NoPage() {
  return (
    <PageTransition>
      <div className="container error-container">
        <img src="/error.svg" alt="Error" />
        <div className="info">
          <h3>404 Page Not Found</h3>
          <p>
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}

export default NoPage;

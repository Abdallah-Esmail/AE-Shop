import "./spinner.css";

function Spinner({ size = 36, className = "" }) {
  return (
    <div className={`spinner-container ${className}`}>
      <div
        className="spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
}

export default Spinner;

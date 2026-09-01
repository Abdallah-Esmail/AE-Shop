import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyPasswordResetCodeMutation } from "../../api/authApi";
import "./auth.css";
import Spinner from "../../components/spinner/Spinner";
import { handleApiError } from "../../utils/handleApiError";
function VerifyPasswordResetCode() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("resetEmail") || null;
  const [verifyPasswordResetCode, { isLoading, isSuccess }] =
    useVerifyPasswordResetCodeMutation();

  const [resetCode, setResetCode] = useState("");
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!email) {
      navigate("/forget-password", { replace: true });
      return;
    }
    if (isAuth) {
      navigate("/", { replace: true });
      return;
    }
    if (isSuccess) {
      navigate("/reset-password");
    }
  }, [email, isAuth, isSuccess, navigate]);
  const handleChange = (e) => {
    setResetCode(e.target.value);
  };
  const handleResetCode = async (e) => {
    e.preventDefault();
    try {
      await verifyPasswordResetCode({
        email,
        resetCode,
      }).unwrap();
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <div className="container form-container">
      <h1>Verify Code</h1>
      <form onSubmit={handleResetCode}>
        <input
          name="resetCode"
          type="text"
          placeholder="Verification Code"
          value={resetCode}
          onChange={handleChange}
        />
        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size={25} /> : "Send"}
        </button>
        <Link to={"/login"}>
          <button className="btn">Back To Login</button>
        </Link>
      </form>
    </div>
  );
}

export default VerifyPasswordResetCode;

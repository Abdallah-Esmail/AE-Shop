import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../api/authApi";
import "./auth.css";
import Spinner from "../../components/spinner/Spinner";
import { handleApiError } from "../../utils/handleApiError";
import { setCredentials } from "../../features/auth/authSlice";
import PageTransition from "../../components/PageTransition";
function ResetPassword() {
  const email = sessionStorage.getItem("resetEmail") || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const [newPassword, setNewPassword] = useState("");
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
      navigate("/", { replace: true });
      return;
    }
  }, [isSuccess, isAuth, navigate]);
  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword({
        email: sessionStorage.getItem("resetEmail"),
        newPassword,
      }).unwrap();
      dispatch(setCredentials(response));
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <PageTransition>
      <div className="container form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleReset}>
          <input
            name="newPassword"
            type="text"
            placeholder="New Password"
            value={newPassword}
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
    </PageTransition>
  );
}

export default ResetPassword;

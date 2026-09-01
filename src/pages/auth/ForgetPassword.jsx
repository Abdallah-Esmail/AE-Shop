import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../api/authApi";
import Spinner from "../../components/spinner/Spinner";
import "./auth.css";
import { handleApiError } from "../../utils/handleApiError";
import PageTransition from "../../components/PageTransition";
function ForgetPassword() {
  const navigate = useNavigate();
  const [forgetPassword, { isLoading, isSuccess }] =
    useForgetPasswordMutation();

  const [email, setEmail] = useState("");
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
      return;
    }
    if (isSuccess) {
      navigate("/verify-password-reset-code", { replace: true });
    }
  }, [isSuccess, isAuth, navigate]);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleForget = async (e) => {
    e.preventDefault();
    try {
      await forgetPassword(email).unwrap();
      sessionStorage.setItem("resetEmail", email);
    } catch (err) {
      handleApiError(err);
    }
  };
  if (isAuth) {
    return;
  }
  return (
    <PageTransition>
      <div className="container form-container">
        <h1>Forget Password</h1>
        <form onSubmit={handleForget}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
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

export default ForgetPassword;

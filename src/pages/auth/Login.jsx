import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../api/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleApiError } from "../../utils/handleApiError";
import { handleApiSuccess } from "../../utils/handleApiSuccess";
import Spinner from "../../components/spinner/Spinner";
import PageTransition from "../../components/PageTransition";

function Login() {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
      return;
    }
  }, [isAuth, navigate]);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();
      dispatch(setCredentials(response));
      navigate("/", { replace: true });
      handleApiSuccess("Logged in successfully");
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <PageTransition>
      <div className="container form-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size={25} /> : "Login"}
          </button>
          <Link to={"/forget-password"} className="btn">
            Forget password
          </Link>
        </form>
      </div>
    </PageTransition>
  );
}

export default Login;

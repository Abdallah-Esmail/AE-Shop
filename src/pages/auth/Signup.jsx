import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSignupMutation } from "../../api/authApi";
import "./auth.css";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../utils/handleApiError";
import { handleApiSuccess } from "../../utils/handleApiSuccess";
import Spinner from "../../components/spinner/Spinner";
import PageTransition from "../../components/PageTransition";
function Signup() {
  const { isAuth } = useSelector((state) => state.auth);
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
      handleApiError("You have already logged in");
      return;
    }
  }, [isAuth, navigate]);
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData).unwrap();
      dispatch(setCredentials(response));
      handleApiSuccess("Account created successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <PageTransition>
      <div className="container form-container">
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <input
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm Password"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            required
          />
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size={25} /> : "Signup"}
          </button>
        </form>
      </div>
    </PageTransition>
  );
}

export default Signup;

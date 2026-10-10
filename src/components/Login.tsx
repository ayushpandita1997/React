import { useState } from "react";
import { loginApi, profileApi } from "../api/client";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    setErrorMessage("");
    try {
      await loginApi(email, password);
      const user = await profileApi();
      dispatch(addUser(user));
      navigate("/feed", { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center mt-10">
      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            className="input"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errorMessage && (
            <p className="text-red-500" role="alert">
              {errorMessage}
            </p>
          )}
          <div className="label flex justify-between gap-4">
            <a className="link link-primary no-underline">Forgot Password?</a>
            <Link to="/signup" className="link link-primary no-underline">
              Sign Up
            </Link>
          </div>
          <button onClick={loginHandler} className="btn btn-primary mt-4">
            Login
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { loginApi, profileApi } from "../api/client";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("sheetal.bhat@gmail.com");
  const [password, setPassword] = useState("$weetySheetal12");
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
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to sign in.",
      );
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center">
      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
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
          {errorMessage && <p role="alert">{errorMessage}</p>}
          <p className="label">
            Forgot Password? <a className="link link-primary">Click here</a>
          </p>
        </fieldset>
        <div className="card-actions justify-end">
          <button onClick={loginHandler} className="btn btn-primary">
            SignIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

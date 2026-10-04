import { useState } from "react";
import { loginApi } from "./api/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    loginApi(email, password);
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

import { useState } from "react";
import { signUpApi } from "./api/client";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const signUpHandler = () => {
    signUpApi(firstName, lastName, email, password, age);
  };

  return (
    <div className="flex min-h-full items-center justify-center">
      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Signup</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <label className="label">Age</label>
          <input
            type="text"
            className="input"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </fieldset>
        <div className="card-actions justify-end">
          <button onClick={signUpHandler} className="btn btn-primary">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

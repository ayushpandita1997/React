import { useEffect, useState } from "react";
import { signUpApi } from "../api/client";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showSuccessToast) return;

    const timeoutId = window.setTimeout(() => setShowSuccessToast(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [showSuccessToast]);

  const signUpHandler = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !age ||
      !gender ||
      !bio ||
      !skills ||
      !profilePic
    ) {
      setErrorMessage("Please fill in all fields");
      setShowSuccessToast(false);
      return;
    }

    setErrorMessage("");
    setShowSuccessToast(false);

    try {
      const data = await signUpApi(
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
        bio,
        skills,
        profilePic,
      );
      dispatch(addUser(data));
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="flex min-h-full w-full items-center justify-center px-4 py-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-5xl border p-4">
        <legend className="fieldset-legend">Signup</legend>

        <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>

          <div>
            <label className="label">Last Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div>
            <label className="label">Age</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </div>

          <div>
            <label className="label">Gender</label>
            <select
              defaultValue=""
              required
              className="select w-full text-base-content invalid:text-base-content/50"
              value={gender}
              onChange={(e) =>
                setGender(e.target.options[e.target.selectedIndex].text)
              }
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="label">Bio</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>

          <div>
            <label className="label">Profile Picture</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Profile Picture URL"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Skills</label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. React, TypeScript"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-500" role="alert">
            {errorMessage}
          </p>
        )}
        <button onClick={signUpHandler} className="btn btn-primary mt-4 w-full">
          SignUp
        </button>
      </fieldset>
      {showSuccessToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

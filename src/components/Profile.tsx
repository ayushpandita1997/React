import { useEffect, useState } from "react";
import { updateProfileApi } from "../api/client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import { addUser } from "../store/userSlice";
import type { User } from "../utils/types";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);

  if (!user) {
    return (
      <div className="flex min-h-full items-center justify-center px-4 py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return <ProfileForm user={user} />;
};

const ProfileForm = ({ user }: { user: User }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [bio, setBio] = useState(user.bio);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [age, setAge] = useState(user.age.toString());
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const dispatch = useDispatch();

  const normalizedSkills = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const profileHasChanges =
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    normalizedSkills.length !== user.skills.length ||
    normalizedSkills.some((skill, index) => skill !== user.skills[index]) ||
    bio !== user.bio ||
    profilePic !== user.profilePic ||
    gender !== user.gender ||
    Number(age) !== user.age;

  useEffect(() => {
    if (!showSuccessToast) return;

    const timeoutId = window.setTimeout(() => setShowSuccessToast(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [showSuccessToast]);

  const handleProfileUpdate = async () => {
    if (!profileHasChanges) return;

    if (
      !firstName ||
      !lastName ||
      !skills ||
      !bio ||
      !profilePic ||
      !gender ||
      !age
    ) {
      setError("Please fill in all fields");
      setShowSuccessToast(false);
      return;
    }

    setError("");
    setShowSuccessToast(false);
    const profileData = {
      firstName,
      lastName,
      skills: normalizedSkills,
      bio,
      profilePic,
      gender,
      age: Number(age),
    };

    try {
      await updateProfileApi({
        ...profileData,
        _id: user?._id,
        email: user?.email,
      });
      dispatch(addUser({ ...profileData, _id: user?._id, email: user?.email }));
      setShowSuccessToast(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      setError(errorMessage);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-4 ">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-3xl border p-6 shadow-xl">
          <legend className="fieldset-legend mb-2 px-1 text-lg font-semibold">
            Update Profile
          </legend>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-2">
              <label className="label">First Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label className="label">Age</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
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

            <div className="flex min-w-0 flex-col gap-2">
              <label className="label">Skills</label>
              <input
                type="text"
                className="input w-full"
                placeholder="e.g. React, TypeScript"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label className="label">Profile Picture</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Profile Picture URL"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
              <label className="label">Bio</label>
              <textarea
                className="textarea min-h-32 w-full"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="mt-4 text-error">{error}</p>}

          <button
            onClick={handleProfileUpdate}
            disabled={!profileHasChanges}
            className="btn btn-neutral mt-6 w-full"
          >
            Update Profile
          </button>
        </fieldset>
      </div>
      {showSuccessToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

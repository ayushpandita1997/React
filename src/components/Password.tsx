import { useState } from "react";
import { updatePasswordApi } from "../api/client";

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handlePasswordUpdate = async () => {
    setError("");
    setShowSuccessToast(false);

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await updatePasswordApi(password);
      setPassword("");
      setConfirmPassword("");
      setShowSuccessToast(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update password",
      );
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xl border p-6 shadow-xl">
          <legend className="fieldset-legend mb-2 px-1 text-lg font-semibold">
            Update Password
          </legend>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="new-password">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                className="input w-full"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                className="input w-full"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          </div>

          {error && <p className="mt-4 text-error">{error}</p>}

          <button
            type="button"
            onClick={handlePasswordUpdate}
            className="btn btn-neutral mt-6 w-full"
          >
            Update Password
          </button>
        </fieldset>
      </div>
      {showSuccessToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Password updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Password;

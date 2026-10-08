import { useDispatch } from "react-redux";
import { sendRequestsApi } from "../api/client";
import type { User } from "../utils/types";
import { removeUserFeed } from "../store/userSlice";

const UserCard = ({ user }: { user: User }) => {
  const { _id, firstName, lastName, age, gender, profilePic, skills, bio } =
    user;
  const dispatch = useDispatch();

  const requestHandler = async (
    status: "interested" | "ignore",
  ) => {
    if (!_id) {
      console.error("Cannot send request: user ID is missing.");
      return;
    }

    await sendRequestsApi(status, _id);
    dispatch(removeUserFeed(_id));
  };

  return (
    <div>
      <div className="card bg-base-100 w-80 max-w-full shadow-sm">
        <figure>
          <img src={profilePic} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>
            {age} · {gender}
          </p>
          <p>{bio}</p>
          <p>Skills: {skills.join(", ")}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => requestHandler("interested")}
              disabled={!_id}
              className="btn btn-soft btn-info"
            >
              Ignore
            </button>
            <button
              onClick={() => requestHandler("ignore")}
              disabled={!_id}
              className="btn btn-soft btn-error"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

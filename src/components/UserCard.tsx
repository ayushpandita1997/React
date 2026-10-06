import type { User } from "../store/userSlice";

const UserCard = ({ user }: { user: User }) => {
  const { firstName, lastName, age, gender, profilePic, skills, bio } = user;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

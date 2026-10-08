import { useDispatch, useSelector } from "react-redux";
import { type User } from "../utils/types";
import { Link, useNavigate } from "react-router";
import { logoutApi } from "../api/client";
import { removeUser } from "../store/userSlice";

const NavBar = () => {
  const user = useSelector((state: { user: User }) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApi();
      dispatch(removeUser());
      return navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.profilePic}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  My Connections
                </Link>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

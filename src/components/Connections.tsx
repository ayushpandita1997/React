import { useEffect } from "react";
import { connectionsApi } from "../api/client";
import { connections } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/appStore";

const Connections = () => {
  const dispatch = useDispatch();
  const userConnection = useSelector((state: RootState) => state.connections);

  useEffect(() => {
    if (userConnection) return;
    const connectionsData = async () => {
      try {
        const data = await connectionsApi();
        dispatch(connections(data.connectionData));
      } catch (error) {
        console.error("Error fetching connections:", error);
        throw error;
      }
    };

    connectionsData();
  }, [dispatch, userConnection]);

  if (userConnection?.length === 0) {
    return (
      <main className="mx-auto w-full max-w-2xl p-4 sm:p-6">
        <h1 className="text-center text-xl font-semibold">No Connections Found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-4 sm:p-6">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Connections
        </li>

        {userConnection?.map((user, index) => (
          <li className="list-row" key={user._id ?? index}>
            <div>
              <img
                className="size-10 rounded-box"
                src={user.profilePic}
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>
            <div>
              <div>
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {user.age} · {user.gender}
              </div>
            </div>
            <p className="list-col-wrap text-xs">
              {user.bio || "No bio available"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Connections;

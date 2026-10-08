import { useEffect } from "react";
import { receivedRequestsApi } from "../api/client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import { receivedRequests } from "../store/userSlice";

const ReceivedRequests = () => {
  const dispatch = useDispatch();
  const receivedRequest = useSelector(
    (state: RootState) => state.receivedRequests,
  );
  useEffect(() => {
    if (receivedRequest) return;
    const receivedRequestsData = async () => {
      try {
        const data = await receivedRequestsApi();
        dispatch(receivedRequests(data.data));
      } catch (error) {
        console.error("Error fetching received requests:", error);
        throw error;
      }
    };

    receivedRequestsData();
  }, [dispatch, receivedRequest]);
  if (receivedRequest?.length === 0) {
    return (
      <main className="mx-auto w-full max-w-2xl p-4 sm:p-6">
        <h1 className="text-center text-xl font-semibold">
          No Received Requests Found
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-4 sm:p-6">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Received Requests
        </li>

        {receivedRequest?.map((request, index) => {
          const user = request.fromUserId;

          return (
            <li className="list-row" key={request._id ?? index}>
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
          );
        })}
      </ul>
    </main>
  );
};

export default ReceivedRequests;

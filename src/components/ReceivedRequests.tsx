import { useEffect, useState } from "react";
import { receivedRequestsApi, reviewRequestsApi } from "../api/client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import {
  receivedRequests,
  removeReceivedRequest,
} from "../store/userSlice";

const ReceivedRequests = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
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

  const reviewRequestHandler = async (
    status: "accept" | "reject",
    requestId: string,
  ) => {
    setErrorMessage("");
    try {
      await reviewRequestsApi(status, requestId);
      dispatch(removeReceivedRequest(requestId));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to review request",
      );
    }
  };

  return (
    <main className="mx-auto w-full max-w-2xl p-4 sm:p-6">
      <p className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Received Requests
      </p>
      {errorMessage && (
        <p className="px-4 text-sm text-error" role="alert">
          {errorMessage}
        </p>
      )}
      <ul className="list gap-4 bg-transparent shadow-none">
        {receivedRequest?.map((request, index) => {
          const user = request.fromUserId;

          return (
            <li
              className="list-row flex items-center gap-4 rounded-box bg-base-100 shadow-md"
              key={request._id ?? index}
            >
              <div className="shrink-0">
                <img
                  className="size-10 rounded-box"
                  src={user.profilePic}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {user.age} · {user.gender}
                </div>
                <p className="list-col-wrap text-xs">
                  {user.bio || "No bio available"}
                </p>
              </div>
              <div className="ml-auto flex shrink-0 flex-row items-center justify-center gap-2">
                <button
                  onClick={() => reviewRequestHandler("accept", request._id)}
                  className="btn btn-soft btn-info"
                >
                  Accept
                </button>
                <button
                  onClick={() => reviewRequestHandler("reject", request._id)}
                  className="btn btn-soft btn-error"
                >
                  Decline
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default ReceivedRequests;

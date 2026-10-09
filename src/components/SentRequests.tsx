import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import { removeSentRequestApi, viewSendRequestsApi } from "../api/client";
import { removeSentRequest, sentRequest } from "../store/userSlice";

const SentRequests = () => {
  const dispatch = useDispatch();
  const sent = useSelector((state: RootState) => state.sentRequest);

  useEffect(() => {
    if (sent) return;
    const sentRequestsData = async () => {
      try {
        const data = await viewSendRequestsApi();
        dispatch(sentRequest(data.data));
      } catch (error) {
        console.error("Error fetching connections:", error);
        throw error;
      }
    };

    sentRequestsData();
  }, [dispatch, sent]);

  if (sent?.length === 0) {
    return (
      <main className="mx-auto w-full max-w-2xl p-4 sm:p-6">
        <h1 className="text-center text-xl font-semibold">
          No Connections Found
        </h1>
      </main>
    );
  }
  const removeRequest = async (requestId: string) => {
    await removeSentRequestApi(requestId);
    dispatch(removeSentRequest(requestId));
  };
  return (
    <main className="mx-auto w-full max-w-2xl p-4 sm:p-6">
      <p className="p-4 pb-3 text-xs opacity-60 tracking-wide">Sent Requests</p>
      <div className="space-y-3">
        {sent?.map((user, index) => {
          const sentData = user.toUserId;
          return (
            <article
              className="flex items-center justify-between rounded-box border border-white/5 bg-[#2a3442]/80 px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
              key={sentData._id ?? index}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="shrink-0 overflow-hidden rounded-box bg-[#1d2430]">
                  <img
                    className="size-10 object-cover"
                    src={sentData.profilePic}
                    alt={`${sentData.firstName} ${sentData.lastName}`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-lg font-semibold leading-tight text-white">
                    {sentData.firstName} {sentData.lastName}
                  </div>
                  <div className="text-xs uppercase font-semibold tracking-[0.02em] text-white/60">
                    {sentData.age} · {sentData.gender}
                  </div>
                  <p className="mt-1 text-sm text-white/90">
                    {sentData.bio || "No bio available"}
                  </p>
                </div>
                <button
                  onClick={() => removeRequest(user._id)}
                  className="ml-auto min-w-20 rounded-lg bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/15"
                >
                  Remove Request
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default SentRequests;

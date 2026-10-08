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
        <h1 className="text-center text-xl font-semibold">
          No Connections Found
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-4 sm:p-6">
      <p className="p-4 pb-3 text-xs opacity-60 tracking-wide">Connections</p>
      <div className="space-y-3">
        {userConnection?.map((user, index) => (
          <article
            className="flex items-center justify-between rounded-box border border-white/5 bg-[#2a3442]/80 px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
            key={user._id ?? index}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="shrink-0 overflow-hidden rounded-box bg-[#1d2430]">
                <img
                  className="size-10 object-cover"
                  src={user.profilePic}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </div>

              <div className="min-w-0">
                <div className="text-lg font-semibold leading-tight text-white">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs uppercase font-semibold tracking-[0.02em] text-white/60">
                  {user.age} · {user.gender}
                </div>
                <p className="mt-1 text-sm text-white/90">
                  {user.bio || "No bio available"}
                </p>
              </div>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-2">
              <button className="min-w-20 rounded-lg bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/15">
                Accept
              </button>
              <button className="min-w-20 rounded-lg bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/15">
                Decline
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Connections;

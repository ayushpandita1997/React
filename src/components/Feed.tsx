import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedApi } from "../api/client";
import { addUserFeed } from "../store/userSlice";
import type { RootState } from "../store/appStore";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    if (userFeed !== null) return;

    const loadFeed = async () => {
      try {
        const data = await feedApi();
        dispatch(addUserFeed(data));
      } catch (error) {
        console.error(error);
      }
    };

    void loadFeed();
  }, [dispatch, userFeed]);

  return (
    <div>
      {userFeed?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Feed;

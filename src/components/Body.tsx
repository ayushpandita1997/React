import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useRef } from "react";
import { addUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { profileApi } from "../api/client";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store: { user: unknown }) => store.user);
  const profileCheckStarted = useRef(false);

  useEffect(() => {
    if (profileCheckStarted.current || userData) return;
    profileCheckStarted.current = true;

    const loadProfile = async () => {
      try {
        const data = await profileApi();
        dispatch(addUser(data));
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "No token provided") {
            navigate("/login");
          }
          return;
        }
        console.error(error);
        navigate("/login");
      }
    };

    void loadProfile();
  }, [dispatch, navigate, userData]);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

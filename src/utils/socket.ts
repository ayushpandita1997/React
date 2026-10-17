import { io } from "socket.io-client";
import { API_BASE_URL } from "./constants";

const createSocketConection = () => {
  if (location.hostname === "localhost") {
    return io(API_BASE_URL);
  }
  return io("/", { path: "/api/socket.io" });
};
export default createSocketConection;

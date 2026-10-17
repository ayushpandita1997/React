import { io } from "socket.io-client";
import { API_BASE_URL } from "./constants";

const createSocketConection = () => {
  return io(API_BASE_URL);
};
export default createSocketConection;

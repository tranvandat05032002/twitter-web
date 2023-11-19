import { io } from "socket.io-client";
import { getToken } from "./auth/cookies";
const { access_token } = getToken();
const socket = io(process.env.NEXT_PUBLIC_PORT_SERVER as string, {
  auth: {
    Authorization: `Bearer ${access_token}`,
  },
});

export default socket;

import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_PORT_SERVER as string);

export default socket
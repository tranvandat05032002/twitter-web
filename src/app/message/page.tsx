"use client";
import React from "react";
import { io } from "socket.io-client";
const Message = () => {
  React.useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_PORT_SERVER as string);
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return <div>This is Message page</div>;
};

export default Message;

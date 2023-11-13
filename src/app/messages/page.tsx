"use client";
import { useGetUserReload, useLogoutUser } from "@/hooks/users/useMutation";
import { useFetchMe } from "@/hooks/users/useQuery";
import { useUserInfo } from "@/store/useUserInfo";
import { IUser } from "@/types/userTypes";
import { getToken, saveProfileMe, saveToken } from "@/utils/auth/cookies";
import { Routers } from "@/utils/router/routers";
import socket from "@/utils/socket";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { v4 as uuidV4 } from "uuid";
const username = [
  {
    name: "Tranvandatevondev0503@gmail.com",
    value: "@Twitternamefbfe72",
  },
  { name: "Tranvandatevondev0503+1@gmail.com", value: "@Twittername083a56" },
];
const Messages = () => {
  const { data: user } = useFetchMe();
  const { userInfo, setUserInfo } = useUserInfo();
  const { mutate: mutateGetUserReload } = useGetUserReload();
  const [value, setValue] = React.useState("");
  const [messages, setMessage] = React.useState<any>([]);
  const { mutate: mutateLogout } = useLogoutUser();
  const [receive, setReceive] = React.useState("");
  const router = useRouter();
  React.useEffect(() => {
    if (user) {
      setUserInfo(user);
      saveProfileMe(user);
    } else {
      const { access_token, refresh_token } = getToken();
      if (refresh_token) {
        mutateGetUserReload({
          access_token: access_token as string,
          refresh_token,
        });
      } else {
        router.push(Routers.signInPage);
        mutateLogout();
      }
    }
  }, []);
  React.useEffect(() => {
    socket.connect();
    socket.auth = {
      _id: userInfo?._id,
    };
    socket.on("receive private message", (data: any) => {
      const newMessage = data.content;
      setMessage((message: any) => [
        ...message,
        { content: newMessage, isSend: false },
      ]);
    });
    return () => {
      socket.off("receive private message", (data) => {
        const newMessage = data.content;
        setMessage((message: any) => [...message, newMessage]);
      });
      socket.disconnect();
    };
  }, []);
  const getProfile = async (username: string) => {
    const result = await axios.get(`/users/${username}`, {
      baseURL: process.env.NEXT_PUBLIC_PORT_SERVER,
    });
    if (result.status === 200) {
      const _id = result.data?.result?._id;
      setReceive(_id);
    }
  };
  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setValue("");
    socket.emit("private message", {
      content: value,
      to: receive,
      from: userInfo?._id,
    });
    setMessage((message: any) => [
      ...message,
      {
        content: value,
        isSend: true,
      },
    ]);
  };
  return (
    <div className="h-screen text-black w-full">
      <p className="text-white">Twitter Chat</p>
      <div className="grid grid-cols-2">
        <div className="flex justify-center items-center flex-col">
          <div className="flex flex-col border border-gray-500 max-h-[200px] h-[300px] overflow-scroll w-[250px]">
            {messages.map((message: any) => (
              <div
                key={uuidV4()}
                className={`max-w-[70%] text-left py-1 px-2 rounded-md mb-1 ${
                  message.isSend
                    ? "ml-auto  bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center h-full w-full flex-col">
          {username.map((user) => (
            <button
              key={uuidV4()}
              className="border-none outline-none py-1 px-2 mb-3 text-black hover:text-blue-300 bg-gray-100"
              onClick={() => getProfile(user.value)}
            >
              {user.name}
            </button>
          ))}
          <form onSubmit={handleSendMessage} autoComplete="off">
            <input
              className="border-none outline-none px-3 py-1"
              type="text"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <button className="bg-blue-300 px-3 py-1 ml-2">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;

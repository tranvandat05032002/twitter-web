"use client";
import { LoadingSniper } from "@/components/common/Loading/LoadingSniper";
import { useGetUserReload, useLogoutUser } from "@/hooks/users/useMutation";
import { useFetchMe } from "@/hooks/users/useQuery";
import { useUserInfo } from "@/store/useUserInfo";
import { IUser } from "@/types/userTypes";
import { getToken, logOutCookies, saveProfileMe, saveToken } from "@/utils/auth/cookies";
import { Routers } from "@/utils/router/routers";
import socket from "@/utils/socket";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [conversations, setConversations] = React.useState<any>([]);
  const PAGE = 1;
  const LIMIT = 10;
  const [pagination, setPagination] = React.useState({
    page: PAGE,
    total_page: 0,
  });
  const { mutate: mutateLogout } = useLogoutUser();
  const [receiver, setReceiver] = React.useState("");
  const router = useRouter();
  const { access_token, refresh_token } = getToken();
  React.useEffect(() => {
    if (user) {
      setUserInfo(user);
      saveProfileMe(user);
    } else {
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
    socket.on("receiver_message", (data: any) => {
      const { payload } = data;
      setConversations((conversations: any) => [payload, ...conversations]);
    });
    socket.on("connect_error", (err: any) => {
      console.log(err);
    });
    socket.on("disconnect", (reason) => {
      if(reason) {
        logOutCookies()
        router.push(Routers.signInPage);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  React.useEffect(() => {
    if (!receiver) return;
    axios
      .get(`/conversation/receivers/${receiver}`, {
        baseURL: process.env.NEXT_PUBLIC_PORT_SERVER,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          page: PAGE,
          limit: LIMIT,
        },
      })
      .then((result) => {
        const { conversations, page, total_page } = result.data.result;
        setConversations(conversations);
        setPagination({
          page,
          total_page,
        });
      });
  }, [receiver]);
  const fetchMoreConversation = () => {
    if (receiver && pagination.page < pagination.total_page) {
      axios
        .get(`/conversation/receivers/${receiver}`, {
          baseURL: process.env.NEXT_PUBLIC_PORT_SERVER,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            page: pagination.page + 1,
            limit: LIMIT,
          },
        })
        .then((result) => {
          const { conversations, page, total_page } = result.data.result;
          setConversations((prevConversation: any) => [
            ...prevConversation,
            ...conversations,
          ]);
          setPagination({
            page,
            total_page,
          });
        });
    }
  };
  const getProfile = async (username: string) => {
    const result = await axios.get(`/users/${username}`, {
      baseURL: process.env.NEXT_PUBLIC_PORT_SERVER,
    });
    if (result.status === 200) {
      const _id = result.data?.result?._id;
      setReceiver(_id);
    }
  };
  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setValue("");
    if (!value) return;
    const conversation = {
      content: value,
      sender_id: userInfo?._id,
      receiver_id: receiver,
    };
    socket.emit("send_message", {
      payload: conversation,
    });
    setConversations((conversations: any) => [
      {
        ...conversation,
        _id: uuidV4(),
      },
      ...conversations,
    ]);
  };
  return (
    <div className="h-screen text-black w-full">
      <p className="text-white">Twitter Chat</p>
      <div className="grid grid-cols-2">
        <div className="flex justify-center items-center flex-col">
          <div className="flex flex-col border border-gray-500 max-h-[200px] h-[300px] overflow-scroll w-[250px]">
            <div
              id="scrollableDiv"
              style={{
                height: 300,
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={conversations.length}
                next={fetchMoreConversation}
                style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={pagination.page < pagination.total_page}
                loader={
                  <LoadingSniper className="border-blue-300 mx-auto h-6 w-6" />
                }
                scrollableTarget="scrollableDiv"
              >
                {receiver &&
                  receiver !== userInfo?._id &&
                  conversations.map((message: any) => (
                    <div
                      key={uuidV4()}
                      className={`max-w-[70%] text-left py-1 px-2 rounded-md mb-1 ${
                        message.sender_id === userInfo?._id
                          ? "ml-auto  bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <p className="">{message.content}</p>
                    </div>
                  ))}
              </InfiniteScroll>
            </div>
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

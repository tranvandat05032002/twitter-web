// Method: GET

import { IUser } from "@/types/userTypes";
import { ISearchUser, requestFetchMe, requestGetChat, requestGetMessage, requestGetUserProfile, requestGetUserProfileUserId, requestGetUsersFollowing, requestSearchUser } from "@/utils/api/request";
import { useQuery } from "@tanstack/react-query";

export const useFetchMe = () =>
  useQuery({
    queryKey: ["getMe"],
    queryFn: () => requestFetchMe(),
    staleTime: 1 * 60 * 60 * 1000,
    cacheTime: 2 * 60 * 60 * 1000,
    keepPreviousData: true
  });
export const useGetProfile = (username: string) =>
  useQuery(["profile", username], () => requestGetUserProfile(username), {
    staleTime: 60 * 60 * 1000,  // 1 hour
    cacheTime: 2 * 60 * 60 * 1000,  // 2 hours
    retry: 1
  });
export const useGetProfileUserId = (userId: string) =>
  useQuery(["profile_id", userId], () => requestGetUserProfileUserId(userId), {
    staleTime: 60 * 60 * 1000,  // 1 hour
    cacheTime: 2 * 60 * 60 * 1000,  // 2 hours
    retry: 1
  });

export const useSearchUser = (infoSearch: ISearchUser) =>
  useQuery(["user", infoSearch.query], () => requestSearchUser(infoSearch), {
    enabled: Boolean(infoSearch.query),
    staleTime: 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    retry: 0
  });

export const useGetUsersFollowing = () =>
  useQuery({
    queryKey: ["user_following"],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return requestGetUsersFollowing(controller.signal)
    },
    staleTime: 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    keepPreviousData: true
  })

export const useGetChats = (user_id: string) =>
  useQuery(["chats", user_id], () => requestGetChat(user_id), {
    keepPreviousData: true
  })
export const useGetMessage = (chat_id: string) =>
  useQuery(["message", chat_id], () => requestGetMessage(chat_id), {
    staleTime: 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    keepPreviousData: true
  })
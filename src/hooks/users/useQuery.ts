// Method: GET

import { IUser } from "@/types/userTypes";
import { ISearchUser, requestFetchMe, requestGetUserProfile, requestGetUsersFollowing, requestSearchUser } from "@/utils/api/request";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const useFetchMe = () =>
  useQuery({
    queryKey: ["getMe"],
    queryFn: async () => (await requestFetchMe()) as IUser,
    staleTime: 1 * 60 * 1000,
  });
export const useGetProfile = (username: string) =>
  useQuery(["profile", username], () => requestGetUserProfile(username), {
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
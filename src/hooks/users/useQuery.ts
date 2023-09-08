// Method: GET

import { requestFetchMe, requestGetUserProfile } from "@/utils/api/request";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const useFetchMe = () =>
  useQuery(["me"], () => requestFetchMe(), {
    refetchOnWindowFocus: false,
    // cacheTime: 10 * 60 * 1000,
    // staleTime: 5 * 60 * 1000
  });
export const useGetProfile = (username: string) =>
  useQuery(["profile"], () => requestGetUserProfile(username), {
    refetchOnWindowFocus: false,
  });

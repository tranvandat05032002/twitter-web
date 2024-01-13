// Method: GET

import { IUser } from "@/types/userTypes";
import { requestFetchMe, requestGetUserProfile } from "@/utils/api/request";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const useFetchMe = () =>
  useQuery({
    queryKey: ["getMe"],
    queryFn: async () => (await requestFetchMe()) as IUser,
    refetchOnWindowFocus: false,
    staleTime: 1 * 60 * 1000,
  });
export const useGetProfile = (username: string) =>
  useQuery(["profile"], () => requestGetUserProfile(username), {
    refetchOnWindowFocus: false,
  });

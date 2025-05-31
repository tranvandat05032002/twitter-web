// Method: GET
import { ISearchUser, requestFetchMe, requestGetChat, requestGetComments, requestGetMessage, requestGetStories, requestGetTweetById, requestGetTweets, requestGetUserProfile, requestGetUserProfileUserId, requestGetUsersFollowing, requestSearchUser } from "@/utils/api/request";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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
  });

export const useGetUsersFollowing = () =>
  useQuery({
    queryKey: ["user_following"],
    queryFn: async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const response = await requestGetUsersFollowing(signal);
      return response;
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

// tweet
export const useGetTweets = () => {
  return useQuery({
    queryKey: ['tweets'], // Đổi tên key cho rõ ràng hơn
    queryFn: async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      // Gọi API và trả về dữ liệu
      const response = await requestGetTweets(signal);
      return response;
    },
    staleTime: 60 * 1000, // Dữ liệu sẽ được coi là "cũ" sau 60 giây
    cacheTime: 2 * 60 * 1000, // Dữ liệu sẽ được lưu trong cache trong 2 phút
    keepPreviousData: true, // Giữ dữ liệu cũ trong khi đang tải dữ liệu mới
    retry: 3, // Số lần thử lại khi có lỗi
    onError: (error: unknown) => {
      console.error('Error fetching tweets:', error);
    },
  });
};

export const useGetTweetById = (tweet_id: string) => {
  return useQuery({
    queryKey: ['tweet', tweet_id],
    queryFn: async () => {
      return await requestGetTweetById(tweet_id);
    },
    onError: (error: unknown) => {
      console.error('Error fetching tweets:', error);
    },
  });
};

export const useGetComments = (tweet_id: string) => {
  return useQuery({
    queryKey: ['comments', tweet_id],
    queryFn: async () => {
      return await requestGetComments(tweet_id);
    },
    onError: (error: unknown) => {
      console.error('Error fetching comments:', error);
    },
  });
};

export const useGetStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      return await requestGetStories();
    },
    onError: (error: unknown) => {
      console.error('Error fetching comments:', error);
    },
  });
};


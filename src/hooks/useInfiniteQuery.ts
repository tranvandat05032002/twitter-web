import { TWEET_LIMIT } from "@/constant/tweet";
import { ResultTweet } from "@/types/tweetTypes";
import { apiInstance } from "@/utils/api";
import { requestFetchInfiniteBookmarkedTweets, requestFetchInfiniteComments, requestFetchInfiniteLikedTweets, requestFetchInfiniteNotifications, requestFetchInfiniteOwnerTweets, requestFetchInfiniteTweets, requestFetchInfiniteTweetsByUser, requestGetTweets } from "@/utils/api/request";
import { getToken } from "@/utils/auth/cookies";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteTweets = () => {
    return useInfiniteQuery({
        queryKey: ['tweets'],
        queryFn: requestFetchInfiniteTweets,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.tweet.tweets.length === 0) return undefined;
            return allPages.length + 1;
        },
    });
};


export const useInfiniteOwnerTweets = () => {
    return useInfiniteQuery({
        queryKey: ['owner_tweets'],
        queryFn: requestFetchInfiniteOwnerTweets,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.tweet.tweets.length === 0) return undefined;
            return allPages.length + 1;
        },
    });
};
export const useInfiniteUserTweets = (user_id: string) => {
    return useInfiniteQuery({
        queryKey: ['user_tweets'],
        queryFn: ({ pageParam = 1 }) => requestFetchInfiniteTweetsByUser({
            pageParam,
            user_id: user_id
        }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.tweet.tweets.length === 0) return undefined;
            return allPages.length + 1;
        },
        enabled: !!user_id
    });
};

export const useInfiniteLikedTweets = () => {
    return useInfiniteQuery({
        queryKey: ['liked_tweets'],
        queryFn: requestFetchInfiniteLikedTweets,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.tweet.tweets.length === 0) return undefined;
            return allPages.length + 1;
        },
    });
};

// Bookmark
export const useInfiniteBookmarkedTweets = () => {
    return useInfiniteQuery({
        queryKey: ['bookmarked_tweets'],
        queryFn: requestFetchInfiniteBookmarkedTweets,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.tweet.tweets.length === 0) return undefined;
            return allPages.length + 1;
        },
    });
};

// Comment
export const useInfiniteComments = (tweet_id: string) => {
    return useInfiniteQuery({
        queryKey: ['comments', tweet_id],
        queryFn: ({ pageParam = 1 }) => requestFetchInfiniteComments({
            pageParam,
            tweet_id
        }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.result?.comments.length === 0) return undefined;
            return allPages.length + 1;
        }
    })
}

// Notifications
export const useInfiniteNotifications = () => {
    return useInfiniteQuery({
        queryKey: ['notifycations'],
        queryFn: ({ pageParam = 1 }) => requestFetchInfiniteNotifications({
            pageParam,
        }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.result?.notifications.length === 0) return undefined;
            return allPages.length + 1;
        }
    })
}
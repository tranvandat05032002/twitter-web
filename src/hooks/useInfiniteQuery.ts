import { TWEET_LIMIT } from "@/constant/tweet";
import { ResultTweet } from "@/types/tweetTypes";
import { apiInstance } from "@/utils/api";
import { requestGetTweets } from "@/utils/api/request";
import { getToken } from "@/utils/auth/cookies";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchTweets = async ({ pageParam = 1 }) => {
    const { access_token } = getToken()
    try {
        const response = await apiInstance.get(`/tweet?limit=${TWEET_LIMIT}&page=${pageParam}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (response.status === 200) {
            return response.data.result as ResultTweet
        }
    } catch (error) {
        throw error
    }
};

export const useInfiniteTweets = () => {
    return useInfiniteQuery({
        queryKey: ['tweets'],
        queryFn: fetchTweets,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.tweet.tweets.length === 0) return undefined;
            return allPages.length + 1;
        },
    });
};

const fetchOwnerTweets = async ({ pageParam = 1 }) => {
    const { access_token } = getToken()
    try {
        const response = await apiInstance.get(`/tweet/owner?limit=${TWEET_LIMIT}&page=${pageParam}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (response.status === 200) {
            return response.data.result as ResultTweet
        }
    } catch (error) {
        throw error
    }
};

export const useInfiniteOwnerTweets = () => {
    return useInfiniteQuery({
        queryKey: ['owner_tweets'],
        queryFn: fetchOwnerTweets,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.tweet.tweets.length === 0) return undefined;
            return allPages.length + 1;
        },
    });
};
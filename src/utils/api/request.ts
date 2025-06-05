import {
  IOTP,
  IToken,
  IUpdateUser,
  IUser,
  LoginForm,
  RegisterForm,
  TRequestProfile,
  TRequestToken,
  TRequestUser,
} from "@/types/userTypes";
import { apiInstance } from ".";
import {
  getOTPToken,
  getToken,
  logOutCookies,
  removeOTPToken,
  removeToken,
  saveOTP,
  saveToken,
} from "../auth/cookies";
import { toast } from "react-toastify";
import { useUserInfo } from "@/store/useUserInfo";
import { ForgotForm } from "@/app/users/find-account/page";
import { ResetPasswordForm } from "@/app/users/reset-password/page";
import { AxiosInstance } from "axios";
import { AddNewMessageResponseType, CreateChatForm, GetChatResponseType, GetMessagesResponseType, NewMessageRequestType } from "@/types/chatTypes";
import { MediaForm, Mediatype, ResultTweet, Tweet, TweetForm } from "@/types/tweetTypes";
import { useQueryClient } from "@tanstack/react-query";
import { Comment, CommentForm, CommentWithReplies, EditCommentPayload, ResultComment } from "@/types/commentTypes";
import { COMMENT_LIMIT, TWEET_LIMIT } from "@/constant/tweet";
import { ResultStory } from "@/types/storyTypes";
import { ResultNotify } from "@/types/notifyTypes";
export const requestRegister = async (registerInfo: RegisterForm) => {
  try {
    const { data } = await apiInstance.post<TRequestToken<IToken>>(
      "/users/register",
      {
        ...registerInfo,
      }
    );
    const { access_token, refresh_token } = data.result;
    saveToken({
      access_token,
      refresh_token,
    });
  } catch (error) {
    throw error;
  }
};

export const requestVerifyEmail = async (email_token: string) => {
  try {
    const { data } = await apiInstance.post<TRequestToken<IToken>>(
      "/users/verify-email",
      {
        email_verify_token: email_token as string,
      }
    );
    saveToken({
      access_token: data.result.access_token,
      refresh_token: data?.result.refresh_token,
    });
  } catch (error) {
    throw error;
  }
};

export const requestResendEmailToken = async () => {
  //apiPrivate is a interceptor
  const { access_token } = getToken();
  try {
    const response = await apiInstance.post(
      "/users/resend-verify-email",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    response?.status === 200
      ? toast.success("Email resent success!")
      : toast.error("Email resent error!");
    // return response;
  } catch (error) {
    throw error;
  }
};

export const requestFetchMe = async () => {
  const { access_token } = getToken();
  if (!access_token) return;
  try {
    const response = await apiInstance.get<TRequestUser<IUser>>("/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status === 200) {
      const { data } = response;
      useUserInfo.getState().setUserInfo(data.result.user);
      return data.result.user as IUser;
    }
  } catch (error) {
    throw error
  }
};
export const requestLogIn = async (signInInfo: LoginForm) => {
  try {
    const response = await apiInstance.post<TRequestToken<IToken>>(
      "/users/login",
      {
        ...signInInfo,
      }
    );
    if (response.status === 200) {
      const { data } = response;
      saveToken({
        access_token: data.result.access_token,
        refresh_token: data.result.refresh_token,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const requestGetToken = async ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) => {
  if (!access_token && !refresh_token) return;
  try {
    const response = await apiInstance.post(
      "/users/refresh-token",
      {
        refresh_token: refresh_token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response?.status === 200) {
      const { access_token, refresh_token } = response.data.result;
      saveToken({
        access_token,
        refresh_token,
      });
    } else {
      removeToken();
    }
  } catch (error) {
    throw error;
  }
};

export const requestFetchUserReload = async ({
  access_token,
  refresh_token,
}: IToken) => {
  try {
    const response = await apiInstance.post<TRequestToken<IToken>>(
      "/users/refresh-token",
      {
        refresh_token: refresh_token,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 200) {
      const { data } = response;
      const new_access_token = data?.result?.access_token as string;
      const new_refresh_token = data?.result?.refresh_token as string;
      saveToken({
        access_token: new_access_token,
        refresh_token: new_refresh_token,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const requestLogout = async () => {
  const { access_token, refresh_token } = getToken();
  if (!access_token && !refresh_token) return;
  try {
    const response = await apiInstance.post(
      "/users/logout",
      {
        refresh_token: refresh_token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response?.status === 200) {
      logOutCookies();
      toast.success("Logout success!", {
        pauseOnHover: false,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const requestFindEmail = async (email: ForgotForm) => {
  try {
    const response = await apiInstance.post<TRequestUser<IUser>>(
      "/users/find-email",
      {
        ...email,
      }
    );
    if (response.status === 200) {
      return response?.data?.user;
    }
  } catch (error) {
    throw error;
  }
};

export const requestSendOTP = async (email: string) => {
  if (!email) return;
  try {
    const response = await apiInstance.post<IOTP>("/users/forgot-password", {
      email,
    });
    if (response.status === 200) {
      const { data } = response;
      saveOTP({
        jwtToken: data?.jwtToken as string,
      });
    }
  } catch (error) {
    throw error;
  }
};
export const requestCheckOTP = async (otp: string) => {
  const { otp_token } = getOTPToken();
  try {
    const response = await apiInstance.post(
      "/users/verify-otp",
      {
        otp_auth: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otp_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestResendOTP = async () => {
  const { otp_token } = getOTPToken();
  try {
    const response = await apiInstance.post<IOTP>(
      "/users/resend-otp",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${otp_token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Chúng tôi đã gửi lại mã OTP mới đến bạn", {
        pauseOnHover: false,
      });
      saveOTP({
        jwtToken: response?.data.jwtToken,
      });
    } else {
      toast.error("Đã xảy ra lỗi", {
        pauseOnHover: false,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const requestResetPassword = async (
  resetPasswordForm: ResetPasswordForm
) => {
  try {
    const { otp_token } = getOTPToken();
    await apiInstance.post("/users/reset-password", {
      ...resetPasswordForm,
      otp_password_token: otp_token,
    });
  } catch (error) {
    throw error;
  }
};

export const requestGetUserProfile = async (username: string) => {
  if (!username) return null
  const { access_token } = getToken();
  try {
    const response = await apiInstance.get<TRequestProfile<IUser>>(
      `/users${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
    );
    if (response.status === 200) {
      return response.data.result;
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};
export const requestGetUserProfileUserId = async (userId: string) => {
  if (!userId) return null;
  try {
    const response = await apiInstance.get<TRequestProfile<IUser>>(
      `/users/v1/${userId}`
    );
    if (response.status === 200) {
      return response.data.result;
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};
export const requestUpdateUserProfile = async (userInfo: IUpdateUser) => {
  const { access_token } = getToken();
  try {
    const response = await apiInstance.patch(
      "/users/me",
      {
        ...userInfo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export interface ISearchUser {
  query: String,
  limit: number,
  page: number,
  follow?: "on" | "off"
}
export const requestSearchUser = async (infoSearch: ISearchUser) => {
  const { limit, query, page, follow } = infoSearch
  const { access_token } = getToken()
  try {
    const response = await apiInstance.get(`/search/people?name=${query}&page=${page}&limit=${limit}&people_follow=${follow}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data.result.data;
  } catch (error) {
    throw error;
  }
};

export const requestGetUsersFollowing = async (signal?: AbortSignal) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.get(`/users/me/follow`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      signal
    });
    return {
      data: response.data.users,
      total: response.data.total
    }
  } catch (error) {
    throw error;
  }
}
export const requestGetChat = async (userId: string) => {
  const { access_token } = getToken()
  if (!userId) return null;
  try {
    const response = await apiInstance.get<GetChatResponseType>(`/chat/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data.result
  } catch (error) {
    throw error
  }
}
export const requestGetMessage = async (chatId: string) => {
  const { access_token } = getToken()
  if (!chatId) return null;
  try {
    const response = await apiInstance.get<GetMessagesResponseType>(`/message/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status === 200) {
      return response.data.result
    }
  } catch (error) {
    throw error
  }
}
export const requestAddMessage = async (newMessage: NewMessageRequestType) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.post<AddNewMessageResponseType>(`/message`, {
      chat_id: newMessage.chat_id,
      sender_id: newMessage.sender_id,
      text: newMessage.text,
      created_at: newMessage.created_at,
      updated_at: newMessage.updated_at
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    });
    return response.data.result
  } catch (error) {
    throw error
  }
}

// Tweet
export const requestCreateTweet = async (data: TweetForm) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.post(`/tweet`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    });
    return response.status
  } catch (error) {
    throw error
  }
}

export const requestGetTweets = async (signal?: AbortSignal) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.get(`/tweet?limit=5&page=1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      signal
    });
    if (response.status === 200) {
      return response.data.result as ResultTweet
    }
  } catch (error) {
    throw error
  }
}

export const requestFetchInfiniteTweets = async ({ pageParam = 1 }) => {
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

export const requestFetchInfiniteOwnerTweets = async ({ pageParam = 1 }) => {
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

export const requestFetchInfiniteTweetsByUser = async ({ pageParam, user_id }: { pageParam: number, user_id: string }) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.get(`/tweet/user/${user_id}?limit=${TWEET_LIMIT}&page=${pageParam}`, {
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

export const requestDeleteTweet = async (tweet_id: string) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.delete(`/tweet/${tweet_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    });
    return response.data
  } catch (error) {
    throw error
  }
}

export const requestFetchInfiniteLikedTweets = async ({ pageParam = 1 }) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.get(`/tweet/liked?limit=${TWEET_LIMIT}&page=${pageParam}`, {
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

export const requestFetchInfiniteBookmarkedTweets = async ({ pageParam = 1 }) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.get(`/tweet/bookmarked?limit=${TWEET_LIMIT}&page=${pageParam}`, {
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

export const requestGetTweetById = async (tweet_id: string): Promise<Tweet> => {
  const { access_token } = getToken()
  // try {
  const response = await apiInstance.get(`/tweet/${tweet_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.data) {
    throw new Error("Tweet not found");
  }

  // if (response.status === 200) {
  return response.data.result as Tweet
  // }
  // } catch (error) {
  // throw error
  // }
}

// Like/Unlike
export const requestToggleLike = async ({ tweet_id, liked, like_id }: { tweet_id: string, liked: boolean, like_id: string }) => {
  const { access_token } = getToken()
  try {
    if (liked && like_id) {
      await apiInstance.delete(`/like/${like_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
    } else {
      const res = await apiInstance.post(`/like`, {
        tweet_id
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      const like_id = res.data?.result._id
      return {
        like_id
      }
    }
    return
  } catch (error) {
    throw error
  }
}

// Bookmark/UnBokmark
export const requestToggleBookmark = async ({ tweet_id, bookmarked, bookmark_id }: { tweet_id: string, bookmarked: boolean, bookmark_id: string }) => {
  const { access_token } = getToken()
  try {
    if (bookmarked && bookmark_id) {
      await apiInstance.delete(`/bookmark/${bookmark_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
    } else {
      const res = await apiInstance.post(`/bookmark`, {
        tweet_id
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      const bookmark_id = res.data?.result._id
      return {
        bookmark_id
      }
    }
    return
  } catch (error) {
    throw error
  }
}

export const requestGetComments = async (tweet_id: string): Promise<ResultComment> => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.get(`/comment/${tweet_id}?limit=${10}&page=${1}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data as ResultComment
  } catch (error) {
    throw new Error("Comment not found");
  }
}

export const requestFetchInfiniteComments = async ({ pageParam = 1, tweet_id }: { pageParam: number, tweet_id: string }) => {
  const { access_token } = getToken()
  if (!pageParam) return
  try {
    const response = await apiInstance.get(`/comment/${tweet_id}?limit=${COMMENT_LIMIT}&page=${pageParam}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status === 200) {
      return response.data as ResultComment
    }
  } catch (error) {
    throw error
  }
};

export const requestCreateComment = async (data: CommentForm) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.post(`/comment`, {
      ...data
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    });
    return response.data.result as CommentWithReplies
  } catch (error) {
    throw error
  }
}

export const requestEditComment = async (comment_id: string, data: CommentForm) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.put(`/comment/${comment_id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    });
    return response.data
  } catch (error) {
    throw error
  }
}

export const requestDeleteComment = async (comment_id: string) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.delete(`/comment/${comment_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    });
    return response.data
  } catch (error) {
    throw error
  }
}


// Story

export const requestGetStories = async (): Promise<ResultStory> => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.get(`/story?limit=${10}&page=${1}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data as ResultStory
  } catch (error) {
    throw new Error("Comment not found");
  }
}

// Method: POST
// Story
export const requestViewStory = async (storyId: string): Promise<any> => {
  const { access_token } = getToken();
  if (!access_token) return;
  try {
    const response = await apiInstance.patch(
      `/story/${storyId}/view`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestUploadImage = async (formData: FormData): Promise<{ imageUrl: string }> => {
  const { access_token } = getToken();
  try {
    const response = await apiInstance.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestCreateStory = async (data: Mediatype) => {
  const { access_token } = getToken();
  const dataStory: MediaForm = {
    medias: {
      ...data
    }
  }
  try {
    const response = await apiInstance.post('/story/create', dataStory, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestDeleteStory = async (story_id: string) => {
  const { access_token } = getToken()
  try {
    const response = await apiInstance.delete(`/story/${story_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    });
    return response.data
  } catch (error) {
    throw error
  }
}

// Follow/UnFollow
export const requestFollow = async ({ follow_user_id }: { follow_user_id: string }) => {
  const { access_token } = getToken()
  if (!follow_user_id) return;
  try {
    const res = await apiInstance.post(`/users/follow`, {
      followed_user_id: follow_user_id
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
    return res.data.message
  } catch (error) {
    throw error
  }
}

export const requestUnFollow = async ({ follow_user_id }: { follow_user_id: string }) => {
  const { access_token } = getToken()
  if (!follow_user_id) return;
  try {
    const res = await apiInstance.delete(`/users/follow/${follow_user_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
    return res.data.message
  } catch (error) {
    throw error
  }
}


// Notification
export const requestFetchInfiniteNotifications = async ({ pageParam = 1 }: { pageParam: number }) => {
  const { access_token } = getToken()
  if (!pageParam) return
  try {
    const response = await apiInstance.get(`/notifications?limit=${12}&page=${pageParam}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status === 200) {
      return response.data as ResultNotify
    }
  } catch (error) {
    throw error
  }
};

// Chat
export const requestCreateChat = async (data: CreateChatForm) => {
  const { access_token } = getToken()
  try {
    const res = await apiInstance.post(`/chat`, {
      ...data
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
    return res.data.message
  } catch (error) {
    throw error
  }
}
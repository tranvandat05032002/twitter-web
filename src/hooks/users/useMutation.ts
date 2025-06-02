// Method: POST, PUT, DELETE,....

import { ForgotForm } from "@/app/users/find-account/page";
import { ResetPasswordForm } from "@/app/users/reset-password/page";
import { NewMessageRequestType } from "@/types/chatTypes";
import { Comment, CommentForm, EditCommentPayload } from "@/types/commentTypes";
import { Mediatype, Tweet, TweetForm } from "@/types/tweetTypes";
import {
  IToken,
  IUpdateUser,
  LoginForm,
  RegisterForm,
} from "@/types/userTypes";
import {
  requestRegister,
  requestResendEmailToken,
  requestVerifyEmail,
  requestLogIn,
  requestFetchUserReload,
  requestLogout,
  requestFindEmail,
  requestSendOTP,
  requestCheckOTP,
  requestResendOTP,
  requestResetPassword,
  requestUpdateUserProfile,
  requestGetToken,
  requestAddMessage,
  requestCreateTweet,
  requestToggleLike,
  requestCreateComment,
  requestDeleteComment,
  requestEditComment,
  requestViewStory,
  requestCreateStory,
  requestDeleteStory,
  requestToggleBookmark,
  requestFollow,
  requestUnFollow,
} from "@/utils/api/request";
import { removeEmailCookies, removeOTPToken } from "@/utils/auth/cookies";
import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegister = () =>
  useMutation({
    mutationFn: (registerInfo: RegisterForm) => requestRegister(registerInfo),
  });
export const useVerifyEmail = () =>
  useMutation({
    mutationFn: (email_token: string) => requestVerifyEmail(email_token),
  });

export const useResendEmailToken = () =>
  useMutation({
    mutationFn: () => requestResendEmailToken(),
  });
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (signinInfo: LoginForm) => requestLogIn(signinInfo),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMe"],
      });
    },
  });
};
export const useGetToken = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ access_token, refresh_token }: { access_token: string, refresh_token: string }) => requestGetToken({ access_token, refresh_token }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMe"],
      });
    },
  });
};
export const useGetUserReload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ access_token, refresh_token }: IToken) =>
      requestFetchUserReload({ access_token, refresh_token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};

export const useLogoutUser = () =>
  useMutation({
    mutationFn: () => requestLogout(),
  });

export const useFindAccountByEmail = () =>
  useMutation({
    mutationFn: (email: ForgotForm) => requestFindEmail(email),
  });

export const useSendOTP = () =>
  useMutation({
    mutationFn: (email: string) => requestSendOTP(email),
  });
export const useCheckOTP = () =>
  useMutation({
    mutationFn: (otp: string) => requestCheckOTP(otp),
    onSuccess: () => {
      removeEmailCookies();
    }
  });
export const useResendOTP = (): UseMutationResult<void, unknown, void, unknown> =>
  useMutation({
    mutationFn: () => requestResendOTP(),
  });
export const useResetPassword = () =>
  useMutation({
    mutationFn: (resetPasswordForm: ResetPasswordForm) =>
      requestResetPassword(resetPasswordForm),
  });

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userInfo: IUpdateUser) => requestUpdateUserProfile(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};
export const useAddMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newMessage: NewMessageRequestType) => requestAddMessage(newMessage),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["message", data.chat_id], exact: true })
    },
  });
}

// Tweet
export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TweetForm) => requestCreateTweet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] })
    },
  });
}

// Like/Unlike
export const useToggleLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestToggleLike,
    onSuccess: () => {
      const keysToInvalidate = ["tweets", "owner_tweets", "liked_tweets"]
      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    },
  })
}

// Bookmark/UnBookmark
export const useToggleBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestToggleBookmark,
    onSuccess: () => {
      const keysToInvalidate = ["tweets", "owner_tweets", "bookmarked_tweets"]
      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    },
  })
}

// Comment
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommentForm) => requestCreateComment(data),
    // onSuccess(data) {
    //   queryClient.invalidateQueries({ queryKey: ["comments", data.tweet_id], exact: true })
    // },
  });
}
export const useEditComment = (tweet_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ comment_id, ...data }: EditCommentPayload) =>
      requestEditComment(comment_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', tweet_id], exact: true });
    },
  });
};

export const useDeleteComment = (tweet_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment_id: string) => requestDeleteComment(comment_id),
    retry: 2,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["comments", tweet_id], exact: true })
    },
  });
}

export const useViewStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (storyId: string) => requestViewStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
    onError: (error) => {
      console.error('Error marking story as viewed:', error);
    },
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Mediatype) => requestCreateStory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] })
    },
  });
}

export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (story_id: string) => requestDeleteStory(story_id),
    retry: 2,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["stories"], exact: true })
    },
  });
}

// user_following
export const useFollow = (options?: {
  onSuccess?: (data: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestFollow,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["user_following"], exact: true })
      options?.onSuccess?.(data);
    },
  });
}

export const useUnFollow = (options?: {
  onSuccess?: (data: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestUnFollow,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["user_following"], exact: true })
      options?.onSuccess?.(data);
    },
  });
}
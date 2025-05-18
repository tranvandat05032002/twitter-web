// Method: POST, PUT, DELETE,....

import { ForgotForm } from "@/app/users/find-account/page";
import { ResetPasswordForm } from "@/app/users/reset-password/page";
import { NewMessageRequestType } from "@/types/chatTypes";
import { Comment, CommentForm } from "@/types/commentTypes";
import { Tweet, TweetForm } from "@/types/tweetTypes";
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
} from "@/utils/api/request";
import { removeEmailCookies, removeOTPToken } from "@/utils/auth/cookies";
import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

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
      queryClient.invalidateQueries({ queryKey: ["tweets"] })
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
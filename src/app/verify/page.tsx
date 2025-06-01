"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TwitterIcon } from "@/components/SingleUseComponents";
import { routers } from "@/utils/router/routers";
import { useResendEmailToken, useVerifyEmail } from "@/hooks/users/useMutation";
import { saveToken } from "@/utils/auth/cookies";
const VerifyPageComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusVerify, setStatusVerify] = React.useState<Boolean>(false);
  const { mutate: verifyEmail, data, isSuccess } = useVerifyEmail();
  const { mutate: mutateResendEmail } = useResendEmailToken();
  React.useEffect(() => {
    async function getResultVerify() {
      const email_token = searchParams.get("token");
      if (!email_token) return;
      verifyEmail(email_token);
    }
    getResultVerify();
  }, [searchParams]);
  React.useEffect(() => {
    if (isSuccess) {
      setStatusVerify(true);
    }
  }, [isSuccess]);
  const handleResendVerify = React.useCallback(async () => {
    mutateResendEmail();
  }, [mutateResendEmail]);
  const handleComeHome = () => {
    router.push(routers.homePage);
  };
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(71,74,77,0.3)] flex items-center justify-center">
      {statusVerify ? (
        <div className="bg-black p-6 rounded-lg shadow-md max-w-sm w-full text-center flex flex-col justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mx-auto h-12 w-12 text-green-500 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <p className="text-gray-200 mb-6">
            Cảm ơn bạn đã xác minh địa chỉ email.
            Tài khoản của bạn hiện đã được kích hoạt và bạn có thể bắt đầu sử dụng các dịch vụ của chúng tôi.
          </p>
          <button
            onClick={handleComeHome}
            type="button"
            className="block text-textBlue border-none outline-none"
          >
            Go to home
          </button>
        </div>
      ) : (
        <div className="bg-black p-6 rounded-lg shadow-md max-w-sm w-full">
          <div className="flex justify-center">
            <TwitterIcon size="small"></TwitterIcon>
          </div>
          {/* <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1> */}
          <p className="text-gray-200 mb-6 text-center">
            Một email đã được gửi đến địa chỉ của bạn kèm theo liên kết xác minh.
            Vui lòng nhấp vào liên kết để xác minh email của bạn.
          </p>
          <button
            onClick={handleResendVerify}
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
          >
            Gửi lại email xác minh
          </button>
          <p className="mt-4 text-center text-gray-500 text-sm">
            Bạn chưa nhận được email?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Liên hệ hỗ trợ
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default function VerifyPage() {
  return (
    <React.Suspense fallback={<div>Đang tải...</div>}>
      <VerifyPageComponent />
    </React.Suspense>
  );
}

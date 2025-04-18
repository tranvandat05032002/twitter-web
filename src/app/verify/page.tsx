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
            Thank you for verifying your email address. Your account is now
            active and you can start using our services.
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
          <p className="text-gray-200 mb-6">
            An email has been sent to your address with a verification link.
            Please click the link to verify your email.
          </p>
          <button
            onClick={handleResendVerify}
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
          >
            Resend Verification Email
          </button>
          <p className="mt-4 text-center text-gray-500 text-sm">
            Didn&apos;t receive the email?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default function VerifyPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <VerifyPageComponent />
    </React.Suspense>
  );
}

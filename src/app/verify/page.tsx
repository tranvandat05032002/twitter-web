"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/store";
import { toast } from "react-toastify";
import Link from "next/link";
import { TwitterIcon } from "@/components/SingleUseComponents";
const VerifyPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [statusVerify, setStatusVerify] = React.useState<number | null>(null);
  const router = useRouter();
  const { verifyEmailToken, resendEmailToken } = useAuth((state) => state);
  React.useEffect(() => {
    async function getResultVerify() {
      if (!token) return;
      const result = await verifyEmailToken(token);
      setStatusVerify(result?.status as number);
    }
    getResultVerify();
  }, [token, statusVerify]);
  const handleResendVerify = async () => {
    const response = await resendEmailToken();
    response?.status === 200
      ? toast.success("Email resent success!")
      : toast.error("Email resent error!");
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      {statusVerify === 200 ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mx-auto h-12 w-12 text-green-500 mb-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <p className="text-gray-600 mb-6">
            Thank you for verifying your email address. Your account is now
            active and you can start using our services.
          </p>
          <Link
            href={"/sign-in"}
            className="block text-blue-500 hover:underline"
          >
            Go to sign in
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
          <div className="flex justify-center">
            <TwitterIcon size="small"></TwitterIcon>
          </div>
          {/* <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1> */}
          <p className="text-gray-600 mb-6">
            An email has been sent to your address with a verification link.
            Please click the link to verify your email.
          </p>
          <button
            onClick={handleResendVerify}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
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

export default VerifyPage;

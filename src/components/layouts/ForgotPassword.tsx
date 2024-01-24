import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GhostButton, PrimaryButton } from "@/components/common/Button";
import { TwitterIcon } from "@/components/SingleUseComponents";
import { getEmailCookies, removeEmailCookies } from "@/utils/auth/cookies";
import { normalizeEmail } from "@/utils/handlers";
import { Radio } from "@mui/material";
import { routers } from "@/utils/router/routers";
import { useFindAccount } from "@/store/useFindAccount";
import { useSendOTP } from "@/hooks/users/useMutation";
const ForgotPasswordPage = () => {
  const router = useRouter();
  const [emailCookies, setEmailCookies] = React.useState<string>("");
  const { accountFind } = useFindAccount((state) => state);
  const { mutate: mutateSendOTP, isSuccess, isLoading } = useSendOTP();
  const handleCancelForgot = () => {
    removeEmailCookies();
    router.push(routers.signInPage);
  };
  const { email_cookies } = getEmailCookies();
  React.useEffect(() => {
    setEmailCookies(email_cookies);
  }, []);
  const handleSendToken = async () => {
    mutateSendOTP((accountFind?.email as string) || emailCookies);
  }
  React.useEffect(() => {
    if (isSuccess) {
      router.push(routers.sendOTPPage);
    }
  }, [isSuccess]);
  const email_normal = normalizeEmail(
    (accountFind?.email as string) || emailCookies
  );
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
      <div>
        <div className="text-[15px] w-[420px]">
          <h1 className="text-3xl font-semibold mb-2">
            Chúng tôi nên gửi mã xác nhận ở đâu?
          </h1>
          <p className="text-base text-textGray font-light mb-4">
            Trước khi bạn có thể thay đổi mật khẩu của mình, chúng tôi cần đảm
            bảo rằng đó thực sự là bạn.
          </p>
          <p className="text-base text-textGray font-light mb-4">
            Bắt đầu bằng cách chọn nơi gửi mã xác nhận.
          </p>

          <div className="flex justify-between items-center mb-4">
            <p>Send an email to {email_normal}</p>
            <Radio name="accept-send" checked={true} size="small" />
          </div>

          <p>
            Contact{" "}
            <Link
              href={
                "https://help.twitter.com/en/forms/account-access/regain-access"
              }
            >
              Twitter Support
            </Link>{" "}
            if you don’t have access.
          </p>
        </div>
        <div className="mt-10">
          <PrimaryButton
            className={`w-[440px] h-[52px] text-base  my-6 px-8`}
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSendToken}
          >
            Tiếp theo
          </PrimaryButton>

          <GhostButton
            className={`w-[440px] h-[52px] text-base  my-6 px-8 rounded-full`}
            type="submit"
            onClick={handleCancelForgot}
          >
            Hủy
          </GhostButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPasswordPage;

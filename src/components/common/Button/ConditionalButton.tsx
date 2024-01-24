"use-client";
import React from "react";
import { useRouter } from "next/navigation";
import { removeEmailCookies, removeOTPToken } from "@/utils/auth/cookies";
import { routers } from "@/utils/router/routers";
import { Type } from "@/types/buttonTypes";
import { PrimaryButton, GhostButton } from ".";

interface IConditionalButton {
  handleRequest?: () => void;
  value: string;
  isSubmitting?: boolean;
  canSubmit?: boolean;
  type?: Type;
}

const ConditionalButton: React.FC<IConditionalButton> = (props) => {
  const router = useRouter();
  const { handleRequest, value, canSubmit, isSubmitting, type } = props;
  const handleCancel = () => {
    removeEmailCookies();
    removeOTPToken();
    router.push(routers.signInPage);
  };
  const [nextButton, setNextButton] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!value) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }, [value]);
  return (
    <React.Fragment>
      {nextButton ? (
        <PrimaryButton
          className={`w-full py-[12px] text-base rounded-full  my-6 px-8 ${
            canSubmit ? "hover:bg-none" : ""
          }`}
          type={type as Type}
          onClick={handleRequest}
          isLoading={isSubmitting}
          disabledForm={canSubmit}
        >
          Tiếp theo
        </PrimaryButton>
      ) : (
        <GhostButton
          className={`w-full py-[12px] text-base rounded-full  my-6 px-8`}
          onClick={handleCancel}
        >
          Hủy
        </GhostButton>
      )}
    </React.Fragment>
  );
};

export default ConditionalButton;

"use-client";
import React from "react";
import { useRouter } from "next/navigation";
import { GhostButton, PrimaryButton } from "..";
import { Type } from "./Button";
import { removeEmailCookies, removeOTPToken } from "@/utils/auth/cookies";
import { Routers } from "@/utils/router/routers";

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
    router.push(Routers.signInPage);
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

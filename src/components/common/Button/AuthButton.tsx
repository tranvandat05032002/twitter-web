import { useRouter } from "next/navigation";
import type React from "react";

import { ButtonProps, Type, createButton } from "./Button";
interface ButtonProp
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className?: string;
  type?: Type;
  isLoading?: boolean;
  onClick?: () => void;
  disabledForm?: boolean;
}
const PrimaryButton = ({
  children,
  className,
  type,
  isLoading,
  onClick,
  disabledForm,
}: ButtonProp) => {
  const propsPrimary: ButtonProps = {
    children,
    className,
    type,
    isLoading,
    onClick,
    disabledForm,
  };
  const PrimaryButton = createButton(propsPrimary, "primary");
  return PrimaryButton;
};

const GhostButton = ({ children, className, type, onClick }: ButtonProp) => {
  const propsGhost: ButtonProps = {
    children,
    className,
    onClick,
    type,
  };
  const GhostButton = createButton(propsGhost, "ghost");
  return GhostButton;
};
const SecondaryButton = ({ children, className, type, onClick }: ButtonProp) => {
  const propSecondary: ButtonProps = {
    children,
    className,
    onClick,
    type,
  };
  const SecondaryButton = createButton(propSecondary, "secondary");
  return SecondaryButton;
};

const AuthButtonGoogle = ({ children }: ButtonProp) => {
  const propsGoogle: ButtonProps = {
    type: "button",
    // onClick: () => console.log("buttonAuth"),
    children,
  };
  const GoogleButton = createButton(propsGoogle, "OAuth");
  return GoogleButton;
};
const AuthButtonFacebook = ({ children }: ButtonProp) => {
  const propsFacebook: ButtonProps = {
    type: "button",
    // onClick: () => console.log("buttonAuth"),
    children,
  };
  const FacebookButton = createButton(propsFacebook, "OAuth");
  return FacebookButton;
};

const AuthButtonGithub = ({ children }: ButtonProp) => {
  const propsGithub: ButtonProps = {
    type: "button",
    // onClick: () => console.log("buttonAuth"),
    children,
  };
  const GithubButton = createButton(propsGithub, "OAuth");
  return GithubButton;
};

const AuthButtonSignOut = ({ children }: ButtonProp) => {
  const router = useRouter();
  const handleLogoutAuth = () => {
    console.log("buttonAuth");
  };
  const propsLogout: ButtonProps = {
    type: "button",
    onClick: handleLogoutAuth,
    children,
  };
  const LogoutButton = createButton(propsLogout, "logout");
  return LogoutButton;
};

export {
  PrimaryButton,
  AuthButtonFacebook,
  AuthButtonGithub,
  AuthButtonGoogle,
  AuthButtonSignOut,
  GhostButton,
  SecondaryButton
};

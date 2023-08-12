import { useRouter } from "next/navigation";
import type React from "react";

import { ButtonProps, createButton } from "./Button";

const AuthButtonGoogle = ({ children }: { children: React.ReactNode }) => {
  const propsGoogle: ButtonProps = {
    type: "button",
    // onClick: () => console.log("buttonAuth"),
    children,
  };
  const GoogleButton = createButton(propsGoogle, "OAuth");
  return GoogleButton;
};
const AuthButtonFacebook = ({ children }: { children: React.ReactNode }) => {
  const propsFacebook: ButtonProps = {
    type: "button",
    // onClick: () => console.log("buttonAuth"),
    children,
  };
  const FacebookButton = createButton(propsFacebook, "OAuth");
  return FacebookButton;
};

const AuthButtonGithub = ({ children }: { children: React.ReactNode }) => {
  const propsGithub: ButtonProps = {
    type: "button",
    // onClick: () => console.log("buttonAuth"),
    children,
  };
  const GithubButton = createButton(propsGithub, "OAuth");
  return GithubButton;
};

const AuthButtonCredentials = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  const propsCredentials: ButtonProps = {
    type: "submit",
    children,
    // isLoading,
  };
  const CredentialsButton = createButton(propsCredentials, "credentials");
  return CredentialsButton;
};

const AuthButtonSignOut = ({ children }: { children: React.ReactNode }) => {
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
  AuthButtonCredentials,
  AuthButtonFacebook,
  AuthButtonGithub,
  AuthButtonGoogle,
  AuthButtonSignOut,
};

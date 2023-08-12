import { FcGoogle } from "react-icons/fc";
import { BsApple, BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaGithub } from "react-icons/fa";
export const GoogleIcon = () => {
  return (
    <FcGoogle
      style={{
        width: "24px",
        height: "24px",
        position: "absolute",
        right: "4px",
      }}
    />
  );
};

export const AppleIcon = () => {
  return (
    <BsApple
      style={{
        width: "24px",
        height: "24px",
        margin: "0px 4px 0px 0px",
      }}
    />
  );
};

export const GithubIcon = () => {
  return <FaGithub style={{ height: "25px", width: "25px", color: "white" }} />;
};
export const FacebookIcon = () => {
  return (
    <FaFacebookF style={{ height: "25px", width: "25px", color: "#1774eb" }} />
  );
};
export const GoogleIconSignIn = () => {
  return <FcGoogle style={{ height: "25px", width: "25px" }} />;
};

export const TwitterIcon = ({size}: {size: "big" | "small"}) => {
  return size === "big" ? (
    <BsTwitter
      style={{
        width: "250px",
        height: "270px",
        color: "#1d9bf0",
      }}
    />
  ) : (
    <BsTwitter
      style={{
        width: "70px",
        height: "90px",
        color: "#1d9bf0",
      }}
    />
  );
};

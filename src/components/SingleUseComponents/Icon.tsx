import { FcGoogle } from "react-icons/fc";
import {
  BsApple,
  BsTwitter,
  BsArrowRight,
  BsPerson,
  BsThreeDots,
  BsDot,
} from "react-icons/bs";
import { BiHomeHeart, BiSearch, BiHeart } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { PiBellRinging } from "react-icons/pi";
import { IoIosStats } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import {
  HiOutlineMail,
  HiOutlineDotsCircleHorizontal,
  HiArrowUp,
} from "react-icons/hi";
import { RiFileListLine } from "react-icons/ri";
import { LiaUserFriendsSolid, LiaCalendarSolid } from "react-icons/lia";
import { RxTwitterLogo } from "react-icons/rx";
import { FaFacebookF, FaGithub, FaRetweet } from "react-icons/fa";
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

export const BsArrowRightIcon = () => {
  return (
    <BsArrowRight
      style={{
        color: "#71767b",
        width: "20px",
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

export const TwitterIcon = ({ size }: { size: "big" | "small" }) => {
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

export const TwitterIconVerySmall = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div onClick={onClick}>
      <BsTwitter
        style={{
          width: "55px",
          height: "42px",
          color: "#1d9bf0",
        }}
      />
    </div>
  );
};

export const HomeIcon = () => {
  return (
    <BiHomeHeart
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};
export const SearchIcon = () => {
  return (
    <BiSearch
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};
export const NotificationIcon = () => {
  return (
    <PiBellRinging
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};
export const MessageIcon = () => {
  return (
    <HiOutlineMail
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};
export const ListIcon = () => {
  return (
    <RiFileListLine
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};
export const CommunityIcon = () => {
  return (
    <LiaUserFriendsSolid
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};
export const VerifiedIcon = () => {
  return (
    <RxTwitterLogo
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};
export const ProfileIcon = () => {
  return (
    <BsPerson
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};

export const MoreIcon = () => {
  return (
    <HiOutlineDotsCircleHorizontal
      style={{
        width: "45px",
        height: "33px",
        marginRight: "12px",
        fontWeight: 300,
      }}
    />
  );
};
export const DotsIcon = ({ className }: { className?: string }) => {
  return <BsThreeDots className={`w-[19px] h-[19px] ${className}`} />;
};
export const CalendarIcon = () => {
  return (
    <LiaCalendarSolid
      style={{
        width: "18px",
        height: "18px",
        fontWeight: 300,
        marginRight: "5px",
      }}
    />
  );
};

export const DotIcon = ({ style }: { style?: Object }) => {
  return (
    <BsDot
      style={{
        width: "10px",
        height: "10px",
        fontWeight: 300,
        ...style,
      }}
    />
  );
};

export const CommentIcon = ({ className }: { className?: string }) => {
  return <TbMessageCircle className={`w-[19px] h-[19px] ${className}`} />;
};
export const HeartIcon = ({ className }: { className?: string }) => {
  return <BiHeart className={`w-[19px] h-[19px] ${className}`} />;
};
export const RetWeetIcon = ({ className }: { className?: string }) => {
  return <FaRetweet className={`w-[19px] h-[19px] ${className}`} />;
};
export const StatsIcon = ({ className }: { className?: string }) => {
  return <IoIosStats className={`w-[19px] h-[19px] ${className}`} />;
};
export const ShareIcon = ({ className }: { className?: string }) => {
  return <LuShare className={`w-[19px] h-[19px] ${className}`} />;
};

import { FcGoogle } from "react-icons/fc";
import {
  BsApple,
  BsTwitter,
  BsArrowRight,
  BsPerson,
  BsThreeDots,
  BsDot,
  BsArrowLeft,
} from "react-icons/bs";
import { BiHomeHeart, BiSearch, BiHeart } from "react-icons/bi";
import { TbCameraPlus, TbMessageCircle } from "react-icons/tb";
import { PiBellRinging } from "react-icons/pi";
import { IoIosStats } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import {
  HiOutlineMail,
  HiOutlineDotsCircleHorizontal,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { RiFileListLine } from "react-icons/ri";
import { LiaUserFriendsSolid, LiaCalendarSolid } from "react-icons/lia";
import { RxTwitterLogo } from "react-icons/rx";
import { FaFacebookF, FaGithub, FaRetweet } from "react-icons/fa";
import { useEvent } from "@/store/useEven";
interface IIcon {
  size?: "big" | "small";
  className?: string;
  style?: Object;
  onClick?: () => void;
}
export const GoogleIcon: React.FC<IIcon> = () => {
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

export const BsArrowRightIcon: React.FC<IIcon> = () => {
  return (
    <BsArrowRight
      style={{
        color: "#71767b",
        width: "20px",
      }}
    />
  );
};

export const AppleIcon: React.FC<IIcon> = () => {
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

export const GithubIcon: React.FC<IIcon> = () => {
  return <FaGithub style={{ height: "25px", width: "25px", color: "white" }} />;
};
export const FacebookIcon: React.FC<IIcon> = () => {
  return (
    <FaFacebookF style={{ height: "25px", width: "25px", color: "#1774eb" }} />
  );
};
export const GoogleIconSignIn: React.FC<IIcon> = () => {
  return <FcGoogle style={{ height: "25px", width: "25px" }} />;
};

export const TwitterIcon: React.FC<IIcon> = (props) => {
  const { size } = props;
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

export const TwitterIconVerySmall: React.FC<IIcon> = (props) => {
  const { onClick } = props;
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

export const HomeIcon: React.FC<IIcon> = () => {
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
export const SearchIcon: React.FC<IIcon> = () => {
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
export const NotificationIcon: React.FC<IIcon> = () => {
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
export const MessageIcon: React.FC<IIcon> = () => {
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
export const ListIcon: React.FC<IIcon> = () => {
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
export const CommunityIcon: React.FC<IIcon> = () => {
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
export const VerifiedIcon: React.FC<IIcon> = () => {
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
export const ProfileIcon: React.FC<IIcon> = () => {
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

export const MoreIcon: React.FC<IIcon> = () => {
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
export const DotsIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return <BsThreeDots className={`w-[19px] h-[19px] ${className}`} />;
};
export const CalendarIcon: React.FC<IIcon> = () => {
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

export const DotIcon: React.FC<IIcon> = (props) => {
  const { style } = props;
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

export const CommentIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return <TbMessageCircle className={`w-[19px] h-[19px] ${className}`} />;
};
export const HeartIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return <BiHeart className={`w-[19px] h-[19px] ${className}`} />;
};
export const RetWeetIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return <FaRetweet className={`w-[19px] h-[19px] ${className}`} />;
};
export const StatsIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return <IoIosStats className={`w-[19px] h-[19px] ${className}`} />;
};
export const ShareIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return <LuShare className={`w-[19px] h-[19px] ${className}`} />;
};

export const BackIcon: React.FC<IIcon> = (props) => {
  const { className, onClick } = props;
  return (
    <BsArrowLeft
      onClick={onClick}
      className={`w-[19px] h-[19px] ${className}`}
    />
  );
};
export const CloseIcon: React.FC<IIcon> = (props) => {
  const { setShowModal } = useEvent((state) => state);
  const handleClose = () => {
    setShowModal(false);
  };
  const { className } = props;
  return (
    <MdClose
      onClick={handleClose}
      className={`w-[19px] h-[19px] ${className}`}
    ></MdClose>
  );
};
export const CameraPlusIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return (
    <TbCameraPlus className={`w-[19px] h-[19px] ${className}`}></TbCameraPlus>
  );
};
export const LocationIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return (
    <HiOutlineLocationMarker className={`w-[19px] h-[19px] ${className}`}></HiOutlineLocationMarker>
  );
};
export const LinkIcon: React.FC<IIcon> = (props) => {
  const { className } = props;
  return (
    <AiOutlineLink className={`w-[19px] h-[19px] ${className}`}></AiOutlineLink>
  );
};

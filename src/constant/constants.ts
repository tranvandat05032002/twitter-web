import {
  HomeIcon,
  ListIcon,
  MessageIcon,
  SearchIcon,
  VerifiedIcon,
  NotificationIcon,
  CommunityIcon,
  ClaudeIcon,
} from "../components/SingleUseComponents/Icon";
export const NAVIGATION_ITEMS = [
  {
    title: "Trang chủ",
    titleEng: "Home",
    icon: HomeIcon,
    href: "/home",
  },
  {
    title: "Tìm kiếm",
    titleEng: "Explore",
    icon: SearchIcon,
    href: "/explore",
  },
  {
    title: "Thông báo",
    titleEng: "Notifications",
    icon: NotificationIcon,
    href: "/notifications",
  },
  {
    title: "Nhắn tin",
    titleEng: "Message",
    icon: MessageIcon,
    href: "/messages",
  },
  // {
  //   title: "Lists",
  //   icon: ListIcon,
  //   href: "/datdev0503/lists",
  // },
  {
    title: "Chat cùng AI",
    icon: ClaudeIcon,
    href: "/chat/ai/chatbot",
  },
  {
    title: "Cộng đồng",
    icon: CommunityIcon,
    href: "/datdev0503/communities",
  },
  {
    title: "Xác thực",
    icon: VerifiedIcon,
    href: "/verified-choose",
  },
];
export const EXPLORE_ITEMS = [
  {
    id: 1,
    title: "Tất cả",
    mode: "all"
  },
  {
    id: 2,
    title: "Đang theo dõi",
    mode: "following"
  }
]

export const NOTIFY_ITEMS = [
  {
    id: 1,
    title: "Đã xem",
    mode: "seen"
  },
  {
    id: 2,
    title: "Chưa xem",
    mode: "not_seen"
  }
]

export const DEFAULT_IMAGE = "/image/default-image.jpg"
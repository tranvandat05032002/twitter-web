import {
  HomeIcon,
  ListIcon,
  MessageIcon,
  SearchIcon,
  VerifiedIcon,
  NotificationIcon,
  CommunityIcon,
} from "../components/SingleUseComponents/Icon";
export const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: HomeIcon,
    href: "/home",
  },
  {
    title: "Explore",
    icon: SearchIcon,
    href: "/explore",
  },
  {
    title: "Notifications",
    icon: NotificationIcon,
    href: "/notifications",
  },
  {
    title: "Message",
    icon: MessageIcon,
    href: "/messages",
  },
  // {
  //   title: "Lists",
  //   icon: ListIcon,
  //   href: "/datdev0503/lists",
  // },
  {
    title: "Ngrok",
    icon: ListIcon,
    href: "/chat/ai/ngrok",
  },
  {
    title: "Communities",
    icon: CommunityIcon,
    href: "/datdev0503/communities",
  },
  {
    title: "Verified",
    icon: VerifiedIcon,
    href: "/verified-choose",
  },
];
export const EXPLORE_ITEMS = [
  {
    id: 1,
    title: "All",
    mode: "all"
  },
  {
    id: 2,
    title: "Following",
    mode: "following"
  }
]

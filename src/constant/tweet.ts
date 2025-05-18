import { FaUserFriends, FaUserLock } from "react-icons/fa"
import { TiWorld } from "react-icons/ti"

export const HASHTAG_REGEX = /#[\wÀ-ỹ\d_]+/g
export const MENTION_REGEX = /@[\w\d_]+/g
export const HASHTAG_MENTION_REGEX = /(@[\w\d_]+|#[\wÀ-ỹ\d_]+)/g

export const optionsArea = [
    { id: 0, label: 'Công khai', value: "public", icon: TiWorld },
    { id: 1, label: 'Bạn bè', value: "friend", icon: FaUserFriends },
    { id: 2, label: 'Chỉ mình tôi', value: "private", icon: FaUserLock },
]

export const TWEET_LIMIT = 5;
export const COMMENT_LIMIT = 10;
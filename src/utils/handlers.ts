import { IOAuthGoogle } from "@/types/userTypes";
import { differenceInDays, differenceInMinutes, format, formatISO, isThisWeek, isToday, isValid, isYesterday, parse } from "date-fns";
import { vi } from 'date-fns/locale';
import { getToken } from "./auth/cookies";
import { v4 as uuidv4 } from "uuid"
import { apiInstance } from "./api";
import { Mediatype } from "@/types/tweetTypes";
import { HASHTAG_REGEX, MENTION_REGEX } from "@/constant/tweet";
export function isObjectEmpty(obj: Object): boolean {
  if (Object.values(obj).every((value) => value !== "")) {
    return false;
  }
  return true;
}

export function formatISO8601(
  month: string | number,
  day: string | number,
  year: string | number
) {
  if (!day || !month || !year) return;
  const formattedDate = `${month}/${day}/${year}`;
  const parsedDate = parse(formattedDate, "MM/dd/yyyy", new Date());
  const isoDate = formatISO(parsedDate);
  return isoDate;
}
export function formatMonthYear(date: string) {
  if (!date) return;
  const inputDate = new Date(date);
  const formattedDate = format(inputDate, "MMMM/yyyy");
  const formattedDateResults = formattedDate.replace("/", " ");
  return formattedDateResults;
}
export function formatMonthDayYear(date: string) {
  if (!date) return;
  const inputDate = new Date(date);
  const formattedDate = format(inputDate, "MMMM/d, yyyy");
  const formattedDateResults = formattedDate.replace("/", " ");
  return formattedDateResults;
}
export function normalizeEmail(email: string) {
  if (!email) return;
  let excludedPart = email.substring(0, 2);
  let remainingPart = email.substring(2);
  let outputString = email.replace(/[^@]/g, "*");
  let finalOutput = excludedPart + outputString;
  return finalOutput;
}
export const getGoogleAuthUrl = () => {
  const query: IOAuthGoogle = {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" ") as string,
    prompt: "consent",
    access_type: "offline",
  };
  const queryString = new URLSearchParams();
  queryString.append("client_id", query.client_id);
  queryString.append("redirect_uri", query.redirect_uri);
  queryString.append("response_type", query.response_type);
  queryString.append("scope", query.scope);
  queryString.append("prompt", query.prompt);
  queryString.append("access_type", query.access_type);

  return `${process.env.NEXT_PUBLIC_GOOGLE_URL}?${queryString.toString()}`;
};

export const uploadImageToS3 = async (file: File, key: string, type: string) => {
  const { access_token } = getToken();
  if (file) {
    const formData = new FormData();
    const imageFullName = uuidv4() + '.' + file?.name.split('.')?.pop()
    formData.append(key, file as File, imageFullName);
    try {
      const response = await apiInstance.post(
        `/medias/upload-image/${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      if (response.status === 200) {
        console.log("URLS3: ", response.data.result[0].url)
        const media: Mediatype = {
          url: response.data.result[0].url as string,
          type: response.data.result[0].type as number
        }
        return media
      }
    } catch (error) {
      throw error
    }
  }
}
export const decodedUsername = (username: string) => {
  const decodedURL = decodeURIComponent(username);
  const usernameDecoded = decodedURL.startsWith("@")
    ? `/${decodedURL}`
    : `/@${decodedURL}`;
  return usernameDecoded;
}
// Get time of day
const getTimeOfDay = (date: Date): string => {
  const hours = date.getHours();
  switch (true) {
    case hours >= 0 && hours < 12:
      return 'sáng';
    default:
      return 'chiều';
  }
}
// Format message time
export const formatMessageTime = (date: Date): string => {
  // is valid date 
  if (!isValid(date)) {
    return "Invalid date";
  }
  else {
    // If the message was sent today, display HH:mm
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    // If the message was sent yesterday, display "Yesterday HH:mm"
    if (isYesterday(date)) {
      return `Hôm qua ${format(date, 'HH:mm')} ${getTimeOfDay(date)}`
    }
    // If the message was sent this week, display "Day HH:mm"
    if (isThisWeek(date)) {
      return `${format(date, 'EEEE HH:mm', { locale: vi })} ${getTimeOfDay(date)}`;
    }
    // If the message was sent more than a week ago, display HH:mm dd:MM:yyyy
    const formattedDate = format(date, 'HH:mm dd')
    const month = format(date, 'MM')
    const year = format(date, 'yyyy')
    return `${formattedDate} Tháng ${month}, ${year}`;
  }
}


export const formatTweetTime = (date: Date): string => {
  // Kiểm tra xem có phải là ngày hợp lệ không
  if (!isValid(date)) {
    return "Invalid date";
  } else {
    const minutesDifference = differenceInMinutes(new Date(), date);
    const daysDifference = differenceInDays(new Date(), date);

    // Nếu tin nhắn được gửi trong vòng 1 phút, hiển thị "Vừa xong"
    if (minutesDifference < 1) {
      return "Vừa xong";
    }
    // Nếu tin nhắn được gửi trong vòng 1 giờ, hiển thị số phút
    if (minutesDifference < 60) {
      return `${minutesDifference} phút trước`;
    }
    // Nếu tin nhắn được gửi hôm nay, hiển thị HH:mm
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    // Nếu tin nhắn được gửi hôm qua, hiển thị "Hôm qua"
    if (isYesterday(date)) {
      return `Hôm qua`;
    }
    // Nếu tin nhắn được gửi trong tuần này
    if (isThisWeek(date)) {
      if (daysDifference >= 2 && daysDifference <= 7) {
        return `${daysDifference} ngày trước`;
      }
    }
    // Nếu tin nhắn được gửi hơn một tuần trước, hiển thị dd/MM/yyyy
    return format(date, 'dd/MM/yyyy', { locale: vi });
  }
}

/**
 * Trích xuất tất cả hashtag từ content
 * @param content - chuỗi nội dung
 * @returns danh sách hashtag không trùng lặp
 */
export const extractHashtags = (content: string): string[] => {
  const matches = content.match(HASHTAG_REGEX) || []
  return [...new Set(matches)]
}

/**
 * Trích xuất tất cả mentions từ content
 * @param content - chuỗi nội dung
 * @returns danh sách mentions không trùng lặp
 */
export const extractMentios = (content: string): string[] => {
  const matches = content.match(MENTION_REGEX) || []
  return [...new Set(matches)]
}
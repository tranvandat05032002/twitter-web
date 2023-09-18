import { IOAuthGoogle } from "@/types/userTypes";
import { format, formatISO, parse } from "date-fns";
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

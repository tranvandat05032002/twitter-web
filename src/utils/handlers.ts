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
export function normalizeEmail(email: string) {
  if (!email) return;
  let excludedPart = email.substring(0, 2);
  let remainingPart = email.substring(2);
  let outputString = email.replace(/[^@]/g, "*");
  let finalOutput = excludedPart + outputString;
  return finalOutput;
}

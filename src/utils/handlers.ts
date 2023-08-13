export function isObjectEmpty(obj: Object): boolean {
  if (Object.values(obj).every((value) => value !== "")) {
    return false;
  }
  return true;
}

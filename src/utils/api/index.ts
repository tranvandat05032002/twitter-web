import useRefreshToken from "@/hooks/useRefreshToken";
import axios from "axios";
import { getToken } from "../auth/cookies";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORT as string,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
// use interceptor --> BE
export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORT_AXIOS as string,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

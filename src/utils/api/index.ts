import axios from "axios";
export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORT_AXIOS as string,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

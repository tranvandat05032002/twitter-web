import axios from "axios";
export const apiInstance = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

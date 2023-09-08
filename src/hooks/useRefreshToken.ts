import { useAuth } from "@/store";
import { apiInstance } from "../utils/api/index";
import { getToken, saveToken } from "@/utils/auth/cookies";
import { useCallback } from "react";
async function refreshToken() {
  const { refresh_token } = getToken();
  if (!refresh_token) return null;
  const response = await apiInstance.post("/users/refresh-token", {
    "Content-Type": "Application/json",
    refresh_token: refresh_token,
  });
  if (!response.data) return null;
  const new_access_token = response?.data?.result?.access_token as string;
  const new_refresh_token = response?.data?.result?.refresh_token as string;
  saveToken({
    access_token: new_access_token,
    refresh_token: new_refresh_token,
  });
  useAuth.getState().updateUserAndToken({
    access_token: new_access_token,
  });

  return response?.data?.result?.access_token || "";
}
export default function useRefreshToken() {
  const refresh = useCallback(refreshToken, []);
  return refresh;
}

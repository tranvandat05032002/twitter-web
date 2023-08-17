import { useAuth } from "@/store";
import { apiInstance } from "@/utils/api";
import { getToken, saveToken } from "@/utils/auth/cookies";

export default function useRefreshToken() {
  async function refresh() {
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
        userData: response?.data?.result?.user,
        token: new_access_token as string
    })

    return response?.data?.result?.access_token || ""
  }
  return refresh
}

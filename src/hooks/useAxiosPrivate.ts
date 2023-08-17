import { useAuth } from "@/store";
import useRefreshToken from "./useRefreshToken";
import React from "react";
import { apiInstance } from "@/utils/api";

export default function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { access_token } = useAuth((state) => state);
  React.useEffect(() => {
    const requestInterceptor = apiInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      apiInstance.interceptors.request.eject(requestInterceptor);
      apiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [access_token, refresh]);
  return apiInstance;
}

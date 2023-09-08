// import useRefreshToken from "./useRefreshToken";
// import React, { useState } from "react";
// import { apiInstance } from "@/utils/api";
// import { getToken } from "@/utils/auth/cookies";

// export default function useAxiosPrivate() {
//   const refresh = useRefreshToken();
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const { access_token } = getToken(); // change to acceess_token of useAuth
//   console.log(access_token);
//   React.useEffect(() => {
//     if (!access_token) return;
//     const requestInterceptor = apiInstance.interceptors.request.use(
//       (config) => {
//         if (!config.headers["Authorization"]) {
//           config.headers["Authorization"] = `Bearer ${access_token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );
//     const responseInterceptor = apiInstance.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error.config;
//         if (
//           (error?.response?.status === 401 ||
//             error?.response?.status === 404) &&
//           // !prevRequest.sent
//           !isRefreshing
//         ) {
//           // prevRequest.sent = true;
//           setIsRefreshing(true);
//           const newAccessToken = await refresh();
//           setIsRefreshing(false);
//           if (newAccessToken) {
//             // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//             error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
//             return apiInstance(prevRequest);
//           }
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       apiInstance.interceptors.request.eject(requestInterceptor);
//       apiInstance.interceptors.response.eject(responseInterceptor);
//     };
//   }, [refresh, isRefreshing, access_token]);
//   return apiInstance;
// }

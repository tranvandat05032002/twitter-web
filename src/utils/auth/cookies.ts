import Cookies from "js-cookie";
const accessTokenKey = "twitter_access_token";
const refreshTokenKey = "twitter_refresh_token";
const otpTokenKey = "twitter_otp_token";
const objTokenCookies = {
  expires: 30,
  domain: "localhost", // set env
};
const objOTPCookies = {
  expires: 5,
  domain: "localhost",
};
interface IToken {
  access_token: string;
  refresh_token: string;
}
export const saveToken = ({ access_token, refresh_token }: IToken) => {
  if (access_token && refresh_token) {
    Cookies.set(accessTokenKey, access_token, {
      ...objTokenCookies,
      // secure: true, --> set with device https
    });
    Cookies.set(refreshTokenKey, refresh_token, {
      ...objTokenCookies,
    });
  } else {
    Cookies.remove(accessTokenKey, {
      ...objTokenCookies,
      path: "/",
      domain: "localhost", // set env
    });
    Cookies.remove(refreshTokenKey, {
      ...objTokenCookies,
      path: "/",
      domain: "localhost",
    });
  }
};
export const saveOTP = ({ otp_token }: { otp_token: string }) => {
  if (otp_token) {
    Cookies.set(otpTokenKey, otp_token, {
      ...objOTPCookies,
    });
  } else {
    Cookies.remove(otpTokenKey, {
      ...objOTPCookies,
      path: "/",
      domain: "localhost",
    });
  }
};
export const getToken = () => {
  const access_token = Cookies.get(accessTokenKey);
  const refresh_token = Cookies.get(refreshTokenKey);
  return {
    access_token,
    refresh_token,
  };
};
export const getOTPToken = () => {
  const otp_token = Cookies.get(otpTokenKey);
  return {
    otp_token,
  };
};
export const logOutCookies = () => {
  const access_token = Cookies.get(accessTokenKey);
  if (access_token) {
    Cookies.remove(accessTokenKey, {
      ...objTokenCookies,
      path: "/",
      domain: "localhost",
    });
    Cookies.remove(refreshTokenKey, {
      ...objTokenCookies,
      path: "/",
      domain: "localhost",
    });
  }
};

import Cookies from "js-cookie";
const accessTokenKey = "twitter_access_token";
const refreshTokenKey = "twitter_refresh_token";
const objCookies = {
  expires: 30,
  domain: "localhost", // set env
};
interface IToken {
  access_token: string;
  refresh_token: string;
}
export const saveToken = ({ access_token, refresh_token }: IToken) => {
  if (access_token && refresh_token) {
    Cookies.set(accessTokenKey, access_token, {
      ...objCookies,
      // secure: true, --> set with device https
    });
    Cookies.set(refreshTokenKey, refresh_token, {
      ...objCookies,
    });
  } else {
    Cookies.remove(accessTokenKey, {
      ...objCookies,
      path: "/",
      domain: "localhost", // set env
    });
    Cookies.remove(refreshTokenKey, {
      ...objCookies,
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

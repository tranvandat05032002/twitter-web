import Cookies from "js-cookie";

const objTokenCookies = {
  expires: 30,
  domain: process.env.NEXT_PUBLIC_DOMAIN as string,
};

const objOTPCookies = {
  expires: 5,
  domain: process.env.NEXT_PUBLIC_DOMAIN as string,
};

interface IToken {
  access_token: string;
  refresh_token: string;
}

export const saveToken = ({ access_token, refresh_token }: IToken) => {
  if (access_token && refresh_token) {
    Cookies.set(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
      access_token,
      {
        ...objTokenCookies,
        // secure: true, --> set with device https
      }
    );
    Cookies.set(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
      refresh_token,
      {
        ...objTokenCookies,
      }
    );
  } else {
    Cookies.remove(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string, {
      ...objTokenCookies,
      path: process.env.NEXT_PUBLIC_TOKEN_PATH as string,
      domain: process.env.NEXT_PUBLIC_DOMAIN as string,
    });
    Cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string, {
      ...objTokenCookies,
      path: process.env.NEXT_PUBLIC_TOKEN_PATH as string,
      domain: process.env.NEXT_PUBLIC_DOMAIN as string,
    });
  }
};

export const saveOTP = ({ otp_token }: { otp_token: string }) => {
  if (otp_token) {
    Cookies.set(process.env.NEXT_PUBLIC_OTP_TOKEN_KEY as string, otp_token, {
      ...objOTPCookies,
    });
  } else {
    Cookies.remove(process.env.NEXT_PUBLIC_OTP_TOKEN_KEY as string, {
      ...objOTPCookies,
      path: process.env.NEXT_PUBLIC_TOKEN_PATH as string,
      domain: process.env.NEXT_PUBLIC_DOMAIN as string,
    });
  }
};

export const getToken = () => {
  const access_token = Cookies.get(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string
  );
  const refresh_token = Cookies.get(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string
  );
  return {
    access_token,
    refresh_token,
  };
};

export const getOTPToken = () => {
  const otp_token = Cookies.get(
    process.env.NEXT_PUBLIC_OTP_TOKEN_KEY as string
  );
  return {
    otp_token,
  };
};

export const removeOTPToken = () => {
  Cookies.remove(process.env.NEXT_PUBLIC_OTP_TOKEN_KEY as string, {
    path: process.env.NEXT_PUBLIC_TOKEN_PATH as string,
    domain: process.env.NEXT_PUBLIC_DOMAIN as string,
  });
};

export const logOutCookies = () => {
  const access_token = Cookies.get(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string
  );
  if (access_token) {
    Cookies.remove(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string, {
      ...objTokenCookies,
      path: process.env.NEXT_PUBLIC_TOKEN_PATH as string,
      domain: process.env.NEXT_PUBLIC_DOMAIN as string,
    });
    Cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string, {
      ...objTokenCookies,
      path: process.env.NEXT_PUBLIC_TOKEN_PATH as string,
      domain: process.env.NEXT_PUBLIC_DOMAIN as string,
    });
  }
};

// handle Email
export const saveEmailCookies = (email: string) => {
  if (email) {
    Cookies.set(process.env.NEXT_PUBLIC_EMAIL_KEY as string, email, {
      path: process.env.NEXT_PUBLIC_RESET_PASSWORD_PATH as string,
      domain: process.env.NEXT_PUBLIC_DOMAIN as string,
    });
  } else {
    Cookies.remove(process.env.NEXT_PUBLIC_EMAIL_KEY as string, {
      path: process.env.NEXT_PUBLIC_RESET_PASSWORD_PATH as string,
      domain: process.env.NEXT_PUBLIC_DOMAIN as string,
    });
  }
};

export const removeEmailCookies = () => {
  Cookies.remove(process.env.NEXT_PUBLIC_EMAIL_KEY as string, {
    path: process.env.NEXT_PUBLIC_RESET_PASSWORD_PATH as string,
    domain: process.env.NEXT_PUBLIC_DOMAIN as string,
  });
};

export const getEmailCookies = () => {
  const email_cookies = Cookies.get(
    process.env.NEXT_PUBLIC_EMAIL_KEY as string
  );
  return {
    email_cookies: email_cookies as string,
  };
};

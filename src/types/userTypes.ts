export type LoginForm = {
  email: string;
  password: string;
};
export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
};

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  date_of_birth: Date;
  created_at?: Date;
  updated_at?: Date;
  verify?: number;
  bio?: string;
  location?: string;
  website?: string;
  username?: string;
  avatar?: string;
  cover_photo?: string;
}

export interface IUpdateUser {
  name?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  location?: string;
  date_of_birth?: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}
export interface IOTP {
  jwtToken?: string
  otp?: string
}
export type TRequestToken<T> = {
  result: T;
};
type User<T> = {
  user: T;
};
export type TRequestUser<P> = {
  result: User<P>;
  user: IUser;

};

export type TRequestProfile<P> = {
  result: P;
}

export interface IOAuthGoogle {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  prompt: string;
  access_type: string
}
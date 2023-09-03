export type LoginForm = {
  email: string;
  password: string;
};
export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  date_of_birth?: string;
};

// export interface IUser {
//   userName: string;
//   email: string;
//   image: string;
//   accessToken: string;
//   id: string;
// }
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

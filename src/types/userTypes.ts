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

export interface IUser {
  userName: string;
  email: string;
  image: string;
  accessToken: string;
  id: string;
}

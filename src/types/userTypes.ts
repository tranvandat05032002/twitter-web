export type LoginForm = {
  email: string;
  password: string;
};
export type RegisterForm = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date;
};

export interface IUser {
  userName: string;
  email: string;
  image: string;
  accessToken: string;
  id: string;
}

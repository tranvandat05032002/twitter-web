export type LoginForm = {
  email: string;
  password: string;
};
export type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth?: Date 
  };
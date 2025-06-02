import { UrlObject } from "url";

export type Type = "submit" | "reset" | "button";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: Type;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  link?: boolean;
  href?: string | UrlObject;
  disabledForm?: boolean;
}
export interface ButtonProp
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className?: string;
  type?: Type;
  isLoading?: boolean;
  onClick?: () => void;
  disabledForm?: boolean;
}
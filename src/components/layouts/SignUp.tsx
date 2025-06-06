import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import {
  ERROR_FORM_MESSAGES,
  ErrorMessage,
  Input,
} from "@/components/common";
import { DateOfBirth, TwitterIcon } from "@/components/SingleUseComponents";
import { useDateStore } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { RegisterForm } from "@/types/userTypes";
import { isObjectEmpty, formatISO8601 } from "@/utils/handlers";
import { routers } from "@/utils/router/routers";
import { useRegister } from "@/hooks/users/useMutation";
import { PrimaryButton } from "../common/Button";
const schemaValidator = yup.object().shape({
  name: yup.string().required(ERROR_FORM_MESSAGES.userNameRequired),
  email: yup
    .string()
    .required(ERROR_FORM_MESSAGES.emailRequired)
    .email(ERROR_FORM_MESSAGES.isEmail),
  password: yup
    .string()
    .required(ERROR_FORM_MESSAGES.passwordRequired)
    .min(6, ERROR_FORM_MESSAGES.minPasswordLength),
  confirm_password: yup
    .string()
    .required(ERROR_FORM_MESSAGES.passwordRequired)
    .min(6, ERROR_FORM_MESSAGES.minPasswordLength)
    .oneOf([yup.ref("password")], ERROR_FORM_MESSAGES.passwordMatch),
  date_of_birth: yup.string().required(ERROR_FORM_MESSAGES.dateOfBirthRequired),
});
const SignUpPage = () => {
  const date = new Date();
  const lastYear = date.getFullYear();
  const dayItem = generateMenuItems({ start: 1, end: 31 });
  const monthItem = generateMenuItems({ start: 1, end: 12, month: true });
  const yearItem = generateMenuItems({
    start: 1903,
    end: lastYear,
    ascending: false,
  });
  const router = useRouter();
  const { mutate: mutateRegister, data, isLoading, isSuccess } = useRegister();
  const { day, month, year, setDay, setMonth, setYear } = useDateStore(
    (state) => state
  );
  const handleChangeMonth = (event: SelectChangeEvent<unknown>) => {
    setMonth(event.target.value as string | number);
  };
  const handleChangeDay = (event: SelectChangeEvent<unknown>) => {
    setDay(event.target.value as string | number);
  };
  const handleChangeYear = (event: SelectChangeEvent<unknown>) => {
    setYear(event.target.value as string | number);
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schemaValidator),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
      date_of_birth: "",
    },
  });
  React.useEffect(() => {
    if (day && month && year) {
      const isoDate = formatISO8601(month, day, year);
      setValue("date_of_birth", isoDate as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month, year]);
  const handleRegister = React.useCallback(async (values: RegisterForm) => {
    if (isObjectEmpty(values)) return;
    mutateRegister(values as RegisterForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (isSuccess) {
      router.push(routers.verifyPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <TwitterIcon size="small"></TwitterIcon>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} autoComplete="off">
        <div>
          <h1 className="text-center text-3xl font-bold pb-5">Đăng Ký Tài Khoản</h1>
        </div>
        <div className="py-[13px]">
          <Input
            placeholder="Tên"
            type="text"
            name="name"
            control={control}
          ></Input>
          {errors && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
        </div>
        <div className="py-[13px]">
          <Input
            placeholder="Email"
            type="email"
            name="email"
            control={control}
          ></Input>
          {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
        </div>
        <div className="py-[13px]">
          <Input
            placeholder="Mật khẩu"
            type="password"
            name="password"
            control={control}
          ></Input>
          {errors && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
        </div>
        <div className="py-[13px]">
          <Input
            placeholder="Nhập lại mật khẩu"
            type="text"
            name="confirm_password"
            control={control}
          ></Input>
          {errors && (
            <ErrorMessage>{errors.confirm_password?.message}</ErrorMessage>
          )}
        </div>
        <div>
          <DateOfBirth
            day={day}
            month={month}
            year={year}
            dayItem={dayItem}
            monthItem={monthItem}
            yearItem={yearItem}
            handleChangeDay={handleChangeDay}
            handleChangeYear={handleChangeYear}
            handleChangeMonth={handleChangeMonth}
          ></DateOfBirth>
        </div>
        <div className="text-xs">
          <span>Bạn đã có tài khoản? </span>
          <Link href={routers.signInPage} className="text-textBlue">
            Đăng nhập ngay
          </Link>
        </div>

        <PrimaryButton
          className="w-[440px] h-[52px] text-base  my-6 px-8"
          type="submit"
          isLoading={isLoading}
          disabledForm={isLoading}
        >
          Tạo tài khoản
        </PrimaryButton>
      </form>
    </React.Fragment>
  );
};

export default SignUpPage;

export const generateMenuItems = ({
  start,
  end,
  ascending = true,
  month = false,
}: {
  start: number;
  end: number;
  ascending?: boolean;
  month?: boolean;
}) => {
  const items = [];
  if (ascending) {
    for (let i = start; i <= end; i++) {
      items.push(
        <MenuItem key={i} value={i}>
          {month ? `Thang ${i}` : i}
        </MenuItem>
      );
    }
  } else {
    for (let i = end; i >= start; i--) {
      items.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
  }
  return items;
};

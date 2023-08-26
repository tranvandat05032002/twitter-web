import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import {
  ERROR_FORM_MESSAGES,
  ErrorMessage,
  Input,
  PrimaryButton,
} from "@/components/common";
import { DateOfBirth } from "@/components/SingleUseComponents";
import { useDateStore, useAuth } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { RegisterForm } from "@/types/userTypes";
import { isObjectEmpty, formatISO8601 } from "@/utils/handlers";
import { Routers } from "@/utils/router/routers";
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
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const router = useRouter();
  const { day, month, year, setDay, setMonth, setYear, setISO8601 } =
    useDateStore((state) => state);
  const { register } = useAuth((state) => state);
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
    getValues,
    setValue,
    formState: { errors, isValid, isSubmitting },
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
    context: { canSubmit },
  });
  React.useEffect(() => {
    if (day && month && year) {
      const isoDate = formatISO8601(month, day, year);
      setValue("date_of_birth", isoDate as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month, year]);
  React.useEffect(() => {
    if (isObjectEmpty(getValues())) {
      setCanSubmit(true);
    }
    setCanSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit]);
  const handleRegister = async (values: RegisterForm) => {
    if (isObjectEmpty(values)) return;
    try {
      const result = await register(values);
      if (result?.status === 200) {
        router.push(Routers.verifyPage);
      }
    } catch (error) {
      console.log(error);
    }
    // reset form
  };
  return (
    <form onSubmit={handleSubmit(handleRegister)} autoComplete="off">
      <h1 className="text-3xl font-bold pb-5">Tạo tài khoản của bạn</h1>
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
        <Link href={Routers.signInPage} className="text-[#1d9bf0]">
          Đăng nhập ngay
        </Link>
      </div>

      <PrimaryButton
        className="w-[440px] h-[52px] text-base  my-6 px-8"
        type="submit"
        isLoading={isSubmitting}
        disabledForm={canSubmit}
      >
        Tạo tài khoản
      </PrimaryButton>
    </form>
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

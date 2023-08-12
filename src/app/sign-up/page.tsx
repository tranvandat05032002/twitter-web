"use client";
import React from "react";
import Link from "next/link";
import { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { Input, LayoutAuth, PrimaryButton } from "@/components/common";
import { DateOfBirth } from "@/components/SingleUseComponents";
import { useDateStore } from "@/store";
const SignUp: React.FC = () => {
  const date = new Date();
  const lastYear = date.getFullYear();
  const dayItem = generateMenuItems({ start: 1, end: 31 });
  const monthItem = generateMenuItems({ start: 1, end: 12, month: true });
  const yearItem = generateMenuItems({
    start: 1903,
    end: lastYear,
    ascending: false,
  });
  const { day, month, year, setDay, setMonth, setYear } = useDateStore(
    (state) => state
  );
  console.log(day, month, year);
  const handleChangeMonth = (event: SelectChangeEvent<unknown>) => {
    setMonth(event.target.value as string | number);
  };
  const handleChangeDay = (event: SelectChangeEvent<unknown>) => {
    setDay(event.target.value as string | number);
  };
  const handleChangeYear = (event: SelectChangeEvent<unknown>) => {
    setYear(event.target.value as string | number);
  };
  return (
    <LayoutAuth>
      <form action="">
        <h1 className="text-3xl font-bold pb-5">Tạo tài khoản của bạn</h1>
        <Input placeholder="Tên" type="text"></Input>
        <Input placeholder="Email" type="email"></Input>
        <Input placeholder="Mật khẩu" type="text"></Input>
        <Input placeholder="Nhập lại mật khẩu" type="text"></Input>

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
          <Link href="/sign-in" className="text-[#1d9bf0]">
            Đăng nhập ngay
          </Link>
        </div>

        <PrimaryButton
          className="w-[440px] h-[52px] text-base  my-6 px-8"
          type="button"
        >
          Tạo tài khoản
        </PrimaryButton>
      </form>
    </LayoutAuth>
  );
};

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
export default SignUp;

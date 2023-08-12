"use client";
import React from "react";
import { MdClose } from "react-icons/md";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";
import Link from "next/link";
const CustomSelect = styled(Select)`
  & .MuiSvgIcon-root.MuiSelect-icon {
    color: #333639;
  }

  & .MuiOutlinedInput-root.MuiSelect-root {
    border-color: #333639;
  }
  &
    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    color: #ffff;
  }
`;
const SignUp: React.FC = () => {
  const [month, setMonth] = React.useState<string | number>("");
  const [day, setDay] = React.useState<string | number>("");
  const [year, setYear] = React.useState<string | number>("");
  const date = new Date();
  const lastYear = date.getFullYear();
  const dayItem = generateMenuItems({ start: 1, end: 31 });
  const monthItem = generateMenuItems({ start: 1, end: 12, month: true });
  const yearItem = generateMenuItems({
    start: 1903,
    end: lastYear,
    ascending: false,
  });
  const handleChangeMonth = (event: SelectChangeEvent<unknown>) => {
    setMonth(event.target.value as string | number);
  };
  const handleDay = (event: SelectChangeEvent<unknown>) => {
    setDay(event.target.value as string | number);
  };
  const handleYear = (event: SelectChangeEvent<unknown>) => {
    setYear(event.target.value as string | number);
  };
  return (
    <div
      id="register-model"
      className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(71,74,77,0.3)] flex items-center justify-center"
    >
      <div className="max-w-[600px] bg-black rounded-xl">
        <form action="">
          <div className="px-4 pt-4">
            {" "}
            {/* <div className="w-5 h-5 cursor-pointer text-white"> */}
            {/* <MdClose style={{ width: "100%", height: "100%" }} />
            </div> */}
          </div>
          <div className="px-20">
            <h1 className="text-3xl font-bold pb-5">Tạo tài khoản của bạn</h1>
            <div className="py-[13px]">
              <input
                placeholder="Tên"
                type="text"
                className="w-full rounded-lg placeholder:font-normal placeholder:text-base border py-[13px] border-[#333639] bg-transparent p-[10px] outline-none placeholder:text-sm focus:border focus:border-[#66b3ff] focus:outline-none"
              />
            </div>
            <div className="py-[13px]">
              <input
                placeholder="Email"
                type="email"
                className="w-full rounded-lg placeholder:font-normal placeholder:text-base border py-[13px] border-[#333639] bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-[#66b3ff] focus:outline-none"
              />
            </div>
            <div className="py-[13px]">
              <input
                placeholder="Mật khẩu"
                type="text"
                className="w-full rounded-lg placeholder:font-normal placeholder:text-base border py-[13px] border-[#333639] bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-[#66b3ff] focus:outline-none"
              />
            </div>
            <div className="py-[13px]">
              <input
                placeholder="Nhập lại mật khẩu"
                type="text"
                className="w-full rounded-lg placeholder:font-normal placeholder:text-base border py-[13px] border-[#333639] bg-transparent p-[10px] outline-none placeholder:text-sm placeholder:font-light focus:border focus:border-[#66b3ff] focus:outline-none"
              />
            </div>

            <div>
              <div>
                <h4 className="text-base font-normal">Ngày sinh</h4>
                <p className="text-[#71767b] text-sm">
                  Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của
                  bạn, ngay cả khi tài khoản này dành cho doanh nghiệp, thú cưng
                  hoặc thứ gì khác.
                </p>
              </div>
              <div className="my-4">
                <FormControl sx={{ minWidth: 200, marginRight: 1.5 }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    className="text-[#71767b]"
                  >
                    Tháng
                  </InputLabel>
                  <CustomSelect
                    className="border border-gray-500"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={month}
                    label="Month"
                    onChange={handleChangeMonth}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {monthItem}
                  </CustomSelect>
                </FormControl>

                <FormControl sx={{ minWidth: 90, marginRight: 1.5 }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    className="text-[#71767b]"
                  >
                    Ngày
                  </InputLabel>
                  <CustomSelect
                    className="border border-gray-500"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={day}
                    label="day"
                    onChange={handleDay}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {dayItem}
                  </CustomSelect>
                </FormControl>

                <FormControl sx={{ minWidth: 110 }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    className="text-[#71767b]"
                  >
                    Năm
                  </InputLabel>
                  <CustomSelect
                    className="border border-gray-500"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={year}
                    label="year"
                    onChange={handleYear}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {yearItem}
                  </CustomSelect>
                </FormControl>
              </div>
            </div>
            <div className="text-xs">
              <span>Bạn đã có tài khoản? </span>
              <Link href="/sign-in" className="text-[#1d9bf0]">
                Đăng nhập ngay
              </Link>
            </div>
          </div>

          <div className="px-20">
            <button className="w-[440px] h-[52px] rounded-full bg-[#1d9bf0] hover:bg-[#1486d2] transition-all text-white my-6 px-8 text-base">
              Tạo tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
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

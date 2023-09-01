import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";
const CustomSelect = styled(Select)`
  & .MuiSvgIcon-root.MuiSelect-icon {
    color: #333639;
  }

  & .MuiOutlinedInput-root.MuiSelect-root {
    border-color: #333639;
  }
  &
    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    color: #e7e9ea;
  }
`;

interface IDateOfBirth {
  day: string | number;
  month: string | number;
  year: string | number;
  dayItem: React.JSX.Element[] | [];
  monthItem: React.JSX.Element[] | [];
  yearItem: React.JSX.Element[] | [];
  handleChangeDay: (event: SelectChangeEvent<unknown>) => void;
  handleChangeYear: (event: SelectChangeEvent<unknown>) => void;
  handleChangeMonth: (event: SelectChangeEvent<unknown>) => void;
}
const DateOfBirth: React.FC<IDateOfBirth> = (props) => {
  const {
    day,
    month,
    year,
    dayItem,
    handleChangeDay,
    handleChangeMonth,
    handleChangeYear,
    monthItem,
    yearItem,
  } = props;
  return (
    <>
      <div>
        <h4 className="text-base font-normal">Ngày sinh</h4>
        <p className="text-textGray text-sm">
          Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của bạn, ngay
          cả khi tài khoản này dành cho doanh nghiệp, thú cưng hoặc thứ gì khác.
        </p>
      </div>
      <div className="my-4">
        <FormControl sx={{ minWidth: 200, marginRight: 1.5 }}>
          <InputLabel
            id="demo-simple-select-helper-label"
            className="text-textGray"
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
            className="text-textGray"
          >
            Ngày
          </InputLabel>
          <CustomSelect
            className="border border-gray-500"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={day}
            label="day"
            onChange={handleChangeDay}
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
            className="text-textGray"
          >
            Năm
          </InputLabel>
          <CustomSelect
            className="border border-gray-500"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={year}
            label="year"
            onChange={handleChangeYear}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {yearItem}
          </CustomSelect>
        </FormControl>
      </div>
    </>
  );
};

export default DateOfBirth;

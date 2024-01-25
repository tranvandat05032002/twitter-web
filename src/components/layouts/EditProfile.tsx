import React from "react";
import { Input, StickyNav } from "../common";
import {
  CameraPlusIcon,
  CloseIcon,
  DotIcon,
} from "../SingleUseComponents/Icon";
import { SecondaryButton } from "../common/Button";
import { useForm } from "react-hook-form";
import Tippy from "@tippyjs/react";
import { formatISO8601, formatMonthDayYear } from "@/utils/handlers";
import { DateOfBirth } from "../SingleUseComponents";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useDateStore } from "@/store";
import { useEvent } from "@/store/useEven";
import { IUpdateUser } from "@/types/userTypes";
import { useUpdateUser } from "@/hooks/users/useMutation";
import { toast } from "react-toastify";
const EditProfile = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<IUpdateUser>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      bio: "",
      location: "",
      website: "",
      date_of_birth: "",
      avatar:
        "https://photo-cms-tpo.epicdn.me/w890/Uploaded/2023/zatmzz/2015_11_12/1_NBBR.jpg",
    },
  });
  const { day, month, year, setDay, setMonth, setYear, setISO8601 } =
    useDateStore((state) => state);
  const { mutate: mutateUpdateUser, isSuccess, isError } = useUpdateUser();
  const { setShowModal } = useEvent((state) => state);
  const date = new Date();
  const lastYear = date.getFullYear();
  const dayItem = generateMenuItems({ start: 1, end: 31 });
  const monthItem = generateMenuItems({ start: 1, end: 12, month: true });
  const yearItem = generateMenuItems({
    start: 1903,
    end: lastYear,
    ascending: false,
  });
  React.useEffect(() => {
    if (day && month && year) {
      const isoDate = formatISO8601(month, day, year);
      setValue("date_of_birth", isoDate as string);
    }
  }, [day, month, year]);
  const handleChangeMonth = React.useCallback(
    (event: SelectChangeEvent<unknown>) => {
      setMonth(event.target.value as string | number);
    },
    [setMonth]
  );
  const handleChangeDay = React.useCallback(
    (event: SelectChangeEvent<unknown>) => {
      setDay(event.target.value as string | number);
    },
    [setDay]
  );
  const handleChangeYear = React.useCallback(
    (event: SelectChangeEvent<unknown>) => {
      setYear(event.target.value as string | number);
    },
    [setYear]
  );
  const handleUpdateUser = React.useCallback((values: IUpdateUser) => {
    if (!isValid) return;
    mutateUpdateUser(values);
  }, [isValid, mutateUpdateUser]);
  if (isSuccess) {
    toast.success("Update success", {
      pauseOnHover: false,
    });
    setTimeout(() => {
      setShowModal(false)
    }, 1000)
  }
  if (isError) {
    toast.error("Update failed", {
      pauseOnHover: false,
    });
  }
  return (
    <form onSubmit={handleSubmit(handleUpdateUser)} autoComplete="off">
      <div className="max-w-[600px] w-[600px] bg-black max-h-[650px] h-[650px] overflow-auto rounded-2xl pb-4">
        <StickyNav>
          <div className="w-full h-full px-4 py-2 flex text-white items-center justify-between">
            <div className="flex gap-x-8 items-center">
              <div className="cursor-pointer p-2 hover:bg-bgHoverBlue group rounded-full">
                <CloseIcon className="text-white bg-black/10 "></CloseIcon>
              </div>
              <h3 className="font-medium text-xl">Edit profile</h3>
            </div>
            <SecondaryButton
              className="px-4 py-1 text-black font-medium"
              type="submit"
            >
              Save
            </SecondaryButton>
          </div>
        </StickyNav>
        <div>
          {/* <label htmlFor="avatar">
                Photo
              <Input control={control} type="file" name="avatar"></Input>
            </label> */}
          <div>
            <div className="relative w-full max-h-[195px] h-[195px] mb-14">
              <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="cursor-pointer p-[10px] bg-bgHoverBlue hover:bg-white/10 group rounded-full">
                  <CameraPlusIcon className="text-white bg-black/10 "></CameraPlusIcon>
                </div>
              </div>
              <div className="w-[112px] h-[112px] rounded-full overflow-hidden absolute bottom-0 left-4 translate-y-1/2 cursor-pointer">
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/20 flex items-center justify-center z-10">
                  <Tippy
                    placement="bottom"
                    content="Add a photo"
                    offset={[0, 2]}
                    className="z-[30] bg-black/70 text-white text-xs p-1 rounded-sm"
                  >
                    <div className="cursor-pointer p-[10px] w-max h-max bg-black/50 hover:bg-black/30 transition duration-200 group rounded-full">
                      <CameraPlusIcon className="text-white bg-black/10 "></CameraPlusIcon>
                    </div>
                  </Tippy>
                </div>
                <img
                  src="/image/avatar.jpg"
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover z-0"
                />
              </div>
            </div>
            <div className="px-4">
              <div className="py-[13px]">
                <Input
                  type="text"
                  control={control}
                  placeholder="Name"
                  name="name"
                ></Input>
              </div>
              <div className="py-[13px]">
                <Input
                  type="text"
                  control={control}
                  placeholder="Bio"
                  name="bio"
                ></Input>
              </div>
              <div className="py-[13px]">
                <Input
                  type="text"
                  control={control}
                  placeholder="Location"
                  name="location"
                ></Input>
              </div>
              <div className="py-[13px]">
                <Input
                  type="text"
                  control={control}
                  placeholder="Website"
                  name="website"
                ></Input>
              </div>

              <div className="">
                <div className="text-base flex gap-x-1 items-center justify-start">
                  <p className="text-textGray font-light">Birth date</p>
                  <DotIcon style={{ color: "#71767b" }}></DotIcon>
                </div>
                <h3 className="font-medium text-white text-lg">
                  {formatMonthDayYear("2002-03-12T17:00:00.000+00:00")}
                </h3>
                <React.Fragment>
                  <div className="mt-2">
                    <span className="text-textGray text-base">
                      This should be the date of birth of the person using the
                      account. Even if you’re making an account for your
                      business, event, or cat. Twitter uses your age to
                      customize your experience, including ads, as explained
                      in our Privacy Policy.
                    </span>

                    <div>
                      <DateOfBirth
                        quote={false}
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
                  </div>
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;

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

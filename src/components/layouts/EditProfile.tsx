import React from "react";
import { Input, StickyNav } from "../common";
import {
  CameraPlusIcon,
  CloseIcon,
  CloseExternalEventIcon,
  DotIcon,
} from "../SingleUseComponents/Icon";
import { SecondaryButton } from "../common/Button";
import { useForm, Controller } from "react-hook-form";
import Tippy from "@tippyjs/react";
import { formatISO8601, formatMonthDayYear, uploadImageToS3 } from "@/utils/handlers";
import { DateOfBirth } from "../SingleUseComponents";
import { Avatar, MenuItem, SelectChangeEvent } from "@mui/material";
import { useDateStore } from "@/store";
import { useEvent } from "@/store/useEven";
import { IUpdateUser, IUser } from "@/types/userTypes";
import { useUpdateUser } from "@/hooks/users/useMutation";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid"
import UploadImage from "./UploadImage";
import { useProfileStore } from "@/store/useProfile";
import CropEasy from "../common/CropImage/CropEasy";
import { apiInstance } from "@/utils/api";
import { getToken } from "@/utils/auth/cookies";
import Image from "next/image";
import HeaderModalEdit from "../common/Modal/HeaderModalEdit";
import AvatarProfile from "../common/Media/AvatarProfile";
const EditProfile = () => {
  const { userProfile, updateProfile } = useProfileStore(
    (state) => state
  );
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<IUpdateUser>({
    mode: "onSubmit",
    defaultValues: {
      name: userProfile?.name,
      bio: userProfile?.bio,
      location: userProfile?.location,
      website: userProfile?.website,
      date_of_birth: userProfile?.date_of_birth,
      avatar: userProfile?.avatar
    },
  });
  const { day, month, year, setDay, setMonth, setYear, setISO8601 } =
    useDateStore((state) => state);
  const { mutateAsync: mutateUpdateUser, isSuccess, isError } = useUpdateUser();
  const { setShowModal } = useEvent((state) => state);
  const [file, setFile] = React.useState<File | null>(null);
  const [fileCoverPhoto, setFileCoverPhoto] = React.useState<File | null>(null);
  const [photoURL, setPhotoURL] = React.useState<string | null>(userProfile?.avatar as string);
  const [coverPhotoURL, setCoverPhotoURL] = React.useState<string | null>(userProfile?.cover_photo as string);
  const [openCrop, setOpenCrop] = React.useState<Boolean | false>(false);
  const [isRemoveCoverPhoto, setIsRemoveCoverPhoto] = React.useState<Boolean | false>(false);
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
  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] as File
      setFile(file)
      setValue("avatar", URL.createObjectURL(file))
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true)
    }
  }
  const handleChangeCoverPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] as File
      setFileCoverPhoto(file)
      setValue("cover_photo", URL.createObjectURL(file))
      const coverPhotoResult = await uploadImageToS3(file, "coverPhoto", "cover-photo")
      setCoverPhotoURL(coverPhotoResult as string)
    }
  }
  const handleUpdateUser = async (values: IUpdateUser) => {
    if (!isValid) return;
    if (photoURL || coverPhotoURL) {
      if (photoURL) {
        // update avatar
        const updatedValues = { ...values, avatar: photoURL as string };
        mutateUpdateUser(updatedValues);
        updateProfile(updatedValues)
      }
      if (coverPhotoURL) {
        const updatedValues = { ...values, cover_photo: coverPhotoURL as string };
        mutateUpdateUser(updatedValues);
        updateProfile(updatedValues)
      }
      if (photoURL && coverPhotoURL) {
        const updatedValues = { ...values, avatar: photoURL as string, cover_photo: coverPhotoURL as string };
        mutateUpdateUser(updatedValues);
        updateProfile(updatedValues)
      }
    }
    else {
      await mutateUpdateUser(values);
      updateProfile(values)
    }
    if (isRemoveCoverPhoto) {
      const updatedValues = { ...values, cover_photo: coverPhotoURL as string };
      await mutateUpdateUser(updatedValues);
      updateProfile(updatedValues)
    }
  };
  const handleDropCoverPhoto = async () => {
    setCoverPhotoURL("");
    setIsRemoveCoverPhoto(true)
  }
  React.useEffect(() => {
    let timer1: NodeJS.Timeout | null = null;
    if (isSuccess) {
      toast.success("Update success", {
        pauseOnHover: false,
      });
      timer1 = setTimeout(() => {
        setShowModal(false)
      }, 3000)
    }
    if (isError) {
      toast.error("Update failed", {
        pauseOnHover: false,
      });
    }
    return () => {
      if (timer1) {
        clearTimeout(timer1)
      }
    }
  }, [isSuccess, isError])
  return (
    !openCrop ? (<form onSubmit={handleSubmit(handleUpdateUser)} autoComplete="off">
      <div className="max-w-[600px] w-[600px] bg-black max-h-[650px] h-[650px] overflow-auto rounded-2xl pb-4">
        <HeaderModalEdit title="Edit profile" eventTitle="save" iconType={{ type: "close" }}></HeaderModalEdit>
        <div>
          <div>
            <div className="relative w-full max-h-[195px] h-[195px] mb-14 px-[3px]">
              <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="w-full h-full relative">
                  <div className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 flex gap-x-[10px] z-[10]">
                    <div className="cursor-pointer p-[10px] bg-black/50 hover:bg-black/30 group rounded-full">
                      <Tippy
                        placement="bottom"
                        content="Add a photo"
                        offset={[0, 2]}
                        className="z-[30] bg-black/70 text-white text-xs p-1 rounded-sm"
                      >
                        <React.Fragment>
                          <Input type="file" accept="image/*" onChange={handleChangeCoverPhoto} control={control} id="cover-photo" name="cover_photo" className="hidden cursor-pointer" />
                          <label htmlFor="cover_photo">
                            <div className="cursor-pointer bg-black/50 hover:bg-black/30 transition duration-200 rounded-full">
                              <CameraPlusIcon className="text-white bg-black/10 cursor-pointer"></CameraPlusIcon>
                            </div>
                          </label>
                        </React.Fragment>
                      </Tippy>
                    </div>
                    {coverPhotoURL && <button type="button" onClick={handleDropCoverPhoto} className="cursor-pointer border-none outline-none p-[10px] bg-black/50 hover:bg-black/30 transition duration-200 rounded-full">
                      <CloseExternalEventIcon className="text-white bg-black/10 "></CloseExternalEventIcon>
                    </button>}
                  </div>
                  <div className="relative w-full h-screen">
                    <div className="absolute inset-0 bg-black/50"></div>
                    {coverPhotoURL && (
                      <Image
                        src={coverPhotoURL}
                        alt="Ảnh bìa"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                      />
                    )}
                    {/* Nội dung khác có thể được thêm vào đây */}
                  </div>
                </div>
              </div>
              <AvatarProfile control={control} image={photoURL as string} changeImage={handleChangeAvatar}></AvatarProfile>
            </div>
            <div className="px-4">
              <div className="py-[13px]">
                <Input
                  type="text"
                  control={control}
                  placeholder="Name"
                  name="name"
                  defaultValue={userProfile?.name}
                ></Input>
              </div>
              <div className="py-[13px]">
                <Input
                  type="text"
                  control={control}
                  placeholder="Bio"
                  name="bio"
                  defaultValue={userProfile?.bio}
                ></Input>
              </div>
              <div className="py-[13px]">
                <Input
                  type="text"
                  control={control}
                  placeholder="Location"
                  name="location"
                  defaultValue={userProfile?.location}
                ></Input>
              </div>
              <div className="py-[13px]">
                <Input
                  type="text"
                  control={control}
                  placeholder="Website"
                  name="website"
                  defaultValue={userProfile?.website}
                ></Input>
              </div>

              <div className="">
                <div className="text-base flex gap-x-1 items-center justify-start">
                  <p className="text-textGray font-light">Birth date</p>
                  <DotIcon style={{ color: "#71767b" }}></DotIcon>
                </div>
                <h3 className="font-medium text-white text-lg">
                  {formatMonthDayYear(userProfile?.date_of_birth)}
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
    </form>) : <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
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

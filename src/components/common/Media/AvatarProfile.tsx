import Tippy from '@tippyjs/react';
import React from 'react';
import { Input } from '..';
import { Avatar } from "@mui/material";
import { CameraPlusIcon } from '@/components/SingleUseComponents/Icon';
import { Control } from 'react-hook-form';
interface IAvatar {
    image: string;
    changeImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    control: Control<any>
}
const AvatarProfile = ({image, changeImage, control}: IAvatar) => {
    return (
        <div className="w-[112px] h-[112px] rounded-full overflow-hidden absolute bottom-0 left-4 translate-y-1/2 cursor-pointer">
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/20 flex items-center justify-center z-10">
                  <Tippy
                    placement="bottom"
                    content="Add a photo"
                    offset={[0, 2]}
                    className="z-[30] bg-black/70 text-white text-xs p-1 rounded-sm"
                  >
                    <React.Fragment>
                      <Input type="file" accept="image/*" onChange={changeImage} control={control} id="avatar" name="avatar" className="hidden cursor-pointer border border-red-500" />
                      <label htmlFor="avatar">
                        <div className="cursor-pointer p-[10px] w-max h-max bg-black/50 hover:bg-black/30 transition duration-200 group rounded-full">
                          <CameraPlusIcon className="text-white bg-black/10 cursor-pointer" />
                        </div>
                      </label>
                    </React.Fragment>
                  </Tippy>
                </div>
                <Avatar
                  src={image}
                  sx={{ width: 114, height: 114 }} 
                />
        </div>
    );
};

export default AvatarProfile;
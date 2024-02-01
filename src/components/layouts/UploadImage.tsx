import React from 'react';
import Image from 'next/image'
import { Avatar } from '@mui/material';
import Tippy from '@tippyjs/react';
import { CameraPlusIcon } from '../SingleUseComponents/Icon';
import { useForm } from 'react-hook-form';
import { Input } from '../common';
export interface IUploadImage {
    avatar: string
}
const UploadImage = () => {
    const {
        control,
        handleSubmit,
        setValue,
      } = useForm<IUploadImage>({
        mode: "onSubmit",
        defaultValues: {
          avatar: ""
        }
      });
      const handleUploadImage = (values: IUploadImage) => {
        console.log(values)
      }
    return (
        <React.Fragment>
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/20 flex items-center justify-center z-10">
                <Tippy
                    placement="bottom"
                    content="Add a photo"
                    offset={[0, 2]}
                    className="z-[30] bg-black/70 text-white text-xs p-1 rounded-sm"
                >
                       
                            <form onSubmit={handleSubmit(handleUploadImage)}>
                                <Input type='file' control={control} name="image" className='hidden cursor-pointer'/>
                                <div className="cursor-pointer p-[10px] w-max h-max bg-black/50 hover:bg-black/30 transition duration-200 group rounded-full">
                                    <CameraPlusIcon className="text-white bg-black/10 cursor-pointer"></CameraPlusIcon>
                                </div>
                            </form>
                </Tippy>
            </div>
            <Avatar
                alt="Remy Sharp"
                src="/image/avatar.jpg"
                sx={{ width: 114, height: 114 }} />
        </React.Fragment>
    );
};

export default UploadImage;
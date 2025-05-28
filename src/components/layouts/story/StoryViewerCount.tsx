'use client'
import { IUser } from '@/types/userTypes';
import { Avatar } from '@mui/material';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { IoIosArrowUp } from "react-icons/io";

interface StoryViewerCountProps {
    viewers: IUser[];
    setShowViewersList: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoryViewerCount: React.FC<StoryViewerCountProps> = ({ viewers, setShowViewersList }) => {
    const textViewCount = viewers.length === 0 ? "chưa có" : viewers.length.toString()
    return (
        <div className="flex flex-col space-y-1 font-bold justify-center items-start space-x-1 text-sm text-gray-300" onClick={() => setShowViewersList(true)}>

            {viewers.length > 0 && <IoIosArrowUp className="w-4 h-4 ml-2" />}
            <p>{textViewCount} người xem</p>
            {viewers.length > 0 &&
                <div className="w-full h-[1px] bg-borderGrayPrimary"></div>
            }
            <div className='flex -space-x-1'>
                {
                    viewers.length > 0 && viewers.map((user, index) => (
                        <div key={index} className='w-6 h-6 p1 border border-borderGrayPrimary rounded-full'>
                            <Avatar
                                src={user.avatar}
                                sx={{ width: 24, height: 24 }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default StoryViewerCount;
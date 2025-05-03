import { DotsIcon } from '@/components/SingleUseComponents/Icon';
import { UserSearchType } from '@/types/userTypes';
import { Avatar } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

const ItemUserFollowing = ({ data }: { data: UserSearchType }) => {
    return (
        <div className="w-full h-[56px] group transition-all">
            <div className={classNames("flex items-center relative cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray rounded-[5px]")}>
                <div className="flex items-center gap-x-2">
                    <div className="relative w-10 h-10">
                        {/* Hiển thị trạng thái online */}
                        <div className="absolute w-2 h-2 rounded-full bg-[#31a24c] bottom-0 right-1 z-[1000]" />
                        <div className="overflow-hidden rounded-full z-[-1]">
                            <Avatar src={data.avatar} />
                        </div>
                    </div>
                    <div>
                        <p className="text-base">{data.name}</p>
                    </div>
                </div>
                <div className="hidden absolute group-hover:block top-1/2 right-[20px] translate-y-[-50%] p-2 rounded-full bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                    <DotsIcon />
                </div>
            </div>
        </div>
    );
};

export default ItemUserFollowing;
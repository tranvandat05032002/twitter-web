import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { CloseExternalEventIcon, MagnifyingGlassIcon } from '@/components/SingleUseComponents/Icon';
import { UserSearchType } from '@/types/userTypes';
import { Avatar } from '@mui/material';
import React from 'react';
const ItemUserSearch = ({ data }: { key: string, data: UserSearchType }) => {
    return (
        <div className="w-full flex items-center cursor-pointer justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray">
            <div className=" w-full flex items-center">
                <div className="px-4 text-white font-medium">
                    <MagnifyingGlassIcon className="w-[22px] h-[22px]" />
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center cursor-pointer select-none text-sm">
                        <div className="w-full flex items-start gap-x-2">
                            <div className="relative w-10 h-10 mt-[6px] overflow-hidden rounded-full group">
                                <Avatar
                                    src={data.avatar}
                                    sx={{ width: "100%", height: "100%" }}
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-base">{data.name}</p>
                                <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">{data.username}</p>
                            </div>
                        </div>
                    </div>
                    <BoxIcon className={"p-1 hover:bg-textBlue/10 mr-4 text-bgBlueFocus"}>
                        <CloseExternalEventIcon className='w-[15px] h-[15px]' />
                    </BoxIcon>
                </div>
            </div>
        </div>
    );
};

export default ItemUserSearch;
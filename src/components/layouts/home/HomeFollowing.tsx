import React from 'react'
import { CloseExternalEventIcon, DotsIcon, MagnifyingGlassIcon } from "@/components/SingleUseComponents/Icon";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import { useEvent } from '@/store/useEven';

export default function HomeFollowing() {
    const [isSearching, setIsSearching] = React.useState(false)
    const { showCreatePost } = useEvent((state) => state);
    return (
        <div className={`w-[320px] ${showCreatePost ? "h-screen overflow-hidden" : ""}`}>
            <div className="sticky top-0">
                <div className="border-b-[0.5px] border-borderGrayPrimary">

                    {/* <StickyNav> */}
                    {!isSearching ?
                        (
                            <div className="flex justify-between px-[13px] py-4">
                                <h1 className="text-xl font-bold">Đang theo dõi</h1>
                                <div className="flex items-center">
                                    <MagnifyingGlassIcon className="ml-[3px] font-light inline-block align-middle text-textGray cursor-pointer" onClick={() => setIsSearching(true)} />
                                </div>
                            </div>
                        )
                        :
                        (<div className="px-[13px] py-4">
                            <div className="flex justify-between items-center">
                                <div className="relative w-full">
                                    <MagnifyingGlassIcon className="absolute left-[10px] top-[50%] translate-y-[-50%] text-textGray ml-[3px] font-light cursor-pointer" />
                                    <input type="text" placeholder='Tìm kiếm bạn bè' className="pl-[40px] pr-[10px] py-[5px] h-[28px] focus:outline-none border focus:border focus:border-borderBlue border-borderGrayPrimary placeholder:text-textGray placeholder:font-light placeholder:text-sm bg-black rounded-[30px] w-full text-sm font-light" />
                                </div>
                                <div>
                                    <CloseExternalEventIcon className="text-textGray ml-[3px] font-light inline-block align-middle cursor-pointer" onClick={() => setIsSearching(false)} />
                                </div>
                            </div>
                        </div>)
                    }
                    {/* </StickyNav> */}
                </div>
                <div className="p-[13px] max-h-screen overflow-y-auto">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className="w-full h-[56px] group transition-all">
                            <div className={classNames("flex items-center relative cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray rounded-[5px]")}>
                                <div className="flex items-center gap-x-2">
                                    <div className="relative w-10 h-10">
                                        {/* Hiển thị trạng thái online */}
                                        <div className="absolute w-2 h-2 rounded-full bg-[#31a24c] bottom-0 right-1 z-[1000]" />
                                        <div className="overflow-hidden rounded-full z-[-1]">
                                            <Avatar src="/image/avatar.jpg" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-base">Trần Văn Đạt {index + 1}</p>
                                    </div>
                                </div>
                                <div className="hidden absolute group-hover:block top-1/2 right-[20px] translate-y-[-50%] p-2 rounded-full bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                                    <DotsIcon />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

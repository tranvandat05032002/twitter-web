import React from 'react'
import { CloseExternalEventIcon, DotsIcon, MagnifyingGlassIcon } from "@/components/SingleUseComponents/Icon";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import { ModalType, useEvent } from '@/store/useEven';
import { useGetUsersFollowing } from '@/hooks/users/useQuery';
import ItemUserFollowing from '@/components/common/Tweet/ItemUserFollowing';
import Link from 'next/link';
import { IUser } from '@/types/userTypes';

export default function HomeFollowing() {
    const [isSearching, setIsSearching] = React.useState(false)
    const { activeModal } = useEvent((state) => state);
    const usersFollowing = useGetUsersFollowing();
    const dataGetUsersFollowing = usersFollowing.data
    return (
        <div className={`w-[320px]`}>
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
                    {dataGetUsersFollowing?.data.map((user: any) =>
                        <Link href={`/profile/v1/?profile_username=${user?.followUsers.username}`} key={user._id}>
                            <ItemUserFollowing data={user?.followUsers} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

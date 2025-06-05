"use client"
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { BackIcon, CloseExternalEventIcon, CloseIcon, DotsIcon, MagnifyingGlassIcon } from '@/components/SingleUseComponents/Icon';
import { StickyNav } from '@/components/common';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import React from 'react';
import { IUser, UserSearchType } from '@/types/userTypes';
import { DEFAULT_IMAGE, EXPLORE_ITEMS, NOTIFY_ITEMS } from '@/constant/constants';
import classNames from "classnames"
import SearchItem from './SearchItem';
import { Avatar } from '@mui/material';
import { FaUserFriends, FaHeart } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useInfiniteNotifications } from '@/hooks/useInfiniteQuery';
import { useInView } from 'react-intersection-observer';
import { LoadingSniper } from '@/components/common/Loading/LoadingSniper';
import { NotifyType } from '@/types/notifyTypes';
import { formatDateToVietnamese } from '@/utils/handlers';

const LeftNotify = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteNotifications()

    const { ref: loader, inView } = useInView({ threshold: 1 });

    React.useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const notifications = data?.pages.flatMap((page) => page?.result.notifications ?? []);

    const slugFilter = searchParams.get('filter') || null;
    const handleBack = () => {
        router.back();
    }
    // const debounceSearchValue = useDebounce(searchValue as string, 700)
    const debounceSearchValue = ""
    return (
        <div className='flex-initial w-[600px] border-r-[0.5px] border-borderGrayPrimary pt-[3px]'>
            <StickyNav>
                <div className="w-full flex items-center justify-between px-[5px]">
                    <BoxIcon>
                        <BackIcon onClick={handleBack} className='h-[21px] w-[21px]'></BackIcon>
                    </BoxIcon>
                    <div className="group-search relative w-[80%] flex">
                        <SearchItem />
                    </div>
                    <BoxIcon>
                        <DotsIcon className='h-[21px] w-[21px]'></DotsIcon>
                    </BoxIcon>
                </div>
                <div className="flex items-center justify-between mt-[5px]">
                    {NOTIFY_ITEMS.map((item) => {
                        const isActive = String(slugFilter).toLowerCase() === String(item.mode).toLowerCase();
                        return (
                            <div key={item.id} className="h-[53px] px-8 flex-1 hover:bg-white/10 flex items-center justify-center">
                                <Link
                                    href={`/explore?q=${debounceSearchValue}&filter=${item.mode}`}
                                    className={classNames(`text-textGray hover:no-underline flex-1 p-4 text-center`, {
                                        "text-white py-4 px-2 border-b-[3px] box-border border-textBlue transition": isActive,
                                        "": !isActive
                                    })}
                                >
                                    {item.title}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </StickyNav>
            <div className="py-4 border-t-[1px] border-borderGrayPrimary">
                {
                    notifications && notifications?.length > 0 && notifications.map((notify) => (
                        <div className="w-full flex items-center px-2 py-4 cursor-pointer hover:bg-gray-100/10">
                            <div className="w-full">
                                {/* <Link
                            href={`/profile/v1?profile_username=${data.username}`}
                        > */}
                                <div className="w-full flex items-start justify-between space-x-2">
                                    <div className="w-10 h-10 mt-[6px] group relative">
                                        {/* <div className="absolute"></div> */}
                                        {!notify.is_read && <div className="absolute debug-css bottom-0 right-0 w-3 h-3 bg-[#1d9bf0] rounded-full border-2 border-white translate-x-1/3 translate-y-1/3 z-10" />}
                                        <Avatar src={notify.sender.avatar ? notify.sender.avatar : DEFAULT_IMAGE} sx={{ width: "100%", height: "100%" }} />
                                    </div>
                                    <div className="flex-1 h-full">
                                        <div className="w-full h-full">
                                            <div className="flex items-start space-x-1 pr-4">
                                                <div className='flex-1'>
                                                    <p className="pr-4 whitespace-wrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">
                                                        <span className='text-white font-bold'>{notify.sender.name}</span> {" "}
                                                        {notify.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={`font-light ${notify.is_read ? "text-textGray" : "text-textBlue"} text-[15px]`}>{formatDateToVietnamese(notify.created_at)}</p>
                                    </div>
                                </div>
                                {/* </Link> */}
                            </div>
                            <div className='mr-5'>
                                {
                                    notify.type === NotifyType.Follow &&
                                    <div className='p-2 rounded-full border-[0.5px] border-borderGrayPrimary'>
                                        <FaUserFriends className='w-6 h-6' />
                                    </div>
                                }
                                {
                                    (notify.type === NotifyType.Comment || notify.type === NotifyType.CommentReply) &&
                                    <div className='p-2 rounded-full border-[0.5px] bg-textBlue/20 border-borderGrayPrimary'>
                                        <BiSolidCommentDetail className='w-6 h-6' />
                                    </div>
                                }
                                {
                                    notify.type === NotifyType.Like &&
                                    <div className='p-2 rounded-full border-[0.5px] bg-textPinkPrimary/20 border-borderGrayPrimary'>
                                        <FaHeart className='w-6 h-6' />
                                    </div>
                                }
                            </div>
                        </div >
                    ))
                }
                {hasNextPage && notifications?.length !== 0 && (
                    <div ref={loader} className="text-center p-4">
                        {isFetchingNextPage && <LoadingSniper className="border-blue-300 mx-auto h-6 w-6" />}
                    </div>
                )}

                {
                    notifications?.length === 0 && <p className="text-center text-textGray my-4">Chưa có thông báo nào.</p>
                }

                {/* <div className="w-full flex items-center px-2 py-4 cursor-pointer hover:bg-gray-100/10">
                    <div className="w-full">
                        <div className="w-full flex items-start justify-between space-x-2">
                            <div className="w-10 h-10 mt-[6px] group relative">
                                <Avatar src={DEFAULT_IMAGE} sx={{ width: "100%", height: "100%" }} />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1d9bf0] rounded-full border-2 border-white translate-x-1/3 translate-y-1/3 z-10" />
                            </div>
                            <div className="flex-1 h-full">
                                <div className="w-full h-full">
                                    <div className="flex items-start space-x-1 pr-4">
                                        <div className='flex-1'>
                                            <p className="pr-4 whitespace-wrap text-ellipsis overflow-hidden font-light text-[15px] text-gray-300/80">
                                                <span className='text-white font-bold'>Trần Văn Đạt</span> {" "}
                                                đã bình luận bài viết của bạn.</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-medium text-[#1d9bf0] text-[15px]">1 giờ</p>
                            </div>
                        </div>
                    </div>
                    <div className='mr-5'>
                        <div className='p-2 rounded-full border-[0.5px] bg-textBlue/20 border-borderGrayPrimary'>
                            <BiSolidCommentDetail className='w-6 h-6' />
                        </div>
                    </div>
                </div > */}

                {/* <React.Fragment>
                    <div className="w-full flex items-center px-2 py-4 cursor-pointer hover:bg-gray-100/10">
                        <div className="w-full">
                            <div className="w-full flex items-start justify-between space-x-2">
                                <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
                                    <Avatar src={DEFAULT_IMAGE} sx={{ width: "100%", height: "100%" }} />
                                </div>
                                <div className="flex-1 h-full">
                                    <div className="w-full h-full">
                                        <div className="flex items-start space-x-1 pr-4">
                                            <div className='flex-1'>
                                                <p className="pr-4 whitespace-wrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">
                                                    <span className='text-white font-bold'>Trần Văn Đạt</span> {" "}
                                                    đã yêu thích bài viết của bạn.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="font-light text-textGray text-[15px]">1 giờ</p>
                                </div>
                            </div>
                        </div>
                        <div className='mr-5'>
                            <div className='p-2 rounded-full border-[0.5px] bg-textPinkPrimary/20 border-borderGrayPrimary'>
                                <FaHeart className='w-6 h-6' />
                            </div>
                        </div>
                    </div >

                    <div className="w-full flex items-center px-2 py-4 cursor-pointer hover:bg-gray-100/10">
                        <div className="w-full">
                            <div className="w-full flex items-start justify-between space-x-2">
                                <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
                                    <Avatar src={DEFAULT_IMAGE} sx={{ width: "100%", height: "100%" }} />
                                </div>
                                <div className="flex-1 h-full">
                                    <div className="w-full h-full">
                                        <div className="flex items-start space-x-1 pr-4">
                                            <div className='flex-1'>
                                                <p className="pr-4 whitespace-wrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">
                                                    <span className='text-white font-bold'>Trần Văn Đạt</span> {" "}
                                                    đã yêu thích bài viết của bạn.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="font-light text-textGray text-[15px]">1 giờ</p>
                                </div>
                            </div>
                        </div>
                        <div className='mr-5'>
                            <div className='p-2 rounded-full border-[0.5px] bg-textPinkPrimary/20 border-borderGrayPrimary'>
                                <FaHeart className='w-6 h-6' />
                            </div>
                        </div>
                    </div >
                </React.Fragment> */}
            </div>
        </div>
    );
};

export default LeftNotify;
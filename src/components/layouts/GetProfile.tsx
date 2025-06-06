"use client"
import React from 'react';
import { StickyNav } from '../common';
import { BackIcon, CalendarIcon, DotsIcon, LinkIcon, LocationIcon } from '../SingleUseComponents/Icon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useProfileStore } from '@/store/useProfile';
import { useGetProfile } from '@/hooks/users/useQuery';
import { decodedUsername, formatDateDDMMYYYY, formatDateToVietnamese, formatMonthYear } from '@/utils/handlers';
import Image from 'next/image';
import { DEFAULT_IMAGE } from '@/constant/constants';
import ButtonFollowingHandle from '../common/Button/ButtonFollowingHandle';
interface IGetProfile {
    children: React.ReactNode
}
const GetProfile: React.FC<IGetProfile> = ({ children }) => {
    const router = useRouter();
    const { userProfile, updateProfile } = useProfileStore(
        (state) => state
    );
    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries())
    const username = decodedUsername(params?.profile_username);
    const { data: dataUserProfile, isSuccess } = useGetProfile(username);
    const handleBackHome = React.useCallback(() => {
        router.back();
    }, [router]);
    const pathname = usePathname();
    const isActive = (path: string) => {
        return pathname === path
            ? "text-white py-4 px-2 border-b-[3px] border-textBlue transition"
            : "";
    };
    React.useEffect(() => {
        if (isSuccess) {
            if (!dataUserProfile) return;
            updateProfile(dataUserProfile);
        }
    }, [isSuccess]);

    return (
        <React.Fragment>
            <div className='flex-initial w-[600px] border-r-[0.5px] border-borderGrayPrimary pt-[3px] border'>
                <div className="flex flex-col h-full min-h-screen border-r-[0.5px] border-borderGrayPrimary">
                    <StickyNav>
                        <div className="flex items-center pt-1 px-4">
                            <div className="text-white p-2 mr-6 rounded-full hover:bg-white/10 transition duration-200 cursor-pointer">
                                <BackIcon
                                    onClick={handleBackHome}
                                    className="text-white w-full h-full"
                                ></BackIcon>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{userProfile?.name}</h2>
                                <p className="text-textGray text-sm font-light">0 posts</p>
                            </div>
                        </div>
                    </StickyNav>
                    <div className="flex flex-col">
                        <div className="relative w-full z-0">
                            <div className="relative w-full h-64">
                                <div className="absolute w-full h-full top-0 left-0 bg-borderGrayPrimary">
                                    {/* {userProfile.cover_photo && ( */}
                                    {userProfile?.cover_photo && (
                                        <Image
                                            src={userProfile.cover_photo || DEFAULT_IMAGE}
                                            alt="Ảnh bìa hồ sơ"
                                            layout="fill"
                                            objectFit="cover"
                                            className="cursor-pointer"
                                        />
                                    )}
                                    {/* )} */}
                                </div>
                            </div>
                            <div className="w-[134px] h-[134px] absolute bottom-0 left-4 translate-y-1/2 cursor-pointer">
                                <div className="group absolute inset-0 rounded-full">
                                    {userProfile?.avatar && (
                                        <Image
                                            src={userProfile.avatar || DEFAULT_IMAGE}
                                            alt={userProfile.name || "avatar"}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-full border-4 border-black"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <div className="w-full pt-3 mb-4">
                                <div className="pb-[10px] flex w-full justify-end items-center gap-x-2 mb-4">
                                    <button type="button" className="focus:outline-none inline-flex items-center text-center text-white hover:bg-textPinkPrimary/20 border border-textPinkPrimary font-medium rounded-full text-[15px] px-4 py-1">
                                        Chat
                                    </button>
                                    <div>
                                        <ButtonFollowingHandle data={userProfile} follwed={userProfile.is_following ?? false} />
                                    </div>
                                    <div className="p-2 w-max h-max rounded-full cursor-pointer bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                                        <DotsIcon></DotsIcon>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start text-sm gap-y-4">
                                    <div>
                                        <h2 className="text-base font-bold">{userProfile?.name}</h2>
                                        <span className="text-textGray">
                                            {userProfile?.username}
                                        </span>
                                    </div>
                                    <div>{userProfile?.bio}</div>
                                    <div className="flex items-center gap-x-4">
                                        {userProfile?.location && (
                                            <div className="flex text-textGray">
                                                <LocationIcon />
                                                <span>{userProfile?.location}</span>
                                            </div>
                                        )}
                                        {userProfile?.website && (
                                            <div className="flex text-textGray">
                                                <LinkIcon />
                                                <a href={userProfile?.website}>
                                                    {userProfile?.website.slice(0, 33) + "..."}
                                                </a>
                                            </div>
                                        )}
                                        <div className="flex text-textGray">
                                            <CalendarIcon />
                                            <span>
                                                Đã tham gia{" "}
                                                {formatDateDDMMYYYY(
                                                    userProfile?.created_at?.toString() as string
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mr-4 flex items-center gap-x-[2px]">
                                            <p>100</p>
                                            <span className="text-textGray">Đang theo dõi</span>
                                        </div>
                                        <div className="flex items-center gap-x-[2px]">
                                            <p>112</p>
                                            <span className="text-textGray">Người theo dõi</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                {/* <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
                                    <Link
                                        href={`/profile${username}`}
                                        className={`text-textGray hover:no-underline p-4 text-center ${isActive(
                                            "/profile" + username
                                        )}`}
                                    >
                                        Post
                                    </Link>
                                </div> */}
                            </div>
                            <div className="flex-1 overflow-auto py-4 border-y-[0.5px] border-borderGrayPrimary">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ModalSendChat /> */}
        </React.Fragment>
    );
};

export default GetProfile;
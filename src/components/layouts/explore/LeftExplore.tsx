"use client"
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { BackIcon, CloseExternalEventIcon, CloseIcon, DotsIcon, MagnifyingGlassIcon } from '@/components/SingleUseComponents/Icon';
import { StickyNav } from '@/components/common';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import React from 'react';
import ItemUser from './ItemUser';
import useDebounce from '@/hooks/useDebounce';
import { IUser, TRequestToken, TRequestUser, UserSearchType } from '@/types/userTypes';
import { useSearchUser } from '@/hooks/users/useQuery';
import { EXPLORE_ITEMS } from '@/constant/constants';
import classNames from "classnames"
import ItemUserSearch from './ItemUserSearch';
import { MyContextType, SearchContext } from '@/context/SearchProvider';
import SearchItem from './SearchItem';
import { useMe } from '@/context/UserContext';
import { useSearchExplore } from '@/store/useSearchExplore';
import SimpleBar from 'simplebar-react';
const LeftExplore = () => {
    const searchParams = useSearchParams()
    const slugFilter = searchParams.get('filter') || null;
    const { setSearchValue } = useSearchExplore((state) => state)
    const router = useRouter()
    const { userInfo, setShowClose, setShowListFilter, searchValue, showListFilter, inputRef, showButtonFollow, setShowButtonFollow } = React.useContext(SearchContext) as MyContextType
    const handleBack = () => {
        router.back();
    }
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowClose(false);
                setShowListFilter(false);
            }
            else {
                setShowClose(true);
                setShowListFilter(true);

            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const debounceSearchValue = useDebounce(searchValue as string, 700);
    React.useEffect(() => {
        if (debounceSearchValue !== "") {
            setSearchValue(debounceSearchValue)
        }
    }, [debounceSearchValue])
    const searchUserAll = useSearchUser({
        query: debounceSearchValue,
        limit: 3,
        page: 1,
        follow: "off"
    })
    const searchUserFollowing = useSearchUser({
        query: debounceSearchValue,
        limit: 3,
        page: 1,
        follow: "on"
    })
    return (
        <div className='flex-initial w-[600px] border-r-[0.5px] border-borderGrayPrimary pt-[3px]'>
            <StickyNav>
                <div className="w-full flex items-center justify-between px-[5px]">
                    <BoxIcon>
                        <BackIcon onClick={handleBack} className='h-[21px] w-[21px]'></BackIcon>
                    </BoxIcon>
                    <div className="group-search relative w-[80%] flex">
                        {showListFilter && <div className='absolute searchList hidden transition-all text-white shadow-sm-white rounded-lg bg-black w-full bottom-0 left-0 z-100 transform translate-y-full py-[2px]'>
                            <div className="flex px-4 py-3 justify-between items-center">
                                <h3 className='text-xl font-bold'>Recent</h3>
                                <button className={`rounded-full bg-transparent text-textBlue font-bold px-2 hover:bg-textBlue/10 transition-all py-[2px] text-[15px]`}>
                                    Xóa tất cả
                                </button>
                            </div>
                            <SimpleBar className="w-full max-h-[420px]">
                                {
                                    searchUserAll.data && searchUserAll.data.map((item: UserSearchType) =>
                                        <Link
                                            key={item._id as string}
                                            href={`/profile/v1?profile_username=${item.username}`}
                                        >
                                            <ItemUserSearch
                                                key={item._id as string}
                                                data={item}></ItemUserSearch>
                                        </Link>
                                    )
                                }
                            </SimpleBar>
                        </div>
                        }
                        <SearchItem />
                    </div>
                    <BoxIcon>
                        <DotsIcon className='h-[21px] w-[21px]'></DotsIcon>
                    </BoxIcon>
                </div>
                <div className="flex items-center justify-between mt-[5px]">
                    {EXPLORE_ITEMS.map((item) => {
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
                    !debounceSearchValue ? (
                        <div className="flex justify-center items-center h-full">
                            <p className='text-textGray'>Vui lòng nhập từ khóa</p>
                        </div>
                    ) : slugFilter === "all" ? (
                        searchUserAll.data?.length > 0 ? (
                            <div className="w-full">
                                {searchUserAll.data.map((item: UserSearchType) => {
                                    const isMe = item.username === userInfo?.username;
                                    return (

                                        <div className="w-full transition-all" key={item._id as string}>
                                            <ItemUser userInfo={userInfo as IUser} data={item} isFollow={item?.is_following ?? false} isMe={isMe} />
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <strong className='text-textGray'>Không tìm thấy kết quả cho từ khóa &quot;{debounceSearchValue}&quot;.</strong>
                            </div>
                        )
                    ) : (
                        searchUserFollowing.data?.some((item: any) => item.is_following) ? (
                            <div className="w-full h-full">
                                {searchUserFollowing.data.map((item: UserSearchType) =>
                                    item.is_following ? (
                                        <div
                                            className="w-full transition-all"
                                            key={item._id as string}>
                                            <ItemUser data={item} isFollow={true} />
                                        </div>
                                    ) : null
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <strong className='text-textGray'>Không tìm thấy người dùng cho kết quả &quot;{debounceSearchValue}&quot;.</strong>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default LeftExplore;
"use client"
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { BackIcon, CloseExternalEventIcon, CloseIcon, DotsIcon, MagnifyingGlassIcon } from '@/components/SingleUseComponents/Icon';
import { StickyNav } from '@/components/common';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import React from 'react';
import { IUser, UserSearchType } from '@/types/userTypes';
import { EXPLORE_ITEMS, NOTIFY_ITEMS } from '@/constant/constants';
import classNames from "classnames"
import SearchItem from './SearchItem';
import { MyContextType } from '@/context/SearchProvider';
const LeftNotify = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    // const { userInfo, setShowClose, setShowListFilter, searchValue, showListFilter, inputRef, showButtonFollow, setShowButtonFollow } = React.useContext(SearchContext) as MyContextType
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

            </div>
        </div>
    );
};

export default LeftNotify;
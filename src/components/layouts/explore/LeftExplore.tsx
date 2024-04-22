"use client"
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { BackIcon, CloseExternalEventIcon, CloseIcon, DotsIcon, MagnifyingGlassIcon } from '@/components/SingleUseComponents/Icon';
import { StickyNav } from '@/components/common';
import { GhostButton } from '@/components/common/Button';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import React from 'react';
import ItemUser from './ItemUser';
import useDebounce from '@/hooks/useDebounce';
import { apiInstance } from '@/utils/api';
import { IUser, TRequestToken, TRequestUser, UserSearchType } from '@/types/userTypes';
import { AxiosResponse } from 'axios';
import { getToken } from '@/utils/auth/cookies';
import { useSearchUser } from '@/hooks/users/useQuery';
import { EXPLORE_ITEMS } from '@/constant/constants';
import classNames from "classnames"
import { bstHistory } from '@/utils/historySearchBST';
import ItermUserSearch from './ItermUserSearch';
const user_follow = [
    {
        id: 1,
        name: "TranVanDat"
    }
]
const FILTERALL = "all";
const FILLTERFOLLOWING = "following";
interface IData {
    data: IUser
}
const LeftExplore = () => {
    const [showClose, setShowClose] = React.useState<Boolean>(false);
    const [showListFilter, setShowListFilter] = React.useState<Boolean>(true);
    const [searchValue, setSearchValue] = React.useState<String>("");
    const [listHistorySearch, setListHistorySearch] = React.useState<String[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams()
    const slugFilter = searchParams.get('filter') || null;
    const router = useRouter()
    const handleBack = () => {
        router.back();
    }
    const handleClearSearch = () => {
        setSearchValue("");
        inputRef.current?.focus();
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
    const handleSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.startsWith(' ')) {
            return;
        }
        else {
            setShowClose(true);
            setShowListFilter(true);
            setSearchValue(e.target.value);
            setListHistorySearch((prev) => [...prev, e.target.value]);
            // setListHistorySearch((prev): any => {
            //         const autoCompleteResults = bstHistory.autoComplete(e.target.value);
            //         return [...prev, autoCompleteResults]
            //     }
            // );
        }
    }
    const debounceSearchValue = useDebounce(searchValue as string, 700);
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
    const handleHistorySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            router.push(`/explore?q=${searchValue}&filter=${FILTERALL}`)
            setShowListFilter(false);
            
            // bstHistory.insertKeyword(debounceSearchValue);
        }
    }
    return (
        <div className='flex-initial w-[600px] border-r-[0.5px] border-borderGrayPrimary pt-[3px]'>
            <StickyNav>
                <div className="w-full flex items-center justify-between px-[5px]">
                    <BoxIcon>
                        <BackIcon onClick={handleBack} className='h-[21px] w-[21px]'></BackIcon>
                    </BoxIcon>
                    <div className="group-search relative w-[80%] flex">
                        {showListFilter && <div className='absolute searchList hidden transition-all text-white shadow-sm rounded-lg bg-black w-full bottom-0 left-0 z-100 transform translate-y-full py-[2px]'>
                            <div className="flex px-4 py-3 justify-between items-center">
                                <h3 className='text-xl font-bold'>Recent</h3>
                                <button className={`rounded-full bg-transparent text-textBlue font-bold px-2 hover:bg-textBlue/10 transition-all py-[2px] text-[15px]`}>
                                    Clear all
                                </button>
                            </div>
                            <div className="w-full max-h-[420px] overflow-y-auto">
                            {
                                searchUserAll.data && searchUserAll.data.map((item: UserSearchType) => 
                                    <ItermUserSearch key={item._id as string} data={item}></ItermUserSearch>
                                )
                            }
                            </div>
                        </div>}
                        <React.Fragment>
                            <input type="text" autoComplete='off' onKeyDown={(e) => handleHistorySearch(e)} ref={inputRef } id="search-people" placeholder='Search People' value={searchValue as string} onChange={handleSpace} className="pl-[40px] pr-[12px]  py-[12px] w-full h-[43px] focus:outline-none border focus:border focus:border-bgBlueFocus border-borderGrayPrimary placeholder:text-textGray placeholder:font-normal placeholder:text-sm bg-black rounded-[30px] text-base font-normal" />
                            <MagnifyingGlassIcon className="absolute MagnifyingGlassIcon left-[10px] top-[50%] translate-y-[-50%] text-textGray ml-[3px] font-normal" />
                            {searchValue && showClose && 
                            <label htmlFor='search-people'>
                                <button type='button' onClick={handleClearSearch} className={"p-[3px] border-none outline-none rounded-full cursor-pointer absolute right-[10px] top-[50%] text-black translate-y-[-50%] bg-bgBlueFocus ml-[3px] font-normal"}>
                                    <CloseExternalEventIcon  className='w-[15px] h-[15px]' />
                                </button>
                            </label>
                            }
                        </React.Fragment>
                    </div>
                    <BoxIcon>
                        <DotsIcon className='h-[21px] w-[21px]'></DotsIcon>
                    </BoxIcon>
                </div>
                <div className="flex items-center justify-between mt-[5px]">
                    {EXPLORE_ITEMS.map((item) => {
                        const isActive = String(slugFilter).toLowerCase() === String(item.mode).toLowerCase();
                        return (
                            <div key={item.id} className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
                                <Link
                                    href={`/explore?q=${debounceSearchValue}&filter=${item.mode}`}
                                    className={classNames (`text-textGray hover:no-underline p-4 text-center`, {
                                        "text-white py-4 px-2 border-b-[3px] box-border border-textBlue transition" : isActive,
                                        "": !isActive
                                    })}
                                >
                                    {item.title}
                                </Link>
                            </div>
                        )
                    })}
                    {/* <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
                        <Link
                            href=""
                            className={`text-textGray hover:no-underline p-4 text-center ${isActive(
                                "/explore"
                            )}`}
                        >
                            Tweet
                        </Link>
                    </div>
                    <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
                        <Link
                            href=""
                            className={`text-textGray hover:no-underline p-4 text-center ${isActive(
                                "/explore"
                            )}`}
                        >
                            People
                        </Link>
                    </div> */}
                </div>
            </StickyNav>
            <div className="py-4 border-t-[1px] border-borderGrayPrimary">
                {(searchUserAll.data?.length > 0 && slugFilter) ? <div className="w-full h-full">
                        {
                            searchUserAll.data.map((item: UserSearchType) => <div key={item._id as string} className="w-full transition-all"> <ItemUser data={item} isFollow = {false}/> </div>)
                        }
                    {
                        // Array.from({ length: 20 }).map((item: any, index) =>
                        //     <div className="w-full transition-all" key={index}>
                        //         <ItemUser data isFollow = {true}/>
                        //     </div>
                        // )
                        searchUserFollowing.data.map((item: UserSearchType) => <div key={item._id as string} className="w-full transition-all"> <ItemUser data={item} isFollow = {true}/> </div>)
                    }
                </div> : <div className="flex justify-center items-center">
                    <strong>No results for &quot;Tàiasnaknskaskasnkasaksmasasas&quot;.</strong>
                </div>}
            </div>
        </div>
    );
};

export default LeftExplore;
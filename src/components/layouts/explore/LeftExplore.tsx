"use client"
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { BackIcon, CloseExternalEventIcon, CloseIcon, DotsIcon, MagnifyingGlassIcon } from '@/components/SingleUseComponents/Icon';
import { StickyNav } from '@/components/common';
import { GhostButton } from '@/components/common/Button';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation"
import React from 'react';
const user_follow = [
    {
        id: 1,
        name: "TranVanDat"
    }
]
const LeftExplore = () => {
    const [isHover, setIsHover] = React.useState<Boolean>(false);
    const [showClose, setShowClose] = React.useState<Boolean>(false);
    const [searchValue, setSearchValue] = React.useState<String>("");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const router = useRouter()
    const pathname = usePathname();
    const isActive = (path: string) => {
        return pathname === path
            ? "text-white py-4 px-2 border-b-[3px] box-border border-textBlue transition"
            : "";
    };
    const handleChange = () => {
        setIsHover((prev) => !prev);
    }
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
            }
            else {
                setShowClose(true);
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
            setSearchValue(e.target.value);
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
                        <div className='absolute searchList hidden transition-all text-white shadow-sm rounded-lg bg-black w-full bottom-0 left-0 z-100 transform translate-y-full py-[2px]'>
                            <div className="flex px-4 py-3 justify-between items-center">
                                <h3 className='text-xl font-bold'>Recent</h3>
                                <button className={`rounded-full bg-transparent text-textBlue font-bold px-2 hover:bg-textBlue/10 transition-all py-[2px] text-[15px]`}>
                                    Clear all
                                </button>
                            </div>
                            <div className="w-full max-h-[420px] overflow-y-auto">
                            {
                                Array.from({length: 20}).map((item:any, index) => 
                                    <div key={index} className="w-full flex items-center cursor-pointer justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray">
                                        <div className=" w-full flex items-center">
                                            <div className="px-4 text-white font-medium"><MagnifyingGlassIcon className="w-[22px] h-[22px]"/></div>
                                            <p className="font-medium text-[15px] w-full">Trần Văn Đạt</p>
                                            <BoxIcon className={"p-1 hover:bg-textBlue/10 mr-4 text-bgBlueFocus"}>
                                                <CloseExternalEventIcon className='w-[15px] h-[15px]'/>
                                            </BoxIcon>
                                        </div>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                        <React.Fragment>
                            <input type="text" autoComplete='off' ref={inputRef } id="search-people" placeholder='Search People' value={searchValue as string} onChange={handleSpace} className="pl-[40px] pr-[12px]  py-[12px] w-full h-[43px] focus:outline-none border focus:border focus:border-bgBlueFocus border-borderGrayPrimary placeholder:text-textGray placeholder:font-normal placeholder:text-sm bg-black rounded-[30px] text-base font-normal" />
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
                    <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
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
                    </div>
                </div>
            </StickyNav>
            <div className="py-4 border-t-[1px] border-borderGrayPrimary">
                {user_follow.length > 0 ? <div className="w-full h-full">
                    <div className="w-full transition-all">
                        <div className="w-full flex items-center cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray rounded-[5px]">
                            <div className=" w-full flex items-start gap-x-2">
                                <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
                                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                                    <img
                                        src="/image/avatar.jpg"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div> */}
                                <div className="w-full ">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-base">Trần Văn Đạt</p>
                                            <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-normal text-[15px] text-textGray">@tranvandatevondev</p>
                                        </div>
                                        <button className="rounded-full bg-white text-textBlack transition-all hover:bg-bgHoverWhite/80 font-bold px-4 py-1 text-[15px]">
                                            Follow
                                        </button>
                                    </div>
                                    <p className="font-normal text-[15px]">📞 Hotline : +84 888847346 ✉️ hieutai.contact@gmail.com Support Facebook, Instagram, Google</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        Array.from({ length: 20 }).map((item: any, index) =>
                            <div className="w-full transition-all" key={index}>
                                <div className="w-full flex items-center cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray rounded-[5px]">
                                    <div className=" w-full flex items-start gap-x-2">
                                        <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
                                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                                            <img
                                                src="/image/avatar.jpg"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full ">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-base">Trần Văn Đạt</p>
                                                    <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-normal text-[15px] text-textGray">@tranvandatevondev</p>
                                                </div>
                                                <button onMouseEnter={handleChange} onMouseLeave={handleChange} className={`rounded-full ${!isHover ? "bg-transparent border-[0.5px] border-[#333639] text-white" : "bg-bgPinkGhost/20 border-[0.5px] border-bgPinkGhost/40 text-bgPinkGhost"} font-bold px-4 py-1 text-[15px]`}>
                                                    {isHover ? "Unfollow" : "Following"}
                                                </button>
                                            </div>
                                            <p className="font-normal text-[15px]">📞 Hotline : +84 888847346 ✉️ hieutai.contact@gmail.com Support Facebook, Instagram, Google</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div> : <div className="flex justify-center items-center">
                    <strong>No results for &quot;Tàiasnaknskaskasnkasaksmasasas&quot;.</strong>
                </div>}
            </div>
        </div>
    );
};

export default LeftExplore;
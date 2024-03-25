import { DotsIcon, MagnifyingGlassIcon, PenToSquareIcon } from '@/components/SingleUseComponents/Icon';
import React from 'react';

const LeftMessage = () => {
    return (
        <div className="border-r-[0.5px] border-borderGrayPrimary">
            <div className="w-[321px] max-w-[321px] relative h-screen text-white">
                <div className="flex flex-col w-full absolute inset-0">
                    <div className="fixed w-[321px] h-max top-0 p-2 z-[100] bg-black">
                        <div className="flex justify-between items-center pb-2">
                            <h2 className="text-xl font-bold">Messages</h2>
                            <div className="flex items-center gap-x-[10px]">
                                <div className="p-2 w-max h-max rounded-full cursor-pointer bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                                    <DotsIcon className=""></DotsIcon>
                                </div>
                                <div className="p-2 w-max h-max rounded-full cursor-pointer bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                                    <PenToSquareIcon />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex w-full pt-[12px]">
                            <MagnifyingGlassIcon className="absolute left-[10px] top-[50%] translate-y-[-25%] text-textGray ml-[3px] font-normal"/>
                            <input type="text" placeholder='Search Direct Messages' className="pl-[40px] pr-[10px]  py-[5px] h-[36px] focus:outline-none border focus:border focus:border-borderBlue border-borderGrayPrimary placeholder:text-textGray placeholder:font-normal placeholder:text-sm bg-black rounded-[30px] w-full text-sm font-light" />
                        </div>
                    </div>
                    <div className="max-h-[608px] mt-[108px] overflow-auto">
                        {
                            Array.from({length: 20}).map((item:any, index) => 
                            <div className="px-2 w-full group transition-all" key={index}>
                            <div className="flex items-center relative cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray rounded-[5px]">
                                <div className="flex items-center gap-x-2">
                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                        <img
                                            src="/image/avatar.jpg"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-base">Trần Văn Đạt</p>
                                        <div className="text-textGray flex items-center gap-x-[10px]">
                                        <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-normal text-sm">Trần Văn Đạt </p>
                                        <p className='font-sm'>8 giờ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden absolute group-hover:block top-1/2 right-[20px] translate-y-[-50%] p-2 rounded-full bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                                    <DotsIcon></DotsIcon>
                                </div>
                            </div>
                        </div>
                            )
                        }
                        {/* <div className="px-2 w-full group">
                            <div className="flex items-center relative cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray rounded-[5px]">
                                <div className="flex items-center gap-x-2">
                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                        <img
                                            src="/image/avatar.jpg"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p>Trần Văn Đạt</p>
                                        <div className="text-textGray flex items-center gap-x-[10px]">
                                        <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden">Trần Văn Đạt </p>
                                        <p className=''>8 giờ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden absolute group-hover:block top-1/2 right-[20px] translate-y-[-50%] p-2 rounded-full bg-iconBackgroundGray hover:bg-iconHoverBackgroundGray">
                                    <DotsIcon></DotsIcon>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftMessage;
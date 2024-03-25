"use client"
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { BackIcon, CirclePlusIcon, DotsIcon, EmojiSmileFillIcon, ExclamationIcon, GifIcon, ImagesIcon, LikeIcon, PhoneIcon, StickerSlimeIcon, VideoCameraIcon } from '@/components/SingleUseComponents/Icon';
import { StickyNav } from '@/components/common';
import React from 'react';

const Conversation = () => {
    return (
        // <div className="px-2 w-full border border-red-500">
        <React.Fragment>
            {/* <StickyNav className={"w-full"}>
                    <div className="flex items-center pt-1 px-2">
                        <div className="px-2 w-full">
                                <div className="flex items-center relative cursor-pointer select-none justify-between text-sm py-[10px] my-[2px] hover:bg-iconBackgroundGray rounded-[5px]">
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
                            </div>
                    </div>
                </StickyNav> */}
            <div className="w-[670px] max-w-[670px] h-screen max-h-screen">
                <StickyNav className={"w-full"}>
                    <div className="flex items-center border-b-[0.5px] border-borderGrayPrimary">
                        <div className="px-2 w-full">
                            <div className="flex items-center cursor-pointer select-none justify-between text-sm py-[10px] my-[2px]">
                                <div className="flex items-center gap-x-2">
                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                        <img
                                            src="/image/avatar.jpg"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg leading-[18px]">Trần Văn Đạt</p>
                                        <div className="text-textGray flex items-center gap-x-[10px]">
                                            <p className="text-sm leading-[14px]">Đang hoạt động </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-[8px] text-textBlue">
                                    <BoxIcon>
                                        <PhoneIcon></PhoneIcon>
                                    </BoxIcon>
                                    <BoxIcon>
                                        <VideoCameraIcon></VideoCameraIcon>
                                    </BoxIcon>
                                    <BoxIcon>
                                        <ExclamationIcon></ExclamationIcon>
                                    </BoxIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                </StickyNav>
                <div className="max-h-[588px] h-[588px] overflow-auto px-[6px]">
                    <div
                        className="max-w-[70%] w-max text-left py-1 px-2 rounded-2xl mb-1 ml-auto bg-blue-500 text-white"
                    >
                        <p className="text-sm">123</p>
                    </div>
                    <div
                        className="max-w-[70%] w-max text-left py-1 px-2 rounded-2xl mb-1 ml-auto bg-blue-500 text-white"
                    >
                        <p className="text-sm">123 tran van dat</p>
                    </div>
                    <div
                        className="max-w-[70%] w-max text-left py-1 px-2 rounded-2xl mb-1 ml-auto bg-blue-500 text-white"
                    >
                        <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div
                        className="max-w-[70%] w-max text-left py-1 px-2 rounded-2xl mb-1 ml-auto bg-blue-500 text-white"
                    >
                        <p className="text-sm">Thanks so much!</p>
                    </div>
                    <div
                        className="max-w-[70%] w-max text-left py-1 px-2 rounded-2xl mb-1 ml-auto bg-blue-500 text-white"
                    >
                        <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="py-[10px] px-2 flex items-center gap-x-[5px]">
                    <div className="flex items-center gap-x-[5px] text-textBlue">
                        <BoxIcon className={"p-[3px]"}>
                            <CirclePlusIcon className='h-[21px] w-[21px]'></CirclePlusIcon>
                        </BoxIcon>
                        <BoxIcon className={"p-[3px]"}>
                            <ImagesIcon className='h-[21px] w-[21px]'></ImagesIcon>
                        </BoxIcon>
                        <BoxIcon className={"p-[3px]"}>
                            <StickerSlimeIcon className='h-[21px] w-[21px]'></StickerSlimeIcon>
                        </BoxIcon>
                        <BoxIcon className={"p-[3px]"}>
                            <GifIcon className='h-[21px] w-[21px]'></GifIcon>
                        </BoxIcon>
                    </div>
                    <div className="relative flex-1">
                        <input type="text" placeholder='Search Direct Messages' className="pl-[10px] pr-[40px]  py-[5px] h-[36px] focus:outline-none border focus:border focus:border-borderBlue border-borderGrayPrimary placeholder:text-textGray placeholder:font-normal placeholder:text-sm bg-black rounded-[30px] text-sm font-light w-full"/>
                        <BoxIcon className={"p-[2px] absolute right-1 top-1/2 -translate-y-1/2 text-textBlue"}>
                            <EmojiSmileFillIcon className='h-[21px] w-[21px]'></EmojiSmileFillIcon>
                        </BoxIcon>
                    </div>
                        <BoxIcon className={"p-2 text-textBlue"}>
                            <LikeIcon className='h-[21px] w-[21px]'></LikeIcon>
                        </BoxIcon>
                </div>
            </div>
        </React.Fragment>
        // </div>
    );
};

export default Conversation;
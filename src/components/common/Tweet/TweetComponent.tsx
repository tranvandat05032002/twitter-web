import { DotIcon, DotsIcon } from '@/components/SingleUseComponents/Icon';
import { optionsArea } from '@/constant/tweet';
import { Tweet } from '@/types/tweetTypes';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TweetAction from './TweetAction';

const TweetComponent = ({ tweet, time }: { tweet: Tweet, time: string }) => {
    return (
        <div
            key={tweet._id}
            className="p-4 pb-2 border-b-[0.25px] border-borderGrayPrimary flex space-x-4"
        >
            <div className="w-10 h-10 rounded-full overflow-hidden flex-none">
                <Avatar
                    src={tweet.user.avatar ? tweet.user.avatar : "/image/avatar.jpg"}
                    className="object-fit-cover"
                    sx={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className="flex flex-col w-full pr-[25px]">
                <div className="pb-2">
                    <div className="mb-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center w-full text-base justify-between text-textGray">
                                <div className="flex items-center space-x-1">
                                    <Link className="no-underline hover:no-underline" href={`/profile/v1?profile_username=${tweet.user.username}`}>
                                        <h2 className="text-base font-bold text-white">
                                            {tweet.user.name}
                                        </h2>
                                    </Link>
                                    <p>{tweet.user.username}</p>
                                </div>
                                <div className="cursor-pointer hover:bg-bgHoverBlue group rounded-full">
                                    <DotsIcon className="text-textGray group-hover:text-textBlue "></DotsIcon>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="text-textGray text-sm">{time}</div>
                            <div>
                                <DotIcon style={{ color: "#71767b" }}></DotIcon>
                            </div>
                            <div className="text-textGray">
                                {
                                    optionsArea.map((area) => area.id === tweet.audience ? <area.icon title={area.label} /> : null)
                                }

                            </div>
                        </div>
                    </div>
                    <div className="text-white text-base mb-4">
                        {tweet.content}
                    </div>
                    {tweet.medias.length > 0 && (
                        <div className={`relative w-full h-[510px] aspect-square rounded-lg overflow-hidden grid ${GridImages(tweet.medias.length)} gap-1 p-1`}>
                            {tweet.medias.length === 1 && (
                                <div className="relative w-full h-full rounded overflow-hidden">
                                    <Image
                                        src={tweet.medias[0].url}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {tweet.medias.length === 2 && (
                                <>
                                    {tweet.medias.map((media, index) => (
                                        <div key={index} className="relative w-full h-full rounded overflow-hidden">
                                            <Image
                                                src={media.url}
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </>
                            )}

                            {tweet.medias.length === 3 && (
                                <>
                                    <div className="relative w-full h-full col-span-2 rounded overflow-hidden">
                                        <Image
                                            src={tweet.medias[0].url}
                                            alt=""
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative w-full h-full rounded overflow-hidden">
                                        <Image
                                            src={tweet.medias[1].url}
                                            alt=""
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative w-full h-full rounded overflow-hidden">
                                        <Image
                                            src={tweet.medias[2].url}
                                            alt=""
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </>
                            )}

                            {tweet.medias.length >= 4 && (
                                <>
                                    {tweet.medias.slice(0, 3).map((media, index) => (
                                        <div key={index} className="relative w-full h-full rounded overflow-hidden">
                                            <Image
                                                src={media.url}
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                    <div className="relative w-full h-full rounded overflow-hidden cursor-pointer">
                                        <Image
                                            src={tweet.medias[3].url}
                                            alt=""
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-lg font-semibold">
                                            +{tweet.medias.length - 3}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <TweetAction tweet={tweet} />
            </div>
        </div>
    );
};

function GridImages(imageCount: number): string {
    let gridClasses = 'grid ';
    if (imageCount === 1) {
        gridClasses += 'grid-cols-1 grid-rows-1';
    } else if (imageCount === 2) {
        gridClasses += 'grid-cols-1 grid-rows-2';
    } else if (imageCount >= 3) {
        gridClasses += 'grid-cols-2 grid-rows-2';
    }
    return gridClasses
}

export default TweetComponent;
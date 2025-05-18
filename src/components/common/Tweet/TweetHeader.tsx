import { DotIcon } from '@/components/SingleUseComponents/Icon';
import { optionsArea } from '@/constant/tweet';
import { Tweet } from '@/types/tweetTypes';
import { IUser } from '@/types/userTypes';
import { GridImages } from '@/utils/handlers';
import Image from 'next/image';
import React from 'react';

const TweetHeader = ({ tweet, user, time }: { tweet: Tweet, user: IUser, time: String }) => {
    return (
        <React.Fragment>
            <div className='px-2'>
                <div className="flex items-center mb-4 mt-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                        <Image
                            src={user.avatar || '/image/avatar.jpg'}
                            alt="Avatar"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                    <div className="ml-[10px]">
                        <p>{user.name}</p>
                        <div className="flex items-center space-x-1">
                            <div className="text-textGray text-sm">{time}</div>
                            <div>
                                <DotIcon style={{ color: '#71767b' }} />
                            </div>
                            <div className="text-textGray">
                                {optionsArea.map((area) =>
                                    area.id === tweet.audience ? (
                                        <area.icon key={area.id} title={area.label} />
                                    ) : null
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-white text-base mb-4">
                    {tweet.content}
                </div>
            </div>

            {tweet.medias.length > 0 && (
                <div
                    className={`relative w-full h-[510px] aspect-square rounded-lg overflow-hidden grid ${GridImages(
                        tweet.medias.length
                    )} gap-1 p-1`}
                >
                    {tweet.medias.slice(0, 4).map((media, index) => (
                        <div
                            key={index}
                            className="relative w-full h-full rounded overflow-hidden"
                        >
                            <Image
                                src={media.url}
                                alt=""
                                fill
                                className="object-cover"
                            />
                            {index === 3 && tweet.medias.length > 4 && (
                                <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-lg font-semibold">
                                    +{tweet.medias.length - 3}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </React.Fragment>
    );
};

export default TweetHeader;
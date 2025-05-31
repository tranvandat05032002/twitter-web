'use client'
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { CloseExternalEventIcon, DotsIcon } from '@/components/SingleUseComponents/Icon';
import { useMe } from '@/context/UserContext';
import { useGetStories } from '@/hooks/users/useQuery';
import { Story, StoryGroup } from '@/types/storyTypes';
import { formatStoryTime, formatTweetTime } from '@/utils/handlers';
import { Avatar } from '@mui/material';
import { parseISO } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosPause, IoIosPlay, IoMdVolumeOff, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoVolumeMediumSharp } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUnlink } from "react-icons/fa";
import StoryProgress from './StoryProgress';
import StoryViewerCount from './StoryViewerCount';
import { FaRegEye } from "react-icons/fa6";
import Tippy from "@tippyjs/react/headless";
import { useDeleteStory } from '@/hooks/users/useMutation';
import { toast } from 'react-toastify';

const DURATION = 10000  //10s

const StoryView = ({ user_id }: { user_id: string }) => {
    const router = useRouter();
    const { mutate: deleteStory, isSuccess } = useDeleteStory()
    const [storyIndex, setStoryIndex] = React.useState(0);
    const [playStory, setPlayStory] = React.useState(true);
    const { user: currentUser } = useMe();
    const [noMoreStory, setNoMoreStory] = React.useState(false);
    const [muteVolumStory, setMuteVolumStory] = React.useState(false);
    const { data } = useGetStories()
    const storyGroup = data?.result.stories as StoryGroup[]
    const [showViewersList, setShowViewersList] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [isResetProgress, setIsResetProgress] = React.useState(false);



    const user = React.useMemo(() => storyGroup?.find((id) => id._id === user_id), [storyGroup, user_id]);
    const currentStoryGroup = React.useMemo(() => {
        return user?.stories?.[storyIndex] as Story;
    }, [user, storyIndex]);

    const date = parseISO(currentStoryGroup?.created_at.toString());
    const time = formatStoryTime(date)

    const handleNextStory = () => {
        const currentUserIndex = storyGroup.findIndex((u) => u._id === user_id);
        const hasNextStory = storyIndex + 1 < (user?.stories?.length ?? 0);

        if (hasNextStory) {
            setStoryIndex((prev) => prev + 1);
        } else {
            const nextUser = storyGroup[currentUserIndex + 1];
            if (nextUser) {
                router.push(`/stories/${nextUser._id}`);
            } else {
                setNoMoreStory(true)
            }
        }
    }

    const isStoryMe = currentUser?._id === user_id;
    const countViewers = currentStoryGroup?.viewers.length

    React.useEffect(() => {
        setStoryIndex(0);
        setNoMoreStory(false);
    }, [user_id]);

    const handlePlayStory = () => {
        setPlayStory((prev) => !prev);
    };

    const handleMuteVolumStory = () => {
        setMuteVolumStory((prev) => !prev);
    };

    const handleDeleteStory = () => {
        if (!currentStoryGroup._id) return

        deleteStory(currentStoryGroup._id, {
            onSuccess: () => {
                toast.success("Xóa story thành công", {
                    pauseOnHover: false,
                });
                if (storyIndex + 1 < (user?.stories?.length ?? 0)) {
                    setIsResetProgress(true)
                    setStoryIndex(prev => prev);
                } else {
                    handleNextStory();
                }
            },
            onError: (err) => {
                toast.error("Xóa story thất bại", {
                    pauseOnHover: false,
                });
            }
        })
    }

    if (noMoreStory) {
        return <div className="text-center mt-20 text-gray-400">Không còn tin để xem</div>;
    }

    if (!currentStoryGroup) {
        return <div className="text-center mt-20 text-gray-400">Không có tin</div>;
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-black px-4 py-6 h-screen overflow-hidden relative">
            {/* Previous Button */}
            <button
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-[12px] bg-gray-700/50 rounded-full text-white ${storyIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600/50'}`}
                onClick={() => setStoryIndex(prev => Math.max(0, prev - 1))}
                disabled={storyIndex === 0}
            >
                <IoIosArrowBack size={30} />
            </button>

            <div className="w-[43%] flex-1 flex flex-col bg-transparent rounded-lg overflow-hidden shadow-xl border border-borderGrayPrimary relative">
                {/* Use the new ProgressStory component */}
                <StoryProgress
                    user={user}
                    playStory={playStory}
                    storyIndex={storyIndex}
                    isResetProgress={isResetProgress}
                    handleNextStory={handleNextStory}
                />

                {/* Header */}
                <div className='flex items-center justify-between p-4'>
                    <div className="flex items-center">
                        <Avatar
                            src={user?.user.avatar as string}
                            alt={user?.user.name as string}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                            <div className="font-semibold text-white flex items-center">
                                {user?.user.name}
                                <span className="ml-2 text-xs text-gray-400">{time}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                        {playStory ? (
                            <IoIosPause
                                className="w-[24px] h-[24px] cursor-pointer text-white"
                                onClick={handlePlayStory}
                            />
                        ) : (
                            <IoIosPlay
                                className="w-[24px] h-[24px] cursor-pointer text-white"
                                onClick={handlePlayStory}
                            />
                        )}

                        {muteVolumStory ? (
                            <IoMdVolumeOff
                                className="w-[24px] h-[24px] cursor-pointer text-white"
                                onClick={handleMuteVolumStory}
                            />
                        ) : (
                            <IoVolumeMediumSharp
                                className="w-[24px] h-[24px] cursor-pointer text-white"
                                onClick={handleMuteVolumStory}
                            />
                        )}
                        <Tippy
                            interactive
                            placement='bottom'
                            offset={[20, 12]}
                            visible={visible}
                            onClickOutside={() => setVisible(false)}
                            render={(attrs) => (
                                <div
                                    className="bg-black text-white p-2 rounded-lg shadow-xl border-[0.5px] border-borderGraySecond"
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <div className='flex items-center space-x-2'>
                                        <FaUnlink />
                                        <button
                                            type="button"
                                            className="w-full text-left py-2 text-sm cursor-pointer hover:bg-iconBackgroundGray"
                                        // onClick={handleOpenEditComment}
                                        >
                                            Sao chép liên kết
                                        </button>
                                    </div>

                                    <div className='flex items-center space-x-2'>
                                        <RiDeleteBin5Fill />
                                        <button
                                            type="button"
                                            className="w-full text-left py-2 text-sm cursor-pointer hover:bg-iconBackgroundGray"
                                            onClick={handleDeleteStory}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            )}
                        >
                            <div onClick={() => setVisible(v => !v)} className="cursor-pointer">
                                <DotsIcon className="w-[24px] h-[24px] cursor-pointer text-white" />
                            </div>
                        </Tippy>
                    </div>
                </div>

                {/* Image content */}
                <div className="flex-1 flex items-center justify-center min-h-0 w-full p-5 relative">
                    <Image
                        src={currentStoryGroup.medias.url}
                        alt="story"
                        fill
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
                {isStoryMe &&
                    <div className="flex items-center space-x-4 mb-2 ml-2 cursor-pointer">
                        <StoryViewerCount viewers={currentStoryGroup.viewers} setShowViewersList={setShowViewersList} />
                    </div>
                }

                {showViewersList &&
                    <div className="absolute bottom-0 left-0 right-0 bg-black/95 py-4 h-1/2 rounded-tl-xl rounded-tr-xl border-[0.5px] border-borderGrayPrimary flex flex-col transition-all">
                        <div className="flex justify-between items-center mb-4 px-4">
                            <div className='flex items-center space-x-2 text-textGray font-semibold text-lg'>
                                {countViewers > 0 && <FaRegEye />}
                                <span>{countViewers > 0 ? countViewers : "chưa có"} người xem</span>
                            </div>
                            <BoxIcon className="mr-1 bg-iconBackgroundGray/60" onClick={() => setShowViewersList(false)}>
                                <CloseExternalEventIcon className='w-[20px] h-[20px]' />
                            </BoxIcon>
                        </div>

                        {countViewers > 0 ?
                            currentStoryGroup.viewers.map((user) => (
                                <div className="flex-1 overflow-y-auto px-1" key={user._id}>
                                    <div className="py-[12px] rounded-md hover:bg-gray-500/50 ">
                                        <div className='px-[12px] flex items-center space-x-3'>
                                            <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                                            <div className="font-semibold">{user.name}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <p className='text-textGray text-center my-auto'>
                                Không có người xem
                            </p>
                        }
                    </div>
                }
            </div>

            {/* Next Button */}
            <BoxIcon>
                <button
                    className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-10 p-[12px] bg-gray-700/50 rounded-full text-white ${storyIndex === (user?.stories?.length ?? 0) - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600/50'}`}
                    onClick={handleNextStory}
                    disabled={storyIndex === (user?.stories?.length ?? 0) - 1}
                >
                    <IoIosArrowForward size={30} />
                </button>
            </BoxIcon>
        </div >
    );
};

export default StoryView;
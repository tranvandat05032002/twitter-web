'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CloseExternalEventIcon, TwitterIconVerySmall } from '@/components/SingleUseComponents/Icon';
import { routers } from '@/utils/router/routers';
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { StickyNav } from '@/components/common';
import { FaPlus } from 'react-icons/fa6';
import Image from 'next/image';
import { Avatar } from '@mui/material';
import StorySidebarItem from '@/components/common/Story/StorySidebarItem';
import { useMe } from '@/context/UserContext';
import { useStory } from '@/context/StoryContext';

const StorySidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user: currentUser } = useMe();
    const storiesGroup = useStory()
    const [shoeCreateStory, setShowCreateStory] = React.useState(false)
    const selectedId = String(pathname.split('/').pop()) || '';

    const handleClose = () => {
        router.back();
    }

    React.useEffect(() => {
        if (selectedId === "create") {
            setShowCreateStory(true);
        } else {
            setShowCreateStory(false);
        }
    }, [selectedId]);

    const handleCreateStory = () => {
        setShowCreateStory(true)
        router.push("/stories/create")
    }

    return (
        <aside className="w-80 bg-black h-screen flex flex-col border-r-[0.5px] border-borderGrayPrimary">
            <StickyNav>
                <div className="flex px-2 py-4 border-b-[0.5px] border-gray-700 backdrop-blur bg-black/40">
                    <div className="flex items-center">
                        <BoxIcon className="mr-1 bg-iconBackgroundGray/60" onClick={handleClose}>
                            <CloseExternalEventIcon className='w-[25px] h-[25px]' />
                        </BoxIcon>
                        <TwitterIconVerySmall
                            onClick={() => router.push(routers.homePage)}
                        ></TwitterIconVerySmall>
                    </div>
                </div>
            </StickyNav>
            <div className="flex flex-1 flex-col p-2 min-h-0 overflow-y-auto">
                {/* Phần tiêu đề + Tạo tin */}
                {
                    shoeCreateStory ?
                        <div>
                            <div className='mb-4'>
                                <h2 className="text-2xl font-bold">Tin của bạn</h2>
                            </div>
                            <div className="flex items-center space-x-3 mb-4 cursor-default">
                                <div className="relative w-12 h-12 rounded-full">
                                    <Image
                                        alt={currentUser?.name as string}
                                        fill
                                        src={currentUser?.avatar as string}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="font-semibold">{currentUser?.name}</div>
                            </div>
                        </div>
                        :
                        (
                            <React.Fragment>
                                <div>
                                    <div className='mb-4'>
                                        <h2 className="text-2xl font-bold">Tin</h2>
                                    </div>
                                    <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={handleCreateStory}>
                                        <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-2xl text-textBlue">
                                            <FaPlus />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Tạo tin</div>
                                            <div className="text-xs text-gray-400">Bạn có thể chia sẻ ảnh hoặc viết gì đó.</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 mb-2">Tất cả tin</div>
                                </div>

                                {/* Phần scroll riêng cho danh sách tin */}
                                <div className="space-y-2">
                                    {storiesGroup && storiesGroup.map((storyGroup) => (
                                        <StorySidebarItem key={storyGroup._id} story={storyGroup} selectedId={selectedId} />
                                    ))}
                                </div>
                            </React.Fragment>
                        )
                }

            </div>
        </aside>
    );
};

export default StorySidebar;
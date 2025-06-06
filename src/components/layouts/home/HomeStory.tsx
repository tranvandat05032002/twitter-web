'use client'
import { useMe } from '@/context/UserContext';
import { useGetStories } from '@/hooks/users/useQuery';
import { SlideItem, StoryGroup } from '@/types/storyTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HomeStory() {
    const prevRef = React.useRef<HTMLButtonElement>(null);
    const nextRef = React.useRef<HTMLButtonElement>(null);
    const [canGoPrev, setCanGoPrev] = React.useState(false);
    const { user: currentUser } = useMe()
    const swiperRef = React.useRef<SwiperType>();
    const { data } = useGetStories()
    const stories = data?.result.stories


    const slides: SlideItem[] = [
        {
            user_id: '',
            name: 'Tạo tin',
            avatar: currentUser?.avatar as string,
            isCreate: true,
            stories: [],
        },
        ...(stories?.map((group) => ({
            user_id: group._id,
            name: group.user.name,
            avatar: group.user.avatar as string,
            isCreate: false,
            stories: group.stories, // hoặc group.stories nếu bạn chỉ cần mảng story
        })) ?? [])
    ]
    const handleSlideChange = (swiper: any) => {
        setCanGoPrev(swiper.activeIndex > 0)
    }
    React.useEffect(() => {
        if (
            swiperRef.current &&
            swiperRef.current.navigation &&
            prevRef.current &&
            nextRef.current
        ) {
            const navigationParams = swiperRef.current.params.navigation;
            // Cập nhật lại navigation, sau đó init & update
            if (navigationParams && typeof navigationParams === 'object') {
                // Cập nhật lại navigation, sau đó init & update
                navigationParams.prevEl = prevRef.current;
                navigationParams.nextEl = nextRef.current;
                swiperRef.current.navigation.destroy(); // Hủy navigation cũ nếu có
                swiperRef.current.navigation.init();
                swiperRef.current.navigation.update();
            }
        }
    }, [prevRef.current, nextRef.current]);

    //TODO: Get story unseen index

    return (
        <div className="relative flex overflow-x-auto gap-2 scrollbar-hide mt-2">
            <Swiper
                className='custom-swiper-slide'
                navigation={{
                    enabled: true,
                    nextEl: nextRef.current,
                    prevEl: prevRef.current,
                    disabledClass: 'opacity-40',
                }}
                onSlideChange={handleSlideChange}
                onBeforeInit={(swiper: any) => {
                    if (typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                modules={[Navigation]}
                slidesPerView={5}
                slidesPerGroup={2}
                spaceBetween={12}
                loop={slides.length >= 5}
            >
                {slides && slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <Link href={`/stories/${slide.isCreate ? "create" : slide.user_id}`}>
                            <div
                                className={`w-[120px] h-[200px] rounded-lg overflow-hidden relative cursor-pointer`}
                            >
                                <div className="relative flex justify-center w-full h-full" >
                                    {!slide.isCreate &&
                                        <React.Fragment>
                                            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/60 to-transparent z-10 rounded-t-lg" />
                                            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-b-lg" />
                                        </React.Fragment>
                                    }
                                    <Image
                                        src={
                                            slide.isCreate
                                                ? slide.avatar
                                                : (slide.stories.length > 0 &&
                                                    slide.stories[0].medias.type === 0 &&
                                                    slide.stories[0].medias.url) as string
                                        }
                                        alt={slide.name}
                                        width={120}
                                        height={200}
                                        className={`object-cover rounded-lg transition-transform duration-300 hover:scale-[1.02] ${slide.isCreate
                                            ? 'opacity-40 w-[120px] h-[140px]'
                                            : 'w-[120px] h-[200px] hover:opacity-80'
                                            }`}
                                    />
                                </div>

                                {slide.isCreate ? (
                                    <div className="absolute inset-0 flex flex-col justify-end items-center p-2">
                                        <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full mb-1 z-20">
                                            <span className="text-white text-xl">+</span>
                                        </div>
                                        <p className="text-sm text-white text-center z-20">Tạo tin</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-blue-500 overflow-hidden z-10 hover:bg-[rgba(29,155,240,0.1)]">
                                            <Image
                                                src={slide.avatar}
                                                alt="story-avatar"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <p className="absolute bottom-2 left-2 right-2 text-sm text-white font-semibold truncate z-10">
                                            {slide.name}
                                        </p>
                                    </>
                                )}
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
                {slides.length < 5 &&
                    Array.from({ length: 5 - slides.length }).map((_, idx) => (
                        <SwiperSlide key={`blank-${idx}`}>
                            <div className="w-[120px] h-[200px] rounded-lg bg-translate" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className="absolute left-0 top-0 right-0 bottom-0 text-[25px] transition">
                <button
                    ref={prevRef}
                    className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] text-textGray rounded-full w-9 h-9 flex items-center justify-center shadow  ${!canGoPrev && 'hidden'}`}
                >
                    <IoIosArrowBack className="" />
                </button>
                <button
                    ref={nextRef}
                    className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] text-textGray rounded-full w-9 h-9 flex items-center justify-center shadow "
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    )
}

import Image from 'next/image';
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HomeStory() {
    const stories = [
        {
            name: "Tạo tin",
            avatar: "/image/avatar.jpg",
            isCreate: true,
        },
        {
            name: "Bảo Quốc",
            avatar: "/image/avatar.jpg",
        },
        {
            name: "Đói Quá Không Ngủ...",
            avatar: "/image/avatar.jpg",
        },
        {
            name: "Việt Nam Hùng Cường",
            avatar: "/image/avatar.jpg",
        },
        {
            name: "Nhà Trong Ngõ",
            avatar: "/image/avatar.jpg",
        },
        {
            name: "Nhà Trong Ngõ",
            avatar: "/image/avatar.jpg",
        },
        {
            name: "Nhà Trong Ngõ",
            avatar: "/image/avatar.jpg",
        },
        {
            name: "Nhà Trong Ngõ",
            avatar: "/image/avatar.jpg",
        },
    ];
    const prevRef = React.useRef<HTMLButtonElement>(null);
    const nextRef = React.useRef<HTMLButtonElement>(null);
    const [canGoPrev, setCanGoPrev] = React.useState(false);
    const swiperRef = React.useRef<SwiperType>();
    const handleSlideChange = (swiper: any) => {
        console.log("swiper.activeIndex ===> ", swiper.activeIndex)
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
            >
                {stories.map((story, idx) => (
                    <SwiperSlide key={idx}>
                        <div
                            className={`w-[120px] h-[200px] rounded-lg overflow-hidden relative cursor-pointer
                    }`}
                        >
                            <Image
                                src="/image/avatar.jpg"
                                alt={story.name}
                                layout="responsive" // Hoặc layout="fill" nếu bạn muốn hình ảnh chiếm toàn bộ không gian
                                width={120} // Chiều rộng hình ảnh
                                height={200} // Chiều cao hình ảnh
                                className={`object-cover transition-transform duration-300 hover:scale-[1.02] ${story.isCreate ? 'opacity-40' : 'hover:opacity-80'}`}
                            />
                            {story.isCreate ? (
                                <div className="absolute inset-0 flex flex-col justify-end items-center p-2">
                                    <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full mb-1 z-20">
                                        <span className="text-white text-xl">+</span>
                                    </div>
                                    <p className="text-sm text-white text-center z-20">Tạo tin</p>
                                </div>
                            ) : (
                                <>
                                    {/* <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-blue-500 overflow-hidden z-10 hover:bg-[rgba(29,155,240,0.1)]">
                                        <img
                                            src="/image/avatar.jpg"
                                            alt="story-avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div> */}
                                    <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-blue-500 overflow-hidden z-10 hover:bg-[rgba(29,155,240,0.1)]">
                                        <Image
                                            src="/image/avatar.jpg"
                                            alt="story-avatar"
                                            layout="fill" 
                                            objectFit="cover" 
                                        />
                                    </div>
                                    <p className="absolute bottom-2 left-2 right-2 text-sm text-white font-semibold truncate z-10">
                                        {story.name}
                                    </p>
                                </>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute left-0 top-0 right-0 bottom-0 text-[25px] transition">
                <button
                    ref={prevRef}
                    className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-[rgba(0,0,0,0.6)] shadow hover:bg-[rgba(0,0,0,0.8)] text-textGray rounded-full w-9 h-9 flex items-center justify-center shadow  ${!canGoPrev && 'hidden'}`}
                >
                    <IoIosArrowBack className="" />
                </button>
                <button
                    ref={nextRef}
                    className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-[rgba(0,0,0,0.6)] shadow hover:bg-[rgba(0,0,0,0.8)] text-textGray rounded-full w-9 h-9 flex items-center justify-center shadow "
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    )
}

import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { CloseExternalEventIcon } from '@/components/SingleUseComponents/Icon';
import { MdOutlineFileDownload } from "react-icons/md";
import React from 'react';
import { createPortal } from 'react-dom';
import { IoShareSocialSharp } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight, FaRegCopy } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mediatype } from '@/types/tweetTypes';

const ImagePreview = ({ startIndex = 0, medias, onClose }: { startIndex?: number, medias: Mediatype[]; onClose?: () => void }) => {
    const [imagePreview, setImagePreview] = React.useState(startIndex)
    const handlePrev = () => setImagePreview((prev) => (prev === 0 ? medias.length - 1 : prev - 1))
    const handleNext = () => setImagePreview((prev) => (prev === medias.length - 1 ? 0 : prev + 1))
    const handleSelect = (idx: number) => setImagePreview(idx)
    const handleDownloadImage = (url: string) => {
        try {
            const imageUrl = encodeURIComponent(url);
            window.open(`/api/image/download?q=${imageUrl}`, '_blank');
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
            <div className="absolute top-4 right-4 flex space-x-3 text-white text-xl z-20">
                <button onClick={() => handleDownloadImage(medias[imagePreview].url)}>
                    <BoxIcon>
                        <MdOutlineFileDownload className='w-[25px] h-[25px]' />
                    </BoxIcon>
                </button>
                <button onClick={() => window.open(medias[imagePreview].url, "_blank")}>
                    <BoxIcon>
                        <IoShareSocialSharp className='w-[25px] h-[25px]' />
                    </BoxIcon>
                </button>
                <button onClick={onClose}>
                    <BoxIcon>
                        <CloseExternalEventIcon className='w-[25px] h-[25px]' />
                    </BoxIcon>
                </button>
            </div>
            {/* Ảnh chính */}
            <div className="relative flex items-center justify-center w-full h-full">
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 text-2xl text-white hover:bg-black/70 z-10"
                    onClick={handlePrev}
                >
                    <BoxIcon>
                        <FaChevronLeft className='w-[25px] h-[25px]' />
                    </BoxIcon>
                </button>
                <img
                    src={medias[imagePreview].url}
                    alt={`Ảnh ${imagePreview + 1}`}
                    className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg object-contain"
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 text-2xl text-white hover:bg-black/70 z-10"
                    onClick={handleNext}
                >
                    <FaChevronRight />
                </button>
            </div>
            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full">
                <Swiper
                    className='max-w-[50vw]'
                    slidesPerView={12}
                    slidesPerGroup={2}
                    spaceBetween={2}
                    centeredSlides={medias.length > 7 ? false : true}
                // onSwiper={(swiper) => swiper.slideTo(0)}
                >
                    {medias.map((media, idx) => (
                        <SwiperSlide key={media.url}>
                            <div
                                className={`relative w-[44px] h-[44px] cursor-pointer rounded-md`}
                                onClick={() => handleSelect(idx)}
                            >
                                <img
                                    src={media.url}
                                    alt={`thumb-${idx}`}
                                    className={`w-full h-full object-cover rounded-md ${idx !== imagePreview ? "opacity-50" : ""}`}
                                />
                                {idx !== imagePreview && (
                                    <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>,
        document.body
    );
}

export default ImagePreview;
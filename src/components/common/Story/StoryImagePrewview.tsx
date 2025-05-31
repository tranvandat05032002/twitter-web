import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { CloseExternalEventIcon } from '@/components/SingleUseComponents/Icon';
import { MdOutlineFileDownload } from "react-icons/md";
import React from 'react';
import { createPortal } from 'react-dom';
import { IoShareSocialSharp } from "react-icons/io5";

const StoryImagePreview = ({ image, onClose }: { image: string; onClose?: () => void }) => {
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
                <button onClick={() => handleDownloadImage(image)}>
                    <BoxIcon>
                        <MdOutlineFileDownload className='w-[25px] h-[25px]' />
                    </BoxIcon>
                </button>
                <button onClick={() => window.open(image, "_blank")}>
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
                <img
                    src={image}
                    alt={`Ảnh ${image}`}
                    className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg object-contain"
                />

            </div>
        </div>,
        document.body
    );
}

export default StoryImagePreview;
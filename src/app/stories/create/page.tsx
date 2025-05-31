"use client"
import StoryImagePreview from '@/components/common/Story/StoryImagePrewview';
import ImagePreview from '@/components/common/Tweet/ImagePreview';
import { MyContextType, StoryContext } from '@/context/StoryContext';
import { useCreateStory } from '@/hooks/users/useMutation';
import { Mediatype } from '@/types/tweetTypes';
import { uploadImageToS3 } from '@/utils/handlers';
import { routers } from '@/utils/router/routers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import React, { forwardRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaFileImage } from "react-icons/fa";

const CreateStory = () => {
    const [image, setImage] = useState<Mediatype | null>(null);
    const router = useRouter();
    const { mutate: createStory, isSuccess, isError } = useCreateStory()
    const [showImageDetail, setShowImageDetail] = useState(false);
    const { setIsPrewImage, isPrewImage, setPreview, preview } = React.useContext(StoryContext) as MyContextType

    const imageInputRef = React.useRef<HTMLInputElement | null>(null);

    const {
        handleSubmit,
        setValue,
        formState: {
            isValid,
            isLoading,
        }
    } = useForm<Mediatype>({
        mode: "onSubmit",
        defaultValues: {
            type: 0,
            url: ""
        }
    })

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            const media = await uploadImageToS3(file, "avatar", "avatar")
            if (!media) return;
            setImage(media)
            setValue("type", media.type)
            setValue("url", media.url)
            setIsPrewImage(true)
        }
    };

    const handleClickImageUpload = () => {
        imageInputRef.current?.click();
    };

    const handleCreateStory: SubmitHandler<Mediatype> = async (data) => {
        try {
            if (!image) return;

            createStory(image);
            setImage(null);
            setPreview(null);
            setIsPrewImage(false);
        } catch (error) {
            console.error("Error creating story:", error);
        }
    };

    React.useEffect(() => {
        if (isSuccess) {
            router.push(routers.homePage)
        }
    }, [isSuccess])

    const handleCancelCreateStory = () => {
        setIsPrewImage(false)
        setPreview(null)
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <form
                onSubmit={handleSubmit(handleCreateStory)}
                className="shadow-lg flex flex-col items-center w-full h-full justify-center relative"
            >
                {!preview ?
                    <React.Fragment>
                        <div className="flex justify-center gap-4 p-4 bg-black">
                            {/* Tạo tin dạng ảnh */}
                            <div className="w-64 h-96 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-300 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition" onClick={handleClickImageUpload}>
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white mb-4 shadow-white shadow-md">
                                    <FaFileImage className='w-[24px] h-[24px]' />
                                </div>
                                <p className="text-white font-semibold text-lg text-center">Tạo tin dạng ảnh</p>
                            </div>

                            {/* Tạo tin dạng văn bản */}
                            <div className="w-64 h-96 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-pink-300 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white mb-4 text-xl font-bold shadow-white shadow-md">
                                    Aa
                                </div>
                                <p className="text-white font-semibold text-lg text-center">Tạo tin dạng văn bản</p>
                            </div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={imageInputRef}
                            className="hidden"
                        />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className='w-full h-full flex px-4 justify-center items-center'>
                            <div className='w-full h-[80%] border-[0.5px] border-borderGrayPrimary rounded-lg p-4 flex flex-col space-y-2 bg-borderGraySecond/20'>
                                <p className='my-2 font-bold'>Xem trước</p>
                                <div className='w-full h-full border-[0.5px] bg-black border-borderGrayPrimary flex justify-center items-center rounded-lg'>
                                    <div className='w-64 h-96 rounded-lg border border-borderGrayPrimary relative'>
                                        <Image
                                            src={preview}
                                            alt="story"
                                            fill
                                            className="object-cover rounded-lg cursor-pointer"
                                            onClick={() => setShowImageDetail(true)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showImageDetail && <StoryImagePreview image={image?.url as string} onClose={() => setShowImageDetail(false)} />}
                    </React.Fragment>
                }

                {isPrewImage && (
                    <div className='absolute bottom-1 left-4 flex items-center justify-center space-x-2'>
                        <button className='py-2 px-10 rounded-xl bg-black border-[0.5px] border-[#333639] text-white font-bold text-[15px] hover:bg-iconHoverBackgroundGray' onClick={handleCancelCreateStory}>Bỏ</button>
                        <button type='submit' className='py-2 px-10 bg-[#1d9bf0] rounded-xl'>Chia sẻ lên tin</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateStory;
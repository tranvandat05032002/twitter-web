import { Input, StickyNav } from '@/components/common'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUser, FaSmile, FaMapMarkerAlt, FaRegSmile, FaUserFriends, FaUserLock } from 'react-icons/fa'
import { MdPhotoLibrary } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import OverlayModal from '@/components/common/Modal/OverlayModal'
import { CameraPlusIcon, CloseExternalEventIcon, CloseIcon, DotIcon } from '@/components/SingleUseComponents/Icon'
import { useEvent } from '@/store/useEven'
import { useProfileStore } from '@/store/useProfile'
import Tippy from '@tippyjs/react'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { PrimaryButton } from '@/components/common/Button';
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import Emoji from '@/components/common/Emoji/Emoji';
import Image from 'next/image';
import { Mediatype, TweetForm } from '@/types/tweetTypes';
import { extractHashtags, extractMentios, uploadImageToS3 } from '@/utils/handlers';
import { useCreateTweet } from '@/hooks/users/useMutation';
import { HASHTAG_MENTION_REGEX, optionsArea } from '@/constant/tweet';

export const highlightContent = (content: string) => {
    // if (!content.startsWith("@") || !content.startsWith("#")) return "";
    return content.replace(HASHTAG_MENTION_REGEX, (match) => {
        if (!match.startsWith("@") && !match.startsWith("#")) return match;
        const color = match.startsWith("@") || match.startsWith("#") ? "text-blue-500" : "";
        return `<span class="${color}">${match}</span>`;
    });
};
export default function HomeCreatePost({ onClose }: { onClose: () => void }) {
    // const { setShowCreatePost } = useEvent((state) => state);
    const [showFormAddImage, setShowFormAddImage] = React.useState(false)
    const [images, setImages] = React.useState<{ file: File; media: Mediatype }[]>([]);
    const [selected, setSelected] = React.useState(optionsArea[0]) // Mặc định: "Bạn bè cụ thể"
    const [isOpen, setIsOpen] = React.useState(false)
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const { mutate, isLoading } = useCreateTweet()
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        formState: { isValid },
    } = useForm<TweetForm>({
        mode: "onSubmit",
        defaultValues: {
            parent_id: null,
            type: 0,
            hashtags: [],
            mentions: [],
            audience: selected.id,
            medias: [],
            content: ""
        },
    });

    const contentValue = watch("content");
    // const handleCloseCreatePost = () => {
    //     setShowCreatePost(false)
    // }

    const handleShowFormAddImage = () => {
        setShowFormAddImage(!showFormAddImage)
    }

    const handleAddMedias = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        // Upload tối đa 10 ảnh
        const newFiles = Array.from(e.target.files).slice(0, 10 - images.length)

        const newImages = await Promise.all(
            newFiles.map(async (file) => {
                const media = await uploadImageToS3(file, "avatar", "avatar")
                if (!media) return null;
                return {
                    file,
                    media
                }
            })
        )

        // Loại bỏ null
        const validImages = newImages.filter(
            (item): item is { file: File; media: Mediatype } => item !== null
        );

        const updatedImages = [...images, ...validImages].slice(0, 10);
        setImages(updatedImages)
        setValue("medias", updatedImages.map((data) => ({
            url: data.media.url,
            type: data.media.type
        })))
    }

    const handleAddEmoji = (emoji: string) => {
        const currentText = getValues("content")
        const textarea = textareaRef.current;

        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        const newText =
            currentText.substring(0, start) +
            emoji +
            currentText.substring(end, currentText.length);

        setValue("content", newText)

        // Set lại con trỏ sau emoji
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + emoji.length, start + emoji.length);
        }, 0);
    }

    const handleCreateTweet = async (values: TweetForm) => {
        if (!isValid) return;

        const hashtags = extractHashtags(values.content);
        const mentions = extractMentios(values.content);

        const payload = {
            ...values,
            hashtags,
            mentions
        }
        mutate(payload)
        reset();
        setImages([]);
        onClose();
    }
    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, idx) => idx != index))
    }
    return (
        <OverlayModal>
            <div className='max-w-[630px] w-[600px]'>
                <form onSubmit={handleSubmit(handleCreateTweet)} autoComplete="off">
                    <div className="w-full bg-black overflow-auto rounded-2xl">
                        <StickyNav>
                            <div className="w-full h-full px-4 py-4 flex text-white items-center justify-between border-b-[0.5px] border-borderGrayPrimary mb-4">
                                <div></div>
                                <div className="flex gap-x-8 items-center">
                                    <h3 className="font-medium text-xl">Tạo bài viết</h3>
                                </div>
                                <button className={`rounded-full bg-black border-[0.5px] border-[#333639] text-white font-bold px-4 py-1 text-[15px] hover:bg-iconHoverBackgroundGray`}
                                    type="button"
                                    onClick={onClose}
                                >
                                    Hủy
                                </button>
                            </div>
                        </StickyNav>
                        <div className='h-[max-content]'>
                            <div className="flex flex-col w-full h-full px-[3px]">
                                <div className="px-4 pb-[30px]">
                                    <div className='flex items-center mb-4'>
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                                            <Image
                                                src="/image/avatar.jpg"
                                                alt="Avatar"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className='ml-[10px]'>
                                            <p>Trần Văn Đạt</p>
                                            <Controller
                                                name="audience"
                                                control={control}
                                                defaultValue={selected.id} // Mặc định chọn "Công khai"
                                                render={({ field }) => (
                                                    <div className="relative inline-block text-left mt-[2px]" ref={dropdownRef}>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsOpen(!isOpen)}
                                                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm px-[8px] py-[3px] rounded-lg"
                                                        >
                                                            <selected.icon />
                                                            {selected.label}
                                                            <IoMdArrowDropdown />
                                                        </button>

                                                        {isOpen && (
                                                            <div className="absolute mt-2 w-48 bg-black shadow-lg rounded-md z-[999] border border-borderGrayPrimary debug-css">
                                                                {optionsArea.map((option) => (
                                                                    <button
                                                                        key={option.value}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelected(option);
                                                                            setIsOpen(false);
                                                                            setValue("audience", option.id); // Cập nhật giá trị trong form
                                                                        }}
                                                                        className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-iconBackgroundGray ${selected.value === option.value ? 'font-semibold' : ''}`}
                                                                    >
                                                                        {option.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center mb-[25px]'>
                                        <div className="relative w-full">
                                            <div className="absolute inset-0 text-white whitespace-pre-wrap break-words pointer-events-none text-opacity-80 z-0">
                                                <div dangerouslySetInnerHTML={{ __html: highlightContent(contentValue) }} />
                                            </div>
                                            <Controller
                                                control={control}
                                                name="content"
                                                render={({ field }) => (
                                                    <textarea
                                                        {...field}
                                                        className="w-full bg-transparent outline-none border-none placeholder:text-textGray resize-none whitespace-pre-wrap break-words z-10 relative"
                                                        ref={textareaRef}
                                                        placeholder="Bạn đang nghĩ gì thế?"
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setValue("content", e.target.value);
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <Emoji onSelectEmoji={handleAddEmoji}></Emoji>
                                    </div>
                                    {showFormAddImage &&
                                        <div className="w-full max-h-[260px] h-[260px] bg-black flex items-center justify-center rounded-xl border-[0.5px] border-borderGrayPrimary">
                                            {
                                                images.length === 0 ? (
                                                    <div className="w-full h-full relative">
                                                        <div className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 flex gap-x-[10px] z-[10]">
                                                            <div className="cursor-pointer p-[10px] bg-black/50 hover:bg-black/30 group rounded-full">
                                                                <Tippy
                                                                    placement="bottom"
                                                                    content="Add a photo"
                                                                    offset={[0, 2]}
                                                                    className="z-[30] bg-black/70 text-white text-xs p-1 rounded-sm"
                                                                >
                                                                    <React.Fragment>
                                                                        <Controller
                                                                            name='medias'
                                                                            control={control}
                                                                            defaultValue={[]}
                                                                            render={({ field }) => (
                                                                                <Input type="file" accept="image/*" multiple control={control} onChange={(e) => {
                                                                                    const files = Array.from(e.target.files || []);
                                                                                    handleAddMedias(e)
                                                                                    field.onChange(files)
                                                                                }} id="medias" name="medias" className="hidden cursor-pointer" />
                                                                            )}
                                                                        />
                                                                        <label htmlFor="medias">
                                                                            <div className="cursor-pointer bg-black/50 hover:bg-black/30 transition duration-200 rounded-full">
                                                                                <CameraPlusIcon className="text-white bg-black/10 cursor-pointer"></CameraPlusIcon>
                                                                            </div>
                                                                        </label>
                                                                    </React.Fragment>
                                                                </Tippy>
                                                            </div>
                                                            <button type="button" className="cursor-pointer border-none outline-none p-[10px] bg-black/50 hover:bg-black/30 transition duration-200 rounded-full">
                                                                <CloseExternalEventIcon className="text-white bg-black/10 "></CloseExternalEventIcon>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 p-1">
                                                        {images.slice(0, 3).map((img, index) => (
                                                            <div key={index} className="relative w-full h-full rounded overflow-hidden">
                                                                <Image
                                                                    src={img.media.url}
                                                                    alt=""
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="absolute top-0 right-0 bg-black/60 text-white p-1 rounded-full cursor-pointer border-none outline-none p-[5px] bg-black/60 hover:bg-black/40 transition duration-200"
                                                                    onClick={() => handleRemoveImage(index)}
                                                                >
                                                                    <CloseExternalEventIcon className="text-white bg-black/10 "></CloseExternalEventIcon>
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {images.length > 3 && (
                                                            <div className="relative w-full h-full rounded overflow-hidden cursor-pointer">
                                                                <Image
                                                                    src={images[3].media.url}
                                                                    alt=""
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-lg font-semibold">
                                                                    +{images.length - 3}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    }
                                    <div className='relative h-[100px] mt-4'>
                                        <div className='absolute bottom-0 top-0 left-0 right-0'>
                                            <div className="flex items-center bg-transparent justify-between px-3 py-2 rounded-xl text-white text-sm border border-[0.5px] border-borderGrayPrimary">
                                                <span className="ml-1">Thêm vào bài viết của bạn</span>
                                                <div className="flex items-center gap-4">
                                                    <BoxIcon>
                                                        <MdPhotoLibrary onClick={handleShowFormAddImage} className="text-green-400 text-xl cursor-pointer w-[24px] h-[24px]" />
                                                    </BoxIcon>
                                                    <BoxIcon>
                                                        <FaUser className="text-blue-500 text-base cursor-pointer w-[24px] h-[24px]" />
                                                    </BoxIcon>
                                                    <BoxIcon>
                                                        <FaSmile className="text-yellow-400 text-base cursor-pointer w-[24px] h-[24px]" />
                                                    </BoxIcon>
                                                    <BoxIcon>
                                                        <FaMapMarkerAlt className="text-red-500 text-base cursor-pointer w-[24px] h-[24px]" />
                                                    </BoxIcon>
                                                    <BoxIcon>
                                                        <BsThreeDots className="text-white text-base cursor-pointer w-[24px] h-[24px]" />
                                                    </BoxIcon>
                                                </div>
                                            </div>
                                            <PrimaryButton
                                                type='submit'
                                                className='w-full rounded-lg py-2 mt-4'
                                                isLoading={isLoading}
                                                disabledForm={isLoading}
                                            >Đăng</PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </OverlayModal>
    )
}

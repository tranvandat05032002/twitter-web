import { Input, StickyNav } from '@/components/common'
import { IoMdArrowDropdown } from "react-icons/io";
import { TiWorld } from "react-icons/ti";
import { FaUser, FaSmile, FaMapMarkerAlt, FaRegSmile, FaUserFriends, FaUserLock } from 'react-icons/fa'
import { MdPhotoLibrary } from 'react-icons/md'
// import { RiGiftFill } from 'react-icons/ri'
import { BsThreeDots } from 'react-icons/bs'
import OverlayModal from '@/components/common/Modal/OverlayModal'
import { CameraPlusIcon, CloseExternalEventIcon, CloseIcon, DotIcon } from '@/components/SingleUseComponents/Icon'
import { useEvent } from '@/store/useEven'
import { useProfileStore } from '@/store/useProfile'
import { IUpdateUser } from '@/types/userTypes'
import Tippy from '@tippyjs/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from '@/components/common/Button';
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import Emoji from '@/components/common/Emoji/Emoji';
import Image from 'next/image';
const options = [
    { label: 'Công khai', value: 'public', icon: TiWorld },
    { label: 'Bạn bè', value: 'friends', icon: FaUserFriends },
    { label: 'Chỉ mình tôi', value: 'private', icon: FaUserLock },
]
export default function HomeCreatePost() {
    const { userProfile, updateProfile } = useProfileStore(
        (state) => state
    );
    const { setShowCreatePost } = useEvent((state) => state);
    const [showFormAddImage, setShowFormAddImage] = React.useState(false)
    const [selected, setSelected] = React.useState(options[2]) // Mặc định: "Bạn bè cụ thể"
    const [isOpen, setIsOpen] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    // Đóng dropdown khi click ngoài
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    const {
        control,
        watch,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<IUpdateUser>({
        mode: "onSubmit",
        defaultValues: {
            name: userProfile?.name,
            bio: userProfile?.bio,
            location: userProfile?.location,
            website: userProfile?.website,
            date_of_birth: userProfile?.date_of_birth,
            avatar: userProfile?.avatar
        },
    });
    const handleCloseCreatePost = () => {
        setShowCreatePost(false)
    }
    const handleShowFormAddImage = () => {
        setShowFormAddImage(!showFormAddImage)
    }
    const handleUpdateUser = () => { }
    return (
        <OverlayModal>
            <form onSubmit={handleSubmit(handleUpdateUser)} autoComplete="off">
                <div className="max-w-[630px] w-[600px] bg-black overflow-auto rounded-2xl">
                    <StickyNav>
                        <div className="w-full h-full px-4 py-4 flex text-white items-center justify-between border-b-[0.5px] border-borderGrayPrimary mb-4">
                            <div></div>
                            <div className="flex gap-x-8 items-center">
                                <h3 className="font-medium text-xl">Tạo bài viết</h3>
                            </div>
                            <button className={`rounded-full bg-black border-[0.5px] border-[#333639] text-white font-bold px-4 py-1 text-[15px] hover:bg-iconHoverBackgroundGray`}
                                type="submit"
                                onClick={handleCloseCreatePost}
                            >
                                Hủy
                            </button>
                        </div>
                    </StickyNav>
                    <div className='h-[max-content]'>
                        <div className="flex flex-col w-full h-full px-[3px]">
                            <div className="px-4 pb-[30px]">
                                <div className='flex items-center mb-4'>
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-none">
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
                                        <div className="relative inline-block text-left mt-[2px]" ref={dropdownRef}>
                                            <button
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm px-[8px] py-[3px] rounded-lg"
                                            >
                                                <selected.icon />
                                                {selected.label}
                                                <IoMdArrowDropdown />
                                            </button>

                                            {isOpen && (
                                                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10 dark:bg-neutral-800">
                                                    {options.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            onClick={() => {
                                                                setSelected(option)
                                                                setIsOpen(false)
                                                            }}
                                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 ${selected.value === option.value ? 'font-semibold' : ''
                                                                }`}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center mb-[25px]'>
                                    <textarea
                                        className="w-full bg-transparent outline-none border-none placeholder:text-textGray resize-none whitespace-pre-line break-words overflow-hidden"
                                        placeholder="Bạn đang nghĩ gì thế?"
                                    ></textarea>
                                    <Emoji></Emoji>
                                </div>
                                {showFormAddImage && <div className="w-full max-h-[260px] h-[260px] bg-black flex items-center justify-center rounded-xl border-[0.5px] border-borderGrayPrimary">
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
                                                        <Input type="file" accept="image/*" control={control} id="cover-photo" name="cover_photo" className="hidden cursor-pointer" />
                                                        <label htmlFor="cover_photo">
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
                                </div>}
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
                                        <PrimaryButton className='w-full rounded-lg py-2 mt-4'>Đăng</PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </OverlayModal>
    )
}

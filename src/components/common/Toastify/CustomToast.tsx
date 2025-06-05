import BoxIcon from "@/components/SingleUseComponents/BoxIcon";
import { CloseExternalEventIcon } from "@/components/SingleUseComponents/Icon";
import { DEFAULT_IMAGE } from "@/constant/constants";
import { useGetProfileUserId } from "@/hooks/users/useQuery";
import { NotifyRes, NotifyType } from "@/types/notifyTypes";
import { formatDateToVietnamese } from "@/utils/handlers";
import { Avatar } from "@mui/material";
import { FC } from "react";
import { BiSolidCommentDetail, BiTrash } from "react-icons/bi";
import { FaHeart, FaUserFriends } from "react-icons/fa";

interface CustomToastProps {
    closeToast?: () => void;
    notify: NotifyRes;
}

export const CustomToast: FC<CustomToastProps> = ({ closeToast, notify }) => {
    const { data: userSender } = useGetProfileUserId(notify.sender_id)
    return (
        <div className="w-full flex items-center p-2 cursor-pointer bg-black relative transition-all">
            <div className="w-full">
                {/* <Link
                            href={`/profile/v1?profile_username=${data.username}`}
                        > */}
                <div className="w-full flex items-start justify-between space-x-2">
                    <div className="w-10 h-10 mt-[6px] rounded-full group relative">
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1d9bf0] rounded-full border-2 border-white translate-x-1/3 translate-y-1/3 z-100 debug-css" />
                        <Avatar src={userSender?.avatar ? userSender?.avatar : DEFAULT_IMAGE} sx={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="flex-1 h-full">
                        <div className="w-full h-full">
                            <div className="flex items-start space-x-1 pr-2">
                                <div className='flex-1'>
                                    <p className="pr-2 whitespace-wrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">
                                        <span className='text-white font-bold'>{userSender?.name}</span> {" "}
                                        {notify.message}</p>
                                </div>
                            </div>
                        </div>
                        <p className="font-light text-textBlue text-[15px]">Vừa xong</p>
                    </div>
                </div>
                {/* </Link> */}
            </div>
            <div className='mr-2'>
                {
                    notify.type === NotifyType.Follow &&
                    <div className='p-2 rounded-full border-[0.5px] border-borderGrayPrimary'>
                        <FaUserFriends className='w-6 h-6' />
                    </div>
                }
                {
                    (notify.type === NotifyType.Comment || notify.type === NotifyType.CommentReply) &&
                    <div className='p-2 rounded-full border-[0.5px] bg-textBlue/20 border-borderGrayPrimary'>
                        <BiSolidCommentDetail className='w-6 h-6' />
                    </div>
                }
                {
                    notify.type === NotifyType.Like &&
                    <div className='p-2 rounded-full border-[0.5px] bg-textPinkPrimary/20 border-borderGrayPrimary'>
                        <FaHeart className='w-6 h-6' />
                    </div>
                }
            </div>
            <CloseExternalEventIcon className="absolute cursor-pointer top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white bg-black/10 " onClick={closeToast} />
        </div >

        // <div className="w-full flex items-center px-2 py-4 cursor-pointer hover:bg-gray-100/10">
        //     <div className="w-full">
        //         {/* <Link
        //             href={`/profile/v1?profile_username=${data.username}`}
        //         > */}
        //         <div className="w-full flex items-start justify-between space-x-2">
        //             <div className="w-10 h-10 mt-[6px] group relative">
        //                 <Avatar src={DEFAULT_IMAGE} sx={{ width: "100%", height: "100%" }} />
        // <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1d9bf0] rounded-full border-2 border-white translate-x-1/3 translate-y-1/3 z-10" />
        //             </div>
        //             <div className="flex-1 h-full">
        //                 <div className="w-full h-full">
        //                     <div className="flex items-start space-x-1 pr-4">
        //                         <div className='flex-1'>
        //                             <p className="pr-4 whitespace-wrap text-ellipsis overflow-hidden font-light text-[15px] text-gray-300/80">
        //                                 <span className='text-white font-bold'>Trần Văn Đạt</span> {" "}
        //                                 đã bình luận bài viết của bạn.</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <p className="font-medium text-[#1d9bf0] text-[15px]">1 giờ</p>
        //             </div>
        //         </div>
        //         {/* </Link> */}
        //     </div>
        //     <div className='mr-5'>
        // <div className='p-2 rounded-full border-[0.5px] bg-textBlue/20 border-borderGrayPrimary'>
        //     <BiSolidCommentDetail className='w-6 h-6' />
        // </div>
        //     </div>
        // </div >

        // <React.Fragment>
        //     <div className="w-full flex items-center px-2 py-4 cursor-pointer hover:bg-gray-100/10">
        //         <div className="w-full">
        //             {/* <Link
        //                 href={`/profile/v1?profile_username=${data.username}`}
        //             > */}
        //             <div className="w-full flex items-start justify-between space-x-2">
        //                 <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
        //                     {/* <div className="absolute"></div> */}
        //                     <Avatar src={DEFAULT_IMAGE} sx={{ width: "100%", height: "100%" }} />
        //                 </div>
        //                 <div className="flex-1 h-full">
        //                     <div className="w-full h-full">
        //                         <div className="flex items-start space-x-1 pr-4">
        //                             <div className='flex-1'>
        //                                 <p className="pr-4 whitespace-wrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">
        //                                     <span className='text-white font-bold'>Trần Văn Đạt</span> {" "}
        //                                     đã yêu thích bài viết của bạn.</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <p className="font-light text-textGray text-[15px]">1 giờ</p>
        //                 </div>
        //             </div>
        //             {/* </Link> */}
        //         </div>
        //         <div className='mr-5'>
        // <div className='p-2 rounded-full border-[0.5px] bg-textPinkPrimary/20 border-borderGrayPrimary'>
        //     <FaHeart className='w-6 h-6' />
        // </div>
        //         </div>
        //     </div >

        //     <div className="w-full flex items-center px-2 py-4 cursor-pointer hover:bg-gray-100/10">
        //         <div className="w-full">
        //             {/* <Link
        //                 href={`/profile/v1?profile_username=${data.username}`}
        //             > */}
        //             <div className="w-full flex items-start justify-between space-x-2">
        //                 <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
        //                     {/* <div className="absolute"></div> */}
        //                     <Avatar src={DEFAULT_IMAGE} sx={{ width: "100%", height: "100%" }} />
        //                 </div>
        //                 <div className="flex-1 h-full">
        //                     <div className="w-full h-full">
        //                         <div className="flex items-start space-x-1 pr-4">
        //                             <div className='flex-1'>
        //                                 <p className="pr-4 whitespace-wrap text-ellipsis overflow-hidden font-light text-[15px] text-textGray">
        //                                     <span className='text-white font-bold'>Trần Văn Đạt</span> {" "}
        //                                     đã yêu thích bài viết của bạn.</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <p className="font-light text-textGray text-[15px]">1 giờ</p>
        //                 </div>
        //             </div>
        //             {/* </Link> */}
        //         </div>
        //         <div className='mr-5'>
        //             <div className='p-2 rounded-full border-[0.5px] bg-textPinkPrimary/20 border-borderGrayPrimary'>
        //                 <FaHeart className='w-6 h-6' />
        //             </div>
        //         </div>
        //     </div >
        // </React.Fragment>
    );
};
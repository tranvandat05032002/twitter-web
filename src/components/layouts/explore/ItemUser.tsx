"use client"
import React from 'react';
interface IItemUser {
    miniItem?: boolean | false;
    isFollow?: boolean;
}
const ItemUser = ({ miniItem, isFollow }: IItemUser) => {
    const [isHover, setIsHover] = React.useState<Boolean>(false);
    const handleChange = () => {
        setIsHover((prev) => !prev);
    }
    return (
        <React.Fragment>
            {
                miniItem ? <div className="flex items-center cursor-pointer select-none text-sm py-[10px] px-[15px] hover:bg-bgHoverGray">
                    <div className="w-full flex items-start justify-between gap-x-2">
                        <div className="relative w-10 h-10 mt-[6px] overflow-hidden rounded-full group">
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                            <img
                                src="/image/avatar.jpg"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-[90%] flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-base hover:underline">Trần Văn Đạt</p>
                                <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-normal text-[15px] text-textGray">@tranvandatevondev</p>
                            </div>
                            <button className="rounded-full bg-white text-textBlack transition-all hover:bg-bgHoverWhite/80 font-bold px-4 py-1 text-[15px]">
                                Follow
                            </button>
                        </div>
                    </div>
                </div> :
                    <div className="w-full flex items-center cursor-pointer select-none text-sm py-[10px] my-[2px] px-2 hover:bg-iconBackgroundGray">
                        <div className=" w-full flex items-start justify-between gap-x-2">
                            <div className="w-10 h-10 mt-[6px] overflow-hidden rounded-full group relative">
                                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                                <img
                                    src="/image/avatar.jpg"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="w-full ">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-base hover:underline">Trần Văn Đạt</p>
                                        <p className="max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden font-normal text-[15px] text-textGray">@tranvandatevondev</p>
                                    </div>
                                    {isFollow ? <button onMouseEnter={handleChange} onMouseLeave={handleChange} className={`rounded-full ${!isHover ? "bg-transparent border-[0.5px] border-[#333639] text-white" : "bg-bgPinkGhost/20 border-[0.5px] border-bgPinkGhost/40 text-bgPinkGhost"} font-bold px-4 py-1 text-[15px]`}>
                                        {isHover ? "Unfollow" : "Following"}
                                    </button> : <button className="rounded-full bg-white text-textBlack transition-all hover:bg-bgHoverWhite/80 font-bold px-4 py-1 text-[15px]">
                                        Follow
                                    </button>}
                                </div>
                                <p className="font-normal text-[15px]">📞 Hotline : +84 888847346 ✉️ hieutai.contact@gmail.com Support Facebook, Instagram, Google</p>
                            </div>
                        </div>
                    </div>
            }
        </React.Fragment>
    );
};

export default ItemUser;
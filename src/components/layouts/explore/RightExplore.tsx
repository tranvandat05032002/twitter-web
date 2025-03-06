"use client"
import React from 'react';
import ItemUser from './ItemUser';
import { useGetUsersFollowing } from '@/hooks/users/useQuery';
const RightExplore = () => {
    const usersFollowing = useGetUsersFollowing();
    const dataGetUsersFollowing = usersFollowing.data
    return (
        <div className={`max-w-full w-full h-full flex flex-col flex-1 pl-[30px] pr-3 pt-3`}>
            <div className="w-full rounded-xl bg-bgGray16181c">
                <div className="w-full">
                    <h3 className="text-xl font-bold px-[15px] py-[12px]">You are following ({dataGetUsersFollowing?.total})</h3>
                    <div className="flex flex-col">
                        {dataGetUsersFollowing?.data.map((user: any) =>
                            <ItemUser data={user?.followUsers} key={user._id} miniItem={true} isFollow={true} />
                        )}
                    </div>
                    <button className="cursor-pointer px-[15px] text-[15px] font-light text-bgBlueFocus py-[14px] w-full hover:bg-bgHoverGray bg-transparent transition-all text-start">
                        Show more
                    </button>
                </div>
            </div>
            <div className="max-w-full mt-3 text-textGray text-sm font-light">
                <ul className="ml-[12px] flex flex-wrap flex-1 break-words">
                    {
                        liContent.map((item: ILiContent, index) => <li key={index} className={`mr-[12px] cursor-pointer hover:underline ${index === 5 ? "last:hover:no-underline last:hover:cursor-default" : ""}`}>{item.title}</li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default RightExplore;
interface ILiContent {
    title: String;
}
const liContent: ILiContent[] = [
    {
        title: "Terms of Service"
    },
    {
        title: "Privacy Policy"
    },
    {
        title: "Cookie Policy"
    },
    {
        title: "Accessibility"
    },
    {
        title: "Ads info"
    },
    {
        title: "© 2024 X Corp."
    },
]
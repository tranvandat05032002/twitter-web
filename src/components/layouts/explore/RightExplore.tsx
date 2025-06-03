"use client"
import React from 'react';
import ItemUser from './ItemUser';
import { useGetUsersFollowing } from '@/hooks/users/useQuery';
import SimpleBar from 'simplebar-react';
const RightExplore = () => {
    const usersFollowing = useGetUsersFollowing();
    const dataGetUsersFollowing = usersFollowing.data
    return (
        <div className={`w-full max-h-screen sticky top-0 flex-1 pl-[10px] pr-3 pt-3 custom-scrollbar`}>
            <div className='sticky top-0'>
                <div className='flex flex-col'>
                    <div className="w-full rounded-xl bg-bgGray16181c">
                        <div className="w-full">
                            <h3 className="text-xl font-bold px-[15px] py-[12px]">Người theo dõi ({dataGetUsersFollowing?.total})</h3>
                            <div className="flex flex-col max-h-screen overflow-y-scroll">
                                {dataGetUsersFollowing?.data.map((user: any) => {
                                    return (

                                        <ItemUser
                                            key={user._id}
                                            data={user?.followUsers}
                                            miniItem={true}
                                            isFollow={true} />
                                        // </Link>
                                    )
                                }
                                )}
                            </div>
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
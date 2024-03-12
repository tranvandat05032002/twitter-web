import React from 'react';
import { StickyNav } from '..';
import { BackIcon, CloseIcon } from '@/components/SingleUseComponents/Icon';
import { SecondaryButton } from '../Button';
interface IIconModalEdit {
    type: "open" | "close";
    eventIcon?: () => void;
}
interface IHeaderModalEdit {
    title: string;
    eventButton?: () => void;
    iconType?: IIconModalEdit;
    eventTitle: string;
}
const HeaderModalEdit = ({ title, eventTitle, eventButton, iconType }: IHeaderModalEdit) => {
    return (
        <StickyNav>
            <div className="w-full h-full px-4 py-2 flex text-white items-center justify-between">
                <div className="flex gap-x-8 items-center">
                    <div className="cursor-pointer p-2 hover:bg-bgHoverBlue group rounded-full">
                        {iconType?.type === "close" ? <CloseIcon className="text-white bg-black/10 "></CloseIcon> : <BackIcon className="text-white bg-black/10" onClick={iconType?.eventIcon}></BackIcon>}
                    </div>
                    <h3 className="font-medium text-xl">{title}</h3>
                </div>
                <SecondaryButton
                    className="px-4 py-1 text-black font-medium"
                    type="submit"
                    onClick={eventButton}
                >
                    {eventTitle}
                </SecondaryButton>
            </div>
        </StickyNav>

    );
};

export default HeaderModalEdit;
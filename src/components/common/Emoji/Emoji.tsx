import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import React from 'react';
import { FaRegSmile } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import Tippy from '@tippyjs/react';

const Emoji = () => {
    const [showPicker, setShowPicker] = React.useState(false);

    const handleEmojiSelect = (emoji: any) => {
        console.log("Selected emoji:", emoji.native); // hoặc truyền ra prop nếu cần
        setShowPicker(false);
    };

    return (
        <Tippy
            interactive
            visible={showPicker}
            onClickOutside={() => setShowPicker(false)}
            offset={[0, 10]}
            placement="top"
            render={(attrs) => (
                <div
                    className="w-[320px] max-w-[90vw] overflow-hidden rounded-xl shadow-lg bg-white"
                    tabIndex={-1}
                    {...attrs}
                >
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} autoFocus={true} />
                </div>
            )}
        >
            <BoxIcon>
                <FaRegSmile
                    className="w-[25px] h-[25px] cursor-pointer"
                    onClick={() => setShowPicker(prev => !prev)}
                />
            </BoxIcon>
        </Tippy>
    );
};

export default Emoji;

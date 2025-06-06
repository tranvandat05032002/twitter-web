import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import React from 'react';
import { FaRegSmile } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import Tippy from '@tippyjs/react';
interface EmojiPickerProps {
    onSelectEmoji: (emoji: string) => void;
    className?: string
}
const Emoji: React.FC<EmojiPickerProps> = ({ onSelectEmoji, className }) => {
    const [showPicker, setShowPicker] = React.useState(false);
    const handleEmojiSelect = (emoji: any) => {
        onSelectEmoji(emoji.native)
    };

    const handleShowEmoji = (status: Boolean) => {
        setShowPicker(!status)
    }
    return (
        <Tippy
            interactive
            visible={showPicker}
            arrow={true}
            onClickOutside={() => setShowPicker(false)}
            offset={[0, 5]}
            placement="top"
            render={(attrs) => (
                <div
                    className="w-max max-w-[90vw] overflow-hidden rounded-xl shadow-lg bg-white"
                    tabIndex={-1}
                    {...attrs}
                >
                    <div style={{ display: showPicker ? 'block' : 'none' }} className="h-[295px] bg-[#151617]">
                        <Picker
                            style={{ height: "295px" }}
                            data={data}
                            onEmojiSelect={handleEmojiSelect}
                            previewPosition="none"
                            locale="vi"
                            autoFocus={true} />
                    </div>
                </div>
            )}
        >
            <div className={`p-2 rounded-full cursor-pointer ${className}`}>
                <FaRegSmile title='Emoji'
                    className="w-[25px] h-[25px] cursor-pointer"
                    onClick={() => handleShowEmoji(showPicker)}
                />
            </div>
        </Tippy>

    );
};

export default Emoji;

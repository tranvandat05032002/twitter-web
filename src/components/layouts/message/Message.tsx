import { IMessage } from '@/types/chatTypes';
import { format, parseISO, isValid } from 'date-fns';
import React from 'react';
import Tippy from '@tippyjs/react';
import { formatMessageTime } from '@/utils/handlers';

const Message = ({ message, currentUserId, scroll }: { message: IMessage, currentUserId: string, scroll: React.LegacyRef<HTMLDivElement> }) => {
    const date = parseISO(message?.created_at as string);
    const time = formatMessageTime(date);
    return (
        <Tippy
            placement="left"
            content={time}
            offset={[0, 0]}
            delay={300}
            duration={[200, 100]}
            className="z-[30] bg-white/80 text-black text-sm py-2 px-3 shadow-sm-black rounded-lg"
        >
            <div
                ref={scroll}
                className={`max-w-[70%] w-max text-left py-2 px-3 rounded-[18px] mb-1 ${message.senderId === currentUserId
                    ? "ml-auto  bg-[#0084ff] text-white"
                    : "bg-[#f0f0f0] text-black"
                    }`}
            >
                <p className="text-sm">{message.text}</p>
                {/* <p className="text-xs">{time}</p>  tách ra làm thư viện tippyjs */}
            </div>
        </Tippy>
    );
};

export default React.memo(Message);

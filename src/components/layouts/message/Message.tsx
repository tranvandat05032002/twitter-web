import { IMessage } from '@/types/chatTypes';
import { format, parseISO, isValid } from 'date-fns';
import React from 'react';
import Tippy from '@tippyjs/react';
import { formatMessageTime } from '@/utils/handlers';
import { BiSolidLike } from "react-icons/bi";

const Message = ({ message, currentUserId, scroll }: { message: IMessage, currentUserId: string, scroll: React.LegacyRef<HTMLDivElement> }) => {
    const date = parseISO(message?.created_at as string);
    const time = formatMessageTime(date);
    const isFromCurrentUser = message.sender_id === currentUserId;

    const isMapLink = (text: string): boolean => {
        return /^https:\/\/www\.google\.com\/maps\?q=/.test(text);
    };
    const mapLink = isMapLink(message.text);

    const bubbleClass = `
  max-w-[70%] w-max text-left py-2 px-3 rounded-[18px] mb-1
  ${isFromCurrentUser ? 'ml-auto' : ''}
  ${(message.isLike || message.text === "")
            ? 'bg-transparent text-blue-500' // không nền, text màu xanh cho Like
            : isFromCurrentUser
                ? 'bg-[#0084ff] text-white'
                : 'bg-[#f0f0f0] text-black'
        }
`;

    const extractCoordinates = (url: string): { lat: string; lng: string } | null => {
        const match = url.match(/q=([-0-9.]+),([-0-9.]+)/);
        if (!match) return null;
        return { lat: match[1], lng: match[2] };
    };

    const renderMessageContent = () => {
        if (message.isLike || message.text === "") {
            return (
                <div className="flex justify-center items-center p-0 bg-transparent">
                    <BiSolidLike className="h-8 w-8 text-blue-500" />
                </div>
            );
        }

        if (isMapLink(message.text)) {
            const coords = extractCoordinates(message.text);
            if (!coords) return <p className="text-sm">{message.text}</p>;

            const mapSrc = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`;

            return (
                <div className="w-[250px] h-[180px] rounded-md overflow-hidden border border-gray-300 shadow-sm debug-css">
                    <iframe
                        title="Google Map"
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                    />
                </div>
            );
        }

        return <p className="text-sm">{message.text}</p>;
    };


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
                className={bubbleClass}
            >
                {renderMessageContent()}
            </div>
        </Tippy>
    );
};

export default React.memo(Message);

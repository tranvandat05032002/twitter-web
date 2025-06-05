'use client';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { MdKeyboardVoice } from 'react-icons/md';
import { MagnifyingGlassIcon, CloseExternalEventIcon } from '@/components/SingleUseComponents/Icon';
import { useRouter } from 'next/navigation';
import { SearchContext, MyContextType } from '@/context/SearchProvider';

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

const FILTER_ALL = "all";

const SearchItem = () => {
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const { searchValue, setSearchValue, setShowClose, setShowListFilter, showClose, inputRef } = useContext(SearchContext) as MyContextType;
    const router = useRouter();

    // Thiết lập Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Trình duyệt không hỗ trợ nhận diện giọng nói.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setListening(true);
            console.log('🎤 Đang lắng nghe...');
        };

        recognition.onspeechend = () => {
            setListening(false);
            console.log('🛑 Dừng lắng nghe...');
            recognition.stop();
        };

        recognition.onerror = (event: any) => {
            console.error('Lỗi nhận diện:', event.error);
            setListening(false);
        };

        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript.toLowerCase();
            console.log("Bạn nói:", text);
            setSearchValue(text);
            setShowClose(true);
            setShowListFilter(true);
            router.push(`/explore?q=${text}&filter=${FILTER_ALL}`);
        };

        recognitionRef.current = recognition;
    }, []);

    const handleVoiceSearch = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
        } else {
            alert('Trình duyệt của bạn không hỗ trợ tìm kiếm bằng giọng nói.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.startsWith(' ')) return;
        setSearchValue(e.target.value);
        setShowClose(true);
        setShowListFilter(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !searchValue.startsWith(' ')) {
            router.push(`/explore?q=${searchValue}&filter=${FILTER_ALL}`);
            setShowListFilter(false);
        }
    };

    const handleClearSearch = () => {
        setSearchValue('');
        inputRef.current?.focus();
    };

    return (
        <React.Fragment>
            <input
                type="text"
                autoComplete="off"
                id="search-people"
                placeholder="Tìm kiếm người dùng"
                className="pl-[40px] pr-[12px] py-[12px] w-full h-[43px] focus:outline-none border focus:border focus:border-bgBlueFocus border-borderGrayPrimary placeholder:text-textGray placeholder:font-light placeholder:text-sm bg-black rounded-[30px] text-base font-light"
                value={searchValue as string}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />

            <MagnifyingGlassIcon className="absolute left-[10px] top-[50%] translate-y-[-50%] text-textGray ml-[3px]" />

            {searchValue && showClose ? (
                <label htmlFor="search-people">
                    <button
                        type="button"
                        onClick={handleClearSearch}
                        className="p-[3px] border-none outline-none rounded-full cursor-pointer absolute right-[10px] top-[50%] text-black translate-y-[-50%] bg-bgBlueFocus"
                    >
                        <CloseExternalEventIcon className="w-[15px] h-[15px]" />
                    </button>
                </label>
            ) : (
                <button
                    type="button"
                    onClick={handleVoiceSearch}
                    title="Tìm kiếm bằng giọng nói"
                    className={`p-[3px] border-none outline-none rounded-full cursor-pointer absolute right-[10px] top-[50%] translate-y-[-50%] ${listening ? 'bg-green-500 text-white' : 'bg-transparent text-textGray'}`}
                >
                    <MdKeyboardVoice className="w-[25px] h-[25px]" />
                </button>
            )}
        </React.Fragment>
    );
};

export default SearchItem;

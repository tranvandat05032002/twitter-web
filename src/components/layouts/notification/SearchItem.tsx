import { CloseExternalEventIcon, MagnifyingGlassIcon } from '@/components/SingleUseComponents/Icon';
import { MyContextType, SearchContext } from '@/context/SearchProvider';
import { useRouter } from 'next/navigation';
import React from 'react';
const FILTER_SEEN = "seen";
const FILTER_NOT_SEEN = "not_seen";
const SearchItem = () => {
    const [listHistorySearch, setListHistorySearch] = React.useState<String[]>([]);
    const router = useRouter()
    return (
        <React.Fragment>
            <input type="text" autoComplete='off' id="search-notify" placeholder='Tìm kiếm thông báo' className="pl-[40px] pr-[12px]  py-[12px] w-full h-[43px] focus:outline-none border focus:border focus:border-bgBlueFocus border-borderGrayPrimary placeholder:text-textGray placeholder:font-light placeholder:text-sm bg-black rounded-[30px] text-base font-light" />
            <MagnifyingGlassIcon className="absolute MagnifyingGlassIcon left-[10px] top-[50%] translate-y-[-50%] text-textGray ml-[3px] font-light" />
            {/* {
                searchValue && showClose && */}
            <label htmlFor='search-notify'>
                <button type='button' className={"p-[3px] border-none outline-none rounded-full cursor-pointer absolute right-[10px] top-[50%] text-black translate-y-[-50%] bg-bgBlueFocus ml-[3px] font-light"}>
                    <CloseExternalEventIcon className='w-[15px] h-[15px]' />
                </button>
            </label>
            {/* } */}
        </React.Fragment>
    );
};

export default SearchItem;
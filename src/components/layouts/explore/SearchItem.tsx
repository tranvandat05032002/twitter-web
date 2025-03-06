import { CloseExternalEventIcon, MagnifyingGlassIcon } from '@/components/SingleUseComponents/Icon';
import { MyContextType, SearchContext } from '@/context/SearchProvider';
import { useRouter } from 'next/navigation';
import React from 'react';
const user_follow = [
    {
        id: 1,
        name: "TranVanDat"
    }
]
const FILTER_ALL = "all";
const FILTER_FOLLOWING = "following";
const SearchItem = () => {
    const [listHistorySearch, setListHistorySearch] = React.useState<String[]>([]);
    const { setShowClose, setShowListFilter, searchValue, setSearchValue, showClose, inputRef } = React.useContext(SearchContext) as MyContextType
    const router = useRouter()
    const handleHistorySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`/explore?q=${searchValue}&filter=${FILTER_ALL}`)
            setShowListFilter(false);

            // bstHistory.insertKeyword(debounceSearchValue);
        }
    }
    const handleSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.startsWith(' ')) {
            return;
        }
        else {
            setShowClose(true);
            setShowListFilter(true);
            setSearchValue(e.target.value);
            setListHistorySearch((prev) => [...prev, e.target.value]);
            // setListHistorySearch((prev): any => {
            //         const autoCompleteResults = bstHistory.autoComplete(e.target.value);
            //         return [...prev, autoCompleteResults]
            //     }
            // );
        }
    }
    const handleClearSearch = () => {
        setSearchValue("");
        inputRef.current?.focus();
    }
    return (
        <React.Fragment>
            <input type="text" autoComplete='off' onKeyDown={(e) => handleHistorySearch(e)} id="search-people" placeholder='Search People' value={searchValue as string} onChange={handleSpace} className="pl-[40px] pr-[12px]  py-[12px] w-full h-[43px] focus:outline-none border focus:border focus:border-bgBlueFocus border-borderGrayPrimary placeholder:text-textGray placeholder:font-light placeholder:text-sm bg-black rounded-[30px] text-base font-light" />
            <MagnifyingGlassIcon className="absolute MagnifyingGlassIcon left-[10px] top-[50%] translate-y-[-50%] text-textGray ml-[3px] font-light" />
            {
                searchValue && showClose &&
                <label htmlFor='search-people'>
                    <button type='button' onClick={handleClearSearch} className={"p-[3px] border-none outline-none rounded-full cursor-pointer absolute right-[10px] top-[50%] text-black translate-y-[-50%] bg-bgBlueFocus ml-[3px] font-light"}>
                        <CloseExternalEventIcon className='w-[15px] h-[15px]' />
                    </button>
                </label>
            }
        </React.Fragment>
    );
};

export default SearchItem;
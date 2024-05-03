"use client"
import { useUserInfo } from "@/store/useUserInfo";
import { IUser } from "@/types/userTypes";
import React from "react";
export interface MyContextType {
    userInfo: IUser | null;
    showClose: boolean;
    setShowClose: React.Dispatch<React.SetStateAction<boolean>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    showListFilter: boolean;
    setShowListFilter: React.Dispatch<React.SetStateAction<boolean>>;
    showButtonFollow: boolean;
    setShowButtonFollow: React.Dispatch<React.SetStateAction<boolean>>;
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
}
export const SearchContext = React.createContext<MyContextType | null>(null);
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const { userInfo } = useUserInfo();
    const [showClose, setShowClose] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [showListFilter, setShowListFilter] = React.useState<boolean>(true);
    const [showButtonFollow, setShowButtonFollow] = React.useState<boolean>(true);
    const inputRef = React.useRef<HTMLInputElement | null>(null);


    return (
        <SearchContext.Provider value={{
            userInfo,
            showClose,
            setShowClose,
            searchValue,
            setSearchValue,
            showListFilter,
            setShowListFilter,
            showButtonFollow,
            setShowButtonFollow,
            inputRef

        }}>
            {children}
        </SearchContext.Provider>
    )

}
"use client"
import React, { useState } from 'react';
import { FaFileImage } from "react-icons/fa";

const CreateStory = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const imageInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleClickImageUpload = () => {
        imageInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Gửi story lên server ở đây
        alert('Story đã được tạo (demo)');
        setContent('');
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <form
                onSubmit={handleSubmit}
                className="shadow-lg flex flex-col items-center"
            >
                <div className="flex justify-center gap-4 p-4 bg-black">
                    {/* Tạo tin dạng ảnh */}
                    <div className="w-64 h-96 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-300 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition" onClick={handleClickImageUpload}>
                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white mb-4 shadow-white shadow-md">
                            <FaFileImage className='w-[24px] h-[24px]' />
                        </div>
                        <p className="text-white font-semibold text-lg text-center">Tạo tin dạng ảnh</p>
                    </div>

                    {/* Tạo tin dạng văn bản */}
                    <div className="w-64 h-96 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-pink-300 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition">
                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white mb-4 text-xl font-bold shadow-white shadow-md">
                            Aa
                        </div>
                        <p className="text-white font-semibold text-lg text-center">Tạo tin dạng văn bản</p>
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={imageInputRef}
                    className="hidden"
                />
                {/* {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="w-full h-48 object-cover rounded mb-4"
                    />
                )}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
                >
                    Đăng tin
                </button> */}
            </form>
        </div>
    );
};

export default CreateStory;
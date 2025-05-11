import React from 'react';
import CommentItem from './CommentItem';
const comments = [
    {
        id: 1,
        user: {
            name: "Nguyễn Thị Thúy Linh",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        content: "Tuỳ theo sẹo",
        time: "5 giờ",
        likes: 4,
        liked: true,
        replies: [],
    },
    {
        id: 2,
        user: {
            name: "Huỳnh Minh Hoà",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        content: "Phẫu thuật luôn:))",
        time: "5 giờ",
        likes: 0,
        liked: false,
        replies: [
            {
                id: 3,
                user: {
                    name: "LC Hoa",
                    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                },
                content: "um",
                time: "4 giờ",
                likes: 0,
                liked: false,
            },
        ],
    },
    {
        id: 4,
        user: {
            name: "Thiên Phúc",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        content: "Vậy ư?",
        time: "4 giờ",
        likes: 0,
        liked: false,
        replies: [],
    },
    {
        id: 5,
        user: {
            name: "Quynh Anh",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        content: "nhma bớt đau",
        time: "",
        likes: 0,
        liked: false,
        replies: [],
    },
];
const CommentList = () => {
    return (
        <div className="w-full mt-1">
            <div className="space-y-2">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default CommentList;
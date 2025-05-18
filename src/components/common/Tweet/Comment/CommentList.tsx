import { CommentWithReplies } from '@/types/commentTypes';
import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }: { comments: CommentWithReplies[] }) => {
    return (
        <div className="w-full mt-1">
            <div className="space-y-2">
                {comments.length > 0 ? comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} />
                )) : <p className="text-center text-textGray">Hãy là người bình luận đầu tiên</p>}
            </div>
        </div>
    );
};

export default CommentList;
import { CommentWithReplies } from '@/types/commentTypes';
import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, setComments }: { comments: CommentWithReplies[], setComments: React.Dispatch<React.SetStateAction<CommentWithReplies[]>> }) => {
    const [replyingCommentId, setReplyingCommentId] = React.useState<string | null>(null);
    React.useEffect(() => {
        if (comments.length > 0) {
            const lastCommentEl = document.querySelector('#last-comment');
            lastCommentEl?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [comments]);
    return (
        <div className="w-full mt-1">
            <div className="space-y-2">
                {comments.length > 0 ? comments.map((comment, index) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        replyingCommentId={replyingCommentId}
                        setReplyingCommentId={setReplyingCommentId}
                        setComments={setComments}
                        id={index === comments.length - 1 ? 'last-comment' : undefined}
                    />
                )) : <p className="text-center text-textGray">Hãy là người bình luận đầu tiên</p>}
            </div>
        </div>
    );
};

export default CommentList;
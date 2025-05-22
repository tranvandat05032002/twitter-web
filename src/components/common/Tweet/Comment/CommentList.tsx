import { CommentWithReplies } from '@/types/commentTypes';
import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ tweetUserId, comments, setComments }: {
    tweetUserId: string;
    comments: CommentWithReplies[];
    setComments: React.Dispatch<React.SetStateAction<CommentWithReplies[]>>;
}) => {
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
                {comments.length > 0 ? comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        tweetUserId={tweetUserId}
                        comment={comment}
                        replyingCommentId={replyingCommentId}
                        setReplyingCommentId={setReplyingCommentId}
                        setComments={setComments}
                    />
                )) : <p className="text-center text-textGray">Hãy là người bình luận đầu tiên</p>}
            </div>
        </div>
    );
};

export default CommentList;
// @refresh reset
import { useMe } from '@/context/UserContext';
import { useFollow, useUnFollow } from '@/hooks/users/useMutation';
import { IUser } from '@/types/userTypes';
import React from 'react';
import ButtonFollow from './ButtonFollow';

const ButtonFollowingHandle = ({ follwed, data }: { follwed: boolean, data: IUser }) => {
    const [isHover, setIsHover] = React.useState<boolean>(false);
    const isSubmittingRef = React.useRef(false);
    const { user: currentUser } = useMe();
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const { mutate: followUser, isLoading: isLoadingFollow } = useFollow({
        sender_id: currentUser?._id,    // sender_id
        receiver_id: data._id,           //receiver_id
        onSuccess: () => setIsFollowed(true)
    })
    const { mutate: unFollowUser, isLoading: isLoadingUnFollow } = useUnFollow({
        onSuccess: () => setIsFollowed(false)
    })
    const [isFollowed, setIsFollowed] = React.useState<boolean>(follwed || false);

    const handleChange = () => {
        setIsHover((prev) => !prev);
    }
    const handleFollowUnFollow = (follow_user_id: string) => {
        if (!follow_user_id || isSubmittingRef.current) return;


        setIsHover(false);
        setIsProcessing(true);
        isSubmittingRef.current = true;

        const onSettled = () => {
            setIsProcessing(false);
            isSubmittingRef.current = false;
        }

        if (isFollowed) {
            unFollowUser(
                { follow_user_id },
                { onSettled }
            )
        } else {
            followUser({
                follow_user_id
            }, {
                onSettled
            })
        }
    }

    return (
        <React.Fragment>
            {isFollowed ?
                <button
                    onMouseEnter={handleChange}
                    onMouseLeave={handleChange}
                    disabled={isProcessing || isLoadingFollow || isLoadingUnFollow}
                    onClick={() => {
                        handleFollowUnFollow(data._id as string)
                    }}
                    className={`rounded-full ${!isHover ? "bg-transparent border-[0.5px] border-[#333639] text-white" : "bg-bgPinkGhost/20 border-[0.5px] border-bgPinkGhost/40 text-bgPinkGhost"} font-bold px-4 py-1 text-[15px]`}>
                    {isHover ? "Unfollow" : "Following"}
                </button> :
                <ButtonFollow
                    disabled={isProcessing || isLoadingFollow || isLoadingUnFollow}
                    onClick={() => {
                        handleFollowUnFollow(data._id as string)
                    }}
                >follow</ButtonFollow>
            }
        </React.Fragment>
    );
};

export default ButtonFollowingHandle;
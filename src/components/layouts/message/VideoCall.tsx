"use client"

import React, { useEffect, useRef, useState } from 'react';
import BoxIcon from '@/components/SingleUseComponents/BoxIcon';
import { VideoCameraIcon } from '@/components/SingleUseComponents/Icon';
import socket from '@/utils/socket';
import { useChat } from '@/store/useChat';
import { useGetMessage, useGetProfileUserId } from '@/hooks/users/useQuery';
import { useAddMessage } from '@/hooks/users/useMutation';
import { Avatar } from '@mui/material';
import { PaperAirplaneIcon } from '@/components/SingleUseComponents/Icon';
import Emoji from '@/components/common/Emoji/Emoji';
import { IMessage, MessageArray, NewMessageRequestType } from '@/types/chatTypes';
import { IUser } from '@/types/userTypes';

const VideoCall: React.FC<{ currentChatId: string; senderId: string; receiverId: string }> = ({ currentChatId, senderId, receiverId }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const [isCalling, setIsCalling] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);
    const [callerId, setCallerId] = useState<string | null>(null);
    const [offerFromCaller, setOfferFromCaller] = useState<RTCSessionDescriptionInit | null>(null);

    useEffect(() => {
        const configuration = {
            iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }],
            iceCandidatePoolSize: 10,
        };
        peerConnection.current = new RTCPeerConnection(configuration);

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', { toUserId: receiverId, candidate: event.candidate });
            }
        };

        peerConnection.current.ontrack = (event) => {
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                if (localVideoRef.current) localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach((track) => peerConnection.current?.addTrack(track, stream));
            })
            .catch((err) => alert('Không thể truy cập camera hoặc mic'));

        socket.on('call-made', ({ from, offer }) => {
            if (from === senderId) return;
            setIncomingCall(true);
            setCallerId(from);
            setOfferFromCaller(offer);
        });

        socket.on('answer-made', async ({ from, answer }) => {
            if (from !== receiverId) return;
            await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
            setIsCalling(true);
        });

        socket.on('ice-candidate', async ({ from, candidate }) => {
            if (from !== receiverId) return;
            try {
                await peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) {
                console.error('Lỗi khi thêm ICE candidate:', error);
            }
        });

        socket.on('call-rejected', ({ from }) => {
            if (from === receiverId) {
                alert('Cuộc gọi đã bị từ chối');
                endCall();
            }
        });

        return () => {
            socket.off('call-made');
            socket.off('answer-made');
            socket.off('ice-candidate');
            socket.off('call-rejected');
            peerConnection.current?.close();
            peerConnection.current = null;
        };
    }, [socket, senderId, receiverId]);

    const startCall = async () => {
        if (!peerConnection.current) return;
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit('call-user', { toUserId: receiverId, offer });
    };

    const acceptCall = async () => {
        if (!peerConnection.current || !offerFromCaller || !callerId) return;
        setIncomingCall(false);
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offerFromCaller));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit('make-answer', { toUserId: callerId, answer });
        setIsCalling(true);
        setCallerId(null);
        setOfferFromCaller(null);
    };

    const rejectCall = () => {
        if (callerId) socket.emit('call-rejected', { toUserId: callerId });
        setIncomingCall(false);
        setCallerId(null);
        setOfferFromCaller(null);
    };

    const endCall = () => {
        peerConnection.current?.close();
        peerConnection.current = null;
        setIsCalling(false);
        setIncomingCall(false);
        setCallerId(null);
        setOfferFromCaller(null);
    };

    return (
        <div className="video-call-container">
            <div className="videos" style={{ display: 'flex', gap: 10 }}>
                <video ref={localVideoRef} autoPlay muted playsInline style={{ width: 200, height: 150, backgroundColor: 'black' }} />
                <video ref={remoteVideoRef} autoPlay playsInline style={{ width: 200, height: 150, backgroundColor: 'black' }} />
            </div>
            {!isCalling && !incomingCall && (
                <BoxIcon onClick={startCall}>
                    <VideoCameraIcon />
                </BoxIcon>
            )}
            {incomingCall && (
                <div style={{ marginTop: 20 }}>
                    <p>Bạn có cuộc gọi đến từ {callerId}</p>
                    <button onClick={acceptCall} style={{ marginRight: 10 }}>Chấp nhận</button>
                    <button onClick={rejectCall}>Từ chối</button>
                </div>
            )}
            {isCalling && (
                <button onClick={endCall} style={{ marginTop: 20, backgroundColor: 'red', color: 'white' }}>
                    Kết thúc cuộc gọi
                </button>
            )}
        </div>
    );
};

export default VideoCall;
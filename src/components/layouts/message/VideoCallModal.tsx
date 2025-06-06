import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import { IUser } from '@/types/userTypes';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import socket from '@/utils/socket';

interface VideoCallModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentChatId: string;
    senderId: string;
    receiverId: string;
    userInfo: IUser;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({
    isOpen,
    onClose,
    currentChatId,
    senderId,
    receiverId,
    userInfo
}) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const [isCalling, setIsCalling] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);
    const [callerId, setCallerId] = useState<string | null>(null);
    const [offerFromCaller, setOfferFromCaller] = useState<RTCSessionDescriptionInit | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        if (!isOpen) return;

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
            console.log('Received remote stream track:', event.streams[0]);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                console.log('Added local stream tracks to peer connection.');
                stream.getTracks().forEach((track) => {
                    if (peerConnection.current) {
                        peerConnection.current.addTrack(track, stream);
                    }
                });
            })
            .catch((err) => {
                console.error('Error accessing media devices:', err);
                alert('Không thể truy cập camera hoặc mic');
            });

        socket.on('call-made', async ({ from, offer }) => {
            if (from === senderId) return;
            console.log('Received call-made from:', from);
            setIncomingCall(true);
            setCallerId(from);
            setOfferFromCaller(offer);
        });

        socket.on('answer-made', async ({ from, answer }) => {
            if (from !== receiverId) return;
            console.log('Received answer-made from:', from);
            try {
                if (peerConnection.current) {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                    setIsCalling(true);
                    console.log('Call established.');
                }
            } catch (error) {
                console.error('Error setting remote description:', error);
            }
        });

        socket.on('ice-candidate', async ({ from, candidate }) => {
            if (from !== receiverId) return;
            console.log('Received ICE candidate from:', from);
            try {
                if (peerConnection.current) {
                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                }
            } catch (error) {
                console.error('Error adding ICE candidate:', error);
            }
        });

        socket.on('call-rejected', ({ from }) => {
            if (from === receiverId) {
                console.log('Call rejected by:', from);
                alert('Cuộc gọi đã bị từ chối');
                endCall();
            }
        });

        socket.on('call-ended', ({ from }) => {
            if (from === receiverId) {
                console.log('Call ended by:', from);
                alert('Cuộc gọi đã kết thúc');
                endCall();
            }
        });

        return () => {
            console.log('Cleaning up video call resources.');
            socket.off('call-made');
            socket.off('answer-made');
            socket.off('ice-candidate');
            socket.off('call-rejected');
            socket.off('call-ended');
            if (peerConnection.current) {
                peerConnection.current.close();
                peerConnection.current = null;
            }
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isOpen, socket, senderId, receiverId]);

    const startCall = async () => {
        if (!peerConnection.current) return;
        console.log('Starting call to:', receiverId);
        try {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            socket.emit('call-user', { toUserId: receiverId, offer });
            console.log('Sent offer to:', receiverId);
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    const acceptCall = async () => {
        if (!peerConnection.current || !offerFromCaller || !callerId) return;
        console.log('Accepting call from:', callerId);
        try {
            setIncomingCall(false);
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offerFromCaller));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            socket.emit('make-answer', { toUserId: callerId, answer });
            setIsCalling(true);
            setCallerId(null);
            setOfferFromCaller(null);
            console.log('Sent answer to:', callerId);
        } catch (error) {
            console.error('Error accepting call:', error);
        }
    };

    const rejectCall = () => {
        if (callerId) {
            console.log('Rejecting call from:', callerId);
            socket.emit('call-rejected', { toUserId: callerId });
        }
        setIncomingCall(false);
        setCallerId(null);
        setOfferFromCaller(null);
        onClose();
    };

    const endCall = () => {
        if (isCalling) {
            console.log('Ending call with:', receiverId);
            socket.emit('call-ended', { toUserId: receiverId });
        }
        peerConnection.current?.close();
        peerConnection.current = null;
        setIsCalling(false);
        setIncomingCall(false);
        setCallerId(null);
        setOfferFromCaller(null);
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        onClose();
    };

    const toggleMute = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!isMuted);
                console.log('Audio muted:', !audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!isVideoOff);
                console.log('Video off:', !videoTrack.enabled);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999">
            <div className="bg-white rounded-lg p-6 w-[800px] h-[600px] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Avatar src={userInfo?.avatar} />
                        <span className="font-semibold">{userInfo?.name}</span>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                {/* Main video area - Local user's video */}
                <div className="flex-1 relative bg-black rounded-lg flex items-center justify-center">
                    {/* Local Video (Main) */}
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Local user name */}
                    <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                        Bạn
                    </div>

                    {/* Small preview of remote video - Remote user's video */}
                    <div className="absolute bottom-4 right-4 w-[160px] h-[120px] rounded-lg overflow-hidden border-2 border-white shadow-lg z-10">
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        {/* Remote user name */}
                        {isCalling && userInfo?.name && (
                            <div className="absolute bottom-1 left-1 text-white text-xs bg-black bg-opacity-50 px-1 py-0.5 rounded">
                                {userInfo?.name}
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-4">
                    {!isCalling && !incomingCall && (
                        <button
                            onClick={startCall}
                            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
                        >
                            Bắt đầu cuộc gọi
                        </button>
                    )}

                    {incomingCall && (
                        <>
                            <button
                                onClick={acceptCall}
                                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
                            >
                                Chấp nhận
                            </button>
                            <button
                                onClick={rejectCall}
                                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
                            >
                                Từ chối
                            </button>
                        </>
                    )}

                    {isCalling && (
                        <>
                            <button
                                onClick={toggleMute}
                                className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-500'
                                    } text-white hover:opacity-80`}
                            >
                                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                            </button>
                            <button
                                onClick={toggleVideo}
                                className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-500'
                                    } text-white hover:opacity-80`}
                            >
                                {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                            </button>
                            <button
                                onClick={endCall}
                                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
                            >
                                <FaPhoneSlash />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal; 
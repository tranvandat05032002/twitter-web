'use client'
import useNotificationStore from '@/store/useNotification';
import { NotifyRes } from '@/types/notifyTypes';
import socket from '@/utils/socket'
import React from 'react'
import { toast } from 'react-toastify'
import { CustomToast } from '../common/Toastify/CustomToast';

export default function SocketNotificationListener() {
    const increaseUnread = useNotificationStore(state => state.increaseUnread)
    const setUnread = useNotificationStore(state => state.setUnread)

    React.useEffect(() => {
        socket.on('receiver_notification', (notify: NotifyRes) => {
            // Tăng số lượng thông báo lên
            increaseUnread()

            toast(<CustomToast notify={notify} />, {
                position: "bottom-left",
                autoClose: 6000,
                closeButton: false,
                className: "!bg-black text-white rounded-xl shadow-lg border-[0.5px] !border-borderGrayPrimary",
                bodyClassName: "p-4",
                hideProgressBar: true,
                draggable: false,
                closeOnClick: false,
            });
        })

        socket.on('notify:update', (newUnreadCount: { unread_count: number }) => {
            console.log("newUnreadCount ---> ", newUnreadCount)
            setUnread(newUnreadCount.unread_count);
        });

        return () => {
            socket.off('receiver_notification')
            socket.off('notify:update')
        }
    }, [])

    return null
}
'use client'
import { NotifyRes } from '@/types/notifyTypes';
import socket from '@/utils/socket'
import React from 'react'
import { toast } from 'react-toastify'
import { CustomToast } from '../common/Toastify/CustomToast';

export default function SocketNotificationListener() {

    React.useEffect(() => {
        socket.on('receiver_notification', (notify: NotifyRes) => {
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

        return () => {
            socket.off('receiver_notification')
        }
    }, [])

    return null
}
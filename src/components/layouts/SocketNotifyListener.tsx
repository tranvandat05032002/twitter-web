'use client'
import socket from '@/utils/socket'
import React from 'react'
import { toast } from 'react-toastify'

export default function SocketNotificationListener() {
    React.useEffect(() => {
        socket.on('receiver_notification', (notify) => {
            toast.info(notify.message)
        })

        return () => {
            socket.off('receiver_notification')
        }
    }, [])

    return null
}
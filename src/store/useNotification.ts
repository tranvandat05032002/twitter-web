import { create } from 'zustand'

interface NotificationState {
    unreadCount: number
    increaseUnread: () => void
    resetUnread: () => void
    setUnread: (count: number) => void
}

const useNotificationStore = create<NotificationState>((set) => ({
    unreadCount: 0,
    increaseUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
    resetUnread: () => set({ unreadCount: 0 }),
    setUnread: (count: number) => set({ unreadCount: count }),
}))

export default useNotificationStore
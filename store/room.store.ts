import { create } from "zustand";

interface IRoomState {
    roomName: string | null;
    setRoomName: (name: string) => void;
}

export const useRoomStore = create<IRoomState>((set) => ({
    roomName: null, // Начальное состояние
    setRoomName: (roomName: string) => set({ roomName }), // Функция для обновления имени комнаты
}));

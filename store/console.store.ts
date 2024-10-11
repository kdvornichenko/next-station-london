import { create } from 'zustand'

export interface ConsoleMessage {
    timestamp: string
    content: React.ReactNode
}

interface ConsoleStore {
    consoleMessages: ConsoleMessage[]
    addConsoleMessage: (content: React.ReactNode) => void
    clearConsoleMessages: () => void
}

export const useConsoleStore = create<ConsoleStore>((set) => ({
    consoleMessages: [],
    addConsoleMessage: (content: React.ReactNode) => {
        const timestamp = new Date().toLocaleTimeString()
        set((state) => ({
            consoleMessages: [...state.consoleMessages, { timestamp, content }],
        }))
    },
    clearConsoleMessages: () => set({ consoleMessages: [] }),
}))

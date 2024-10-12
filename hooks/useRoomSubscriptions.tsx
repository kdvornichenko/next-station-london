// useRoomSubscription.ts
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'


export const useRoomSubscription = (
    roomName: string | null,
    setRoundsCounter: (round: number) => void,
    setSelectedCards: (cards: JSX.Element[]) => void,
    setAvailableCards: (cards: JSX.Element[]) => void,
    setRedCardsCounter: (count: number) => void,
    allCardNames: string[],
    addConsoleMessage: (message: JSX.Element) => void,
    getCardComponentByName: (cardName: string) => JSX.Element | null
) => {
    useEffect(() => {
        const subscribeToRoomChanges = async () => {
            if (!roomName) return

            const channel = supabase
                .channel('update')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'rooms',
                        filter: `name=eq.${roomName}`,
                    },
                    payload => {
                        if (payload.eventType === 'UPDATE') {
                            if (payload.new.round) {
                                setRoundsCounter(payload.new.round)
                                addConsoleMessage(<span>Раунд обновлен: { payload.new.round } </span>)
                            }

                            if (payload.new.used_cards) {
                                const mappedCards: (JSX.Element | null)[] = payload.new.used_cards.map(getCardComponentByName)
                                const newSelectedCards = mappedCards.filter((card): card is JSX.Element => card !== null)

                                setSelectedCards(newSelectedCards)

                                const newAvailableCardNames = allCardNames.filter(cardName => !payload.new.used_cards.includes(cardName))
                                const newAvailableCards = newAvailableCardNames
                                    .map(getCardComponentByName)
                                    .filter((card): card is JSX.Element => card !== null)
                                setAvailableCards(newAvailableCards)

                                addConsoleMessage(<span>Использованные карты обновлены: { payload.new.used_cards.join(', ') } </span>)
                            }

                            if (payload.new.red_cards_count !== undefined) {
                                setRedCardsCounter(payload.new.red_cards_count)
                                addConsoleMessage(<span>Счётчик красных карт обновлён: { payload.new.red_cards_count } </span>)
                            }
                        }
                    }
                )
                .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }
        }

        subscribeToRoomChanges()
    }, [roomName])
}

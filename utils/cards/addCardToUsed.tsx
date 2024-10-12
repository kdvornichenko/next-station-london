import { supabase } from "../supabase/client"

export const addCardToUsedCards = async (
	roomName: string,
	cardName: string,
	isRedCard: boolean,
	addConsoleMessage: (message: JSX.Element) => void
): Promise<boolean> => {
	while (true) {
		const { data, error } = await supabase
			.from('rooms')
			.select('used_cards, red_cards_count, updated_at')
			.eq('name', roomName)
			.single()

		if (error) {
			addConsoleMessage(
				<span className='text-danger'>
					{' '}
					Ошибка получения использованных карт: {error.message}{' '}
				</span>
			)
			return false
		}

		const currentUsedCards: string[] = data.used_cards || []
		const currentRedCardsCount = data.red_cards_count || 0
		const currentUpdatedAt = data.updated_at

		if (currentUsedCards.includes(cardName)) {
			addConsoleMessage(
				<span className='text-warning'>
					{' '}
					Карта {cardName} уже использована{' '}
				</span>
			)
			return false
		}

		const newUsedCards = [...currentUsedCards, cardName]
		const newRedCardsCount = isRedCard
			? currentRedCardsCount + 1
			: currentRedCardsCount

		const { error: updateError } = await supabase
			.from('rooms')
			.update({ used_cards: newUsedCards, red_cards_count: newRedCardsCount })
			.eq('name', roomName)
			.eq('updated_at', currentUpdatedAt)

		if (updateError) {
			if (
				updateError.code === 'PGRST116' ||
				updateError.message.includes('No rows')
			) {
				continue
			} else {
				addConsoleMessage(
					<span className='text-danger'>
						Ошибка обновления использованных карт: {updateError.message}
					</span>
				)
				return false
			}
		}

		return true
	}
}

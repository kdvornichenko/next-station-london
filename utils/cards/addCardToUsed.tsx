import { supabase } from '../supabase/client'

export const addCardToUsedCards = async (
	roomName: string,
	cardName: string,
	isRedCard: boolean,
	addConsoleMessage: (message: JSX.Element) => void
): Promise<boolean> => {
	while (true) {
		// Шаг 1: Получаем текущее состояние used_cards, red_cards_count и updated_at
		const { data, error } = await supabase
			.from('rooms')
			.select('used_cards, red_cards_count, updated_at')
			.eq('name', roomName)
			.single()

		if (error) {
			addConsoleMessage(
				<span className='text-danger'>
					Ошибка получения использованных карт: {error.message}
				</span>
			)
			return false
		}

		const currentUsedCards: string[] = data.used_cards || []
		const currentRedCardsCount = data.red_cards_count || 0
		const currentUpdatedAt = data.updated_at

		// Проверяем, не была ли карта уже использована
		if (currentUsedCards.includes(cardName)) {
			addConsoleMessage(
				<span className='text-warning'>Карта {cardName} уже использована</span>
			)
			return false
		}

		// Шаг 2: Добавляем новую карту к локальной копии used_cards
		const newUsedCards = [...currentUsedCards, cardName]

		// Увеличиваем счётчик красных карт, если карта красная
		const newRedCardsCount = isRedCard
			? currentRedCardsCount + 1
			: currentRedCardsCount

		// Шаг 3: Пытаемся обновить запись в базе данных с условием eq на updated_at
		const { error: updateError } = await supabase
			.from('rooms')
			.update({ used_cards: newUsedCards, red_cards_count: newRedCardsCount })
			.eq('name', roomName)
			.eq('updated_at', currentUpdatedAt)

		if (updateError) {
			// Если произошла ошибка, проверяем, не связано ли это с несоответствием условия
			if (
				updateError.code === 'PGRST116' ||
				updateError.message.includes('No rows')
			) {
				// Это означает, что условие eq не выполнено, нужно повторить попытку
				continue
			} else {
				// Иная ошибка
				addConsoleMessage(
					<span className='text-danger'>
						Ошибка обновления использованных карт: {updateError.message}
					</span>
				)
				return false
			}
		}

		// Обновление успешно
		return true
	}
}
